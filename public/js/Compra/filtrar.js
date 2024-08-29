document.addEventListener("DOMContentLoaded", function() {

    var btnPesquisa = document.getElementById("btnPesquisa");

    btnPesquisa.addEventListener("click", function() {
        var termo = document.getElementById("inputPesquisa").value;
        var busca = document.getElementById("selBusca").value;
        filtrarTabela(termo, busca);
    })

    let datas = document.querySelectorAll('.dataFormatada');
    datas.forEach(function(value, index) {
        value.innerText = formatarData(value.innerText)
     })

    function formatarData(data) {
        var dataCompleta = new Date(data);
        var dia = dataCompleta.getDate();
        var mes = dataCompleta.getMonth() + 1;
        var ano = dataCompleta.getFullYear();
        return dia + '/' + mes + '/' + ano;
    }

   
    document.getElementById("btnExportarExcel").addEventListener('click', exportarExcel);

    function exportarExcel() {

        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaCompras"));
        XLSX.writeFile(wb, "RelatorioCompras.xlsx");
    }

    function filtrarTabela(termo, busca) {
        fetch('/compras/listar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({termo: termo, busca: busca})
        })
        .then(function(r) {
            return r.json();
        })
        .then(r=> {
            if(r.ok){
                if(r.listaRetorno.length > 0){
                    let html = "";
    
                    for(let i = 0; i < r.listaRetorno.length; i++){
                        var obj = r.listaRetorno[i];
    
                        html += ` <tr>
                                    <td>${obj.compraCodigo}</td>
                                    <td>${obj.nomeFornecedor}</td>
                                    <td>R$ ${parseFloat(obj.compraValor).toFixed(2)}</td>
                                    <td>${formatarData(obj.compraData)}</td>
                                </tr>`;                  
                    }
    
                    document.getElementById("rotuloQtdeCompras").innerHTML = "<b>Quantidade de compras realizadas: "+ r.listaRetorno.length +"</b>"
                    document.getElementById("corpoTabelaCompras").innerHTML = html;
                }
                else{
                    alert("Nenhuma compra encontrado!");
                }
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

})