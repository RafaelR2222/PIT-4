document.addEventListener('DOMContentLoaded', function() {
    const infoBt = document.getElementById("infoBt"); // Botão que abre o modal

    // Adiciona o evento de clique ao botão
    infoBt.addEventListener('click', abrirModal);

    function abrirModal() {
        // Obtém a referência do modal pelo ID
        const modal = new bootstrap.Modal(document.getElementById('helpModal')); 
        modal.show(); // This will open the modal properly
        
        // If you need to set custom styles, you can do it like this:
        const modalElement = document.getElementById('helpModal');
        modalElement.style.display = "block"; // No need for !important
        modalElement.style.opacity = "1"; 
        modalElement.style.zIndex = "1450"; 
        
    }

    const fecharBt = document.getElementById("fecharBt"); // Botão de fechar o modal

    fecharBt.addEventListener('click', fecharModal);

    function fecharModal() {

        const modal = new bootstrap.Modal(document.getElementById('helpModal')); 

        modal.hide();

        const modalElement = document.getElementById('helpModal');
        modalElement.style.display = "none";
        modalElement.style.opacity = "0";
        modalElement.style.zIndex = "-1";
        
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

    }
});
