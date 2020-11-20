var cadastros = [];
var dados;
var banco = window.localStorage;

var precototal = 0;

var mapa;

$(document).ready(function(){
	
	dados = JSON.parse(banco.getItem("usuarios"));
	
	$("#bCad").click(function(){ /* botao para cadastrar*/
		var nome = $("#bNome").val();
		var sobrenome = $("#bSobrenome").val();
		var email = $("#bEmail").val();
		var senha = $("#bSenha").val();
		var celular = $("#bCelular").val();
		var data_nasc = $("#bData").val();
		
		aux = [];
		aux.push(nome);
        aux.push(sobrenome);
        aux.push(email);
        aux.push(senha);
        aux.push(celular);
        aux.push(data_nasc);

        cadastros.push(aux);

        banco.setItem("usuarios", JSON.stringify(cadastros));

        document.getElementById('bNome').value='';
        document.getElementById('bSobrenome').value='';
        document.getElementById('bEmail').value='';
        document.getElementById('bSenha').value='';
        document.getElementById('bCelular').value='';
        document.getElementById('bData').value='';
		
	});
	
	$("#bEntrar").click(function(){ /* botao para entrar*/ 
		fLocalConfirmar();
	});

	$("#bContinuar").click(function(){ /* botao a opcao de pagamento */
		var select = document.getElementById('opc');
		var valor = select.options[select.selectedIndex].value;
		
		if(valor == 'boleto'){
			window.location.href = "./boleto.html";
		}
		if(valor == 'cartao'){
			window.location.href = "./cartao.html";
		}
	});
	
	$("#limpar").click(function(){ /* botao para entrar*/ 
		for(var i =0; i<20; i++){
			localStorage.removeItem("produto" + i);
			localStorage.removeItem("qtd" + i);
			localStorage.removeItem("valor" + i);
			location.reload();
		}
	});
	
	var total = 0; 
	var i = 0;  
	var valor = 0;		

	for(i=1; i<=20; i++)
	{
		var prod = localStorage.getItem("produto" + i + "");
		
		if(prod != null) 
		{
			$("#qtd").append("<br>" + localStorage.getItem("qtd" + i) + "<br>");
			$("#pdt").append("<br>" + localStorage.getItem("produto" + i)+ "<br>");
			$("#pço").append("<br>" + "R$" + localStorage.getItem("valor" + i)+ "<br>");

			valor = parseFloat(localStorage.getItem("valor" + i));
			total = (total + valor);
		}
	}
	total = total.toFixed(2);
	$("#total").append(total);
	$("#pagar_boleto").append(" R$ " + total);
	$("#pagar_cartao").append(" R$ " + total);
	
});

function fLocalConfirmar() {
	var conf_email = $("#cEmail").val();
	var conf_senha = $("#cSenha").val();
	for(i=0; i<dados.length; i++){
        if((dados[i][2] == conf_email) && (dados[i][3] == conf_senha)) {
            window.location.href = "../index.html";
            document.getElementById('cEmail').value='';
            document.getElementById('cSenha').value='';
			localStorage.removeItem("produto" + i);
			localStorage.removeItem("qtd" + i);
			localStorage.removeItem("valor" + i);
        }

        else{
            document.getElementById('cEmail').value='';
            document.getElementById('cSenha').value='';
            alert("Email ou senha invalidos!");
        }
	}
}

function AddCarrinho(produto, qtd, valor, posicao)
{
	localStorage.setItem("produto" + posicao, produto);
	localStorage.setItem("qtd" + posicao, qtd);
	valor = valor * qtd;
	localStorage.setItem("valor" + posicao, valor);
	alert("Produto adicionado ao carrinho!");
}

function initMap() {

  var configuracoes = {
    center: {lat: -25.442388, lng:  -49.347431},
    zoom: 15
  }
      
  mapa = new google.maps.Map(document.getElementById('map'), configuracoes);

  var marcador = new google.maps.Marker({
    position: {lat: -25.442388, lng:  -49.347431},
    title: "MOVIEBUFFS",
    map: mapa
  });
}
