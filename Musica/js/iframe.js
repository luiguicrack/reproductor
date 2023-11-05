$(document).ready(function(){
        var id =$('#idHidden').val();
       
           var accion ="mostrar"; 
           var idLista=id;
          
               $('#plList').html("");
               
                $.ajax({
                url:"../../php/EjecutarQuery.php?accion="+accion+"&ListaID="+idLista,
                type:"post",

                  success:function(dato)
                  {            
                    DATO=JSON.parse(dato);
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
                                  tracks = DATO,
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


                                      $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName  +  '</div><div class="plLength">' + trackLength + '</div></div></li>');
                                     cont +=1;
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