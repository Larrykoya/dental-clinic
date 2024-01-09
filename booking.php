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
$service_id = $input['service_id'];
$patient_id = $input['patient_id'];
$success = false;

try {
    $query = "INSERT INTO bookings(booking_id, service_id, patient_id) VALUES('$id','$service_id','$patient_id')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"you successfully booked this service"));
}else{
    echo json_encode(array("success"=>$success,"message"=>"request process failed"));
}
}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
  $result = null;
    try {
        $query = "SELECT 
        b.booking_id,
        b.date,
        p.email,
        s.service_name
    FROM 
        bookings b
    INNER JOIN 
        patients p ON b.patient_id = p.patient_id
    INNER JOIN 
        services s ON b.service_id = s.service_id";
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
if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    $input = json_decode(file_get_contents('php://input'), true);
    $booking_id = $input['booking_id'];
    $result = null;
    try {
    $query = "SELECT 
        b.service_id,
        p.patient_id,
        p.firstname,
        p.lastname
    FROM 
        bookings b
    INNER JOIN 
        patients p ON b.patient_id = p.patient_id
        WHERE b.booking_id = '$booking_id'";
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