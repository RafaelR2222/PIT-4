
const Database = require('../utils/database');
const conexao = new Database();
const UsuarioModel = require("../models/usuarioModel");
class TokenModel {
    #id;
    #tkTokens;
    #tkEmail;

    // Getters e Setters
    get id() { return this.#id; }
    set id(id) { this.#id = id; }

    get tkTokens() { return this.#tkTokens; }
    set tkTokens(tkTokens) { this.#tkTokens = tkTokens; }

    get tkEmail() { return this.#tkEmail; }
    set tkEmail(tkEmail) { this.#tkEmail = tkEmail; }

    constructor(id, tkTokens, tkEmail) {
        this.#id = id;
        this.#tkTokens = tkTokens;
        this.#tkEmail = tkEmail;
    }

    // Método para converter a instância em um objeto JSON
    toJson() {
        return {
            id: this.#id,
            tkTokens: this.#tkTokens,
            tkEmail: this.#tkEmail
        };
    }

    // Método para gravar um token na tabela
    async gravarToken() {
        const sql = "INSERT INTO tb_tokens (tk_tokens, tk_email) VALUES (?, ?)";
        const valores = [this.#tkTokens, this.#tkEmail];
        return await conexao.ExecutaComandoNonQuery(sql, valores);
    }

    // Método para verificar se um token é válido
    async verificarTokenValido(token) {
        const sql = "SELECT * FROM tb_tokens WHERE tk_tokens = ?";
        const valores = [token];
        const rows = await conexao.ExecutaComando(sql, valores);
        let resultado = false
        if(rows){
            resultado = true
        }
        return resultado; // Retorna true se o token existir
    }

    // Método para obter um token por email
    async obterTokenPorEmail(tkEmail) {
        const sql = "SELECT * FROM tb_tokens WHERE tk_email = ?";
        const valores = [tkEmail];
        const rows = await conexao.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            return new TokenModel(rows[0].id, rows[0].tk_tokens, rows[0].tk_email);
        }
        return null;
    }
    
} 

module.exports = TokenModel;
