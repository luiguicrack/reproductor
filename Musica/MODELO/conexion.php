<?php 

/**
* 
*/
class Conexion
{
    var $conexion;  
    var $error;

    function Conectar()
    {
      try
      {
    $this->conexion = new PDO('mysql:host=localhost;dbname=BDReproductor','root','');
        
      } catch (PDOException $e)
      {
         $this->error = $e->getMessage();
      }  
        return $this->conexion;
    }
 
}


   
  
      //Sobreescribo el método constructor de la clase PDO.
  
 

?>