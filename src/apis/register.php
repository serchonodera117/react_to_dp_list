<?php
Header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$dbname = "";
$username = "";
$password = "";

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

  if ($result->num_rows > 0){
    $response = array(
        "message" => "El usuario $nombre ya existe. :(",
        "status" => 200
    );
    echo json_encode ($response);
}
 else{
     $sql = "INSERT INTO myUser (USERNAME,  user_img, password)
       VALUES ('$nombre',  '$imagenUsuario','$contrasena')";
        if ($conn->query($sql) === TRUE) {
            $response = array(
                "message" => "$nombre, se ha registrado con éxito :D",
                "status" => 200
            );
            echo json_encode($response);
    }
        else {echo '{"error: "' . $sql . ' ' . $conn->error.'"}';}
  }
}
else{echo '{"message":"Campos vacíos", "status":200}';}

$conn->close();
?>