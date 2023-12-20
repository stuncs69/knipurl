<?php
$stream = file_get_contents("php://input");
$return_body = ["shortUrl" => "https://knipurl.nl/gay", "shortAnal" => "https://knipurl/a/gay"];

header("Content-Type: application/json;");
echo json_encode($return_body);
?>