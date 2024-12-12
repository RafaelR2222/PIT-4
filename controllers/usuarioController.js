const PerfilModel = require("../models/perfilModel");
const UsuarioModel = require("../models/usuarioModel");
const cookieParser = require('cookie-parser');
class UsuarioController {


    async listarView(req, res) {
        let usuarioModel = new UsuarioModel();
        const usuarioCodificado = req.cookies.usuario_logado;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let listaUsuarios = await usuarioModel.listarUsuarios();
        res.render('usuario/listar', {lista: listaUsuarios, usuario: usuario, layout: 'layoutADM'});
    }

    async cadastrarView(req, res) {
        let perfil = new PerfilModel();
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let listaPerfil = await perfil.listarPerfil();
        res.render('usuario/cadastrar', {listaPerfil: listaPerfil, usuario:usuario, layout: 'layoutADM'});
    }

    async alterarView(req, res) {
        if(req.params.id != undefined) {
            let usuarioModel = new UsuarioModel();
            let user = await usuarioModel.obterUsuario(req.params.id)
            const usuarioCodificado = req.cookies.usuarioAtual;
            let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
            let perfil = new PerfilModel();
            let listaPerfil = await perfil.listarPerfil();
            res.render('usuario/alterar', {usuario: usuario, user: user, listaPerfil: listaPerfil, layout: 'layoutADM'});
        }
        else {
            res.redirect("/");
        }
        
    }

    async obterIdPorEmail(req, res) {
        let usuarioModel = new UsuarioModel();
        let id = await usuarioModel.obterUsuarioCompletoPorEmail(req.params.email);
        res.send({id: id.usuId});
    }

    async excluir(req, res) {
        if(req.body.id != ""){
            let usuario = new UsuarioModel();
            let result = await usuario.deletarUsuario(req.body.id);
            if(result == true)
                res.send({ok: true, msg: "Usuário excluído!"});
            else
                res.send({ok: false, msg: "Erro ao excluir usuário, não é possível excluir um usuario vinculado a uma reserva!"});
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }

    async cadastrar(req, res) {
        if(req.body.nome != ''  && req.body.email != '' 
        && req.body.perfil != '0' && req.body.senha != "") {
            
            let usuario = new UsuarioModel(0, req.body.nome, 
            req.body.email, req.body.ativo, req.body.senha, req.body.perfil)
            
            let resultado = await usuario.gravarUsuario();

            if(resultado == true)
                res.send({ok: true, msg: "Usuário adicionado !"})
            else
                res.send({ok: false, msg: "Erro ao inserir usuário"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }

    
    async alterar(req, res) {
        if(req.body.id > 0 && req.body.nome != ''  && req.body.email != '' 
        && req.body.perfil != '0' && req.body.senha != "") {
            
            let usuario = new UsuarioModel(req.body.id, req.body.nome, 
            req.body.email, req.body.ativo, req.body.senha, req.body.perfil)
            
            let resultado = await usuario.gravarUsuario();

            if(resultado == true)
                res.send({ok: true, msg: "Usuário alterado"})
            else
                res.send({ok: false, msg: "Erro ao alterar usuário"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }
}

module.exports = UsuarioController;