<?php
$data_stream = file_get_contents("php://input");
$data_parsed = json_decode($data_stream);

$curl_handle = curl_init($data_parsed->url);
curl_setopt($curl_handle, CURLOPT_NOBODY, true);
curl_exec($curl_handle);

$http = curl_getinfo($curl_handle, CURLINFO_HTTP_CODE);

$r_body = array("httpc"=>$http, "success"=>NULL);

if ($http >= 200 && $http < 400 && $http != 0)
  $r_body["success"] = 0;
else
  $r_body["success"] = -1;

echo json_encode($r_body);
return;
?>