/**
 * 单选框
 */
define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig","requirejs/config/choiceMenuConfig"],
						function(base,utils,fieldConfig,fieldPropConfig,choiceArray){

return base.radio={

		createFiled:function($li,jsonData){
			//radio的内容
			var  $content = $li.find("div.content");
			$li.addClass("one");
			$content.empty();
			var $itemradio;
		    /*$.each(jsonData.ITMS, function(index, itm) {
		    	//配置的radio选项HTML。
			    $itemradio = $(fieldConfig.item_radio_f);
			    $itemradio.find("label").text(itm.VAL);
			    if(jsonData.DEF == itm.VAL){
			    	$itemradio.find(":radio").prop("checked",true);
			    }
			    $content.append($itemradio);
			    });*/
		},
		setPropertieValues:function	($li,ftype,datajson){
			
		//保存当前选项值的数组
		var itemValArray = [];
			
		//初始化配置信息
			
			//1.通用配置信息初始化
			//base.commonProp($li,datajson);
			//2.独有配置信息初始化
			 var $itemList = $("#itemList");
			 $itemList.empty();
			 
			 //添加item
			 function addItems(itemIndex,itm){
				 var $nli = $(fieldConfig.item_radio);
//			     //第一个选项不能有删除按钮	 
//				 if(itemIndex === "0"){
//				 $nli.find("a.icononly-del").remove();
//				 }
				 if(itm.VAL === datajson.DEF){
					 $nli.find(":input:eq(0)").val(itm.VAL).prop("checked",true);
				 }else{
					 $nli.find(":input:eq(0)").val(itm.VAL);
				 }
				 //获取随即的id作为label和input的关联属性
				 var curId = base.utils.getRandom();
				 $nli.find(":input:eq(0)").attr("id",curId);
				 $nli.find("label:eq(0)").attr("for",curId);
				 $nli.find(":input:eq(1)").val(itm.VAL);
				 $itemList.append($nli);
			 } 
			 
			 //添加选项
			 for(var i in datajson.ITMS){
				 addItems(i,datajson.ITMS[i]);
			 } 
			 
			 //若选项只有一个时，隐藏其删除按钮
			 if(1 == $itemList.find("li").size()){
				 $itemList.find("li:first").find("a.icononly-del").hide();
			 }

		//相关事件绑定
			 $itemList.find("li>input[type=radio]").die("change").live("change",function(){
				 var itemIndex = $(this).parent().index();
				 
				 datajson.DEF=$(this).val();
				 //重新渲染组件
				 base.radio.createFiled($li,datajson);
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
				 var $nli = $(fieldConfig.item_radio);
				 
				 //获取随即的id作为label和input的关联属性
				 var curId = base.utils.getRandom();
				 $nli.find(":input:eq(0)").val(value).attr("id",curId);
				 $nli.find("label:eq(0)").attr("for",curId);
				 
				 $nli.find(":input:eq(1)").val(value);
				 $nli.insertAfter($this.parent());
				 //更新F
				 datajson.ITMS.splice($this.parent().index()+1,0,{VAL:value});
				 //重新渲染组见。
				 base.radio.createFiled($li,datajson);
				 
			 });
			 
			 //删除按钮
			 $itemList.find("li>a[class='icononly-del']").die("click").live("click",function(){
				   var $this = $(this);
				   datajson.ITMS.splice($this.parent().index(),1);
				   $(this).parent().remove();
				    //重新渲染组见。
				   base.radio.createFiled($li,datajson);
				   
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
				 
				 if($(this).prev().prev().prop("checked")){
					 datajson.DEF = $(this).val();
				 }
				 
				 //重新渲染组见。
				 base.radio.createFiled($li,datajson);
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