
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAlterar").addEventListener('click', editarFornecedor);

    

    function editarFornecedor() {
        let codigo = document.getElementById("fornecedorCodigo");
        let nome = document.getElementById("fornecedorNome");
        let cnpj = document.getElementById("fornecedorCnpj");
        let email = document.getElementById("fornecedorEmail");
        let telefone = document.getElementById("fornecedorTelefone");
        let endereco = document.getElementById("fornecedorEndereco");
        let cep = document.getElementById("fornecedorCep");


        if(validarCampos(cnpj, nome, email, endereco, cep)) {
           
            
            var fornecedor = {
                id: codigo.value,
                nome: nome.value,
                cnpj: cnpj.value,
                email: email.value,
                telefone: telefone.value,
                endereco: endereco.value,
                cep: cep.value
            }

            console.log(fornecedor)

            fetch('/fornecedor/alterar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fornecedor)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok) {
                    alert(resposta2.msg);
                    nome.value = "";
                    cnpj.value = "";     
                    email.value = "";
                    endereco.value = "";  
                    cep.value = "";  
                    window.location.href = '/fornecedor';
                }
                else{
                    alert(resposta2.msg);
                }
            })
        }
        else{
            alert("Preencha os campos destacados corretamente!");
        }
    }

    function validarCampos(Cnpj, Nome, Email, Endereco, Cep) {

        //limpa a estilização antes
        Nome.style["border-color"] = "";
        Cnpj.style["border-color"] = "";
        Email.style["border-color"] = "";
        Endereco.style["border-color"] = "";
        Cep.style["border-color"] = "";

        let erros = [];
        if(Nome.value == "")
            erros.push(Nome);
        if(Cnpj.value == "")
            erros.push(Cnpj);
        if(Email.value == "")
            erros.push(Email);
        if(Endereco.value == "")
            erros.push(Endereco);
        if(Cep.value == "")
            erros.push(Cep);

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

    function limparCampos() {

    }
})