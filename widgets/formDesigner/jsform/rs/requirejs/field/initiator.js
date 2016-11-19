/**
 * 发起人组件
 */
define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
	
	return base.initiator = {
			
		createFiled:function($li,jsonData){
		 
		},
		
		setPropertieValues:function($li,ftype,datajson){
			
		//初始化配置信息
			
			//1.通用配置信息初始化
			//base.commonProp($li,datajson);
			//2.独有配置信息初始化
			$("select[name = DEFAULT]").val(datajson.DEF);
			
		//相关事件绑定
			$("select[name = DEFAULT]").die("change").live("change",function(){
				datajson.DEF = $(this).val();
			});
		},
		//渲染的私有方法
		viewField:function($li,jsonData){
			var $input = $li.find(".content input");
			$input.val(jsonData.DEF);
		}
	};
});