/**
 * 审批管理员模块
 * @author jliangliang@linewell.com
 * @since 2015/10/10
 */
define([ "jquery", "ui", "libui/utils", "notify", "lib/mustache"], function($, ui, utils, notify, mustache) {
	
	var $approveList = $("#approveList");
	
	var approveAdmin = {
			
		/**
		 * 初始化数据
		 */	
		initData : function(){
			
			var html = "";
			
			// 循环输出应用
			for(var i = 0, len = LINEWELL.page.approve_list.length; i<len; i++){
				html += mustache.to_html($("#approveItem").html(), LINEWELL.page.approve_list[i]);
			}
			
			$approveList.html(html);
		},
		
		/**
		 * 绑定事件
		 */
		bindEvent : function(){
			
			// 创建新审批
			$("#creatApprove").click(function(){
				$.ajax({
					url : "app.action?type=moduleApproveAppModuleAdminAction&operType=create",
					data : "mAppId="+LINEWELL.page.mapp_id,
					type : "post",
					dataType : "json",
					success : function(data){
						var res = data.content;
						if(data.success){
							
							// 跳转到表单页
							window.open("../jsform/index.jsp?page_type=approvePage"+
							"&mapp_id="+res.mapp_id+"&moduleId="+res.moduleId+"&formId="+res.formId);

						}else{
							ui.alert({msg: data.message});
						}
					}
				}); // end ajax
			});
			
			$("#statusTabs li").click(function () {
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
			
			// 改变状态
			$("#approveList").on("click", ".edit-list li", function() {
				var $this = $(this);
				
				var enable = $this.attr("type");
				var $moduleList = $this.parents(".module-item");
				moduleId = $moduleList.attr("id");
				formId = $moduleList.attr("formId");
				var moduleClass = $this.attr("class"); 
				
				if($this.hasClass("disabled")){
					return;
				}
				
				// 编辑
				if(enable == "EDIT") {
					window.open("../jsform/index.jsp?page_type=approvePage" + "&mapp_id=" + LINEWELL.page.mapp_id + 
							"&moduleId=" + $(this).parents(".module-item").attr("id") + "&formId=" + $(this).parents(".module-item").attr("formId"));
				// 删除
				} else if(enable == "DELETE") {
					$(".mask").removeClass("hide");
					$(".mask .module-lib").addClass("hide");
					notify.confirm("确定删除此模块?", function() {
						deleteModule();
					});
			    
				// 状态切换
				} else {
					$.ajax({
						url : "app.action?type=moduleApproveAppModuleAdminAction&operType=statusButtonHandle",
						data : {
							buttonType : enable,
							mAppId : LINEWELL.page.mapp_id,
							moduleId : moduleId
						},
						dataType : "json",
						type : "post",
						success : function(data) {
							if(!data.success) {
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
					url : "app.action?type=moduleApproveAppModuleAdminAction&operType=delete",
					data : {moduleId : moduleId, mAppId : LINEWELL.page.mapp_id},
					dataType : "json",
					type : "post",
					success : function(data){
						var state = $(".tabs-btn li.selected").attr("status");
						
						// 删除成功
						if(data.success){					
							window.location = "approveAdmin.jsp?mapp_id="+LINEWELL.page.mapp_id+"&state="+state;
						}else{
							ui.alert({msg: data.message});
						}						
					}
				});
			}
			
		}		
	};
	
	$(function(){

		approveAdmin.initData();
		
		approveAdmin.bindEvent();
	});
});