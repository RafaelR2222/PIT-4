document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnExportarExcel").addEventListener('click', exportarExcel);

    function exportarExcel() {

        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaFornecedores"));
        XLSX.writeFile(wb, "RelatorioFornecedor.xlsx");
    }


    let botoes = document.querySelectorAll(".btnExclusao");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = excluirFornecedor;
    }

    function excluirFornecedor() {
        let idExclusao = this.dataset.id;
        if (confirm("Deseja realmente excluir este fornecedor?")) {
            if (idExclusao != undefined && idExclusao != "") {

                fetch('/fornecedor/excluir', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idExclusao })
                })
                    .then(function (r) {
                        return r.json();
                    })
                    .then(function (r) {
                        if (r.ok) {
                            alert(r.msg);
                            window.location.reload();
                        }
                        else {
                            alert(r.msg);
                        }
                    })
            }
            else {
                alert("Dados inválidos!")
            }
        }
    }

    
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

   
    // document.getElementById("btnExportarExcel").addEventListener('click', exportarExcel);

    // function exportarExcel() {

    //     var wb = XLSX.utils.table_to_book(document.getElementById("tabelaCompras"));
    //     XLSX.writeFile(wb, "RelatorioCompras.xlsx");
    // }

    function obterFornecedores() {
        fetch('/fornecedor/listar', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function(r) {
            return r.json();
        })
        .then(r=> {
            if(r.ok){
                if(r.listaFornecedor.length > 0){
                    let html = "";
    
                    for(let i = 0; i < r.listaFornecedor.length; i++){
                        var obj = r.listaFornecedor[i];
    
                        html += ` <tr>
                                    <td>${obj.fornNome}</td>
                                    <td>${obj.fornCnpj}</td>
                                </tr>`;                  
                    }
                    // document.getElementById("rotuloQtdeCompras").innerHTML = "<b>Quantidade de compras realizadas: "+ r.listaFornecedor.length +"</b>"
                    // document.getElementById("corpoTabelaCompras").innerHTML = html;
                }
                else{
                    alert("Nenhuma fornecedor encontrado!");
                }
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
})