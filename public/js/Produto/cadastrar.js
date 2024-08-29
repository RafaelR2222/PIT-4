
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarProduto);

    let codigo = document.getElementById("produtoCodigo");
    let descricao = document.getElementById("produtoDescricao");
    let preco = document.getElementById("produtoPreco");
    let quantidade = document.getElementById("produtoQuantidade");

    function gravarProduto() {
        
        if(validarCampos(codigo, descricao, preco, quantidade)) {
           
            var produto = {
                codigo: codigo.value,
                descricao: descricao.value,
                preco: preco.value,
                quantidade: quantidade.value
            }

            fetch('/produtos/cadastrar', {
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
                    descricao.value = "";
                    preco.value = "";
                    quantidade.value = "";    
                    window.location.href = '/produtos';          
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

    function validarCampos(codigo, descricao, preco, quantidade) {
        
        //limpa a estilização antes
        codigo.style.borderColor = "";
        descricao.style.borderColor = "";
        preco.style.borderColor = "";
        quantidade.style.borderColor = "";

        let erros = [];
        if(codigo.value == "")
        erros.push(codigo);
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