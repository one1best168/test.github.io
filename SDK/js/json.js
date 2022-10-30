


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>爱玩收银台</title>
    <script type="text/javascript" src="js/jquery-1.6.1.min.js"></script>
    <link href="css/home.css?version=2015-03-30 11:29:22" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/json.js?version=2015-03-30 11:29:22"></script>
    <script> 
	<!--
        var jsonData = jsonData();
        var flag = false;
        var notice = null;
        /*tab切换脚本*/
        function setTab(name, cursel, n) {
            $(".tbone").removeClass("con");
            $("#one" + cursel).addClass("con");
            $(".teb-nr").css("display", "none");
            $("#tab_" + name + "_" + cursel).css("display", "block");
//            for (var i = 1; i <= n; i++) {
//                var menu = document.getElementById(name + i); /*循环取得所有标签*/
//                var con = document.getElementById("tab_" + name + "_" + i); /*循环取得所有的内容块*/
//                menu.className = i == cursel ? "con" : ""; /*判断自身的数字是否等于con*/
//                con.style.display = i == cursel ? "block" : "none"; /*如果是则显示出当前标签所应的内容块,否则隐藏*/
//            }
        }
        function selectBank(bankPayId, prodId, payId) {
            $('#productId').val(prodId);
            $("#payid_" + prodId + "_" + bankPayId).prop("checked", "checked");
            $('a[name="af"]').each(function () {
                var imgCss = $(this).attr("cssType");
                $(this).css("background", "url(images/" + imgCss + ".jpg)");
                $(this).css("display", "block");
                $(this).css("width", "160px");
                $(this).css("padding", "3px 0 3px 10px");
                $(this).mouseover(function () {
                    $(this).css("background", "url(images/" + imgCss + "1.jpg)");
                });
                $(this).mouseout(function () {
                    $(this).css("background", "url(images/" + imgCss + ".jpg)");
                });
            });
            var imgCss = $("#af_" + prodId + "_" + bankPayId).attr("cssType");
            $("#af_" + prodId + "_" + bankPayId).css("background", "url(images/" + imgCss + "1.jpg)");
            $("#af_" + prodId + "_" + bankPayId).unbind("mouseout");
            var flag = true;
            var json = eval(jsonData);
            for (var i = 0; i < json.length; i++) {
                if (json[i].bankId == payId) {
                    flag = false;
                    var html = "<table width='100%' border='0' ><tr><th width='15%' scope='col'>银行名称</th>" +
						   "<th width='12%' scope='col'>卡类型</th><th width='25%' scope='col'>客户类型</th>" +
							"<th width='17%' scope='col'>单笔限额(元)</th><th width='17%' scope='col'>当日限额(元)</th>" +
							"<th width='15%' scope='col'>备注</th></tr>";
                    for (var j = 0; j < json[i].cardList.length; j++) {
                        for (var k = 0; k < json[i].cardList[j].infoList.length; k++) {
                            if (prodId == 110) {

                                if (j == 0) {
                                    if (k == 0) {
                                        if (json[i].cardList.length == 1) {
                                            html = html + "<tr>";
                                            html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].bankName + "</td>";
                                            html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].cardList[j].cardName + "</td>";
                                            html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                            html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                            html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                            html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].customerLine + "</td>";
                                            html = html + "</tr>";
                                        } else {
                                            html = html + "<tr>";
                                            html = html + "<td rowspan='" + (json[i].cardList[j].infoList.length + json[i].cardList[j + 1].infoList.length) + "'>" + json[i].bankName + "</td>";
                                            html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].cardList[j].cardName + "</td>";
                                            html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                            html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                            html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                            html = html + "<td rowspan='" + (json[i].cardList[j].infoList.length + json[i].cardList[j + 1].infoList.length) + "'>" + json[i].customerLine + "</td>";
                                            html = html + "</tr>";
                                        }
                                    } else {
                                        html = html + "<tr>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "</tr>";
                                    }
                                }
                                if (j == 1) {
                                    if (k == 0) {
                                        html = html + "<tr>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].cardList[j].cardName + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "</tr>";
                                    } else {
                                        html = html + "<tr>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "</tr>";
                                    }
                                }
                            } else if (prodId == 111) {
                                if (j == 0) {
                                    if (k == 0) {
                                        html = html + "<tr>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].bankName + "</td>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].cardList[j].cardName + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].customerLine + "</td>";
                                        html = html + "</tr>";
                                    } else {
                                        html = html + "<tr>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "</tr>";
                                    }
                                }
                            } else if (prodId == 112) {
                                if (j == 1) {
                                    if (k == 0) {
                                        html = html + "<tr>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].bankName + "</td>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].cardList[j].cardName + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "<td rowspan='" + json[i].cardList[j].infoList.length + "'>" + json[i].customerLine + "</td>";
                                        html = html + "</tr>";
                                    } else {
                                        html = html + "<tr>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].costomerType + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].singleLimitMoney + "</td>";
                                        html = html + "<td>" + json[i].cardList[j].infoList[k].dayLimitMoney + "</td>";
                                        html = html + "</tr>";
                                    }
                                }
                            }
                        }
                    }
                    html = html + "</table>";
                    if (prodId == 110) {
                        $("#line_" + prodId).show();
                        $("#bankLimitMoney_" + prodId).html(html);
                    } else if (prodId == 111) {
                        $("#line_" + prodId).show();
                        $("#bankLimitMoney_" + prodId).html(html);
                    } else if (prodId == 112) {
                        $("#line_" + prodId).show();
                        $("#bankLimitMoney_" + prodId).html(html);
                    }
                }
            }
            if (flag) {
                if (prodId == 110) {
                    $("#line_" + prodId).hide();
                    $("#bankLimitMoney_" + prodId).html("");
                } else if (prodId == 111) {
                    $("#line_2").hide();
                    $("#bankLimitMoney_" + prodId).html("");
                } else if (prodId == 112) {
                    $("#line_3").hide();
                    $("#bankLimitMoney_" + prodId).html("");
                }
            }
        }

        function doPayAction() {
            if ($("#active").val() == "false") {
                var skipFlag = false;
                $(notice).each(function (i, val) {
                    if (0 == val.notice_type && (1 == val.isforward)) {
                        window.open(val.message);
                        skipFlag = true;
                        return;
                    }
                });

                if (!skipFlag) {
                    $('#warnText').html($("#active").attr("title"));
                    $("#mask_warning").css("display", "block");
                    $('#warning').css("display", "block");
                    $('#warning').css("top", $(document).scrollTop() + 100 + 'px');
                    $('#warning').css("left", $(window).width() / 2.5 + 'px');
                }
                return;
            }
            if ($('#payId').val() == "") {
                alert("请选择支付方式");
                return;
            }
            if (flag) {
                alert("请不重复提交订单");
                return;
            }
            flag = true;
            $("#the_form").attr("action", "/b2cbank/product");
            $("#the_form").submit();
        }

        function childDisplay(productId) {
            $("#mask").css("display", "block");
            $("#childDiv_" + productId).css("display", "block");
        }

        function closeDiv(productId) {
            $("#mask").css("display", "none");
            $("#childDiv_" + productId).css("display", "none");
        }

        function closeWarning() {
            $("#mask_warning").css("display", "none");
            $("#warning").css("display", "none");
        }

        function popMv(id) {
            $('#pop_title_' + id).mousedown(
			function (event) {
			    event.preventDefault(); // 阻止选中文本
			    var isMove = true;
			    var abs_x = event.pageX - $('#childDiv_' + id).css("margin-left").replace('px', '');
			    var abs_y = event.pageY - $('#childDiv_' + id).offset().top;
			    $(document).mousemove(function (event) {
			        if (isMove) {
			            var obj = $('#childDiv_' + id);
			            obj.css({ 'margin-left': event.pageX - abs_x, 'top': event.pageY - abs_y });
			        }
			    }).mouseup(
		                function () {
		                    isMove = false;
		                }
		        );
			});
        }

        function newsShow() {
            $('#news').slideToggle('slow');
        }
	//--> 
    </script>
