/**
 * 电话号码
 */
define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
	
	return base.phone = {
			
		//初始化 构建
		createFiled:function($li,jsonData){
//			$phone=$li.find("div.content");
//			//渲染组件
//			if(jsonData.FMT === "tel"){
//			//	$phone.html(fieldConfig.phone_tel_cn);
//			}else{
//			//	$phone.html(jsonData.html);
//			}
		},
		
		//属性构建
		setPropertieValues:function($li,ftype,datajson){

		//初始化配置信息
			
		//1.通用配置信息初始化
		//base.commonProp(li,datajson);
		$phone=$li.find("div.content");
		//2.独有配置信息初始化
		if(datajson.FMT === "TEL"){
			$("#phoneformat").val("TEL");
		}else{
			$("#phoneformat").val("MOBILE");
		}
			
		//相关事件绑定
			//绑定电话格式改变事件。
		$("#phoneformat").unbind("change").bind("change",function(){
			//电话格式为座机时
			if($("#phoneformat").val()==="TEL"){
				//更新F
				datajson.FMT="TEL";
				//$phone.html(fieldConfig.phone_tel_cn);
			}else{
				datajson.FMT="MOBILE";
				//$phone.html(fieldConfig[ftype].html);
			}
		});
		
		},
	};
});