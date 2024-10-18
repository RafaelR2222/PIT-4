const Database = require('../utils/database')

const conexao = new Database();

class UsuarioModel {

    #usuId;
    #usuNome;
    #usuEmail;
    #usuAtivo;
    #usuSenha;
    #perId;
    #perDescricao;
    #token;
    // Getters e Setters
    get usuId() { return this.#usuId; }
    set usuId(usuId) { this.#usuId = usuId; }

    get usuNome() { return this.#usuNome; }
    set usuNome(usuNome) { this.#usuNome = usuNome; }

    get usuEmail() { return this.#usuEmail; }
    set usuEmail(usuEmail) { this.#usuEmail = usuEmail; }

    get usuAtivo() { return this.#usuAtivo; }
    set usuAtivo(usuAtivo) { this.#usuAtivo = usuAtivo; }

    get usuSenha() { return this.#usuSenha; }
    set usuSenha(usuSenha) { this.#usuSenha = usuSenha; }

    get perId() { return this.#perId; }
    set perId(perId) { this.#perId = perId; }

    get perDescricao() { return this.#perDescricao; }
    set perDescricao(perDescricao) { this.#perDescricao = perDescricao; }

    get token() { return this.#token; }
    set token(token) { this.#token = token; }

    constructor(usuId, usuNome, usuEmail, usuAtivo, usuSenha, perId, usuToken, perDescricao ){
        this.#usuId = usuId;
        this.#usuNome = usuNome;
        this.#usuEmail = usuEmail;
        this.#usuAtivo = usuAtivo;
        this.#usuSenha = usuSenha;
        this.#perId = perId;
        this.#token = usuToken;
        this.#perDescricao = perDescricao;
        
    }

    // Método para converter a instância em um objeto JSON
    toJson() {
        return {
            id: this.#usuId,
            nome: this.#usuNome,
            email: this.#usuEmail,
            ativo: this.#usuAtivo,
            perId: this.#perId,
            perDescricao: this.#perDescricao,
            token: this.#token
        };
    }

    async obterUsuario(id) {
        let sql = "select * from tb_usuarioh where usu_id = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let usuario = new UsuarioModel();
            usuario.usuId = rows[0]["usu_id"];
            usuario.usuNome = rows[0]["usu_nome"];
            usuario.usuEmail = rows[0]["usu_email"];
            usuario.usuAtivo = rows[0]["usu_ativo"];
            usuario.usuSenha = rows[0]["usu_senha"];
            usuario.perId = rows[0]["per_id"];
            usuario.perDescricao = rows[0]["per_descricao"];

            return usuario;
        }

        return null;
    }
    
    async enviarCodigoPorEmail(email, token) {
        console.log(`Tentando enviar e-mail para: ${email} com token: ${token}`);
    
        // Configurações do transportador

        let resposta;
        const transporter = nodemailer.createTransport({
            host: 'smtp@gmail.com', // Altere para seu servidor SMTP
            port: 465, // Altere se necessário
            secure: true, // true para 465, false para outros
            auth: {
                user: 'r3dn1t4@gmail.com', // Seu e-mail
                pass: 'pwsynwrhpnmeueph' // Sua senha
            }
        });
        transporter.sendMail({
            from: 'Rainha victoria <r3dn1t4@gmail.com>', // Seu e-mail
            to: email,
            subject: 'Seu código de verificação',
            text: `Seu código de verificação é: ${token}`
        }).then((response)=> resposta = true, console.log('Sucesso ao enviar email! ', response))
        .catch((err)=> resposta = false, console.log('Erro ao enviar email! ', err))
        
        return resposta;
    }

    async obterUsuarioPorEmail(email) {
        let sql = "select usu_nome from tb_usuarioh where usu_email = ?";
        let valores = email;

        let rows = await conexao.ExecutaComando(sql, valores);
        let usuarioNome = rows[0];
        let NomeDoUsuario = usuarioNome.usu_nome;
        if(usuarioNome) {
            return NomeDoUsuario; // Retorna a lista de usuários
        }

        return null;
    }

    async gravarUsuario() {
        if(this.#usuId == 0){
            let sql = `insert into tb_usuarioh 
                        (usu_nome, usu_email, usu_ativo, 
                        usu_senha, per_id)
                        values
                        (?, ?, ?, ?, ?)`;
  
            let valores = [this.#usuNome, this.#usuEmail, 
                            this.#usuAtivo, this.#usuSenha, 
                            this.#perId];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        } else {
            let sql = `update tb_usuarioh set usu_nome = ?, usu_email = ?,
                            usu_ativo = ?, usu_senha = ?, per_id = ? 
                            where usu_id = ?`;
  
            let valores = [this.#usuNome, this.#usuEmail, 
                            this.#usuAtivo, this.#usuSenha, 
                            this.#perId, this.#usuId];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        }
    }

    async obterEmailPorToken(token) {
        const sql = "SELECT * FROM tb_tokens WHERE tk_tokens = '?'";
        const valores = [token];
        
        // Executa o comando e espera o resultado
        const rows = await conexao.ExecutaComando(sql, valores);
        
        // Verifica se encontrou alguma linha
        if (rows.length > 0) {
            let email = rows[0].tk_email;
            return email;  // retorna o email diretamente
        }
        
        // Retorna null se não encontrar
        return null;
    }

    async gravarTokenEmUsuarios(email, token) {
        // Primeiro, busca o usuário pelo e-mail
        let sql = "SELECT * FROM tb_usuarioh WHERE usu_email = ?";
        let valores = [email];
    
        let rows = await conexao.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            // Usuário encontrado, atualizar o token
            let sqlUpdate = "UPDATE tb_usuarioh SET usu_token = ? WHERE usu_email = ?";
            let valoresUpdate = [token, email];
            let resultado = await conexao.ExecutaComandoNonQuery(sqlUpdate, valoresUpdate);
            return resultado;
        } else {
            // Usuário não encontrado, você pode optar por retornar um erro ou criar um novo usuário
            throw new Error("Usuário não encontrado com o e-mail fornecido.");
        }
    }
    
    async buscarEmailPorToken(token) {
        const sql = `
            SELECT usu_email 
            FROM tb_usuarioh 
            WHERE usu_token = ?`;
    
        const valores = [token];
    
        try {
            const resultado = await conexao.ExecutaComando(sql, valores);
    
            if (resultado.length > 0) {
                return resultado[0].usu_email; // Retorna apenas o email encontrado
            } else {
                throw new Error("Token não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar o email pelo token:", error);
            throw error; // Lança o erro para que possa ser tratado externamente
        }
    }
    
    async listarUsuarios() {
        let lista = [];

        let sql = "select * from tb_usuarioh u inner join tb_perfilh p on u.per_id = p.per_id";
        let rows = await conexao.ExecutaComando(sql);

        for(let i=0; i<rows.length; i++){
            let row = rows[i];
            
            let usuario = new UsuarioModel(row["usu_id"], row["usu_nome"], 
            row["usu_email"], row["usu_ativo"], row["usu_senha"], row["per_id"], row["per_descricao"]);

            lista.push(usuario);
        }

        return lista;
    }

    async deletarUsuario(id) {
        let sql = "delete from tb_usuarioh where usu_id = ?";
        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async autenticarUsuario(email, senha) {
        let sql = "select * from tb_usuarioh where usu_email = ? and usu_senha = ? and usu_ativo = 'S'";
        let valores = [email, senha];
        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return new UsuarioModel(
                rows[0]["usu_id"], 
                rows[0]["usu_nome"], 
                rows[0]["usu_email"], 
                rows[0]["usu_ativo"], 
                rows[0]["usu_senha"], 
                rows[0]["per_id"], 
                rows[0]["per_descricao"]
            );
        }

        return null;
    }
}

module.exports = UsuarioModel;
