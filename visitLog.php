<?php

//database variables
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dental_clinic_db";

//database connection 
try {
    $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
    
        // echo "Database Connected Successfully!";
} catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>"connection failed: " . mysqli_connect_error()));
       }

// Checking request method
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    // Handle the incoming request from JavaScript
    $input = json_decode(file_get_contents('php://input'), true);
    
    
    $id = $input['id'];
    $visitor_id = $input['visitor_id'];
    $patient_id = $input['patient_id'];
    $date = $input['date'];
    $time = $input['time'];
    $success = false;
    
    try {
        $insert_query = "INSERT INTO visit_log VALUES('$id','$visitor_id','$patient_id','$date','$time')";
        $success = mysqli_query($conn,$insert_query);
      } catch (mysqli_sql_exception $e) {
        echo json_encode(array("message"=>$e));
      }
    // Sending response 
    if ($success) {
        echo json_encode(array("message"=>"Your visit has been successfully for. Date: ".$date." Time: ".$time));
    }else{
        echo json_encode(array("message"=>"Unable to schedule your visit"));
    }
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET'){}

mysqli_close($conn);
?>