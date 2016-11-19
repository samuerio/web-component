/**
 * 应用图标弹窗
 */
define("iconPop", ["jquery", "ui", "appSettingForm", "lib/mustache",  "libui/uploader", "libui/imagecut"], function ($, ui, appSettingForm, mustache) {
	
	var $container = $(".pop-box.icon-config");
	var $iconPreview = $container.find(".icon-img-container img");
	var $uploadBtn = $container.find(".js-add-icon");
	var $systemIcons = $container.find(".icon-list");
	var $colorBlock = $container.find(".color-block");
	var $text = $container.find("#text");
	var updateData;
	var uploadDiyIcon = false;
	
	var PagerIconList = function (id, url, pageSize) {
		
		var self = this;
		this.url = url;
		this.pageIndex = 1;
		this.pageSize = pageSize || 18;
		
		var $container = $("#" + id);
		this.$list = $container.find("ul");
		
		var len = this.$list.find("li").length;
		this.pageTotal = len && parseInt(len / this.pageSize) + 1;
		this.$prev =  $container.find(".arrow-left").click(function () {
			self.prev();
		});
		this.$next =  $container.find(".arrow-right").click(function () {
			self.next();
		});
		
		if (!this.url) {
			this.total = len;
		}
	};
	PagerIconList.prototype.prev = function () {
		--this.pageIndex;
		this.loadSystemIcons();
	}
	PagerIconList.prototype.next = function () {
		++this.pageIndex;
		this.loadSystemIcons();
	}
	PagerIconList.prototype.loadSystemIcons = function () {
		var self = this;
		this.$prev.show();
		this.$next.hide();
		
		if (this.url && (!self.total && self.total != 0 || this.pageSize * this.pageIndex <= self.total - self.total%self.pageSize + self.pageSize) &&  this.pageIndex > self.pageTotal) { // 缓存中没有 需要重新请求
			$.ajax({
		        url : this.url,
		        data: {
		        	page : this.pageIndex,
		        	pageSize : this.pageSize
		        },
		        dataType: "json",
		        success: function (data) {
		        	if (!data.success || !data.content || !data.content.list) {
		        		return;
		        	}
		        	var tpl_icon = $("#iconListItem").html();
		        	var list = data.content.list;
		        	self.total = data.content.total;
		        	for (var i = 0, len = list.length; i < len; i++) {
		        		self.$list.append(mustache.render(tpl_icon, list[i]));
		        	}
		        	self.pageTotal = parseInt((self.$list.find("li").length + self.pageSize - len) / self.pageSize);
		        	if (self.pageSize * self.pageIndex < self.total) {
		        		self.$next.show();
		        	}
		        }
		    });
		} else {
	    	if (self.pageSize * self.pageIndex < self.total) {
	    		self.$next.show();
	    	}
		}

		if (this.pageIndex == 1) {
			this.$prev.hide();
		}
		this.$list.find("li").hide().slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex).show();
	}
	
	var canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 512;
	var ctx = canvas.getContext("2d");
	
	var systemIconList = new PagerIconList("iconSelect", null, 18);
	var localIconList = new PagerIconList("localIcon", "app.action?type=mappPictureAction&operType=listAppLogo", 10);
	
	/**
	 * 背景色数值转换为16进制
	 */
	var getHexBackgroundColor = function(rgb) { 
		if (!rgb) {
			return;
		}
		rgb = rgb.replace(/rgb|[\(\)\s]/g, "").split(",");
		function hex (num) {
			return ("0" + parseInt(num).toString(16)).slice(-2);
		}
		return rgb= "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
	}
	
	var oldText = "";
	var oldColor = "";
	var draw = function (color, text) {
		if (!color) {
			return;
		}
		text = text || "";
		
		if ((text.length > 2 || tmpText === oldText) && color === oldColor) {
			return;
		}
		oldText = text;
		oldColor = color;
		
		// 绘制背景
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 512, 512);
		
		var tmpText = text.slice(0, 2);
		
		// 绘制文字
		ctx.fillStyle="#fff";
		ctx.font = "200px \u5fae\u8f6f\u96c5\u9ed1";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillText(text, 256, 256);
		
		
		return canvas.toDataURL("image/png");
	}
	
	// DIY图标
	$colorBlock.click(function () {
		
		var $this = $(this);
		$this.addClass("selected").siblings(".selected").removeClass("selected");
		var url = draw(getHexBackgroundColor($this.css('background-color')), $text.val());
		$iconPreview.attr("src", url);
		
		uploadDiyIcon = true;
		updateData["icon"] = "";
	});
	
	// DIY图标
	$text.on("input", function () {
		var $this = $(this);
		var url = draw(getHexBackgroundColor($colorBlock.filter(".selected").css('background-color')), $this.val());
		
		$iconPreview.attr("src", url);
		
		uploadDiyIcon = true;
		updateData["icon"] = "";
	});
	
	// 系统默认图标
	$systemIcons.on("click", "li", function() {
		var url = $(this).find("img").attr("src");
		$iconPreview.attr("src", url);
		updateData["icon"] = url;
		
		$colorBlock.filter(".selected").removeClass("selected");
	});
	
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
        	url: "app.action?type=mappPictureAction&operType=uploadLogo&mapp_id=" + LINEWELL.page.mapp_id,
        	type: "POST",
        	dataType: "json",
        	data: {
        		pic : imgBase64Code
        	},
        	success: function(data) {
                if (data.success) {
                    var url = data.content.url
                    
            		$iconPreview.attr("src", url);
            		
            		// 添加到列表中
            		var tpl_icon = $("#iconListItem").html();
            		localIconList.total++;
            		localIconList.$list.prepend(mustache.render(tpl_icon, data.content));
            		var len = localIconList.$list.find("li").length;
            		localIconList.pageTotal = parseInt((len + localIconList.pageSize - len%localIconList.pageSize) / localIconList.pageSize);
            		localIconList.pageIndex = 1
            		localIconList.loadSystemIcons();
            		
            		// 如果还有没加载出来的图片，最后一个页面需要重新加载
            		if (len < localIconList.total) {
            			localIconList.pageTotal--;
            		}
            		
            		updateData["icon"] = url;
                } else {
                    ui.alert({msg: data.message})
                }
            }})
    });
	
	return {
		
		/**
		 * 显示弹窗
		 */
		show : function () {
			appSettingForm.showMask();
			
			updateData = {};
			
			$iconPreview.attr("src", LINEWELL.page.app_setting.icon);
			
			var $this = $container.find(".icon-select span").eq(0);
			var forWrapper = $this.attr("for");
			$container.find(".js-wrapper:not(.hide)").addClass("hide");
			$container.find("#" + forWrapper).removeClass("hide");
			
			systemIconList.pageIndex = 1
			systemIconList.loadSystemIcons();
			
			localIconList.pageIndex = 1
			localIconList.loadSystemIcons();
			
			$this.addClass("selected").siblings(".selected").removeClass("selected");
			$container.removeClass("hide");
			
			uploadDiyIcon = false;
		},
		
		/**
		 * 关闭弹窗
		 */
		hide : function () {
			appSettingForm.hideMask();
			$container.addClass("hide");
		},
		
		/**
		 * 确定提交数据
		 */
		submit : function () {
			
			var self = this;
			
			// 上传diy图标
			if (uploadDiyIcon && !updateData["icon"]) {
				
			    // Generate the image data
			    var pic = $iconPreview.attr("src");
			    pic = pic.replace(/^data:image\/(png|jpg);base64,/, "");
			 
			    // Sending the image data to Server
			    $.ajax({
			        type: "POST",
			        url: "app.action?type=mappPictureAction&operType=createImage",
			        data: {file : pic},
			        dataType: "json",
			        success: function (data) {
			        	updateData["icon"] = data.content;
			        	appSettingForm.refresh(updateData);
						self.hide();
			        }
			    });
			} else {
				appSettingForm.refresh(updateData);
				this.hide();
			}
			
		}
	};
});

