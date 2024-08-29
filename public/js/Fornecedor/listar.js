document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnExportarExcel").addEventListener('click', exportarExcel);

    function exportarExcel() {

        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaFornecedores"));
        XLSX.writeFile(wb, "RelatorioFornecedor.xlsx");
    }


    let botoes = document.querySelectorAll(".btnExclusao");

    for(let i = 0; i<botoes.length; i++){
        botoes[i].onclick = excluirFornecedor;
    }

    function excluirFornecedor() {
        let idExclusao = this.dataset.id;
       if(confirm("Deseja realmente excluir este fornecedor?")) 
       {
        if(idExclusao != undefined && idExclusao != ""){

            fetch('/fornecedor/excluir', {
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