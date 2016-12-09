<?php 
include('../db.php');
$_POST = json_decode(file_get_contents('php://input'),true);
$errors = array();
$data = array();

$fname = $_POST['fname'];
$lname = $_POST['fname'];	
$password = $_POST['password'];
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$mo_no = $_POST['contact'];
$gender = $_POST['gender'];
// $pic_url = $_POST['pic_url'];
$name = $fname.' '.$lname;

$query = "INSERT INTO user_master (user_name,password,name,email,address,gender,phone_no) VALUES('$name','$password','$name','$email','$address','$gender','$mo_no')";
echo $query;
if(mysql_query($query))
{
	$data['success']=1;
	$data['message']='You Are Signed UP Successfully';
}else
{
	$data['errors']='Somethhing went wrong'.mysql_error();
}


echo json_encode($data);
?>