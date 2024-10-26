document.addEventListener('DOMContentLoaded', function() {
    const formToken = document.getElementById('formToken');
    const textoEnvio = document.getElementById('textoEnvio');
    formToken.style.display = 'none'
    textoEnvio.style.display = 'none'
    alert('carregou !!!' );
    document.getElementById("btnVerificarToken").addEventListener('click', validaToken);
    

    function validaToken() {
        let token = document.querySelector("#tokenRecebido");


        if (token.value ) {
        
                let bodySenhaNova = {
                    token: token.value
                };
                fetch('/redefinicao/verificarToken', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bodySenhaNova)
                }).then(function(r) {
                    return r.json();
                }).then(function(r) {
                    console.log(r);
                    if (r.status) {
                    /// load pagina de redefinicao
                   window.location.href = '/alterarSenha'

                    } else {
                        console.log(r.msg);
                        document.getElementById("msgRetorno").innerHTML = '<div class="alert alert-danger">' + r.msg + '</div>';
                    }
                });

        }else{

            alert("Insira o token!");
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
