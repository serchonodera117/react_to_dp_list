<?php
Header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$dbname = "id19982650_todo_list";
$username = "id19982650_serch";
$password = "Sergio_117";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$datos=json_decode(file_get_contents('php://input'),true);
$nombre= $datos['userName'];
$contrasena=$datos['password'];
$imagenUsuario=$datos['imgURL'];


if($nombre!='' && $contrasena!='' && $imagenUsuario!=''){
  $sqlVerification = "SELECT * FROM myUser WHERE username='$nombre'";//---consulta
  $result = $conn->query($sqlVerification);

 if ($result->num_rows > 0){echo "El nombre $nombre ya existe.";}
 else{
     $sql = "INSERT INTO myUser (USERNAME,  user_img, password)
       VALUES ('$nombre',  '$imagenUsuario','$contrasena')";
        if ($conn->query($sql) === TRUE) {echo "$nombre, se ha registrado con éxito :D";}
        else {echo '{"error: "' . $sql . ' ' . $conn->error.'"}';}
  }
}
else{echo "Campos vacíos";}

$conn->close();
?>