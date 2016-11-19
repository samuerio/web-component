
/**
 *  money
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
	
//	var config = {
//		"yuan":"¥",
//		"dollars":"$",
//		"pounds":"£",
//		"euros":"€"
//	}
	var config = {
		"yen":"日元",
		"yuan":"人民币",
		"dollars":"美元",
		"pounds":"英镑",
		"euros":"欧元"
	}
	
	return base.money = {
			
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		createFiled:function($li,jsonData){
			var reqdText = "";
			if(jsonData.REQD){
				 reqdText =  fieldConfig.propertyConfig.reqd[jsonData.REQD] ;
			}
			$li.find(".money").text(config[jsonData.FMT]);
			$li.find("label.tip").text("请输入金额"+reqdText);
		},
			
		//设置属性值
		setPropertieValues:function($li,ftype,datajson){
			
		//初始化配置信息
			
			//1.通用配置信息初始化
			//base.commonProp($li,datajson);
			//2.独有配置信息初始化
			$("#moneyfomat").val(datajson.FMT);
			
//			//点击字段标签输入框时，进行表单里面所有标签名的填充
//			$("#LBLCN").unbind("keyup").bind("keyup",function(){
//				var value = $(this).val();
//				$li.find("label.desc:eq(0)").text(value+"("+config[datajson.FMT]+")");
//				datajson.LBLCN=value;
//				//控制字数 10个汉字长度
//				var strLen = value.length;
//				if(strLen>10){
//					$("#lblWarn").addClass("red");
//				}else if(strLen == 0){
//					$.showPop("请输入字段标签名称");
//					$("#lblWarn").removeClass("red");
//				}else{
//					$("#lblWarn").removeClass("red");
//				}
//				if($.inArray(value,pageInfo.curForm) != -1){
//					$.showPop("标签名冲突");
//				}
//			});
			
			//相关事件绑定
			$("#moneyfomat").unbind("change").bind("change",function(){
				var v = $(this).val();
				datajson.FMT = v;
				$li.find(".money").text(config[datajson.FMT]);
			});
			
			$("#reqd").unbind("change").bind("change",function(){
				var value = $(this).prop("checked");
				datajson.REQD=value;
				base.money.createFiled($li,datajson);
			});
		}
	};
});