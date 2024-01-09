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
    echo json_encode(array("message"=>"db connection failed"));
       }

// Checking request method
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);


$report_id = $input['report_id'];
$patient_id = $input['patient_id'];
$employee_id = $input['employee_id'];
$message = $input['message'];
$success = false;

try {
    $query = "INSERT INTO reports(report_id,patient_id,employee_id,message) VALUES('$report_id','$patient_id','$employee_id','$message')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>"sql error"));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"report posted successfully"));
}else{
    echo json_encode(array("message"=>"request process failed"));
}
}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $result = null;
    try {
        $query = "SELECT 
        r.message,
        p.firstname pfname,
        p.lastname plname,
        e.firstname efname,
        e.lastname elname,
        r.date
         FROM 
         reports r
         INNER JOIN 
        patients p ON r.patient_id = p.patient_id
        INNER JOIN 
        employees e ON r.employee_id = e.employee_id";
        $result = mysqli_query($conn,$query);
      } catch (mysqli_sql_exception $e) {
        echo json_encode(array("message"=>$e));
      }
    // Sending response 
    if ($result) {
        $arr = array();
        // Fetch rows and convert each row into an associative array
        while ($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
        // Send a response back to JavaScript with fetched data
        echo json_encode($arr);
    }else{
        echo json_encode(array("message"=>"request process failed"));
    }
}



mysqli_close($conn);
?>