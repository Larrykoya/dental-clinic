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
  // echo json_encode(array("message"=>"connection failed: ".mysqli_connect_error()));
}

// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);

      $email = $input['email'];
      $given_password = $input['password'];
      $user_role = $input['role'];
      $users=$user_role."s";
      $user_id = $user_role."_id";
      $correct_password = false;
      $account_exist=false;
      $result = null;

try {
  $query = "SELECT $user_id, `password`  FROM $users WHERE email = '$email'";
  $result = mysqli_query($conn,$query);
  if (mysqli_num_rows($result) > 0) {
    
    $row = mysqli_fetch_assoc($result);
      $_id = $row["$user_id"];
      $password = $row["password"];
      //an account with the give credentials was found
      $account_exist = true;
    
      //checking for correct password
      if ($given_password == $password){
        $correct_password = true;
      }else{
        $response = "Incorrect credentials! please check login details and try again";
      }
  } else {
    $response = "You do not have an account, you need to create an account!";
  }
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
  if ($account_exist) {
    if ($correct_password) {
      echo json_encode(array("message"=>"login successful!", "user_id"=>$_id, "user_role"=>$user_role));
    }else{
      echo json_encode(array("message"=>$response));
    }
  }else{
    echo json_encode(array("message"=>$response));
    }

// echo json_encode($response);

mysqli_close($conn);
?>