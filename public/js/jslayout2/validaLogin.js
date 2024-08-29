var validar = 0;


function validaLogin()
{
    var login = document.getElementById('login');
    //var plogin = document.getElementById('plogin');
    var senha = document.getElementById('senha');
    var psenha = document.getElementById('psenha');
    
    var loginPronto = 'Brayann'
    var senhaPronta = 123456

    if(login.value != loginPronto || senha.value != senhaPronta){
      login.style.borderColor = 'red';
      senha.style.borderColor = 'red';
      psenha.textContent = 'Login ou senha incorreta';
      psenha.style.color = 'red';
      validar = 0;
    }
    else{
      login.style.borderColor = '#3cffef';
      senha.style.borderColor = '#3cffef';
      psenha.textContent = '';
      validar = 1;
      
    }

}
  
  

  function validabotao()
  {

    if (validar == 1)
    {
      alert("LOGIN EFETUADO COM SUCESSO!");
      window.location.href = "index.html";

    }else{
      alert('LOGIN NAO CADASTRADO!');
      window.location.href = "login.html";
      
    }
  }

    
  
  
  
  
  
  
  
  
  /*if (fnome.value.length < 2) {
        fnome.style.borderColor = 'red';
        pfnome.textContent = 'O primeiro nome deve ter pelo menos 2 caracteres';
        pfnome.style.color = 'red';
      } else {
        fnome.style.borderColor = '#3cffef';
        pfnome.textContent = '';
      }

      if (lnome.value.length < 2) {
        lnome.style.borderColor = 'red';
        plnome.textContent = 'O sobrenome deve ter pelo menos 2 caracteres';
        plnome.style.color = 'red';
      } else {
        lnome.style.borderColor = '#3cffef';
        plnome.textContent = '';
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailRegex.test(email.value)) {
          email.style.borderColor = 'red';
          pemail.textContent = 'Por favor, insira um e-mail válido, email deve conter (@, ponto, e mais de 1 caractér)';
          pemail.style.color = 'red';
        } else {
          email.style.borderColor = '#3cffef';
          pemail.textContent = '';
        }

        if(mensagem.value.length<20)
        {

            pmensagem.style.color = "red";
            pmensagem.textContent = 'Mensagem muito curta !, é menor que 20 caractéres, por favor, especifique melhor o seu problema para que possamos ajudar !';
            mensagem.style.borderColor = "red";

        }else{
            
            pmensagem.textContent = '';
            mensagem.style.borderColor = "#3cffef";
        }*/


