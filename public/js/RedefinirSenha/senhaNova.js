document.addEventListener('DOMContentLoaded', function() {
    const formToken = document.getElementById('formToken');
    const formBotao = document.getElementById('formBotao');
    const textoEnvio = document.getElementById('textoEnvio');
    formToken.style.display = 'none'
    textoEnvio.style.display = 'none'
    formBotao.style.display = 'block'

    document.getElementById("btnEnviar").addEventListener('click', validaToken);
    

    function validaToken() {
        let senha1 = document.querySelector("#senha").value;
        let senha2 = document.querySelector("#senha2").value;
        let email = document.querySelector('#email').value;
        

        if (senha1 && senha2 ) {
            if(senha1 === senha2){
                let bodySenhaNova = {
                    senha: senha1,
                    email: email
                };
                fetch('/redefinicao/alterarSenha', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bodySenhaNova)
                }).then(function(r) {
                    return r.json();
                }).then(function(r) {
                    console.log(r);
                    if (r.status) {
                        alert('Senha redefinida com sucesso!')
                       formToken.style.display = 'block'
                       textoEnvio.style.display = 'block'
                       formBotao.style.display = 'none'
                    } else {
                        document.getElementById("msgRetorno").innerHTML = '<div class="alert alert-danger">' + r.msg + '</div>';
                    }
                });


            } else {
                alert("Senhas não coincidem!");
            }

        }else{

            alert("Usuário/Senha inválidos!");
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
