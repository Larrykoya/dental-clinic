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

// Checking request method
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    // Handle the incoming request from JavaScript
    $input = json_decode(file_get_contents('php://input'), true);
    
    
    $id = $input['id'];
    $title = $input['title'];
    $jobDescription = $input['jobDescription'];
    
    try {
        $insert_query = "INSERT INTO roles VALUES('$id','$title','$jobDescription')";
        $success = mysqli_query($conn,$insert_query);
      } catch (mysqli_sql_exception $e) {
        echo ($e);
      }
    // Sending response 
    if ($success) {
        echo "role created successfully";
    }
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET'){}

mysqli_close($conn);
?>