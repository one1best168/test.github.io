<?php 
require_once('./includes/common.php');
require_once(SYSTEM_ROOT."aiwanpay.config.php");
@header('Content-Type: text/html; charset=UTF-8');

//订单状态，2为失败，1为成功
$orderstatus=trim($_GET['orderstatus']);
//商户ID
$partner=trim($_GET['partner']);
//订单号
$ordernumber = $_GET["ordernumber"];
//支付金额
$paymoney = $_GET["paymoney"];
//签名
$sign = $_GET["sign"];
//备注信息
$attach = $_GET["attach"];

$signSource = sprintf("partner=%s&ordernumber=%s&orderstatus=%s&paymoney=%s%s", $partner, $ordernumber, $orderstatus, $paymoney, $pay_config['key']);
//验证MD5签名

//MD5签名正确
if ($sign == md5($signSource))
{
	$srow=$DB->query("SELECT * FROM pay_order WHERE trade_no='{$ordernumber}' limit 1")->fetch();
	$url=creat_callback($srow);
//检测到状态为成功
  if ($orderstatus==1)
  {
		if($srow['status']==0){
			$DB->query("update `pay_order` set `status` ='1',`endtime` ='$date' where `trade_no`='$ordernumber'");
			//$addmoney=round($srow['money']*$conf['money_rate']/100,2);
			//$DB->query("update pay_user set money=money+{$addmoney} where id='{$srow['pid']}'");
			echo '<script>window.location.href="'.$url['return'].'";</script>';
		}else{
			echo '<script>window.location.href="'.$url['return'].'";</script>';
		}

//商户业务数据成功处理
  }
    else
  {
		sysmsg('未成功支付！'."ordernumber=".$ordernumber."&paymoney=".$paymoney);
//商户业务数据失败处理
  } 
}
  else
{
sysmsg('验证失败！'."ordernumber=".$ordernumber."&paymoney=".$paymoney);
 
} 

?>
