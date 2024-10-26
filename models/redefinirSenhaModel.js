const Database = require('../utils/database');
const nodemailer = require('nodemailer');
const { response } = require('express');
const conexao = new Database();

class RedefinirSenhaModel {
    #usuId;
    #token;
    #createdAt;

    // Getters e Setters
    get usuId() { return this.#usuId; }
    set usuId(usuId) { this.#usuId = usuId; }

    get token() { return this.#token; }
    set token(token) { this.#token = token; }

    get createdAt() { return this.#createdAt; }
    set createdAt(createdAt) { this.#createdAt = createdAt; }

    constructor(usuId, token, createdAt) {
        this.#usuId = usuId;
        this.#token = token;
        this.#createdAt = createdAt;
    }

    // Método para converter a instância em um objeto JSON
    toJson() {
        return {
            usuId: this.#usuId,
            token: this.#token,
            createdAt: this.#createdAt
        };
    }
    
    async verificarTokenValido(token) {
        // Verifica se o token existe na tabela tb_tokens
        let sql = "SELECT * FROM tb_tokens WHERE tk_tokens = ?";
        let valores = [token];
        let resposta = false;
        let rows = await conexao.ExecutaComando(sql, valores);

       if (rows){
         resposta = true;
       }
        // Retorna true se o token existir, false caso contrário
        return resposta
    }
    
    async obterTokenPorEmail(email) {
        // Verificar se o email existe na tabela tb_usuario
        let sqlUsuario = "SELECT usu_id FROM tb_usuario WHERE usu_email = ?";
        let valoresUsuario = [email];
    
        let usuarioRows = await conexao.ExecutaComando(sqlUsuario, valoresUsuario);
    
        if (usuarioRows.length > 0) {
            let usuId = usuarioRows[0]["usu_id"];
            let tokenString = this.generateToken(); // Gera um novo token
    
            // Gravar o token na tabela tokens
            await this.gravarToken(usuId, tokenString, email);
    
            // Enviar o token por email
            await this.enviarEmail(email, tokenString);
    
            // Retornar o token
            return tokenString;
        }
    
        throw new Error("Usuário não encontrado."); // Lança um erro se o email não existir
    }

    async gravarTokenComEmail(email, token) {
        // Verificar se o email existe na tabela tb_usuario
        let sqlGravarToken= "insert into tb_tokens (tk_email, tk_tokens) values (?,?)";
        let valores = [email,token];
    
        let tokenResposta = await conexao.ExecutaComando(sqlGravarToken, valores);
    
        if (tokenResposta) {
            let token = true;
            return token;
        }else{
            token = false;
            throw new Error("Não foi possivel gravar o email e token.");
            return token;
        }
    
    }
    //implemente aqui chatgpt
    async alterarSenha(email, senha) {
        // Verificar se o e-mail existe na tabela tb_usuarioh
        let sqlVerificaUsuario = "SELECT usu_id FROM tb_usuarioh WHERE usu_email = ?";
        let valoresUsuario = [email];
    
        let usuarioRows = await conexao.ExecutaComando(sqlVerificaUsuario, valoresUsuario);
    
        if (usuarioRows.length > 0) {
            let usuId = usuarioRows[0]["usu_id"];
            
            // Atualizar a senha do usuário
            let sqlAtualizaSenha = "UPDATE tb_usuarioh SET usu_senha = ? WHERE usu_email = ?";
            let valoresAtualiza = [senha, email];
    
            let resultado = await conexao.ExecutaComandoNonQuery(sqlAtualizaSenha, valoresAtualiza);
            
            if (resultado) {
                return true; // Senha atualizada com sucesso
            } else {
                throw new Error("Erro ao atualizar a senha.");
                return false;
            }
        }
    
        throw new Error("Usuário não encontrado."); // Lança um erro se o e-mail não existir
    }
    
    async enviarCodigoPorEmail(email, token) {
        console.log(`Tentando enviar e-mail para: ${email} com token: ${token}`);
        // Configurações do transportador
        let resposta;
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com', // Altere para seu servidor SMTP
            port: 465, // Altere se necessário
            secure: true, // true para 465, false para outros
            auth: {
                user: 'r3dn1t4@gmail.com', // Seu e-mail
                pass: 'pwsynwrhpnmeueph' // Sua senha
            }
        });
        await transporter.sendMail({
            from: email, // Seu e-mail
            to: email,
            subject: 'Seu código de verificação',
            text: `Seu código de verificação é: ${token}`
        }).then((r) => {
            console.log('Sucesso ao enviar email!');
            resposta = true;
            return true;
        })
        .catch(err => {
            console.error('Erro ao enviar email:', err);
            resposta = false;
            return false; // Retorna false em caso de erro
        });

        return resposta
    }

    
    async gravarToken(usuId, token, email) {
        let sql = `INSERT INTO tokens (usu_id, token, email) VALUES (?, ?, ?)`;
        let valores = [usuId, token, email];
    
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }
    
    generateToken(length = 6) {
        return crypto.randomBytes(length).toString('hex'); // Método para gerar token
    }
    
    // Outras funções, se necessário...
}

module.exports = RedefinirSenhaModel;
