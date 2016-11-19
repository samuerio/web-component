define(["jquery","libui/notify"], function($, notify) {
    var entityMap = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#39;","/": "&#x2F;"};
    return {
    	escapeHtml: function(string) {
            return String(string).replace(/[&<>"'\/]/g, function(s) {
                return entityMap[s]
            })
    	},
    	addslashes: function (string) {

    	},
    	endWith: function (str, substr, flag) {
            var len = str.length;
            var sub_len = substr.length;
            if (flag == "IGNORE_CASE") {
                str = str.toUpperCase();
                substr = substr.toUpperCase()
            }
            if (str.indexOf(substr) == len - sub_len) {
                return true
            } else {
                return false
            }
    	},
    	chLength: function (str) {
            var l = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    l += 2
                } else {
                    l += 1
                }
            }
            return l
    	},
    	countDownText: function (opt) {
            var m = this, s = opt.seconds, text = opt.text.replace("{{time}}", s);
            if (s === 0) {
                if (opt.over)
                    opt.over.call();
                return
            }
            opt.setText.call(m, text);
            setTimeout(function() {
                opt.seconds = s - 1;
                m.countDownText(opt)
            }, 1e3)
        },
       
		/**
		 * 构建action请求地址
		 * @param {String}action 平台开放action标识
		 * @param {String}operType 操作类型
		 */
        getAppAction:function(action,operType){
        	var actionUrl = "app.action";
        	 return actionUrl + "?type=" + action + "&operType=" + operType;
        },
        
        /**
		 * 发送请求
		 * @param {String}url 请求地址
		 * @param {String}data 请求的数据
		 * @param {Function}callback 回调方法
		 * @param {Boolean}async 是否异步
		 */
		send : function (url, data, callback, async) {
			if (!url) {
				return;
			}
			async = (async === true);
			return $.ajax({
				url : url,
				data : data || {},
				type : "post",
				dataType : "json",
				async : async,
				success : callback
			}).always(function () {
				/*requestCount--;
				if (requestCount < 0) {
					requestCount = 0;
				}
				//!requestCount && notify.closeProgressing();
*/			}).fail(function () {
				notify.toast("交互出错！");
			});
		},
		
		/**
		 * 构建action请求地址
		 * @param {String}action 平台开放action标识
		 * @param {String}operType 操作类型
		 */
		buildActionUrl : function (action, operType) {
			if (!action || !operType) {
				return "";
			}
			return actionUrl + "?type=" + action + "&operType=" + operType;
		},
		
		/**
		 * 获取url参数如index.htm?id=1 返回1
		 * url将URL中的字符串时进行分解获取参数name的实际值
		 * modify by jc 20100420
		 */
		getUrlParameter : function(name,url) {
			var params = null;
			if(url){
				params = url.replace(/[^\?\&]*(\?|&)/,"").split('&');
			}else{
				params = window.location.search.slice(1).split('&');
			}
			for (var i = 0; i < params.length; i++) {
				var temp = params[i].split("=");
				if (temp[0] == name) {
					//支持值里面有=，如&purl=unid=123&，取出的值为unid=123 mdf by jc 20110311
					return params[i].replace(/^[\w]*=/,"");
				}
			}
			return "";
		},
		
		/**
		 * 名称只能包含数字、字母、中文，且长度为2-20个字符
		 * @param value 输入值
		 */
		inputValidate : function(value){
			
			value = $.trim(value);
			//var pattern = RegExp(/^[0-9_a-zA-Z\u4e00-\u9fa5]{2,20}$/);
			if(value.length < 1){
				return false;
			}
			
			if(value.length > 20){
				return false;
			}
			
			return true;
		}		
    };
});
