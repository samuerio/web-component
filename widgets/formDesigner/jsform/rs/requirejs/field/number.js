/**
 *  数字输入框
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
	
	return base.number = {
			
			setPropertieValues:function(li,ftype,datajson){
				
			//初始化配置信息
				
				//1.通用配置信息初始化
				//base.commonProp(li,datajson);
				//2.独有配置信息初始化
				
				//初始化最大值和最小值
				$("#prange :text[name = MAX]").val(datajson.MAX);
				$("#prange :text[name = MIN]").val(datajson.MIN);
			
				//对输入值进行数字验证和保存
				$("#prange :text").die("blur").live({blur:function(){
					if($(this).val()==""){
						datajson[this.name]=$(this).val();
						return;
					}
					//数字正则表达式
					var reg = /^(-?\d+)(\.\d+)?$/;
					if(!reg.test($(this).val())){
						$.showPop("请输入正确的数字格式");
					  //重新获得焦点
					  $(this).focus();
					  //置空非法的数字格式
					  $(this).val("");
					  return;
					}
					//获取最大值
					var maxVal=$("#prange :text[name = MAX]").val();
					//获取最小值
					var minVal=$("#prange :text[name = MIN]").val();
					//最大值，最小值都有值时进行比较大小
				    if(maxVal!=""&&minVal!=""&&eval(maxVal)<eval(minVal)){
				    	$.showPop("最大值不能小于最小值，请重新输入");
				    	 $(this).focus();
				    	 //置空最大值
				    	 $("#prange :text[name = MAX]").val("");
				    }else{
				    	datajson[this.name]=$(this).val();
				    }
				}});
			}
	};
});