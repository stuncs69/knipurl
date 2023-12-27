<?php

function generate_name($n)
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $new = "";

  for ($i = 0; $i < strlen($n); $i++)
  {
    $x = rand(0, strlen($characters) - 1);
    $new .= $characters[$x];
  }

  $new .= md5($n);

  $new_calcked = "";
  for ($j = 0; $j < 7; $j++)
    $new_calcked .= $new[$j];

  return $new_calcked;
}

$data_stream = file_get_contents("php://input");
$data_parsed = json_decode($data_stream);

$code = generate_name($data_parsed->name);
$file = fopen("./data/".$code.".json", "w+") or die;
$data = json_encode([
  "long_url" => $data_parsed->url,
  "code" => $code,
  "views" => 0,
]); 

fwrite($file, $data);
fclose($file);

header("Content-Type: application/json;");
echo json_encode(["shortUrl"=>"https://knipurl.nl/url/?s=$code", "shortAnal"=>"https://knipurl.nl/a/?s=$code"]);
return;
?>