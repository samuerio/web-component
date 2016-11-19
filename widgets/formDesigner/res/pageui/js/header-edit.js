define(["jquery", "ui", "libui/utils", "libui/uploader", "libui/imagecut"], function($, ui, utils) {
    var tpl = '<div class="config-header">                    <div class="ui-warn content-setting-tip">以下选项对所有页面生效</div>                    <form class="js-set-header" method="post" action="app.action?type=mappHeaderConfigAction&operType=save" onsubmit="return false;">                        <fieldset></fieldset>                        <input type="hidden" name="mAppId" value="{{_siteid_}}"> <input type="hidden" name="headerConfigId" value="{{headerConfigId}}">                    </form>                </div>', tpl_logo = '<div id="js-header-logo" class="logo-u">                <div class="logo-con">                    <img src="{{siteLogo}}">                    <input type="hidden" name="siteLogo" value="{{siteLogo}}">                </div>                <a href="javascript:;" class="button add-logo js-add-logo">添加logo</a>                <div class="logo-tip">建议上传透明底的PNG原创图片</div>            </div>', $view, $editor;
    function initView() {
        $view = $(".phone-header");
        $view.addClass("module").append('<div class="module-control"><span class="module-move"><i class="font-ico"></i></span></div>').on("mouseenter", function(ev) {
            $view.addClass("module-cur")
        }).on("mouseleave", function(ev) {
        	if (!$view.is("[selected]")) {
        		$view.removeClass("module-cur");
        	}
        }).on("click", function(ev) {
            $(".mod-config").css({visibility: "hidden", display:"none"});
            $editor.show().css({visibility: "visible"});
            $view.addClass("module-cur");
            ev.preventDefault();
            ev.stopPropagation();
            return false
        })
    }
    var uploader = new ui.Uploader({
    	filename: "file", 
		uploadHandler : uploadHandler
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
        	data: {pic : imgBase64Code},
        	success: function(data) {
                if (data.success) {
                    var url = data.content.url;
                    c.updateLogo(url)
                } else {
                    ui.alert({msg: data.message})
                }
            }})
    });
    var c = {updateLogo: function(url) {
            $view.find(".cell.site-logo img").attr("src", url);
            $editor.find(".logo-con img").attr("src", url);
            $editor.find("input[name='siteLogo']").val(url)
            
        },init: function(opt) {
            var m = this, d = opt.headerData, w = $(opt.wrap).html(ui.render(tpl)), field = w.find("fieldset");
            $editor = w.hide();
            initView();
            
            field.append(ui.createRow({title: "样式",content: ui.typeselect.create({theme: "one-col",name: "theme", value:d["theme"], options: [{value: "theme1",content: ui.render('<img src="{{_staticurl_}}/res/pageui/images/header-left.png">')}, {value: "theme2", content: ui.render('<img src="{{_staticurl_}}/res/pageui/images/header-center.png">')}]})}));
            field.append(ui.switchrow.create({title: "首页按钮",name: "showHome",value: d["showHome"],content: ""}));
            field.append(ui.switchrow.create({title: "显示logo",name: "showLogo",value: d["showLogo"],content: ui.render(tpl_logo, d)}));
            field.append(ui.switchrow.create({title: "显示标题名称",tip: "标题名称，最多可输入20个字",name: "showSitename",value: d["showSitename"],content: ui.text.create({name: "siteName",value: d["siteName"],placeholder: "请输入标题名称"})}));
            field.append(ui.createRow({title: "",_last_: true,content: '<label>&nbsp;</label><div class="form-cell"><input class="confirm js-confirm" type="button" value="保存"><input type="button" class="js-cancel" value="取消"></div>'}));
            $editor.find("input[name=headerConfigId]").val(LINEWELL.page.header_conf.headerConfigId);
            
            ui.switchrow.init(w);
            ui.typeselect.init(w);
            ui.text.init(w);
            w.on("change", "input[name='theme']", function(e, v) {
                var t = $(this);
                $view.removeClass("header-theme1 header-theme2").addClass("header-" + v)
            }).on("change", "input[name='showHome']", function(e) {
                var t = $(this), v = t.val();
                if (v === "true") {
                    $view.find(".cell.home").css({display: ""})
                } else {
                    $view.find(".cell.home").css({display: "none"})
                }
            }).on("change", "input[name='showLogo']", function(e) {
                var t = $(this), v = t.val();
                if (v === "true") {
                    $view.find(".cell.site-logo").css({display: ""});
                    w.find(".config-header").removeClass("st-nologo")
                } else {
                    $view.find(".cell.site-logo").css({display: "none"});
                    w.find(".config-header").addClass("st-nologo")
                }
            }).on("change", "input[name='showSitename']", function(e) {
                var t = $(this), v = t.val();
                if (v === "true") {
                    $view.find(".cell.site-title").css({display: ""});
                    w.find(".config-header").removeClass("st-notitle")
                } else {
                    $view.find(".cell.site-title").css({display: "none"});
                    w.find(".config-header").addClass("st-notitle")
                }
            }).on("blur", "input[name='siteName']", function() {
                var t = $(this), v = t.val();
                if (!utils.inputValidate(v)) {
                	ui.alert({msg: "标题名称，长度为1-20个字"});
                	return false;
                }
                $view.find(".cell.site-title .mod-text").html("<b>" + utils.escapeHtml(v) + "</b>")
            }).on("click", ".js-add-logo", function() {
                uploader.start()
            }).on("click", ".js-confirm", function() {
                var t = $(this), f = t.parents("form.js-set-header");
                
                var postData = {};
                f.find("input[name]").each(function () {
                	postData[this.name] = this.value;
                })
                
                if (postData["showSitename"] == "true") {
                	if (!utils.inputValidate(postData["siteName"])) {
                		ui.alert({msg: "标题名称，长度为1-20个字"});
                		return false;
                	}
                } else {
                	postData["siteName"] = "";
                }
                
                $.ajax({
        			data : JSON.stringify(postData),
        			dataType : "json",
        			contentType : "application/json; charset=utf-8",
                	url: f.attr("action"),
                	type: f.attr("method"),
                	success: function(data) {
                        if (data.success) {
                            ui.insetSuccess({msg: "保存成功!",sourceElt: t,position: "center",timeout: 3e3,callback: function() {
                                    w.hide()
                                }})
                        } else {
                            ui.alert({msg: data.message})
                        }
                    }})
            }).on("click", ".js-cancel", function() {
                w.hide()
            })
        }};
    return c
});
