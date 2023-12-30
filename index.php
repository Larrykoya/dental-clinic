<?php
// Handle the incoming request from JavaScript
$input = json_decode(file_get_contents('php://input'), true); // Get the input data

// Process the request, perform any operations needed

// Send a response back to JavaScript
$response = array( "data" => 'hello form the other side');
echo json_encode($response);
?>