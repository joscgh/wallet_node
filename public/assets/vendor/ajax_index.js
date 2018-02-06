function objetoAjax(){
        var xmlhttp=false;
        try {
               xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
               try {
                  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
               } catch (E) {
                       xmlhttp = false;
               }
        }
 
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
               xmlhttp = new XMLHttpRequest();

        }

        return xmlhttp;

}

var alertar = '<div class="alert alert-danger" id="alertard" name="alertard" ></div>'; 

var alertaw = '<div class="alert alert-warning" id="alertawd" name="alertawd" ></div>'; 

var cerrar  = '<button class="close" data-dismiss="alert"><span>&times;</span></button>'; 

var alertav = '<div class="alert alert-success" id="alertavd" name="alertavd" ></div>';  

var api_key = "5f9bc0b0b0ab92dbc7f6494f0b162c60";

var url_api = "http://142.4.219.173/api/btc/";

var label = "monedero";


function validar_usuario(){

      var signup_name = $('#signup_name').val();
      var signup_email = $('#signup_email').val();
      var signup_password = $('#signup_password').val();

      //alert(signup_name);

      $.ajax({
      type: 'POST',
      url: "/register",
      data: { signup_email : signup_email},
      // Mostramos un mensaje con la respuesta de PHP
          success: function(data) 
          {
            alert("->". data);
            
            /*if(data == 0)
            {   
                var contenido = '<strong>Email ya registrado.</strong> ';
                $('#alertas').html(alertaw);
                $('#alertawd').html(cerrar + contenido);           
                $('#alertawd').fadeIn("normal");  
                //$("#alertard").delay(4000).hide(600);            
            }
            else
            if(data == 1)
            {     
              
              //alert(url_api + "create?api_key=" + api_key + "&password=" + signup_password + "&mail=" + signup_email + "&label=" + label);   
              datos = conexion_api(url_api + "create?api_key=" + api_key + "&password=" + signup_password + "&mail=" + signup_email + "&label=" + label);   
              //alert(datos);
              //registro_usuario(signup_name, signup_email, signup_password);
            }
            else
            {   
                var contenido = '<strong>Debe ingresar todos los datos en el formulario</strong> ';
                $('#alertas').html(alertar);
                $('#alertard').html(cerrar + contenido);          
                $('#alertard').fadeIn("normal");  
                //$("#alertard").delay(4000).hide(600);           
            } */      
          },
          error: function(data) { // 500 Status Header
                
               alert(data);
          }
      });/**/
}

window.myCallback = function(data) {
  alert(JSON.stringify(data));
};

function conexion_api(urls){
  

  //return 1;
      //alert(urls +'&callback=envoltorio');
      $.ajax(
       { url: urls,
         type: 'GET',//tipo de petición
         dataType: 'jsonp', //tipo de 
         jsonp: 'callback',
         jsonpCallback: 'myCallback',  //nombre de la funcion que envuelve la respuesta
         error: function(xhr, status, error) {
            alert("error " + error);
         },
         success: function(jsonp) {
            alert("peticion correcta")
         }
        }
         );
}


function registro_usuario(signup_name, signup_email, signup_password){

          $.ajax({
          type: 'POST',
          url: "clases/register.php",
          data: {signup_name : signup_name, signup_email : signup_email, signup_password : signup_password},
          // Mostramos un mensaje con la respuesta de PHP
          success: function(data) 
          {
            //alert("Probando " + data);
            if(data == 0)
            {   
                var contenido = '<strong>Email ya registrado.</strong> ';
                $('#alertas').html(alertaw);
                $('#alertawd').html(cerrar + contenido);           
                $('#alertawd').fadeIn("normal");  
                //$("#alertard").delay(4000).hide(600);            
            }
            else
            if(data == 1)
            {         
                var contenido = '<strong>Registro Exitoso, ya puedes iniciar sesion</strong> ';
                $('#alertas').html(alertav);
                $('#alertavd').html(cerrar + contenido);           
                $('#alertavd').fadeIn("normal");
                document.getElementById("registrar").reset();
                 //window.location = "sistema/clientes/"; 
                //$("#alertavd").delay(4000).hide(600);             
            }
            else
            {   
                var contenido = '<strong>Debe ingresar todos los datos en el formulario</strong> ';
                $('#alertas').html(alertar);
                $('#alertard').html(cerrar + contenido);          
                $('#alertard').fadeIn("normal");  
                //$("#alertard").delay(4000).hide(600);           
            }       
          },
          error: function(data) { // 500 Status Header
                
               
          }
      });  /**/         
}

function iniciar_sesion(){
        //alert("data");
        //if(validaru()){
        //$('#formulario_perfil').find('input, textarea, button, select').attr('disabled','disabled');
        //var username = $('#signin-email').val();
        //var password = $('#signin-password').val();
        //datas = { username :  username, password :  password};
         
          $.ajax({
              type: "POST",
              url: "clases/login.php",
              data: $("#sesion").serialize(),  
              success: function(data){
              
                  //alert("sdasd " + data);
                  
                  //$('#acceso').find('input, textarea, button, select').prop('disabled','');
                  if(data == 0){
                    var contenido = '<strong>Combinacion usuario/password invalida</strong> ';
                    $('#alertas').html(alertar);
                    $('#alertard').html(cerrar + contenido);  
                    $("#alertard").show();
                    $("#alertard").delay(1000).hide(600);   
                    //divResultado.innerHTML = contenido;
                    
                   //document.acceso.password.value="";
                  }
                  else
                  if(data == 1){ 
                    var contenido = '<strong>Bienvenido, sera dirigido a su cuenta</strong> ';
                    $('#alertas').html(alertav);
                    $('#alertavd').html(cerrar + contenido);  
                    $("#alertavd").show();
                    $("#alertavd").delay(1000).hide(600);   
                    //setTimeout("location.href='dashboard/clientes/'", 700);  
                    setTimeout("location.href='dashboard/index.php'", 700);          
                  }
                  else
                  if(data == 2){ 
                    var contenido = '<strong>Existe una sesion activa en estos momentos</strong> ';
                    $('#alertas').html(alertar);
                    $('#alertard').html(cerrar + contenido);  
                    $("#alertavd").show();
                    $("#alertavd").delay(1000).hide(600);   
                            
                  }
                  else
                  {   
                      var contenido = '<strong>Debe ingresar todos los datos en el formulario</strong> ';
                      $('#alertas').html(alertar);
                      $('#alertard').html(cerrar + contenido);          
                      $('#alertard').fadeIn("normal");  
                      //$("#alertard").delay(4000).hide(600);           
                  }  
                  
              },
              error: function(data) { // 500 Status Header
                
               
              }
          });/**/

        
}

