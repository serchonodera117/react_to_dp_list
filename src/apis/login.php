<?php
Header('Access-Control-Allow-Origin: *');
$servername = "";
$dbname = "";
$username = "";
$password = "";

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
    die("Error connecting:" . $conn->connect_error);
}
$nickname = $_GET['nickname'];
$passwd = $_GET['passwd'];

$sqlquery = "SELECT id_user, username, password FROM myUser where username='$nickname' and password='$passwd'";
$result = $conn -> query($sqlquery);

if($result->num_rows<1){
    $response = array(
        "query"=> "no",
        "status"=> 200,
        "userInfo"=> [],
        "message" => "Usuario o contraseña incorrectos",
    );
    echo json_encode($response);
}else{
    $registers = array();
    $i = 0;

    while($row = mysqli_fetch_assoc($result)){
        $registers[$i] = $row;
        $i++;
    }
    $response = array(
        "query"=> 'success',
        "status"=> 200,
        "userdata" => $registers,
        "message" => "Bienvenido $nickname"
    );

    echo json_encode($response);
}

$conn->close();
?>