<?php


//database variables
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dental_clinic_db";

//database connection 
try {
    $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
    
        echo "Database Connected Successfully!";
} catch (mysqli_sql_exception $e) {
    echo("connection failed: " . mysqli_connect_error()."<br>");
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
      $users=$input['role']."s";
      $user_id = $input['role']."_id";
      $success = null;

try {
    $insert_query = "INSERT INTO $users($user_id,firstname,lastname,email,phone,password,gender) VALUES('$id','$firstname','$lastname','$email','$phone','$password','$gender')";
    $success = mysqli_query($conn,$insert_query);
  } catch (mysqli_sql_exception $e) {
    echo ($e);
    //checking for duplicate username error
    // $duplicate = stristr($e,"Duplicate");
  }
// Send a response back to JavaScript
if ($success) {
    echo "user created successfully";
}
// echo json_encode($response);

mysqli_close($conn);
?>