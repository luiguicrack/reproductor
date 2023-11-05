<?php
include '../CONTROLLER/lista.php';
include '../CONTROLLER/cancion.php';
require_once '../MODELO/conexion.php';

if(isset($_GET['accion']))
{	$con = new mysqli("localhost", "root", "" ,"BDReproductor");
	$accion=$_GET['accion'];

	if($accion=='registrar')
	{
		$ListaID = $_GET['ListaID'];
		$cantidad=$_GET['CantidadA'];
		

		$i=0;

		if($cantidad=="" || $cantidad==0)
		{
			echo "1";
			return false;
		}
		while ($i <= $cantidad-1)
		{
			$ruta	 = $_FILES['files']['tmp_name'][$i];			
			$titulo  = $_FILES['files']['name'][$i];
			$size  	 = $_FILES['files']['size'][$i];	
			$tamaño = ($size/1024) . " KB";		


			if($titulo=="")
			{ echo "1"; }
			else
			{
		

			$nuevaRuta="../VIEWS/CANCIONES/audio/".$titulo;	

			try{
				move_uploaded_file($ruta, $nuevaRuta);
			
			} catch (Exception $e) {
				echo $e;				
			}	

			$array	= explode('.',$nuevaRuta);
			$ext 	= end($array);

			$cancion = new cancion($titulo, $tamaño, $ListaID);
			$cancion->crearCancion($cancion->titulo, $cancion->size, $cancion->lista);

			}
		
		$i++;	
		}
	}
	if($accion=='mostrar')
	{
		try
		{		$ListaID= $_GET['ListaID'];
				$cancion = new cancion("", "", $ListaID);

				$cancion->lista=$ListaID;
			   	$cancion->CancionesPorLista($ListaID);

		} catch (Exception $e) {
			echo $e;
		}	
	}
	if($accion=='lista')
	{
		try
		{	
				$lista = new lista("","");
			   	$lista->mostrarListas();

		} catch (Exception $e) {
			echo $e;
		}	
	}
	if($accion=='addLista')
	{
		try
		{		$nombre= $_GET['lista'];
				$lista = new lista("",$nombre);
			   	$lista->crearLista($lista->nombre);
			   	$lista->mostrarListas();

		} catch (Exception $e) {
			echo $e;
		}	
	}
	if($accion=='editarIframe')
	{
		try
		{
				$ListaID = $_GET['lista'];
				
				$sql ="UPDATE listaiframe SET LISTA_id= $ListaID WHERE id=1";
				if(mysqli_query($con,$sql))
				{
					echo "1";
				}
				else
				{
					echo "2";
				}

		} catch (Exception $e) {
			echo $e;
		}	
	}
	if($accion=='CanLista')
	{
		$lista = new lista("","");			   	
	   	$lista->mostrarDetallesListas();
	}
	if($accion=='EliminarCancion')
	{
		$id=$_GET['idCancion'];
		$cancion = new cancion("","","");
		$cancion->idCancion=$id;

	   	$cancion->eliminarCancion($cancion->idCancion);
	}

	if($accion=='EditarNombreLista')
	{
		$id=$_GET['idLista'];
		$nombre=$_GET['nombre'];
		$lista = new lista($id,$nombre);

		$lista->ActualizarLista($lista->idLista, $lista->nombre);
		$lista->mostrarDetallesListas();
	}

	if($accion=='EliminarListaConCanciones')
	{
		$id = $_GET['ListaID'];	

		$lista = new lista($id, "");			   	
	   	$lista->EliminarListaConCanciones($id);
	} 
 }
?>