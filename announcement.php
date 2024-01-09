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
$employee_id = $input['employee_id'];
$title = $input['title'];
$message = $input['message'];
$success = false;

try {
    $query = "INSERT INTO announcements VALUES('$id','$employee_id','$title','$message')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"announcement posted successfully"));
}else{
    echo json_encode(array("success"=>$success,"message"=>"request process failed"));
}
}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
  $result = null;
    try {
        $query = "SELECT * FROM announcements";
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