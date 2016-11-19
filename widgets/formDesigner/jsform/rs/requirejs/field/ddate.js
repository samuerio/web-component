
/**
 *  时间区间
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
 
	
	return base.ddate = {
			
		uniqueLblCn:function(newJSON,baseLBL1){
			//确保日期区间第二个标签的唯一性
			newJSON.LBLCN1 = base.fields.createLable(baseLBL1,pageInfo.curForm);
		},
			
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		createFiled:function($li,jsonData){
			$li.find("label.desc:eq(1)").text(jsonData.LBLCN1);
			
			//日期格式初始化
			var dateFormat ="";
			if("YYYY-MM-DD" == jsonData.FMT){
				dateFormat = new Date().format("yyyy-MM-dd");
			}else if("YYYY-MM-DD HHMM" == jsonData.FMT){
				dateFormat = new Date().format("yyyy-MM-dd hh:mm");
			}
			
			//如果选择必填，则显示当前时间，否则显示当前格式
		   if(!jsonData.REQD){
			   	$li.find("label.tip").text("请选择");
	        }else{
	        	$li.find("label.tip").text(dateFormat);
	        }
		   
		   //判断是否告警
		   if(jsonData.WARN){
			   $li.children(".alarm").show();
			   $li.children(".inline:eq(1)").show();
		   }else{
			   $li.children(".alarm").hide();
			   $li.children(".inline:eq(1)").hide();
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
			//2.独有配置信息初始化
//			$("#check_default").find(".desc").text("默认值");
//			$("#check_default").find(".desc2").text("默认当前时间");
//			$("#default").prop("checked",datajson.DEF);
			
			
		//相关事件绑定
			$("#default").unbind("change").bind("change",function(){
				//是否默认当前时间
				datajson.DEF=$(this).prop("checked");
			}); 
			
			//日期格式
			index = $($li).attr("index");
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
				
			   if(!datajson.REQD){
				   	$li.find("label.tip").text("请选择");
		        }else{
		        	$li.find("label.tip").text(dateFormat);
		        }
				datajson.FMT = v;
			});
			
			//判断字段标签长度是否超限
			if($("#LBLCN1") && 10 < $("#LBLCN1").val().length){
				$("#lblWarn1").addClass("red");
			}else{
				$("#lblWarn1").removeClass("red");
			}
			
//			$("#lblWarn1").removeClass("red");
			//结束时间字段标签
			$("#LBLCN1").unbind("keyup").bind("keyup",function(){
				var value = $(this).val();
				//控制字数 10个汉字长度
				var strLen = value.length;
				if(strLen>10){
					$("#lblWarn1").addClass("red");
				}else if(strLen == 0 ){
					$.showPop("请输入字段标签名称");
					$("#lblWarn1").removeClass("red");
				}else{
					$("#lblWarn1").removeClass("red");
				}
				datajson.LBLCN1=value;
				$li.find("label.desc:eq(1)").text(value);
				//当字段标签名为空的时候，不用进行重名验证
				if(strLen != 0){
					if($.inArray(value,pageInfo.curForm) != -1){
						$.showPop("字段标签重名，请重新输入");
					}
				}
			});
			
			//结束标签也要绑定聚焦事件
			$("#LBLCN1").unbind("focus").bind("focus",function(){
				base.fields.updateCurForm($li);
				//排除自己的标签名
				pageInfo.curForm.splice($.inArray(datajson.LBLCN1,pageInfo.curForm),1);
			});
			
			$("#warn").unbind("change").bind("change",function(){
				datajson.WARN=$(this).prop("checked");
				if(datajson.WARN){
					 $li.children(".alarm").show();
					 $li.children(".inline:eq(1)").show();
				}else{
					 $li.children(".alarm").hide();
					 $li.children(".inline:eq(1)").hide();
				}
			});
		}
	};
});