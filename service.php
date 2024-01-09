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
$name = $input['name'];
$serviceDescription = $input['serviceDescription'];
$serviceFee = $input['serviceFee'];

try {
    $insert_query = "INSERT INTO services VALUES('$id','$name','$serviceDescription','$serviceFee')";
    $success = mysqli_query($conn,$insert_query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"service added successfully"));
}else{
    echo json_encode(array("message"=>"request process failed"));
}
}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    try {
        $query = "SELECT * FROM services";
        $result = mysqli_query($conn,$query);
      } catch (mysqli_sql_exception $e) {
        echo json_encode(array("message"=>$e));
      }
    // Sending response 
    if ($result) {
        // echo "services fetched successfully";
        // Initialize an array to hold fetched rows as associative arrays
        $servicesArray = array();
        // Fetch rows and convert each row into an associative array
        while ($row = mysqli_fetch_assoc($result)) {
            $servicesArray[] = $row;
        }
        // Send a response back to JavaScript with fetched data
        echo json_encode($servicesArray);
    }else{
        echo json_encode(array("message"=>"request process failed"));
    }
}



mysqli_close($conn);
?>