<?php 
require_once('./includes/common.php');
require_once(SYSTEM_ROOT."aiwanpay.config.php");

//����״̬��0Ϊʧ�ܣ�1Ϊ�ɹ�
$orderstatus=trim($_GET['orderstatus']);
//�̻�ID
$partner=trim($_GET['partner']);
//������
$ordernumber = $_GET["ordernumber"];
//֧�����
$paymoney = $_GET["paymoney"];
//ǩ��
$sign = $_GET["sign"];
//��ע��Ϣ
$attach = $_GET["attach"];

$signSource = sprintf("partner=%s&ordernumber=%s&orderstatus=%s&paymoney=%s%s", $partner, $ordernumber, $orderstatus, $paymoney, $pay_config['key']);
//��֤MD5ǩ��

//MD5ǩ����ȷ
if ($sign == md5($signSource))
{

//��⵽״̬Ϊ�ɹ�
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

//�̻�ҵ�����ݳɹ�����
  }
    else
  {

//�̻�ҵ������ʧ�ܴ���
  } 

//������󷵻ؽ��յ���ʶΪ1
//ֻҪ�̻��ӵ�֪ͨ�����ܶ���״̬���
//��ֻ��Ҫ���ؽ��յ���ʶΪ1
  echo "ok";
}
  else
{

echo "fail";
 
} 

?>
