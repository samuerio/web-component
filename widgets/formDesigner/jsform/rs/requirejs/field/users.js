
/**
 *  用户选择
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
 
	
	return base.users = {
		
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		createFiled:function($li,jsonData){
			var index = $($li).attr("index");
			$li.find(".content>input").val("点击选择用户");
		},
		/**
		 * 设置属性值
		 * @params $li li对象
		 * @params ftype 字段类型
		 * @params index 下标
		 */
		setPropertieValues:function($li,ftype,datajson){
			
		//初始化配置信息
			
			//1.通用配置信息初始化
			//base.commonProp($li,datajson);
			//2.独有配置信息初始化
			$("#check_default").find(".desc").text("默认值");
			$("#check_default").find(".desc2").text("默认当前用户");
			$("#default").prop("checked",datajson.DEF);
			
		//相关事件绑定
			$("#default").unbind("change").bind("change",function(){
				//是否默认当前用户
				datajson.DEF=$(this).prop("checked");
			}); 
		}
	};
});