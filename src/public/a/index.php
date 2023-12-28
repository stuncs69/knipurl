<?php
if (!isset($_GET["s"]))
  Header("Location: ../index.html");
else {
  $site_code = $_GET["s"];
  $file_loc = "../../api/data/$site_code.json";

  $fPtr = fopen($file_loc, "r") or Header("Location: ../error/404_code.html");
  $data = fread($fPtr, filesize($file_loc));
  $data_parsed = json_decode($data, true);
  fclose($fPtr);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <title><?php echo $data_parsed["code"]; ?></title>
</head>
<body style="max-width: 768px;">
  <div class="d-flex flex-column bg-secondary p-2 gap-2 text-white">
    <div class="d-flex flex-row gap-2 bg-primary rounded p-1">
      <p>Url: </p>
      <span class="d-flex flex-wrap"><?php echo $data_parsed["long_url"]; ?></span>
    </div>
    <div class="d-flex flex-row gap-2 bg-primary rounded p-1">
      <p>Code: </p>
      <span><?php echo $data_parsed["code"]; ?></span>
    </div>
    <div class="d-flex flex-row gap-2 bg-primary rounded p-1">
      <p>Views: </p>
      <span><?php echo $data_parsed["views"]; ?></span>
    </div>
  </div>
  <script type="text/javascript"> var infolinks_pid = 3411827; var infolinks_wsid = 0; </script> <script type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js"></script>
</body>
</html>
