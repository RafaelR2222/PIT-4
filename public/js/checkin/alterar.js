document.addEventListener("DOMContentLoaded", function() {

    let btnAlterar = document.getElementById("btnAlterar");

    //let btnCheckOut = document.getElementById("btnCheckOut");


    function validarCampos(nomePessoa, email, quarto, quartoValor, nomeQuarto, data, coutData) {
        // Limpar a estilização de erro antes de validar
        nomePessoa.style["border-color"] = "";
        email.style["border-color"] = "";
        quarto.style["border-color"] = "";
        quartoValor.style["border-color"] = "";
        nomeQuarto.style["border-color"] = "";
        data.style["border-color"] = "";
        coutData.style["border-color"] = "";

        let erros = [];
        if (nomePessoa.value == "") erros.push(nomePessoa);
        if (email.value == "") erros.push(email);
        if (quarto.value == "") erros.push(quarto);
        if (quartoValor.value == "") erros.push(quartoValor);
        if (nomeQuarto.value == "") erros.push(nomeQuarto);
        if (data.value == "") erros.push(data);
        if (coutData.value == "") erros.push(coutData);

        // Se houver erros, destacá-los em vermelho
        if (erros.length > 0) {
            for (let i = 0; i < erros.length; i++) {
                erros[i].style["border-color"] = "red";
            }
            return false;
        }
        return true;
    }

        function carregarForms(lista) {
            // Você pode salvar os dados em localStorage para utilizá-los na página de destino
            window.location.href = '/checkin/alterar';
            localStorage.setItem('checkinData', JSON.stringify(lista));
        
            // Agora redireciona para a página de alteração
        }

        function carregarFormsCheckOut(lista) {
            // Você pode salvar os dados em localStorage para utilizá-los na página de destino
            window.location.href = '/checkout/alterar';
            localStorage.setItem('checkinData', JSON.stringify(lista));
        
            // Agora redireciona para a página de alteração
        }

        const lista = JSON.parse(localStorage.getItem('checkinData'));
        
        if (lista) {
            montarForms(lista);
            btnAlterar.addEventListener("click", function() {
                // Chama a função que vai processar a alteração
                editarCheckin();
            });
        }

        
        function montarForms(lista) {
            //checkin lista
            console.log('lista em montarForms: ',lista)
            if(!lista.co_id) {
                localStorage.removeItem('checkinData');
                document.getElementById('cinId').value = lista.cinId;
                document.getElementById('cinNomePessoa').value = lista.cinNomePessoa;
                document.getElementById('cinEmail').value = lista.cinEmail;
                document.getElementById('cinQuarto').value = lista.cinQuartoId;  
                document.getElementById('cinQuartoValor').value = parseFloat(lista.cinQuartoValor).toFixed(2);
                document.getElementById('cinNomeQuarto').value = lista.cinNomeQuarto;
                document.getElementById('cinData').value = lista.cinData;
                document.getElementById('cinCoutData').value = lista.cinCoutDat;
                document.getElementById('cinCinDataEsperada').value = lista.cinCinDataEsperada;
                document.getElementById('cinCoutDataEsperada').value = lista.cinCoutDataEsperada;
                document.getElementById('cinDataReserva').value = lista.cinDataReserva;
                document.getElementById('cinIdReserva').value = lista.cinIdReserva;
                document.getElementById('cinNumAdultos').value = lista.cinNumAdultos; 
                document.getElementById('cinNumCriancas').value = lista.cinNumCriancas;
                document.getElementById('cinIdServContratados').value = lista.cinIdServContratados;
                document.getElementById('cinNomeServContratados').value = lista.cinNomeServContratados;
                document.getElementById('cinValorServs').value = parseFloat(lista.cinValorServs).toFixed(2);

            //checkin lista
            } else if(lista.co_id){
                localStorage.removeItem('checkinData');
                document.getElementById('coutId').value = lista.co_id
                document.getElementById('cinId').value = lista.co_id_checkin;
                document.getElementById('cinNomePessoa').value = lista.co_nome_pessoa;
                document.getElementById('cinEmail').value = lista.co_email;
                document.getElementById('cinQuarto').value = lista.co_quarto;  
                document.getElementById('cinQuartoValor').value = parseFloat(lista.co_quarto_valor).toFixed(2);
                document.getElementById('cinNomeQuarto').value = lista.co_nome_quarto;
                document.getElementById('cinData').value = lista.co_cin_data;
                document.getElementById('cinCoutData').value = lista.co_cout_data_real;
                document.getElementById('cinCinDataEsperada').value = lista.co_cin_data_esperada;
                document.getElementById('cinCoutDataEsperada').value = lista.co_cout_data_esperada;
                document.getElementById('cinDataReserva').value = lista.co_dataReserva;
                document.getElementById('cinIdReserva').value = lista.co_id_reserva;
                document.getElementById('cinNumAdultos').value = lista.co_num_adultos; 
                document.getElementById('cinNumCriancas').value = lista.co_num_criancas;
                document.getElementById('cinIdServContratados').value = lista.co_id_servContratados;
                document.getElementById('cinNomeServContratados').value = lista.co_nome_servContratados;
                document.getElementById('cinValorServs').value = parseFloat(lista.co_valor_servs).toFixed(2);
            }
           
        }
        
        let botoesAlterar = document.querySelectorAll(".btnAlteracao");
        let botoesCheckOut = document.querySelectorAll(".btnCheckOut");

        for (let i = 0; i < botoesAlterar.length; i++) {
            botoesAlterar[i].onclick = montarEdit;
        }
        for (let i = 0; i < botoesCheckOut.length; i++) {
            botoesCheckOut[i].onclick = montarEditCheckOut;
        }

        function montarEditCheckOut() {
            let idCadastroCout = this.dataset.id;
            fetch(`/checkout/listarCheckout/${idCadastroCout}`, {
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
                    localStorage.removeItem('checkinData');
                    console.log('o que veio de checkIN: ', r.checkin )
                    carregarFormsCheckOut(r.checkin);
       
                } else {
                    alert(r.msg);
                    console.log("aaaaaabbbbb")
                }
            });
        }    

        function montarEdit() {
            let idAlteracao = this.dataset.id;
            fetch(`/checkin/listar/${idAlteracao}`, {
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
                    localStorage.removeItem('checkinData');
                    carregarForms(r.checkin);
       
                } else {
                    alert(r.msg);
                    console.log("aaaaaa")
                }
            });
        }    
        function limparCampos() {
            // Limpar os campos após o sucesso
            document.getElementById("cinNomePessoa").value = "";
            document.getElementById("cinEmail").value = "";
            document.getElementById("cinQuarto").value = "";
            document.getElementById("cinQuartoValor").value = "";
            document.getElementById("cinNomeQuarto").value = "";
            document.getElementById("cinData").value = "";
            document.getElementById("cinCoutData").value = "";
            document.getElementById("cinCinDataEsperada").value = "";
            document.getElementById("cinCoutDataEsperada").value = "";
            document.getElementById("cinDataReserva").value = "";
            document.getElementById("cinIdReserva").value = "";
            document.getElementById("cinNumAdultos").value = "";
            document.getElementById("cinNumCriancas").value = "";
            document.getElementById("cinIdServContratados").value = "";
            document.getElementById("cinNomeServContratados").value = "";
            document.getElementById("cinValorServs").value = "";
        }


        function editarCheckin() {
            // Coletando os dados do formulário de alteração
            let cinId = document.getElementById("cinId");
            let cinNomePessoa = document.getElementById("cinNomePessoa");
            let cinEmail = document.getElementById("cinEmail");
            let cinQuarto = document.getElementById("cinQuarto");
            let cinQuartoValor = document.getElementById("cinQuartoValor");
            let cinNomeQuarto = document.getElementById("cinNomeQuarto");
            let cinData = document.getElementById("cinData");
            let cinCoutData = document.getElementById("cinCoutData");
            let cinCinDataEsperada = document.getElementById("cinCinDataEsperada");
            let cinCoutDataEsperada = document.getElementById("cinCoutDataEsperada");
            let cinDataReserva = document.getElementById("cinDataReserva");
            let cinIdReserva = document.getElementById("cinIdReserva");
            let cinNumAdultos = document.getElementById("cinNumAdultos");
            let cinNumCriancas = document.getElementById("cinNumCriancas");
            let cinIdServContratados = document.getElementById("cinIdServContratados");
            let cinNomeServContratados = document.getElementById("cinNomeServContratados");
            let cinValorServs = document.getElementById("cinValorServs");
        
            // Validar os campos do formulário antes de enviar
            if (validarCampos(cinNomePessoa, cinEmail, cinQuarto, cinQuartoValor, cinNomeQuarto, cinData, cinCoutData)) {
        
                // Criar o objeto de dados com os valores do formulário
                var checkinData = {
                    cinId: cinId.value,  // Manter o cinId para alterar o check-in existente
                    cinNomePessoa: cinNomePessoa.value,
                    cinEmail: cinEmail.value,
                    cinQuarto: cinQuarto.value,
                    cinQuartoValor: cinQuartoValor.value,
                    cinNomeQuarto: cinNomeQuarto.value,
                    cinData: cinData.value,
                    cinCoutData: cinCoutData.value,
                    cinCinDataEsperada: cinCinDataEsperada.value,
                    cinCoutDataEsperada: cinCoutDataEsperada.value,
                    cinDataReserva: cinDataReserva.value,
                    cinIdReserva: cinIdReserva.value,
                    cinNumAdultos: cinNumAdultos.value,
                    cinNumCriancas: cinNumCriancas.value,
                    cinIdServContratados: cinIdServContratados.value,
                    cinNomeServContratados: cinNomeServContratados.value,
                    cinValorServs: cinValorServs.value
                };
        
                // Enviar os dados via POST para o servidor (usando a mesma rota /checkin/cadastrar)
                if (confirm("Tem certeza de que deseja alterar o check-in?")) {
                    fetch('/checkin/cadastrar', {  // Usando a mesma rota de cadastro para alteração
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
                            console.log("aaaaaa")
                            // Limpar os campos após a alteração
                            cinNomePessoa.value = "";
                            cinEmail.value = "";
                            cinQuarto.value = "";
                            cinQuartoValor.value = "";
                            cinNomeQuarto.value = "";
                            cinData.value = "";
                            cinCoutData.value = "";
                            cinCinDataEsperada.value = "";
                            cinCoutDataEsperada.value = "";
                            cinDataReserva.value = "";
                            cinIdReserva.value = "";
                            cinNumAdultos.value = "";
                            cinNumCriancas.value = "";
                            cinIdServContratados.value = "";
                            cinNomeServContratados.value = "";
                            cinValorServs.value = "";
                            window.location.href = '/checkin';  // Redireciona para a página de check-ins após sucesso
                        } else {
                            alert(resposta2.msg);  // Caso tenha falhado, mostrar mensagem de erro
                            console.log("aaaaaa")
                        }
                    });
                } else {
                    alert("Preencha os campos corretamente!");
                }
                
            }
        }

        
    }
);
