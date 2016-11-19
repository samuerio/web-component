
/**
 *  地址
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig","requirejs/config/addressConfig"],function(base,utils,fieldConfig,fieldPropConfig,addressConfig){
 
	
	return base.address = {
		
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		createFiled:function($li,jsonData){
			var $content = $li.find("div.content");
			$li[0].removeAttribute("text-multi");
			 
			if(jsonData.SUBFLDS.PRV&&$.trim(jsonData.SUBFLDS.PRV)!=''){
				$content.find("div[name = 'address']").html(jsonData.SUBFLDS.PRV+' '+jsonData.SUBFLDS.CITY+' '+jsonData.SUBFLDS.ZIP);
				if(jsonData.SUBFLDS.DTL && $.trim(jsonData.SUBFLDS.DTL)!=''){
					$content.find("div[name = 'detail']").html(jsonData.SUBFLDS.DTL );
				}else{
					$content.find("div[name = 'detail']").html("详细地址");
				}
				
			}else{
				var reqdText = "";
				if(jsonData.REQD){
					 reqdText =  fieldConfig.propertyConfig.reqd[jsonData.REQD] ;
				}
				$content.find("div[name = 'address']").css("text-align","left").html("省-市-县"+reqdText);
				$content.find("div[name = 'detail']").html("详细地址");
			}
			
		},
		/**
		 * 设置属性值
		 * @params $li li对象
		 * @params ftype 字段类型
		 * @params index 下标
		 */
		setPropertieValues:function($li,ftype,datajson){
			
			index = $li.attr("index");
			
			var defval_province = $("#defval_province");
			
			defval_province.empty().append($("<option value=''>省/自治区/直辖市</option>")); 
			
			
			//设置值
			$.each(addressConfig,function(key,citys){
				defval_province.append($("<option value='"+key+"'>"+key+"</option>")); 
			});
			
			//初始化 默认地址
			$("#defval_province").find("option[value='"+datajson.SUBFLDS.PRV+"']").attr("selected",true);
			//如果省级非空则，给市级初始化数据
			if(datajson.SUBFLDS.PRV != ""){
				var $city = $("#defval_city").empty().append($("<option value=''>市</option>"));
				$.each(addressConfig[datajson.SUBFLDS.PRV],function(city,homeTome){
					$city.append($("<option value='"+city+"'>"+city+"</option>")); 
				});
			}
			$("#defval_city").find("option[value='"+datajson.SUBFLDS.CITY+"']").attr("selected",true);
			
			//如果市级非空则，给县级初始化数据
			if(datajson.SUBFLDS.CITY != "" && datajson.SUBFLDS.PRV != ""){
				var $zip = $("#defval_zip").empty().append($("<option value=''>区/县</option>"));
				$.each(addressConfig[datajson.SUBFLDS.PRV][datajson.SUBFLDS.CITY],function(index,zip){
					$zip.append($("<option value='"+zip+"'>"+zip+"</option>")); 
				});
			}
			$("#defval_zip").find("option[value='"+datajson.SUBFLDS.ZIP+"']").attr("selected",true);
			
			//唯有省、市、县都非空时才显示详细地址
			$("#defval_detail").val(datajson.SUBFLDS.DTL);
			
			//绑定事件
			defval_province.die("change").live("change",function(){
				//先清空显示级数据
				datajson.SUBFLDS.ZIP ="";
				datajson.SUBFLDS.CITY="";
				var provinceValue = defval_province.val();
				
				var $city = $("#defval_city").empty().append($("<option value=''>市</option>"));
				$("#defval_zip").empty().append($("<option value=''>区/县</option>"));
				
				if(provinceValue!=""){
					$.each(addressConfig[provinceValue],function(city,homeTome){
						$city.append($("<option value='"+city+"'>"+city+"</option>")); 
					});
				}else{
					$li.find("div.content").find("div[name = 'detail']").html("");
				}
				
				datajson.SUBFLDS.PRV=provinceValue;
				//重新渲染组件
				base.address.createFiled($li,datajson);
				
			});
			
			$("#defval_city").die("change").live("change",function(){
				//清空县市级数据
				datajson.SUBFLDS.ZIP="";
				var $zip = $("#defval_zip").empty().append($("<option value=''>区/县</option>"));
				var cityValue = $(this).val();
				if(cityValue!=""){
					$.each(addressConfig[defval_province.val()][$("#defval_city").val()],function(index,zip){
						$zip.append($("<option value='"+zip+"'>"+zip+"</option>")); 
					});
				}
				datajson.SUBFLDS.CITY = cityValue;
				//重新渲染组件
				base.address.createFiled($li,datajson);
			});
			
			$("#defval_zip").die("change").live("change",function(){
				datajson.SUBFLDS.ZIP = $(this).val();
				//重新渲染组件
				base.address.createFiled($li,datajson);
			});
			
			$("#defval_detail").die("keyup").live("keyup",function(){
				datajson.SUBFLDS.DTL = $(this).val();
				//重新渲染组件
				base.address.createFiled($li,datajson);
			});
			
			//地址栏目显示提示信息，特殊处理
			var $tipDiv = $li.find("div[name='address']");
			
			$("#toolTip").unbind("keyup").bind("keyup",function(){
				var value = $(this).val();
				
				var strLen = utils.strlen(value);
				if(strLen>40){
					$("#tipWarn").addClass("red");
					value = utils.subRealLen2(value,40);
					$(this).val(value);
				}else{
					$("#tipWarn").removeClass("red");
				}
				datajson.TOOLTIP=value;
				base.address.createFiled($li,datajson);
			});
			
			//必选
			$("#reqd").unbind("change").bind("change",function(){
				var value = $(this).prop("checked");
				datajson.REQD=value;
				base.address.createFiled($li,datajson);
			});
		}
	};
});