
/**
 *  时间
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
 
	
	return base.date = {
		
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		createFiled:function($li,jsonData){
			//日期格式初始化
			var dateFormat ="";
			if("YYYY-MM-DD" == jsonData.FMT){
				dateFormat = new Date().format("yyyy-MM-dd");
			}else if("YYYY-MM-DD HHMM" == jsonData.FMT){
				dateFormat = new Date().format("yyyy-MM-dd hh:mm");
			}
			
//		   if(!jsonData.REQD){
//			   	$li.find("label.tip").text(dateFormat);
//	        }else{
//	        	$li.find("label.tip").text(dateFormat+fieldConfig.propertyConfig.reqd[jsonData.REQD]);
//	        }
			
		//如果选择必填，则显示当前时间，否则显示当前格式
		   if(!jsonData.REQD){
			   	$li.find("label.tip").text("请选择");
	        }else{
	        	$li.find("label.tip").text(dateFormat);
	        }
		   
		   //debugger;
		   //判断是否告警
		   if(jsonData.WARN){
			   $li.children(".alarm").show();
			   $li.children(".inline").show();
		   }else{
			   $li.children(".alarm").hide();
			   $li.children(".inline").hide();
			   
		   }
		   
		   
		},
		/**
		 * 设置属性值
		 * @params $li li对象
		 * @params ftype 字段类型
		 * @params index 下标
		 */
		setPropertieValues:function($li,ftype,datajson){
			
		//初始化配置信息
			
			
//			//2.独有配置信息初始化
//			$("#check_default").find(".desc").text("默认值");
//			$("#check_default").find(".desc2").text("默认当前时间");
//			$("#default").prop("checked",datajson.DEF);
			
//		   //相关事件绑定
//			$("#default").unbind("change").bind("change",function(){
//				//是否默认当前时间
//				datajson.DEF=$(this).prop("checked");
//			}); 
			
			  //相关事件绑定
			$("#warn").unbind("change").bind("change",function(){
				//是否默认当前时间
				datajson.WARN=$(this).prop("checked");
			}); 
			
			$("#pdateformat").find(":input[type='radio']").unbind("change").bind("change",function(){
				var v = $(this).val();
				
				var dateFormat = "";
				//年-月-日
				//年-月-日 时分秒
				if("YYYY-MM-DD" == v){
					dateFormat = new Date().format("yyyy-MM-dd");
				}else if("YYYY-MM-DD HHMM" == v){
					dateFormat = new Date().format("yyyy-MM-dd hh:mm");
				}
				
//			   if(!datajson.REQD){
//				   	$li.find("label.tip").text(dateFormat);
//		        }else{
//		        	$li.find("label.tip").text(dateFormat+fieldConfig.propertyConfig.reqd[datajson.REQD]);
//		        }
	//如果选择必填，则显示当前时间，否则显示当前格式
			   if(!datajson.REQD){
				   	$li.find("label.tip").text("请选择");
		        }else{
		        	$li.find("label.tip").text(dateFormat);
		        }
				datajson.FMT = v;
			});
			
			$("#warn").unbind("change").bind("change",function(){
				datajson.WARN=$(this).prop("checked");
				if(datajson.WARN){
					 $li.children(".alarm").show();
					 $li.children(".inline").show();
				}else{
					 $li.children(".alarm").hide();
					 $li.children(".inline").hide();
				}
			});
		}
	};
});