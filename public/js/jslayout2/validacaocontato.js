var decisaonome = 0;
var decisaosobrenome = 0;
var decisaoemail = 0;
var decisaoassunto = 0;
var decisaotexto = 0;

function validactt()
{
    var fnome = document.getElementById('fname');
    var lnome = document.getElementById('lname');
    var pfnome = document.getElementById('pfname');
    var plnome = document.getElementById('plname');
    var email = document.getElementById('email');
    var pemail = document.getElementById('pemail');
    var mensagem = document.getElementById('message');
    var pmensagem = document.getElementById('pmessage');
   
    if (fnome.value.length < 2) {
        fnome.style.borderColor = 'red';
        pfnome.textContent = 'O primeiro nome deve ter pelo menos 2 caracteres';
        pfnome.style.color = 'red';
        decisaonome = 0;
      } else {
        fnome.style.borderColor = '#3cffef';
        pfnome.textContent = '';
        decisaonome = 1;
        
      }

      if (lnome.value.length < 2) {
        lnome.style.borderColor = 'red';
        plnome.textContent = 'O sobrenome deve ter pelo menos 2 caracteres';
        plnome.style.color = 'red';
        decisaosobrenome = 0;
      } else {
        lnome.style.borderColor = '#3cffef';
        plnome.textContent = '';
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

        if(mensagem.value.length<20)
        {

            pmensagem.style.color = "red";
            pmensagem.textContent = 'A mensagem é muito curta, mensagem deve ter mais que 20 caractéres, por favor, especifique melhor o seu problema para que possamos ajudar !';
            mensagem.style.borderColor = "red";
            decisaotexto=0;

        }else{
            
            pmensagem.textContent = '';
            mensagem.style.borderColor = "#3cffef";
            decisaotexto = 1;
        }


}

function validabotaoc()
{
  if(decisaoemail == 1 && decisaonome == 1 && decisaosobrenome == 1 && decisaotexto == 1)
  {
    alert("CONTATO EFETUADO COM SUCESSO !");
    adicionarInfo();
    apagarCampos();
    //window.location.href = "index.html";

  }else{
    alert("NÃO FOI POSSIVEL EFETUAR O CONTATO, VERIFIQUE OS FORMULÁRIOS !");
    //window.location.href = "contact.html";
  }

  event.preventDefault();
}

function adicionarInfo(){
  let nome = document.querySelector('#fname').value;
  let sobrenome = document.querySelector('#lname').value;
  let email = document.querySelector('#email').value;
  let mensagem = document.querySelector('#message').value;

  let htmlLinha = `<tr>
                      <td>${nome} ${sobrenome}</td>
                      <td>${email}</td>
                      <td>${mensagem}</td>
                  </tr>`
  
  let tabela = document.querySelector('#tabelaContato');

  tabela.innerHTML+=htmlLinha;

  event.preventDefault();
}

function apagarCampos(){
  document.querySelector('#fname').value = '';
  document.querySelector('#lname').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#message').value = '';
  document.querySelector('#subject').value = '';
}