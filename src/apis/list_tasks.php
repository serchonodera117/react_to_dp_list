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
$id_user = $_GET['id_user'];
$passwd = $_GET['passwd'];

$sqlquery = "SELECT id_task, id_usuario, task_name, description, date_published, limit_date password FROM tasks where id_usuario='$id_user'";
$result = $conn -> query($sqlquery);

if($result->num_rows<1){
    $response = array(
        "query"=> "no",
        "status"=> 200,
        "tasks"=> [],
        "message" => "At the momment there's no tasks U w u",
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
        "tasks" => $registers,
        "message" => "You have $i+1 tasks"
    );

    echo json_encode($response);
}

$conn->close();
?>