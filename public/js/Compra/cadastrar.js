
document.addEventListener("DOMContentLoaded", function() {

    let listaProdutos = [];
    document.getElementById("btnGravar").addEventListener('click', gravarCompra);
    document.getElementById("btnAdd").addEventListener('click', adicionarItemACompra);

    function removerProduto() {
        let id = this.dataset.id;

        listaProdutos = listaProdutos.filter(produto => produto.id != id);
        this.parentElement.parentElement.remove();
    }


    function montarTabelaProdutos() {
        if (listaProdutos.length > 0) {
            let valorTotal = 0;
            let html = `<table class='table'>
                            <thead>
                                <th> Código </th>
                                <th> Descricao </th>
                                <th> Valor Unitário </th>
                                <th> Valor Total </th>
                                <th> Quantidade </th>
                            </thead>
                            <tbody>
                        `;
            
            for(let i=0; i < listaProdutos.length; i++) {
                let produto = listaProdutos[i];
                valorTotal += parseFloat(produto.valor);
                html += `
                    <tr>
                        <td> ${produto.id}  </td>
                        <td> ${produto.descricao}  </td>
                        <td> R$ ${parseFloat(produto.preco).toFixed(2)}  </td>
                        <td> R$ ${parseFloat(produto.valor).toFixed(2)}  </td>
                        <td> ${produto.quantidade} </td>
                        <td> 
                            <button class='btn btn-outline-danger btnRemover' data-id='${produto.id}'> Remover </button>
                        </td>
                    `
            }
            html += `</tbody>
                </table>
            `

            html += `<div>
                        <h4 style="text-align:end"> Valor total: R$<span> ${valorTotal.toFixed(2)} </span> </h4>
                    </div>
                `



            document.getElementById("corpoTabela").innerHTML = html;


            let btnRemover = document.querySelectorAll('.btnRemover');
            btnRemover.forEach(function(value, index) {
                value.onclick = removerProduto;
            })
        } else {
            document.getElementById("corpoTabela").innerHTML = `<span class='alert alert-info'> Nenhum produto adicionado! </span>`
        }
    }

    function adicionarItemACompra() {
        let id = document.getElementById("select-produto");
        let quantidade = document.getElementById("itemQuantidade");
        let valorPagoUnitario = document.getElementById("itemValorPago");

        if (validarCamposProduto(id, quantidade, valorPagoUnitario)) {
            const data = {
                id: id.value,
                quantidade: quantidade.value,
                valorPagoUnitario: valorPagoUnitario.value
            }
            fetch('/produtos/obter/' + data.id)
            .then(r => {
                return r.json()
            })
            .then(r => {
                if (r.ok) {
                    let produto = listaProdutos.find(p => p.id == r.produto.id);
    
                    if (produto != null) {
                        listaProdutos = listaProdutos.filter(p => p.id !== r.produto.id)
                    }
    
                    r.produto.preco = data.valorPagoUnitario;
                    r.produto.valor = data.valorPagoUnitario * data.quantidade;
                    r.produto.quantidade = data.quantidade;
                    listaProdutos.push(r.produto);
    
                    montarTabelaProdutos();
                } else {
                    alert(r.msg);
                }
            })
        } else {
            alert("Preencha os campos destacados corretamente!");
        }
    }

    function validarCamposProduto(produto, quantidade, valorPagoUnitario) {
        produto.classList.remove("is-invalid")
        quantidade.classList.remove("is-invalid")
        valorPagoUnitario.classList.remove("is-invalid")

        let erros = [];
        if(produto.value == "")
        erros.push(produto);
        if(quantidade.value == "")
            erros.push(quantidade);
        if(valorPagoUnitario.value == "")
            erros.push(valorPagoUnitario);

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].classList.add("is-invalid");
            }
            return false;
        }
        else {

            return true;
        }
    }

    function validarValorTotal(valorTotalNota) {
        let valorTotal = 0;
        for (let i=0; i < listaProdutos.length; i++) {
            valorTotal += listaProdutos[i].valor;
        }
        return valorTotalNota === valorTotal;
    }

    function gravarCompra() {
        
        let codigo = document.getElementById("compraCodigo");
        let cnpj = document.getElementById("compraCnpj");
        let valor = document.getElementById("compraValor");
        let data = document.getElementById("compraData");



        if(validarCampos(codigo, cnpj, valor, data)) {
            if (listaProdutos.length == 0) {
                alert("Deve ter pelo menos um produto adicionado.");
                return;
            }

            let valorTotal = parseFloat(valor.value.replace(',', '.'))

            if (validarValorTotal(valorTotal) === false) {
                alert("Valor total indicado não é igual ao valor total dos itens da nota!");
                return;
            }

            var compra = {
                codigo: codigo.value,
                cnpj: cnpj.value,
                valor: valorTotal,
                data: data.value,
                listaProdutos,
            }

            fetch('/compras/gravar-compra', {
                method: 'POST',
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
                    alert(resposta2.msg);
                    codigo.value = ""
                    cnpj.value = "";
                    valor.value = "";
                    data.value = "";  
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

    function validarCampos(codigo, cnpj, valor, data) {
    
        codigo.classList.remove("is-invalid")
        cnpj.classList.remove("is-invalid")
        valor.classList.remove("is-invalid")
        data.classList.remove("is-invalid")

        let erros = [];
        if(codigo.value == "")
        erros.push(codigo);
        if(cnpj.value == "")
            erros.push(cnpj);
        if(valor.value == "")
            erros.push(valor);
        if(data.value == 0)
            erros.push(data);

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].classList.add("is-invalid");
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