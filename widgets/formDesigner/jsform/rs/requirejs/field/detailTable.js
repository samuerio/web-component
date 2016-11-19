
/**
 *  时间
 */
define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig"],function(base,utils,fieldConfig,fieldPropConfig){
 
	
	/**
	 * 子表单ul事件绑定
	 */
	function initSubForm($li,$ul){
		
		//判断是否有子元素
		var $content = $li.find(".content");
		$content.hover(function(event){
			//移除$li的line ,如果lisub.length==0，说明没有子元素
			//此时在ul下面加line,否则不做处理，等待li处理
			var $lisub = $li.find("ul>li");
			if(pageInfo.isdraggable&&$lisub.length==0){//&&$lisub.length==0
				var $ul = $li.find("ul");
				 pageInfo.inType="ul";
				 pageInfo.$currentUl = $ul;
				 $ul.append(pageInfo.$line);
			}
			event.stopPropagation();
		},function(event){
			//在当前li的后面插入
			/*if(pageInfo.isdraggable){//&&$lisub.length==0
				 var $cli = $content.parent();
				 pageInfo.inType="li";
				 pageInfo.$currentLi = $cli;
				 $cli.after(pageInfo.$line);
				 //判断在上面移除还是在下面移除：
				 pageInfo.direction = 1;
			}
			event.stopPropagation();*/
		});
		
		//ul对象
	 	var $subUl = $li.find("ul");
		$subUl.hover(function(event){
			 if(pageInfo.isdraggable){
				 var $this = $(this);
				 pageInfo.$currentUl = $(this);
				 pageInfo.inType="ul";
				 console.log("字表达中li触发 设置："+pageInfo.inType);
				 $(this).append(pageInfo.$line);
			 }
			 event.stopPropagation();
		},function(){
			//console.log("移除$ul");
		});
	}
	
	return base.detailTable = {
		
		/**
		 *@params $li li对象
		 *@params jsonData 配置
		 */
		
		createFiled:function($li,jsonData){
			$li.find(".desc").css("float","none");
			$li[0].removeAttribute("text-multi");
			var detailTable = $li.find(".content>.table");
			//subForm标识 该ul是子表单的ul
			//$li.attr("subForm","subForm");
			$ul = $("<ul subForm='subForm'/>");
			detailTable.append($ul);
			//遍历所有子表单对象
			$ul.sortable().disableSelection();
			//将字段渲染进子表
			if(jsonData.FIELDS&&jsonData.FIELDS.length>0){
				base.fields.createFields(jsonData.FIELDS,$li.find("ul"));
				detailTable.find(".warnLi").hide();
			}
			initSubForm($li,$ul);
		},
		/**
		 * 设置属性值
		 * @params $li li对象
		 * @params ftype 字段类型
		 * @params index 下标
		 */
		setPropertieValues:function($li,ftype,datajson){
			//1.通用配置信息初始化
		} 
	};
});