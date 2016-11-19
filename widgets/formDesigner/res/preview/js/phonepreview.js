define(["jquery", "ui", "libui/loader", "lib/bootstrap"], function($, ui, loader) {
    var frame;
    function PhonePreview(opt) {
        var m = this;
        m.init(opt.wrap)
    }
    PhonePreview.prototype = {
    	init: function(wrap) {
            var m = this;
            m.wrap = wrap;
            m.win = m.wrap.find("div.phone-main-w");
            return m
        },show: function() {
            this.wrap.addClass("preview-show")
        },setSize: function(width, height) {
            this.doc.width(width).height(height);
            return this
        
        // 加载对应页面
        },load: function(url, callback) {
            var m = this;
            frame.attr("src", url);
            if (callback)
                callback.call(m);
            return m
        },close: function() {
            var m = this;
            m.cover.slideDown();
            m.win.css({marginLeft: 0});
            return m
        }};
    
    // 预览窗事件
    function PreviewNav(opt) {
        var m = this;
        m.wrap = opt.wrap;
        m.eventHandler = opt.wrap;
        m.phone_bg = m.wrap.find("div.phone");
        
        // 隐藏预览弹窗
        m.wrap.on("click", ".preview-phone", function() {
            m.wrap.modal("hide");
            
        // 阻止冒泡
        }).on("click", ".phone", function(e) {
            e.stopPropagation();
         
        // 阻止冒泡
        }).on("click", ".preview-right", function(e) {
            e.stopPropagation();
            
        // 发布页面
        }).on("click", ".preview-publish", function() {
            m.wrap.modal("hide");
            $("#page-pub-ctr").find(".js-publish")[0].click()
            
        // 关闭弹窗
        }).on("click", ".preview-x", function() {
            m.wrap.modal("hide");
        })
    }
    PreviewNav.prototype = {};
    ui.PhonePreview = PhonePreview;
    $(function() {
        loader.loadCSS({id: "preview-css",url: LINEWELL.staticurl + "/res/preview/css/preview.css",success: function() {
            },error: function() {
            }});
        var preview, site_preview = null, pop = null;
        
        // 打开预览
        var openPreview = function(url) {
        	var moduleId = LINEWELL.page.moduleId;
            if (!url) {
                if (LINEWELL.page.previewurl) {
                    url = LINEWELL.page.previewurl;
                } else {
                	
                	if(moduleId == undefined){
                		moduleId = "";
                	}
                    url = "preview.jsp?mapp_id="+LINEWELL.page.mapp_id+"&page_id="+LINEWELL.page.page_id+"&moduleId="+moduleId;
                }
            }
            
            // 加载页面
            preview.load(url, function() {
                site_preview.modal("show")
            })
        };
        
        // 初始化页面预览
        var initPreview = function(url) {
        	
        	// 路径修改 也可以保持不变，创建相应的路径下的文件
            jQuery.ajax({
            	url: "res/preview/getPreview.html",
            	type: "get",
            	data: {mapp_id: LINEWELL.page.mapp_id,page_id: LINEWELL.page.page_id},
            	dataType: "html",
            	beforeSend: function() {
                    ui.loading({timeout: 500});
                },success: function(html) {
                    ui.hideLoading();
                    $("body").append($(html));
                    site_preview = $("#js-site-preview");
                    var phone_preview = site_preview.find("div.phone-container");
                    site_preview.modal({show: false,backdrop: true,center: true});
                    new PreviewNav({wrap: site_preview});
                    frame = $("#preview-frame");
                    frame.attr("src","/preview.jsp?mapp_id="+LINEWELL.page.mapp_id+"&page_id="+LINEWELL.page.page_id);
                    site_preview.on("preview.contentChanged", function() {
                    });
                    preview = new ui.PhonePreview({wrap: phone_preview});
                    openPreview(url);
                    iframeReturn()
                }
            })
        };
        
        // 打开预览
        jQuery(document).on("preview.open", function(e, url) {
            if (!preview) {
                initPreview(url)
            } else {
                openPreview(url)
            }
        });
        
        // 
        jQuery("#btn-preview-site").click(function() {
            jQuery(this).trigger("preview.open")
        });
        var myhistory = [];
        
        function iframeReturn() {
        	
        	// 返回事件
            $(".preview-header .return").click(function() {
                if (myhistory.length > 1) {
                    var tmp = myhistory.pop();
                    var link = myhistory.pop();
                    document.getElementById("preview-frame").contentWindow.postMessage({topic: "iframeReturn",link: link}, window.location.origin)
                }
            })
        }
        window.addEventListener("message", function(e) {
            var data = e.data;
            if (data.topic == "iframehistory") {
                myhistory.push(data.link)
            }
        }, false)
    })
});
