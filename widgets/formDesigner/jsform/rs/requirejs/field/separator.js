
/**
 *  标签
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
 
	
	return base.separator = {
		
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		createFiled:function($li,jsonData){

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
		}
	};
});