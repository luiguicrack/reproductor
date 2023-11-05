$(document).ready(function()
{      
    $(".can").addClass("act");
    $(".lis").removeClass("act");


    cargarListas();
    var list="";
    var CantidadArchivos=0;
    var song;
    var i=0;
   
   $('#Cancion').on('change', function(e){ 
    
       song=e.target.files;
       if(song)
       {
          CantidadArchivos = song.length;
          if(CantidadArchivos>10)
          {
            alert("Error. Has seleccionado mas de 10 canciones");
            return;
          }
          if(CantidadArchivos<1)
          {
            alert("Error. debes seleccionar un archivo audio/mp3 para poder realizar un registro.");
            return;
          }

          $('#Maximo').html("<br>Cantidad de archivos seleccionados: "+ CantidadArchivos);
         
           while(i<song.length)
          {

              list+=  " <div class='col-sm-9' >"+
                        " <div class='btn btn-default' style='width:100%; word-wrap: break-word'><b> "+
                          "<span class='glyphicon glyphicon-music'></span> "+ song[i].name +" | "+ 
                          "<a id='song"+i+"' class='btn btn-danger' style='float:right'>X</a>"+
                        " </b></div>"+                 
                      " </div>";
            i++;
          }

             $('.DivCanciones').html(list+"<br><br><br><hr>");   
              
             i=0;
           list="";
       }
       else
       {
          $('.AlertaE').html(" ");
                  $('.AlertaE').html("<div class='alerta' style='background: #EE7F6F; padding: 0.01%; color: #000'>"+
                                     "<center><h4><div class='glyphicon glyphicon-remove'></div><b> SELECCIONE ALMENOS UN ARCHIVO MP3</b>"+
                                     "</h4></center></div>");
                     setTimeout(function(){$(".AlertaE").fadeOut(1500);},3000);
       }
     
     });


     $("#Registrar").on("submit", function(e){
          e.preventDefault();   
         
          listaID=  $('#Lista').val();        
          accion =  "registrar";
        
          ca=CantidadArchivos;
          var formData = new FormData(document.getElementById("Registrar"));
        
              $.ajax({
                    url: "../../php/EjecutarQuery.php?ListaID="+listaID+"&accion="+accion+"&CantidadA="+ca,
                    type: "POST",
                    dataType: "HTML",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false
              }).done(function(a){

                  if(a==1)
                  {
                      $('.AlertaE').html(" ");
                    $('.AlertaE').html("<div class='alerta' style='background: #EE7F6F; padding: 0.01%; color: #000'>"+
                                     "<center><h4><div class='glyphicon glyphicon-remove'></div><b> NO SE PUDO REGISTRAR </b>"+
                                     "</h4></center></div>");
                     setTimeout(function(){$(".AlertaE").fadeOut(1500);},3000);
                     return false;  
                  }
                          $('#Maximo').html("Seleccione un maximo de 10 Canciones.");
                         $('.DivCanciones').html(" "); 
                         $('.Alerta').html("");
                         $('.Alerta').html("<div class='alerta' style='background: #0AC847; padding: 0.01%; color: #555'>"+
                             "<center><h4><div class='glyphicon glyphicon-ok'></div><b> REGISTRADO CON EXITO </b>"+
                             "</h4></center></div>");
                         setTimeout(function(){$(".Alerta").fadeOut(1500);},3000);
                         list="";
                          CantidadArchivos=0;
                          song="";
                        
              }).fail(function(d){   
                  alert(d);               
                  $('.AlertaE').html(" ");
                  $('.AlertaE').html("<div class='alerta' style='background: #EE7F6F; padding: 0.01%; color: #000'>"+
                                     "<center><h4><div class='glyphicon glyphicon-remove'></div><b> NO SE PUDO REGISTRAR </b>"+
                                     "</h4></center></div>");
                     setTimeout(function(){$(".AlertaE").fadeOut(1500);},3000);
              });
    });
    $('#GuardarLista').click(function(){

          accion="addLista";
          var lista=$('#nombreLista').val();

          if(lista==""){
            alert("Ingrese lista");
            return;
          }

           $.ajax({
                    url: "../../php/EjecutarQuery.php?accion="+accion+"&lista="+lista,
                    type: "POST",
                    dataType: "HTML",
                    data: "",
                    cache: false,
                    contentType: false,
                    processData: false
              }).done(function(a){

                  alert("LISTA REGISTRADA EXITOSAMENTE");

                 $('#Lista').html(a);
                 $('#iframe').html(a);                     
                 $('#nombreLista').val("");

                   cargarListas();

              }).fail(function(a){                  
                 alert(a);
              });
      $('#addLista').modal('toggle');
    });

    $('#Establecer').click(function(){

      var idIframe = $('#filtroLista').val();
      if(idIframe)
      {
        var codigo="<iframe src='iframe.php?id="+idIframe+"'></iframe>";
        alert("CODIGO: "+codigo);
         //   $('.CODIGO').html(codigo);
        // window.location="iframe.php?id="+idIframe;
      }
      else
      {
        alert("SELECCIONE UNA LISTA DE REPRODUCCION");
      }
     

    });

    function limpiar()
     {
       $('.Alerta').html(" ");
     }

    $("#Cancelar").click(function()
      {
            $('#Artista').val("");
            $('#Album option').attr("selected","0");
            $('#Cancion').val("");
            $('#nombreCancion').html("No hay archivo seleccionado");
            $('.DivCanciones').html("");
            $('#Maximo').html("<br>Seleccione un maximo de 10 canciones");
      });
   

      $('#filtroLista').change(function(){
   
       var idLista = $('#filtroLista').val();
         $('#plList').html("");

        var accion ="mostrar";

        $.ajax({
        url:"../../php/EjecutarQuery.php?accion="+accion+"&ListaID="+idLista,
        type:"post",
        dataType: "HTML",
        cache: false,
        processData: false,
          success:function(dato)
          {  
              Dato=JSON.parse(dato);

             jQuery(function($)
             {
                  'use strict'
                
                  var supportsAudio = !!document.createElement('audio').canPlayType;
                  if (supportsAudio)
                  {
                      var index = 0,
                          playing = false,
                          mediaPath = '../CANCIONES/audio/',
                          extension = '',
                          tracks = Dato,
                          cont=1,
                          buildPlaylist = $.each(tracks, function(key, value)
                          {     
                             
                              var trackNumber = cont,
                                  trackName = value.can_titulo,
                                  trackLength = '00:00';
                             
                              if (trackNumber.toString().length === 1) {
                                  trackNumber = '0' + trackNumber;
                              } else {
                                  trackNumber = '' + trackNumber;
                              }


                              $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName  +  '</div><div class="plLength"></div></div></li>');
                               cont++;
                          }),
                       
                          trackCount = tracks.length,
                          npAction = $('.info'),
                          npTitle = $('#npTitle'),
                          audio = $('#audio1').bind('play', function()
                          {
                               
                              playing = true;
                              npAction.text('Now Playing...');
                          }).bind('pause', function()
                          {
                              playing = false;
                              npAction.text('Paused...');
                          }).bind('ended', function()
                          {
                              npAction.text('Paused...');
                              if ((index + 1) < trackCount) {
                                  index++;
                                  loadTrack(index);
                                  audio.play();
                              } else {
                                  audio.pause();
                                  index = 0;
                                  loadTrack(index);
                              }
                          }).get(0),
                          btnPrev = $('#btnPrev').click(function()
                          {
                              if ((index - 1) > -1) {
                                  index--;
                                  loadTrack(index);
                                  if (playing) {
                                      audio.play();
                                  }
                              } else {
                                  audio.pause();
                                  index = 0;
                                  loadTrack(index);
                              }
                          }),
                          btnNext = $('#btnNext').click(function()
                          {
                              if ((index + 1) < trackCount) {
                                  index++;
                                  loadTrack(index);
                                  if (playing) {
                                      audio.play();
                                  }
                              } else {
                                  audio.pause();
                                  index = 0;
                                  loadTrack(index);
                              }
                          }),
                          li = $('#plList li').click(function()
                          {
                              var id = parseInt($(this).index());
                              if (id !== index) {
                                  playTrack(id);
                              }
                          }),
                          loadTrack = function(id)
                          {
                              $('.plSel').removeClass('plSel');
                              $('#plList li:eq(' + id + ')').addClass('plSel');
                              npTitle.text(tracks[id].can_titulo);
                              index = id;
                              audio.src = mediaPath + tracks[id].can_titulo ;
                          },
                          playTrack = function (id) {

                              loadTrack(id);
                              audio.play();
                          };
                       
                      extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
                      loadTrack(index);
                  }
             });
          }

          });
           
      });

  
    function cargarListas()
    {
        var accion ="lista";

        $.ajax({
            url: "../../php/EjecutarQuery.php?accion="+accion,
            type: "POST",
            success:function(dato)
            {  
             
              rows = JSON.parse(dato);      
                     
              var cont="";
              var i=0;
              cont+="<option value=''>.::SELECCIONAR LISTA::.</option>";
              while(i<rows.length)
              {
                  cont+="<option value='"+rows[i].id+"'>"+rows[i].lis_nombre + " </option>";
                  i++;
              }

              $('#Lista').html(cont);
              $('#filtroLista').html(cont);
              $('#iframe').html(cont);
            }
        });
    }

 /*  function archivo(e)
   {    
                  var files = e.target.files;
                  for (var i = 0, f; f = files[i]; i++) {
                    //Solo admitimos imágenes.
                    if (!f.type.match('audio.*')) {
                        continue;
                    }
                    var reader = new FileReader();             
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         document.getElementById("nombreCancion").innerHTML = ['<label><b>',escape(theFile.name),'</b></label>'].join('');
                        };
                    })(f);
             
                    reader.readAsDataURL(f);
                  }
   }

   document.getElementById('Cancion').addEventListener('change', archivo, false);
*/
});






//initialize plyr

