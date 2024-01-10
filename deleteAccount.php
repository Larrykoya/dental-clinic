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
    echo json_encode(array("message"=>"connection failed: " . mysqli_connect_error()."<br>"));
       }

// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);
      $id = $input['id'];
      $user_role = $input['role'];
      $users=$user_role."s";
      $user_id = $user_role."_id";
      $success = false;

try {
    $query = "DELETE FROM $users WHERE $user_id = '$id'";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));

  }
// Send a response back to JavaScript
if ($success) {
  echo json_encode(array("success"=>$success,"message"=>"Account deletion successful!"));
}else{
  echo json_encode(array("success"=>$success,"message"=>"Error occoured"));
}

mysqli_close($conn);
?>