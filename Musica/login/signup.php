<?php

  require 'database.php';

  $message = '';

  if (!empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['confirm_password'])) {
    if ($_POST['password'] == $_POST['confirm_password']) {
      $sql = "INSERT INTO users (email, password) VALUES (:email, :password)";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':email', $_POST['email']);
      $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
      $stmt->bindParam(':password', $password);

      if ($stmt->execute()) {
        $message = 'Usuario registrado correctamente';
      } else {
        $message = 'Lo sentimos, debe haber habido un problema al crear tu cuenta';
      }
    } else {
      $message = 'Las contraseñas no coinciden';
    }
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Registro</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
  </head>
  <body>

    <?php require 'partials/header.php' ?>

    <?php if(!empty($message)): ?>
      <p> <?= $message ?></p>
    <?php endif; ?>

    <h1>Registro</h1>
    <span>o <a href="login.php">Login</a></span>

    <form action="signup.php" method="POST">
      <input name="email" type="text" placeholder="Digitar email">
      <input name="password" type="password" placeholder="Digitar contraseña">
      <input name="confirm_password" type="password" placeholder="Confirmar contraseña">
      <input type="submit" value="Registrar">
    </form>

  </body>
</html>
