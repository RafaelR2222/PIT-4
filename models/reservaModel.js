const Database = require('../utils/database')

const conexao = new Database();

class ReservaModel {
    #resId;
    #resPesNome;
    #resPesEmail;
    #resQuartoId;
    #resDataCheckin;
    #resDataCheckout;
    #resNumAdulto;
    #resNumCrianca;
    #resDataReserva;
    #resValorTotal;  // Novo campo

    // Constructor to initialize the fields
    constructor(resId, resPesNome, resPesEmail, resQuartoId, resDataCheckin, resDataCheckout, resNumAdulto, resNumCrianca, resDataReserva, resValorTotal) {
        this.#resId = resId;
        this.#resPesNome = resPesNome;
        this.#resPesEmail = resPesEmail;
        this.#resQuartoId = resQuartoId;
        this.#resDataCheckin = resDataCheckin;
        this.#resDataCheckout = resDataCheckout;
        this.#resNumAdulto = resNumAdulto;
        this.#resNumCrianca = resNumCrianca;
        this.#resDataReserva = resDataReserva;
        this.#resValorTotal = resValorTotal;  // Inicializando o novo campo
    }

    // Método para retornar os dados em formato JSON
    toJSON() {
        return {
            resId: this.#resId,
            resPesNome: this.#resPesNome,
            resPesEmail: this.#resPesEmail,
            resQuartoId: this.#resQuartoId,
            resDataCheckin: this.#resDataCheckin,
            resDataCheckout: this.#resDataCheckout,
            resNumAdulto: this.#resNumAdulto,
            resNumCrianca: this.#resNumCrianca,
            resDataReserva: this.#resDataReserva,
            resValorTotal: this.#resValorTotal  // Incluindo o novo campo
        };
    }

    // Getter and Setter for resId
    get resId() {
        return this.#resId;
    }

    set resId(resId) {
        this.#resId = resId;
    }

    // Getter and Setter for resPesNome
    get resPesNome() {
        return this.#resPesNome;
    }

    set resPesNome(resPesNome) {
        this.#resPesNome = resPesNome;
    }

    // Getter and Setter for resPesEmail
    get resPesEmail() {
        return this.#resPesEmail;
    }

    set resPesEmail(resPesEmail) {
        this.#resPesEmail = resPesEmail;
    }

    // Getter and Setter for resQuartoId
    get resQuartoId() {
        return this.#resQuartoId;
    }

    set resQuartoId(resQuartoId) {
        this.#resQuartoId = resQuartoId;
    }

    // Getter and Setter for resDataCheckin
    get resDataCheckin() {
        return this.#resDataCheckin;
    }

    set resDataCheckin(resDataCheckin) {
        this.#resDataCheckin = resDataCheckin;
    }

    // Getter and Setter for resDataCheckout
    get resDataCheckout() {
        return this.#resDataCheckout;
    }

    set resDataCheckout(resDataCheckout) {
        this.#resDataCheckout = resDataCheckout;
    }

    // Getter and Setter for resNumAdulto
    get resNumAdulto() {
        return this.#resNumAdulto;
    }

    set resNumAdulto(resNumAdulto) {
        this.#resNumAdulto = resNumAdulto;
    }

    // Getter and Setter for resNumCrianca
    get resNumCrianca() {
        return this.#resNumCrianca;
    }

    set resNumCrianca(resNumCrianca) {
        this.#resNumCrianca = resNumCrianca;
    }

    get resDataReserva() {
        return this.#resDataReserva;
    }

    set resDataReserva(resDataReserva) {
        this.#resDataReserva = resDataReserva;
    }

    get resValorTotal() {
        return this.#resValorTotal;
    }

    set resValorTotal(resValorTotal) {
        this.#resValorTotal = resValorTotal;
    }


