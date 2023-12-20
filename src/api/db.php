<?php
function connect()
{
  $svr_name = "localhost";
  $unam = "dev";
  #wattafeak
  $pasw = "dev";
  try {
    $con = new PDO("mysql:host=$svr_name;dbname=knipurl", $unam, $pasw);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    $con = -1;
  } finally {
    return $con;
  }
}
?>