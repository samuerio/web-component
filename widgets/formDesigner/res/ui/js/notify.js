/**
 * 提示信息
 * @author jliangliang@linewell.com
 * @since 2015-7-21
 */ 
define(["jquery", "lib/bootstrap"], function ($) {
	
	// 定义元素
	var $msg = $("<div id=\"js-modify-success\" class=\"pop-con-save\"></div>");
	
	var $loading = $("<div class=\"loading-mask hide\"><svg width=\"50\" height=\"50\"><circle r=\"18\" cx=\"25\" cy=\"25\" class=\"circle-bg\"></circle><circle r=\"18\" cx=\"25\" cy=\"25\" class=\"circle\"></circle></svg></div>");
	// 追加
	$("body").append($msg);
	$msg.modal({show:false, backdrop: false});
	
	// 定义关闭时间变量
	var timeoutHandler = null;
	
	// 清楚定时器
	var closeTimeoutHandler = function () {
		timeoutHandler && clearTimeout(timeoutHandler);
		timeoutHandler = null;
	};
	
	// 绑定确定框事件
	var clickEvent = $.Callbacks();
	
	// 获得弹出框对象
	var $confirm = $("#confirm");
	
	// 确定事件绑定
	$confirm.find("#okBtn").click(function () {
		
		// 调用队列函数
		clickEvent.fire();
		
		// 制空队列
		clickEvent.empty();
		$confirm.addClass("hide");
	});
	
	// 取消事件绑定
	$confirm.find("#closeBtn,#cancelBtn").click(function () {
		$confirm.addClass("hide");
		
	});
	
	// exports API
	return{
		
		/**
		 * 显示提示信息
		 * @param msg 提示信息
		 */
		toast : function (msg) {
			
			// 清除定时器 
			closeTimeoutHandler();
			
			// 判空
			if(!msg) {
				return;
			}
			
			// 设置提示信息
			$msg.text(msg);	
			$msg.modal("show");		
				
			// 默认5秒后消失
			time = 5000;
			
			timeoutHandler = window.setTimeout( function () {
				closeTimeoutHandler();
				$msg.modal("hide");
			}, time);
		},
	
		/**
		 * 确定弹窗
		 * @param {String} title 标题
		 * @param {String} content 提示内容
		 * @param {String} callback 确定后的回调
		 */
		confirm : function (title, content, callback) {
			clickEvent.add(callback);
			$confirm.find("#title").html(title);
			$confirm.find("#content").html(content);
			$confirm.removeClass("hide");
		},
		
		/**
		 * 显示进度提示
		 */
		progressing : function () {
			
			$(".loading-mask").removeClass("hide");
		},
		
		/**
		 * 手动关闭进度提示
		 */
		closeProgressing : function () {
			$(".loading-mask ").addClass("hide");
		}

	};
});