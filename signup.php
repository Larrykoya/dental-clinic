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

// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);
      $id = $input['id'];
      $firstname = $input['firstname'];
      $lastname = $input['lastname'];
      $email = $input['email'];
      $phone = $input['phone'];
      $password = $input['password'];
      $gender = $input['gender'];
      $user_role = $input['role'];
      $users=$user_role."s";
      $user_id = $user_role."_id";
      $success = false;

try {
    $query = "INSERT INTO $users($user_id,firstname,lastname,email,phone,password,gender) VALUES('$id','$firstname','$lastname','$email','$phone','$password','$gender')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));

  }
// Send a response back to JavaScript
if ($success) {
  echo json_encode(array("success"=>$success,"message"=>"signup successful!", "user_id"=>$id, "user_role"=>$user_role));
}else{
  echo json_encode(array("success"=>$success,"message"=>"signup failed!"));
}

mysqli_close($conn);
?>