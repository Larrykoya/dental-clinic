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
    // echo json_encode(array("message"=>"connection failed: " . mysqli_connect_error()."<br>"));
       }

// Checking request method
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
 
// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);        $id = $input['id'];
$firstname = $input['firstname'];
$lastname = $input['lastname'];
$phone = $input['phone'];
$address = $input['address'];
$dob = $input['dob'];
$user_role = $input['role'];
$users=$user_role."s";
$user_id = $user_role."_id";
$success = false;

try {
$query = "UPDATE $users SET firstname = '$firstname',lastname='$lastname',address='$address',phone='$phone',dob='$dob' WHERE $user_id = '$id'";
$success = mysqli_query($conn,$query);
} catch (mysqli_sql_exception $e) {
// echo json_encode(array("message"=>$e));

}
// Send a response back to JavaScript
if ($success) {
echo json_encode(array("success"=>$success,"message"=>"profile update successful!"));
}else{
echo json_encode(array("message"=>"profile update failed!"));
}

    }
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){

        // Handle the incoming request from JavaScript
       $input = json_decode(file_get_contents('php://input'), true); 
       $id = $input['id'];
       $user_role = $input['role'];
       $users=$user_role."s";
       $user_id = $user_role."_id";
               try {
                   $query = "SELECT firstname, lastname, email, address, phone, dob  FROM $users WHERE $user_id = '$id'";
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