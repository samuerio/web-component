 

/**
  * 表单设计器的主入口模块
  */
define(["requirejs/utils","requirejs/appmain","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig","requirejs/config/pageConfig"],function(utils,appmain,fieldConfig,fieldPropConfig,pageConfig){
	
	//当前选中的字段下标
	var INDEX = 0;
	
	//base对象
	var page = {};
	
	/**
	 * 表单渲染
	 */
	function showForm(){
		
		if(F&&F.length>0){
			$("#nofields").hide();
			$("#formButtons").show();
		  }else{
		    $("#nofields").show();
		    $("#formButtons").hide();
		  }
		var $fields = $("#fields");
		appmain.fields.createFields(F,$fields);
		var firstLi = $fields.find("li").first();
		INDEX = 0;
		if(firstLi.length>0){
			setFocused(firstLi,0);
		}
	}
 
	/**
	 * $li :对象
	 * index :下标
	 * c b
	 */
	function preFocused($li, index) {
		if(INDEX!=index)
		$($li).removeClass("default").addClass("prefocus");
	}
	
	function reDefault($li, index) {
		if(INDEX!=index)
		$li.removeClass("prefocus").addClass("default").find("p.instruct").hide();
	}
	
	
	/**
	 * 聚焦某个控件
	 * @param   li对象
	 * @param   index下标,子表怎么办？
	 */
	function setFocused($li) {
		$("#allProps").show();
		$("#noProps").hide();
		
		//若是子表里面的字段，则属性区域不显示其序列号
		$("#liPos").text("");
		if(!$li.parent().attr("subForm")){
			//若是主表，则属性区域显示其字段序列号
			$("#liPos").text(parseInt($li.attr("index"))+1+".");
		}
		
		//切换背景色
		$li.parent().find(".focused").find(".fieldActions").hide();
		
		//1.先清空其他所有字段的focused类
		$("#fields li").removeClass("focused");
		//2.再给当前点击字段添加focused类
		$li.removeClass("prefocus").addClass("focused");
		
		//子元素
		$li.children(".fieldActions").show();
		var type = $li.attr("ftype");
	    //隐藏所有属性
	    $.each(fieldPropConfig.allProp, function(index, propId) {
	        $("#" + propId).hide();
	    });
	    
	    //根据配置显示属性
	    $.each(fieldPropConfig.fieldPropConfig[type], function(index, propId) {
	        $("#" + propId).show();
	    });
	    
	    var jsonData = null;
	    //li相对下标
	    var index = parseInt($li.attr("index"),10);
	    if($li.attr("subForm")=="subForm"){
	    	var pIndex = $li.parent().parent().parent().parent().attr("index");
	    	jsonData=F[parseInt(pIndex,10)].FIELDS[index];
	    }else{
	    	jsonData = F[index];
	    }
	    
	    //常规属性设置值,先清空所有属性值，再用F填充
	    $("#allProps").setValues(jsonData);
	    //特殊属性设置值
	    if(appmain[type]&&appmain[type].setPropertieValues!=null){
	    	appmain[type].setPropertieValues($li,type,jsonData);
	    }
	};
	
	
	
	/**
	 * 修改F json对象，并创建字段
	 * @param c $li对象
	 * @param type	类型
	 * @param index	下标
	 * @param srcJSON
	 */
	function addDefFieldDom($li, type, index, srcJSON) {
		//更改配置
	    var newJSON = eval(fieldConfig[type].json);
	    $.mergJSON(srcJSON, newJSON);
	    //判断是否是子表单,通过ftype来判断
	    //子表单要更新字段数组
	    if($li.attr("subForm")=="subForm"){
	    	var pIndex = $li.parent().parent().parent().parent().attr("index");
	    	//在
	    	F[pIndex].FIELDS.splice(index, 0, newJSON);
	    	 //创建字段
		    appmain.fields.createFiled($li,newJSON);
	    }else{
		    F.splice(index, 0, newJSON);
		    //创建字段
		    appmain.fields.createFiled($li,newJSON);
		    //默认选中
		    setFocused($li);
		    $.autoHeight();
	    }
	}
	
	/**
	 * 重置标识位
	 */
	function resetPageInfo(){
		pageInfo.$currentLi = null;
		pageInfo.$currentUl = null;
		pageInfo.inType = null;
		pageInfo.currentY = 0;
		pageInfo.direction = 0;
	}
	
	/**
	 * 重写字段初始化事件 
	 */
	function fieldInit(){
	 
	 $("#fields").sortable({axis: "y",delay: 100}).disableSelection();
	 
	 /**
	  * 字段总的容器事件绑定，用于第一次添加字段时候的处理
	  */
	 $("#fields").hover(function(){
		 //在拖动并且 长度==0
		 var $lis =  $("#fields>li");
		 if(pageInfo.isdraggable){
			 pageInfo.inType="ul";
			 pageInfo.$currentUl = $(this);
			 $(this).append(pageInfo.$line);
		 }
	 },function(){
		 //判断是否在拉拽控件,并且如果离开放置区域，则不让其进行控件添加。
		 if(pageInfo.isdraggable){
			 //1.移除标志线
			 pageInfo.$line.remove();
			 //2.重置PageInfo
			 resetPageInfo();
		 }
	 });
	 
	 //设置li滚动事件
	 appmain.fields.liMouseEnter($("#fields>li"));
	 
	 $("li", "#addFields").draggable({helper: "clone",cursorAt: { top: -2, left: -2 },
		 start:function(event,ui){
			 pageInfo.isdraggable = true;
			 pageInfo.$line = $(fieldConfig.field_li2);
		 },
		 stop:function(event,ui){
			 
			 $("#nofields").hide();
		     $("#formButtons").show();
			 
			 pageInfo.isdraggable = false;
			 if(pageInfo.$currentLi!=null||pageInfo.$currentUl!=null){
				 //创建
				 var $li = $(fieldConfig.field_li);
				 var index = null;
				 var type = $(ui.helper.context).attr("ftype");
				 
				 //当表单尚未添加字段的时候，绑定ul
				 if(pageInfo.inType=='ul'){
					 if(pageInfo.$currentUl!=null){
						 pageInfo.$currentUl.parent().find(".warnLi").hide();
						 //判断是否是子表单
						 if(pageInfo.$currentUl.attr("subForm")=='subForm'){
							 //将li也做标记
							 $li.attr("subForm","subForm");
						 }
						 pageInfo.$currentUl.append($li);
						 index=pageInfo.$currentUl.children().length;
					 }else{
						 //console.log("form 检测到$currentUl==null");
					 }
				 }else{
					 //如果表单添加有字段，并触发了li的事件则执行以下代码
					 if(pageInfo.$currentLi!=null){
						 
						 //判断是否是子表单
						 if(pageInfo.$currentLi.attr("subForm")=='subForm'){
							 //子表单中不能嵌套子表单
							 //这里判断是否是ftype=detailTable,相等则提示
							 if(type=='detailTable'){
								 alert("明细子表里面不允许嵌套明细子表");
								 pageInfo.$currentLi=null;
								 pageInfo.$line.remove();
								 pageInfo.currentY = -1;
								 return;
							 }
							 //添加子表单字段标识
							 $li.attr("subForm","subForm");
						 }
						 //判断插入代码的方向 1:在$li后面添加元素，-1:在$li前面添加元素
						 if(pageInfo.direction==1){
							 pageInfo.$currentLi.after($li);
							 //index +1才能和F下标对应 
							 index = parseInt(pageInfo.$currentLi.attr("index"),10)+1;
						 }else if(pageInfo.direction==-1){
							 pageInfo.$currentLi.before($li);
							 index = parseInt(pageInfo.$currentLi.attr("index"),10);
						 }
					 }else{
						 //console.log("form 检测到$currentLi==null");
					 }
				 }
				 
				 appmain.fields.liMouseEnter($li);
				 
				 pageInfo.$line.remove();
				 //重置标识
				 pageInfo.direction = 0;
				 //重新排序，包涵所有子表
				 if($li.attr("subForm")=="subForm"){
					 //子表单排序
					 resetOrder($li.parent());
				 }else{
					 resetOrder();
				 }
				 //第几个，子表如何获取呢？
				 addDefFieldDom($li, type, index);
				 resetPageInfo();
			 }
		 },drag:function(event,ui){
			 //在拖拽过程中，计算和比较位置，动态计算位置
		 }}).disableSelection();
	 
	 
	 //被添加字段的拖动过程悬浮时触发。
	 //这里区分子表和非子表
	 //数据交换
	 $("#fields").live({
		 
		 sortover:function(h,d){
		 },
		 //这里表单和子表单的拖动事件都会调用
		 sortupdate:function(h,ui){
			 //目的位置 的下标
			var order = ui.item.index();
			//当前排序的下标
			var index =  parseInt(ui.item.attr("index"));
			//console.log("拖动下标序列："+order+"   排序下标："+index);
			//判断是否子列表排序
			if(ui.item.attr("subForm")=='subForm'){//子列表排序
				var pli = ui.item.parent().parent().parent().parent();
				var pIndex = parseInt(pli.attr("index"),10);
				var jsonData = F[pIndex];//INDEX 主表序列
				var data = jsonData.FIELDS[index];
				jsonData.FIELDS.splice(index, 1);
				jsonData.FIELDS.splice(order, 0, data);
				resetOrder($(ui.item).parent());
				//console.log(jsonData);
			}else{
				//两个移动元素交换数据位置
				var data = F[index];
				F.splice(index, 1);
	            F.splice(order, 0, data);
				//重新排序
				resetOrder();
			}
		 }
	 });
	 
	 
	//选中控件事件绑定 和 鼠标悬浮特效  
    $("li.field", "#fields").live({click: function(event) {
    	var $this = $(this);
    	INDEX = parseInt($this.attr("index"));
        setFocused($this);
        event.stopPropagation();
     },mousemove:function(e){
    	 if(pageInfo.isdraggable&&pageInfo.currentY!=0){
			 if(e.pageY>=pageInfo.currentY){
				 if(pageInfo.direction!=1){
					 pageInfo.direction = 1;
					 pageInfo.$currentLi.after(pageInfo.$line);
				 }
			 }else{
				 if(pageInfo.direction!=-1){
					 pageInfo.direction = -1;
					 pageInfo.$currentLi.before(pageInfo.$line);
					 //插入
				 }
			 }
    	 }
     }});
    
    
    //复制按钮点击事件
    $("#fields a.faDup").live({click: function(e) {
    	//复制思路：1、找到当前选中的li 的ftype属性,INDEX来获取
    	//2、从F中获取配置
    	//3、克隆数据对象和页面对象
    	//4、插入到当前节点的下一个节点去
    	var $this = $(this);
    	var $li  = $this.parent().parent();//找到li对象
    	var ftype = $li.attr("ftype");
    	//li本身的下标，可能是子表的下标
    	var index = parseInt($li.attr("index"),10);
    	//克隆对象
    	var clonObj = $li.clone();
    	clonObj.find("img.arrow,p.instruct,div.fieldActions").hide();
    	$li.after(clonObj);
    	//更新F
    	//注意区分 子表字段和非子表字段
    	if($li.attr("subForm")=='subForm'){
    		//主表的li对象
	    	var parentLi = $li.parent().parent().parent().parent();
	    	//主表li的下标
	    	var pIndex = parseInt(parentLi.attr("index"),10);
	    	F[pIndex].FIELDS.splice(index,0,$.cloneJSON(F[pIndex].FIELDS[index]));
	    	resetOrder($li.parent());
    	}else{
    		F.splice(index,0,$.cloneJSON(F[index]));
    		//重新设置id
       	 	resetOrder();
    	}
    	 setFocused(clonObj);
    	 e.preventDefault();
		}
    });
    
    //删除按钮点击事件
    $("#fields a.faDel").live({click: function(e) {
    	var $this = $(this);
    	//子表li对象
    	var $li  = $this.parent().parent();//找到li对象
    	var index = parseInt($li.attr("index"),10);
    	if($li.attr("subForm")=='subForm'){
        	//主表的li对象
        	var parentLi = $li.parent().parent().parent().parent();
        	//主表li的下标
        	var pIndex = parseInt(parentLi.attr("index"),10);
        	//删除数据
        	F[pIndex].FIELDS.splice(index,1);
        	resetOrder($li.parent());
    	}else{
    		F.splice(index,1);
    		resetOrder();
    	}
    	$li.remove();
		$("#allProps").hide();
		$("#noProps").show();
		e.preventDefault();
		e.stopPropagation();
	 }
    });
    
    //保存数据
    $("#saveForm").click(function(){
    	var params = {"config":JSON.stringify(F),"operType":"saveFormFields","form_unid":"5eb88f07697444908c782fe6f9800a89"};
    	console.log(JSON.stringify(F));
    	$.post("app.action?type=appFormDesignAction",params).done(function(data){
    		console.log(data);
    	}); 
    });
  };
	 
	//li 重置顺序
	function resetOrder($ul){
		 //默认是fields，还可能是子表单的ul对象
		 if(!$ul){
			 $ul = $("#fields");
		 }
		 $ul.children("li.field").each(function(index,item){
             $(item).attr("id", "f" + index);
             $(item).attr("index", index);
		 });
	}
	
	/**
	 * 页面字段初始化：分为：新增审批页面和日常表单页面
	 */
	function pageInit(type){
		var filedArray =null;
		var addFields = $("#addFields");
		if(type=="approvePage"){
			filedArray = pageConfig.approvePage;
		}else{
			filedArray = pageConfig.dailyPage;
		}
		 
	  $.each(filedArray,function(key,columns){
		 
		   if(key=="col1"){
			   addFields.append($(fieldConfig.COLUMN_TITLE));
		   }else if(key=="col3"){
			   addFields.append($(fieldConfig.COLUMN_TITLE1));
		   }
		   var $ul = $("<ul/>");
		   $ul.attr("id",key);
		   $ul.appendTo(addFields);
		   $.each(columns,function(index,column){
			   $ul.append($('<li  ftype="'+column.name+'"><a  id="'+column.id+'" class="btn btn-white" title="'+column.description+'" href="#"><b></b>'+column.title+'</a></li>'));
		   });
	  });
	}
	
	/**
	 * 初始化表单
	 */
	page.init = function(type){
		pageInit(type);
		fieldInit();
		showForm();
		//获取字段配置信息
		var params = {"operType":"getFormFieldsInfo","form_unid":"5eb88f07697444908c782fe6f9800a89"};
	/*	$.post("app.action?type=appFormDesignAction",params,function(data){
			F=data.content;
			//console.log(JSON.stringify(F));
			
			if(F != undefined){
				//进行相关类型的转换（包括“true”转true）
				F = JSON.parse(JSON.stringify(F), function(key,value){
					switch(value){
					case "true"  : return true;
					case "false"  : return false;
					default : return value;
					}
				});
			}else{
				F=[];
			}
			showForm();
		},"json");*/
	};
	
	/**
	 * 创建预览页面
	 */
	page.createView = function(formData,fieldsData){
		var $fields = $("#fields");
		$.each(fieldsData, function(index, jsonData) {
			$li = $(fieldConfig.field_li);
	        $li.attr("id", "f" + index).appendTo($fields).attr("index",index);
	        viewField($li,jsonData);
		});
	}
	return page;
});
