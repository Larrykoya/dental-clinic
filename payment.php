<?php

//database variables
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dental_clinic_db";

//database connection 
try {
    $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
} catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>"connection failed: " . mysqli_connect_error()));
       }

// Checking request method
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);


$id = $input['id'];
$patient_id = $input['patient_id'];
$details = $input['details'];
$amount = $input['amount'];
$method = $input['method'];
$success = null;

try {
    $query = "INSERT INTO payments(payment_id,patient_id,amount,details,payment_method) VALUES('$id','$patient_id', '$amount','$details','$method')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"payment successful"));
}else{
    echo json_encode(array("message"=>"request process failed"));
}
}
mysqli_close($conn);
?>