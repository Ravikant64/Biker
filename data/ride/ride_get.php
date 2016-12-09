<?php
//$_GET = json_decode(file_get_contents('php://input'),true);
include('db.php');
$errors = array();
$success = array();
$ride = array();
$data = array();
//print_r($_GET);
if(!empty($_GET['id'])){
	$ride_id = $_GET['id'];

	if(!($query1= mysql_query("select * from ride_master where ride_id = '$ride_id'")))
	{
		$errors['sql'] = "error is    >". mysql_error()."  qry=   >".$query1;
		$data['errors'] = $errors;
	}else{
		$success['sql'] = 1;
	}

	$data['ride'] = array();
	while($row=mysql_fetch_array($query1))
	{

		$ride['name'] = $row['ride_name']; 
		$ride['id'] = $row['ride_id'];
		$ride['brand'] = $row['ride_brand'];
		$ride['location'] = $row['ride_location'];
		$ride['from'] = $row['ride_from'];
		$ride['to'] = $row['ride_to'];
		$ride['start'] = $row['ride_start'];
		$ride['end'] = $row['ride_end'];
		$ride['descipt'] = $row['ride_description'];
		$ride['owner'] = $row['ride_owner_id'];
		$ride['type'] = $row['type'];
		array_push($data['ride'],$ride);
	};
	
	$data['success'] = $success;
	echo json_encode($data);	
}
else
{
	if(!($query1= mysql_query("select * from ride_master")))
	{
		$errors['sql'] = "error is    >". mysql_error()."  qry=   >".$query1;
		$data['errors'] = $errors;
	}else{
		$success['sql'] = 1;
	}

	$data['ride'] = array();
	while($row=mysql_fetch_array($query1))
	{

		$ride['name'] = $row['ride_name']; 
		$ride['id'] = $row['ride_id'];
		$ride['brand'] = $row['ride_brand'];
		$ride['location'] = $row['ride_location'];
		$ride['from'] = $row['ride_from'];
		$ride['to'] = $row['ride_to'];
		$ride['start'] = $row['ride_start'];
		$ride['end'] = $row['ride_end'];
		$ride['descipt'] = $row['ride_description'];
		$ride['owner'] = $row['ride_owner_id'];
		$ride['type'] = $row['type'];
		array_push($data['ride'],$ride);
	};
	$data['success'] = $success;
	echo json_encode($data);	
}
?>