/**
 * 启动页弹窗
 */
define("bootImagePop", ["jquery", "ui", "appSettingForm", "libui/uploader"],function ($, ui, appSettingForm) {
	
	var $container = $(".pop-box.boot-page");
	var $bootPreview = $container.find("#bootPreview");
	var $bootImagePreview = $container.find("#bootImagePreview");
	var $showCopyRight = $container.find("#showCopyright");
	var $copyRight = $container.find("#copyright");
	var updateData;
	
	//启动方式
	$container.find(".app-effect .select-item").on("click", function () {
		var $this = $(this);
		$this.siblings(".select-item").removeClass("selected");
		$this.addClass("selected");
		updateData["startupMode"] = $this.data("startup-mode");
		var effect = $this.attr("effect");
		$bootPreview.removeClass();
		window.setTimeout(function () {
			$bootPreview.addClass(effect);
		}, 0);
		
	});
	 
	//启动图片点击
	$container.find("#bootImageSelect").on("click", ".boot-image", function () {
		
		var $this=$(this);
		$this.siblings(".boot-image").removeClass("selected");
		$this.addClass("selected");
		updateData["startupPage"]=$this.find("img").attr("src");
		$bootPreview.attr("src",updateData["startupPage"]);
		
		var $selectItem = $container.find(".app-effect .select-item.selected");
		var effect = $container.find(".app-effect .select-item.selected").attr("effect");
		$bootPreview.removeClass();
		window.setTimeout(function () {
			$bootPreview.addClass(effect);
		}, 0);
	});
	
	
	$showCopyRight.on("change", function () {
		updateData["hasCopyright"] = $(this).is(":checked");
	});
	
	$copyRight.on("input", function () {
		updateData["copyrightInfo"] = $(this).val();
	})
	
	// 启动上传图片事件
	var uploader = new ui.Uploader({
		filename: "file", 
		backend_url: "attachmentUpload.action?operType=uploadStartup&mapp_id=" + LINEWELL.page.app_setting.mAppId
	}, function(data) {
		updateData["startupPage"] = data.url;
		$bootPreview.attr("src", data.url); 
		$bootImagePreview.attr("src", data.url);
	});
	$bootImagePreview.click(function () {
		uploader.start();
	})
	
	var scaleHandler;
	var bootPreviewWidth;
	var bootPreviewHeight;
	
	return {
			
			/**
			 * 显示弹窗
			 */
			show : function () {
				appSettingForm.showMask();
				
				updateData = {};
				
				var $this = $container.find(".pic-select span").eq(0);
				var forWrapper = $this.attr("for");
				$container.find(".js-wrapper:not(.hide)").addClass("hide");
				$container.find("#" + forWrapper).removeClass("hide");
				
				$this.addClass("selected").siblings(".selected").removeClass("selected");
				
				$bootPreview.attr("src", LINEWELL.page.app_setting.startupPage)
				$bootImagePreview.attr("src", "");
				$container.removeClass("hide");
			},
			
			/**
			 * 关闭弹窗
			 */
			hide : function () {
				appSettingForm.hideMask();
				$container.addClass("hide");
				$bootPreview.removeClass();
			},
			
			/**
			 * 确定提交数据
			 */
			submit : function () {
				appSettingForm.refresh(updateData);
				this.hide();
			}
		};
});