    async gravarReserva() {
        let dataAtual = new Date();
        let sql = `insert into tb_reserva
                    (res_id, res_pesNome, res_pesEmail, res_quartoId, res_dataCheckin, res_dataCheckout, res_numAdulto, res_numCrianca, res_dataReserva)
                    values (0, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let valores = [this.#resPesNome, this.#resPesEmail, this.#resQuartoId, this.#resDataCheckin, this.#resDataCheckout, this.#resNumAdulto, this.#resNumCrianca, dataAtual];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async editarReserva(reservaId) {
        let sql = `update tb_reserva set res_pesNome = ?, res_pesEmail = ?, 
                    res_quartoId = ?, res_dataCheckin = ?, res_dataCheckout = ?, res_numAdulto = ?, res_numCrianca = ?  where res_id = ?`;
        let valores = [this.#resPesNome, this.#resPesEmail, this.#resQuartoId, this.#resDataCheckin, this.#resDataCheckout, this.#resNumAdulto, this.#resNumCrianca, reservaId];

        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

        return resultado;
    }

    async deletarReserva(id) {
    try{
        let sql = "delete from tb_reserva where res_id = ?";
        let valor = [id];

            let result1 = await conexao.ExecutaComandoNonQuery(sql, valor);

        return result1;
    }catch(error) {

        return false;
    }

    
    }

    async obterReservas() {
        let sql = "SELECT * FROM tb_reserva";
        let rows = await conexao.ExecutaComando(sql);
    
        let reservas = [];
    
        if (rows.length > 0) {
            for (let row of rows) {
                let reserva = new ReservaModel();
                reserva.resId = row["res_id"];
                reserva.resPesNome = row["res_pesNome"];
                reserva.resPesEmail = row["res_pesEmail"];
                reserva.resQuartoId = row["res_quartoId"];
                reserva.resDataCheckin = new Date(row["res_dataCheckin"]).toLocaleDateString();
                reserva.resDataCheckout = new Date(row["res_dataCheckout"]).toLocaleDateString();
                reserva.resNumAdulto = row["res_numAdulto"];
                reserva.resNumCrianca = row["res_numCrianca"];
                reserva.resDataReserva = new Date(row["res_dataReserva"]).toLocaleDateString();
                
                // reserva convertida para JSON à lista
                reservas.push(reserva.toJSON());
            }
        }
    
        return reservas; //lista de reservas como JSON
    }
    
    

    async obterReservaPorId(id) {
        let sql = "select * from tb_reserva where res_id = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let reserva = new ReservaModel();
            reserva.resId = rows[0]["res_id"];
            reserva.resPesNome = rows[0]["res_pesNome"];
            reserva.resPesEmail = rows[0]["res_pesEmail"];
            reserva.resQuartoId = rows[0]["res_quartoId"];
            reserva.resDataCheckin = new Date(rows[0]["res_dataCheckin"]).toLocaleDateString();
            reserva.resDataCheckout = new Date(rows[0]["res_dataCheckout"]).toLocaleDateString();
            reserva.resNumAdulto = rows[0]["res_numAdulto"];
            reserva.resNumCrianca = rows[0]["res_numCrianca"];
            reserva.resDataReserva = new Date(rows[0]["res_dataReserva"]).toLocaleDateString();

            return reserva;
        }

        return false;
    }

    async obterReservaPorEmail(email) {
        let sql = "select * from tb_reserva where res_pesEmail = ?";
        let valores = [email];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let reserva = new ReservaModel();
            reserva.resId = rows[0]["res_id"];
            reserva.resPesNome = rows[0]["res_pesNome"];
            reserva.resPesEmail = rows[0]["res_pesEmail"];
            reserva.resQuartoId = rows[0]["res_quartoId"];
            reserva.resDataCheckin = new Date(rows[0]["res_dataCheckin"]).toLocaleDateString();
            reserva.resDataCheckout = new Date(rows[0]["res_dataCheckout"]).toLocaleDateString();
            reserva.resNumAdulto = rows[0]["res_numAdulto"];
            reserva.resNumCrianca = rows[0]["res_numCrianca"];
            reserva.resDataReserva = new Date(rows[0]["res_dataReserva"]).toLocaleDateString();
            reserva.resValorTotal = rows[0]["res_valorTotal"];

            return reserva;
        }

        return false;
    }
    
    async listaReservas(termo, busca) {
        let sqlWhere = "";
        if(termo != undefined && termo != ""){
            if(busca == "1") {
                if(isNaN(termo) == false)
                    sqlWhere = ` where r.res_quartoId = ${termo} `;
            }
            else if(busca == "2") {
                sqlWhere = ` where r.res_pesNome like '%${termo}%'  `;
            }
        }

        let sql = `select * from tb_reserva r inner join tb_quartos q on r.res_quartoId = q.qr_id_quarto ${sqlWhere} order by r.res_dataCheckin DESC`;
        let rows = await conexao.ExecutaComando(sql);

        var relatorio = [];

        for(var i = 0; i < rows.length; i++){
            var row = rows[i];
            var data = {
                id: row["res_id"],
                nomeCliente: row["res_pesNome"],
                idQuarto: row["qr_id_quarto"],
                emailPessoa: row["res_pesEmail"],
                nomeQuarto: row["qr_descricao"],
                dataCheckin: new Date(row["res_dataCheckin"]).toLocaleDateString(),
                dataCheckout: new Date(row["res_dataCheckout"]).toLocaleDateString(),
                numAdultos: row["res_numAdulto"],
                numCriancas: row["res_numCrianca"],
                dataReserva: new Date(row["res_dataReserva"]).toLocaleDateString()
            };
            
            
            

            relatorio.push(data);
        }

        return relatorio;
    }



}

module.exports = ReservaModel;