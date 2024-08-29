const Database = require('../utils/database')
const ProdutoModel = require("./produtoModel");

const conexao = new Database();

class ItensCompraModel {

    #compraId;
    #produtoId;
    #compraItemQuantidade;
    #compraItemPrecoUnit;
    #produtoNome;

    get compraId() {
        return this.#compraId;
    }
    set compraId(compraId){
        this.#compraId = compraId;
    }

    get produtoId() {
        return this.#produtoId;
    }
    set produtoId(produtoId){
        this.#produtoId = produtoId;
    }

    get compraItemQuantidade() {
        return this.#compraItemQuantidade;
    }

    set compraItemQuantidade(compraItemQuantidade){
        this.#compraItemQuantidade = compraItemQuantidade;
    }

    get compraItemPrecoUnit() {
        return this.#compraItemPrecoUnit;
    }

    set compraItemPrecoUnit(compraItemPrecoUnit){
        this.#compraItemPrecoUnit = compraItemPrecoUnit;
    }

    get produtoNome() {
        return this.#produtoNome;
    }

    set produtoNome(produtoNome){
        this.#produtoNome = produtoNome;
    }

    constructor(compraId, produtoId, compraItemQuantidade, compraItemPrecoUnit, produtoNome){
        this.#compraId = compraId;
        this.#produtoId = produtoId;
        this.#compraItemQuantidade = compraItemQuantidade;
        this.#compraItemPrecoUnit = compraItemPrecoUnit;
        this.#produtoNome = produtoNome;
    }

    async listar(compraId) {
        let lista = [];
        let sql = "select * from tb_itens_compra where ic_Compra_Codcom = ?";
        let valores = [compraId];

        let rows = await conexao.ExecutaComando(sql, valores);


        for(let i=0; i<rows.length; i++){
            let row = rows[i];


            let produto = new ProdutoModel();
            produto = await produto.obterProdutoPorId(row["ic_Produto_Codigo"]);

            var data = {
                compraCodigo: row["comp_Cod"],
                produtoCodigo: row["ic_Produto_Codigo"],
                quantidade: row["ic_Quantidade"],
                valorUnitario: row["ic_ValorUnit"],
                produtoNome: produto.proDescricao,
                valor: row["ic_Quantidade"] * row["ic_ValorUnit"],
            }

            lista.push(data);
        }

        return lista;
    }

    async buscarPorProdutoId(produtoId) {
        let lista = [];
        let sql = "select * from tb_itens_compra where ic_Produto_Codigo = ?";
        let valores = [produtoId];

        let rows = await conexao.ExecutaComando(sql, valores);

        for(let i=0; i<rows.length; i++){
            let row = rows[i];

            var data = {
                compraCodigo: row["comp_Cod"],
                produtoCodigo: row["ic_Produto_Codigo"],
                quantidade: row["ic_Quantidade"],
                valorUnitario: row["ic_ValorUnit"],
            }

            lista.push(data);
        }

        return lista;
    }



    async gravar() {
        let sql = `insert into tb_itens_compra
                    (ic_Compra_Codcom, ic_Produto_Codigo, ic_Quantidade, ic_ValorUnit)
                    values (?, ?, ?, ?)`;
        let valores = [this.#compraId, this.#produtoId, this.#compraItemQuantidade, this.#compraItemPrecoUnit];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // async editarCompra() {
    //         let sql = `update tb_compra set Pessoa_cod_pessoa = ?, comp_Valor = ?, 
    //             comp_Data = ? where comp_Cod = ?`;
    //         let valores = [this.#compCodigoPessoa, this.#compValor, this.#compData, this.#compCod];

    //         let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

    //         return resultado;
    // }

    // async listarCompras() {
    //     let lista = [];
        
    //     let sql = "select * from tb_compra"

    //     let rows = await conexao.ExecutaComando(sql)

    //     for(let i=0; i<rows.length; i++){
    //         let row = rows[i];
            
    //         let compra = new CompraModel(row["comp_Cod"], row["Pessoa_cod_pessoa"], 
    //         row["comp_Valor"], row["comp_Data"]);

    //         lista.push(compra);
    //     }

    //     return lista;
    // }

    // async deletarCompra(id) {
        
    //     let sql = "delete from tb_compra where comp_Cod = ?";
    //     let valores = [id];

    //     let result = await conexao.ExecutaComandoNonQuery(sql, valores);

    //     return result;
    // }
}


module.exports = ItensCompraModel;