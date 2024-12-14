const Database = require('../utils/database');
const conexao = new Database();

class CheckoutModel {
      // Atributos renomeados de acordo com o banco de dados
      #coId;
      #coIdCheckin;
      #coIdReserva;
      #coNomePessoa;
      #coEmail;
      #coQuarto;
      #coQuartoValor;
      #coNomeQuarto;
      #coCinData;
      #coCinDataEsperada;
      #coCoutDataReal;
      #coCoutDataEsperada;
      #coDataReserva;
      #coNumAdultos;
      #coNumCriancas;
      #coIdServContratados;
      #coNomeServContratados;
      #coValorServs;
      #coValorTotal;
  
      constructor(coId, coIdCheckin, coIdReserva, coNomePessoa, coEmail, coQuarto, 
                  coQuartoValor, coNomeQuarto, coCinData, coCinDataEsperada, coCoutDataReal, 
                  coCoutDataEsperada, coDataReserva, coNumAdultos, coNumCriancas, coIdServContratados, 
                  coNomeServContratados, coValorServs,coValorTotal) {
          this.coId = coId;
          this.coIdCheckin = coIdCheckin;
          this.coIdReserva = coIdReserva;
          this.coNomePessoa = coNomePessoa;
          this.coEmail = coEmail;
          this.coQuarto = coQuarto;
          this.coQuartoValor = coQuartoValor;
          this.coNomeQuarto = coNomeQuarto;
          this.coCinData = coCinData;
          this.coCinDataEsperada = coCinDataEsperada;
          this.coCoutDataReal = coCoutDataReal;
          this.coCoutDataEsperada = coCoutDataEsperada;
          this.coDataReserva = coDataReserva;
          this.coNumAdultos = coNumAdultos;
          this.coNumCriancas = coNumCriancas;
          this.coIdServContratados = coIdServContratados;
          this.coNomeServContratados = coNomeServContratados;
          this.coValorServs = coValorServs;
          this.coValorTotal = coValorTotal;
      }
  
      toJSON() {
          return {
              co_id: this.coId,
              co_id_checkin: this.coIdCheckin,
              co_id_reserva: this.coIdReserva,
              co_nome_pessoa: this.coNomePessoa,
              co_email: this.coEmail,
              co_quarto: this.coQuarto,
              co_quarto_valor: this.coQuartoValor,
              co_nome_quarto: this.coNomeQuarto,
              co_cin_data: this.coCinData,
              co_cin_data_esperada: this.coCinDataEsperada,
              co_cout_data_real: this.coCoutDataReal,
              co_cout_data_esperada: this.coCoutDataEsperada,
              co_dataReserva: this.coDataReserva,
              co_num_adultos: this.coNumAdultos,
              co_num_criancas: this.coNumCriancas,
              co_id_servContratados: this.coIdServContratados,
              co_nome_servContratados: this.coNomeServContratados,
              co_valor_servs: this.coValorServs,
              co_valor_total: this.coValorTotal
          };
      }

