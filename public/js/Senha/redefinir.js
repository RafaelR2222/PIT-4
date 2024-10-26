document.addEventListener('DOMContentLoaded', function() {
    const textoEnvio = document.getElementById("textoEnvio");
    const formToken = document.getElementById('formToken');
    const formbotao = document.getElementById('formbotao');
    textoEnvio.style.display = 'none'; // Inicia como oculto
    formToken.style.display = 'none'
    formbotao.style.display = 'block'

    document.getElementById("btnEnviar").addEventListener('click', autenticar);
    // Função para gerar um código aleatório de 4 dígitos
    function gerarCodigoAleatorio() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function autenticar() {
        let email = document.querySelector("#email");
        let tokenAleatorio = gerarCodigoAleatorio();

        if (email.value) {
            let bodyEmail = {
                email: email.value
            };
            let bodyEmailEToken = {
                email: email.value,
                token: tokenAleatorio
            };

            fetch('/redefinicao/buscar', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyEmail)
            }).then(function(r) {
                return r.json();
            }).then(function(r) {
                console.log(r);
                if (r.status) {
                    fetch('/redefinicao/enviarToken', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(bodyEmailEToken)
                    }).then(function(r) {
                        return r.json();
                    }).then(function(r) {
                        if (r.status) {
                            textoEnvio.style.display = 'block';
                            formToken.style.display = 'block' // Exibe o texto de sucesso
                            formbotao.style.display = 'none'    
                        } else {
                            document.getElementById("msgRetorno").innerHTML = '<div class="alert alert-danger">' + r.msg + '</div>';
                        }
                    });
                } else {
                    alert("Usuário/Senha inválidos!");
                }
            });
        }
    }

    // Função para validar campos (não está sendo usada no trecho fornecido)
    function validarCampos(email, senha) {
        let erros = [];

        email.style["border-color"] = "unset";
        senha.style["border-color"] = "unset";

        if (email.value == "")
            erros.push(email);
        if (senha.value == "")
            erros.push(senha);

        if (erros.length > 0) {
            for (let i = 0; i < erros.length; i++) {
                erros[i].style["border-color"] = "red";
            }

            return false;
        } else {
            return true;
        }
    }
});
