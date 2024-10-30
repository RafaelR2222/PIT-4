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
        if(busca == 1 && isNaN(termo)){
            alert('Isto não é id de um quarto');
        return;
        }
        if(busca == 2 && !isNaN(termo)){
            alert('Isto não é um nome de hospede');
        return;
        }
        fetch('/reservas/listar', {
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
            if(r.listaReserva){
                if(r.listaReserva.length > 0){
                    let html = "";
                    document.querySelector("#tabelaFornecedores tbody").innerHTML = ''
                    for(let i = 0; i < r.listaReserva.length; i++){
                        var obj = r.listaReserva[i];
    
                        html += `
                            <tr>
                            <td>${obj.id} </td>
                            <td>${obj.nomeCliente} </td>
                            <td>${obj.emailPessoa} </td>
                            <td>${obj.idQuarto} </td>
                            <td>${obj.dataCheckin}</td>
                            <td>${obj.dataCheckout}</td>
                            <td>${obj.numAdultos} </td>
                            <td>${obj.numCriancas}</td>
                            <td>${obj.dataReserva} </td>
                        <!---- <td class="actions">
                                <div>
                                    <a href="/fornecedor/alterar/ lista[i].fornId " class="btn btn-primary">
                                        <i class="fas fa-pen"></i>
                                    </a>
                                    <button data-id=" lista[i].fornId " class="btn btn-danger btnExclusao">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>-->
                        </tr>`;                  
                    }
    
                    document.querySelector("#tabelaFornecedores tbody").innerHTML = html;


                }
                else{
                    alert("Nenhuma reserva encontrado!");
                }
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

})