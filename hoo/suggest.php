<?php
extract($_GET);
$file = fopen('food.txt', 'r');
$r = array();
if($term !== "")
{
while(!feof($file))
	{
		$line = trim(fgets($file));
		if(strpos(strtolower($line), strtolower($term)) !== false)
		{
			$r[]=$line;
		}
	}
}
echo (json_encode($r));
?>