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
    echo("connection failed: " . mysqli_connect_error()."<br>");
       }

// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);

      $email = $input['email'];
      $given_password = $input['password'];
      $user_role = $input['role'];
      $users=$user_role."s";
      $user_id = $user_role."_id";
      $correct_password = false;
      $result = null;
      $success = null;

try {
  $select_query = "SELECT $user_id, `password`  FROM $users WHERE email = '$email'";
  $result = mysqli_query($conn,$select_query);
  if (mysqli_num_rows($result) > 0) {
    
    $row = mysqli_fetch_assoc($result);
      $_id = $row["$user_id"];
      $password = $row["password"];
      //an account with the give credentials was found
      $account_exist = true;
    
      //checking for correct password
      if ($given_password == $password){
        $correct_password = true;
        echo "login successful!";
      }else{
        $response = "Incorrect credentials! please check login details and try again";
      }
  } else {
    $response = "You do not have an account, you need to create an account!";
  }
  } catch (mysqli_sql_exception $e) {
    echo ($e);
  }
// Send a response back to JavaScript
if ($success) {
    echo "user created successfully";
}
// echo json_encode($response);

mysqli_close($conn);
?>