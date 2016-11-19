/**
 *  多选框
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig","requirejs/config/choiceMenuConfig"],function(base,utils,fieldConfig,fieldPropConfig,choiceArray){
	
	return base.checkbox = {
			
			createFiled:function($li,jsonData){
				//1.获取多选框的内容区域
				var  $content = $li.find("div.content");
				$li.addClass("one");
				$content.empty();
				var $itemCheckbox;
				//2.遍历json.ITMS数组，构造itemCheck，并通过初始值配置好其属性
			/*	$.each(jsonData.ITMS,function(index,value){
					$itemCheckbox = $(fieldConfig.item_checkbox_f);
					if($.inArray(value.VAL,jsonData.DEF.split(","),0) != -1 ){
						$itemCheckbox.find("input:first").prop("checked",true);
					}
					$itemCheckbox.find("label").text(value.VAL);
				//3.填充进内容里面
					//$itemCheckbox.appendTo($content);
					$content.append($itemCheckbox);
				});*/
				
			},
			setPropertieValues:function($li,ftype,datajson){
				
				
			//保存当前选项值的数组
			var itemValArray = [];

			//初始化配置信息
				
				//2.独有配置信息初始化
				var $itemList = $("#itemList");
				
				//添加属性栏的多选框
				function addItems(itemIndex,value){
					var $nli = $(fieldConfig.item_checkbox);
//					//第一个选项不能有删除按钮	 
//					if(itemIndex === "0"){
//						$nli.find("a.icononly-del").remove();
//					}
					$nli.find("input[name = 'CHKED']").val(value.VAL);
					
					//存在默认值
					if(datajson.DEF){
						if($.inArray(value.VAL,datajson.DEF.split(","),0) != -1 ){
							$nli.find("input[name = 'CHKED']").prop("checked",true);
						}
					}
					//获取随即的id作为label和input的关联属性
					var curId = base.utils.getRandom();
					$nli.find("input[name = 'VAL']").val(value.VAL);
					$nli.find(":input:eq(0)").attr("id",curId);
					 $nli.find("label:eq(0)").attr("for",curId);
					$itemList.append($nli);
				}
				
				function initItems(){
					 $itemList.empty();
					 //添加选项
					 for(var i in datajson.ITMS){
						 addItems(i,datajson.ITMS[i]);
					 }
				}
				//初始化Items
				initItems();
				
				//若选项只有一个时，隐藏其删除按钮
				if(1 == $itemList.find("li").size()){
					$itemList.find("li:first").find("a.icononly-del").hide();
				}
				
				 
			//相关事件绑定
				
				 //绑定多选框的勾选事件
				 $itemList.find("li>input[type=checkbox]").die("change").live("change",function(){
					 //当前选中的checkbox的index值
					 var itemIndex = $(this).parent().index();
					 //先清空datajson.DEF的值，再按是否被选中进行顺序添加
					 datajson.DEF = "";
					 $("#itemList").find("input[name='CHKED']").each(function(idx,radio){
						 if($(radio).prop("checked")){
							 datajson.DEF += ($(radio).val()+","); 
						 }
					 });
					 datajson.DEF = datajson.DEF.substring(0,datajson.DEF.length-1);
					 //重新渲染组件
					 base.checkbox.createFiled($li,datajson);
				 });
				 
				 //添加按钮
				 $itemList.find("li>a[class='icononly-add']").die("click").live("click",function(){
					 
					 //若为最后一个选项，则显示其删除按钮
					 if(1 == $itemList.find("li").size()){
						 $(this).next().show();
					 }
					 var baseValue = "选项";
					 var value=base.unique.createItemValue(baseValue,datajson.ITMS);
					 var $this = $(this);
					 var $nli = $(fieldConfig.item_checkbox);
					 //更新F
					 datajson.ITMS.splice($this.parent().index()+1,0,{VAL:value});
					 //items数目有变化需重新初始化
					 $nli.find("input[name = 'VAL']").val(value);
					 
					//获取随即的id作为label和input的关联属性
					 var curId = base.utils.getRandom();
					 $nli.find(":input:eq(0)").attr("id",curId);
					 $nli.find("label:eq(0)").attr("for",curId);
					 
					 $nli.insertAfter($this.parent());
					 //重新渲染组件
					 base.checkbox.createFiled($li,datajson);
				 });
				 
				 //删除按钮
				 $itemList.find("li>a[class='icononly-del']").die("click").live("click",function(){
					   var $this = $(this);
					   datajson.ITMS.splice($this.parent().index(),1);
					   //items数目有变化需重新初始化
					   $(this).parent().remove();
					   //重新渲染组组件
					   base.checkbox.createFiled($li,datajson);
					   
					   //若选项只有一个时，隐藏其删除按钮
					   if(1 == $itemList.find("li").size()){
						   $itemList.find("li:first").find("a.icononly-del").hide();
					   }
				 });
				 
				 //获取所有items的值并排除掉自身的值，填充到itemArray里面去
				 $itemList.find("input[type='text']").die("focus").live({focus:function(){
					 itemValArray = [];
					 $.each(datajson.ITMS,function(index,item){
						 itemValArray.push(item.VAL);
					 });
					 itemValArray.splice($.inArray($(this).val(),itemValArray),1);
				 	}
				 });
				 
				 //随时更新F
				 $itemList.find("input[type='text']").die("keyup").live({keyup:function(){
					 var itemIndex = $(this).parent().index();
					 
					 //如果选项名相同，则弹出警告信息，并且不让其保存到F中
					 if($(this).val()){
				    	if($.inArray($(this).val(),itemValArray) != -1){
						 $.showPop("选项重复！");
						 $(this).val(datajson.ITMS[itemIndex].VAL);
						 return false;
					   }
					 } 
					 datajson.ITMS[itemIndex].VAL=$(this).val();
					 $(this).prev().prev().val($(this).val());
					 //重新设置DEF值
					 datajson.DEF = "";
					 $("#itemList").find("input[name='CHKED']").each(function(idx,radio){
						 if($(radio).prop("checked")){
							 datajson.DEF += ($(radio).val()+","); 
						 }
					 });
					 datajson.DEF = datajson.DEF.substring(0,datajson.DEF.length-1);
					 //重新渲染组件
					 base.checkbox.createFiled($li,datajson);
				 }});
				 
				 //批量编辑按钮事件
				 $("#btnItemsPredefine").unbind("click").bind("click",function(){
					 
				     $.lightBox({url: "../jsform/rs/html/predefinechoices.html",choiceMenu:"#choiceMenu",choiceArray:choiceArray,confirm: function() {
				    	 
				    	 var newItems  = $("#prepop").val().split("\n");
				    	 var array = new Array();
				    	 var strAry=new Array();
				    	 var flag=true;
				    	 //遍历选项
				    	 $.each(newItems,function(index1,item){
				    		
				    		 //批量删除选项重复
				    		 if($.inArray(item,strAry) != -1){
								  $("#lightBox").find("h3:first").css('color','red')
		    		 			   .text("选项重复！");
								  flag=false;
								  return;
							  }
				    		 
				    		 strAry.push(item);
				    		 if($.trim(item)!=''){
				    			 var it = {VAL: item};
				    			 array.push(it);
				    		 }
				    	 });
				    	 
				    	 if(!flag){
					    		return false;
					    	 }
					    	 
				    	 //不允许删除全部选项
				    	 if(0 == array.length){
				    		 $("#lightBox").find("h3:first").css('color','red')
				    		 			   .text("至少要有一个选项！");
				    		 return false;
				    	 }
				    	 datajson.ITMS = array;
				    	 //重新渲染控件和属性区域
				    	 base.checkbox.setPropertieValues($li,ftype,datajson);
				    	 base.checkbox.createFiled($li,datajson);
			            },loaded: function() {
			            	var html = "";
			            	 $.each(datajson.ITMS,function(ind,item){
			            		 html+=(item.VAL)+"\n";
			            	 });
			            	 $("#prepop").empty().val(html);
			            },cancel:function(){
					    	 //重新渲染控件和属性区域
					    	 base.checkbox.setPropertieValues($li,ftype,datajson);
					    	 base.checkbox.createFiled($li,datajson);
			            }
		            });
				 });
				
			}
	};
});