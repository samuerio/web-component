/**
 * 图片
 */
define(["base","ui","libui/uploader","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,ui,utils,fieldConfig,fieldPropConfig){
	
		return base.image = {
			
			//组件渲染方法
			createFiled:function($li,jsonData){
				$li.find("div.content img").attr("src", jsonData.DEF);
				
				//渲染样式
				//如果 设置了间距样式有值(reqd为true),渲染界面
				if(jsonData.REQD&&jsonData.MARGINSTYLE){
					
				  //如果存在middle,去掉 ,赋值给css样式 
				  var  imageStyle = jsonData.MARGINSTYLE.replace("middle","");
				  $li.find("div.content").css("margin", imageStyle);
				  
				}
			},
		
			//设置属性值
			setPropertieValues:function($li,ftype,datajson){
			
				$li.find("div.content img").attr("src", datajson.DEF);
				// 上传图片按钮事件
				$("#uploadImage").die("click").live("click",function () {
					//大小限制5M
					var logoUploader = new ui.Uploader({
						filename: "file", 
						maxsize : 5253365.76,
						backend_url: "../attachmentUpload.action?operType=uploadFormPic&mapp_id=" +LINEWELL.page.mapp_id
					}, function(data) {
						//渲染界面
						$li.find("div.content img").attr("src",data.url);
						datajson.DEF = data.url;
				    });
					logoUploader.start();
				});
				var	$marginRight = $("#imageStyle input[name='margin-right']");
				var	$marginleft = $("#imageStyle input[name='margin-left']");
				var	$margintop = $("#imageStyle input[name='margin-top");
				var	$marginbottom = $("#imageStyle input[name='margin-bottom");
				var $margin=$("#imageStyle").find(".margin_configurator input");
				var $content=$li.find("div.content");
				
				//渲染出样式标签
				$("#styletab").removeClass("hide");	
				$("#imageStyle").hide();
				
				//点击样式
				$("#styletab").unbind("click").bind("click",function(){
					$("#allProps").hide();	
					$("#imageStyle").show();
					$(this).attr("class","cur");
					$("#contentab").removeClass("cur");
					
					//如果 设置了间距样式有值(reqd为true),渲染界面
					if(datajson.REQD&&datajson.MARGINSTYLE){
						var marginArr=datajson.MARGINSTYLE.split("px");
						$("#gauge").attr("checked","checked");
						$("#imageStyle .form-cell").removeClass("hide");
						$margintop.val($.trim(marginArr[0]));
						$marginRight.val($.trim(marginArr[1]));
						$marginbottom.val($.trim(marginArr[2]));
						$marginleft.val($.trim(marginArr[3]));
						
						//判断是否间距居中
						if($.trim(marginArr[4]) == "middle"){
							$("#separation").attr("checked","checked");
							$marginRight.attr("disabled","disabled");
							$marginbottom.attr("disabled","disabled");
						}else{
							$("#separation").removeAttr("checked"); 
							$marginRight.removeAttr("disabled","disabled");
							$marginbottom.removeAttr("disabled","disabled");
						}	
						$margin.trigger("keyup");
					}else{
						$("#imageStyle .form-cell").addClass("hide");
						$("#separation").removeAttr("checked");
						$("#gauge").removeAttr("checked")
					}
				})
				
				//点击内容
				$("#contentab").unbind("click").bind("click",function(){
					$("#imageStyle").hide();	
					$("#allProps").show();
					$(this).attr("class","cur");
					$("#styletab").removeClass("cur");
				})
				
				//点击调整边距事件
				$("#gauge").unbind("change").bind("change",function(){
					if($(this).prop("checked")){
						//更新F值（使用REQD 属性来表示调整边距的选中：true,false）
						datajson.REQD=true;
						$("#imageStyle .form-cell").removeClass("hide");
						
						//如果未设置间距对称，先默认设置为("0px 0px 0px 0px")
						if(!datajson.MARGINSTYLE){
							datajson.MARGINSTYLE="0px 0px 0px 0px ";
							$("#imageStyle").find(".margin_configurator input").val("0");
							$("#separation").removeAttr("checked");
							$marginRight.removeAttr("disabled","disabled");
							$marginbottom.removeAttr("disabled","disabled");
						}else{
							//触发px值改变事件
							$margin.trigger("keyup");	
						}
					}else{
						datajson.REQD=false;
						$content.css("margin","0px 0px 0px 0px ");
						$("#imageStyle .form-cell").addClass("hide");
					}
				})
				
				//点击间距对称事件
				$("#separation").unbind("change").bind("change",function(){
					
					if($(this).prop("checked")){
						$marginRight.attr("disabled","disabled");
						$marginbottom.attr("disabled","disabled");
						//触发px值改变事件
						$("#imageStyle").find(".margin_configurator input").trigger("keyup");
					}else{
						//移除disabled
						$marginRight.removeAttr("disabled","disabled");
						$marginbottom.removeAttr("disabled","disabled");
						//更新F
						datajson.MARGINSTYLE=datajson.MARGINSTYLE.substring(0,datajson.MARGINSTYLE.length-6)
					}
				})
				
				//px值改变触发事件
				$margin.unbind("keyup").bind("keyup",function(){
					//值为空时，赋值0
					var $val=$(this).val();
					var marginArr=datajson.MARGINSTYLE.split("px ");
					var marginStr="";
					//只允许输入数字，并且不能大于100,并且第一，第二位不能同时为0
					var	reg= /^\d+(\.{1}\d+)?$/;
					
					 //值为空时不排除
				    if($val&&!reg.test($val)||$val=="00"){
						$margintop.val(marginArr[0]);
						$marginRight.val(marginArr[1]);
						$marginbottom.val(marginArr[2]);
						$marginleft.val(marginArr[3]);
						return;
					//大于100的数字，值设置为100
					}else if($val>100){
						$(this).val("100");	
					}
				    
					//间距对称时
					var middle="";
					if($("#separation").prop("checked")){
						//改变px值，并且右边跟下边值不允许输入
						$marginRight.val($marginleft.val());
						$marginbottom.val($margintop.val());
						middle="middle";
					}
					
					//获取px值
					datajson.MARGINSTYLE="";
					$.each($margin,function(){
						if(!$(this).val()){
						marginStr+="0px ";	
						}else{
						marginStr+=$(this).val()+"px ";
						}
					});
					
					//更新F值
					datajson.MARGINSTYLE = marginStr+middle;
					//渲染改变中间图片的样式
					$content.css("margin",marginStr);
			})
		
			//px值为空时，并且失去焦点事件，px值为0
			$margin.unbind("blur").bind("blur",function(){
				var $val=$(this).val();
				if(!$val){
					$(this).val("0");
					//如果是选定了间距对称，同时将对称的px值设置为0；
					if($("#separation").prop("checked")){
						$marginRight.val($marginleft.val());
						$marginbottom.val($margintop.val());
					}
			   	}
			})
		
	   }
    }
});
	