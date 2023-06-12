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
$data = json_decode(file_get_contents('php://input'), true);
$code=$data['code'];

if($code=="add"){
    $id_usuario = $data['id_usuario'];
    $published_date = $data['current_date'];
    $description = $data['description'];
    $limit_date = $data['limit_date'];
    $task_name = $data['task_name'];

    $sql = "INSERT into  tasks (id_usuario, task_name, description, date_published,limit_date)
        VALUES ('$id_usuario', '$task_name', '$description','$published_date', '$limit_date')";

        if ($conn->query($sql) === TRUE) {
            $response = array(
                "message" => "Nueva tarea asignada - $task_name - con fecha limite $limit_date",
                "status" => 200
            );
         
            echo json_encode($response);
    }
    else{
           $response = array(
                "message" => "' . $sql . ' ' . $conn->error.'",
                "status" => 200
            );
        echo json_encode($response);
    }
}else{
      $response = array(
                "message" => "faltan datos",
                "status" => 200
            );
            echo json_encode($response);
}
$conn->close();
?>