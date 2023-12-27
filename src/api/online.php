<?php
$data_stream = file_get_contents("php://input");
$data_parsed = json_decode($data_stream);

$curl_handle = curl_init($data_parsed->url);
curl_exec($curl_handle);

$return = curl_getinfo($curl_handle);
$http = $return["http_code"];

$r_body = array("httpc"=>$http, "success"=>NULL);

if ($http > 200 && $http < 400 && $http != 0)
  $r_body["success"] = 0;
else
  $r_body["success"] = -1;

echo json_encode($r_body);
return;
?>