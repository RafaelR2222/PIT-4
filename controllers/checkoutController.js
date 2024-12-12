const CheckoutModel = require("../models/checkOutModel");
const CheckinModel = require("../models/checkInModel");
const ReservaModel = require("../models/reservaModel");
const QuartoModel = require("../models/quartoModel");
const ServiceModel = require("../models/serviceModel");
const UsuarioModel = require("../models/usuarioModel");

class CheckoutController {
    
    // Exibe a tela de check-out
    async checkoutView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let checkout = new CheckoutModel();
        let listaCheckouts = await checkout.obterCheckouts();  // Método de obter todos os checkouts
        res.render('checkout/alterar', { lista: listaCheckouts, usuario: usuario, layout: 'layoutADM' });
    }

    // Exibe a tela de cadastro de check-out
    cadastrarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        res.render('checkout/cadastrar', { usuario: usuario, layout: 'layoutADM' });
    }

    // Exibe a tela de alteração de check-out
    alterarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        res.render('checkout/alterar', { usuario: usuario, layout: 'layoutADM' });
    }

    // Realiza o checkout
    async gravarCheckout(req, res) {
        let checkoutModel = new CheckoutModel();
        let dadosCheckout;

        // Verifica se o coId está presente para editar ou criar um novo checkout
        if (!req.body.coutId) {
            // Novos dados para o checkout
            const {
                cinId,  // Usado para co_id_checkin
                cinIdReserva,  // Usado para co_id_reserva
                cinNomePessoa,  // Usado para co_nome_pessoa
                cinEmail,  // Usado para co_email
                cinQuarto,  // Usado para co_quarto
                cinQuartoValor,  // Usado para co_quarto_valor
                cinNomeQuarto,  // Usado para co_nome_quarto
                cinData,  // Usado para co_cin_data
                cinCinDataEsperada,  // Usado para co_cin_data_esperada
                cinCoutData,  // Usado para co_cout_data_real
                cinCoutDataEsperada,  // Usado para co_cout_data_esperada
                cinDataReserva,  // Usado para co_dataReserva
                cinNumAdultos,  // Usado para co_num_adultos
                cinNumCriancas,  // Usado para co_num_criancas
                cinIdServContratados,  // Usado para co_id_servContratados
                cinNomeServContratados,  // Usado para co_nome_servContratados
                cinValorServs  // Usado para co_valor_servs
            } = req.body;

            dadosCheckout = [
                cinId,  // Usado para co_id_checkin
                cinIdReserva,  // Usado para co_id_reserva
                cinNomePessoa,  // Usado para co_nome_pessoa
                cinEmail,  // Usado para co_email
                cinQuarto,  // Usado para co_quarto
                cinQuartoValor,  // Usado para co_quarto_valor
                cinNomeQuarto,  // Usado para co_nome_quarto
                cinData,  // Usado para co_cin_data
                cinCinDataEsperada,  // Usado para co_cin_data_esperada
                cinCoutData,  // Usado para co_cout_data_real
                cinCoutDataEsperada,  // Usado para co_cout_data_esperada
                cinDataReserva,  // Usado para co_dataReserva
                cinNumAdultos,  // Usado para co_num_adultos
                cinNumCriancas,  // Usado para co_num_criancas
                cinIdServContratados,  // Usado para co_id_servContratados
                cinNomeServContratados,  // Usado para co_nome_servContratados
                cinValorServs  // Usado para co_valor_servs
            ];
        } else {
            const {
                cinId,  // Usado para co_id_checkin
                cinIdReserva,  // Usado para co_id_reserva
                cinNomePessoa,  // Usado para co_nome_pessoa
                cinEmail,  // Usado para co_email
                cinQuarto,  // Usado para co_quarto
                cinQuartoValor,  // Usado para co_quarto_valor
                cinNomeQuarto,  // Usado para co_nome_quarto
                cinData,  // Usado para co_cin_data
                cinCinDataEsperada,  // Usado para co_cin_data_esperada
                cinCoutData,  // Usado para co_cout_data_real
                cinCoutDataEsperada,  // Usado para co_cout_data_esperada
                cinDataReserva,  // Usado para co_dataReserva
                cinNumAdultos,  // Usado para co_num_adultos
                cinNumCriancas,  // Usado para co_num_criancas
                cinIdServContratados,  // Usado para co_id_servContratados
                cinNomeServContratados,  // Usado para co_nome_servContratados
                cinValorServs,  // Usado para co_valor_servs
                coutId
            } = req.body;
            // Caso contrário, estamos alterando um checkout existente
            dadosCheckout = [
                cinId,  // Usado para co_id_checkin
                cinIdReserva,  // Usado para co_id_reserva
                cinNomePessoa,  // Usado para co_nome_pessoa
                cinEmail,  // Usado para co_email
                cinQuarto,  // Usado para co_quarto
                cinQuartoValor,  // Usado para co_quarto_valor
                cinNomeQuarto,  // Usado para co_nome_quarto
                cinData,  // Usado para co_cin_data
                cinCinDataEsperada,  // Usado para co_cin_data_esperada
                cinCoutData,  // Usado para co_cout_data_real
                cinCoutDataEsperada,  // Usado para co_cout_data_esperada
                cinDataReserva,  // Usado para co_dataReserva
                cinNumAdultos,  // Usado para co_num_adultos
                cinNumCriancas,  // Usado para co_num_criancas
                cinIdServContratados,  // Usado para co_id_servContratados
                cinNomeServContratados,  // Usado para co_nome_servContratados
                cinValorServs,  // Usado para co_valor_servs
                coutId
            ];
        }

        // Se coId estiver presente, realiza a edição
        if (req.body.coutId) {
            let resultado = await checkoutModel.editarCheckout(dadosCheckout);
            if (resultado) {
                let resultadoDataCout = await checkoutModel.atualizaDataCheckIn(req.body.cinCoutData, req.body.cinId);
                if(resultadoDataCout) {
                return res.send({ ok: true, msg: "Checkout alterado com sucesso" });
                } else {
                    return res.send({ ok: false, msg: "Checkout alterado com sucesso, porém data check-in nao atualizada" });
                }
            } else {
                return res.send({ ok: false, msg: "Falha ao alterar o checkout" });
            }
        } else {
            // Se não, cria um novo checkout
            let resultado = await checkoutModel.gravarCheckout(dadosCheckout);
            if (resultado) {
                let resultadoDataCout = await checkoutModel.atualizaDataCheckIn(req.body.cinCoutData, req.body.cinId);
                if(resultadoDataCout) {
                return res.send({ ok: true, msg: "Checkout realizado com sucesso" });
                } else {
                    return res.send({ ok: false, msg: "Checkout alterado com sucesso, porém data check-in nao atualizada" });
                }
            } else {
                return res.send({ ok: false, msg: "Falha ao realizar o checkout" });
            }
        }
    }

    // Obter todos os checkouts
    async obterCheckouts(req, res) {
        let checkout = new CheckoutModel();
        let listaCheckouts = await checkout.obterCheckouts();
        return res.send({ listaCheckouts });
    }

    // Excluir um checkout
    async excluirCheckout(req, res) {
        let checkout = new CheckoutModel();
        let resultado = await checkout.deletarCheckout(req.body.coutId);
        if (resultado) {
            return res.send({ ok: true, msg: "Checkout excluído com sucesso" });
        } else {
            return res.send({ ok: false, msg: "Falha ao excluir o checkout" });
        }
    }
    async obterCheckoutPorId(req, res) {
        let checkoutModel = new CheckoutModel();
        
        // Obter o checkout completo usando o cin_id
        let checkoutDetalhes = await checkoutModel.obterCheckoutPorId(req.params.id);
        
        if (checkoutDetalhes) {
            return res.send({ checkout: checkoutDetalhes, ok: true });
        } else {
            return res.send({ ok: false, msg: "Checkout não encontrado" });
        }
    }
    

    async obterIdCheckout(req, res ){
        let checkoutModel = new CheckoutModel();
        let checkout = await checkoutModel.obterIdCheckout(req.params.id);
        if(checkout.length > 0){
            checkout = checkout[0].co_id;
        }
        return res.send({ checkout: checkout, ok: true });
    }

    // Obter detalhes de um checkout específico
    async obterCheckinPorId(req, res) {
        let checkin = new CheckinModel();
        let checkout = new CheckoutModel();

        let checkoutDetalhes = await checkout.obterCheckoutPorId(req.params.id)
        if(checkoutDetalhes){
            return res.send({ checkin: checkoutDetalhes, ok: true });
        }
        let checkinDetalhes = await checkin.obterCheckinPorId(req.params.id);
       
        if(checkinDetalhes){
            return res.send({ checkin: checkinDetalhes, ok: true });
        }
            return res.send({ checkin: false, ok: false });
            
    }
}

module.exports = CheckoutController;