</head>
<body>
    <div id="top">
        <div id="top-nr">
            <div class="logo">
                <img src="images/logo.png" />
            </div>
            <div class="top-nr">
                <div class="top-nr2">
                    <img src="images/dh.png" />
                </div>
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
    <div id="nr" style="z-index: 10;">
        <span id="newsDiv"></span>
        <div id="xx-b">
            <p>
                <img src="images/yj.jpg" /></p>
            <div id="xx">
                <div class="xx1">
                    <div class="xx1nr">
                        <div class="xx1">
                            <div class="xx1a">
                                商户名称：</div>
                            <div class="xx1b">
                                </div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div class="xx1nr1">
                        <div class="xx1">
                            <div class="xx1a">
                                商户订单号：</div>
                            <div class="xx1b">
                                20170904051159</div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div class="xx1nr2">
                        <div class="xx1">
                            <div class="xx1a">
                                消费类型：</div>
                            <div class="xx1bb">
                                直接消费</div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="xx1">
                    <div class="xx1nr">
                        <div class="xx1">
                            <div class="xx1a" style="padding-top: 2px;">
                                订单金额：</div>
                            <div class="xx1b">
                                <span class="dd">1.000</span> 元</div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div class="xx1nr1">
                        <div class="xx1" style="padding-top: 2px;">
                            <div class="xx1a" style="letter-spacing: 2px;">
                                交易时间：</div>
                            <div class="xx1b">
                                2017/9/4 5:11:46</div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div class="xx1nr2">
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="clear">
                </div>
            </div>
            <p>
                <img src="images/yj1.jpg" /></p>
        </div>
        <!--版权信息-->
        <form method="post" action="./GetWay.aspx?guid=2e6e3c38-1feb-4d83-8ab1-2785373c0419" id="ctl00">
