<?php
include("../includes/common.php");

if($islogin==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");

$batch=$_GET['batch'];
$allmoney=$_GET['allmoney'];
$data='';
$rs=$DB->query("SELECT * from pay_settle where batch='$batch'");

$i=0;
while($row = $rs->fetch())
{
	$i++;
	$data.=$i."----".mb_convert_encoding($row['note'], "GB2312", "UTF-8")."----".$row['qq']."----".$row['account']."----".mb_convert_encoding($row['username'], "GB2312", "UTF-8")."----".$row['money']."\r\n";
}

$date=date("Ymd");
$file.="�̻���ˮ��----���㷽ʽ----QQ����----�����˺�----��������----������\r\n";
$file.=$data;
$file_name='���Խ����б�_'.date("Y-m-d H-i-s").'.txt';
$file_size=strlen($file);
header("Content-Description: File Transfer");
header("Content-Type:application/force-download");
header("Content-Length: {$file_size}");
header("Content-Disposition:attachment; filename={$file_name}");
echo $file;
?>