/**
 * 日常模块创建
 * @author hlj@linewell.com
 * @since 2015/9/15
 */
define("addPop", ["jquery", "ui", "libui/utils", "PageTab",  "notify", "lib/mustache", "libui/uploader", "libui/imagecut"], function($, ui, utils, PageTab, notify, mustache){
	var $container = $(".pop-box.module-lib");
	var $iconPreview = $container.find(".icon-preview img");
	var $uploadBtn = $container.find(".js-add-icon");
	var $systemIcons = $container.find(".iconSelect");
	
	var $localIcon = $container.find(".localIconSelect");
	
	// 日常模块名
	var moduleName;
	
	// 日常模块说明
	var moduleInfo;
	
	// 图标
	var icon;
	
	// 模块Id
	var templateId = "";
	
	 // 页签事件
	$container.find(".tabs-btn li").click(function () {
        var $this = $(this);
		 var forWrapper = $this.attr("type");
		 $(".tab-content-icon").addClass("hide");
		 $("#" + forWrapper).removeClass("hide");
		
		 $this.addClass("current").siblings(".current").removeClass("current");
	 });
	
	$("#tabList").on("click", "li", function(){
		
		$("#tabList li").removeClass("current");
		$(this).addClass("current");
	});

	// 提交
	$("#createSubmit").click(function(){
		
		moduleName = $.trim($("#moduleName").val());
		moduleInfo = $.trim($("#moduleInfo").val());
		
		
		// 日常名为空
		if(moduleName == ""){
			showMsg("请输入日常模块名称");
		}else if(moduleName.length > 10 ){
			showMsg("日常模块名称，最多可输入10个字");
		}else if(moduleInfo.length > 20){
			showMsg("说明内容，最多可输入20个字");
		}else{
			
			submit();
		}
	});
	
	
	
	function submit(){
		icon = $iconPreview.attr("src");
		notify.progressing();
		$.ajax({
			url : "app.action?type=moduleAppModuleAction&operType=create",
			data : {
				name : moduleName,
				remark : moduleInfo,
				icon : icon,
				templateId : templateId,
				mAppId : LINEWELL.page.mapp_id
			},
			type : "post",
			dataType : "json",
			success : function(data){
				var ret = data.content;
				notify.closeProgressing();
				if(!data.success){
					showMsg(data.message);
					return 
				}else{
					location.href = "../pageDaily.jsp?page_id=" + ret.page_id + "&mapp_id=" + ret.mapp_id + "&moduleId=" + ret.moduleId;

				}				
			}		
		});		
	}

	// 系统默认图标
	$(".icon-list").on("click", "li", function() {
		var url = $(this).find("img").attr("src");
		$iconPreview.attr("src", url);
	});
		
	/**
	 * 显示提示信息
	 * 
	 * @param msg  提示显示          
	 */
	var showMsg = function(msg){
		var $msg = $(".tip");
		 $msg.removeClass("hide").html(msg);
		 
		 // 定时器
		 setTimeout(function(){
			 $msg.addClass("hide");
		 }, 3000);
	};
	
	/**
	 * publish API
	 */
	var publicMethods =  {
		
		/**
		 * 显示弹窗
		 */
		show : function(){ 		 
			 $(".mask").removeClass("hide");
			 $(".mask .module-lib").removeClass("hide");
			 $(".module").val("").eq(0).focus();
		},
		
		/**
		 * 隐藏弹窗
		 */
		hide : function(){
			$(".mask").addClass("hide");
		},
		
		/**
		 * 本地图片加载
		 */
		load : function(){
			
			var systemIcons = new PageTab({
				$combobox : $systemIcons,
				pageSize : 12
			});
			
			var localIcons = new PageTab({
				$combobox : $localIcon,
				url : "app.action?type=mappPictureAction&operType=listModuleLogo",
				mapp_id : LINEWELL.page.mapp_id,
				pageSize : 10
			});
			
			// 触发整个事件
			systemIcons.load(1, null);
			localIcons.load(1, null);
		 },
		
		/**
		 * 模块列表
		 */
		temList : function(){
			// 模块列表
			$.ajax({
				url : "app.action?type=moduleAppModuleAction&operType=getTemplateModules",
				type : "post",
				dataType : "json",
				success : function(data){
					if(!data.success){
						return;
					}
					var html = "";
					
					html += mustache.to_html($("#temList").html(), data);
					
					// 追加
					$("#tabList").html(html);
					
					$("#tabList").prepend("<li class='current'>空白模板</li>");
				}
			});
		}		
	};
	
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
                    publicMethods.load();
                } else {
                    ui.alert({msg: data.message});
                }
            }
        });
    });
		
	return publicMethods;
});

