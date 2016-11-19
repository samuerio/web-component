/**
 * 审批普通模块
 * @author hlj@linewell.com
 * @since 2015/10/10
 */
define([ "jquery", "ui", "libui/utils", "notify", "lib/mustache"], function($, ui, utils, notify, mustache) {
	
	var $approveList = $("#approveList");
	
	var approve = {
			
		/**
		 * 初始化数据
		 */	
		initData : function(){
			
			var html = "";
			
			// 循环输出应用
			for(var i = 0, len = LINEWELL.page.approve_list.length; i<len; i++){
				var data = $.extend(true, {
					normalButton : isNormalButton,
					isStartButton : isStartButton
				}, LINEWELL.page.approve_list[i]);
				html += mustache.to_html($("#approveItem").html(), data);
			}
			
			/**
			 * 判断是否为普通按钮
			 */
			function isNormalButton() {
				return this.buttonType != "ENABLE" && this.buttonType != "DISABLE" && (this.iconCls = "icon-" + this.buttonType.toLowerCase(), true);
			}
			
			function isStartButton() {
				return this.buttonType == "ENABLE";
			}
			
			$approveList.html(html);
		},
		
		/**
		 * 绑定事件
		 */
		bindEvent : function(){
			
			// 创建审批
			$("#creatApprove").on("click", function () {
				$(".mask").removeClass("hide");
				$(".pop-box.create").removeClass("hide");
				loadTemplates(1, true);
			});
			
			$(".close-btn").on("click", function () {
				$(".mask").addClass("hide");
			});
			
			$("#createPop").on("click", ".js-create-btn", function () {
				create($(this).attr("templateId") || "");
			})
			
			// 翻页的事件
			var currentPageIndex = 1;
			$("#createPop").on("click", ".pages a:not(.js-prev, .js-next)", function () {
				var $this = $(this);
				loadTemplates(parseInt($this.text()));
			})
			
			$("#createPop").on("click", ".pages a.js-prev", function () {
				var $this = $(this);
				if ($this.is(".disabled")) {
					return;
				}
				loadTemplates(currentPageIndex - 1);
			})
			
			$("#createPop").on("click", " .pages a.js-next", function () {
				var $this = $(this);
				if ($this.is(".disabled")) {
					return;
				}
				loadTemplates(currentPageIndex + 1);
			})
			
			$("#statusTabs li").click(function (){ 
				var $this = $(this);
				var status = $this.attr("status");
				$this.addClass("selected").siblings(".selected").removeClass("selected");
				switch (status) {
					case "ALL" : $approveList.find("li.module-item").show();break;
					case "ENABLED" : $approveList.find("li.module-item").hide().filter(".enable").show();break;
					case "DISABLE" : $approveList.find("li.module-item").hide().filter(":not(.enable)").show();break;
				}
			});
			$("#statusTabs li.selected").trigger("click");
			
			/**
			 * 加载模版
			 * @param {Integer} pageIndex 加载的页码
			 */
			function loadTemplates(pageIndex, refresh) {
				if (currentPageIndex == pageIndex && !refresh) {
					return;
				}
				currentPageIndex = pageIndex;
				$("#createPop dl").empty();
				$.ajax({
					url : "app.action?type=moduleApproveAppModuleAction&operType=getTemplateModules",
					dataType : "json",
					data : {
						mAppId : LINEWELL.page.mapp_id,
						page : pageIndex
					}
				}).done(function (data) {
					if (!data.success) {
						return;
					} 
					
					var total = parseInt(data.content.total/6) + parseInt((data.content.total%6 + 5)/6);
					if (currentPageIndex > total) {
						loadTemplates(total);
						return;
					}
					
					data.content.pageNumbers = [];
					for (var i = 1; i <= total; i++) {
						data.content.pageNumbers.push({
							cur : currentPageIndex === i,
							pageNumber : i
						})
					}
					
					data.content.isFirstPage = function () {
						return currentPageIndex === 1;
					}
					
					data.content.isLastPage = function () {
						return currentPageIndex === total;
					}
					
					var tpl_templateItem = $("#templateItem").html();
					$("#createPop dl").append(mustache.render(tpl_templateItem, data.content));
				});
			}
			
			/**
			 * 创建模块
			 * @param {String}templateId 模版标识
			 */
			function create (templateId) {
				$.ajax({
					url : "app.action?type=moduleApproveAppModuleAction&operType=create",
					data : {
						mAppId : LINEWELL.page.mapp_id,
						templateId : templateId
					},
					dataType : "json"
				}).done(function (data) {
					if (data.success) {
						window.open("../jsform/index.jsp?page_type=approvePage" + "&mapp_id=" + LINEWELL.page.mapp_id + 
								"&moduleId=" + data.content.moduleId + "&formId=" + data.content.formId, "_blank");
					} else {
						ui.alert({msg: data.message});
					}
				});
			}
			
			/**
			 * 删除模块
			 */
			function deleteModule(){
				$.ajax({
					url : "app.action?type=moduleApproveAppModuleAction&operType=delete",
					data : {moduleId : moduleId, mAppId : LINEWELL.page.mapp_id},
					dataType : "json",
					type : "post",
					success : function(data){
						var state = $(".tabs-btn li.selected").attr("status");
						
						// 删除成功
						if(data.success){					
							window.location = "approve.jsp?mapp_id="+LINEWELL.page.mapp_id+"&state="+state;							
						}else{
							ui.alert({msg: "删除失败"});
						}						
					}
				});
			}
			
			// 改变模块状态
			$("#approveList").on("click", ".module-item li", function(){
				var $this = $(this);
				var type = $this.attr("type");
				var $moduleList = $this.parents(".module-item");
				moduleId = $moduleList.attr("id");
				
				// 流程
				if(type == "FLOW"){
					if(!$this.hasClass("disabled")){
						// TODO 跳转到流程
					}
				// 编辑
				} else if(type == "EDIT") {
					
					// 是否可点击
					if(!$this.hasClass("disabled")) {
						window.open("../jsform/index.jsp?page_type=approvePage" + "&mapp_id=" + LINEWELL.page.mapp_id + 
								"&moduleId=" + $moduleList.attr("id") + "&formId=" + $moduleList.attr("formId"), "_blank");
					}				
				
				// 删除
				} else if(type == "DELETE") {
					if(!$this.hasClass("disabled")) {
						$(".mask").removeClass("hide");
						$(".pop-box.create").addClass("hide");
						
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
						url : "app.action?type=moduleApproveAppModuleAction&operType=statusButtonHandle",
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
		approve.initData();
		
		approve.bindEvent();
	});
});