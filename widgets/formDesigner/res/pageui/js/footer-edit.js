define(["jquery", "ui", "vd"], function($, ui, vd) {
    var tpl = '<div class="config-footer">                        <div class="ui-warn content-setting-tip">以下选项对所有页面生效</div>                        <form class="js-set-footer" method="post" action="javascript:;" onsubmit="return false;">                            <fieldset></fieldset>                            <input type="hidden" name="mapp_id" value="{{_siteid_}}">                        </form>                </div>', $view, $editor, validator = new vd.Validator, error_msg = {"*": "底部描述不能超过100个字"};
    function initView() {
        $view = $("#phone-frame .kz-footer").wrap('<div class="module"><div class="module-box"></div></div>').closest(".module");
        $view.on("mouseenter", function(ev) {
            $view.addClass("module-cur")
        }).on("mouseleave", function(ev) {
            $view.removeClass("module-cur")
        }).on("click", function(ev) {
            $(".mod-config").css({visibility: "hidden"});
            $editor.show().css({visibility: "visible"});
            ev.preventDefault();
            ev.stopPropagation();
            return false
        })
    }
    var c = {init: function(opt) {
            var m = this, d = opt.footerData, w = $(opt.wrap).html(ui.render(tpl)), field = w.find("fieldset");
            $editor = w.hide();
            initView();
            field.append(ui.createRow({title: "底部描述",content: ui.richtext.create({name: "footer-text",theme: "simple",value: d["footer-text"]})}));
            field.append(ui.createRow({_last_: true,title: "&nbsp;",content: '<div class="form-cell"><input class="confirm js-confirm" type="button" value="确定"><input type="button" class="js-cancel" value="取消"></div>'}));
            ui.richtext.init(w);
            function validate() {
                var t = w.find("textarea[name='footer-text']"), row = t.parents(".form-row"), v = t.val();
                row.find(".tip-error").remove();
                var r = validator.init(v).length({max: 100,stripHtml: true});
                if (!r) {
                    var msg_key = validator.error, msg = error_msg[msg_key] ? error_msg[msg_key] : error_msg["*"];
                    ui.form.showError(row, msg);
                    return false
                }
                return true
            }
            w.on("change", "textarea[name='footer-text']", function() {
                var t = $(this), v = t.val();
                if (!validate()) {
                    return false
                }
                $view.find(".kz-footer .mod-text").html(v)
            }).on("click", ".js-confirm", function() {
                var t = $(this), f = t.closest("form");
                if (!validate()) {
                    return false
                }
                $.ajax({url: "/site/ajax-update-footer",type: "POST",dataType: "json",data: f.serialize(),success: function(data) {
                        if (data.ret === 0) {
                            ui.insetSuccess({msg: "保存成功!",sourceElt: t,position: "center",timeout: 3,callback: function() {
                                    w.hide()
                                }})
                        } else {
                            ui.alert({msg: data.msg})
                        }
                    }})
            }).on("click", ".js-cancel", function() {
                w.hide()
            })
        }};
    return c
});
