/**
 * 日常模块创建
 * 
 * @author hlj@linewell.com
 * @since 2015/9/15
 */
define("addPop", ["jquery", "ui", "libui/utils", "PageTab",  "notify", "libui/uploader", "libui/imagecut"], function($, ui, utils, PageTab, notify){
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

	// 提交
	$("#createSubmit").click(function(){
		
		moduleName = $.trim($("#moduleName").val());
		moduleInfo = $.trim($("#moduleInfo").val());
		
		// 日常名为空
		if(moduleName == ""){
			showMsg("请输入日常模块名称");
		}else if(!utils.inputValidate(moduleName)){
			showMsg("日常模块名称，最多可输入10个字");
		}else if(moduleInfo.length > 25){
			showMsg("说明内容，最多可输入20个字");
		}else{
			submit();
		}
	});
	
	function submit(){
		icon = $iconPreview.attr("src");
		$.ajax({
			url : "app.action?type=moduleAppModuleAdminAction&operType=create",
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
				if(!data.success){
					showMsg(data.message);
					return 
				}else{
					location.href = "../pageDaily.jsp?page_id=" + ret.page_id + "&mapp_id=" + ret.mapp_id + "&moduleId=" + ret.moduleId;
				}				
			}		
		})		
	}

	// 系统默认图标
	$(".icon-list").on("click", "li", function() {
		var url = $(this).find("img").attr("src");
		$iconPreview.attr("src", url);
	});
		
	/**
	 * 显示提示信息
	 * 
	 * @param msg
	 *            提示显示
	 */
	var showMsg = function(msg){
		var $msg = $(".tip");
		 $msg.removeClass("hide").html(msg);
		 
		 // 定时器
		 setTimeout(function(){
			 $msg.addClass("hide");
		 }, 3000);
	}
	
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
			 $(".module-confirm").addClass("hide");
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
                    publicMethods.load()
                } else {
                    ui.alert({msg: data.message})
                }
            }
        })
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
			
			var status;
		
			// 循环输出应用
			for(var i = 0, len = LINEWELL.page.daily_list.length; i<len; i++){
				html += mustache.to_html($("#dailyItem").html(), LINEWELL.page.daily_list[i]);
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
				addPop.show();
				addPop.load();
			});
			
			// 弹框取消按钮
			$(".mask #js-close-btn").on("click", function () {
				addPop.hide();
			});
			 
			$("#statusTabs li").click(function () {
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
			
			// 改变状态
			$("#dailyList").on("click", ".edit-list li", function(){
				var $this = $(this);
				
				var enable = $this.attr("type");
				var $moduleList = $this.parents(".module-item");
				moduleId = $moduleList.attr("id");
				var moduleClass = $this.attr("class"); 
				
				if($this.hasClass("disabled")){
					return;
				}
				// 编辑
				if( enable == "EDIT"){
					window.location.href = "../pageDaily.jsp?page_id=" + $(this).parent(".page-item").attr("id") + "&mapp_id=" + LINEWELL.page.mapp_id + "&moduleId=" + $(this).parents(".module-item").attr("id");
				
				// 删除
				}else if(enable == "DELETE"){
					$(".mask").removeClass("hide");
					$(".mask .module-lib").addClass("hide");
					
					notify.confirm("确定删除此模块?", function(){
						deleteModule();
					});
			    
				// 状态切换
				}else{
					$.ajax({
						url : "app.action?type=moduleAppModuleAdminAction&operType=statusButtonHandle",
						data : {
							buttonType : enable,
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

							location.reload();
						}
					});				
				}
			});	
			
			
			/**
			 * 删除模块
			 */
			function deleteModule(){
				$.ajax({
					url : "app.action?type=moduleAppModuleAdminAction&operType=delete",
					data : {moduleId : moduleId, mAppId : LINEWELL.page.mapp_id},
					dataType : "json",
					type : "post",
					success : function(data){
						var state = $(".tabs-btn li.selected").attr("status");
						
						// 删除成功
						if(data.success){					
							window.location = "dailyAdmin.jsp?mapp_id="+LINEWELL.page.mapp_id+"&state="+state;
						}else{
							ui.alert({msg: data.message});
						}						
					}
				});
			}
		}
	};
	
	$(function(){
		
		// 初始化数据
		daily.initData();
		
		// 绑定事件
		daily.bindEvent();
	});
});