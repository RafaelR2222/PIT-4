
const CheckinModel = require("../models/checkInModel");
const QuartoModel = require("../models/quartoModel");
const cookieParser = require('cookie-parser');
const CompraModel = require("../models/compraModel");
const FornecedorModel = require("../models/fornecedorModel");
const ReservaModel = require("../models/reservaModel"); 
const UsuarioModel = require("../models/usuarioModel"); 
const ServiceModel = require("../models/serviceModel"); 

class CheckinController {
    
    // Exibe a tela de check-in
    async checkinView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let checkin = new CheckinModel();
        let listaCheckins = await checkin.obterCheckins()
        res.render('checkin/listar' , {lista: listaCheckins, usuario: usuario, layout: 'layoutADM'});
    }

    cadastrarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        res.render('checkin/cadastrar',  {usuario: usuario, layout: 'layoutADM'});
    }

    alterarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        res.render('checkin/alterar',  {usuario: usuario, layout: 'layoutADM'})

    }


  

    // Realiza o check-in
   // Realiza o check-in
async gravarCheckin(req, res) {
    let checkinModel = new CheckinModel();
    
    let dadosCheckin;  // Definimos dadosCheckin como uma variável genérica

    // Se o cinId não estiver presente, significa que é um novo check-in
    if (!req.body.cinId) {
        const {
            nome,
            email,
            quartoId,
            quartoValor,
            quartoNome,
            dataAtual,
            dataEsperada,
            coutDataEsperada,
            reservaId,
            dataReserva,
            numAdultos,
            numCriancas,
            numServicoId,
            numServicoNome,
            total
        } = req.body;

        // Definindo os dados para um novo check-in
        dadosCheckin = [
            nome,                // cinNomePessoa
            email,               // cinEmail
            quartoId,           // cinQuartoId
            quartoValor,        // cinQuartoValor
            quartoNome,         // cinNomeQuarto
            dataAtual,          // cinDataAtual
            'Invalid Date',     // cinCoutData
            dataEsperada,       // cinDataEsperada
            coutDataEsperada,   // cinCoutDataEsperada
            dataReserva,        // cinDataReserva (a data atual quando o check-in é realizado)
            reservaId,          // cinIdReserva
            numAdultos,         // cinNumAdultos
            numCriancas,        // cinNumCriancas
            numServicoId,       // cinIdServicoId
            numServicoNome,     // cinNomeServicoNome
            total               // cinTotal
        ];
    } else {
        // Caso contrário, estamos alterando um check-in existente
        const dadosCheckinAlterar = [
            req.body.cinNomePessoa,
            req.body.cinEmail,
            req.body.cinQuarto,
            req.body.cinQuartoValor,
            req.body.cinNomeQuarto,
            req.body.cinData,
            req.body.cinCoutData,
            req.body.cinCinDataEsperada,
            req.body.cinCoutDataEsperada,
            req.body.cinDataReserva,
            req.body.cinIdReserva,
            req.body.cinNumAdultos,
            req.body.cinNumCriancas,
            req.body.cinIdServContratados, // Pode ser uma string separada por vírgula, se necessário, manipular os dados
            req.body.cinNomeServContratados,
            req.body.cinValorServs,
            req.body.cinId // Recebe o cinId, se houver
        ];

        // Usamos dadosCheckinAlterar como os dados a serem alterados
        dadosCheckin = dadosCheckinAlterar;
    }

    // Se cinId estiver presente no corpo da requisição, chama a função de editar
    if (req.body.cinId) {
        try {
        let resultado = await checkinModel.editarCheckin(dadosCheckin);
        // Se a edição for bem-sucedida, retorna a mensagem
            if (resultado) {
                return res.send({ ok: true, msg: "Check-in alterado com sucesso" });
            } else {
                return res.send({ ok: false, msg: "Falha ao alterar o check-in" });
            }
        } catch (error) {
            console.error("Erro ao alterar o check-in:", error);
            return res.send({ ok: false, msg: "O check-in não pode ser alterado pois está vinculado a um check-out" });
        }
    } else {
        try {
            // Caso contrário, chama a função para gravar um novo check-in
            let resultado = await checkinModel.gravarCheckin(dadosCheckin);
            // Se o check-in for gravado com sucesso, retorna a mensagem
            if (resultado) {
                return res.send({ ok: true, msg: "Check-in realizado com sucesso" });
            } else {
                return res.send({ ok: false, msg: "Falha ao realizar o check-in" });
            }
        } catch (error) {
            console.error("Erro ao alterar o check-in:", error);
            return res.send({ ok: false, msg: "Não foi possivel realizar o registro do check-in" });
        }
    }
}


    // Obter todos os check-ins
    async obterCheckins(req, res) {
        let checkin = new CheckinModel();
        let listaCheckins = await checkin.obterCheckins();
        return res.send({ listaCheckins });
    }

    async obterCheckinPorEmail(req, res) {

        let checkin = new CheckinModel();
        // Obtendo a reserva e o usuário pelo email
        try
        {
            let existeCheckIn = await checkin.obterCheckinPorEmail(req.params.email);
            let lista = existeCheckIn;
            return res.send({ checkin: lista, ok: true, msg: 'Reserva encontrada!' });
        }
        catch (error) 
        {
            return res.send({ ok: false, msg: 'Reserva não encontrada!' });
        }
    }



    // Obter detalhes de um check-in específico
    async obterCheckinParaCadastro(req, res) {
        let reserva = new ReservaModel();
        let usuario = new UsuarioModel();
        let service = new ServiceModel();
        let quarto = new QuartoModel();
        let checkin = new CheckinModel();
        // Obtendo a reserva e o usuário pelo email
        let existeCheckIn = await checkin.obterCheckinPorEmail(req.params.email);
        if(existeCheckIn){
            return res.send({ ok: false, msg: 'Já existe um check-in no nome deste cliente!' });
        }
        let ListaReserva = await reserva.obterReservaPorEmail(req.params.email);
        if(ListaReserva){
             let ListaUsuario = await usuario.obterUsuarioCompletoPorEmail(req.params.email);
             if(ListaUsuario != null){
                let listaServicos = await service.obterServicesPorIdCliente(ListaUsuario.usuId);
                let listaQuarto = await quarto.obterQuartoPorId(ListaReserva.resQuartoId)
                if (ListaReserva && ListaUsuario && listaQuarto) {
                        let servicosContratados = '';   // Para armazenar os nomes dos serviços contratados
                        let idsServicosContratados = ''; // Para armazenar os IDs dos serviços contratados
                        let valorTotal = 0;     // Para armazenar o valor total dos serviços
                        if(listaServicos){
                            var qtdServicos = listaServicos.length ? listaServicos.length : 0 ;
                        } else { 
                             qtdServicos = 0;
                        }
                        // Contar a quantidade de serviços encontrados
                        
                        // Concatenar os nomes dos serviços, somar os valores e concatenar os IDs
                        if(listaServicos){
                            listaServicos.forEach(servico => {
                                // Concatenar os nomes dos serviços
                                servicosContratados += servico.nomeService + (listaServicos.indexOf(servico) < listaServicos.length - 1 ? ', ' : '');
                                
                                // Concatenar os IDs dos serviços
                                idsServicosContratados += servico.idService + (listaServicos.indexOf(servico) < listaServicos.length - 1 ? ', ' : '');
                                
                                // Somar os valores dos serviços
                                valorTotal += (parseFloat(servico.valTotalService ? servico.valTotalService : 0 ) + parseFloat(ListaReserva.resValorTotal));
                            });
                        }
                        // Montando o objeto checkinDetalhes
                        let checkinDetalhes = {
                            quarto: listaQuarto,
                            reserva: ListaReserva,             // Dados da reserva
                            usuario: ListaUsuario,             // Dados do usuário
                            servicos: listaServicos,           // Lista de serviços completos
                            servicosContratados: servicosContratados, // Nomes dos serviços contratados
                            idsServicosContratados: idsServicosContratados, // IDs dos serviços contratados
                            valorTotal: valorTotal ? valorTotal : 0,     // Valor total dos serviços
                            qtdServicos: qtdServicos           // Quantidade de serviços contratados
                        };
                    
                     // Retornando os dados de checkin
                      return res.send({ checkin: checkinDetalhes, ok: true, msg: 'Reserva encontrada!' });
                }
            
                // Caso não encontre dados
                return res.send({ ok: false, msg: 'Reserva não encontrada!' });
             }else{
                return res.send({ ok: false, msg: 'Usuário não encontrado!' });
             }
        }else{
            return res.send({ ok: false, msg: 'Reserva não encontrada!' });
        }
        // Obtendo os serviços contratados pelo ID do cliente
       
    }
    

    async obterCheckinPorId(req, res) {
        let checkin = new CheckinModel();
        let checkinDetalhes = await checkin.obterCheckinPorId(req.params.id);
        return res.send({ checkin: checkinDetalhes, ok: true });
    }

    // Excluir um check-in
    async excluirCheckin(req, res) {
        let checkin = new CheckinModel();
        let resultado = await checkin.deletarCheckin(req.body.id);
        if (resultado) {
            return res.send({ ok: true, msg: "Check-in excluído com sucesso" });
        } else {
            return res.send({ ok: false, msg: "Falha ao excluir o check-in" });
        }
    }

    // Editar um check-in
    async editarCheckin(req, res) {
        let checkin = new CheckinModel();
        checkin.cinId = req.params.id;
        checkin.cinNomePessoa = req.body.nome;
        checkin.cinEmail = req.body.email;
        checkin.cinQuarto = req.body.quarto;
        checkin.cinCinDataEsperada = new Date(req.body.dataEsperadaCheckin);
        checkin.cinCoutDataEsperada = new Date(req.body.dataEsperadaCheckout);
        checkin.cinNumAdultos = req.body.adultos;
        checkin.cinNumCriancas = req.body.criancas;

        let resultado = await checkin.editarCheckin();
        if (resultado) {
            return res.send({ ok: true, message: "Check-in editado com sucesso" });
        } else {
            return res.send({ ok: false, message: "Falha ao editar check-in" });
        }
    }
}

module.exports = CheckinController;
