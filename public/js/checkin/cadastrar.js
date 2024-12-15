document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formsCheckIn").style.display = "none"
    document.getElementById("btnBuscar").addEventListener('click', buscarCheckin);
    document.getElementById("btnGravar").addEventListener('click', gravarCheckin);  // Adicionando evento para salvar check-in

    function formatDateWithHyphen(date) {
        // Verifica se a data tem o formato correto (DD/MM/YY)
        const regex = /^(\d{2})\/(\d{2})\/(\d{2})$/;
        
        // Se a data passar no regex, substitui as barras por hífens
        if (regex.test(date)) {
            return date.replace('/', '-').replace('/', '-');
        } else {
            throw new Error('Data no formato inválido. O formato esperado é DD/MM/YY.');
        }
    }
    
    // Função para buscar o check-in
    function buscarCheckin() {
        let emailUsuario = document.getElementById("emailUsuario").value;
        fetch(`/checkin/listarCheckin/${emailUsuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(function(r) {
            return r.json();
        })
        .then(r => {
            if (r.ok) {
                alert(r.msg);
                montarForms(r.checkin);
                document.getElementById("formsCheckIn").style.display = "block"
            } else {
                alert(r.msg);
            }
        });
    }

    // Função para preencher os campos do formulário com os dados do check-in
    function montarForms(lista) {
        const cinNome = document.getElementById('cinNome');
        const cinEmail = document.getElementById('cinEmail');
        const cinQuartoId = document.getElementById('cinQuartoId');
        const cinQuartoValor = document.getElementById('cinQuartoValor');
        const cinQuartoNome = document.getElementById('cinQuartoNome');
        const cinDataAtual = document.getElementById('cinDataAtual');
        const cinDataEsperada = document.getElementById('cinDataEsperada');
        const cinCoutDataEsperada = document.getElementById('cinCoutDataEsperada');
        const cinDataReserva = document.getElementById('cinDataReserva');
        const cinReservaId = document.getElementById('cinReservaId');
        const cinNumAdultos = document.getElementById('cinNumAdultos');
        const cinNumCriancas = document.getElementById('cinNumCriancas');
        const cinNumServicoId = document.getElementById('cinNumServicoId');
        const cinNumServicoNome = document.getElementById('cinNumServicoNome');
        const cinTotal = document.getElementById('cinTotal');


        cinNome.value = lista.reserva.resPesNome;
        cinEmail.value = lista.reserva.resPesEmail;
        cinQuartoId.value = lista.reserva.resQuartoId;
        cinQuartoValor.value = lista.quarto[0].qrQuartoValor;
        cinQuartoNome.value = lista.quarto[0].qrNome;
        cinDataAtual.value = cinDataAtual.value; // Data atual
        cinDataEsperada.value = lista.reserva.resDataCheckin;
        cinCoutDataEsperada.value = lista.reserva.resDataCheckout;
        cinDataReserva.value = lista.reserva.resDataReserva;
        cinReservaId.value = lista.reserva.resId;
        cinNumAdultos.value = lista.reserva.resNumAdulto;
        cinNumCriancas.value = lista.reserva.resNumCrianca;
        cinNumServicoId.value = lista.idsServicosContratados;
        cinNumServicoNome.value = lista.servicosContratados;
        cinTotal.value = parseFloat(lista.valorTotal).toFixed(2);  // Valor total com serviços
    }

    // Função para gravar o check-in
    function gravarCheckin() {
        // Coletando os dados do formulário
        let nome = document.getElementById("cinNome");
        let email = document.getElementById("cinEmail");
        let quartoId = document.getElementById("cinQuartoId");
        let quartoValor = document.getElementById("cinQuartoValor");
        let quartoNome = document.getElementById("cinQuartoNome");
        let dataAtual = document.getElementById("cinDataAtual");
        let dataEsperada = document.getElementById("cinDataEsperada");
        let coutDataEsperada = document.getElementById("cinCoutDataEsperada");
        let reservaId = document.getElementById("cinReservaId");
        let numAdultos = document.getElementById("cinNumAdultos");
        let numCriancas = document.getElementById("cinNumCriancas");
        let numServicoId = document.getElementById("cinNumServicoId");
        let numServicoNome = document.getElementById("cinNumServicoNome");
        let total = document.getElementById("cinTotal");

        if (validarCampos(nome, email, quartoId, quartoValor, quartoNome, dataAtual, 
             dataEsperada, coutDataEsperada,cinDataReserva, reservaId, numAdultos, numCriancas, total)) {

            var checkinData = {
                nome: nome.value,
                email: email.value,
                quartoId: quartoId.value,
                quartoValor: quartoValor.value,
                quartoNome: quartoNome.value,
                dataAtual: dataAtual.value,
                dataEsperada: dataEsperada.value,
                coutDataEsperada: coutDataEsperada.value,
                reservaId: reservaId.value,
                dataReserva: cinDataReserva.value,
                numAdultos: numAdultos.value,
                numCriancas: numCriancas.value,
                numServicoId: numServicoId.value,
                numServicoNome: numServicoNome.value,
                total: total.value,
            };

            // Enviar os dados via POST
            fetch('/checkin/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkinData)
            })
            .then(function(resposta1) {
                return resposta1.json();
            })
            .then(function(resposta2) {
                if (resposta2.ok) {
                    alert(resposta2.msg);
                    // Limpar os campos após salvar
                    nome.value = "";
                    email.value = "";
                    quartoId.value = "";
                    quartoValor.value = "";
                    quartoNome.value = "";
                    dataAtual.value = "";
                    dataEsperada.value = "";
                    coutDataEsperada.value = "";
                    reservaId.value = "";
                    numAdultos.value = "";
                    numCriancas.value = "";
                    numServicoId.value = "";
                    numServicoNome.value = "";
                    total.value = "";
                    window.location.href = '/checkin';  // Redireciona após o cadastro
                } else {
                    alert(resposta2.msg);
                }
            });
        }
        else {
            alert("Preencha os campos corretamente!");
        }
    }

    // Função de validação dos campos do formulário
    function validarCampos(nome, email, quartoId, quartoValor, quartoNome, dataAtual, dataEsperada, coutDataEsperada, reservaId, numAdultos, numCriancas, total) {

        let campos = [nome, email, quartoId, quartoValor, quartoNome, dataAtual, dataEsperada, coutDataEsperada, reservaId, numAdultos, numCriancas, total];
        let erros = [];

        // Verifica se os campos estão vazios
        campos.forEach(function(campo) {
            if (campo.value === "") {
                erros.push(campo);
                campo.style["border-color"] = "red";  // Marca o campo com erro
            } else {
                campo.style["border-color"] = "";  // Limpa a borda caso o campo esteja preenchido
            }
        });

        // Retorna true se não houver erros, caso contrário false
        return erros.length === 0;
    }

   
    
    
});
