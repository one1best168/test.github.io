<?php
/* *
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 */

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>白云易支付免签约即时到账交易接口</title>
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
<style>
*{
	margin:0;
	padding:0;
}
ul,ol{
	list-style:none;
}
.title{
    color: #ADADAD;
    font-size: 14px;
    font-weight: bold;
    padding: 8px 16px 5px 10px;
}
.hidden{
	display:none;
}

.new-btn-login-sp{
	border:1px solid #D74C00;
	padding:1px;
	display:inline-block;
}

.new-btn-login{
    background-color: #ff8c00;
	color: #FFFFFF;
    font-weight: bold;
	border: medium none;
	width:82px;
	height:28px;
}
.new-btn-login:hover{
    background-color: #ffa300;
	width: 82px;
	color: #FFFFFF;
    font-weight: bold;
    height: 28px;
}
.bank-list{
	overflow:hidden;
	margin-top:5px;
}
.bank-list li{
	float:left;
	width:153px;
	margin-bottom:5px;
}

#main{
	width:750px;
	margin:0 auto;
	font-size:14px;
	font-family:'宋体';
}
#logo{
	background-color: transparent;
    background-image: url("images/new-btn-fixed.png");
    border: medium none;
	background-position:0 0;
	width:166px;
	height:35px;
    float:left;
}
.red-star{
	color:#f00;
	width:10px;
	display:inline-block;
}
.null-star{
	color:#fff;
}
.content{
	margin-top:5px;
}

.content dt{
	width:160px;
	display:inline-block;
	text-align:right;
	float:left;
	
}
.content dd{
	margin-left:100px;
	margin-bottom:5px;
}
#foot{
	margin-top:10px;
}
.foot-ul li {
	text-align:center;
}
.note-help {
    color: #999999;
    font-size: 12px;
    line-height: 130%;
    padding-left: 3px;
}

.cashier-nav {
    font-size: 14px;
    margin: 15px 0 10px;
    text-align: left;
    height:30px;
    border-bottom:solid 2px #CFD2D7;
}
.cashier-nav ol li {
    float: left;
}
.cashier-nav li.current {
    color: #AB4400;
    font-weight: bold;
}
.cashier-nav li.last {
    clear:right;
}
.alipay_link {
    text-align:right;
}
.alipay_link a:link{
    text-decoration:none;
    color:#8D8D8D;
}
.alipay_link a:visited{
    text-decoration:none;
    color:#8D8D8D;
}
</style>
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
  <form name=alipayment action=epayapi.php method=post target="_blank">
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
                              商品名称：</div>
                            <div class="xx1b">
                            <input size="30" name="WIDsubject" value="测试商品"/></div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div class="xx1nr1">
                        <div class="xx1">
                            <div class="xx1a">
                                商户订单号：</div>
                            <div class="xx1b">
                                <input size="30" name="WIDout_trade_no" value="<?php echo date("YmdHis").mt_rand(100,999); ?>"/></div>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                <div class="xx1">
                    <div class="xx1nr">
                        <div class="xx1">
                            <div class="xx1a" style="padding-top: 2px;">
                                订单金额：</div>
                            <div class="xx1b">
                                <span class="dd"><input size="30" name="WIDtotal_fee" value="0.01"/></span> 元</div>
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
        <input id="guid" name="guid" type="hidden" value="d37b55eb-5e96-449d-a75d-cedc3f769a95" />
        <div id="right">
            <div class="span9">
                <div class="teb">
                    <div class="teb-bt">
                        <input type="hidden" value="4" id="totalSize" />
                        <div class="teb-k">
                            <strong>付款方式：</strong>
                        </div>
                        <div class="teb-k">
                                    <a href="javascript:void(0);" id="one1" onclick="setTab('one',1,10)" class='tbone con'>时到账接口
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
                                        <div class="yh2" onclick="selectBank('QQ','110','QQ');" onclick="selectBank('QQ','110','QQ');" />
                                            <a href="javascript:void(0);" id="af_110_QQ" name="af" csstype="yh-k">
                                                <img src="images/QQ.jpg" width="110" height="30" alt="QQ钱包扫码" title="QQ钱包扫码" /></a>
                                        </div>
                                    </div>
                                  
                                    <div class="yh">
                                        <div class="yh1">
                                          <input id="payid_110_WEIXIN" name="type" type="radio" value="wxpay" onclick="selectBank('WEIXIN','110','WEIXIN');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('WEIXIN','110','WEIXIN');" onclick="selectBank('WEIXIN','110','WEIXIN');" />
                                            <a href="javascript:void(0);" id="af_110_WEIXIN" name="af" csstype="yh-k">
                                                <img src="images/WEIXIN.jpg" width="110" height="30" alt="微信扫码" title="微信扫码" /></a>
                                        </div>
                                    </div>
                                  
                                    <div class="yh">
                                        <div class="yh1">
                                          <input id="payid_110_TENPAY" name="type" type="radio" value="tenpay" onclick="selectBank('TENPAY','110','TENPAY');" />
                                        </div>
                                        <div class="yh2" onclick="selectBank('TENPAY','110','TENPAY');" onclick="selectBank('TENPAY','110','TENPAY');" />
                                            <a href="javascript:void(0);" id="af_110_TENPAY" name="af" csstype="yh-k">
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
                                <button id="lbtnBank" class="new-btn-login" type="submit">确认付款</button>
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
</body>

</html>
