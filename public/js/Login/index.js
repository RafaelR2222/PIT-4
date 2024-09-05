

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("btnEntrar").addEventListener('click', autenticar);
    function autenticar() {

        let email = document.querySelector("#email");
        let senha = document.querySelector("#senha");


        if(validarCampos(email, senha)){
            let body = {
                email: email.value,
                senha: senha.value
            }

            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(function(r) {
                return r.json()
            }).then(function(r) {
                if(r.status == true){
                    if(r.perId == 3){
                        windows.location.href = "/";
                    }
                    window.location.href = "/produtos";
                }
                else{
                    document.getElementById("msgRetorno").innerHTML = '<div class="alert alert-danger">'+ r.msg +'</div>';
                }
            })

        }
        else{
            alert("Usuário/Senha inválidos!");
        }
    }
//aaaa
    function validarCampos(email, senha) {
        let erros = [];

        email.style["border-color"] = "unset";
        senha.style["border-color"] = "unset";

        if(email.value == "")
            erros.push(email);
        if(senha.value == "")
            erros.push(senha);

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].style["border-color"] = "red";
            }

            return false;
        }
        else {

            return true;
        }
    }
})