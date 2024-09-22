
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAlterar").addEventListener('click', editarCompra);


    function editarCompra() {
        let compCodigoPessoa = document.getElementById("compraCodigo");
        let compValor = document.getElementById("compraValor");
        let compData = document.getElementById("compraData");
        let compCod = document.getElementById("compraCodigo");

        if(validarCampos(compCodigoPessoa, compValor, compData, compCod)) {
            
            var compra = {
                compCodigoPessoa: compCodigoPessoa.value,
                compValor: compValor.value,
                compData: compData.value,
                compCod: compCod.value,
            }

            console.log(compra)

            fetch('/compras/alterar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(compra)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok) {
                    alert(resposta2);
                    compCodigoPessoa.value = "";
                    compValor.value = "";     
                    compData.value = "";
                    compCod.value = "";  
                    window.location.href = '/compras';
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

    function validarCampos(compCodigoPessoa, compValor, compData, compCod) {

        //limpa a estilização antes
        compValor.style["border-color"] = "";
        compCodigoPessoa.style["border-color"] = "";
        compData.style["border-color"] = "";
        compCod.style["border-color"] = "";

        let erros = [];
        if(compValor.value == "")
            erros.push(compValor);
        if(compCodigoPessoa.value == "")
            erros.push(compCodigoPessoa);
        if(compData.value == "")
            erros.push(compData);
        if(compCod.value == "")
            erros.push(compCod);

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