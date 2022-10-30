<?php
require './includes/common.php';

$rs=$DB->query("SELECT * from pay_order where status=2");

while($row = $rs->fetch())
{
	$DB->query("update `pay_order` set `status` ='1' where `trade_no`='{$row['trade_no']}'");
	$addmoney=round($row['money']*$conf['money_rate']/100,2);
	$DB->query("update pay_user set money=money+{$addmoney} where id='{$row['pid']}'");
}
echo 'ok';