/**
 * 引导页弹窗
 */
define("indexPagePop", ["jquery", "ui", "appSettingForm", "libui/uploader", "jquery-ui"],function ($, ui, appSettingForm) {
	
	var $container = $(".pop-box.index-page");
	var $iconAdd = $container.find(".icon-add");
	var $indexPageList = $("#indexPageList");
	var $showPageNum = $("#showPageNum");
	var $draggableBox = $(".js-draggable-box");
	var updateData;
	
	// 动画效果点击事件
	$container.find("#guidePageEffect .select-item").on("click", function () {
		var $this = $(this);
		$this.siblings(".selected").removeClass("selected");
		$this.addClass("selected");
		updateData["guidePageEffect"] = $this.data("guidePageEffect");

		refreshDraggableBox();
	});
	
	// 上传logo按钮事件
	var uploader = new ui.Uploader({
		filename: "file", 
		accept : "image/png",
		backend_url: "attachmentUpload.action?operType=uploadGuide&mapp_id=" + LINEWELL.page.app_setting.mAppId
	}, function(data) {
		
		// 添加一张引导页
		var $li = $("<li/>").addClass("draggable");
		var $img = $("<img/>").attr("src", data.url);
		var $bin = $("<div/>").addClass("icon-bin");
		$li.append($img).append($bin);
		$iconAdd.before($li);
		
		if ($indexPageList.find("li.draggable").length == 6) {
			$iconAdd.addClass("hide");
		}
		
		refreshDraggableBox();
    });
	$iconAdd.click(function () {
		uploader.start();
	});
	
	// 是否显示页面配置
	$showPageNum.on("change", function () {
		updateData["showPageNum"] = $(this).is(":checked");
	});
	
	// 删除引导页
	$indexPageList.on("click", ".icon-bin", function () {
		$(this).parent().remove();
		
		var startPage = [];
		$indexPageList.find("li.draggable img").each(function () {
			startPage.push(this.src);
		})
		updateData["guidePage"] = startPage.join(",");
		
		$iconAdd.removeClass("hide");
		
		refreshDraggableBox();
	})
	
	$indexPageList.sortable({
		items: ".draggable", 
		cursor: "move", 
		stop : function () {
			var startPage = [];
			$indexPageList.find("li.draggable img").each(function () {
				startPage.push(this.src);
			})
			updateData["guidePage"] = startPage.join(",");
			
			refreshDraggableBox();
		}
	});
	$indexPageList.disableSelection();
	
	// 图片拖动
	var index = 1;
	var left = 0;
	$draggableBox.draggable({
		axis : "x",
		helper : function () {
			return $("<div/>");
		},
		stop : function (event, ui) {
			var deltaX = ui.originalPosition.left - ui.position.left;
			var $img = $draggableBox.find("img");
			
			var total = $img.length;
			if (index == 0 || Math.abs(deltaX) < 30) {
				return;
			}
			if (deltaX > 0 && index < total) { // 下一页
				$img.eq(index - 1).removeClass().addClass("fade-out");
				index++;
				slidePage();
			} else if (deltaX < 0 && index > 1){ // 上一页
				index--;
				$img.eq(index - 1).removeClass().addClass("fade-in");
				slidePage();
			}
		}
	});
	function slidePage(i) {
		index = i || index;
		if ($draggableBox.is(".fade")) {
			
		} else {
			$draggableBox.css("left", -100 * (index - 1) + "%");
		}
	}
	
	/**
	 * 刷新预览框
	 */
	function refreshDraggableBox(data) {
		var guidePage = [];
		$indexPageList.find("li.draggable img").each(function () {
			guidePage.push(this.src);
		})
		updateData["guidePage"] = guidePage.join(",");
		
		$draggableBox.empty();
		var $img;
		for (var i = 0, len = guidePage.length; i < len; i++) {
			$img = $("<img/>").attr("src", guidePage[i]).css("z-index", len - i);
			$draggableBox.append($img);
		}
		$draggableBox.width(100 * len + "%");
		
		var guidePageEffect = $container.find("#guidePageEffect .select-item.selected").data("guide-page-effect");
		if (guidePageEffect == "FADE_IN_OUT") {
			$draggableBox.css("left","0");
			$draggableBox.removeClass("horizontal fade");
			$draggableBox.addClass("fade").addClass("draggable");
		} else {
			$draggableBox.css("left","0");
			$draggableBox.removeClass("horizontal fade");
			$draggableBox.addClass("horizontal").addClass("draggable");
		}
		
		slidePage(1);
	}
	
	return {
		
		/**
		 * 显示弹窗
		 */
		show : function () {
			appSettingForm.showMask();
			updateData = {};
			$container.removeClass("hide");
			slidePage(1);
		},
		
		/**
		 * 关闭弹窗
		 */
		hide : function () {
			appSettingForm.hideMask();
			$container.addClass("hide");
		},
		
		/**
		 * 确定提交数据
		 */
		submit : function () {
			appSettingForm.refresh(updateData);
			this.hide();
		}
	};
	
});

