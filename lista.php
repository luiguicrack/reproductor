<?php
	require_once '../MODELO/conexion.php';
	
	class lista
	{
		var $idLista;
		var $nombre;
		var $activa;

		public function getNombre(){ return $this->nombre; }
		public function setNombre($nombre){ $this->nombre = $nombre; }

		public function __construct($idLista, $nombre)
		{	
			$this->idLista=$idLista;			 			
			$this->nombre=$nombre;		
		}
		public function crearLista($nombre)
		{
			$con = new Conexion();
			$con->Conectar();
			$activa="true";


			$this->nombre=$nombre;		
			$this->activa=$activa;
			 
			$query="INSERT INTO LISTA VALUES(NULL, :nombre, :activa)";
	    	$consulta=$con->conexion->prepare($query);
	        $consulta->bindValue(':nombre', $this->nombre);	
	        $consulta->bindValue(':activa', $this->activa);	
	        $consulta->execute();
	         //$this->id = $con->lastInsertId();	      
	  	   return true; 
		}	
		public static function ActualizarLista($idLista, $nombre)
		{
			$conexion = new Conexion();
		 	$conexion->Conectar();
	
		    $consulta = $conexion->conexion->prepare("UPDATE lista SET lis_nombre='$nombre' WHERE id = '$idLista' ");
		 	if($consulta->execute())
		 	{
		 		echo "1";
		 		return;
		 	}
		 
			
		}
		public static function mostrarListas()
		{
			$conexion = new Conexion();
		 	$conexion->Conectar();
			$true="true";
		    $consulta = $conexion->conexion->prepare("SELECT * FROM Lista WHERE lis_activa='$true'");
		 	$consulta->execute();	

			$rows = $consulta->fetchAll(\PDO::FETCH_OBJ);
			echo json_encode($rows);	  
			
		}
		public static function mostrarDetallesListas()
		{
			$conexion = new Conexion();
			$conexion->Conectar();
			$sql="SELECT lista.id, lis_nombre, (select count(*)  FROM cancion where cancion.LISTA_id = lista.id And lista.id = cancion.LISTA_ID)  AS cantcanciones  FROM lista WHERE lis_activa='true' Group by  lista.lis_nombre ";

		    $consulta = $conexion->conexion->prepare($sql);
		 	$consulta->execute();

	        $lista = $consulta->fetchAll(\PDO::FETCH_OBJ);   
	        echo json_encode($lista);	
	  
		}
		public static function EliminarListaConCanciones($idLista)
		{
			$conexion = new Conexion();
			$conexion->Conectar();
			$sql="UPDATE lista SET lis_activa='false' WHERE id = '$idLista' ";

		    $consulta = $conexion->conexion->prepare($sql);
		 	if($consulta->execute())
		 	{
		 		echo "1";
		 	}else
		 	{
		 		echo "2";
		 	}	   
	  
		}
		
		
	
	}

	
	
?>