    // Métodos de acesso (getters e setters)
    get coId() { return this.#coId; }
    set coId(value) { this.#coId = value; }

    get coIdCheckin() { return this.#coIdCheckin; }
    set coIdCheckin(value) { this.#coIdCheckin = value; }

    get coIdReserva() { return this.#coIdReserva; }
    set coIdReserva(value) { this.#coIdReserva = value; }

    get coNomePessoa() { return this.#coNomePessoa; }
    set coNomePessoa(value) { this.#coNomePessoa = value; }

    get coEmail() { return this.#coEmail; }
    set coEmail(value) { this.#coEmail = value; }

    get coQuarto() { return this.#coQuarto; }
    set coQuarto(value) { this.#coQuarto = value; }

    get coQuartoValor() { return this.#coQuartoValor; }
    set coQuartoValor(value) { this.#coQuartoValor = value; }

    get coNomeQuarto() { return this.#coNomeQuarto; }
    set coNomeQuarto(value) { this.#coNomeQuarto = value; }

    get coCinData() { return this.#coCinData; }
    set coCinData(value) { this.#coCinData = value; }

    get coCinDataEsperada() { return this.#coCinDataEsperada; }
    set coCinDataEsperada(value) { this.#coCinDataEsperada = value; }

    get coCoutDataReal() { return this.#coCoutDataReal; }
    set coCoutDataReal(value) { this.#coCoutDataReal = value; }

    get coCoutDataEsperada() { return this.#coCoutDataEsperada; }
    set coCoutDataEsperada(value) { this.#coCoutDataEsperada = value; }

    get coDataReserva() { return this.#coDataReserva; }
    set coDataReserva(value) { this.#coDataReserva = value; }

    get coNumAdultos() { return this.#coNumAdultos; }
    set coNumAdultos(value) { this.#coNumAdultos = value; }

    get coNumCriancas() { return this.#coNumCriancas; }
    set coNumCriancas(value) { this.#coNumCriancas = value; }

    get coIdServContratados() { return this.#coIdServContratados; }
    set coIdServContratados(value) { this.#coIdServContratados = value; }

    get coNomeServContratados() { return this.#coNomeServContratados; }
    set coNomeServContratados(value) { this.#coNomeServContratados = value; }

    get coValorServs() { return this.#coValorServs; }
    set coValorServs(value) { this.#coValorServs = value; }

    get coValorTotal() { return this.#coValorTotal; }
    set coValorTotal(value) { this.#coValorTotal = value; }


    async gravarCheckout(dados) {
        // Definindo a consulta SQL de inserção de dados com a nova sequência de campos
        let sql = `INSERT INTO tb_checkout
        (co_id, co_id_checkin, co_id_reserva, co_nome_pessoa, co_email, co_quarto, co_quarto_valor, 
        co_nome_quarto, co_cin_data, co_cin_data_esperada, co_cout_data_real, co_cout_data_esperada, 
        co_dataReserva, co_num_adultos, co_num_criancas, co_id_servContratados, co_nome_servContratados, co_valor_servs, co_valor_total)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        let valores = dados;
            // Executando o comando SQL para inserir o checkout
            let resultadoRegisterCout = await conexao.ExecutaComandoNonQuery(sql, valores);
    
            // Após inserir, realiza o update na tabela de checkin

            let resultado;
            if(resultadoRegisterCout) {
                resultado = true;
                return resultado;
            } else {
                resultado = false;
                return resultado;
            }
            return resultado;
         
    }
    

    async editarCheckout(lista) {
        let sql = `UPDATE tb_checkout SET 
                    co_id_checkin = ?, 
                    co_id_reserva = ?, 
                    co_nome_pessoa = ?, 
                    co_email = ?, 
                    co_quarto = ?, 
                    co_quarto_valor = ?, 
                    co_nome_quarto = ?, 
                    co_cin_data = ?, 
                    co_cin_data_esperada = ?, 
                    co_cout_data_real = ?, 
                    co_cout_data_esperada = ?, 
                    co_dataReserva = ?, 
                    co_num_adultos = ?, 
                    co_num_criancas = ?, 
                    co_id_servContratados = ?, 
                    co_nome_servContratados = ?, 
                    co_valor_servs = ?,
                    co_valor_total = ?
                WHERE co_id = ?`;
    
        let valores = lista;
    
        try {
            // Executando o comando SQL com os parâmetros
            let resultadoUpdateCout = await conexao.ExecutaComandoNonQuery(sql, valores);
                let resultado;
                if(resultadoUpdateCout) {
                    resultado = true;
                    return resultado;
                } else {
                    resultado = false;
                    return resultado;
                }  
        } catch (erro) {
            console.error("Erro ao editar o checkout:", erro);
            throw new Error("Erro ao editar o checkout.");
        }
    }
    
    async atualizaDataCheckIn(coutData, cinId){
        
            let updateSql = "UPDATE tb_checkin SET cin_cout_data = ? WHERE cin_id = ?";
            let updateValores = [coutData, cinId];
            // Executando o update para registrar o checkout no checkin
            let resultadoUpdateCin = await conexao.ExecutaComandoNonQuery(updateSql, updateValores);

            if(resultadoUpdateCin){
                return true;
            }

             return false;
       
    }
    

    async deletarCheckout(coId) {
        let sql = "DELETE FROM tb_checkout WHERE co_id = ?";
        let valor = [coId];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valor);
        return resultado;
    }
    
    async obterCheckoutPorId(cinId) {
        // Fazendo a consulta no banco de dados
        let sql = `SELECT * FROM tb_checkout where co_id_checkin = ${cinId}`;  // Filtrando diretamente no SQL para melhorar a performance

        let rows = await conexao.ExecutaComando(sql);  // Executando a consulta
    
        if (rows.length > 0) {
                // Encontrando o checkout que corresponde ao cinId
                let row = rows[0];  // Já sabemos que queremos o primeiro (e único) resultado baseado no filtro
               
                    
                    let checkout = new CheckoutModel(
                        row["co_id"],                     // co_id
                        row["co_id_checkin"],              // co_id_checkin
                        row["co_id_reserva"],              // co_id_reserva
                        row["co_nome_pessoa"],             // co_nome_pessoa
                        row["co_email"],                   // co_email
                        row["co_quarto"],                  // co_quarto
                        row["co_quarto_valor"],            // co_quarto_valor
                        row["co_nome_quarto"],             // co_nome_quarto
                        row["co_cin_data"],                // co_cin_data
                        row["co_cin_data_esperada"],       // co_cin_data_esperada
                        row["co_cout_data_real"],          // co_cout_data_real
                        row["co_cout_data_esperada"],      // co_cout_data_esperada
                        row["co_dataReserva"],             // co_dataReserva
                        row["co_num_adultos"],             // co_num_adultos
                        row["co_num_criancas"],            // co_num_criancas
                        row["co_id_servContratados"],      // co_id_servContratados
                        row["co_nome_servContratados"],    // co_nome_servContratados
                        row["co_valor_servs"],              // co_valor_servs
                        row["co_valor_total"]
                    );
                    return checkout;
                
               
           
            return false;
        }else {
            // Caso não encontre nenhum checkout com o cinId
            return false;
        }
    }
   /*async obterCheckoutPorId(cinId) {
        // Fazendo a consulta no banco de dados
        let sql = `SELECT * FROM tb_checkout`;  // Filtrando diretamente no SQL para melhorar a performance

        let rows = await conexao.ExecutaComando(sql);  // Executando a consulta
    
        if (rows.length > 0) {
                // Encontrando o checkout que corresponde ao cinId
                let row = rows[0];  // Já sabemos que queremos o primeiro (e único) resultado baseado no filtro
                for(let i; i>rows.length; i++ ){
                    // Criando o modelo de Checkout com os dados da linha (row)
                    if(parseInt(row["co_id_checkin"][i]) == parseInt(cinId) ) {
                    let checkout = new CheckoutModel(
                        row["co_id"][i],                     // co_id
                        row["co_id_checkin"][i],              // co_id_checkin
                        row["co_id_reserva"][i],              // co_id_reserva
                        row["co_nome_pessoa"][i],             // co_nome_pessoa
                        row["co_email"][i],                   // co_email
                        row["co_quarto"][i],                  // co_quarto
                        row["co_quarto_valor"][i],            // co_quarto_valor
                        row["co_nome_quarto"][i],             // co_nome_quarto
                        row["co_cin_data"][i],                // co_cin_data
                        row["co_cin_data_esperada"][i],       // co_cin_data_esperada
                        row["co_cout_data_real"][i],          // co_cout_data_real
                        row["co_cout_data_esperada"][i],      // co_cout_data_esperada
                        row["co_dataReserva"][i],             // co_dataReserva
                        row["co_num_adultos"][i],             // co_num_adultos
                        row["co_num_criancas"][i],            // co_num_criancas
                        row["co_id_servContratados"][i],      // co_id_servContratados
                        row["co_nome_servContratados"][i],    // co_nome_servContratados
                        row["co_valor_servs"][i],              // co_valor_servs
                        row["co_valor_total"][i]
                    );
                    return checkout;
                }
               
            } 
            return false;
        }else {
            // Caso não encontre nenhum checkout com o cinId
            return false;
        }
    }
*/

    async obterIdCheckout(cinId) {
        
        let sql = "SELECT co_id FROM tb_checkout WHERE co_id_checkin = ?";
        let valores = [cinId];
        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return rows;
        }
            return rows = false;
    }

    async obterCheckouts() {
        let sql = "SELECT * FROM tb_checkout";
        let rows = await conexao.ExecutaComando(sql);
        let checkouts = [];

        if (rows.length > 0) {
            for (let row of rows) {
                let checkout = new CheckoutModel();
                checkout.coId = row["co_id"];
                checkout.coIdCheckin = row["co_id_checkin"];
                checkout.coIdReserva = row["co_id_reserva"];
                checkout.coNomePessoa = row["co_nome_pessoa"];
                checkout.coEmail = row["co_email"];
                checkout.coQuarto = row["co_quarto"];
                checkout.coQuartoValor = row["co_quarto_valor"];
                checkout.coNomeQuarto = row["co_nome_quarto"];
                checkout.coCinData = row["co_cin_data"];
                checkout.coCinDataEsperada = row["co_cin_data_esperada"];
                checkout.coCoutDataReal = row["co_cout_data_real"];
                checkout.coCoutDataEsperada = row["co_cout_data_esperada"];
                checkout.coDataReserva = row["co_dataReserva"];
                checkout.coNumAdultos = row["co_num_adultos"];
                checkout.coNumCriancas = row["co_num_criancas"];
                checkout.coIdServContratados = row["co_id_servContratados"];
                checkout.coNomeServContratados = row["co_nome_servContratados"];
                checkout.coValorServs = row["co_valor_servs"];
                checkout.coValorTotal = row["co_valor_total"];
                checkouts.push(checkout);


            }
        }
        return checkouts;
    }
}

module.exports = CheckoutModel;