define("appSettingForm", ["jquery", "ui", "libui/utils"], function ($, ui, utils) {
	
	var originalForm = $.extend(true, {}, LINEWELL.page.app_setting);
	
	var submiting = false;
	
	return {
		
		/**
		 * 刷新表单
		 * @param {Object} data 刷新的数据
		 */
		refresh : function (data) {
			for (var i in data) {
				LINEWELL.page.app_setting[i] = data[i];
			}
			
			// 应用图标
			if (data.icon) {
				$("#icon").attr("src", data.icon);
				$("#phoneIconPreview").attr("src", data.icon);
				// TODO 更新预览
			}
			
			// 启动页
			if (data.startupPage) {
				$("#startupPage").attr("src", data.startupPage);
			}
			
			// 启动页
			if (data.startupPage) {
				$("#startupPage").attr("src", data.startupPage);
			}
		},
		
		/**
		 * 显示表单遮罩
		 */
		showMask : function () {
			$(".mask").removeClass("hide");
		},
		
		/**
		 * 隐藏表单遮罩
		 */
		hideMask : function () {
			$(".mask").addClass("hide");
		},
		
		/**
		 * 提交表单
		 * @param {Function} callback 提交表单后的回调
		 */
		submit : function (callback) {
			
			LINEWELL.page.app_setting.useGuide = $("#useGuide").is(".checked")
			LINEWELL.page.app_setting.name = $("#name").val();
			
			// 如果没有修改
			if (JSON.stringify(originalForm) == JSON.stringify(LINEWELL.page.app_setting)) {
				callback();
				return;
			}
			
			var name = $("#name").val();
			if (!name) {
				ui.alert({msg:"请输入APP名称"});
				return;
			}
			if (!/^[0-9_a-zA-Z\u4e00-\u9fa5]{1,20}$/.test(name)) {
				ui.alert({msg:"应用名称只能包含汉字、英文、数字，且长度最多为20个字"});
				return;
			}
			
			if (submiting) {
				return;
			}
			
			submiting = true;
			$.ajax({
				data : JSON.stringify(LINEWELL.page.app_setting),
				dataType : "json",
				type : "post",
				contentType : "application/json; charset=utf-8",
				url: "app.action?type=mappMAppSettingAction&operType=saveSetting",
				success: function(data) {
					originalForm = $.extend(true, {}, LINEWELL.page.app_setting);
					if (data.success) {
						callback();
					} else {
						ui.alert({msg: data.message})
					}
				}
			 }).always(function () {
				 submiting = false;
			 });
		}
	}
});

