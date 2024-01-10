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
$service_id = $input['service_id'];
$date = $input['date'];
$time = $input['time'];
$employee_id = $input['employee_id'];
$patient_id = $input['patient_id'];
$success=false;

try {
    $query = "INSERT INTO appointments VALUES('$id','$service_id','$date','$time','$patient_id','$employee_id')";
    $success = mysqli_query($conn,$query);
  } catch (mysqli_sql_exception $e) {
    echo json_encode(array("message"=>$e));
  }
// Sending response 
if ($success) {
    echo json_encode(array("success"=>$success,"message"=>"Appointment has been set successfully"));
}else{
    echo json_encode(array("message"=>"request process failed"));
}
}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $result = null;
    try {
        $query = "SELECT 
        a.appointment_id id,
        p.firstname pfname,
        p.lastname plname,
        e.firstname efname,
        e.lastname elname,
        a.date,
        a.time
         FROM 
         appointments a
         INNER JOIN 
        patients p ON a.patient_id = p.patient_id
        INNER JOIN 
        employees e ON a.employee_id = e.employee_id";
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
    // Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'];
$success = false;

try {
$query = "DELETE FROM appointments WHERE appointment_id = '$id'";
$success = mysqli_query($conn,$query);
} catch (mysqli_sql_exception $e) {
echo json_encode(array("message"=>$e));

}
// Send a response back to JavaScript
if ($success) {
echo json_encode(array("success"=>$success,"message"=>"Appointment canceled"));
}else{
echo json_encode(array("success"=>$success,"message"=>"Error occoured"));
}
}

mysqli_close($conn);
?>