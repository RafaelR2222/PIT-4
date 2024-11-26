document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formsServicos").style.display = "none"
    let botoes = document.querySelectorAll(".btnAdicao");
    
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = obterEmailGravar;
    }

    let id = '1';

    function obterEmailGravar() {
        // Coletando os dados do formulário
        let servico = document.getElementById("servico");
        let email = this.dataset.value;


            // Enviar os dados via POST
            fetch(`/usuarios/obterIdPorEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(resposta1) {
                return resposta1.json();
            })
            .then(function(resposta2) {
                if (resposta2.id) {
                    alert(resposta2.msg);
                    id = resposta2.id;
                } else {    
                    alert(resposta2.msg);
                }
            });

            fetch(`/usuarios/obterIdPorEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(resposta1) {
                return resposta1.json();
            })
            .then(function(resposta2) {
                if (resposta2.id) {
                    alert(resposta2.msg);
                    id = resposta2.id;
                } else {    
                    alert(resposta2.msg);
                }
            });
        
    }
});