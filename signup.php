<?php

    header('Access-Control-Allow-Origin: *');  

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hoogabooga"

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
extract($_GET);


$sql = "INSERT INTO user (name, emailID, password)
VALUES ('$name', '$emailID', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>