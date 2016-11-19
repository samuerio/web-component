/**
 *  tjianqun@linewell.com
 *  2015.9.10
  * 表单设计器的主入口模块
  */
define(["requirejs/utils", "ui", "requirejs/appmain","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig","requirejs/config/pageConfig","requirejs/shortcut", "PageTab", "libui/utils", "libui/uploader", "libui/imagecut"],function(utils,ui, appmain,fieldConfig,fieldPropConfig,pageConfig,shortcut, PageTab, utils){
	
	//当前选中的字段下标
	var INDEX = 0;
	
	////base对象
	//var page = {};

    // 日常模块名
	var moduleName;
	
	// 日常模块说明
	var moduleInfo;
	
	// 图标
	var icon;
	
	var $container = $(".pop-box.module-lib");
	var $iconPreview = $container.find(".icon-preview img");
	var $uploadBtn = $container.find(".js-add-icon");
	var $systemIcons = $container.find(".iconSelect");
	
	var $localIcon = $container.find(".localIconSelect");
	   
   /**
    * 弹出框工具
    */
   var viewWindowUtils = {
	   //初始化
	   init:function(){
		   $("#overlay").click(function(){
			   viewWindowUtils.hide();
		   });
	   },
	   show:function(){
		   $(".preview-right").css("z-index",1000);
		   $(".preview-right").on("click",function(){
			   viewWindowUtils.hide();
		   });
		   $("#overlay").css("z-index",998).show();
	   	   $(".preview-pop").css("z-index",999).show();
	   },
	   hide:function(){
		   $("#overlay").hide();
	   	   $(".preview-pop").hide();
	   }
		   
   }
	/**
	 * 表单渲染
	 */
	function showForm(){
		
		var $fields = $("#fields");
		if(F&&F.length>0){
			$("#fieldProperties").show();
			$("#form_guide").hide();
		  }else{
			$("#fieldProperties").hide();
			$("#form_guide").show();
		  }
		var $fields = $("#fields");
		$fields.children("li.field").remove();
		appmain.fields.createFields(F,$fields);
		var firstLi = $fields.find("li").first();
		INDEX = 0;
		if(firstLi.length>0){
			appmain.fields.setFocused(firstLi,0);
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
	 * 修改F json对象，并创建字段
	 * @param c $li对象
	 * @param type	类型
	 * @param index	下标
	 * @param srcJSON
	 */
	function addDefFieldDom($li, type, index, srcJSON) {
		
		//更改配置
	    var newJSON = eval(fieldConfig[type].json);
	    var baseLBL = newJSON.LBLCN;
	    var baseLBL1 = newJSON.LBLCN1;
	    
	    //将srcJSON 的值赋值给 newJSON
	    $.mergJSON(srcJSON, newJSON);

	    appmain.fields.updateCurForm($li);
	    
	    //根据基础标签名和添加字段所在表，创建唯一性的标签名
	    if(newJSON.LBLCN){
	    	newJSON.LBLCN = appmain.fields.createLable(baseLBL,pageInfo.curForm);
		 }	    
	    //对于日期字段的第二个标签另外做唯一性处理
	    if(appmain[newJSON.FTYPE]&&appmain[newJSON.FTYPE].uniqueLblCn){
	    	appmain[newJSON.FTYPE].uniqueLblCn(newJSON,baseLBL1);
	    }
	   // debugger;
	    //判断是否是子表单,通过ftype来判断
	    //子表单要更新字段数组
	 
	    if($li.attr("subForm")=="subForm"){
	    	var pIndex = $li.parent().parent().parent().parent().attr("index");
	    	//创建字段
	    	appmain.fields.createFiled($li,newJSON);
	    	F[pIndex].FIELDS.splice(index, 0, newJSON);
		    //默认选中
	    	appmain.fields.setFocused($li);
	    }else{
	    	//创建字段
	    	appmain.fields.createFiled($li,newJSON);
		    F.splice(index, 0, newJSON);
		    //默认选中
		    appmain.fields.setFocused($li);
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
	
	//li 重置顺序
	function resetOrder($ul){
		 //默认是fields，还可能是子表单的ul对象
		 if(!$ul){
			 $ul = $("#fields");
		 }
		 var $lis = $ul.children("li.field");
		 //如果没有子字段，则显示 提示
		 console.log($lis.length);
		 if($lis.length==0){
			 if($ul.attr("id") == "fields"){
				 $("#form_guide").show();
			 }
			 $ul.siblings(".warnLi").show();
		 }else{
			 $("#form_guide").hide();
			 $ul.siblings(".warnLi").hide();
		 }
		 $lis.each(function(index,item){
             $(item).attr("id", "f" + index);
             $(item).attr("index", index);
		 });
	}
	
	return {
		/**
		 * 表单初始化
		 * @param type
         */
		init:function(type){
			pageInit(type);
			fieldInit();
			appmain.server.getFormFieldConfig(pageInfo.mAppId,pageInfo.moduleId,
				pageInfo.formId,function(formConfig){
					F=formConfig;
					pageInfo.preSaveF = JSON.parse(JSON.stringify(formConfig));
					showForm();
				});
			//遮罩初始化
			viewWindowUtils.init();

			/**
			 * 页面字段初始化：分为：新增审批页面和日常表单页面
			 */
			function pageInit(type){
				var filedArray =null;
				var addFields = $("#addFields");

				if(type=="approvePage"){
					filedArray = pageConfig.approvePage;
					$(".approveSetting").removeClass("hide");
					$("#flowDesigner").removeClass("hide");
				}else{
					$("#flowDesigner").addClass("hide");
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
						$ul.append($('<li  ftype="'+column.name+'"><a  id="'+column.id+'" class="btn btn-white" title="'+column.description+'" href="javascript:void(0);"><b></b>'+column.title+'</a></li>'));
					});
				});


				//给所有控件绑定点击事件，点击控件，就直接追加到表单
				$("#addFields li").bind("click",function(){
					var ftype = $(this).attr("ftype");
					var $li = $(fieldConfig.field_li);
					var index ;

					//1.判断是否空表
					//2.获得字段追加位置index
					if(F&&F.length>0){
						index = F.length;
					}else{
						index = 0;
					}
					$("#form_guide").hide();
					$("#fieldProperties").show();
					$("#nofields").hide();
					$("#formButtons").show();
					$li.attr("index", index);
					$li.attr("id", "f" + index);
					$("#fields").append($li);
					//3.根据字段类型，构造其li，并添加进F同时渲染li
					addDefFieldDom($li, ftype, index);
					//4.给生成的li添加事件
					//appmain.fields.liMouseEnter($li);
				});
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
				//appmain.fields.liMouseEnter($("#fields>li"));

				$("li", "#addFields").draggable({helper: "clone",cursorAt: { top: -2, left: -2 },
					start:function(event,ui){
						pageInfo.isdraggable = true;
						if(pageInfo.$line==null){
							pageInfo.$line = $(fieldConfig.field_li2);
						}
					},
					stop:function(event,ui){

						$("#nofields").hide();
						$("#formButtons").show();

						pageInfo.isdraggable = false;
						if(pageInfo.$currentLi!=null||pageInfo.$currentUl!=null){

							$("#fieldProperties").show();
							//创建
							var $li = $(fieldConfig.field_li);
							var index = null;
							var type = $(ui.helper.context).attr("ftype");

							//当表单尚未添加字段的时候，绑定ul
							if(pageInfo.inType=='ul'){
								if(pageInfo.$currentUl!=null){
									//判断是否是子表单
									if(pageInfo.$currentUl.attr("subForm")=='subForm'){
										//子表单中不能嵌套子表单
										//这里判断是否是ftype=detailTable,相等则提示
										if(type=='detailTable'){
											$.showPop("明细子表里面不允许嵌套明细子表");
											pageInfo.$currentUl=null;
											pageInfo.$line.remove();
											pageInfo.currentY = -1;
											return;
										}
										//将li也做标记
										$li.attr("subForm","subForm");
										$("#form_guide").hide();
										pageInfo.$currentUl.parent().find(".warnLi").hide();
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
											$.showPop("明细子表里面不允许嵌套明细子表");
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

							//appmain.fields.liMouseEnter($li);

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
						var targetIndex = ui.item.index();

						var order = parseInt(ui.item.attr("id").substring(1));
						//当前排序的下标
						//判断是否子列表排序
						if(ui.item.attr("subForm")=='subForm'){//子列表排序
							var pli = ui.item.parent().parent().parent().parent();
							var pIndex = parseInt(pli.attr("index"),10);
							var jsonData = F[pIndex];//INDEX 主表序列
							var data = jsonData.FIELDS[order];
							jsonData.FIELDS.splice(order, 1);
							jsonData.FIELDS.splice(targetIndex, 0, data);
							resetOrder($(ui.item).parent());
						}else{
							targetIndex = targetIndex-1;
							//这边有个bug：第0项的时候，显示0，否则显示的值，是实际值-1
							if(targetIndex<0){
								targetIndex=0;
							}
							//两个移动元素交换数据位置
							var data = F[order];
							F.splice(order,1);
							F.splice(targetIndex, 0, data);
							//重新排序
							resetOrder();
						}
					}
				});


				//选中控件事件绑定 和 鼠标悬浮特效
				$("li.field", "#fields").live({click: function(event) {
					var $this = $(this);
					//显示字段属性区域
					$("#fieldProperties").show();

					//    	//如果切换点击字段，则让"字段标签输入栏失焦"
					//		if(!$this.hasClass("focused")){
					//			$("#LBLCN").blur();
					//			$("#LBLCN1").blur();
					//			$("#toolTip").blur();
					//		}

					//如果切换点击字段，则让"字段标签输入栏失焦"
					$("#LBLCN").blur();
					$("#LBLCN1").blur();
					$("#toolTip").blur();
					//对数字控件而言
					$("#min").blur();
					$("#max").blur();
					//对地址控件而言
					$("#defval_detail").blur();

					INDEX = parseInt($this.attr("index"));
					appmain.fields.setFocused($this);
					event.stopPropagation();
				},mousemove:function(e){
					if(pageInfo.isdraggable){
						console.log(($(this).offset().top+$(this).outerHeight()/2)===pageInfo.currentY);
					}

					if(pageInfo.isdraggable){
						var $this = $(this);
						pageInfo.$currentLi = $(this);
						pageInfo.inType="li";
						//$(this).after(pageInfo.$line);
						pageInfo.currentY = $this.offset().top+($this.outerHeight()/2);
					}else{
						pageInfo.currentY= 0 ;
					}
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
						var $pul = $li.parent();
						$li.remove();
						F[pIndex].FIELDS.splice(index,1);
						resetOrder($pul);
					}else{
						//删除数据
						$li.remove();
						F.splice(index,1);
						resetOrder();
					}
					//删除时，隐藏内容属性区域
					$("#fieldProperties").hide();

					//去除绑定的事件（内容，样式的点击事件）
					$("#contentab").unbind("click");
					$("#styletab").unbind("click");

					e.preventDefault();
					e.stopPropagation();
				}
				});


				var SaveModule = function(options){

					// 参数追加
					this.options = $.extend(true, {
						mAppId : pageInfo.mAppId,
						moduleId : pageInfo.moduleId,
					}, options);
				}

				/**
				 * 审批保存
				 */
				SaveModule.prototype.save = function(params, callback){
					var self = this
					var $saveForm = $("#saveForm");

					// 保存前设置按钮不可用
					var isDisabled =$saveForm.attr("disabledSend");
					if(isDisabled=="true"){
						$.showPop("正在保存请稍候或者刷新界面...");
						return;
					}
					$saveForm.attr("disabledSend","true");

					console.log(F);
					// 保存
					appmain.server.saveFormFieldConfig(this.options, params, function(data){
						if(data.success){
							if(self.options.operType == "updateModuleInfo"){
								$.showPop("更新成功");
							}else{
								$.showPop("保存成功");
								pageInfo.preSaveF = JSON.parse(JSON.stringify(F));
								//保存完了以后，重新刷新数据
								appmain.server.getFormFieldConfig(
									pageInfo.mAppId,pageInfo.moduleId,
									pageInfo.formId,function(formConfig){
										F=formConfig;
										pageInfo.preSaveF = JSON.parse(JSON.stringify(formConfig));
										showForm();
									});
							}
							callback && callback();
						}else{
							if(data.message && $.trim(data.message) != ""){
								showMsg(data.message);
							}
						}
						$saveForm.attr("disabledSend","false");
					});
				}


				/**
				 * 显示提示信息
				 * @param msg  提示显示
				 */
				var showMsg = function(msg){
					var $msg = $(".tip");
					$msg.removeClass("hide").html(msg);

					// 定时器
					setTimeout(function(){
						$msg.addClass("hide");
					}, 3000);
				}

				var maskPop = {

					/**
					 * 关闭弹窗
					 */
					closePop : function(){

						$("#mask").addClass("hide").removeAttr("type");
					},

					/**
					 * 打开弹窗
					 */
					openPop : function(){
						$("#mask").removeClass("hide");
					},

					/**
					 * 提交
					 */
					submit : function(callback){
						var url = "app.action?type=moduleApproveModuleIndexAction";
						var saveModule = new SaveModule({
							"operType" : "saveModuleInfoAndFormInfo",
							"formId" : pageInfo.formId,
							"config" : F,
							"name" : moduleName,
							"remark" : moduleInfo,
							"icon" : icon
						})

						saveModule.save(url, function(){
							callback && callback();
						});

					},

					/**
					 * 更新模块信息
					 */
					update : function(callback){
						var url = "app.action?type=moduleApproveModuleIndexAction";
						var updateModule = new SaveModule({
							"operType" : "updateModuleInfo",
							"config" : F,
							"name" : moduleName,
							"remark" : moduleInfo,
							"icon" : icon
						})

						updateModule.save(url, function(){
							callback && callback();
						});

					},

					/**
					 * 初始化加载
					 */
					load : function(flag){

						// 回填模块信息
						if(flag){
							$.ajax({
								url : "app.action?type=moduleApproveModuleIndexAction&operType=getModuleInfo",
								type : "post",
								dataType : "json",
								data : {
									mAppId : pageInfo.mAppId,
									moduleId : pageInfo.moduleId
								},
								success : function(data){
									var res = data.content;
									if(data.success){
										$("#moduleName").val(res.name);

										$("#moduleInfo").val(res.remark);
										$iconPreview.attr("src", res.icon);
									}
								}
							})// end ajax
						}

						var systemIcons = new PageTab({
							$combobox : $systemIcons,
							pageSize : 12
						});

						var localIcons = new PageTab({
							$combobox : $localIcon,
							url : "app.action?type=mappPictureAction&operType=listModuleLogo",
							mapp_id : pageInfo.mAppId,
							pageSize : 10
						});

						// 触发整个事件
						systemIcons.load(1, null);
						localIcons.load(1, null);
					}
				}

				// 页签事件
				$container.find(".tabs-btn li").click(function () {
					var $this = $(this);
					var forWrapper = $this.attr("type");
					$(".tab-content-icon").addClass("hide");
					$("#" + forWrapper).removeClass("hide");

					$this.addClass("current").siblings(".current").removeClass("current");
				});

				// 系统默认图标
				$(".icon-list").on("click", "li", function() {
					var url = $(this).find("img").attr("src");
					$iconPreview.attr("src", url);
				});

				// 设置审批
				$("#reSetting").click(function(){
					var flag = true
					maskPop.openPop();
					maskPop.load(flag);
					$("#mask").attr("type", "reflesh");
				})

				// 提交
				$("#createSubmit").click(function(){

					moduleName = $.trim($("#moduleName").val());
					moduleInfo = $.trim($("#moduleInfo").val());
					icon = $iconPreview.attr("src");

					// 日常名为空
					if(moduleName == ""){
						showMsg("请输入审批模块名称");
					}else if(moduleName.length > 10){
						showMsg("审批模块名称，最多可输入10个字");
					}else if(moduleInfo.length > 25){
						showMsg("说明内容，最多可输入20个字");
					}else if($("#mask").attr("type") == "reflesh"){

						// 更新模块信息
						maskPop.update(function(){
							maskPop.closePop();
						})
					}else{

						// 提交保存
						maskPop.submit(function(){
							maskPop.closePop();
						});
					}
				})

				// 上传logo按钮事件
				var uploader = new ui.Uploader({
					filename: "file",
					uploadHandler : uploadHandler
				});
				$uploadBtn.click(function () {
					uploader.start();
				});

				function uploadHandler(file, form){
					var fileReader = new FileReader();
					fileReader.onload = function () {
						var url = fileReader.result;
						imgcut.start({image: url});
					};
					fileReader.readAsDataURL(file);
				}

				var imgcut = new ui.ImageCut({
					local : true
				}, function(imgBase64Code) {
					$.ajax({
						url: "app.action?type=mappPictureAction&operType=uploadModuleLogo&mapp_id=" + LINEWELL.page.mapp_id,
						type: "POST",
						dataType: "json",
						data: {pic : imgBase64Code},
						success: function(data) {
							if (data.success) {
								var url = data.content.url;
								$iconPreview.attr("src", url);
								maskPop.load()
							} else {
								ui.alert({msg: data.message})
							}
						}
					})
				});

				/**
				 * 日常和审评保存
				 */
				var moduleSave = function(){
					var url = "app.action?type=appFormDesignAction";
					var secondSave = new SaveModule({
						"operType" : "saveFormFields",
						"formId" : pageInfo.formId,
						"config" : F
					})
					secondSave.save(url);
				}

				// 取消创建
				$("#js-close-btn").click(function(){
					maskPop.closePop();

				})

				//点击流程设计跳转至流程设计页面
				$("#flowDesigner").click(function(){

					//弹出是否保存提示框
					$("#maskFlow").removeClass("hide");

					//点击关闭按钮事件
					$(".close-btn").click(function(){
						$("#maskFlow").addClass("hide");
					})

					//不保存事件
					$("#noSaveSubmit").click(function(){

						// 跳转至流程设计页面
						location.href = "../flowdesigner/index.jsp?mapp_id="+pageInfo.mAppId+"&moduleId="+pageInfo.moduleId+"&formId="+pageInfo.formId+"&page_type="+pageInfo.pageType;
					})

					//保存事件
					$("#saveSubmit").click(function(){

						$("#saveForm").click();
						// 跳转至流程设计页面
						location.href = "../flowdesigner/index.jsp?mapp_id="+pageInfo.mAppId+"&moduleId="+pageInfo.moduleId+"&formId="+pageInfo.formId+"&page_type="+pageInfo.pageType;
					})
				})


				// 保存数据
				$("#saveForm").click(function(){

					var $this = $(this);
					var pageType = $("#pageType").val();
					pageInfo.formLabelObjects = [];
					//获得当前表单里面所有字段的标签对象
					appmain.fields.fillLabelObjectArray(pageInfo.formLabelObjects,F);
					//1.标签名非空验证
					if(!appmain.validate.emptyLabelValidate(pageInfo.formLabelObjects)){
						$.showPop("请输入字段标签名称");
						return;
					}
					//2.1标签名长度验证：
					if(!appmain.validate.labelLengthValidate(pageInfo.formLabelObjects)){
						$.showPop("字段标签，最多可输入10个字");
						return;
					}
					//2.2提示文字长度验证：
					if(!appmain.validate.tooptipLengthValidate(pageInfo.formLabelObjects)){
						$.showPop("提示文字，最多可输入20个字");
						return;
					}
					//3.标签名同名验证：(不同表中的标签名允许相同，表分为子表和主表)
					if(!appmain.validate.RepeateLabelValidate(pageInfo.formLabelObjects)){
						$.showPop("字段标签重名，请重新输入");
						return;
					}
					//4.如果存在子表，则进行子表字段不能为空验证
					if(!appmain.validate.emptySubFormValidate(pageInfo.formLabelObjects)){
						return;
					}

					if(pageType == "approvePage"){
						$.ajax({
							url : "app.action?type=moduleApproveModuleIndexAction&operType=isNew",
							type : "post",
							dataType : "json",
							data : {
								mAppId : pageInfo.mAppId,
								moduleId : pageInfo.moduleId
							},
							success : function(data){
								var res = data.content;
								if(!data.success){
									return;
								}
								if(res){
									maskPop.openPop();
									maskPop.load(true);
								}else{
									moduleSave();

								}
							}
						})
					}else{
						moduleSave();
					}

				});


				//审批单设置,
				$("#formSet").click(function(){
					$.lightBox({url: "../jsform/rs/html/publicdatasetting.html",confirm: function() {
						//console.log("确认按钮点击事件");
					},loaded: function() {
						//console.log("加载完毕以后执行");
					},cancel:function(){
						//console.log("取消按钮执行事件");
					}
					});
				});

				//快捷键插件配置
				var shortCutOptions = {
					disable_in_input:true
				}
				//设置快捷键
				shortcut.add("Ctrl+C",function() {
					$("#copy").click();
				},shortCutOptions);

				//设置快捷键
				shortcut.add("Ctrl+V",function(){
					$("#paste").click();
				},shortCutOptions);

				//是否需要启用快捷键判断方法，:选中类型
				function checkIsNeed(){
					var sel = window.getSelection();
					if(sel.type=='Range')
						return false;
					return true;
				}


				//复制按钮点击事件
				$("#copy").click(function(){
					pageInfo.$copyLi = $("#fields").find("li.focused").first();
					//没有选中
					if(pageInfo.$copyLi.length==0){
						$.showPop("请选择要复制的组件");
					}else{
						//显示粘贴
						$("#paste").removeAttr("disable");
						$.showPop("已复制到剪切板(Ctrl+V粘贴组件)");
					}

					//获取值保存在pageInfo.copyData变量中 ,考虑子表的情况
					var $li = pageInfo.$copyLi;
					var index = parseInt($li.attr("index"),10);
					if($li.attr("subForm")=="subForm"){
						var pIndex = $li.parent().parent().parent().parent().attr("index");
						//创建字段
						pageInfo.copyData = $.cloneJSON(F[pIndex].FIELDS[index]);
					}else{
						pageInfo.copyData = $.cloneJSON(F[index]);
					}
					pageInfo.copyData.FORMFIELDID="";
				});


				/**
				 * 预览按钮点击
				 */
				$("#pView").click(function(){

					$("#viewForm").load("../jsform/rs/html/showAppForm.html",function(){
						viewWindowUtils.show();
						appmain.fields.createFields(F,$("#preview-frame"));
					});
				});

				//粘贴按钮点击事件
				//在目标的下方插入控件,如果没有选中目标，则添加到ul的第一个li上
				$("#paste").click(function(e){

					//获取当前选中节点对象
					var $currentFoucsedLi = getInsertPosition();
					//如果没有聚焦节点，查找第一个节点
					if($currentFoucsedLi==null){
						return;
					}

					//克隆当前对象
					if(!pageInfo.$copyLi)
						return;
					var clonObj = pageInfo.$copyLi.clone();

					//调整F和顺序
					//更新F
					//注意区分 子表字段和非子表字段

					//复制操作也不允许明细子表嵌套明细子表
					if(clonObj.attr("ftype") == "detailTable" && $currentFoucsedLi.attr("subform")){
						$.showPop("明细子表里面不允许嵌套明细子表");
						return;
					}

					//如果插入点非详细子表，而被复制的是详细子表的内容，要删除suForm
					clonObj.removeAttr("subForm");

					//在当前选中节点的   上  方插入新元素
					if($currentFoucsedLi.is('ul')){
						$currentFoucsedLi.append(clonObj);
					}else{
						$currentFoucsedLi.before(clonObj);
					}

					//获取插入节点的下标
					var index = parseInt($currentFoucsedLi.attr("index"),10);
					//debugger;
					//$li, ftype, index
					//判断是否是子表单
					if($currentFoucsedLi.attr("subForm")=='subForm'){
						clonObj.attr("subForm","subForm");
						resetOrder($currentFoucsedLi.parent());
					}else{
						resetOrder();
					}
					addDefFieldDom(clonObj,clonObj.attr("ftype"),index,pageInfo.copyData);
					e.preventDefault();

					//获取插入点
					function getInsertPosition(){
						var $ul = $("#fields");
						var $currentFoucsedLi = $ul.find("li.focused").first();
						//如果没有聚焦节点，查找第一个节点
						if($currentFoucsedLi.length==0){
							$currentFoucsedLi = $ul.children().first();
							if($currentFoucsedLi.length!=0){
								return  $currentFoucsedLi;
							}else{
								//如果ul对象没有子元素，返回本身
								$currentFoucsedLi =  $ul;
								return $currentFoucsedLi;
							}
						}else{
							return $currentFoucsedLi;
						}
					}

				});
			};
		},
		/**
		 * 创建预览界面
		 * @param mAppId
		 * @param moduleId
		 * @param formId
         * @param $target
         */
		createView:function(mAppId,moduleId,formId,$target){
			appmain.server.getFormFieldConfig(mAppId,moduleId,formId,function(configData){
				appmain.fields.createView(configData,$target);
			});
		}
	};
});
