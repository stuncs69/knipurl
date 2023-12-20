<?php
require_once "./db.php";
$stream = file_get_contents("php://input");
$return_body = ["shortUrl" => "https://knipurl.nl/gay", "shortAnal" => "https://knipurl.nl/a/gay"];
header("Content-Type: application/json;");

$con = connect();

if ($con == -1) {
  echo json_encode(["ERROR" => "NO DB"]);
  return;
} else {
  echo json_encode($return_body);
}
?>