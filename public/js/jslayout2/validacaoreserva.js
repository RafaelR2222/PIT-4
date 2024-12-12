
var decisaonome = 0;
var decisaosobrenome = 0;
var decisaoemail = 0;
var decisaoadulto = 0;
var decisaoquartos = 0;
var decisaocriancas = 0;
var decisaodata1 = 0;
var decisaodata2 = 0;



function verificaall() {
  var fname = document.getElementById('fname');
  var lname = document.getElementById('lname');
  var pfnome = document.getElementById('pfnome');
  var plname = document.getElementById('plname');
  var email = document.getElementById('email');
  var pemail = document.getElementById('pemail');
  var adults = document.getElementById('adults');
  var padults = document.getElementById('padults');
  var quarto = document.getElementById('room');
  var pquarto = document.getElementById('proom');
  var crianca = document.getElementById('children');
  var pcrianca = document.getElementById('pchildren');
  var dataInicialInput = document.getElementById('date-arrival');
  var dataFinalInput = document.getElementById('date-departure');
  var pdataInicial = document.getElementById('pdatearrival');
  var pdataFinal = document.getElementById('pdatedeparture');

  var hoje = new Date();
  var dataInicialSelecionada = new Date(dataInicialInput.value);
  var dataFinalSelecionada = new Date(dataFinalInput.value);

  if (fname.value.length < 2) {
    fname.style.borderColor = 'red';
    pfnome.textContent = 'O primeiro nome deve ter pelo menos 2 caracteres';
    pfnome.style.color = 'red';
    decisaonome = 0;
  } else {
    fname.style.borderColor = '#3cffef';
    pfnome.textContent = '';
    decisaonome = 1;
  }

  if (lname.value.length < 2) {
    lname.style.borderColor = 'red';
    plname.textContent = 'O sobrenome deve ter pelo menos 2 caracteres';
    plname.style.color = 'red';
    decisaosobrenome = 0;
  } else {
    lname.style.borderColor = '#3cffef';
    plname.textContent = '';
    decisaosobrenome = 1;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    email.style.borderColor = 'red';
    pemail.textContent = 'Por favor, insira um e-mail válido, email deve conter (@, ponto, e mais de 1 caractér)';
    pemail.style.color = 'red';
    decisaoemail = 0;
  } else {
    email.style.borderColor = '#3cffef';
    pemail.textContent = '';
    decisaoemail = 1;
  }

  if (adults.value === '') {
    adults.style.borderColor = 'red';
    padults.textContent = 'Por favor, selecione ao menos 1 adulto. A reserva exige obrigatoriamente 1 adulto por quarto no mínimo.';
    padults.style.color = 'red';
    decisaoadulto = 0;
  } else {
    adults.style.borderColor = '#3cffef';
    padults.textContent = '';
    decisaoadulto = 1;
  }

  if (quarto.value === '') {
    quarto.style.borderColor = 'red';
    pquarto.textContent = 'Por favor, selecione um dos quartos, opção inválida';
    pquarto.style.color = 'red';
    decisaoquartos = 0;
  } else {
    quarto.style.borderColor = '#3cffef';
    pquarto.textContent = '';
    pquarto.style.color = '#3cffef';
    decisaoquartos = 1;
  }

  if (crianca.value === '') {
    crianca.style.borderColor = 'red';
    pcrianca.textContent = 'Por favor, selecione a quantidade de crianças, crianças não são obrigatórias, mas é obrigatório a escolha de uma opção!';
    pcrianca.style.color = 'red';
    decisaocriancas = 0;
  } else {
    crianca.style.borderColor = '#3cffef';
    pcrianca.textContent = '';
    pcrianca.style.color = '#3cffef';
    decisaocriancas = 1;
  }

  if (dataInicialSelecionada > hoje && dataInicialSelecionada < dataFinalSelecionada) {
    dataInicialInput.style.borderColor = 'green';
    dataFinalInput.style.borderColor = 'green';
    pdataInicial.textContent = '';
    pdataFinal.textContent = '';
    decisaodata1 = 1;
  } else {
    if (dataInicialSelecionada <= hoje) {
      dataInicialInput.style.borderColor = 'red';
      pdataInicial.textContent = 'Data inválida! A data selecionada deve ser posterior a hoje.';
      pdataInicial.style.color = 'red';
      decisaodata1 = 0;
    } else {
      dataInicialInput.style.borderColor = 'green';
      pdataInicial.textContent = ''
      decisaodata1 = 1;
    }

    if (dataFinalSelecionada <= hoje || dataFinalSelecionada <= dataInicialSelecionada) {
      dataFinalInput.style.borderColor = 'red';
      pdataFinal.textContent = 'Data inválida! A data final deve ser superior à data de hoje e à data inicial preenchida.';
      pdataFinal.style.color = 'red';
      decisaodata2 = 0;
    } else {
      dataFinalInput.style.borderColor = 'green';
      pdataFinal.textContent = '';
      decisaodata2 = 1;
    }
  }
}

async function verificabotaor() {
  var fname = document.getElementById('fname');
  var lname = document.getElementById('lname');
  var email = document.getElementById('email');
  var adults = document.getElementById('adults');
  var quarto = document.getElementById('room');
  var crianca = document.getElementById('children');
  var dataInicialInput = document.getElementById('date-arrival');
  var dataFinalInput = document.getElementById('date-departure');

    let body = {
      nome: fname.value + ' ' + lname.value,
      email: email.value,
      adultos: adults.value,
      quartos: quarto.value,
      criancas: crianca.value,
      dataInicial: dataInicialInput.value,
      dataFinal: dataFinalInput.value
    }

    console.log(body)

    await fetch('/reservas/gravar', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json()
    }).then(function (r) {
      if (r.ok == true) {
        alert("RESERVA EFETUADA COM SUCESSO !")
        location.reload(true);
      } else {
        console.log(JSON.stringify(r))
        alert(r.message)
        location.reload(true);
      }
    })
}