<div class="aspNetHidden">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="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QVJEBlFRQ0FSRAZRUUNBUkQFUVHljaEFUVHljaFkAgUPZBYCZg8VCgZVTklDT00GVU5JQ09NBlVOSUNPTQZVTklDT00GVU5JQ09NBlVOSUNPTQZVTklDT00GVU5JQ09NCeiBlOmAmuWNoQnogZTpgJrljaFkAgYPZBYCZg8VCgZKSVVZT1UGSklVWU9VBkpJVVlPVQZKSVVZT1UGSklVWU9VBkpJVVlPVQZKSVVZT1UGSklVWU9VCeS5hea4uOWNoQnkuYXmuLjljaFkAgcPZBYCZg8VCgdORVRFQVNFB05FVEVBU0UHTkVURUFTRQdORVRFQVNFB05FVEVBU0UHTkVURUFTRQdORVRFQVNFB05FVEVBU0UJ572R5piT5Y2hCee9keaYk+WNoWQCCA9kFgJmDxUKBldBTk1FSQZXQU5NRUkGV0FOTUVJBldBTk1FSQZXQU5NRUkGV0FOTUVJBldBTk1FSQZXQU5NRUkJ5a6M576O5Y2hCeWujOe+juWNoWQCCQ9kFgJmDxUKBFNPSFUEU09IVQRTT0hVBFNPSFUEU09IVQRTT0hVBFNPSFUEU09IVQnmkJzni5DljaEJ5pCc54uQ5Y2hZAIKD2QWAmYPFQoHVEVMRUNPTQdURUxFQ09NB1RFTEVDT00HVEVMRUNPTQdURUxFQ09NB1RFTEVDT00HVEVMRUNPTQdURUxFQ09NCeeUteS/oeWNoQnnlLXkv6HljaFkAgsPZBYCZg8VCgdaT05HWU9VB1pPTkdZT1UHWk9OR1lPVQdaT05HWU9VB1pPTkdZT1UHWk9OR1lPVQdaT05HWU9VB1pPTkdZT1UP57q15ri45LiA5Y2h6YCaD+e6tea4uOS4gOWNoemAmmQCDA9kFgJmDxUKB1RJQU5YSUEHVElBTlhJQQdUSUFOWElBB1RJQU5YSUEHVElBTlhJQQdUSUFOWElBB1RJQU5YSUEHVElBTlhJQQ/lpKnkuIvkuIDljaHpgJoP5aSp5LiL5LiA5Y2h6YCaZAIND2QWAmYPFQoIVElBTkhPTkcIVElBTkhPTkcIVElBTkhPTkcIVElBTkhPTkcIVElBTkhPTkcIVElBTkhPTkcIVElBTkhPTkcIVElBTkhPTkcP5aSp5a6P5LiA5Y2h6YCaD+WkqeWuj+S4gOWNoemAmmQCDg9kFgJmDxUKB1NGVENBUkQHU0ZUQ0FSRAdTRlRDQVJEB1NGVENBUkQHU0ZUQ0FSRAdTRlRDQVJEB1NGVENBUkQHU0ZUQ0FSRAznm5vku5jpgJrljaEM55ub5LuY6YCa5Y2hZAIPD2QWAmYPFQoHR1VBTkdZVQdHVUFOR1lVB0dVQU5HWVUHR1VBTkdZVQdHVUFOR1lVB0dVQU5HWVUHR1VBTkdZVQdHVUFOR1lVD+WFieWuh+S4gOWNoemAmg/lhYnlrofkuIDljaHpgJpkAhAPZBYCZg8VCgZKRENBUkQGSkRDQVJEBkpEQ0FSRAZKRENBUkQGSkRDQVJEBkpEQ0FSRAZKRENBUkQGSkRDQVJEDeS6rOS4nEXljaHpgJoN5Lqs5LicReWNoemAmmRkRSDA2wMwOfRyZlSoojL80xDi56GrvXOH0aG4SZFe7Y8=" />
</div>

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['ctl00'];
if (!theForm) {
    theForm = document.ctl00;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>


<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="2C13755B" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEdAANOyox0t6wIlX+ibPoP1xZ5a66BiydHJUVE5YpN7gLVj1rBB2sFuRsZ3VFweN8iblkX7pWV0URVvXZxI4GTGERtFnnl5H2r7vQu/JkxNAr43A==" />
</div>
        <input id="guid" name="guid" type="hidden" value="2e6e3c38-1feb-4d83-8ab1-2785373c0419" />
        <div id="right">
            <div class="span9">
                <div class="teb">
                    <div class="teb-bt">
                        <input type="hidden" value="4" id="totalSize" />
                        <div class="teb-k">
                            <strong>付款方式：</strong>
                        </div>
                        <div class="teb-k">
                                    <a href="javascript:void(0);" id="one1" onclick="setTab('one',1,10)" class='tbone con'>网银支付
                                    </a>
                                </div>
                        <div class="teb-k">
                                    <a href="javascript:void(0);" id="one2" onclick="setTab('one',2,10)" class='tbone'>点卡支付
                                    </a>
                                </div>
                    </div>
                    <div class="teb-nr-b">
                        <p>
                            <img src="images/l-yj.jpg" />
                        </p>
                        <!--借记卡-->
                        <div class="teb-nr" id="tab_one_1" style='display: block;'>
                            <div class="teb-nrr" style="background: #eff8fe; zoom: 100%">
                                <div class="teb-nr1">
                                    <strong>个人网银支付</strong>
                                </div>
                                <div class="teb-nr2" style="zoom: 100%">
                                      
                                    <div class="yh">
                                        <div class="yh1">
                                          <input id="payid_110_ALIPAY" name="type" type="radio" value="alipay" onclick="selectBank('ALIPAY','110','ALIPAY');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('ALIPAY','110','ALIPAY');">
                                            <a href="javascript:void(0);" id="af_110_ALIPAY" name="af" csstype="yh-k">
                                                <img src="images/ALIPAY.jpg" width="110" height="30" alt="支付宝余额" title="支付宝余额" /></a>
                                        </div>
                                    </div>
                                  
                                    <div class="yh">
                                        <div class="yh1">
                                          <input id="payid_110_QQ" name="type" type="radio" value="qqpay" onclick="selectBank('QQ','110','QQ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('QQ','110','QQ');">
                                            <a href="javascript:void(0);" id="af_110_TENPAY" name="af" csstype="yh-k">
                                                <img src="images/QQ.jpg" width="110" height="30" alt="QQ钱包扫码" title="QQ钱包扫码" /></a>
                                        </div>
                                    </div>
                                  
                                    <div class="yh">
                                        <div class="yh1">
                                          <input id="payid_110_QQ" type="radio" name="type" value="wxpay" onclick="selectBank('ALIPAY','110','ALIPAY');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('WEIXIN','110','WEIXIN');" onclick="selectBank('ALIPAY','110','ALIPAY');" />
                                            <a href="javascript:void(0);" id="af_110_WEIXIN" name="af" csstype="yh-k">
                                                <img src="images/WEIXIN.jpg" width="110" height="30" alt="微信扫码" title="微信扫码" /></a>
                                        </div>
                                    </div>
                                  
                                    <div class="yh">
                                        <div class="yh1">
                                          <input type="radio" name="type" value="tenpay" onclick="selectBank('ALIPAY','110','ALIPAY');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('TENPAY','110','TENPAY');">
                                            <a href="javascript:void(0);" id="af_110_QQ" name="af" csstype="yh-k">
                                                <img src="images/TENPAY.jpg" width="110" height="30" alt="财付通余额" title="财付通余额" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="clear">
                                    </div>
                                </div>
                            </div>
                            <div class="clear">
                            </div>
                            <div class="teb-nr3">
                                <div class="teb-anniu">
                                <a id="lbtnBank" href="javascript:__doPostBack(&#39;lbtnBank&#39;,&#39;&#39;)"><strong>确认付款</strong></a>
                                </div>
                            </div>
                            <div class="fg-xx" id="line_110" style="display: none">
                            </div>
                            <div class="bg" id="bankLimitMoney_110">
                            </div>
                        </div>
                                                <div class="teb-nr" id="tab_one_2" style='display: none;'>
                            <div class="teb-nrr" style="background: #eff8fe; zoom: 100%">
                                <div class="teb-nr1">
                                    <strong>游戏点卡支付</strong>
                                </div>
                                <div class="teb-nr2" style="zoom: 100%">
                                      
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_JUNNET" name="pd_FrpId" type="radio" value="JUNNET" onclick="selectBank('JUNNET    ','110','JUNNET    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('JUNNET','110','JUNNET');">
                                            <a href="javascript:void(0);" id="af_110_JUNNET" name="af" csstype="yh-k">
                                                <img src="images/card/JUNNET.jpg" width="110" height="30" alt="骏网一卡通" title="骏网一卡通" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_SNDA" name="pd_FrpId" type="radio" value="SNDA" onclick="selectBank('SNDA    ','110','SNDA    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('SNDA','110','SNDA');">
                                            <a href="javascript:void(0);" id="af_110_SNDA" name="af" csstype="yh-k">
                                                <img src="images/card/SNDA.jpg" width="110" height="30" alt="盛大卡" title="盛大卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_SZX" name="pd_FrpId" type="radio" value="SZX" onclick="selectBank('SZX    ','110','SZX    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('SZX','110','SZX');">
                                            <a href="javascript:void(0);" id="af_110_SZX" name="af" csstype="yh-k">
                                                <img src="images/card/SZX.jpg" width="110" height="30" alt="神州行" title="神州行" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_ZHENGTU" name="pd_FrpId" type="radio" value="ZHENGTU" onclick="selectBank('ZHENGTU    ','110','ZHENGTU    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('ZHENGTU','110','ZHENGTU');">
                                            <a href="javascript:void(0);" id="af_110_ZHENGTU" name="af" csstype="yh-k">
                                                <img src="images/card/ZHENGTU.jpg" width="110" height="30" alt="征途卡" title="征途卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_QQCARD" name="pd_FrpId" type="radio" value="QQCARD" onclick="selectBank('QQCARD    ','110','QQCARD    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('QQCARD','110','QQCARD');">
                                            <a href="javascript:void(0);" id="af_110_QQCARD" name="af" csstype="yh-k">
                                                <img src="images/card/QQCARD.jpg" width="110" height="30" alt="QQ卡" title="QQ卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_UNICOM" name="pd_FrpId" type="radio" value="UNICOM" onclick="selectBank('UNICOM    ','110','UNICOM    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('UNICOM','110','UNICOM');">
                                            <a href="javascript:void(0);" id="af_110_UNICOM" name="af" csstype="yh-k">
                                                <img src="images/card/UNICOM.jpg" width="110" height="30" alt="联通卡" title="联通卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_JIUYOU" name="pd_FrpId" type="radio" value="JIUYOU" onclick="selectBank('JIUYOU    ','110','JIUYOU    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('JIUYOU','110','JIUYOU');">
                                            <a href="javascript:void(0);" id="af_110_JIUYOU" name="af" csstype="yh-k">
                                                <img src="images/card/JIUYOU.jpg" width="110" height="30" alt="久游卡" title="久游卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_NETEASE" name="pd_FrpId" type="radio" value="NETEASE" onclick="selectBank('NETEASE    ','110','NETEASE    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('NETEASE','110','NETEASE');">
                                            <a href="javascript:void(0);" id="af_110_NETEASE" name="af" csstype="yh-k">
                                                <img src="images/card/NETEASE.jpg" width="110" height="30" alt="网易卡" title="网易卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_WANMEI" name="pd_FrpId" type="radio" value="WANMEI" onclick="selectBank('WANMEI    ','110','WANMEI    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('WANMEI','110','WANMEI');">
                                            <a href="javascript:void(0);" id="af_110_WANMEI" name="af" csstype="yh-k">
                                                <img src="images/card/WANMEI.jpg" width="110" height="30" alt="完美卡" title="完美卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_SOHU" name="pd_FrpId" type="radio" value="SOHU" onclick="selectBank('SOHU    ','110','SOHU    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('SOHU','110','SOHU');">
                                            <a href="javascript:void(0);" id="af_110_SOHU" name="af" csstype="yh-k">
                                                <img src="images/card/SOHU.jpg" width="110" height="30" alt="搜狐卡" title="搜狐卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_TELECOM" name="pd_FrpId" type="radio" value="TELECOM" onclick="selectBank('TELECOM    ','110','TELECOM    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('TELECOM','110','TELECOM');">
                                            <a href="javascript:void(0);" id="af_110_TELECOM" name="af" csstype="yh-k">
                                                <img src="images/card/TELECOM.jpg" width="110" height="30" alt="电信卡" title="电信卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_ZONGYOU" name="pd_FrpId" type="radio" value="ZONGYOU" onclick="selectBank('ZONGYOU    ','110','ZONGYOU    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('ZONGYOU','110','ZONGYOU');">
                                            <a href="javascript:void(0);" id="af_110_ZONGYOU" name="af" csstype="yh-k">
                                                <img src="images/card/ZONGYOU.jpg" width="110" height="30" alt="纵游一卡通" title="纵游一卡通" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_TIANXIA" name="pd_FrpId" type="radio" value="TIANXIA" onclick="selectBank('TIANXIA    ','110','TIANXIA    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('TIANXIA','110','TIANXIA');">
                                            <a href="javascript:void(0);" id="af_110_TIANXIA" name="af" csstype="yh-k">
                                                <img src="images/card/TIANXIA.jpg" width="110" height="30" alt="天下一卡通" title="天下一卡通" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_TIANHONG" name="pd_FrpId" type="radio" value="TIANHONG" onclick="selectBank('TIANHONG    ','110','TIANHONG    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('TIANHONG','110','TIANHONG');">
                                            <a href="javascript:void(0);" id="af_110_TIANHONG" name="af" csstype="yh-k">
                                                <img src="images/card/TIANHONG.jpg" width="110" height="30" alt="天宏一卡通" title="天宏一卡通" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_SFTCARD" name="pd_FrpId" type="radio" value="SFTCARD" onclick="selectBank('SFTCARD    ','110','SFTCARD    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('SFTCARD','110','SFTCARD');">
                                            <a href="javascript:void(0);" id="af_110_SFTCARD" name="af" csstype="yh-k">
                                                <img src="images/card/SFTCARD.jpg" width="110" height="30" alt="盛付通卡" title="盛付通卡" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_GUANGYU" name="pd_FrpId" type="radio" value="GUANGYU" onclick="selectBank('GUANGYU    ','110','GUANGYU    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('GUANGYU','110','GUANGYU');">
                                            <a href="javascript:void(0);" id="af_110_GUANGYU" name="af" csstype="yh-k">
                                                <img src="images/card/GUANGYU.jpg" width="110" height="30" alt="光宇一卡通" title="光宇一卡通" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="yh">
                                        <div class="yh1">
                                            <input id="payid_110_JDCARD" name="pd_FrpId" type="radio" value="JDCARD" onclick="selectBank('JDCARD    ','110','JDCARD    ');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('JDCARD','110','JDCARD');">
                                            <a href="javascript:void(0);" id="af_110_JDCARD" name="af" csstype="yh-k">
                                                <img src="images/card/JDCARD.jpg" width="110" height="30" alt="京东E卡通" title="京东E卡通" /></a>
                                        </div>
                                    </div>
                                    
                                    <div class="clear">
                                    </div>
                                </div>
                            </div>
                            <div class="clear">
                            </div>
                            <div class="teb-nr3">
                                <div class="teb-anniu">
                                    <a id="lbtnCardSubmit" href="javascript:__doPostBack(&#39;lbtnCardSubmit&#39;,&#39;&#39;)"><strong>确认付款</strong></a>
                                </div>
                            </div>
                        </div>
                        <!--借记卡-->
                        <p>
                            <img src="images/l-yj1.jpg" />
                        </p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
        </div>
        </form>
        <div class="clear">
        </div>
    </div>

    <!--版权部分开始-->
    <!--版权信息-->
    <div id="copyright">
        <a href="https://www.soku.cc" target="_blank">搜库资源网</a> | <a href="https://www.soku.cc/about.html"
            target="">爱玩简介</a> | <a href="https://www.soku.cc/Contact" target="_blank">
                联系我们</a> |
        | <a href="" target="_blank">新闻中心</a> | <a href="http://wpa.qq.com/msgrd?v=3&uin=2909356786&site=%E7%88%B1%E7%8E%A9%E6%94%AF%E4%BB%98%E5%B9%B3%E5%8F%B0%E5%AE%A2%E6%9C%8D%E4%B8%AD%E5%BF%83&menu=yes"
            target="_blank">客户服务</a> |                                   <br>
       重庆香雨藤网络科技有限公司
    </div>
    <!--版权信息-->
    <!--版权部分结束-->

</body>

</html>
