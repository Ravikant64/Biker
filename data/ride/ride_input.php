<?php 
$_POST = json_decode(file_get_contents('php://input'),true);
$errors = array();
$data = array();

$name = $_POST["name"];
$location = $_POST["location"];
$from = $_POST["from"];
$to = $_POST["to"];
$start = $_POST["start"];
$end = $_POST["end"];
$descript = $_POST["descript"];
$owner = $_POST["owner"];
$type = $_POST["type"];
$type = $_POST["brand"];

$query = "INSERT INTO ride_master ('ride_name','ride_location','ride_from','ride_to','ride_start''ride_end','ride_description','ride_owner_id','ride_type',) VALUES('$name','$location','$from','$to','$start','$end','$descript','$owner','$type')";
if(!mysql_query($query))
{
		echo  " qry=   >".$query;
	die('Could not connect:        >' . mysql_error());
}



// if (empty($_POST['name']))
//   $errors['name'] = 'Name is required.';
// if (empty($_POST['password']))
//   $errors['password'] = 'Username is required.';
// if (empty($_POST['email']))
//   $errors['email'] = 'Email is required.';
// if (empty($_POST['birthDate']))
//   $errors['birthDate'] = 'birthDate is required.';
// if (!empty($errors)) {
//   $data['errors']  = $errors;
// } else {
//   $data['message'] = 'Form data is going well';
// }

echo json_encode($data);
?>