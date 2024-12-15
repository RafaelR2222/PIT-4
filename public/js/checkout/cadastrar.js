document.addEventListener("DOMContentLoaded", function() {

    let btnRegistrar = document.getElementById("btnRegistrar");
    let btnAlterar = document.getElementById("btnAlterar");
    let btnExcluir = document.getElementById("btnExcluir");
    let btnGerarNota = document.getElementById("btnGerarNota");
    let btnImprimir = document.getElementById("btnImprimir");
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
        function formatarDataParaISO(data) {
            return data.split('T')[0]; // Remove a parte da hora e fuso horário
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
            fetch(`/checkout/buscarIdCheckout/${lista.cout_cin_id ? lista.cout_cin_id : lista.cinId}`, {
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
                    let coutId = r.checkoutId;
                    montarForms(lista, coutId);
                    btnRegistrar.addEventListener("click", function() {
                        // Chama a função que vai processar a alteração
                        CadastrarCheckOut();
                    });
                    btnAlterar.addEventListener("click", function() {
                        // Chama a função que vai processar a alteração
                        editarCheckOut();
                    });
                    btnExcluir.addEventListener("click", function() {
                        // Chama a função que vai processar a alteração
                        excluirCheckOut();
                    });
                    btnGerarNota.addEventListener("click", function(){
                        escondeExibeComprovante();
                    })
                    btnImprimir.addEventListener("click", function(){
                        printaComprovante();
                    })
                } else {
                    montarForms(lista, 0);
                    btnRegistrar.addEventListener("click", function() {
                        // Chama a função que vai processar a alteração
                        CadastrarCheckOut();
                    });
                    alert(r.msg);
                    
                    
                    btnAlterar.addEventListener("click", function() {
                        // Chama a função que vai processar a alteração
                        editarCheckOut();
                    });

                    btnExcluir.addEventListener("click", function() {
                        // Chama a função que vai processar a alteração
                        excluirCheckOut();
                    });

                    btnGerarNota.addEventListener("click", function(){
                        escondeExibeComprovante();
                    })
                }
            });
           
        }

        function formatarDataCin(dataString) {
            // Verifica se a data está nula ou vazia
            if (!dataString) {
                return null; // Se a data for nula ou vazia, retorna null
            }
        
            let data;
        
            // Verificar se a data está no formato "dd/mm/yyyy"
            if (dataString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                // Converter para o formato "yyyy-mm-dd"
                const [dia, mes, ano] = dataString.split('/');
                data = new Date(`${ano}-${mes}-${dia}`);
            } else {
                // Se já estiver no formato "yyyy-mm-dd"
                data = new Date(dataString);
            }
        
            const ano = data.getFullYear();
            const mes = ("0" + (data.getMonth() + 1)).slice(-2); // Meses começam de 0
            const dia = ("0" + data.getDate()).slice(-2);
        
            // Retorna a data no formato yyyy-mm-dd
            return `${ano}-${mes}-${dia}`;
        }
        
        
        

        function formatarData(data) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(data).toLocaleDateString('pt-BR', options);
        }

        function printaComprovante(){
            
            document.getElementById('btnRegistrar').display = 'none';
            document.getElementById("btnExcluir").display = 'none';
            document.getElementById("btnAlterar").display = 'none';
            document.getElementById("mensagemAvisoRegistro").style.display = 'none'
            document.getElementById("mensagemAvisoEdicao").style.display = 'none'
            document.getElementById("tituloCheckout").style.display = 'none'
            document.getElementById("footer_LayoutAdm").style.display = 'none'
            document.getElementById("btnImprimir").style.display = 'none'
            window.print();
           
        }

        function escondeExibeComprovante(){
            if(document.getElementById("notaComprovante").style.display == 'none'){
                document.getElementById("notaComprovante").style.display = 'block';
                document.getElementById("formularios").style.display = 'none';

                document.getElementById('btnRegistrar').disabled = true;
                document.getElementById("btnExcluir").disabled = true;
                document.getElementById("btnAlterar").disabled = true;
                document.getElementById('btnRegistrar').display = 'none';
                document.getElementById("btnExcluir").display = 'none';
                document.getElementById("btnAlterar").display = 'none';
                document.getElementById("btnGerarNota").disabled = true
            } else {
                document.getElementById('btnRegistrar').disabled = false;
                document.getElementById("btnExcluir").disabled = false;
                document.getElementById("btnAlterar").disabled = false;
                document.getElementById('btnRegistrar').display = block;
                document.getElementById("btnExcluir").display = block;
                document.getElementById("btnAlterar").display = block;
                document.getElementById("notaComprovante").style.display = 'none'
                document.getElementById("formularios").style.display = 'block';
            }
            
        }
        function montarForms(lista, coutId) {

                let btnRegistrar = document.getElementById("btnRegistrar");
                let btnAlterar = document.getElementById("btnAlterar");
                let btnExcluir = document.getElementById("btnExcluir");
                let btnGerarNota = document.getElementById("btnGerarNota");
                let mensagemAvisoRegistro = document.getElementById("mensagemAvisoRegistro");
                let mensagemAvisoEdicao = document.getElementById("mensagemAvisoEdicao");
                let inputCoutData = document.getElementById("cinCoutData");
                var dtCin = lista.cinData ? lista.cinData : lista.co_cin_data;
                var dtCout = lista.cinCoutData ? lista.cinCoutData : lista.co_cout_data_real;
                var dataCheckin = new Date(dtCin);
                var dataCheckout = new Date(dtCout);
                var valorServ = lista.cinValorServs ? lista.cinValorServs : lista.co_valor_servs;
                var quartoValor = lista.cinQuartoValor ? lista.cinQuartoValor : lista.co_quarto_valor;
                
               
                // Calcular a diferença em milissegundos
                var diffTime = dataCheckout - dataCheckin; 
                
                // Converter a diferença para dias e arredondar
                var diffDays = Math.round(diffTime / (1000 * 3600 * 24));  // Arredondar para número inteiro
                
                console.log("Número de dias calculado: " + diffDays);  // Número de dias calculado
                
                // Certifique-se de que quartoValor e valorServ sejam números
                var valorQuarto = parseFloat(quartoValor);
                var valorServicos = parseFloat(valorServ);
                
                console.log("Valor do quarto: " + valorQuarto);
                console.log("Valor dos serviços: " + valorServicos);
                
                // Verificar se os valores são números válidos
                if (isNaN(valorQuarto) || isNaN(valorServicos)) {
                    console.log("Erro: Um ou mais valores não são números válidos.");
                } else {
                    // Calcular o valor total da diária (somente a diária, sem contar serviços ainda)
                    var valorTotal = valorQuarto * diffDays;
                
                    console.log("Valor total da diária: " + valorTotal);  // Valor total da diária
                
                    // Somar o valor dos serviços ao valor total
                    valorTotal =  valorTotal + valorServicos; // Somar o valor dos serviços
                
                    console.log("Valor total com serviços: " + valorTotal);
  
                }
            if(!lista.co_id) {
                localStorage.removeItem('checkinData');
                document.getElementById('cinId').value = lista.cinId;
                document.getElementById('cinNomePessoa').value = lista.cinNomePessoa;
                document.getElementById('cinEmail').value = lista.cinEmail;
                document.getElementById('cinQuarto').value = lista.cinQuartoId;  
                document.getElementById('cinQuartoValor').value = parseFloat(lista.cinQuartoValor).toFixed(2);
                document.getElementById('cinNomeQuarto').value = lista.cinNomeQuarto;
                document.getElementById('cinData').value = formatarDataCin(lista.cinData);
                document.getElementById('cinCoutData').value = formatarDataCin(lista.cinCoutData);
                document.getElementById('cinCinDataEsperada').value = formatarDataCin(lista.cinCinDataEsperada);
                document.getElementById('cinCoutDataEsperada').value = formatarDataCin(lista.cinCoutDataEsperada);
                document.getElementById('cinDataReserva').value = formatarDataCin(lista.cinDataReserva);
                document.getElementById('cinIdReserva').value = lista.cinIdReserva;
                document.getElementById('cinNumAdultos').value = lista.cinNumAdultos; 
                document.getElementById('cinNumCriancas').value = lista.cinNumCriancas;
                document.getElementById('cinIdServContratados').value = lista.cinIdServContratados;
                document.getElementById('cinNomeServContratados').value = lista.cinNomeServContratados;
                document.getElementById('cinValorServs').value = parseFloat(lista.cinValorServs);
                document.getElementById("cinValorTotal").value = parseFloat(valorTotal);
                //comprovante
                document.getElementById("nomeHospede").textContent = lista.cinNomePessoa;
                document.getElementById("emailHospede").textContent = lista.cinEmail;
                document.getElementById("quartoHospedado").textContent = lista.cinNomeQuarto;
                document.getElementById("valorQuarto").textContent = `${lista.cinQuartoValor}`;
                document.getElementById("dataCheckin").textContent =  formatarData(lista.cinData);
                document.getElementById("dataCheckout").textContent = formatarData(lista.cinCoutData);
                document.getElementById("numAdultos").textContent = lista.cinNumAdultos;
                document.getElementById("numCriancas").textContent = lista.cinNumCriancas;
                document.getElementById("servicosContratados").textContent = lista.cinNomeServContratados ? lista.cinNomeServContratados : 'Não foi contratado nenhum serviço';
                document.getElementById("valorServicos").textContent = `R$: ${parseFloat(lista.cinValorServs)}`;
                document.getElementById("valorTotal").textContent = `R$: ${parseFloat(valorTotal)}`;

                mensagemAvisoEdicao.style.display = 'none'
                mensagemAvisoRegistro.style.display = 'block'
                btnRegistrar.disabled = false
                btnAlterar.disabled = true
                btnExcluir.disabled = true
                btnGerarNota.disabled = true
                inputCoutData.readOnly = false
            //checkout lista alteração
            } else if(lista.co_id){
                localStorage.removeItem('checkinData');
                document.getElementById('coutId').value = lista.co_id
                document.getElementById('cinId').value = lista.co_id_checkin;
                document.getElementById('cinNomePessoa').value = lista.co_nome_pessoa;
                document.getElementById('cinEmail').value = lista.co_email;
                document.getElementById('cinQuarto').value = lista.co_quarto;  
                document.getElementById('cinQuartoValor').value = parseFloat(lista.co_quarto_valor).toFixed(2);
                document.getElementById('cinNomeQuarto').value = lista.co_nome_quarto;
                document.getElementById('cinData').value = formatarDataParaISO(lista.co_cin_data);
                document.getElementById('cinCoutData').value = formatarDataParaISO(lista.co_cout_data_real);
                document.getElementById('cinCinDataEsperada').value = formatarDataParaISO(lista.co_cin_data_esperada);
                document.getElementById('cinCoutDataEsperada').value = formatarDataParaISO(lista.co_cout_data_esperada);
                document.getElementById('cinDataReserva').value = formatarDataParaISO(lista.co_dataReserva);
                document.getElementById('cinIdReserva').value = lista.co_id_reserva;
                document.getElementById('cinNumAdultos').value = lista.co_num_adultos; 
                document.getElementById('cinNumCriancas').value = lista.co_num_criancas;
                document.getElementById('cinIdServContratados').value = lista.co_id_servContratados;
                document.getElementById('cinNomeServContratados').value = lista.co_nome_servContratados;
                document.getElementById('cinValorServs').value = parseFloat(lista.co_valor_servs);
                document.getElementById("cinValorTotal").value = parseFloat(valorTotal);

                //comprovante
                document.getElementById("nomeHospede").textContent = lista.co_nome_pessoa;
                document.getElementById("emailHospede").textContent = lista.co_email;
                document.getElementById("quartoHospedado").textContent = lista.co_nome_quarto;
                document.getElementById("valorQuarto").textContent = `R$ ${lista.co_quarto_valor}`;
                document.getElementById("dataCheckin").textContent = formatarData(lista.co_cin_data);
                document.getElementById("dataCheckout").textContent = formatarData(lista.co_cout_data_real);
                document.getElementById("numAdultos").textContent = lista.co_num_adultos;
                document.getElementById("numCriancas").textContent =  lista.co_num_criancas;
                document.getElementById("servicosContratados").textContent = lista.co_nome_servContratados ? lista.co_nome_servContratados : 'Não foi contratado nenhum serviço';
                document.getElementById("valorServicos").textContent = `R$: ${parseFloat(lista.co_valor_servs)}`;
                document.getElementById("valorTotal").textContent = `R$: ${parseFloat(valorTotal)}`;


                mensagemAvisoEdicao.style.display = 'block';
                mensagemAvisoRegistro.style.display = 'none';
                btnRegistrar.disabled = true
                btnAlterar.disabled = false
                btnExcluir.disabled = false
                btnGerarNota.disabled = false
                inputCoutData.readOnly = true
                
            }
    
            // Inserir data de emissão
            var dataEmissao = new Date().toLocaleDateString('pt-BR');
            document.getElementById("dataEmissao").textContent = dataEmissao;
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
                    carregarFormsCheckOut(r.checkin);
       
                } else {
                    alert(r.msg);
                    
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

        function editarCheckOut() {
            // Coletando os dados do formulário de alteração
            let coutId = document.getElementById("coutId");
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
            let coValorTotal = document.getElementById("cinValorTotal");
            // Validar os campos do formulário antes de enviar
            if (validarCampos(cinNomePessoa, cinEmail, cinQuarto, cinQuartoValor, cinNomeQuarto, cinData, cinCoutData)) {
        
                // Criar o objeto de dados com os valores do formulário
                var checkinData = {
                    coutId: coutId.value,
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
                    cinValorServs: cinValorServs.value,
                    cinValorTotal: coValorTotal.value
                };
        
                if (confirm("Tem certeza de que deseja alterar o checkout?")) {
                    fetch('/checkout/cadastrar', {  // Usando a mesma rota de cadastro para alteração
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
                            
                        }
                    });
                    
                } 
             } else {
                alert("Preencha os campos corretamente!");
            }
        }

        function excluirCheckOut() {
            let coutId = document.getElementById("coutId");
            var id = {
                coutId: coutId.value,  // Manter o cinId para alterar o check-in existente
         
            };
           
                if (confirm("Tem certeza de que deseja excluir o checkout?")) {
                    fetch('/checkout/excluir', {  // Usando a mesma rota de cadastro para alteração
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(id)
                    })
                    .then(function(resposta1) {
                        return resposta1.json();
                    })
                    .then(function(resposta2) {
                        if (resposta2.ok) {
                            alert(resposta2.msg);
                            
                            window.location.href = '/checkin';  // Redireciona para a página de check-ins após sucesso
                        } else {
                            alert(resposta2.msg);  // Caso tenha falhado, mostrar mensagem de erro
                            
                        }
                    });
                    
                } 
            
        }
        
        function CadastrarCheckOut() {
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
            let cinValorTotal = document.getElementById("cinValorTotal");
        
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
                    cinValorServs: cinValorServs.value,
                    cinValorTotal: cinValorTotal.value
                    
                };
        
                // Enviar os dados via POST para o servidor (usando a mesma rota /checkin/cadastrar)
                if (confirm("Tem certeza de que deseja registrar este checkout?")) {
                    fetch('/checkout/cadastrar', {  // Usando a mesma rota de cadastro para alteração
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
                            
                        }
                    });
                
                }

            } else {
                alert("Preencha os campos corretamente!");
            }
        }
        
    }
);
