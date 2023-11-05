<?php
	require_once '../MODELO/conexion.php';
	
	class cancion 
	{	
		var $idCancion;
		var $titulo;
		var $size;
		var $lista;		
			
		public function getIdCancion(){ return $this->idCancion; }
		public function setIdCancion($idCancion){ $this->idCancion = $idCancion; }

		public function getTitulo(){ return $this->titulo; }
		public function setTitulo($titulo){ $this->titulo = $titulo; }

		public function getSize(){ return $this->size; }
		public function setSize($size){ $this->size = $size; }

	    public function getLista(){ return $this->lista; }
	 	public function setLista($lista){ $this->lista = $lista; } 	

		public function __construct($titulo, $size, $lista)
		{				 		
			$this->titulo=$titulo;
			$this->size=$size;
			$this->lista=$lista;
		
		}
		public function crearCancion($titulo, $size, $lista)
		{
			$con = new Conexion();
			$con->Conectar();
				
			$this->titulo=$titulo;			
			$this->lista=$lista;
			$this->size=$size;
		
    		try {
    			 $consulta=$con->conexion->prepare("INSERT INTO CANCION VALUES(NULL, :titulo, :size, :lista)");
	         $consulta->bindValue(':titulo', $this->titulo);
	         $consulta->bindValue(':size', $this->size);
	         $consulta->bindValue(':lista', $this->lista);
	         $consulta->execute();

      	   return true; 
    			
    		} catch (Exception $e) {
    			echo $e;
    		}
	    	
		}	
		public function eliminarCancion($idCancion)
		{
			$con = new Conexion();
			$con->Conectar();
				
			$this->idCancion=$idCancion;			
		
    		try {
    			 $consulta=$con->conexion->prepare("DELETE FROM CANCION WHERE id = $this->idCancion ");
	             $consulta->execute();

      	   return true; 
    			
    		} catch (Exception $e) {
    			echo $e;
    		}
	    	
		}	
		public static function CancionesPorLista($a)
		{	
			$conexion = new Conexion();
		 	$conexion->Conectar();

			$consulta = $conexion->conexion->prepare("SELECT CANCION.id, can_titulo, can_size, LISTA_id FROM CANCION, LISTA WHERE CANCION.LISTA_id = '$a' AND LISTA.id = '$a' AND lista.lis_activa='true' ");
		 	$consulta->execute();		  
			while ($rows = $consulta->fetchAll(\PDO::FETCH_OBJ))
			{
				$tracks = $rows;
			}						

            echo json_encode($tracks);
 	
		}

	}

	
	
?>