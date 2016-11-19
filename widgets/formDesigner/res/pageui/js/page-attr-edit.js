define("res/pageui/js/page-summary", [], function() {
    var c = {getSummary: function(items, len) {
            var summary = "", item;
            if (len < 1) {
                return ""
            }
            for (var i in items) {
                item = items[i];
                if (summary.length >= len) {
                    return summary
                }
                if (item.eid == 16 || item.eid == 32) {
                    if (item.value.richtext) {
                        summary += item.value.richtext.replace(/<[^>]*>/gi, "").replace(/\&[^;]+\;/gi, "")
                    }
                }
                if (item.items && item.items.length > 0) {
                    for (var j in item.items) {
                        var col = item.items[i];
                        summary += c.getSummary(col, len - summary.length);
                        if (summary.length >= len) {
                            return summary
                        }
                    }
                }
            }
            return summary
        }};
    return c
});
define(["jquery", "ui", "vd", "libui/utils", "res/pageui/js/page-summary", "libui/utils"], function($, ui, vd, utils, summary, utils) {
    var tpl = '<div class="config-page-attr">                        <form class="js-set-pageattr" method="post" action="javascript:;" onsubmit="return false;"> <input type="hidden" name="mAppId" value="{{mAppId}}"/>    <input type="hidden" name="pageId" value="{{pageId}}"/>                       <fieldset></fieldset>                        </form>                </div>', 
    tpl_page_layout = '<label class="checkbox">                <input type="checkbox" name="useHeader" value="{{useHeader}}" {{#useHeader}}checked{{/useHeader}}>显示标题栏            </label><br>            <label class="checkbox">                <input type="checkbox" name="useNav" value="{{useNav}}" {{#useNav}}checked{{/useNav}}>显示导航栏            </label>';
    var c = {
    	init: function(opt) {
            var m = this, d = opt.pageAttr, w = $(opt.wrap).html(ui.render(tpl, d)), titleWrap = opt.titleWrap, pageWrap = opt.pageWrap, field = w.find("fieldset");
            m.w = w;
            field.append(ui.createRow({title: "页面名称",tip: "页面名称，最多可输入20个字",content: ui.text.create({name: "name",value: d.name,placeholder: "请输入页面名称"})}));
            
            if (LINEWELL.page.page_type !== "LOGIN" && !LINEWELL.page.moduleId) {
            	field.append(ui.createRow({title: "显示设置","class": "js-layout-setting",content: ui.render(tpl_page_layout, d)}));
    		}
        	field.append(ui.createRow({title: "背景色",content: ui.colorpicker.create({mini: true,theme: "full",name: "bgcolor",value: d.bgcolor})}));
            field.append(ui.createRow({title: "",_last_: true,content: '<label>&nbsp;</label><div class="form-cell"><input class="confirm js-confirm" type="button" value="保存"><input type="button" class="cancel js-cancel" value="取消"></div>'}));
            ui.switchrow.init(w);
            ui.colorpicker.init(w);
            ui.text.init(w);
            var h = opt.titleWrap;
            w.on("change", ".js-layout-setting input[type='checkbox']", function() {
                var t = $(this);
                if (t.is(":checked")) {
                    this.value = true
                } else {
                    this.value = false
                }
            }).on("blur", "input[name='name']", function() {
                var t = $(this), v = t.val();
                if (!v) {
                	ui.alert({msg: "请输入页面名称"});
                	return false;
                }
                if (!utils.inputValidate(v)) {
                	ui.alert({msg: "页面名称，最多可输入20个字"});
                	return false;
                }
                titleWrap.find(".title-show .page-title").text(v)
            }).on("change", "input[name='bgcolor']", function() {
                var t = $(this), color = t.val()
            }).on("click", ".js-confirm", function() {
                var t = $(this), f = t.parents("form.js-set-pageattr"), name = f.find("input[name='name']").val();
                
                if (!name) {
                	ui.alert({msg: "请输入页面名称"});
                	return false;
                }
                if (!utils.inputValidate(name)) {
                	ui.alert({msg: "页面名称，最多可输入20个字"});
                	return false;
                }
                
                var postData = {};
                f.find("input[name]").each(function () {
                	postData[this.name] = this.value;
                })
                $.ajax({
                	url: "app.action?type=mappPageAction&operType=saveNavPageConfig", 
                	type: f.attr("method"),
        			data : JSON.stringify(postData),
        			dataType : "json",
        			contentType : "application/json; charset=utf-8",
                	success: function(data) {
                        if (data.success) {
                            ui.insetSuccess({
                            	msg: "保存成功!",
                            	sourceElt: t,
                            	position: "center",
                            	timeout: 1e3,
                            	callback: function() {
                            		window.location.reload();
                            	}
                            	
                            });
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
