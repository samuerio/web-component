/**
 * jliangliang@linewell.com
 * 不同页签分页
 * @since 2015/9/16
 */
define(["jquery", "lib/mustache"], function ($, mustache) {
	
	
	/**
	 * 分页对象构造函数
	 * @param {jQuery Object} options 参数对象
	 */
	var PageTab = function (options) {
		var self = this;
		
		// 参数追加
		this.options = $.extend(true, {
			$combobox : null,
			url : "",
			pageSize : "",
			mapp_id : ""
		}, options);
		
		// 当先页
		this.currentPage = 1;
		
		
		// 资源下拉列表向前翻页按钮
		this.options.$combobox.find(".arrow-left").on("click", function () {
			self.load(--self.currentPage);
		}); 
		
		// 资源下拉列表向后翻页按钮
		this.options.$combobox.find(".arrow-right").on("click", function () {
			
			// 调用加载列表函数
			self.load(++self.currentPage);
		}); 
	}
	
	/**
	 * 加载下一页的下拉列表
	 * @param {int} pageIndex 页码
	 * @param {jQuery Object} params 参数对象
	 * @param {function} callback 回调函数
	 */
	PageTab.prototype.load = function (pageIndex, params, callback) {
		var self = this;
		
		// 判空
		if (params) {
			this.params = params;
		}
		this.currentPage = pageIndex;
		
		var pageSize = self.options.pageSize;
		
		var url = this.options.url;
		
		var $icon = self.options.$combobox.find("li");
		
		// 本地翻页
		if(url == ""){
			var pageTotal = parseInt($icon.length / pageSize) + 1;
			self.options.$combobox.find(".arrow-left, .arrow-right").show();
			if (pageIndex == 1) {
				self.options.$combobox.find(".arrow-left").hide();
			}
			if (pageIndex == pageTotal) {
				self.options.$combobox.find(".arrow-right").hide();
			}
			$icon.hide().slice(pageSize * (pageIndex-1), pageSize * pageIndex).show();
		}else{
			$.ajax({
				url : url,
				data:{
					page : pageIndex,
					pageSize : pageSize,
					mapp_id : self.options.mapp_id
				},
				type : "post",
				dataType : "json",
				success : function(data){
					var list = data.content;
					
					// 判断是否成功
					if (data.success === false) {
						return;
					}
					
					if (list) {
						var html = mustache.render($("#iconList").html(), list);
						
						$("#icon-list").html(html);
						
						// 向前翻页按钮是否可见
						if (pageIndex == 1) {
							self.options.$combobox.find(".arrow-left").hide();
						} else {
							self.options.$combobox.find(".arrow-left").show();
						}
						
						// 向后翻页按钮是否可见
						if (pageIndex == Math.ceil(list.total/pageSize)) {
							self.options.$combobox.find(".arrow-right").hide();
						} else {
							self.options.$combobox.find(".arrow-right").show();
						}
					}else{
						self.options.$combobox.find(".arrow-left, .arrow-right").hide();
					}
					
					
					// 回调函数
					callback && callback.call(self.options.$combobox);				
				}			
			})
		}		
	}
	
	// API module
	return PageTab;
});