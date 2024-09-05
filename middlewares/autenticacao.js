const UsuarioModel = require("../models/usuarioModel");


class Autenticacao {

    async verificaUsuarioLogado(req, res, next) {
        if(req.headers.cookie != undefined && 
            req.headers.cookie.includes('usuarioLogado')) {
                let id = req.cookies.usuarioLogado;
                let usuario = new UsuarioModel();
                usuario = await usuario.obterUsuario(id);
                if(usuario.usuAtivo == 'S'){
                    res.locals.usuarioLogado = usuario;
                    next();
                }
                else
                    res.redirect('/login');
        }
        else{
            res.redirect("/login");
        }
    }

    async verificaUsuarioADMLogado(req, res, next) {
        if(req.headers.cookie != undefined && 
            req.headers.cookie.includes('usuarioLogado')) {
                let id = req.cookies.usuarioLogado;
                let usuario = new UsuarioModel();
                usuario = await usuario.obterUsuario(id);
                if(usuario.usuAtivo == 'S' && usuario.perId === 1){
                    res.locals.usuarioLogado = usuario;
                    next();
                }
                else
                    res.redirect('/login');
        }
        else{
            res.redirect("/login");
        }
    }

    async verificaUsuarioFuncLogado(req, res, next) {
        res.clearCookie('isAdmin');
        if(req.headers.cookie != undefined && 
            req.headers.cookie.includes('usuarioLogado')) {
                let id = req.cookies.usuarioLogado;
                let usuario = new UsuarioModel();
                usuario = await usuario.obterUsuario(id);
                if (usuario.usuAtivo == 'S') {
                    //cria is admin true em caso de ser admin e false caso nao
                    if (usuario.perId === 2) {
                        res.cookie('isAdmin', usuario.perId === 1, { httpOnly: true, maxAge: 10 * 60 * 1000 }); // Expira em 10min
                        res.locals.usuarioLogado = usuario;
                            
                    } else { 
                        res.cookie('isAdmin', usuario.perId === 1, { httpOnly: true, maxAge: 10 * 60 * 1000 }); // Expira em 10min
                        res.locals.usuarioLogado = usuario;
                            
                    }
                    // Verifica se o usuário é admin ou funcionário
                    if (usuario.perId === 1 || usuario.perId === 2) {
                        // Bloqueia funcionários (perId === 2) de acessar a criação de usuários
                        if (usuario.perId === 2 && req.path.startsWith('/usuarios')) {
                            return res.redirect('/login');
                        }
                        res.locals.usuarioLogado = usuario;
                        next();
                    } else {
                        // res.send({status: false, msg: "Você não tem permissão para acessar esta área!"});
                        return res.redirect('/');
                    }
                } else {
                    res.send({status: false, msg: "Você não é um usuário ativo!"});
                    return res.redirect('/login');
                }
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = Autenticacao;