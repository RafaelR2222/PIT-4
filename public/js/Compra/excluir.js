document.addEventListener("DOMContentLoaded", function () {
    let botoes = document.querySelectorAll(".btnExclusao");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = excluirCompra;
    }

    function excluirCompra() {
        let idExclusao = this.dataset.id;
        if (confirm("Deseja realmente excluir esta compra?")) {
            if (idExclusao != undefined && idExclusao != "") {

                fetch('/compras/excluir', {
                    method: 'DELETE',
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
})