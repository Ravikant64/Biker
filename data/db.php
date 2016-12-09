<?php
	//dbconnect
$database="rider_new"; //database name
$server="localhost";
$username="root";
$password="";
$con = mysql_connect($server,$username,$password);
    if (!$con)
    {
		echo "df".mysql_error();
    die('Could not connect: ' . mysql_error());
    }

if (!mysql_select_db("$database", $con)) {
    echo "Unable to select mydbname: " . mysql_error();
}

?>