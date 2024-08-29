document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnExportarExcel").addEventListener('click', exportarExcel);

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaProdutos"));
        XLSX.writeFile(wb, "RelatorioProdutos.xlsx");
    }

    let botoes = document.querySelectorAll(".btnExclusao");

    for(let i = 0; i<botoes.length; i++){
        botoes[i].onclick = excluirProduto;
    }

    function excluirProduto() {
        let idExclusao = this.dataset.id;

        if (confirm("Você deseja realmente excluir esse produto?")) {
            if(idExclusao != undefined && idExclusao != ""){
                fetch('/produtos/excluir', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: idExclusao})
                })
                .then(function(r) {
                    return r.json();
                })
                .then(function(r) {
                    if(r.ok){
                        alert(r.msg);
                        window.location.reload();
                    }
                    else{
                        alert(r.msg);
                    }
                })
            }
            else{
                alert("Dados inválidos!")
            }
        }
    }
})