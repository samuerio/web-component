/**
 * 应用发布脚本
 * @author cshiyong@linewell.com
 * @since 2015-9-8
 */
define([ "jquery", "ui", "lib/mustache", "libui/utils"],function($, ui, mustache, utils) {
	
	
	// private API
	var privateMethod = {
			
		/**
		 * 绑定APP信息
		 * @param {jQuery 对象} $wrap 模板框 
		 */
		initAppInfo : function($wrap){
			$.ajax({
				data : {
					mAppId : utils.getUrlParameter("mapp_id")
				},
				dataType : "json",
				type : "post",
				url : "app.action?type=mappReleaseAction&operType=getMAppInfo",
				success : function(data) {
					if (data.success) {
					
						// 手机模板
						var app_info_tpl = $wrap.find("#app-info-tpl");
						
						// APP信息
						var html = mustache.to_html(app_info_tpl.html(), data.content);
						
						// 插入APP信息
						$wrap.find(".app-info").html(html);						
					} 
				}
			});
		},
		
		/**
		 * 绑定Android列表信息
		 * @param {jQuery 对象} $wrap 模板框 
		 * @param {String} versionType 版本类型
		 */
		VersionInfo : function($wrap, versionType){
			$.ajax({
				data : {
					mAppId : utils.getUrlParameter("mapp_id"),
					phoneOS : versionType
				},
				dataType : "json",
				type : "post",
				url : "app.action?type=mappReleaseAction&operType=getMAppPublishLogs",
				success : function(data) {
					var res = data.content;
					if (data.success) {
						
						// 手机模板
						var android_info_tpl = $wrap.find("#android-info-tpl");
						
						// 循环换行输出
						for (var i = 0, len = res.length; i < len; i++){
							res[i].remark = res[i].remark.replace(/\n/g, "<br/>");													
						}
						
						// 列表信息绑定
						var html = mustache.to_html(android_info_tpl.html(),data);
						
						// 赋值html
						$wrap.find(".version-details .android").html(html);
						
						$(".versionList dd").each(function(){
							var $this = $(this);
							if($this.height() >= 66){
								$this.next().removeClass("hide");
							}
						})					
					}
				}
			});
		},
		
		/**
		 * 生成安卓版二维码
		 * @param {jQuery 对象} $wrap 模板框  
		 */
		createAndroidCode : function($wrap){
			var self = this;
			var count = 0;
			var logId = "";
			
			var verType = "ANDROID";
			
			// 生成的安卓区域
			var $verAndroidWrap = $wrap.find(".app-version .ver-android");
			
			var $verAndroidWrapPrecent = $verAndroidWrap.find(".percent");
			
			/**
			 * 生成安卓版二维码
			 */
			function creataCode(){
				$.ajax({
					data : {
						mAppId : utils.getUrlParameter("mapp_id"),
						phoneOS : verType,
						progress : count		
					},
					dataType : "json",
					type : "post",
					url:"app.action?type=mappReleaseAction&operType=getLatestMAppPublishLog",
					success: renderView
				});
			}
			
			/**
			 * 生成安卓版二维码
			 */
			function updateStatus(){
				$.ajax({
					data : {
						mAppId : utils.getUrlParameter("mapp_id"),
						phoneOS : verType,
						progress : count,
						logId : logId					
					},
					dataType : "json",
					type : "post",
					url:"app.action?type=mappReleaseAction&operType=getProgressPublishLog",
					success: renderView
				});
			}
			
			/**
			 * 刷新生成区
			 */
			function renderView(data) {
				var ret = data.content;	
				
				logId = ret.appPublishLogId;
				
				// 请求失败
				if (!data.success) {
					return;
				}
				
				$("#verNum").html("V"+ret.version);
				
				count = ret.publishProgress;
				
				count += 10;
				
				if(count >= 200){
					count = 250;
				}
				$(".circle").css("stroke-dasharray",""+count+" 283");
				
				// 生成完成
				if(ret.publishStatus == "SUCCESS"){
					
					// 关闭定时器
					clearInterval(timeoutHandler);
					
					$(".circle").css("stroke-dasharray","283 283");
					
					$("#publishing").addClass("complete").html("最新版本，快快使用~");
					
					// apk下载地址
					$("#downloadBtn").attr("download", ret.installFileUrl);
						
					// 显示二维码
					$verAndroidWrapPrecent.addClass("hide");
					$verAndroidWrap.find(".qr-code").removeClass("hide").html("<img src="+ret.qrCodeUrl+" class='qrCode'>");
					
					// 更新历史版本
					self.VersionInfo($wrap, verType);
					
					self.initAppInfo($wrap);
				}else if(ret.publishStatus == "FAIL"){
					
					// 关闭定时器
					clearInterval(timeoutHandler);
					$("#publishing").html("生成失败！请稍后再试");
					$(".ver-android").addClass("error").attr("logId", logId);
				}
			}
			
			// 定时获取生成进度
			var timeoutHandler = setInterval(function(){
				if (!logId) {
					creataCode();
				} else {
					updateStatus();
				}
			}, 2000);
			
			creataCode()		
		},
		
		/**
		 * 绑定事件
		 * @param {jQuery 对象} $wrap 模板框  
		 */
		bindEvent : function($wrap){
			
			var versionType = "ANDROID";
			var self = this;
			
			// 版本切换
			$wrap.find(".detail").click(function(){
				var $this = $(this);
				$(".detail").removeClass("selected");
				$this.addClass("selected");
				versionType = $this.attr("type");
				$(".versionList").addClass("hide");
				$this.parents(".version-details").children(".versionList").removeClass("hide");
				
				// 历史版本管理
				self.VersionInfo($wrap, versionType);
			}).eq(0).click();
			
			// 点击下载
			$("#downloadBtn").click(function(){
				
				// 下载地址
				var downUrl = $(this).attr("download");
				
				if(downUrl != ""){
					
					// 下载跳转
					window.open(downUrl);
				}			
			});
	
			// 重新生成
			$("#retry").click(function(){
				$(".ver-android").removeClass("error");
				self.rePackApp($wrap);
			})
			
			// 查看包名
			$(".wrapper").on("click", ".tri", function(){
				$(".package").toggleClass("more");
			})
			
			// 查看更多更新说明
			$(".versionList").on("click", ".more", function(){
				$("#remakPop").removeClass("hide");
				$("#remarkInfo").html($(this).next().val());
			})
			
			// 关闭弹窗
			$(".closeBtn").on("click", function(){
				$("#remakPop,.mask").addClass("hide");
			})
			
			// 二维码放大
			$(".qrCodeShow").on("click", ".qrCode", function(){
				var srcImg = $(this).attr("src");
				$("#codePop").removeClass("hide");
				
				// 图片
				$("#codePopImg").attr("src", srcImg);
			})
		},
		
		/**
		 * 重新加载
		 * @param {jQuery 对象} $wrap 模板框  
		*/
		rePackApp : function($wrap){
			var self = this;
			var logId = $wrap.find(".ver-android").attr("logId");
			$.ajax({
				url : "app.action?type=mappReleaseAction&operType=rePackApp",
				data : {
					logId : logId,
					mAppId : utils.getUrlParameter("mapp_id")
				},
				dataType : "json",
				type : "post",
				success : function(data){
					if(data.success){
						$("#publishing").html("正在为您全力生成，这个过程需要几分钟，请稍作休息~");
						self.createAndroidCode($wrap);
					}
				}
			})
		}
	};

	return {

		/**
		 * 初始化应用设置页面
		 */
		init : function() {
			var $wrap = $(".wrapper");
			
			// 获取应用信息
			privateMethod.initAppInfo($wrap);
			
			// 生成二维码
			privateMethod.createAndroidCode($wrap);
			
			// 初始化事件
			privateMethod.bindEvent($wrap);
			
		}
	};
});
