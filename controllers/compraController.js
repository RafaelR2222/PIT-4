const CompraModel = require("../models/compraModel");
const ProdutoModel = require("../models/produtoModel");
const FornecedorModel = require("../models/fornecedorModel");
const ItensCompraModel = require("../models/itensCompraModel");

class CompraController {
    async listarView(req, res) {
        let compra = new CompraModel();
        let listaCompra = await compra.listar()
        res.render('compra/listar', {lista: listaCompra, layout: 'layoutADM'});
    }

    async visualizarView(req, res) {
        if(req.params.id != undefined){
            let itensCompra = new ItensCompraModel();
            let listaItensCompra = await itensCompra.listar(req.params.id);

            let compra = new CompraModel();
            compra = await compra.obterCompraPorCodigo(req.params.id)

            res.render('compra/visualizar', {lista: listaItensCompra, compra, layout: 'layoutADM'});
        } else {
            res.redirect("/")
        }
    }

    async cadastrarView(req, res) {
        let produto = new ProdutoModel()
        let listaProduto = await produto.listarProdutos()
        res.render('compra/cadastrar', { listaProduto: listaProduto, layout: 'layoutADM' });
    }

    async alterarView(req, res) {
        if(req.params.id != undefined){
            let compra = new CompraModel();
            compra = await compra.obterCompraPorId(req.params.id);
            res.render('compra/alterar', {compra: compra, layout: 'layoutADM'});
        }
        else
            res.redirect("/")
    }

    async listarCompras(req, res){
        let ok = false;
        let listaRetorno = [];
        if(req.body != undefined){
            let termo = req.body.termo;
            let busca = req.body.busca;
            let compra = new CompraModel();
            listaRetorno = await compra.listar(termo, busca);
            ok = true;
        }

        res.send({ok: ok, listaRetorno: listaRetorno});
    }

    async excluir(req, res) {
        if(req.body.id != ""){
            let compra = new CompraModel();
            let result = await compra.deletarCompra(req.body.id);
            if(result == true)
                res.send({ok: true, msg: "Compra excluído!"});
            else
                res.send({ok: false, msg: "Erro ao excluir compra!"});
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }

    async gravarCompra(req, res) {
        const listaProdutos = req.body.listaProdutos;
        if(req.body.codigo && req.body.cnpj != '' && req.body.valor != '' && req.body.data != '' && listaProdutos != null & listaProdutos.length > 0){
            let fornecedor = new FornecedorModel();
            fornecedor = await fornecedor.obterFornecedorPorCNPJ(req.body.cnpj);
            
            if (fornecedor != null) {
                let compra = new CompraModel(req.body.codigo, fornecedor.fornId, req.body.valor, req.body.data);
                
                const compraExistente = await compra.obterCompraPorCodigo(req.body.codigo);

                if (compraExistente != null) {
                    res.send({ ok: true, msg: "Já existe uma compra com esse código!"});
                    return;
                }

                const codigoCompra = await compra.salvarCompra();

                for (let i = 0; i < listaProdutos.length; i++) {
                    let produtoQuant = listaProdutos[i];
                    let compraItem = new ItensCompraModel(codigoCompra, listaProdutos[i].id, listaProdutos[i].quantidade, listaProdutos[i].preco);
                    let produto = new ProdutoModel();
                    let estoque = await produto.obterProdutoPorId(produtoQuant.id);

                    await compraItem.gravar();
                    await produto.atualizarQuantidadeEstoque(parseInt(estoque.proQuantidade) + parseInt(produtoQuant.quantidade), estoque.proCodigo);
                }
                res.send({ ok: true, msg: "Compra gravada com sucesso"})
            } else {
                res.send({ok: false, msg: "Não existe um fornecedor cadastrado com esse CNPJ!"});
            }
        }
        else
            res.send({ok: false, msg: "Dados inválidos!"})
    }

    async alterar(req, res) {
        if(req.body.codigo > 0 && req.body.codigoPessoa != ''  && req.body.valor != '' 
        && req.body.data != '') {
            
            
            let compra = new CompraModel(req.body.codigo, req.body.codigoPessoa, 
            req.body.valor, req.body.data)
            
            let resultado = await compra.editarCompra();

            if(resultado == true)
                res.send({ok: true, msg: "Compra alterado"})
            else
                res.send({ok: false, msg: "Erro ao alterar compra"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }
}

module.exports = CompraController;