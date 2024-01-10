<?php

//database variables
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dental_clinic_db";

//database connection 
try {
    $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
    
        // echo json_encode(array("message"=>"Database Connected Successfully!"));
} catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>"connection failed: " . mysqli_connect_error()));
       }

// Checking request method
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);


$id = $input['id'];
$appointment_id = $input['appointment_id'];
$success = false;

try {
    $query = "INSERT INTO treatments(treatment_id, appointment_id) VALUES('$id','$appointment_id')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"treatment successfully recorded"));
}else{
    echo json_encode(array("success"=>$success,"message"=>"request process failed"));
}
}



mysqli_close($conn);
?>