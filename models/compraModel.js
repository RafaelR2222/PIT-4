const Database = require('../utils/database')

const conexao = new Database();

class CompraModel {

    #compCod;
    #compCodigoPessoa;
    #compValor;
    #compData;
    #fornNome

    get compCod() {
        return this.#compCod;
    }
    set compCod(compCod){
        this.#compCod = compCod;
    }

    get compCodigoPessoa() {
        return this.#compCodigoPessoa;
    }
    set compCodigoPessoa(compCodigoPessoa){
        this.#compCodigoPessoa = compCodigoPessoa;
    }

    get compValor() {
        return this.#compValor;
    }
    
    set compValor(compValor){
        this.#compValor = compValor;
    }

    get compData() {
        return this.#compData;
    }
    set compData(compData){
        this.#compData = compData;
    }

    get fornNome() {
        return this.#fornNome;
    }
    set fornNome(fornNome){
        this.#fornNome = fornNome;
    }

    constructor(compCod, compCodigoPessoa, compValor, compData, fornNome){
        this.#compCod = compCod;
        this.#compCodigoPessoa = compCodigoPessoa;
        this.#compValor = compValor;
        this.#compData = compData;
        this.#fornNome = fornNome;
    }

    async obterCompraPorCodigo(id) {
        let sql = "select * from tb_compra c inner join tb_pessoa p on c.Pessoa_cod_pessoa = p.pes_codigo where comp_Cod = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            var data = {
                compraCodigo: rows[0]["comp_Cod"],
                nomeFornecedor: rows[0]["pes_nome"],
                compraValor: rows[0]["comp_Valor"],
                compraData: rows[0]["comp_Data"]
            }

            return data;
        }

        return null;
    }

    async obterComprasPorFornecedor(fornecedorId) {
        let sql = "select * from tb_compra where Pessoa_cod_pessoa = ?";
        let valores = [fornecedorId];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            var data = {
                compraCodigo: rows[0]["comp_Cod"],
                compraValor: rows[0]["comp_Valor"],
                compraData: rows[0]["comp_Data"]
            }

            return data;
        }

        return null;
    }

    async salvarCompra() {
        let dataAtual = new Date();
        let sql = `insert into tb_compra
                    (comp_Cod, Pessoa_cod_pessoa, comp_Valor, comp_Data, comp_Data_criacao)
                    values (?, ?, ?, ?, ?)`;
        let valores = [this.#compCod, this.#compCodigoPessoa, this.#compValor, this.#compData, dataAtual];
        await conexao.ExecutaComandoNonQuery(sql, valores);
        return this.#compCod;
    }

    async editarCompra() {
            let sql = `update tb_compra set Pessoa_cod_pessoa = ?, comp_Valor = ?, 
                comp_Data = ? where comp_Cod = ?`;
            let valores = [this.#compCodigoPessoa, this.#compValor, this.#compData, this.#compCod];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
    }

    async deletarCompra(id) {
        
        let sql = "delete from tb_compra where comp_Cod = ?";
        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar(termo, busca) {
        let sqlWhere = "";
        if(termo != undefined && termo != ""){
            if(busca == "1") {
                if(isNaN(termo) == false)
                    sqlWhere = ` where c.comp_Cod = ${termo} `;
            }
            else if(busca == "2") {
                sqlWhere = ` where p.pes_nome like '%${termo}%'  `;
            }
        }

        let sql = `select * from tb_compra c inner join tb_pessoa p on c.Pessoa_cod_pessoa = p.pes_codigo
        ${sqlWhere} order by c.comp_Data_criacao DESC`;

        var rows = await conexao.ExecutaComando(sql);

        var relatorio = [];

        for(var i = 0; i < rows.length; i++){
            var row = rows[i];
            var data = {
                compraCodigo: row["comp_Cod"],
                nomeFornecedor: row["pes_nome"],
                compraValor: row["comp_Valor"],
                compraData: row["comp_Data"]
            }

            relatorio.push(data);
        }

        return relatorio;
    }
    
}


module.exports = CompraModel;