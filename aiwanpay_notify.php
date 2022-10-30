<?php 
require_once('./includes/common.php');
require_once(SYSTEM_ROOT."aiwanpay.config.php");

//订单状态，0为失败，1为成功
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

//检测到状态为成功
  if ($orderstatus==1)
  {
		$srow=$DB->query("SELECT * FROM pay_order WHERE trade_no='{$ordernumber}' limit 1")->fetch();
		if($srow['status']==0){
			$DB->query("update `pay_order` set `status` ='1',`endtime` ='$date' where `trade_no`='$ordernumber'");
			//$addmoney=round($srow['money']*$conf['money_rate']/100,2);
			//$DB->query("update pay_user set money=money+{$addmoney} where id='{$srow['pid']}'");
			$url=creat_callback($srow);
			curl_get($url['notify']);
			proxy_get($url['notify']);
		}

//商户业务数据成功处理
  }
    else
  {

//商户业务数据失败处理
  } 

//处理完后返回接收到标识为1
//只要商户接到通知，不管订单状态如何
//都只需要返回接收到标识为1
  echo "ok";
}
  else
{

echo "fail";
 
} 

?>
