<br>
<br>
<br>
<br>
<br>

<form accept-charset="utf-8"  id="Registrar" method="POST" enctype="multipart/form-data">
  <div class="jumbotron">
  <div class="form-group center  ">
    <label class="btn btn-warning btn-file btn-block glyphicon glyphicon-folder-open "> | <b><span class="font">SUBIR CANCIONES</span> </b>
    <input type="file" multiple name="files[]" accept="audio/*" id="Cancion" style="display: none;">
    </label>
    <span class="text-muted " id="Maximo"><br>Seleccione un maximo  de 10 canciones.</span>         
  </div>       
  <div class="form-group  form-inline">
    <label class="" for="Lista">LISTAS</label><br>
    <select name="Lista" id="Lista" class="form-control" value=""></select>
    <div class="btn btn-primary btn-sm  form-control" data-toggle="modal" data-target="#addLista"><b> <span class="font">+ AÑADIR</span></b></div><br><br><br><br><br>
  </div>
  <hr/>      
  <div class="row">       
     <div class="form-group">    
       <center>
        <button class="btn btn-success btn-sm  glyphicon glyphicon-floppy-saved" type="submit" id="btnRegistrar">
          <b><span class="font">REGISTRAR</span></b>
        </button>
       <div class="btn btn-danger btn-sm  glyphicon glyphicon-floppy-remove" id="Cancelar"> <b><span class="font">CANCELAR</span></b>
       </div>
       </center> 
     </div>      
  </div>   
</div>
<br>

  <div class="AlertaE"></div>
  <div class="Alerta"></div>
 
</form>  
