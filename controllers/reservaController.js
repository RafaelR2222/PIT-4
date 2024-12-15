const QuartoModel = require("../models/quartoModel");
const ReservaModel = require("../models/reservaModel");
const nodemailer = require('nodemailer');

const quartos = new QuartoModel();

const cookieParser = require('cookie-parser');
const UsuarioModel = require("../models/usuarioModel");

class ReservaController {

    reservaView(req, res) {
        res.render('reserva/reserva');
    }
    async listarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let ReservasModel = new ReservaModel();
        let listaReservas = await ReservasModel.obterReservas()
        res.render('reserva/listar', { lista: listaReservas, usuario: usuario, layout: 'layoutADM' });
    }

    async alterarView(req, res) {
        if (req.params.id != undefined) {
            const usuarioCodificado = req.cookies.usuario_logado;
            let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
            let reserva = new ReservaModel();
            reserva = await reserva.obterReservaPorId(req.params.id);
            console.log(JSON.stringify( { reserva: reserva, usuario: usuario}));
            res.render('reserva/alterar', { reserva: reserva, usuario: usuario, layout: 'layoutADM' });
        }
        else
            res.redirect("/")

    }

    async gravarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resPesNome = req.body.nome;
        reserva.resPesEmail = req.body.email;
        reserva.resQuartoId = req.body.quartos;
        reserva.resDataCheckin = new Date(req.body.dataInicial);
        reserva.resDataCheckout = new Date(req.body.dataFinal);
        reserva.resNumAdulto = req.body.adultos;
        reserva.resNumCrianca = req.body.criancas;
        let quartosDisponiveis = await quartos.obterQuartoDesocupado();
        let numQuarto = 0;
        if (reserva.resQuartoId == '1') {
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto <= 10);
            if (!numQuarto || numQuarto == 0) {
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if (reserva.resQuartoId == '2') {
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 10 && quarto.qrIdQuarto <= 20);
            if (!numQuarto || numQuarto == 0) {
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if (reserva.resQuartoId == '3') {
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 20 && quarto.qrIdQuarto <= 30);

            if (!numQuarto || numQuarto == 0) {
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if (reserva.resQuartoId == '4') {
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 30 && quarto.qrIdQuarto <= 40);
            if (!numQuarto || numQuarto == 0) {
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if (reserva.resQuartoId == '5') {
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 40 && quarto.qrIdQuarto <= 50);
            if (!numQuarto || numQuarto == 0) {
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        else if (reserva.resQuartoId == '6') {
            numQuarto = quartosDisponiveis.find(quarto => quarto.qrIdQuarto > 50 && quarto.qrIdQuarto <= 60);
            if (!numQuarto || numQuarto == 0) {
                return res.send({ ok: false, message: "Não há quartos disponíveis" });
            }
        }
        reserva.resQuartoId = String(numQuarto.qrIdQuarto);

       
            let gravar = await reserva.gravarReserva(reserva);
            if (gravar) {
                let usuario = new UsuarioModel(0, req.body.nome, 
                req.body.email, 'S', 123, 3)
                let resultado = await usuario.gravarUsuario();

                await quartos.editarQuartoReserva(reserva.resQuartoId);
               /* let transporter = nodemailer.createTransport({
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
                 */
                return res.send({ ok: true, message: "Reserva efetuada com sucesso" });
                // Send the email
                //await transporter.sendMail(mailOptions);
            }
            else {
                return res.send({ ok: false, message: "Reserva falha" });
            }
            return res.send({ ok: true, message: "Reserva efetuada com sucesso" });
       
    }

    async obterReserva(req, res) {
        let reserva = new ReservaModel();
        let listaReserva = await reserva.obterReserva(req.params.id);
        return res.send({ listaReserva });
    }

    async listarReservas(req, res) {
        let reserva = new ReservaModel();
        let listaReserva = []
        if (req.body != undefined) {
            let termo = req.body.termo;
            let busca = req.body.busca;
            listaReserva = await reserva.listaReservas(termo, busca);
        }
        return res.send({ listaReserva });
    }

    async excluirReserva(req, res) {
        let reserva = new ReservaModel();
        console.log(req.params.id);
        let delecao = await reserva.deletarReserva(req.params.id);
        if(delecao){
            return res.send({ ok: true, message: "Reserva excluida" });
        } else {
            return res.send({ ok: false, message: "Não foi possível excluir a reserva. A reserva possivelmente está vinculada a um check-in" });
        }
    }

    async editarReserva(req, res) {
        if (req.params.id != undefined) {
            let dataInicialString = req.body.dataInicial;
            let dataFinalString = req.body.dataFinal;
            var dataInicial = dataInicialString.split("/");

            var dataFinal = dataFinalString.split("/");
            var ObjetoDataInicial = new Date(+dataInicial[2], dataInicial[1] - 1, +dataInicial[0]); 
            var ObjetoDataFinal = new Date(+dataFinal[2], dataFinal[1] - 1, +dataFinal[0]);
            
            let reserva = new ReservaModel();
            reserva.resPesNome = req.body.nome;
            reserva.resPesEmail = req.body.email;
            reserva.resQuartoId = parseInt(req.body.quartos);
            reserva.resDataCheckin = ObjetoDataInicial;
            reserva.resDataCheckout = ObjetoDataFinal;
            reserva.resNumAdulto = parseInt(req.body.adultos);
            reserva.resNumCrianca = parseInt(req.body.criancas);

            reserva = await reserva.editarReserva(req.params.id);
            return res.send({ ok: true, reserva });
        }
        else {
            return res.send({ ok: false, message: "Reserva não encontrada" });
        }

    }
}

module.exports = ReservaController;