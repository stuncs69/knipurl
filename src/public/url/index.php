<?php
if (!isset($_GET["s"]))
  Header("Location: ../index.html");
else {
  $site_code = $_GET["s"];
  $file_loc = "../../api/data/$site_code.json";

  $fPtr = fopen($file_loc, "r") or Header("Location: ../error/404_code.html");
  $data = fread($fPtr, filesize($file_loc));
  $data_parsed = json_decode($data, true);
  $new_loc = $data_parsed["long_url"];

  if (strlen($data_parsed["long_url"]) > 0) $read = 0;
  else $read = -1;

  Header("Location: https://$new_loc");
  fclose($fPtr);

  if ($read == 0)
  {
    $fPtr = fopen($file_loc, "w");
    $views = intval($data_parsed["views"]);
    $views++;

    $data_parsed["views"] = $views;
    fwrite($fPtr, json_encode($data_parsed));
    fclose($fPtr);
  }
}
?>
<script type="text/javascript"> var infolinks_pid = 3411827; var infolinks_wsid = 0; </script> <script type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js"></script>