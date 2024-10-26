const RedefinirSenhaModel = require('../models/redefinirSenhaModel');
const crypto = require('crypto');
const UsuarioModel = require("../models/usuarioModel");
const TokenModel = require("../models/tokenModel")
const nodemailer = require('nodemailer');
const { response } = require('express');
const cookieParser = require('cookie-parser');

class RedefinirSenhaController {


      generateToken(length = 8) {
        return crypto.randomBytes(length).toString('hex');
      }


     async obterTokenPorEmail(req, res) {
        const redefinirSenhaModel = new RedefinirSenhaModel();
        try {
            const usuario = await redefinirSenhaModel.obterTokenPorEmail(req.body.email); // Aqui
            if (usuario) {
                return res.status(200).json(usuario.toJson());
            } else {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    async alterarSenha(req, res) {
    const email = req.body.email
    const senha = req.body.senha   

    const redefinirSenhaModel = new RedefinirSenhaModel();
    let senhaRedefinida = redefinirSenhaModel.alterarSenha(email, senha);
        if(senhaRedefinida){
            return res.status(200).json({ message: 'Sucesso ao redefinir senha!' , status: true });
        }else{
            return res.status(404).json({ message: "Não foi possivel redefinir senha!", status: false});
        }
    }

    verificarTokenValido(req, res) {
        
    const token = req.body.token;
        if(token){
            let redefinirSenhaModel = new RedefinirSenhaModel();
            let usuarioModel = new UsuarioModel()
            let tokenModel = new TokenModel()
            let tokenValido = tokenModel.verificarTokenValido(token)
            const emailCodificado = req.cookies.email_redefinicao;
            let email = emailCodificado ? decodeURIComponent(emailCodificado) : null;
            if(tokenValido){
                let usuarioModel = new UsuarioModel()
                if(email){
                   let gravarTokenEmUsuarios = usuarioModel.gravarTokenEmUsuarios(email, token);
                   if(gravarTokenEmUsuarios){
                        res.cookie('alterarSenhaAprovado', true, { httpOnly: true, secure: false });
                        return res.status(200).json({ message: 'Token validado com sucesso!.' , status: true });
                   }else{
                        return res.status(500).json({ message: 'Token validado porém não foi gravado.' , status: true });
                   }
                   
                }
                
               
            }else{
                return res.status(412).json({ message: 'Token invalidado!.' , status: false });
            }
        } else {
             return res.status(412).json({ message: 'Token invalidado!.' , status: false });
        }
    }

    async enviarTokenPorEmail(req, res) {
        const redefinirSenhaModel = new RedefinirSenhaModel();
        const Email = req.body.email;
        const Token = req.body.token;
        try {
            const reposta = await redefinirSenhaModel.gravarTokenComEmail(Email, Token); // Aqui
            if (reposta) {
                try {
                    let respostaEnvio = await redefinirSenhaModel.enviarCodigoPorEmail(Email, Token);
                    if (respostaEnvio) {
                        //aqui chatgpt

                        res.cookie('email_redefinicao', Email, { httpOnly: true, secure: false });
                        console.log('E-mail enviado com sucesso!');
                        return res.status(200).json({ message: 'Sucesso ao enviar o e-mail.' , status: true });
                    }
                } catch (error) {
                    console.error('Erro ao enviar o token por e-mail: ', error);
                    return res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
                }

            }else{
                return res.status(404).json({ message: "Não foi possivel gravar o email e token." });
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async obterUsuarioPorEmail(req, res){
        const usuarioModel = new UsuarioModel();
        try {
            const usuario = await usuarioModel.obterUsuarioPorEmail(req.body.email); // Aqui
            if (usuario) {
                res.cookie('usuario_logado', usuario, { httpOnly: true, secure: false });
                res.send({ status: true, msg: "Autenticação realizada com sucesso" });
            } else {
                res.send({ status: false, msg: "Usuário não encontrado!" });
            }
        } catch (error) {
            res.send({ status: true, msg: "Erro ao buscar usuário!" });
        }
    }

     async gerarEGravarToken(req, res) {
        const model = new RedefinirSenhaModel();
        const usuarioModel = new UsuarioModel()
        const tokenString = this.generateToken();
      

        // Verificar se o usuário existe
        const usuario = await model.obterTokenPorEmail(req.body.email);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        model.usuId = usuario.usuId; // Presumindo que o modelo tem essa propriedade
        model.token = tokenString; // Presumindo que o modelo tem essa propriedade

        let resultadoTokenEmTokens = await model.gravarToken(model.usuId, tokenString, req.body.email); // Gravar token na tabela tb_tokens
        let resultadoTokenEmUsuarios = await usuarioModel.gravarTokenEmUsuarios(req.body.email, tokenString); // Gravar token na tabela tb_usuarioh

        if(resultadoTokenEmTokens && resultadoTokenEmUsuarios ){
            return res.status(200).json({ message: "Token gerado com sucesso!", token: tokenString}); // Retorna o token gerado}
        }else{
            return res.status(412).json({ message: "Não foi possivel gravar o token!", token: tokenString}); // Retorna o token gerado} 
        }
    
    }

    async redefinicaoView(req, res) {
        const usuarioCodificado = req.cookies.usuario_logado;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
            res.render('senha/redefinirSenha', {usuario: usuario});
    }

    async senhaNovaView(req, res){

            const emailCodificado = req.cookies.email_redefinicao;
            let email = emailCodificado ? decodeURIComponent(emailCodificado) : null;
            const usuarioCodificado = req.cookies.usuario_logado;
            let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
            if(email){
                res.clearCookie('email_redefinicao', { httpOnly: true, secure: false });
                res.clearCookie('alterarSenhaAprovado', { httpOnly: true, secure: false });
                
                
    
            }
            res.render('senhanova/senhaNova', {email: email, usuario: usuario});
        
    }

}

module.exports = RedefinirSenhaController;
