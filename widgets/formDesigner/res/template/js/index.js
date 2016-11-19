define([ "jquery", "ui","libui/notify", "libui/utils", "jquery-ui" ], function($, ui,notify, utils, ds,pageConfig) {

	var templateData = {
		operType : "resetAppStyle",
		theme : 'classicTheme',
		themeColor : 'colorA',
		mAppId : ""
	};

	var template = {
			
		mAppId : utils.getUrlParameter("mAppId"),
		
		/**
		 * 初始化
		 */
		init : function(){
			var self = this;
			self.changTheme();
		},
		
		/**
		 * 创建判断
		 */
		buildPinion : function(){
			var self = this;
			$(".color-block, .theme-item").removeClass("selected");
			if(self.mAppId == ""){
				
				templateData.operType = "createApp";
				$(".color-block[color=colorA]").addClass("selected");
				$("#classicTheme").addClass("selected");
			}else{
				$("#cancel").removeClass("hide");
				templateData.themeColor = LINEWELL.pages.styleName;
				templateData.theme = LINEWELL.pages.templateName;	
				$(".color-block[color="+templateData.themeColor+"]").addClass("selected");
				$(".theme-item[data-theme="+templateData.theme+"]").addClass("selected");
			} 
		},
		
		/**
		 * 绑定事件
		 */
		bindEvent : function() { 
			var self=this;
			var $appName = $("#appName");
			
			// 上一页点击事件
			$('.left-arrow').click(prevTheme);
			
			// 下一页点击事件
            $('.right-arrow').click(nextTheme);
            
			//主题选择
			$('.theme-select .theme-item').on("click", function() {
				var $this = $(this);
				templateData.theme = $this.attr("data-theme");
				$this.siblings().removeClass('selected');
				$this.addClass('selected');
				self.changTheme();
			});

			// 主题颜色
			$('.selector-wrapper .color-block').on("click", function() {
				var $this = $(this);
				templateData.themeColor = $this.attr("color");
				$this.siblings().removeClass('selected');
				$this.addClass('selected');
				self.changTheme();
			});

			// 字体颜色
			$('.font-color-select .color-block').on("click", function() {
				var $this = $(this);
				templateData.fontColor = $this.data("color");
				$this.siblings().removeClass('selected');
				$this.addClass('selected');
				self.changTheme();
			});
			
			 // 查看其他页面
			 $('.phone-over').click(function(){
                 $('.masks').css('display','block');
             });
			 
			 // 关闭弹幕
             $('.close-btn').click(function(){
                 $('.masks').css('display','none');
             });
             
             // 按回车键触发事件
 			$(".pop-box input").on("keyup", function (e) {
 				if (13 === e.keyCode) { 
 					$(this).siblings(".button").trigger("click");
 				}
 			});
             
			
			/**
			 * 上一个风格
			 */
            function prevTheme(){
                if($('.theme-select .theme-item.selected').prev().length>0){
                    var prevHtml = $('.theme-select .theme-item.selected').removeClass('selected').prev();
                    prevHtml.addClass('selected');
                    templateData.theme = prevHtml.attr("data-theme");
                    self.changTheme();                  
                }
            }
            
            /**
             * 下一个风格
             */
            function nextTheme(){
                if($('.theme-select .theme-item.selected').next().length>0){
                    var nextHtml = $('.theme-select .theme-item.selected').removeClass('selected').next()
                    nextHtml.addClass('selected');
                    templateData.theme = nextHtml.attr("data-theme");
                    self.changTheme();
                }
            }
            
            // 取消重选
            $("#cancel").click(function(){
            	window.location.href = "../page.jsp?page_id="+LINEWELL.pages.page_id+"&mapp_id="+LINEWELL.pages.mapp_id;
            })
			
			//提交主题
			$(".submit-btn").on("click",function(){
				
				// 站点ID
				self.mAppId && (templateData.mAppId = self.mAppId);
				
				// 创建中遮罩
				notify.progressing();
				
				// 异步创建
				 $.ajax({
                     url: utils.getAppAction("mappMAppAction",templateData.operType),
                     data: {
                    	 styleName : templateData.themeColor,
                    	 templateName: templateData.theme,
                    	 mAppId : templateData.mAppId
                     },
                     type: "post",
                     dataType: "json",
                     success: function (data) {
                    	 var rel = data.content;
                    	 
                    	 // 创建成功
                    	 if(data.success){
                    		 
                    		 // 关掉遮罩
                    		 notify.closeProgressing();
                    		 
                    		 // 页面跳转
                    		 location.href = "../page.jsp?mapp_id="+rel.mAppId+"&page_id="+rel.pageId;
                    	 }else{
                    		// 关掉遮罩
                    		 notify.closeProgressing();
                    		 
                    		 notify.toast(data.message);
                    	 }                    	 
                     }
                 });
			});
		},
		
		/**
		 * 改变主题
		 */
		changTheme:function(){ 
			var urlTemplate="theme={{theme}}&themeColor={{themeColor}}";
			var  url = ui.render(urlTemplate, templateData);
			
			// 经典风格
			if(templateData.theme=="classicTheme"){
				$(".preview-container").attr("src","classicPage.jsp?"+url);
				
			// 九宫格
			}else if(templateData.theme=="nineTheme"){
				$(".preview-container").attr("src","gridPage.jsp?"+url);
				
			// 七巧板
			}else if(templateData.theme=="sevenTheme"){
				$(".preview-container").attr("src","tangramPage.jsp?"+url);
			}			
		}
	};
	$(function() {
		
		// 创建判断
		template.buildPinion();
		
		// 初始化
		template.init();
		
		// 绑定事件
		template.bindEvent();	
	
	});
});