/**
 * 应用设置页面脚本
 * @author cshiyong@linewell.com
 * @since 2015-9-8
 */
define(["jquery", "ui", "iconPop", "bootImagePop", "indexPagePop", "appSettingForm", "libui/uploader"], function($, ui, iconPop, bootImagePop, indexPagePop, appSettingForm) {
	
	var $phoneNamePreivew = $("#phoneNamePreview");
	$("#name").on("input", function () {
		$phoneNamePreivew.text($(this).val());
	})
	
	// 页签事件
	$(".icon-select span, .pic-select span").click(function () {
		var $this = $(this);
		var forWrapper = $this.attr("for");
		$(".js-wrapper:not(.hide)").addClass("hide");
		$("#" + forWrapper).removeClass("hide");
		
		$this.addClass("selected").siblings(".selected").removeClass("selected");
	})
	
	var currentPop = null;
		
	// 点击应用图标，弹出对话框
	$(".icon-container").click(function() {
		currentPop = iconPop;
		iconPop.show();
	});
	
	// 点击启动页，弹出对话框
	$(".boot-image-container").click(function() {
		currentPop = bootImagePop;
		bootImagePop.show();
	});
	
	// 点击设置引导页，弹出对话框
	$(".index-page-config").click(function() {
		currentPop = indexPagePop;
		indexPagePop.show();
	});
	
	// 确定按钮
	$(".js-ok-btn").click(function () {
		currentPop.submit();
	});
	
	// 关闭 取消按钮事件
	$(".js-close-btn, .mask").click(function () {
		currentPop.hide();
	});
	
	// 保存设置按钮
	$(".js-submit-btn").click(function () {
		appSettingForm.submit(function () {
			ui.insetSuccess({
				msg: "保存成功!",
				position: "center",
			})
		});
	});
	
	// 是否使用引导页选框
	$(".icon-checkbox").click(function() {
		$(this).toggleClass("checked");
	});
	
	//遮罩相关
	$(".mask").click(appSettingForm.hideMask);
	
	// 生成应用按钮
	$(".js-build-btn").click(function () {
		
		// 先保存应用设置
		appSettingForm.submit(function () {
			
			$.ajax({
				url : "app.action?type=mappReleaseAction&operType=isSuccessPublished",
				dataType : "json",
				data : "mAppId="+LINEWELL.page.app_setting.mAppId,
				type : "post",
				success : function(data){
					var res = data.content;
					if(res == "true"){
						location.href = "appPublish/appBulid.jsp?mapp_id="+LINEWELL.page.app_setting.mAppId;
					}else if(res == "false"){
						location.href = "appPublish/appPublish.jsp?mapp_id="+LINEWELL.page.app_setting.mAppId;
					}else{
						ui.alert({msg:data.message});
					}
				}
			})			
		});
	})
});
