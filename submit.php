<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>正在为您跳转到支付页面，请稍候...</title>
    <style type="text/css">
        body {margin:0;padding:0;}
        p {position:absolute;
            left:50%;top:50%;
            width:330px;height:30px;
            margin:-35px 0 0 -160px;
            padding:20px;font:bold 14px/30px "宋体", Arial;
            background:#f9fafc url(../images/loading.gif) no-repeat 20px 26px;
            text-indent:22px;border:1px solid #c5d0dc;}
        #waiting {font-family:Arial;}
    </style>
<script>
function open_without_referrer(link){
document.body.appendChild(document.createElement('iframe')).src='javascript:"<script>top.location.replace(\''+link+'\')<\/script>"';
}
</script>
</head>
<body>
<?php
require './includes/common.php';

@header('Content-Type: text/html; charset=UTF-8');

if(isset($_GET['pid'])){
	$queryArr=$_GET;
}else{
	$queryArr=$_POST;
}

$prestr=createLinkstring(argSort(paraFilter($queryArr)));
$pid=intval($queryArr['pid']);
if(empty($pid))sysmsg('PID不存在');
$userrow=$DB->query("SELECT * FROM pay_user WHERE id='{$pid}' limit 1")->fetch();
if(!md5Verify($prestr, $queryArr['sign'], $userrow['key']))sysmsg('签名校验失败，请返回重试！');

if($userrow['active']==0)sysmsg('商户已封禁，无法支付！');

$type=daddslashes($queryArr['type']);
$out_trade_no=daddslashes($queryArr['out_trade_no']);
$notify_url=daddslashes($queryArr['notify_url']);
$return_url=daddslashes($queryArr['return_url']);
$name=daddslashes($queryArr['name']);
$money=daddslashes($queryArr['money']);
$sitename=urlencode(base64_encode(daddslashes($queryArr['sitename'])));


if(empty($out_trade_no))sysmsg('订单号(out_trade_no)不能为空');
if(empty($notify_url))sysmsg('通知地址(notify_url)不能为空');
if(empty($return_url))sysmsg('回调地址(return_url)不能为空');
if(empty($name))sysmsg('商品名称(name)不能为空');
if(empty($money))sysmsg('金额(money)不能为空');
if($money<=0)sysmsg('金额不合法');

$trade_no=date("YmdHis").rand(11111,99999);
if(!$DB->query("insert into `pay_order` (`trade_no`,`out_trade_no`,`notify_url`,`return_url`,`type`,`pid`,`addtime`,`name`,`money`,`status`) values ('".$trade_no."','".$out_trade_no."','".$notify_url."','".$return_url."','".$type."','".$pid."','".$date."','".$name."','".$money."','0')"))sysmsg('创建订单失败，请返回重试！');

if(!empty($type)){
	require_once(SYSTEM_ROOT."aiwanpay.config.php");
	if($type=='alipay')$banktype='ALIPAY';
	elseif($type=='tenpay')$banktype='TENPAY';
	elseif($type=='qqpay')$banktype='QQ';
	elseif($type=='wxpay')$banktype='WEIXIN';
	else $banktype=$type;

	$apiurl = "https://pay.aiwanpay.cn/PayBank.aspx";
	$partner = $pay_config['pid'];
	$key = $pay_config['key'];
	$ordernumber =$trade_no;
	$paymoney =sprintf('%.2f', $money);
	$callbackurl = 'http://'.$conf['local_domain'].'/aiwanpay_notify.php';
	$hrefbackurl = 'http://'.$_SERVER['HTTP_HOST'].'/aiwanpay_return.php';
	$signSource = sprintf("partner=%s&banktype=%s&paymoney=%s&ordernumber=%s&callbackurl=%s%s", $partner, $banktype, $paymoney, $ordernumber, $callbackurl, $key);
	$sign = md5($signSource);
	?>
	<form id="paysubmit" name="paysubmit" action="<?php echo $apiurl?>" method="get">
        <input type="hidden" name="banktype" value="<?php echo $banktype?>">
        <input type="hidden" name="partner" value="<?php echo $partner?>">
        <input type="hidden" name="paymoney" value="<?php echo $paymoney?>">
        <input type="hidden" name="ordernumber" value="<?php echo $ordernumber?>">
        <input type="hidden" name="callbackurl" value="<?php echo $callbackurl?>">
        <input type="hidden" name="hrefbackurl" value="<?php echo $hrefbackurl?>">
        <input type="hidden" name="sign" value="<?php echo $sign?>">
    </form>
	<script>document.forms['paysubmit'].submit();</script>
	<?php
}else{
	echo "<script>window.location.href='./default.php?trade_no={$trade_no}&sitename={$sitename}';</script>";
}

?>
<p>正在为您跳转到支付页面，请稍候...</p>
</body>
</html>