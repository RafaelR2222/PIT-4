const CompraModel = require("../models/compraModel");
const FornecedorModel = require("../models/fornecedorModel");


class fornecedorController{
    
    async listarView(req, res) {
        let fornecedor = new FornecedorModel();
        let listaFornecedor = await fornecedor.listarFornecedor()
        res.render('fornecedor/listar', {lista: listaFornecedor, layout: 'layoutADM'});
    }

    cadastrarView(req, res) {
        res.render('fornecedor/cadastrarForn', { layout: 'layoutADM' });
    }

    async alterarView(req, res) {
        if(req.params.id != undefined){
            let fornecedor = new FornecedorModel();
            fornecedor = await fornecedor.obterFornecedorPorId(req.params.id);
            res.render('fornecedor/alterar', {fornecedor: fornecedor, layout: 'layoutADM'});
        }
        else
            res.redirect("/")
        
    }

    async obterFornecedor(req, res) {
        let fornecedor = new FornecedorModel();
        let listaFornecedor = await fornecedor.obterFornecedor();
        return res.send({ listaFornecedor });
    }

    async cadastrar(req, res) {
        if(req.body.nome != '' && req.body.cnpj != '' ){
            let fornecedor = new FornecedorModel(0, req.body.cnpj, req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.cep);
            let resultado = await fornecedor.salvarFornecedor();

            if(resultado == true){
                res.send({ok: true, msg: "Fornecedor cadastrado!"})
            }
            else
                res.send({ok: false, msg: "Erro ao inserir fornecedor!"})
        }
        else {
            res.send({ok: false, msg: "Dados inválidos!"})
        }
    }

    async alterar(req, res) {
        if(req.body.id > 0 && req.body.nome != ''  && req.body.cnpj != '' 
        && req.body.email != ''  && req.body.telefone != ''  && req.body.endereco != '' && req.body.cep != '') {
            
            let fornecedor = new FornecedorModel(req.body.id, req.body.cnpj, req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.cep)
            
            let resultado = await fornecedor.editarFornecedor();

            if(resultado == true)
                res.send({ok: true, msg: "Fornecedor alterado"})
            else
                res.send({ok: false, msg: "Erro ao alterar fornecedor"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }

    async excluir(req, res) {
        if(req.body.id != ""){
            let fornecedor = new FornecedorModel();
            let result = await fornecedor.deletarFornecedor(req.body.id);
            if(result == true)
                res.send({ok: true, msg: "Fornecedor excluído!"});
            else
                res.send({ok: false, msg: "Erro ao excluir fornecedor!"});
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }

    async filtrar(req, res) {
        let fornecedor = new FornecedorModel();
        let lista = await fornecedor.filtrarFornecedorPorCNPJ(req.body.cnpjBusca);
        let listaJSON = [];

        lista.forEach(function(value, index) {
            listaJSON.push(value.toJSON());
        })

        res.send({ lista: lista.toJSON});
    }

}

module.exports = fornecedorController;