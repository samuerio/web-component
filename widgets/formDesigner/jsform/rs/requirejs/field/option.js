
/**
 *  意见
 */

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
	
	return base.option = {
			
		//组件渲染方法
		createFiled:function($li,jsonData){
			 
			//渲染按钮
			var items = jsonData.ITMS;
			var $shortcutKey = $(".shortcutKey",$li);
			for(var index in items){
				var item = items[index];
				$shortcutKey.append($("<span>"+item.VAL+"</span>"));
			}
			
		},
		
		//设置属性值
		setPropertieValues:function(li,ftype,datajson){
			
			//base.commonProp(li,datajson);
			//设置属性值
			 var $itemList = $("#itemList");
			 $itemList.empty();
			 $textarea = $(li).find("div>textarea");
			 
			 //添加一个按钮
			 function addItems(itemIndex,value){
				 var $nli = $(fieldConfig.item_radio);
				 //radio
				 if(datajson.defval!=value){
					 $nli.find(":input:eq(0)").val(value);
				 }else{
					 $nli.find(":input:eq(0)").val(value).prop("checked",true);
				 }
				 $nli.find(":input:eq(1)").val(value);
				 $itemList.append($nli);
			 }
			 
			 //添加选项
			 for(var i in datajson.ITMS){
				 addItems(i,datajson.ITMS[i].VAL);
			 }
			
			 //绑定事件
			 $itemList.find("li>input[type=radio]").die("change").live("change",function(){
				 //更新默认值
				 datajson.defval=$(this).val();
				 $textarea.val($(this).val());
			 });
			 
			 //添加按钮
			 $itemList.find("li>a[class='icononly-add']").die("click").live("click",function(){
				 var value="新增";
				 var $this = $(this);
				 var $nli = $(fieldConfig.item_radio);
				 $nli.find(":input:eq(0)").val(value);
				 $nli.find(":input:eq(1)").val(value);
				 $nli.insertAfter($this.parent());
				 //更新F
				 datajson.ITMS.splice($this.parent().index()+1,0,{VAL:value,CHKED:'0'});
			 });
			 
			 //删除按钮
			 $itemList.find("li>a[class='icononly-del']").die("click").live("click",function(){
				   var $this = $(this);
				   datajson.ITMS.splice($this.parent().index(),1);
				   $(this).parent().remove();
			 });
			 
			 //随时更新F
			 $itemList.find("input[type='text']").die("keyup").live({keyup:function(){
				 var itemIndex = $(this).parent().index();
				 datajson.ITMS[itemIndex].VAL=$(this).val();
			 }});
			 
			 
			 //批量编辑按钮事件
			 $("#btnItemsPredefine").unbind("click").bind("click",function(){
				 
			     $.lightBox({url: "../jsform/rs/html/itembatchedit.html",confirm: function() {
			    	 
			    	 var newItems  = $("#prepop").val().split("\n");
			    	 var array = new Array();
			    	 //判断是否可以“添加到列表”
			    	 var flag = true;
			    	 //遍历选项
			    	 $.each(newItems,function(index1,item){
			    		 //批量删除选项重复
			    		 if(newItems.length > 1){
			    			 //批量删除选项重复
			    			 if($.inArray(item,newItems,index+1) != -1){
			    				 $("#lightBox").find("h3:first").css('color','red')
			    				 .text("选项重复！");
			    				 flag=false;
			    				 return false;//跳出$.each 循环
			    			 }
			    		 }
			    		 
			    		 if($.trim(item)!=''){
			    			 var it = {VAL: item,CHKED: "0"};
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
			    	 //调用本身方法设置属性值
			    	 base.options.setPropertieValues(li,ftype,index);
		            },loaded: function() {
		            	var html = "";
		            	 $.each(datajson.ITMS,function(ind,item){
		            		 html+=(item.VAL)+"\n";
		            	 });
		            	 $("#prepop").empty().val(html);
		            }});
			 });
			 
		},
		//渲染的私有方法
		viewField:function($li,jsonData){
			var $div = $li.find(".content .shortcutKey");
			//
			$.each(jsonData.ITMS,function(index,item){
				var $span = $("<span>"+item.VAL+"</span>");
				$div.append($span);
				$span.click(function(){
					$(this).parent().parent().find(".textarea").val($(this).text());
				});
			});
		
		}
	};
});