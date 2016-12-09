<?php
include('../db.php');
$errors = array();
$success = array();
$blog = array();
$data = array();

if(!(empty($_GET['id']))){
	$id = $_GET['id'];

	if(!($query1= mysql_query("select * from blog where blog_id = '$id'")))
	{
		$errors['sql'] = "error is    >". mysql_error()."  qry=   >".$query1;
		$data['errors'] = $errors;
	}else{
		$success['sql'] = 1;
	}

	$data['blog'] = array();
	while($row=mysql_fetch_array($query1))
	{

		$blog['title'] = $row['blog_title']; 
		$blog['blog_id'] = $row['blog_id'];
		$blog['brand'] = $row['brand'];
		$blog['description'] = $row['description'];
		$blog['long_description'] = $row['long_description'];
		$blog['type'] = $row['type'];
		$blog['writer'] = $row['writer'];
		$blog['date'] = $row['date'];
		
		array_push($data['blog'],$blog);
	};
	$data['success'] = $success;
	echo json_encode($data);	
}
else
{
	if(!($query1= mysql_query("select * from blog")))
	{
		$errors['sql'] = "error is    >". mysql_error()."  qry=   >".$query1;
		$data['errors'] = $errors;
	}else{
		$success['sql'] = 1;
	}

	$data['blog'] = array();
	while($row=mysql_fetch_array($query1))
	{

		$blog['title'] = $row['blog_title']; 
		$blog['blog_id'] = $row['blog_id'];
		$blog['brand'] = $row['brand'];
		$blog['description'] = $row['description'];
		$blog['long_description'] = $row['long_description'];
		$blog['type'] = $row['type'];
		$blog['writer'] = $row['writer'];
		$blog['date'] = $row['date'];
		
		array_push($data['blog'],$blog);
	};
	$data['success'] = $success;
	echo json_encode($data);	
}
?>