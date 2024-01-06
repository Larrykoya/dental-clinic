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
    
    
    $searchKey = $input['searchKey'];
    try {
        $query = "SELECT * FROM patients WHERE email LIKE '%$searchKey%' OR LOWER(firstname) LIKE '%$searchKey%' OR LOWER(lastname) LIKE '%$searchKey%'";
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