<?php
ob_start();
ob_flush();
flush();

for($i = 0;$i<6;$i++)
{
	echo "$i\n";
	ob_flush();
	flush();
	sleep(5);
}
?>