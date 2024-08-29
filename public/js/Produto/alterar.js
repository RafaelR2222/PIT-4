
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAlterar").addEventListener('click', gravarProduto);


    

    function gravarProduto() {

        let codigo = document.getElementById("produtoCodigo");
        let descricao = document.getElementById("produtoDescricao");
        let preco = document.getElementById("produtoPreco");
        let quantidade = document.getElementById("produtoQuantidade");

        if(validarCampos(descricao, preco, quantidade)) {
           
            var produto = {
                codigo: codigo.value,
                descricao: descricao.value,
                preco: preco.value,
                quantidade: quantidade.value
            }

            fetch('/produtos/alterar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok) {
                    alert(resposta2.msg);
                    codigo.value = "";
                    descricao.value = "";
                    preco.value = "";
                    quantidade.value = "";              
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

    function validarCampos(descricao, preco, quantidade) {

        //limpa a estilização antes
        descricao.style["border-color"] = "unset";
        preco.style["border-color"] = "unset";
        quantidade.style["border-color"] = "unset";

        let erros = [];
        if(descricao.value == "")
            erros.push(descricao);
        if(preco.value == "")
            erros.push(preco);
        if(quantidade.value == 0)
            erros.push(quantidade);

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