define([ "jquery", "ui", "libui/utils", "notify", "lib/mustache", "addPop"], function($, ui, utils, notify, mustache, addPop) {

	var $dailyList = $("#dailyList");
		
	var daily = {
		
		 /**
		 * 初始化数据
		 */
		initData : function(){
		 
			html = "";
		
			// 循环输出应用
			for(var i = 0, len = LINEWELL.page.daily_list.length; i<len; i++){
				var data = $.extend(true, {
					normalButton : isNormalButton,
					isStartButton : isStartButton
				}, LINEWELL.page.daily_list[i]);
				html += mustache.to_html($("#dailyItem").html(), data);
			}
			
			/**
			 * 判断是否为普通按钮
			 */
			function isNormalButton() {
				return this.buttonType != "ENABLE" && this.buttonType != "DISABLE" && (this.iconCls = this.buttonType === "DELETE" ? "icon-delete" : "icon-edit", true);
			}
			
			function isStartButton() {
				return this.buttonType == "ENABLE";
			}
			
			$dailyList.html(html);
		},
		 
		/**
		 * 绑定事件
		 */
		bindEvent : function(){			 
			 
			var sendData = {};
			var self = this;
			var moduleId;
			 
			// 创建日常弹框
			$("#creatDaily").on("click", function () {
				
				// 显示弹出框
				addPop.show();
				
				// 加载分页
				addPop.load();
				
				// 加载模块列表
				addPop.temList();
			});
			 
			// 弹框取消按钮
			$(".mask #js-close-btn").on("click", function () {
				addPop.hide();
			});
			 
			$("#statusTabs li").click(function (){ 
				var $this = $(this);
				var status = $this.attr("status");
				$this.addClass("selected").siblings(".selected").removeClass("selected");
				switch (status) {
					case "ALL" : $dailyList.find("li.module-item").show();break;
					case "ENABLED" : $dailyList.find("li.module-item").hide().filter(".enable").show();break;
					case "DISABLE" : $dailyList.find("li.module-item").hide().filter(":not(.enable)").show();break;
				}
			});
			$("#statusTabs li.selected").trigger("click");
			
			/**
			 * 删除模块
			 */
			function deleteModule(){
				$.ajax({
					url : "app.action?type=moduleAppModuleAction&operType=delete",
					data : {moduleId : moduleId, mAppId : LINEWELL.page.mapp_id},
					dataType : "json",
					type : "post",
					success : function(data){						
						var state = $(".tabs-btn li.selected").attr("status");
						
						// 删除成功
						if(data.success){					
							window.location = "daily.jsp?mapp_id="+LINEWELL.page.mapp_id+"&state="+state;
						}else{
							ui.alert({msg: "删除失败"});
						}						
					}
				});
			}
			
			// 改变模块状态
			$("#dailyList").on("click", ".module-item li", function(){
				var $this = $(this);
				var type = $this.attr("type");
				var $moduleList = $this.parents(".module-item");
				moduleId = $moduleList.attr("id");
				
				// 编辑
				if(type == "EDIT"){
					
					// 是否可点击
					if(!$this.hasClass("disabled")){
						window.location.href = "../pageDaily.jsp?page_id=" + $moduleList.attr("indexPageId") + "&mapp_id="
						+ LINEWELL.page.mapp_id + "&moduleId=" + $moduleList.attr("id");
					}				
				
				// 删除
				}else if(type == "DELETE"){
					if(!$this.hasClass("disabled")){
						$(".mask").removeClass("hide");
						$(".mask .module-lib").addClass("hide");
						
						notify.confirm("确定删除此模块?", function(){
							deleteModule();
						});
					}				
					
				// 改变状态
				}else{
					if (parseInt($this.data("status") || "0") > 0) { // 0等待操作， 1正在切换到启用， 正在切换到禁用
						return;
					}

					$this.find("[type=checkbox]").attr("disabled", "disabled");
					$.ajax({
						url : "app.action?type=moduleAppModuleAction&operType=statusButtonHandle",
						data : {
							buttonType : type,
							mAppId : LINEWELL.page.mapp_id,
							moduleId : moduleId
						},
						dataType : "json",
						type : "post",
						success : function(data){
							if(!data.success){
								ui.alert({msg: data.message});
								return;
							}
							
							$this.find("[type=checkbox]").removeAttr("disabled");
							if (type == "ENABLE") {
								$this.attr("type", "DISABLE");
								$this.data("status", "1");
								$this.parents(".module-item").addClass("enable");
								$this.find("label").click();
								
								// 普通模块需禁用删除，先通过编辑按钮是否可编辑判断是否为系统模块
								if ($this.siblings("[type=EDIT]").is(":not(.disabled)")) {
									$this.siblings("[type=DELETE]").addClass("disabled");
								}
								$this.find("[type=checkbox]").attr("ckecked", true);
							} else {
								$this.attr("type", "ENABLE");
								$this.data("status", "2");
								$this.parents(".module-item").removeClass("enable");
								$this.find("label").click();
								
								if ($this.siblings("[type=EDIT]").is(":not(.disabled)")) {
									$this.siblings("[type=DELETE]").removeClass("disabled");
								}
								$this.find("[type=checkbox]").attr("ckecked", false);
							}
						}
					}).always(function (data) {
						$this.data("status", "0");
					}); // ajax end					
				}
				return false;
			});
		}
	};
	
	$(function(){
		
		// 初始化数据
		daily.initData();
		
		// 绑定事件
		daily.bindEvent();
	});
});