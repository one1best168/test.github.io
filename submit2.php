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

$type=daddslashes($_GET['type']);
$trade_no=daddslashes($_GET['trade_no']);
$row=$DB->query("SELECT * FROM pay_order WHERE trade_no='{$trade_no}' limit 1")->fetch();
if(!$row)sysmsg('该订单号不存在，请返回来源地重新发起请求！');
if(!$type)sysmsg('参数错误');

$DB->query("update `pay_order` set `type` ='$type',`addtime` ='$date' where `trade_no`='$trade_no'");

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
$paymoney =sprintf('%.2f', $row['money']);
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
<p>正在为您跳转到支付页面，请稍候...</p>
</body>
</html>