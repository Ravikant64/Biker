<?php 
$_POST = json_decode(file_get_contents('php://input'),true);
$errors = array();
$data = array();

if (empty($_POST['name']))
  $errors['name'] = 'Name is required.';

if (empty($_POST['password']))
  $errors['password'] = 'Username is required.';

if (empty($_POST['email']))
  $errors['email'] = 'Email is required.';

if (empty($_POST['birthDate']))
  $errors['birthDate'] = 'birthDate is required.';

if (!empty($errors)) {
  $data['errors']  = $errors;
} else {
  $data['message'] = 'Form data is going well';
}

echo json_encode($data);
?>