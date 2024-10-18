const UsuarioModel = require("../models/usuarioModel");
const { verificarAssinatura } = require("./funcoesJWT.js");

class Autenticacao {

    async verificaUsuarioLogado(req, res, next) {
        if (req.cookies.usuarioLogado) {
            let id = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obterUsuario(id);
            res.locals.usuarioLogado = usuario;
            if (usuario && usuario.usuAtivo == 'S') {
                return next();
            }
        }
        res.redirect('/login');
    }

    async verificaAlterarSenhaAprovado(req, res, next) {
        if (req.cookies.alterarSenhaAprovado){
                return next();
            }else{
                res.redirect('/redefinicao');
            }
    }
    

    async verificaUsuarioADMLogado(req, res, next) {
        const token = req.cookies.token;

        if (req.cookies.usuarioLogado) {
            let id = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obterUsuario(id);
            if (usuario.usuAtivo == 'S' && usuario.perId === 1) {
                res.locals.usuarioLogado = usuario;
                if (token) {
                    try {
                        const tokenVerificado = verificarAssinatura(token);
                        if (tokenVerificado && tokenVerificado.usuario) {
                            return next();
                        }
                    } catch (err) {
                        // Se o token estiver expirado ou inválido, limpa os cookies e redireciona para login
                        res.clearCookie('token');
                        res.redirect('/login');
                    }
                }
            }
        }
        res.clearCookie('token');
        res.redirect('/login');
    }

    async verificaUsuarioFuncLogado(req, res, next) {
        res.clearCookie('isAdmin');
        const token = req.cookies.token;

        if (token) {
            try {
                const tokenVerificado = verificarAssinatura(token);
                if (tokenVerificado && tokenVerificado.usuario) {
                    const id = req.cookies.usuarioLogado;
                    let usuario = new UsuarioModel();
                    usuario = await usuario.obterUsuario(id);
                    if (usuario.usuAtivo == 'S') {
                        res.cookie('isAdmin', usuario.perId === 1, { httpOnly: true, maxAge: 10 * 60 * 1000 }); // Expira em 10min
                        res.locals.usuarioLogado = usuario;
                        
                        if (usuario.perId === 1 || usuario.perId === 2) {
                            if (usuario.perId === 2 && req.path.startsWith('/usuarios')) {
                                return res.redirect('/login');
                            }
                            return next();
                        } else {
                            return res.redirect('/login');
                        }
                    } else {
                        return res.redirect('/login');
                    }
                }
            } catch (err) {
                // Se o token estiver expirado ou inválido, limpa os cookies e redireciona para login
                res.clearCookie('token');
                res.clearCookie('usuarioLogado');
                return res.redirect('/login');
            }
        }
        
        // Se o token não estiver presente, limpa os cookies e redireciona para login
        res.clearCookie('usuarioLogado');
        res.clearCookie('token');
        return res.redirect('/login');
    }
}

module.exports = Autenticacao;
