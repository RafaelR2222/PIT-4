const QuartoModel = require("../models/quartoModel");
const ReservaModel = require("../models/reservaModel");

const nodemailer = require('nodemailer');

const quartos = new QuartoModel();

const cookieParser = require('cookie-parser');

class ReservaController {

    reservaView(req, res) {
        res.render('reserva/reserva');
    }
   async listarView(req,res){
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let ReservasModel = new ReservaModel();
        let listaReservas = await ReservasModel.obterReservas()
        res.render('reserva/listar', {lista: listaReservas, usuario: usuario, layout: 'layoutADM'});
    }

    async gravarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resPesNome = req.body.nome;
        reserva.resPesEmail = req.body.email;
        reserva.resQuartoId = req.body.quartos;
        reserva.resDataCheckin = req.body.dataInicial;
        reserva.resDataCheckout = req.body.dataFinal;
        reserva.resNumAdulto = req.body.adultos;
        reserva.resNumCrianca = req.body.criancas;
        let quartosDisponiveis = await quartos.obterQuartoDesocupado();
        let numQuarto = 0;
        if(reserva.resQuartoId == '1'){
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto <= 10);
            if(!numQuarto || numQuarto == 0){
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if(reserva.resQuartoId == '2'){
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 10 && quarto.qrIdQuarto <= 20);
            if(!numQuarto || numQuarto == 0){
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if(reserva.resQuartoId == '3'){
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 20 && quarto.qrIdQuarto <= 30);

            if(!numQuarto || numQuarto == 0){
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if(reserva.resQuartoId == '4'){
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 30 && quarto.qrIdQuarto <= 40);
            if(!numQuarto || numQuarto == 0){
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if(reserva.resQuartoId == '5'){
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 40 && quarto.qrIdQuarto <= 50);
            if(!numQuarto || numQuarto == 0){
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if(reserva.resQuartoId == '6'){
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 50 && quarto.qrIdQuarto <= 60);
            if(!numQuarto || numQuarto == 0){
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        reserva.resQuartoId = String(numQuarto.qrIdQuarto);

        try{
            let gravar = await reserva.gravarReserva(reserva);
            if(gravar){
                await quartos.editarQuartoReserva(reserva.resQuartoId);
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.SENHA
                    }
                });
        
                let mailOptions = {
                    from: process.env.EMAIL,
                    to: reserva.resPesEmail,
                    subject: 'Reserva Confirmada',
                    text: `Obrigado por reservar conosco. O ID do seu quarto é: ${reserva.resQuartoId}. Te esperamos no dia ${reserva.resDataCheckin}!`
                };
        
                // Send the email
                await transporter.sendMail(mailOptions);
            }
            else{
                return res.send({ ok: false, message: "Reserva falha" });
            }
            return res.send({ ok: true, message: "Reserva efetuada com sucesso" });
        }
        catch(e){
            return res.send({ ok: false, message: "Reserva falha", error: e});
        }
    }

    async obterReserva(req, res) {
        let reserva = new ReservaModel();
        let listaReserva = await reserva.obterReserva(req.params.id);
        return res.send({ listaReserva });
    }

    async listarReservas(req, res) {
        let reserva = new ReservaModel();
        let listaReserva = []
        if(req.body != undefined){
            let termo = req.body.termo;
            let busca = req.body.busca;
            listaReserva = await reserva.listaReservas(termo, busca);
        }
        return res.send({ listaReserva });
    }

    async excluirReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resId = req.params.id;
        await reserva.excluirReserva(req.params.id);
        return res.send({ ok: true, message: "Reserva excluida" });
    }

    async editarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resId = req.params.id;
        reserva = await reserva.editarReserva(req.params.id);
        return res.send( { ok: true, reserva });
    }
}

module.exports = ReservaController;