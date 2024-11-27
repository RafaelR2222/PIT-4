document.addEventListener("DOMContentLoaded", function() {

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("btnExclusao")) {
            excluirReserva.call(event.target); // Call excluirReserva with the clicked button as `this`
        }
    });

    function excluirReserva() {
        let idExclusao = this.dataset.id;

        if (confirm("Você deseja realmente excluir esse produto?")) {
            if(idExclusao != undefined && idExclusao != ""){
                fetch(`/reservas/deletar/${idExclusao}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(r) {
                    return r.json();
                })
                .then(function(r) {
                    if(r.ok){
                        alert("Reserva deletada com sucesso!");
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