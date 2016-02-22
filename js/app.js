  $(document).ready(function(){
     
   
         $('#cart').click(function(){
             
           $(".containe").animate({width: 'toggle'}, "500");
         }); 
         $('.conteudo').click(function(){
             
           $(".containe").animate({width: 'hide'}, "500");
         }); 
       
         $('.footer').click(function(){
             
            $(".menu-itens").animate({height: 'toggle'}, "500");
         });
     $('#pai').click(function(){
             
            $(".sub-item").animate({height: 'toggle'}, "500");
      });
    
     if(localStorage.getItem("total2") == null){        
        localStorage.setItem("total2","00,00");
        localStorage.setItem("itens","Nenhum item adicionado.");
        localStorage.setItem("i",0);              
    
        $(".total").html(localStorage.getItem("total2"));
        $(".cart").html(localStorage.getItem("itens"));  
    }else{
        $(".cart").html(localStorage.getItem("itens"));  
        $(".total").html(localStorage.getItem("total2"));
    }
     $(".btn-fim").click(function(){

       if(localStorage.getItem("itens") == "Nenhum item adicionado." ||localStorage.getItem("itens") == ""){
           alert("Você deve adicionar alguem item antes");
       }else{
           window.location.href="finalizar-pedido.html";
       }
       
   
     });
   
});

  function verificar(elemento,preco){ 
                //CAPTURANDO O PRODUTO CLICADO
                  
                    jQuery('.produto').on('click', function(){
                       var $this = $(this).index();
                        var antigo = localStorage.getItem("indice");
                       localStorage.setItem("indice",$this);
                       if(localStorage.getItem("indice") != antigo){
                           $(".btn-borda").removeClass("ativar");
                         
                           document.getElementsByClassName("addcart")[localStorage.getItem("indice")].setAttribute("data-borda-type","Simples");
                           document.getElementsByClassName("addcart")[localStorage.getItem("indice")].setAttribute("data-bordaval-type",0);
                           console.log("Removel");
                           
                        }
                       console.log("Função:"+ localStorage.getItem("indice"));
                     
                   });
                   
                   var indice = localStorage.getItem("indice");
                   
                  $(".checked").click(function(){
                      var divs = elemento.getAttribute("data-num-type");
                      localStorage.setItem("piz",divs);                  
                      $(".checked").removeClass("ativar");
                      $(this).addClass("ativar"); 
                      
                  });
                   var sabor = elemento.getAttribute("data-num-type");
                   document.getElementsByClassName("addcart")[indice].style.display = "block";
                   document.getElementsByClassName("addcart")[indice].setAttribute("data-preco-type",preco);
                   document.getElementsByClassName("addcart")[indice].setAttribute("data-piz-type",sabor);
                   var valor  =  document.getElementsByClassName("addcart")[indice].getAttribute("data-preco-type");
                   if(document.getElementsByClassName("addcart")[indice].getAttribute("data-bordaval-type") != null){
                       var borda = document.getElementsByClassName("addcart")[indice].getAttribute("data-bordaval-type");
                       var somar = parseFloat(valor) + parseFloat(borda);
                       var formatado = somar.toFixed(2);
                       document.getElementsByClassName("preco")[indice].innerHTML = "R$:"+formatado;
                       
                   }else{
                        document.getElementsByClassName("preco")[indice].innerHTML = "R$:"+valor;
                   }
                              
  }

  function bordar(elemento,valor){                  
      jQuery('.produto').on('click', function(){
        var $this = $(this).index();
        localStorage.setItem("indice",$this);	
        console.log("borda:"+ localStorage.getItem("indice"));
                   
      });
       $(".btn-borda").click(function(){
         $(".btn-borda").removeClass("ativar");
         $(this).addClass("ativar");      
       });
                   
       var indice = localStorage.getItem("indice");
       var sabor  = elemento.getAttribute("data-bor-type");
       document.getElementsByClassName("addcart")[indice].setAttribute("data-borda-type",sabor);
       document.getElementsByClassName("addcart")[indice].setAttribute("data-bordaval-type",valor);
       var pizza  =  document.getElementsByClassName("addcart")[indice].getAttribute("data-preco-type");
       var borda = document.getElementsByClassName("addcart")[indice].getAttribute("data-bordaval-type");
       var somar = parseFloat(pizza) + parseFloat(borda);
       var formatado = somar.toFixed(2);
       document.getElementsByClassName("preco")[indice].innerHTML = "R$:"+formatado;
  }
  function limpar(){
      localStorage.setItem("total2","00,00");
      localStorage.setItem("itens","Nenhum item adicionado.");
      localStorage.setItem("i",0);  
      document.getElementsByClassName("cart")[0].innerHTML = localStorage.getItem("itens");
      document.getElementsByClassName("total")[0].innerHTML =localStorage.getItem("total2");
      
      
  }
  function somar(produto,preco,elemento){
  var i = localStorage.getItem("i");
  if(elemento.getAttribute("data-borda-type") != null){
     var borda = elemento.getAttribute("data-borda-type");
     var bordaval = elemento.getAttribute("data-bordaval-type"); 
      
  }else{
      var borda = "Simples";
      var bordaval = 0;
  }
     
  
  //preparando os valores para somar
  var valor = elemento.getAttribute("data-preco-type");
  var total = document.getElementsByClassName("total")[0].innerHTML;
  var totalInt = parseFloat(total); 
  var precoInt = parseFloat(valor);
  var bordarFim = parseFloat(bordaval);
  var pizzaPre = bordarFim + precoInt;
  //somando os valores
  var totalFinal = precoInt + totalInt + bordarFim;
  var precoFormatado = totalFinal.toFixed(2);
  var texto = String(precoFormatado);
  var tipo = elemento.getAttribute("data-piz-type");
  if(localStorage.getItem("itens")=="Nenhum item adicionado."){
      localStorage.setItem("itens","<li><strong>"+produto+"</strong> <br>Preço:R$ "+pizzaPre+" <br> Tipo:"+tipo+"<br>Bordar:"+borda+"<input class='btn-sub' type='button' onClick='sub("+pizzaPre+","+"this"+")'data-num-type='"+i+"' class='item1' value='X'><br/></li><p><p style='display:none'>;</p></p>");
       document.getElementsByClassName("cart")[0].innerHTML = localStorage.getItem("itens");
  }else{
      var itensAntigos = localStorage.getItem("itens");
      localStorage.setItem("itens","<li><strong>"+produto+"</strong> <br>Preço:R$ "+pizzaPre+" <br> Tipo:"+tipo+"<br>Bordar:"+borda+"<input class='btn-sub' type='button' onClick='sub("+pizzaPre+","+"this"+")'data-num-type='"+i+"' class='item1' value='X'><br/></li><p><p style='display:none'>;</p></p>");
        
        var itenAtual = localStorage.getItem("itens");
        var todoItens = itensAntigos +itenAtual;
        document.getElementsByClassName("cart")[0].innerHTML = todoItens;
        localStorage.setItem("itens",todoItens);
  }
  
  document.getElementsByClassName("total")[0].innerHTML = texto;
  localStorage.setItem("total2",texto);
  var preparar = parseFloat(localStorage.getItem("i"));
  var incremento = preparar + 1;
  localStorage.setItem("i",incremento);  
  var itens = localStorage.getItem("itens");
  var resto = itens.split(";");
  var c= 0;
   //reorganizando o vetor 
   while(c < resto.length){      
     var elemento = document.getElementsByClassName("btn-sub")[c].setAttribute("data-num-type",c); 
     c++;
     
  }
}
function prg1(){
    var indice = localStorage.getItem("indice");
    document.getElementsByClassName("sabor")[indice].style.display = "none";
    document.getElementsByClassName("bordas")[indice].style.display = "block";
    
}
function prg2(){
    var indice = localStorage.getItem("indice");
    document.getElementsByClassName("bordas")[indice].style.display = "none";
    document.getElementsByClassName("sabor")[indice].style.display = "block";
}
function sub(preco,i){  
  var total = document.getElementsByClassName("total")[0].innerHTML;
  var totalInt = parseFloat(total);   
  var precoInt = parseFloat(preco);
  var precoTotal = totalInt - precoInt;
  var precoFormatado = precoTotal.toFixed(2);
  localStorage.setItem("total2",String(precoFormatado));
  document.getElementsByClassName("total")[0].innerHTML = String(precoFormatado);    
  //subtrair item do carrinho  
  
  //remove os itens
  var itens = localStorage.getItem("itens"); 
  var cont = i.getAttribute("data-num-type");
  var resto = itens.split(";");   
  resto.splice(cont, 1); 
 
  
  //reorganiza os itens
 
  localStorage.setItem("itens",resto.join(";"));
  document.getElementsByClassName("cart")[0].innerHTML = localStorage.getItem("itens");
  var c = 0;
  var indice = 0;
    
  
 
  
 
 
  var preparar = parseFloat(localStorage.getItem("i"));
  var decremento = preparar - 1;
  localStorage.setItem("i",decremento);  
   if(localStorage.getItem("itens") == ""){
    
      localStorage.setItem("itens","Nenhum item adicionado.");
      document.getElementsByClassName("cart")[0].innerHTML = localStorage.getItem("itens");
     
  }
   
   
  
}
