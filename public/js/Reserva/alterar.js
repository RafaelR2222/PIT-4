
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener('click', editarReserva);



    function editarReserva() {
        let codigo = document.getElementById("reservaCodigo");
        let nome = document.getElementById("reservaNome");
        let email = document.getElementById("reservaEmail");
        let quartoId = document.getElementById("quartoId");
        let dataCheckin = document.getElementById("dataCheckin");
        let dataCheckOut = document.getElementById("dataCheckOut");
        let resNumAdulto = document.getElementById("numAdulto");
        let resNumCrianca = document.getElementById("numCrianca");

        if (validarCampos(nome, quartoId, email, dataCheckin, dataCheckOut, resNumAdulto, resNumCrianca)) {


            var reserva = {
                nome: nome.value,
                email: email.value,
                quartos: quartoId.value,
                dataInicial: dataCheckin.value,
                dataFinal: dataCheckOut.value,
                adultos: resNumAdulto.value,
                criancas: resNumCrianca.value
            }

            fetch(`/reservas/editar/${codigo.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reserva)
            })
                .then(function (resposta1) {
                    return resposta1.json()
                })
                .then(function (resposta2) {
                    if (resposta2.ok) {
                        nome.value = "";
                        email.value = "";
                        quartoId.value = "";
                        dataCheckin.value = "";
                        dataCheckOut.value = "";
                        resNumAdulto.value = "";
                        resNumCrianca.value = "";
                        window.location.href = '/reservas/reservas';
                    }
                    else {
                        alert(resposta2.msg);
                    }
                })
        }
        else {
            alert("Preencha os campos destacados corretamente!");
        }
    }

    function validarCampos(Nome, QuartoId, Email, DataCheckin, DataCheckOut, ResNumAdulto, ResNumCrianca) {

        //limpa a estilização antes
        Nome.style["border-color"] = "";
        QuartoId.style["border-color"] = "";
        Email.style["border-color"] = "";
        DataCheckin.style["border-color"] = "";
        DataCheckOut.style["border-color"] = "";
        ResNumAdulto.style["border-color"] = "";
        ResNumCrianca.style["border-color"] = "";

        let erros = [];
        if (Nome.value == "")
            erros.push(Nome);
        if (QuartoId.value == "")
            erros.push(QuartoId);
        if (Email.value == "")
            erros.push(Email);
        if (DataCheckin.value == "")
            erros.push(DataCheckin);
        if (DataCheckOut.value == "")
            erros.push(DataCheckOut);
        if (ResNumAdulto.value == "")
            erros.push(ResNumAdulto);
        if (ResNumCrianca.value == "")
            erros.push(ResNumCrianca);

        if (erros.length > 0) {
            for (let i = 0; i < erros.length; i++) {
                erros[i].style["border-color"] = "red";
            }

            return false;
        }
        else {

            return true;
        }
    }

})