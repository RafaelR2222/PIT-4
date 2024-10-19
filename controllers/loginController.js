const UsuarioModel = require("../models/usuarioModel");
const { assinar } = require("../middlewares/funcoesJWT.js");
const cookieParser = require('cookie-parser');
class LoginController {

    indexView(req, res) {
        res.render('login/index');
    }

    logout(req, res) {
        res.clearCookie("usuarioLogado");
        res.clearCookie("token");
        res.redirect("/login");
    }

    async autenticar(req, res) {
        if (req.body.email && req.body.senha) {
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticarUsuario(req.body.email, req.body.senha);
            if (usuario) {
                // Limpa o token existente, se houver
                res.clearCookie("token");

                const token = assinar(usuario);
                console.log("Token gerado:", token);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000 // 1 hora
                });

                 usuario.obterUsuarioPorEmail(req.body.email);
                 usuario.usuNome
                if(usuario.usuNome){
                    res.cookie('usuarioAtual' , usuario.usuNome, { httpOnly: true, secure: false });
                }
                res.cookie("usuarioLogado", usuario.usuId);
                

                res.send({ status: true, msg: "Autenticação realizada com sucesso" });
            } else {
                res.send({ status: false, msg: "Credenciais inválidas" });
            }
        } else {
            res.send({ status: false, msg: "Credenciais inválidas" });
        }
    }

}

module.exports = LoginController;
