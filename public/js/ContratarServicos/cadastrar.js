document.addEventListener("DOMContentLoaded", function () {
    // document.getElementById("formsServicos").style.display = "none"

    const btnAdicao = document.querySelectorAll('.btnAdicao');
    const tabelaServicos = document.getElementById('tabelaServicos');
    tabelaServicos.hidden = true;

    btnAdicao.forEach(button => {
        button.addEventListener('click', function () {

            tabelaServicos.hidden = !tabelaServicos.hidden;

        });
    });

    let botoes = document.querySelectorAll(".btnGravar");

    for (let i = 0; i < btnAdicao.length; i++) {
        btnAdicao[i].onclick = obterEmail;
    }

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = contratarServico;
    }


    let id = '1';
    let email = ''

    function obterEmail() {
        // Coletando os dados do formulário
        email = this.dataset.value;

        // Enviar os dados via POST
        fetch(`/usuarios/obterIdPorEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (resposta1) {
                return resposta1.json();
            })
            .then(function (resposta2) {
                if (resposta2.id) {
                    console.log('resposta2: ' + JSON.stringify(resposta2))
                    id = resposta2.id;
                } else {
                    alert(resposta2.msg);
                }
            });
    }

    function contratarServico() {
        // Coletando os dados do formulário
        let id_servico = this.dataset.id;
        let id_usuario = String(id);
        let serv_val = this.dataset.value;
        let serv_desc = this.dataset.valuetwo;

        if (confirm("Deseja realmente contratar este serviço?")) {
            fetch(`/servico/gravar/${id_servico}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ client_id: id_usuario, email: email, serv_val: serv_val, serv_desc: serv_desc })
            })
                .then(function (resposta1) {
                    return resposta1.json();
                })
                .then(function (resposta2) {
                    if (resposta2.id) {
                        alert(resposta2.message);
                        window.location.reload();
                    } else {
                        alert(JSON.stringify(resposta2));
                    }
                });

        }
    }
});