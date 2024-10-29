const UsuarioModel = require("../models/usuarioModel");
const { assinar } = require("../middlewares/funcoesJWT.js");
const cookieParser = require('cookie-parser');

class LoginController {

    indexView(req, res) {
        res.render('login/index');
    }

    logout(req, res) {
        // Limpa os cookies de sessão ao fazer logout
        res.clearCookie("usuarioLogado");
        res.clearCookie("token");
        res.redirect("/login");
    }

    async autenticar(req, res) {
        if (req.body.email && req.body.senha) {
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticarUsuario(req.body.email, req.body.senha);

            // Verifica se o usuário foi encontrado antes de prosseguir
            if (usuario) {
                // Limpa o token existente, se houver
                res.clearCookie("token");

                // Gera um novo token JWT
                const token = assinar(usuario);
                console.log("Token gerado:", token);

                // Define o cookie do token com configurações de segurança
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000 // 1 hora
                });

                // Busca o nome do usuário pelo e-mail fornecido
                usuario.obterUsuarioPorEmail(req.body.email);
                
                // Define um cookie com o nome do usuário se estiver presente
                if (usuario.usuNome) {
                    res.cookie('usuarioAtual', usuario.usuNome, { httpOnly: true, secure: false });
                }

                // Define o cookie com o ID do usuário logado
                res.cookie("usuarioLogado", usuario.usuId);

                // Envia a resposta com a permissão de acesso (perId) caso esteja disponível
                res.send({
                    status: true,
                    msg: "Autenticação realizada com sucesso",
                    user: usuario.perId || null // Adicionamos `|| null` para enviar null caso `perId` não exista
                });
            } else {
                // Se `usuario` for null, envia a mensagem de credenciais inválidas
                res.send({ status: false, msg: "Credenciais inválidas" });
            }
        } else {
            // Caso falte algum dos campos necessários no `req.body`, envia a mensagem de erro
            res.send({ status: false, msg: "Credenciais inválidas" });
        }
    }
}

module.exports = LoginController;
