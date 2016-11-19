define("ui-mod/base", ["jquery", "lib/mustache", "libui/utils", "libui/ds", "jquery-ui", "lib/bootstrap"], function(e, t, n, r) {
    
	$("body").on("mousewheel", ".options", function (e) {
    	var $options = $(this);
    	if (e.originalEvent.deltaY < 0 && $options.scrollTop() <= 0 ||
    			e.originalEvent.deltaY > 0 && $options.scrollTop() >= ($options[0].scrollHeight - $options.height())) {
    		return false;
    	}
    });
	var i = e('<div class="modal-backdrop"></div>'), s = '<div class="ui-pop-lite ui-pop-info">                            <p>{{msg}}</p>                            <div class="btn-con">                                <button class="confirm last" data-dismiss="modal">知道了</button>                            </div>                        </div>', o = '<div class="ui-pop-lite ui-pop-confirm{{#title}} with-title{{/title}}">                                {{#title}}<p class=\'title\'>{{title}}</p>{{/title}}                                <p class=\'msg\'>{{msg}}</p>                                <div class="btn-con">                                    <button class="confirm" data-action="confirm">{{#yes_text}}{{yes_text}}{{/yes_text}}{{^yes_text}}确定{{/yes_text}}</button>                                    <button class="button last" data-action="cancel">{{#no_text}}{{no_text}}{{/no_text}}{{^no_text}}取消{{/no_text}}</button>                                </div>                            </div>', u = '<div class="ui-pop-lite ui-pop-info">                                <p>{{msg}}</p>                                <div class="btn-con">                                    <button class="confirm last" data-dismiss="modal">知道了</button>                                </div>                            </div>', a = '<div class="ui-pop-lite ui-pop-prompt">                                <div class="msg">                                    <p>{{msg}}</p>                                    <input type="text" value="{{value}}" placeholder="{{placeholder}}">                                </div>                                <div class="btn-con">                                    <button class="confirm" data-action="confirm">确定</button>                                    <button class="button last" data-action="cancel">取消</button>                                </div>                            </div>', f = '<div class="ui-loading">                            <span class="icon-loading"></span>                            <h1>加载中...</h1>                        </div>', l = 0, c = '<div class="ui-toast">                            <div class="inner">                                <div class="msg">{{msg}}</div>                                <a href="javascript:;" title="关闭" class="close"><i class="ki24 icon24-close"></i></a>                            </div>                        </div>', h = '<div class="ui-pop-pwd ui-pwdconfirm">                                     <p class="title"></p>                                     <p class="msg"></p>                                     <input type="password" value="" placeholder="请输入登录密码">                                    <p class="error-tip">密码错误，请重新输入！</p>                                     <div class="btn-con">                                        <a class="button confirm large" data-action="confirm">确定</a>                                        <a class="button large last" data-action="cancel">取消</a>                                    </div>                                </div>', p = '<div class="ui-inset-success">                                    <div class="msg">{{msg}}</div>                                </div>', d = '<div class="ui-pop-lite ui-pop-img">                                <a class="close" data-role="close" data-dismiss="modal"><span class="ki24 icon-close"></span></a>                                <div class="img-w"><img src="{{image}}"></div>                            </div>', v = {}, m = {}, g = {alert: function(t) {
            typeof t == "string" && (t = {msg: t});
            var n = null, r = g.render(s, {msg: t.msg}), i = e(r).modal({show: !1,backdrop: !0,center: !0});
            e("body").append(i), i.on("hide", function() {
                n && clearTimeout(n), t.callback && t.callback.call(i), i.remove();
            }), !1 === t.autoHide && (n = setTimeout(function() {
                i.modal("hide"), n = null;
            }, 5e3)), i.modal("show");
        },imgpop: function(t) {
            typeof t == "string" && (t = {image: t});
            var n = g.render(d, t), r = e(n).modal({show: !1,backdrop: !0,center: !0});
            r.on("hide", function() {
                r.remove(), r = null;
            }), e("body").append(r);
            var i = new Image;
            i.src = t.image, i.onload = function() {
                r && r.modal("show");
            };
        },confirm: function(t) {
            v.prompt && v.prompt.remove(), v.confirm = e(g.render(o, t)).modal({show: !1,center: !1}), e("body").append(v.confirm), v.confirm = e(g.render(o, t)).modal({show: !1,center: !1}), e("body").append(v.confirm);
            if (t.sourceElt) {
                var n = t.sourceElt, r = n.offset(), i = e(window).width(), s = v.confirm.width(), u = 200;
                v.confirm.addClass("sourcehover"), i - r.left - s > u ? v.confirm.css({left: r.left,right: "auto",top: r.top}) : v.confirm.css({left: "auto",right: i - r.left,top: r.top});
            } else
                v.confirm.modal("center");
            v.confirm.one("click.action.modal", function(n, r) {
                r == "confirm" ? t.confirm && t.confirm.call(this) : r == "cancel" && t.cancel && t.cancel.call(this), e(this).modal("hide");
            }).one("hide", function() {
                t.hide && t.hide.call(this);
            }).modal("show");
        },prompt: function(t) {
            v.prompt && v.prompt.remove();
            var n = e(g.render(a, t)).modal({show: !1,center: !1,keyboard: !1});
            e("body").append(n);
            if (t.sourceElt) {
                var r = t.sourceElt, i = r.offset();
                n.addClass("sourcehover"), n.css({left: i.left,top: i.top});
            } else
                n.modal("center");
            n.on("click.action.modal", function(r, i) {
                if (i == "confirm") {
                    if (t.confirm) {
                        var s = n.find(":text").val();
                        t.confirm.call(this, s);
                    }
                } else
                    i == "cancel" && t.cancel && t.cancel.call(this);
                i && e(this).modal("hide");
            }).modal("show"), v.prompt = n;
        },info: function(t) {
            g.infoto && clearTimeout(g.infoto);
            var n, r = g.render(u, {msg: t.msg}), i = e(r).modal({show: !1,backdrop: !1,center: !1});
            e("body").append(i);
            var s = t.sourceElt, o = s.offset();
            i.addClass("sourcehover"), i.css({left: o.left,top: o.top}).modal("show"), t.autoHide && (n = setTimeout(function() {
                i.modal("hide"), n = null;
            }, 3e3)), i.on("hide", function() {
                t.callback && t.callback.call(i), n && clearTimeout(n), i.remove();
            });
        },insetSuccess: function(t) {
            v.insetSuccess && v.insetSuccess.remove(), m.insetSuccess && clearTimeout(m.insetSuccess), t.parent || (t.parent = e("body"));
            var n = e(g.render(p, t));
            t.parent.append(n);
            var r = n.width(), i = n.height();
            if (t.sourceElt) {
                var s = t.sourceElt, o = s.offset();
                n.addClass("sourcehover"), n.css({visibility: "visible",left: o.left,top: o.top,marginTop: 0,marginLeft: 0});
            } else
                t.position === "top" ? n.css({visibility: "visible",top: 10,marginTop: 0,marginLeft: 0 - r / 2}) : n.modal("center").css({visibility: "visible"});
            var u = t.timeout ? t.timeout : 3e3;
            m.insetSuccess = setTimeout(function() {
                n.addClass("hide"), t.callback && t.callback.call(n), m.insetSuccess = null;
            }, u), v.insetSuccess = n;
        },showModal: function(e) {
            e.append(i), i.show();
        },hideModal: function() {
            i.hide();
        },loading: function(t) {
            t || (t = {}), g.loading_pop || (g.loading_pop = e(f)), t.parent ? (t.parent.css({position: "relative"}), g.loading_pop.css({position: "absolute"}), i.css({position: "absolute"})) : (t.parent = e("body"), g.loading_pop.css({position: "fixed"}), i.css({position: "fixed"})), t.text || (t.text = "加载中..."), g.loading_pop.find("h1").html(t.text), t.parent.append(g.loading_pop), t.timeout ? (l && clearTimeout(l), l = setTimeout(function() {
                g.showModal(t.parent), g.loading_pop.show(), l = null;
            }, t.timeout)) : (g.showModal(t.parent), g.loading_pop.show());
        },hideLoading: function() {
            l && clearTimeout(l), g.loading_pop && (g.loading_pop.hide(), g.hideModal());
        },toast: function(t, n) {
            var r = c.replace("{{msg}}", t), i = e(r), s = e("body");
            s.append(i), i.on("click", "a.close", function() {
                i.remove(), n.call();
            });
        },pwdconfirm: function(t, n) {
            v.pwdconfirm || (v.pwdconfirm = e(h), e("body").append(v.pwdconfirm)), v.pwdconfirm.find(".title").html(t.title), v.pwdconfirm.find(".msg").html(t.msg), v.pwdconfirm.on("click", '[data-action="confirm"]', function(t, r) {
                e.ajax({url: "/plugin/ajax-sure-pwd",type: "POST",data: {mapp_id: LINEWELL.page.mapp_id,pwd: v.pwdconfirm.find("input").val()},success: function(e) {
                        var t = JSON.parse(e);
                        t.ret == 1 ? (n.call(this), v.pwdconfirm.modal("hide")) : v.pwdconfirm.find(".error-tip").show();
                    }});
            }).on("click", '[data-action="cancel"]', function(e, t) {
                v.pwdconfirm.modal("hide");
            }).modal("show");
        }}, y = /\/img\/s_w[\d]+h[\d]+/, b = /\d+-\d+$/, w = /([^\/^\-]{32})-\d+-\d+$/, E = /\d+x\d+$/;
    return g.getImage = function(e, t, n) {
        t = t !== undefined ? t : 0, n = n !== undefined ? n : 0;
        if (e.match(E))
            t === 0 && n === 0 ? e = e.replace(/\/imageView\/.+/, "") : e = e.replace(E, "" + t + "x" + n);
        else if (e.match(b)) {
            t === 0 && n === 0 && (t = n = 700);
            if (t === 320 && n === 0)
                return e = e.replace(w, "img/s_w320h0/$1-640-0");
            e = e.replace(b, "" + t + "-" + n);
        } else
            e.match(y) && (e = e.replace(y, "/img/s_w" + t + "h" + n));
        return e;
    }, g.render = function(n, r) {
        typeof r == "string" && (r = e.parseJSON(r));
        var i = {};
        return e.extend(i, {_staticurl_: LINEWELL.staticurl,_siteid_: LINEWELL.page.mapp_id,_pageid_: LINEWELL.page.page_id,_emptygif_: LINEWELL.staticurl + "/res/skin/images/empty.gif"}, r), t.to_html(n, i).replace(/^\s*/gm, "");
    }, g.createRow = function(e) {
        var t = e.title ? "<div class='form-row {{#_last_}}last{{/_last_}} {{class}}'>{{#title}}<label>{{title}}</label>{{/title}}<div class='form-cell'>{{content}}{{#tip}}<span class='tip tip-info next-line'>{{tip}}</span>{{/tip}}</div></div>" : "<div class='form-row {{#_last_}}last{{/_last_}} {{class}}'>{{content}}</div>";
        return g.render(t, e);
    }, g;
}), define("ui-mod/basedialog", ["jquery", "ui-mod/base", "jquery-ui", "lib/bootstrap"], function(e, t) {
    var n = '<div class="ui-pop-lite {{class}}">                    {{#title}}<div class="title">{{title}}</div>{{/title}}                    {{#content}}<div class="msg">{{content}}</div>{{/content}}                    {{#has_button}}<div class="btn-con">                        {{#buttons}}                        <button class="{{#primary}}confirm{{/primary}}{{^primary}}button{{/primary}}{{#last}} last{{/last}}" data-signal="{{signal}}">{{text}}</button>                        {{/buttons}}                    </div>{{/has_button}}                </div>', r = {hide: function(e) {
            e.modal("hide");
        },pre_hide: function(e) {
            return !0;
        },post_hide: function(e) {
            e.remove();
        },pre_show: function(e) {
            return !0;
        },post_show: function(e) {
        }};
    return t.basedialog = {create: function(e) {
            return e.has_button = !1, e.buttons && e.buttons.length > 0 && (e.has_button = !0, e.buttons[e.buttons.length - 1].last = !0), t.render(n, e);
        },init: function(t, n) {
            var i = e.extend({}, r, n.events);
            t.on("click", "[data-signal]", function() {
                var n = e(this), r = n.data("signal");
                i[r] ? i[r].call(this, t) : console.log("pop signal not handled " + r);
            }).on("show", function() {
                i.post_show.call(this, t);
            }).on("hide", function() {
                i.post_hide.call(this, t);
            });
        },open: function(t) {
            var n = this.create(t.options), r = e(n).modal({show: !1,backdrop: t.backdrop,center: !1});
            e("body").append(r), this.init(r, t);
            if (t.position instanceof e) {
                r.addClass("sourcehover");
                var i = t.position, s = i.offset(), o = e(window).width(), u = r.confirm.width(), a = 200;
                o - s.left - u > a ? r.css({left: s.left,right: "auto",top: s.top}) : r.css({left: "auto",right: o - s.left,top: s.top});
            } else
                t.position === "center" && r.modal("center");
            return r.modal("show"), r;
        }}, t.basedialog;
}), define("ui-mod/form", ["jquery", "ui-mod/base"], function(e, t) {
    var n = '<span class="tip tip-error"><i class="ki28 ki28-tip-error"></i><span>{{msg}}</span></span>', r = '<span class="tip tip-error next-line"><i class="ki28 ki28-error-nextline"></i><span>{{msg}}</span></span>', i = '<span class="tip tip-right"><i class="ki28 ki28-tip-right"></i><span>{{msg}}</span></span>';
    return t.form = {findRow: function(e, t) {
            return e.find(":input[name='" + t + "']").parents(".form-row");
        },showError: function(i, s, o) {
            i.addClass("error");
            var u = t.render(o ? r : n, {msg: s}), a = i.find(".form-cell .next-line");
            i.find(".form-cell .tip-error, .form-cell .tip-right").remove(), a.length > 0 ? e(u).insertBefore(a) : i.find(".form-cell").append(u);
        },clearError: function(e) {
            e.removeClass("error").find(".form-cell .tip-error").remove();
        },showRight: function(n, r) {
            n.find(".form-cell .tip-error, .form-cell .tip-right").remove();
            var s = t.render(i, {msg: r}), o = n.find(".form-cell .next-line");
            o.length > 0 ? e(s).insertBefore(o) : n.find(".form-cell").append(s);
        }}, t.form;
}), define("ui-mod/tab", ["jquery", "ui-mod/base", "jquery-ui", "lib/bootstrap"], function(e, t) {
    return t.tab = {tpl: '<div class="ui-tab {{theme}}">                    <ul class="tab-nav">						{{#tab_nav}}                        <li class="{{#cur}}cur{{/cur}} {{class}} {{extra_class}}">                            <a href="javascript:;">{{title}}</a>                        </li>						{{/tab_nav}}                    </ul>                    <div class="tab-panels">						{{#tab_content}}                        <div class="tab-content{{#cur}} cur{{/cur}}">							{{content}}                        </div>                        {{/tab_content}}                    </div>                </div>',init: function(t) {
            t.on("click", ".ui-tab ul.tab-nav li", function() {
                var t = e(this), n = t.index();
                t.siblings().removeClass("cur"), t.addClass("cur"), t.parents(".ui-tab").find(".tab-panels > .tab-content").removeClass("cur").eq(n).addClass("cur");
            });
        },create: function(e) {
            var n = -1;
            for (var r in e.tab_nav)
                e.tab_nav[r].cur && (n = r);
            return n === -1 && (n = 0, e.tab_nav[n].cur = !0), e.tab_content[n].cur = !0, t.render(this.tpl, e);
        }}, t.tab;
}), define("ui-mod/text", ["jquery", "ui-mod/base", "libui/utils"], function(e, t, n) {
    return t.text = {tpl: '<input type="text" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}" class="{{class}}">',init: function(t) {
            t.on("keyup", ":text", function() {
                var t = e(this);
                var value = t.val();
	            value = n.escapeHtml(value);
                t.trigger("change", value);
            });
        },create: function(e) {
            return e.value && (e.value = n.escapeHtml(e.value)), t.render(this.tpl, e);
        }}, t.text;
}), define("ui-mod/select", ["jquery", "ui-mod/base", "jquery-ui", "lib/bootstrap"], function(e, t) {
    return t.select = {
    	tpl: '<div class="select {{class}} {{extra_class}}">                    <div class="selected"><span data-role="value-display">{{_cur_name_}}</span><i class="ki24 icon24-arrow-down"></i></div>                    <input type="hidden" name="{{name}}" value="{{_value_}}">                    <div class="options-w">                        <ul class="options">                            {{#options}}                            <li class="{{#cur}}cur{{/cur}}{{#disabled}} disabled{{/disabled}}" data-val="{{value}}">{{name}}</li>                            {{/options}}                        </ul>                    </div>                </div>',init: function(t) {
            t.on("click", ".select .options li:not('.disabled')", function() {
                var t = e(this), n = t.parents(".select"), r = t.data("val");
                t.siblings().removeClass("cur"), t.addClass("cur"), typeof r == "object" && (r = e.toJSON(r)), n.find(".selected [data-role='value-display']").html(t.html()), n.find("input[type=hidden]").val(r).trigger("change", r), n.find(".options-w").hide();
            }).on("mouseenter", ".select", function() {
                var t = e(this);
                t.find(".options-w").show();
            }).on("mouseleave", ".select", function() {
                var t = e(this);
                t.find(".options-w").hide();
            });
        }, 
        create: function(e) {
            var n = null;
            for (var r in e.options)
                e.options[r].cur && (n = e.options[r]);
            if (e.value != undefined)
                for (var r in e.options)
                    e.options[r].value == e.value && (n = e.options[r]);
            return n ? (e._cur_name_ = n.name, e._value_ = n.value) : e._cur_name_ = e.placeholder, t.render(this.tpl, e);
        }
    }, t.select;
}), define("ui-mod/paging", ["jquery", "ui-mod/base", "libui/ds", "jquery-ui", "lib/bootstrap"], function(e, t, n) {
    return t.paging = {tpl: '<div class="page js-put-paging">                        <a href="javascript:;" class="prev" data-page="{{pre}}">&lt;</a>                        {{#list}}                        <a href="javascript:;" {{^cur}}data-page="{{page}}"{{/cur}} {{#cur}}class="cur"{{/cur}}>{{page}}</a>                        {{/list}}                        <a href="javascript:;" class="next" data-page="{{next}}">&gt;</a>                    </div>',init: function(t, n) {
            var r = this;
            if (t.data("ui-paging-init"))
                return !1;
            t.on("click", ".page a:not(.cur)", function() {
                var t = e(this), i = t.parents(".page"), s = t.data("page");
                
                n.fetch.call(r, s);
            }), t.data("ui-paging-init", !0);
        },create: function(e) {
            var n = {}, i = e.perpage ? e.perpage : 6, s = Math.ceil(e.total / i), o = [];
            var r = e.page;
            if(r == 0){
            	r = 1;
            }else if(r == -1){
            	r = s;
            }
            n.pre = r - 1;
            if(r === s){
            	n.next = 0;
            }else if(n.pre === 0){
            	n.pre = -1;
            	n.next = r + 1;
            }else{
            	n.next = r + 1;
            }
           
            if (s > 5)
                for (var u = 0; u < s; u++) {
                    var a = r - 2, f = r + 2;
                    a = a < 1 ? 1 : a, f = f < 5 ? 5 : f, a - 2 < u && u < f && o.push({page: u + 1,cur: r === u + 1});
                }
            else{
            	
            	for (var u = 0; u < s; u++){
                	o.push({page: u + 1,cur: r === u + 1});
                }  
            }
            	
                 
            return n.list = o, t.render(this.tpl, n);
        	}
        }, t.paging;
}), define("ui-mod/colorpanel", ["jquery", "ui-mod/base", "jquery-ui", "lib/bootstrap"], function(e, t) {
    var n = '<div class="ui-pop-lite ui-color-panel">                        <ul>                            {{#colors}}                            <li>                                <a data-color="{{color}}" href="javascript:;"><em style="background: {{color}}"></em></a>                            </li>                            {{/colors}}                            <li class="none">                                <a data-color="rgba(255,255,255,0)" href="javascript:;"></a>                            </li>                        </ul>                    </div>', r = ["#000", "#930", "#330", "#030", "#036", "#000080", "#339", "#333", "#800000", "#f60", "#808000", "#008000", "#008080", "#00f", "#669", "#808080", "#f00", "#f90", "#9c0", "#396", "#3cc", "#36f", "#800080", "#999", "#f0f", "#fc0", "#ff0", "#0f0", "#0ff", "#0cf", "#936", "#C0C0C0", "#f9c", "#fc9", "#ff9", "#cfc", "#9cf", "#c9f", "#fff"], i;
    return t.colorpanel = function(s) {
        if (!i) {
            var o = [];
            for (var u in r)
                o.push({color: r[u]});
            i = e(t.render(n, {colors: o})).modal({show: !1,backdrop: !1,center: !1});
        }
        var a = s.sourceElt, f = a.offset();
        a.data("colorpanel-trigger", !0), i.off("click", "ul li a").off("clickoutside").on("click", "ul li a", function() {
            var t = e(this), n = t.data("color");
            s.colorChange(n), i.modal("hide");
        }).on("clickoutside", function(t) {
            var n = e(t.target);
            if (n.data("colorpanel-trigger") || e.contains(a[0], n[0]))
                return;
            i.modal("hide");
        }).css({left: f.left - 172,top: f.top + 25}).modal("show");
    }, t.colorpanel;
}), define("ui-mod/colorpicker", ["jquery", "ui-mod/base", "ui-mod/colorpanel", "jquery-ui", "lib/bootstrap"], function(e, t) {
    function s(e, t) {
        var n = e.data("name");
        e.find(".current-color .color-cur").css({backgroundColor: t}), e.find("input[name='" + n + "']").val(t).trigger("change", t);
    }
    var n = [{value: "#FFFFFF"}, {value: "#ececec"}, {value: "#f9f2cd"}, {value: "#e2effe"}, {value: "#ffeceb"}, {value: "#ffe7d3"}, {value: "#f3e9ff"}, {value: "#76923c"}, {value: "#953734"}, {value: "#17365d"}], r = '<div class="ui-color-pick {{#mini}}ui-color-pick-mini{{/mini}}" data-name="{{name}}">                <ul>                {{#options}}                    <li{{#cur}} class="cur"{{/cur}} style="background-color: {{value}};" data-color="{{value}}">                        <i class="font-ico">&#xe011;</i>                    </li>                {{/options}}                </ul>                <input type="hidden" name="{{name}}" value="{{value}}">            </div>', i = '<div class="ui-color-pick {{#mini}}ui-color-pick-mini{{/mini}}" data-name="{{name}}">                <div class="current-color">                    <div class="color-cur" style="background-color: {{value}}"></div>                    <input class="color-val" type="text" name="{{name}}" value="{{value}}">                    <a class="more-color js-more-color" href="javascript:;">更多颜色</a>                </div>                <div class="ui-inset">                    <ul>                    {{#options}}                        <li{{#cur}} class="cur"{{/cur}} style="background-color: {{value}};" data-color="{{value}}">                            <i class="font-ico">&#xe011;</i>                        </li>                    {{/options}}                    </ul>                </div>            </div>';
    return t.colorpicker = {init: function(n) {
            n.on("click", ".ui-color-pick li", function() {
                var t = e(this), n = t.parents(".ui-color-pick"), r = t.data("color");
                t.siblings().removeClass("cur"), t.addClass("cur"), s(n, r);
            }).on("click", ".ui-color-pick .js-more-color", function() {
                var n = e(this), r = n.parents(".ui-color-pick");
                t.colorpanel({sourceElt: n,colorChange: function(e) {
                        r.find("ul li").removeClass("cur"), s(r, e);
                    }});
            });
        },create: function(e) {
            e.options || (e.options = n);
            if (e.value && e.options)
                for (var s in e.options)
                    e.options[s].cur = e.value === e.options[s].value;
            var o = e.theme === "full" ? i : r;
            return t.render(o, e);
        }}, t.colorpicker;
}), define("ui-mod/iconpanel", ["jquery", "ui-mod/base", "libui/utils", "jquery-ui", "lib/bootstrap"], function(e, t, n) {
    var r = '<div class="ui-icon-panel">                                    <ul>                                        {{#icons}}                                        <li {{#cur}}class="cur"{{/cur}}>                                            <a data-icon="{{icon_val}}" href="javascript:;"><i class="font-ico">{{icon}}</i><i class="ico-selected"></i></a>                                        </li>                                        {{/icons}}                                    </ul>                                </div>', i = ["&#xE780;", "&#xE781;", "&#xE782;", "&#xE783;", "&#xE784;", "&#xE785;", "&#xE786;", "&#xE787;", "&#xE789;", "&#xE78a;", "&#xE78b;", "&#xE78c;", "&#xE78d;", "&#xE78e;", "&#xE78f;", "&#xE790;", "&#xE791;", "&#xE792;", "&#xE793;", "&#xE794;", "&#xE795;", "&#xE796;", "&#xE797;", "&#xE798;", "&#xE798;", "&#xE799;", "&#xE79a;", "&#xE79b;", "&#xE79c;", "&#xE79d;"], s;
    return t.iconpanel = function(n) {
        if (!s) {
            var o = [];
            for (var u in i)
                o.push({icon_val: i[u],icon: i[u]});
            s = e(t.render(r, {icons: o})).modal({show: !1,backdrop: !1,center: !1});
        }
        var a = n.sourceElt, f = a.offset();
        n.value || (n.value = ""), s.find("ul li").removeClass("cur"), s.find("ul li a[data-icon='" + n.value + "']").parent().addClass("cur"), a.data("iconpanel-trigger", !0), s.off("click", "ul li a").off("clickoutside").on("click", "ul li a", function() {
            var t = e(this), r = t.data("icon");
            n.iconChange(r), s.modal("hide");
        }).on("clickoutside", function(t) {
            var n = e(t.target);
            if (n.data("iconpanel-trigger"))
                return;
            s.modal("hide");
        }).css({left: f.left - 300,top: f.top + 40}).modal("show");
    }, t.iconpanel;
}), define("ui-mod/iconselect", ["jquery", "ui-mod/base", "ui-mod/iconpanel", "jquery-ui", "lib/bootstrap"], function(e, t) {
    function s(e) {
        var t = e.data("name");
        return e.find("input[name='" + t + "']").val();
    }
    function o(e, t) {
        var n = e.data("name");
        e.find("input[name='" + n + "']").val(t).trigger("change", t);
    }
    var n = '<div class="ui-iconselect" data-name="{{name}}">                <ul>                    {{#icons}}                    <li {{#cur}}class="cur"{{/cur}}>                        <a data-icon="{{icon_val}}" href="javascript:;"><i class="font-ico {{class}}">{{icon}}</i><i class="ico-selected"></i></a>                    </li>                    {{/icons}}                </ul><a href="javascript:;" class="add js-add"><i class="ico">+</i><br>更多</a>                <input type="hidden" name="{{name}}" value="{{value}}">            </div>', r = ["&#xE630;", "&#xE614;", "&#xE682;", "&#xE68F;", "&#xE690;"];
    for (var i in r)
        r[i] = e("<textarea />").html(r[i]).text();
    return t.iconselect = {create: function(e) {
            e.value || (e.value = "");
            var i = [];
            e.required || i.push({icon: "无",icon_val: "","class": "no-icon",cur: e.value === ""});
            for (var s in r) {
                var o = r[s];
                i.push({icon: o,icon_val: o,cur: e.value === o});
            }
            return t.render(n, {name: e.name,value: e.value,icons: i});
        },init: function(n) {
            if (n.data("iconselect-init"))
                return !1;
            n.on("click", "ul li a", function() {
                var t = e(this), n = t.parents("li"), r = t.data("icon"), i = t.parents(".ui-iconselect");
                n.siblings().removeClass("cur"), n.addClass("cur"), o(i, r);
            }).on("click", ".js-add,.ico", function() {
                var n = e(this), r = n.parents(".ui-iconselect");
                r.find("ul li").removeClass("cur"), t.iconpanel({sourceElt: n,value: s(r),iconChange: function(e) {
                        o(r, e);
                    }});
            }), n.data("iconselect-init", !0);
        }}, t.iconselect;
}), define("ui-mod/slider", ["jquery", "ui-mod/base", "jquery-ui", "lib/bootstrap"], function(e, t) {
    return t.slider = {tpl: '<div class="ui-slider" data-min="{{min}}" data-max="{{max}}" data-unit="{{unit}}" data-precision="{{precision}}">                    <span class="progress-w"><i style="left: {{_percent_}};position:absolute;" class="icon24-slider-handler handler"></i><span class="progress"><em style="width: {{_percent_}};"></em></span></span><span class="value">{{value}}{{unit}}</span>                    <input type="hidden" name="{{name}}" value="{{value}}">                </div>',init: function(t) {
            function r(t, n) {
                var r = e(this), i = n.find(".progress"), s = i.width(), o = t / s;
                i.find("em").css({width: t + "px"});
                var u = n.data("min"), a = n.data("max"), f = n.data("unit"), l = n.data("precision"), c = (u + (a - u) * o).toFixed(l);
                c = c < u ? u : c, c = c > a ? a : c, n.find(".value").text(c + f), n.find("input[type='hidden']").val(c).trigger("change", c);
            }
            var n = t.find(".ui-slider .handler");
            for (var i = 0; i < n.length; i++) {
                var s = n.eq(i), o = s.data("percent"), u = s.parents(".progress-w").width() - 24;
                s.css({left: o * u + "px"});
            }
            n.draggable({axis: "x",containment: "parent",drag: function(t, n) {
                    var i = e(this), s = i.parents(".ui-slider"), o = n.position.left;
                    r(o, s);
                }}), t.on("click", ".ui-slider .progress", function(t) {
                var n = e(this), i = t.offsetX, s = n.parents(".ui-slider");
                s.find(".handler").css({left: i}), r(i, s);
            });
        },create: function(e) {
            return typeof e.value == "string" && e.unit && (e.value = e.value.replace(e.unit, "")), e.precision || (e.precision = 0), e._percent_ = 232 * (e.value - e.min) / (e.max - e.min) + "px", t.render(this.tpl, e);
        }}, t.slider;
}), define("ui-mod/typeahead", ["jquery", "ui-mod/base", "libui/utils", "libui/ds", "jquery-ui", "lib/bootstrap"], function(e, t, n, r) {
    return t.typeahead = {tpl: '<div class="ui-typeahead js-typeahead">                    <input type="text" value="{{text}}" placeholder="{{placeholder}}">                    <input type="hidden" name="{{name}}" value="{{value}}">                </div>',tpl_options: '{{#options.length}}                <ul class="options">                {{#options}}                    <li{{#cur}} class="cur"{{/cur}} data-val="{{value}}">{{name}}</li>                {{/options}}                </ul>                {{/options.length}}                {{^options}}<div class="options"><div class="nocontent">无匹配选项</div></div>{{/options}}',create: function(e) {
            return t.render(this.tpl, e);
        },init: function(n, r) {
            var i = this;
            n.on("keyup", ".js-typeahead :text", function() {
                var n = this.value, s = e(this), o = s.parents(".js-typeahead");
                n !== "" && r.fetch.call(s, n, function(e) {
                    var n = t.render(i.tpl_options, e);
                    o.find(".options").remove(), o.append(n);
                });
            }).on("mouseenter", ".js-typeahead", function() {
                e(this).removeClass("state-blur");
            }).on("focus", ".js-typeahead :text", function() {
                e(this).parents(".js-typeahead").removeClass("state-blur");
            }).on("click", ".js-typeahead .options li", function(t) {
                var n = e(this), r = n.parents(".js-typeahead"), i = n.data("val");
                r.find(":text").val(n.text()), typeof i == "object" && (i = e.toJSON(i)), r.find("input[type='hidden']").val(i).trigger("change", i), r.addClass("state-blur");
            });
        }}, t.typeahead;
}), define("ui-mod/linkselect", ["jquery", "ui-mod/base", "libui/utils", "libui/ds", "jquery-ui", "lib/bootstrap"], function(e, t, n, r) {
    function u(e) {
        var t = [{val: 3,name: "页面"}, {val: 2,name: "审批"}, {val: 4,name: "日常"}, {val: 1,name: "URL"}];
        for (var n in t)
            if (t[n].val == e)
                return t[n].name;
    }
    var i = '<a href="javascript:;" class="ui-linkselect-addlink">                    <span class="icon-icon_add"></span>                    <span>添加链接</span>                </a>', s = '<div class="ui-linkselect-in">                    <span class="ui-linkselect-title">{{title}}</span>                    {{^nolink_del}}                    <a href="javascript:;" class="ui-linkselect-del">删除</a>                    {{/nolink_del}}                    <a href="javascript:;" class="ui-linkselect-update">修改</a>                </div>', o = '<div class="ui-linkselect" data-name="{{name}}">                {{^link}}' + i + "{{/link}}                {{#link}}" + s + '{{/link}}				<input type="hidden" name="{{name}}" value="{{value}}">			</div>';
    return t.linkselect = {init: function(n) {
            var r = n.find(".ui-linkselect");
            r.each(function(n) {
                function u(t) {
                    var n = e.toJSON(t);
                    r.find("input[name='" + o + "']").val(n).trigger("change", n);
                }
                var r = e(this), o = r.data("name");
                r.on("click", ".ui-linkselect-addlink", function() {
                    t.linkdialog({value: e.evalJSON(r.find("input[name='" + o + "']").val()),confirm: function(e) {
                            u(e), r.find(".ui-linkselect-addlink").remove();
                            var n = e.link_res_name;
                            r.append(t.render(s, {title: n}));
                        }});
                }).on("click", ".ui-linkselect-update", function() {
                    t.linkdialog({value: e.evalJSON(r.find("input[name='" + o + "']").val()),confirm: function(e) {
                            u(e), r.find(".ui-linkselect-in").remove();
                            var n = e.link_res_type == 1 ? e.link : e.link_res_name;
                            r.append(t.render(s, {title: n}));
                        }});
                }).on("click", ".ui-linkselect-del", function() {
                    var n = {link: "",link_res_type: 3,link_res_id: 0,link_res_name: ""};
                    u(n), e(".ui-linkselect-in").remove(), r.append(t.render(i, {}));
                });
                if (r.data("linkselect-init"))
                    return
            });
        },create: function(r) {
            var i = {};
            return r.value && typeof r.value == "object" && (r.value.link_res_type = parseInt(r.value.link_res_type), i.name = r.name, i.value = n.escapeHtml(e.toJSON(r.value)), i.typename = u(r.value.link_res_type), i.link = r.value.link && r.value.link != "javascript:;" && r.value.link != "javascript:void(0);", i.title = r.value.link_res_type == 1 ? r.value.link : r.value.link_res_name, i.nolink_del = r.nolink_del ? !0 : !1), t.render(o, i);
        }}, t.linkselect;
}), define("ui-mod/linkdialog", ["jquery", "ui-mod/base", "libui/utils", "libui/ds"], function(e, t, n, r) {
    function v(i, s) {
        typeof s.value == "string" && (s.value = JSON.parse(s.value));
        if (!s.value || !s.value.link_res_type)
            s.value = {link_res_id: 0,link_res_type: 3};
        i.find('.itemlist [data-val="' + s.value.link_res_type + '"]').trigger("click"), t.select.init(i), t.typeahead.init(i, {fetch: function(t, i) {
                var s = e(this).parents(".ui-linkdialog").find(".itemlist .cur").data("val");
                s == 2 ? r.post.search({q: t,onReady: function(t) {
                        var r = [], s;
                        if (t.count > 0) {
                            s = t.list;
                            for (var o = 0; o < s.length; o++)
                                r.push({name: s[o].name,value: n.escapeHtml(e.toJSON({link_res_id: s[o].id,link_res_name: s[o].name,link: s[o].link}))});
                        }
                        i.call(this, {options: r});
                    }}) : s == 12 && r.forum.search({q: t,onReady: function(t) {
                        var r = [], s;
                        if (t.count > 0) {
                            s = t.list;
                            for (var o = 0; o < s.length; o++)
                                r.push({name: s[o].name,value: n.escapeHtml(e.toJSON({link_res_id: s[o].id,link_res_name: s[o].name,link: s[o].link}))});
                        }
                        i.call(this, {options: r});
                    }});
            }});
    }
    function m(r, i) {
    	var $container = r.find(".itemlist .cur")
        var s = $container.data("val");
        var status = $container.data("status") || "0"; // 0 unloaded, 1 loading, 2 loaded
        status = parseInt(status);
        
        o = i.link_res_type == s ? i : {};
     //判断链接类型
        switch (s) {
        case 3:
            var u = '<span>选择页面</span><div class="ui-placeholder"></div>';
            r.find(".content").html(u);
            getPagelist(function (i) {
                var s = [];
                for (var u = 0; u < i.length; u++)
                    s.push({
                        name: i[u].is_published == 0 ? "(未发布)" + i[u].name : i[u].name,
                        cur: i[u].id == o.link_res_id,//已选择上的ID
                        value: n.escapeHtml(e.toJSON({
                            link_res_id: i[u].id,
                            link_res_name: i[u].name,
                            link_res_type: 3,
                            link: i[u].link
                        })),
                        disabled: i[u].is_published == 0
                    });
                var a = t.select.create({
                    name: "link-data",
                    options: s,
                    placeholder: "请选择页面"
                });
                r.find(".ui-placeholder").html(a);
            });
            break;
            case 2:
            	var u = '<span>选择模块</span><div class="ui-placeholder"></div>';
                r.find(".content").html(u);
                
                getApprovelist(function(modules) {
                    if (!modules || modules.length == 0)
                        r.find(".content").html("<div style=\"text-align:center\">当前没有已启用的审批模块</div>");
                    else {
                        var u = [];
                        for (var i = 0, len = modules.length; i < len; i++) {
                        	u.push({
                            	name: modules[i].name,
                            	cur: modules[i].moduleId == o.module_id,
                            	value: n.escapeHtml(e.toJSON({
                            		link_res_id: modules[i].pageList["pageId"],
                            		link_res_name: modules[i].name,
                                    link_res_type: 2,
                                    module_id : modules[i].moduleId,
                                    link : "id"
                            	}))
                            });
                        }
                        r.find(".ui-placeholder").html(t.select.create({name: "link-data",options: u,placeholder: "请选择模块"}));
                    }
                });
                break;
            case 4:                

                
                $.ajax({
                	url : "app.action?type=mappPageAction&operType=getDailyLinkList&mapp_id=" + LINEWELL.page.mapp_id,
                	type: "GET",
                	dataType: "json"
                }).done(function (data) {
                	
                	if (!data.success) {
                		return;
                	}
                	
                	if (!data.content || data.content.length === 0) {
                		r.find(".content").html("<div style=\"text-align:center\">当前没有已启用的日常模块</div>");
                		return;
                	}
                	
                    var u = '<span>选择模块</span><div class="ui-placeholder" style="width:30%"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>选择页面</span><div class="ui-placeholder" style="width:30%"></div>';
                    r.find(".content").html(u);
                    var s = [t.select.create({name: "module_id", options:[], placeholder: "请选择模块"}), t.select.create({name: "link-data", options:[], placeholder: "请选择页面"})];
                    var selectors = r.find(".ui-placeholder").each(function (index) {
                    	$(this).html(s[index]).find(".select").css("width", "100%");
                    });
                	
                	// 当前值回填
                	for (var i = 0, len = data.content.length; i < len; i++) {
                		var pageList = [];
                		var cur = null;
                		for (var j in data.content[i].pageList) {
                			if (o.link_res_id === j) {
                				cur = j;
                			}
                		}
                		if (o.module_id === data.content[i].moduleId) {
                			data.content[i].cur = true;
                			selectors.eq(0).find(".selected span").text(data.content[i].name);
                			renderPageList(r, data.content[i].moduleId, data.content[i].name, data.content[i].pageList, cur);
                		}
                		data.content[i].pageList = JSON.stringify(data.content[i].pageList);
                	}
                	
                	var tpl_module_item = '{{#content}}<li data-val="{{moduleId}}" data-page-list=\'{{pageList}}\'>{{name}}</li>{{/content}}';
                	
                	// 模块列表容器
                	r.find(".select ul.options").eq(0).html(t.render(tpl_module_item, data)).find("li").click(function () {
                		
                		var $this = $(this);
                		
                		// 加载页面
                		var moduleId = $this.data("val");
                		var moduleName = $this.text();
                		var pageList = $(this).data("page-list");
                		renderPageList(r, moduleId, moduleName, pageList);
                	});
                	
                });
                
                // 加载模块
                var modules = [];
                if (modules)
                var module_select = '<span>请选择模块</span><div class="ui-placeholder"></div>';
                break;
            case 1:
                var u = '<span>URL</span><div class="ui-placeholder js-put-pageselect"></div>';
                r.find(".content").html(u);
                var a = t.text.create({ name: "link-data", value: o.link == "javascript:;" ? "" : o.link, placeholder: "请输入URL" });
                r.find(".ui-placeholder").html(a);
                break;
            default:
                a = '<div class="ui-placeholder"></div>', r.find(".content").html(a);
        }
    };
    
    /**
     * 获取审批列表
     */
    function getApprovelist(callback) {
    	$.ajax({
        	url : "app.action?type=mappPageAction&operType=getApproveLinkList&mapp_id=" + LINEWELL.page.mapp_id,
        	type: "GET",
        	dataType: "json"
        }).done(function (data) {
        	callback.call(null, data.content)
        });
    };
    
    /**
     * 渲染页面下拉列表
     */
    function renderPageList(r, moduleId, moduleName, pageList, cur) {
    	var $pageListContainer = r.find(".select ul.options").eq(1);
    	$pageListContainer.empty();
		for (var i in pageList) {
			var value = n.escapeHtml(e.toJSON({
                link_res_id: i,
                link_res_name: moduleName + "(" + pageList[i] + ")",
                link_res_type: 4,
                module_id : moduleId,
                link : "id"
            }));
			var $li = $("<li data-val=\"" + value + "\"/>").text(pageList[i]).appendTo($pageListContainer);
			i === cur && $li.trigger("click");
		}
    };
    function g(t) {
        e.ajax({url: "/api-bridge/site/ajax-open-module",type: "get",dataType: "json",data: {mapp_id: LINEWELL.page.mapp_id,module_name: t},success: function(e) {
            }});
    }
    function y(t) {
        if (!t.find('[name="link-data"]').val())
            return !1;
        var n = t.find(".itemlist .cur").data("val");
        if (n == 1) {
            var r = null, i = t.find('[name="link-data"]').val();
            return !/^https{0,1}:\/\//.test(i) && !/^[a-z0-9\-]+:/.test(i) ? r = "http://" + i : r = i, {link_res_type: 1,link_res_id: 0,link_res_name: r,link: r,link_res_type_name: p[n]};
        }
        var s = e.extend({link_res_type: n,link_res_type_name: p[n]}, JSON.parse(t.find('[name="link-data"]').val()));
        return s.link ? s : !1;
    }
    function b(e) {
        if (o) {
            e && e.call(this, o);
            return
        }
        r.ec.list({onReady: function(t) {
                LINEWELL.page.manage_ec_url = t.manage_url, t.count > 0 ? o = t.list : o = [], e && e.call(this, o)
            }})
    }
    function w(e) {
        if (u) {
            e && e.call(this, u);
            return
        }
        r.forum.list({onReady: function(t) {
                LINEWELL.page.manage_forum_url = t.manage_url, t.count > 0 ? u = t.list : u = [], e && e.call(this, u)
            }})
    }
    function E(e) {
        if (a) {
            e && e.call(this, a);
            return
        }
        r.haibao.list({onReady: function(t) {
                LINEWELL.page.manage_page_url = t.page_url, t.count > 0 ? a = t.list : a = [], e && e.call(this, a)
            }})
    }
    function S(e) {
        if (c) {
            e && e.call(this, c);
            return
        }
        r.supform.list({onReady: function(t) {
                LINEWELL.page.manage_supform_url = t.supform_url, t.count > 0 ? c = t.list : c = [], e && e.call(this, c)
            },onError: function(t) {
                LINEWELL.page.manage_supform_url = t.supform_url, c = [], e.call(this, c)
            }})
    }
  //获取页面数据
    function getPagelist(e) {
        if (s) {
            e && e.call(this, s);
            return
        }
        r.page.list({onReady: function(t) {
                t.count > 0 ? (s = t.list, f = t.index_page_id, l = t.index_page_name, h = t.index_page_link) : s = [], e && e.call(this, s)
            }})
    }
    var i = '<div class="ui-pop-lite ui-linkdialog">                        <div class="wrapper">                            <h1>选择链接类型</h1>                            <ul class="clearfix itemlist">                                {{#itemlist}}<li class="{{#last}}last{{/last}} {{#cur}}cur{{/cur}}" data-val="{{val}}">{{name}}</li>{{/itemlist}}                            </ul>                            <div class="content">                                <p></p>                            </div>                        </div>                        <div class="wrp-bottom">                            <a style="  width: 160px;" class="button confirm huge">确定</a>                            <a style="  width: 160px; color:#585858;" class="button huge js-cancle">取消</a>                        </div>                    </div>', s = null, o = null, u = null, a = null, f = null, l = null, c = null, h = null, 
    p = {3: "页面",2: "审批", 4: "日常",1: "URL"}, 
    d = {itemlist: [{val: 3,name: "页面"}, {val: 2,name: "审批"}, {val: 4,name: "日常"}, {val: 1,name: "URL"}]};
    return t.linkdialog = function(n) {
        function u() {
            var e = y(o);
            if (e === !1) {
                var n = o.find(".itemlist .cur").data("val");
                return n == 2 || n == 12 ? t.alert("请输入有效链接") : t.alert("链接内容不能为空")
            }
            r.confirm && r.confirm(e), s = !0, o.modal("hide")
        }
        var r = e.extend({}, n);
        r.value.link_res_type == 5 && (r.value.link_res_type = 1);
        var s = !1, o = e(t.render(i, d)).modal({show: !1,backdrop: !0,center: !0});
        o.modal("show"), o.on("click", ".js-cancle", function() {
            o.modal("hide")
        }).on("click", ".confirm", function() {
            u()
        }).on("click", ".itemlist li", function() {
            if (e(this).hasClass("cur"))
                return;
            o.find(".cur").removeClass("cur"), e(this).addClass("cur"), m(o, r.value)
        }).on("click", ".link-nav", function() {
            var t = e(this).data("id"), n = e(this).data("href");
            g(t)
        }).on("hide", function() {
            o.remove();
            if (s) {
                s = !1;
                return
            }
            r.cancle && r.cancle()
        }), v(o, r)
    }, t.linkdialog
}), define("ui-mod/margin", ["jquery", "ui-mod/base", "libui/ds", "jquery-ui", "lib/bootstrap"], function(e, t, n) {
    return t.margin = {tpl: '<div class="margin_configurator">            <div class="input_left"><input type="text" name="margin-left" /> px</div>            <div class="input_top"><input type="text" name="margin-top"  /> px</div>            <div class="input_right"><input type="text" name="margin-right" /> px</div>            <div class="input_bottom"><input type="text" name="margin-bottom" /> px</div>            <div class="inner_box"></div>       </div>       <label><input style="vertical-align:middle;" type="checkbox" class="symmetry"/>间距对称</label>',create: function(n) {
            var r = {"margin-left": 0,"margin-top": 0,"margin-right": 0,"margin-bottom": 0};
            return this.data = e.extend(!0, {}, r, n), t.render(this.tpl, this.data)
        },init: function(t) {
            var n = this;
            t.find(".margin_configurator input").each(function() {
                this.value = n.data[this.name] ? n.data[this.name].replace("px", "") : "0"
            }), t.delegate(".margin_configurator input", "keydown", function(t) {
                if (this.value != "") {
                    var n = parseInt(this.value);
                    isNaN(n) && (n = 0), t.keyCode === 38 && (n++, this.value = n > 100 ? 100 : n < 0 ? 0 : n, t.preventDefault()), t.keyCode === 40 && (n--, this.value = n > 100 ? 100 : n < 0 ? 0 : n, t.preventDefault())
                }
                e(this).trigger("change")
            }), t.delegate(".margin_configurator input", "keyup ,change", function(t) {
                if (this.value != "") {
                    this.value = this.value.replace(/\D/gi, "");
                    var n = parseInt(this.value);
                    isNaN(n) && (n = 0);
                    if (n > 100 || n <= 0)
                        this.value = n > 100 ? 100 : n < 0 ? 0 : n
                }
                e(this).trigger("change")
            }), t.delegate(".margin_configurator input", "blur", function(n) {
                t.find(".margin_configurator input:text").each(function() {
                    this.value == "" && (this.value = "0")
                }), e(this).trigger("change")
            }), t.delegate(".symmetry", "click", function(e) {
                function u() {
                    setTimeout(function() {
                        i.val(r.val()), i.trigger("keyup")
                    }, 10)
                }
                function a() {
                    setTimeout(function() {
                        o.val(s.val()), o.trigger("keyup")
                    }, 10)
                }
                var n = this.checked, r = t.find("[name='margin-left']"), i = t.find("[name='margin-right']"), s = t.find("[name='margin-top']"), o = t.find("[name='margin-bottom']");
                n ? (i.attr("disabled", "disabled").val(r.val()).trigger("change"), o.attr("disabled", "disabled").val(s.val()).trigger("change"), r.bind("keydown", u), s.bind("keydown", a)) : (i.removeAttr("disabled"), o.removeAttr("disabled"), r.unbind("keydown"), s.unbind("keydown"))
            }), !!this.data["margin-left"] && !!this.data["margin-top"] && this.data["margin-left"] == this.data["margin-right"] && this.data["margin-top"] == this.data["margin-bottom"] && t.find(".symmetry").trigger("click")
        }}, t.margin
}), define("ui-mod/grouplink", ["jquery", "ui-mod/base", "libui/ds", "libui/utils", "ui-mod/text", "ui-mod/select", "ui-mod/typeahead", "jquery-ui", "lib/bootstrap"], function(e, t, n, r) {
    var i = '<div class="ui-grouplink {{#sort}}st-sortable{{/sort}}" data-name="{{name}}" data-max="{{max}}" data-min="{{min}}" {{#sort}}data-sort="true"{{/sort}}>                    <div class="head form-subrow">                        <label class="col-name">导航名称</label><label class="col-link">链接</label><label class="col-op">操作</label>                    </div>                    <div class="content">                        {{_content_}}                    </div>                    <div class="ctr">                        <a href="javascript:;" class="add js-add"><i class="ico">+</i>增加一个导航</a>                    </div>                    <input type="hidden" name="{{name}}" value="{{value}}">                </div>', s = '{{#items}}                <div class="form-subrow link-item">                    {{#_sort_}}<a href="javascript:;" class="sort-handle">&nbsp;</a>{{/_sort_}}                    <div class="col-name"><input type="text" name="title" value="{{title}}"></div>                    <div class="col-link">{{#res_name}}{{res_name}}{{/res_name}}{{^res_name}}<span style="color:#b8b8b8;display:block;background:#fff;">暂无链接</span>{{/res_name}}</div>                    <div class="col-op"><a href="javascript:;" class="update js-update">{{#res_name}}修改链接{{/res_name}}{{^res_name}}添加链接{{/res_name}}</a><a href="javascript:;" class="delete js-delete">删除</a></div>                </div>            {{/items}}';
    return t.grouplink = {create: function(n) {
            var o = [], u = "";
            n.value || (n.value = []), n.max || (n.max = 0), n.min || (n.min = 0), n.sortable === undefined && (n.sortable = !0);
            for (var a in n.value) {
                var f = n.value[a];
                o.push({title: r.escapeHtml(f.title),res_name: f.link_res_name})
            }
            return u = t.render(s, {items: o,_sort_: n.sortable === !0}), t.render(i, {name: n.name,min: n.min,max: n.max,sort: n.sortable === !0,value: r.escapeHtml(e.toJSON(n.value)),_content_: u})
        },_init: function(n) {
            function l(e, t) {
                if (e === t)
                    return !1;
                var n = c(), r = n[e];
                n.splice(e, 1), n.splice(t, 0, r), h(n)
            }
            function c() {
                var t = e.evalJSON(n.find("input[name='" + i + "']").val());
                return t
            }
            function h(t) {
                var r = e.toJSON(t);
                n.find("input[name='" + i + "']").val(r).trigger("change", r)
            }
            function p() {
                return o > 0 && n.find(".link-item").length >= o ? (t.alert("最多可建10个导航"), !1) : !0
            }
            function d() {
                return n.find(".link-item").length <= u ? (t.alert("至少需要有" + u + "项"), !1) : !0
            }
            if (n.data("grouplink-init"))
                return !1;
            var i = n.data("name"), o = n.data("max"), u = n.data("min"), a = n.data("sort"), f = n.find(".link-item");
            a && n.find(".content").sortable({items: "> .link-item",handle: ".sort-handle",placeholder: "sort-placeholder",cursor: "move",start: function(t, n) {
                    var r = e(this), i = n.item.index();
                    r.data("sort-start", i)
                },stop: function(t, n) {
                    var r = e(this), i = r.data("sort-start"), s = n.item.index();
                    l(i, s), r.data("sort-start", null)
                }}), n.on("change", "input[name='title']", function(t, n) {
                var r = e(this), n = r.val(), i = r.parents(".link-item"), s = i.index(), o = c();
                o[s].title = n, h(o)
            }).on("change", "input[name='link-content']", function() {
                var t = e(this), n = t.parents(".link-item"), r = n.index(), i = c();
                !/^https{0,1}:\/\//.test(t.val()) && !/^[a-z0-9\-]+:/.test(t.val()) ? i[r].link = "http://" + t.val() : i[r].link = t.val(), h(i)
            }).on("click", ".js-delete", function() {
                var t = e(this), n = t.parents(".link-item"), r = n.index(), i = c();
                d() && (i.splice(r, 1), h(i), n.remove())
            }).on("click", ".js-update", function() {
                var n = e(this), r = n.parents(".link-item"), i = r.index(), s = c(), o = {module_id:s[i].module_id,link: s[i].link,link_res_type: s[i].link_res_type,link_res_name: s[i].link_res_name,link_res_id: s[i].link_res_id};
                t.linkdialog({value: o,confirm: function(e) {
                        s[i].link = e.link, 
                        s[i].link_res_type = e.link_res_type, 
                        s[i].link_res_name = e.link_res_name, 
                        s[i].link_res_id = e.link_res_id;
                        if (!e.module_id) {
                        	delete s[i].module_id;
                        } else {
                        	s[i].module_id = e.module_id;
                        }
                        h(s), 
                        r.find(".col-link").html(e.link_res_name), n.html("修改链接")
                    }})
            }).on("click", ".js-add", function() {
                var i = e(this), o = {title: "导航名称",link: "javascript:;",link_res_type: 3,link_res_name: "",link_res_id: 0}, u = [], f = c();
                if (p()) {
                    var l = [o];
                    for (var d in l) {
                        var v = l[d];
                        u.push({title: r.escapeHtml(v.title),res_name: v.link_res_name})
                    }
                    var m = e(t.render(s, {items: u,_sort_: a}));
                    n.find(".content").append(m), f.push(o), h(f)
                }
            }), n.data("grouplink-init", !0)
        },init: function(e) {
            var t = this, n = e.find(".ui-grouplink");
            for (var r = 0; r < n.length; r++) {
                var i = n.eq(r);
                t._init(i)
            }
        }}, t.grouplink
}), define("ui-mod/picselect", ["jquery", "ui-mod/base", "libui/ds", "ui-mod/grouplink", "jquery-ui", "lib/bootstrap"], function(e, t, n) {
    function r() {
        this.init()
    }
    return r.prototype = {init: function() {
            this.ids = [], this.list = [], this.length = 0
        },isSelected: function(e) {
            return this.length == 0 ? !1 : this.ids.indexOf(e) > -1
        },add: function(e, t) {
            this.ids.push(e), this.list.push(t), this.length++
        },remove: function(e) {
            var t = this.ids.indexOf(e);
            t > -1 && (this.ids.splice(t, 1), this.list.splice(t, 1), this.length--)
        }}, t.picselect = {tpl: '<div class="ui-pic-select{{#multiple}} mode-multiple{{/multiple}}" data-max="{{max}}" data-source="{{source}}">{{content}}</div>',tpl_pic_select: '<div class="ui-type-select js-put-piclist">                    <ul class="type-ul three-col">                        {{#list}}                        <li class="type-li{{#cur}} cur{{/cur}}" data-val="{{id}}">                            <div class="option">                                <div class="img-box">                                    <div class="img-w"><img src="{{url}}" alt="{{name}}"></div>                                    <p title="{{name}}">{{name}}</p>                                </div>                                <i class="ico"> </i>                            </div>                        </li>                        {{/list}}                    </ul>                </div>',tpl_gallery: '<div class="gallery-wrap">                    <div class="ui-placeholder js-put-piclist"></div>                    <div class="ui-placeholder js-put-paging"></div>                    <div class="btn-con">                        <button class="confirm js-confirm" data-action="confirm">确定</button>                        <button class="button js-cancel" data-dismiss="modal">取消</button>                    </div>                </div>',tpl_upload: '<div class="upload-wrap">                    <button class="confirm button-large btn-upload js-upload"><i class="font-ico"></i>上传图片</button>                    <p class="tip">                        提示：建议图片宽高比4:3，宽度640像素以上，支持多图上传；<br>                        图片大小不能超过4M；支持jpg、jpeg、png、gif等格式                    </p>                    <form method="post" enctype="multipart/form-data" action="{{api_upload}}" target="uploadiframe" style="display:none;">                        <input type="file" id="file-input" name="file" accept="image/*" multiple="multiple">                        <input type="submit" id="file-submit">                        <iframe name="uploadiframe"></iframe>                    </form>                </div>                <div class="after-upload" style="display:none">                    <button class="btn-uploadmore"><i class="font-ico"></i>替换图片</button>                </div>',create: function(e) {
            var n = this, r, i = {}, s = "";
            return e.mode || (e.mode = 1), e.source || (e.source = "site"), s = e.source === "user" ? "/pic/ajax-upload-open-pic" : "attachmentUpload.action?operType=uploadPic", i.source = e.source, i.multiple = e.mode > 1, i.max = e.mode, r = t.tab.create({theme: "theme-simple",tab_nav: [{cur: !0,title: "图片素材库","class": "js-tab-gallery"}, {title: "本地上传","class": ""}],tab_content: [{cur: !0,content: n.tpl_gallery}, {content: t.render(n.tpl_upload, {api_upload: s})}]}), i.content = r, t.render(n.tpl, i)
        },init: function(i, s) {
            function l(e, r) {
                n[f].list({page: e,onReady: function(n) {
                        if (n.total >= 1) {
                            var i = {}, s;
                            for (var f in n.list)
                                s = n.list[f], n.list[f].cur = a.isSelected(s.id), i[s.id] = s;
                            u.data("piclist", i);
                            var l = t.render(o.tpl_pic_select, n), c = t.paging.create({page: e,perpage: 6,total: n.total});
                            u.find(".js-put-piclist").replaceWith(l), u.find(".js-put-paging").replaceWith(c)
                        } else {
                            var l = "<div class='nocontent' style='height:200px;line-height:200px;'>暂无图片</div>";
                            u.find(".js-put-piclist").html(l)
                        }
                        r && r.call(this)
                    }})
            }
            var o = this, u = i.find(".ui-pic-select"), a = new r, f = u.data("source") === "site" ? "pic" : "userpic";
            l(1, function() {
                t.paging.init(u, {fetch: function(e) {
                        l(e)
                    }})
            }), t.tab.init(i), i.on("click", ".ui-pic-select .ui-type-select ul li", function() {
                var n = e(this), r = n.parents(".ui-pic-select"), i = r.data("max"), o = n.data("val");
                if (i > 1)
                    if (n.hasClass("cur"))
                        n.removeClass("cur"), a.remove(o);
                    else {
                        if (a.length >= i)
                            return t.alert("最多能选" + i + "张图片！"), !1;
                        n.addClass("cur");
                        var f = u.data("piclist");
                        a.add(o, f[o])
                    }
                else {
                    n.siblings().removeClass("cur"), n.addClass("cur");
                    var f = u.data("piclist");
                    s.select && s.select.call(n, [f[o]])
                }
            }).on("click", ".js-confirm", function() {
                var n = e(this), r = n.parents(".ui-pic-select");
                if (a.length == 0)
                    return t.alert("未选择图片"), !1;
                var i = a.list;
                s.select && s.select.call(n, i)
            }).on("click", ".js-cancel", function() {
                s.cancel && s.cancel.call(this)
            });
            var c = 4194304, h = u.find("form"), p = h.attr("action"), d = "upload_" + (new Date).getTime();
            LINEWELL[d] = function(e) {
                e.ret == 0 ? (u.find(".tab-nav .js-tab-gallery").click(), l(1, function() {
                    u.find(".ui-type-select ul li:first").click()
                })) : t.alert({msg: e.msg})
            }, p = p.indexOf("?") > -1 ? p + "&" : p + "?", h.attr("action", p + "mapp_id=" + LINEWELL.page.mapp_id + "&callback=" + "LINEWELL." + d), i.on("click", ".ui-pic-select .js-upload", function() {
                var t = e(this), n = t.parents(".ui-pic-select");
                n.find(":file").val("").trigger("click")
            }).on("change", ".ui-pic-select :file", function() {
                function a() {
                    if (i === r.length - 1) {
                        console.log("all"), l(1, function() {
                            t.hideLoading();
                            for (var e = 0; e < i + 1 - s; e++) {
                                s != 0 && t.alert("共上传" + (i + 1) + "张，失败" + s + "张"), $l = u.find(".ui-type-select ul li"), console.log(u.data("max"));
                                if (u.data("max") == "1") {
                                    $l.eq(0).click();
                                    return
                                }
                                $l.get(e).className != "type-li cur" && $l.eq(e).click()
                            }
                        });
                        return
                    }
                    i++, f()
                }
                function f() {
                    var t = new FormData;
                    t.append("file", r[i]), e.ajax({url: h.attr("action"),type: h.attr("method"),data: t,dataType: "json",processData: !1,contentType: !1,success: function(e) {
                            e.msg == "上传图片失败" && s++, a()
                        },error: function() {
                            alert("上传失败"), a()
                        }})
                }
                u.find(".tab-nav .js-tab-gallery").click();
                var n = this, r = [], i = 0, s = 0;
                for (var o = 0; o < n.files.length; o++) {
                    if (n.files[o].size > 4194304) {
                        t.alert("图片 " + n.files[o].name + " 大小超过4M！");
                        continue
                    }
                    r.push(n.files[o])
                }
                if (r.length == 0)
                    return;
                t.loading({parent: u,text: "正在上传..."}), f()
            })
        }}, t.picselect
}), define("ui-mod/typeselect", ["jquery", "ui-mod/base", "libui/utils", "jquery-ui", "lib/bootstrap"], function(e, t, n) {
    return t.typeselect = {tpl: '<div class="ui-type-select">                    <ul class="type-ul {{theme}}">						{{#options}}                        <li class="type-li{{#cur}} cur{{/cur}}{{#_first_}} first{{/_first_}}{{#_last_}} last{{/_last_}}" data-val="{{value}}">                            <div class="option">                                {{content}}                                <i class="ico"> </i>                            </div>                        </li>						{{/options}}                    </ul>                    <input type="hidden" name="{{name}}" value="{{value}}">                </div>',init: function(t) {
            t.on("click", ".ui-type-select ul.type-ul li.type-li", function() {
                var t = e(this), n = t.data("val");
                t.siblings().removeClass("cur"), t.addClass("cur"), typeof n == "object" && (n = e.toJSON(n)), t.parents(".ui-type-select").find(":input[type=hidden]").val(n).trigger("change", n)
            })
        },create: function(e) {
            if (e.options)
                for (var r in e.options) {
                    var i = e.options[r];
                    e.value !== undefined && (i.cur = i.value == e.value), i.value = n.escapeHtml(i.value), r === 0 && (i._first_ = !0), r === e.options.length - 1 && (i._last_ = !0)
                }
            return e.value !== undefined && (e.value = n.escapeHtml(e.value)), t.render(this.tpl, e)
        }}, t.typeselect
}), define("ui-mod/picselector", ["jquery", "ui-mod/base", "libui/ds", "ui-mod/picselect", "ui-mod/picselect", "jquery-ui", "lib/bootstrap"], function(e, t, n) {
    return t.picselector = function(n) {
        var r = t.pop_picselect;
        if (!r) {
            r = e('<div class="ui-pop-lite"></div>');
            var i = t.picselect.create({mode: n.mode,source: n.source});
            r.append(i), t.picselect.init(r, {select: function(e) {
                    r.modal("hide"), n.select.call(r, e)
                },cancel: function() {
                    r.modal("hide")
                }}), r.modal({show: !1,backdrop: !0,center: !0}).on("hide", function() {
            })
        }
        r.modal("show")
    }, t.picselector
}), define("ui-mod/aeditor-utils", ["jquery", "ui-mod/base"], function(e, t) {
    var n = '<div data-role="line">{{content}}</div>', r = '<div data-role="para">{{content}}</div>', i = '<div data-role="block"  data-type="{{type}}" contenteditable="false"><div class="cover" contenteditable="true">{{content}}</div></div>', s = '<img src="{{image}}" data-img-id="{{image_id}}" data-role="{{image_role}}">';
    return t.aeditor_utils = {is_element: function(e) {
            return e.nodeType === Node.ELEMENT_NODE
        },is_tag: function(e, t) {
            return e.tagName ? e.tagName.toLowerCase() === t : !1
        },is_block_node: function(e) {
            var t = ["div", "p"];
            return this.is_element(e) && t.indexOf(e.tagName.toLowerCase()) > -1
        },node_to_string: function(e) {
            return this.is_element(e) ? e.outerHTML : e.nodeValue
        },attr_to_obj: function(e) {
            var t = {}, n;
            for (var r = 0; r < e.length; r++)
                n = e[r], t[n.name] = n.value;
            return t
        },clearHtml: function(e) {
            return e = e.replace(/\<br[^>]*>/gi, "<br>"), e
        },formatAttr: function(e) {
            e.removeAttribute("class")
        },formatHtml: function(t) {
            var n = this;
            t = n.clearHtml(t);
            if (t) {
                var r = e("<div>" + t + "</div>"), i = r[0].childNodes, s, o = [], u = [];
                for (var a = 0; a < i.length; a++) {
                    s = i.item(a);
                    if (this.is_block_node(s)) {
                        o.length > 0 && (u.push(n.new_line(o.join(""))), o = []), this.formatAttr(s);
                        if (s.innerHTML) {
                            var f = n.formatHtml(s.innerHTML);
                            f = e(f), s.hasAttributes() && f.attr(n.attr_to_obj(s.attributes)), f.each(function(e, t) {
                                u.push(t.outerHTML)
                            })
                        } else {
                            var l = e(n.new_line());
                            s.hasAttributes() && l.attr(n.attr_to_obj(s.attributes)), u.push(l[0].outerHTML)
                        }
                    } else
                        o.push(this.node_to_string(s))
                }
                return o.length > 0 && u.push(n.new_line(o.join(""))), u.join("")
            }
            return n.new_line()
        },execCom: function(e, t) {
            return t ? document.execCommand(e, !1, t) : document.execCommand(e, !1, ""), !1
        },insert_image: function(e, n) {
            var r = t.render(s, n), i = this.getRange(e);
            this.new_block(i, r, "pic")
        },saveRange: function(e) {
            e.saved_range = !0, this.lastRange = e
        },clearLastRange: function() {
            this.lastRange = null
        },contains: function(e, t) {
            return e === t ? !1 : e.contains(t)
        },getRange: function(e) {
            var t, n = window.getSelection();
            n.rangeCount > 0 ? t = n.getRangeAt(0) : t = document.createRange();
            if (this.contains(e, t.commonAncestorContainer))
                return t;
            if (this.lastRange && this.contains(e, this.lastRange.commonAncestorContainer))
                return this.lastRange;
            if (e.firstChild) {
                t.setStart(e.firstChild, 0), t.collapse(!0);
                var r = window.getSelection();
                r.removeAllRanges(), r.addRange(t)
            }
            return t
        },changeTag: function(e, t) {
            var n = document.createElement(t);
            if (e.nodeType === Node.TEXT_NODE)
                return n.innerHTML = e.nodeValue, n;
            if (e.attributes)
                for (var r = 0; r < e.attributes.length; r++) {
                    var i = e.attributes[r];
                    n.setAttribute(i.nodeName, i.nodeValue)
                }
            while (e.firstChild)
                n.appendChild(e.firstChild);
            return n
        },setCaret: function(t, n, r) {
            var i = document.createRange();
            i.is_set = !0, i.setStart(n, r), i.collapse(!0);
            var s = window.getSelection();
            s.removeAllRanges(), s.addRange(i), e(t).focus()
        },isTopCaret: function(e, t) {
            return e.commonAncestorContainer === t
        },find_branch: function(e, t) {
            return e === t ? e : e.parentNode === t ? e : this.find_branch(e.parentNode, t)
        },format_line: function(t) {
            var n = e(t).wrap('<div data-role="line"></div>');
            return n.parent()
        },new_line: function(e) {
            return e || (e = "<br>"), t.render(n, {content: e})
        },new_para: function(e) {
            return e || (e = this.new_line()), t.render(r, {content: e})
        },is_line: function(e) {
            return e.is("[data-role=line]")
        },is_para: function(e) {
            return e.is("[data-role=para]")
        },is_block: function(e) {
            return e.is("[data-role=block]")
        },is_pic: function(e) {
            return e.is("[data-role=block][data-type=pic]")
        },parent_block: function(e) {
            return e.closest("[data-role=block]")
        },parent_para: function(e) {
            return e.closest("[data-role=para]")
        },parent_line: function(e) {
            return e.closest("[data-role=line]")
        },cur_para: function(t) {
            var n = t.commonAncestorContainer, r = this.caretInText(t) ? e(n.parentNode) : e(n);
            return this.parent_para(r)
        },cur_line: function(t) {
            var n = t.commonAncestorContainer, r = this.caretInText(t) ? e(n.parentNode) : e(n);
            return this.parent_line(r)
        },cur_ele: function(e) {
            return this.caretInText(e) ? e.commonAncestorContainer.parentNode : e.commonAncestorContainer
        },break_util: function(e, t, n) {
            var r = e.parentNode, i;
            if (n.call(this, r))
                return [e, t];
            i = r.cloneNode(), r.nextSibling ? i = r.parentNode.insertBefore(i, r.nextSibling) : i = r.parentNode.appendChild(i);
            var s = e.nextSibling, o, u;
            while (s)
                o = s.nextSibling, u = r.removeChild(s), i.appendChild(u), s = o;
            return this.break_util(r, i, n)
        },divide_line: function(t, n) {
            var r = this, i = n.startOffset, s = n.commonAncestorContainer, o, u, a;
            if (s.nodeType === Node.TEXT_NODE) {
                var o = s.nodeValue, u = o.substr(0, i), a = o.substr(i), f = s.parentNode, l = f.cloneNode(!0);
                return f.nextSibling ? l = f.parentNode.insertBefore(l, f.nextSibling) : l = f.parentNode.appendChild(l), f.textContent = u, l.textContent = a, r.break_util(f, l, function(t) {
                    return r.is_para(e(t))
                })
            }
        },normalize_line: function(e) {
            return e.each(function(t, n) {
                var r = e.eq(t);
                (r.html() === "" || r.text() === "") && r.html("<br>")
            }), e
        },new_block: function(n, r, s) {
            if (!r) {
                console.error("block content can not be empty");
                return
            }
            var o = e(this.cur_ele(n)), u = o.closest("[data-role=line]"), a = o.closest("[data-role=para]"), f = o.closest("[data-role=block]"), l = t.render(i, {type: s,content: r}), c = e(l);
            if (f.length > 0)
                c.insertAfter(f);
            else if (u.length > 0)
                if (n.collapsed && n.startOffset === 0) {
                    var h = u.prevAll();
                    if (h.length > 0) {
                        var p = e(this.new_para());
                        p.find("[data-role=line]").remove(), this.normalize_line(e(h));
                        for (var d = h.length - 1; d > -1; d--)
                            p.append(h.eq(d));
                        p.insertBefore(a), c.insertBefore(a)
                    } else
                        c.insertBefore(a)
                } else {
                    var v = this.divide_line(u, n);
                    this.normalize_line(e(v));
                    var m = e(v[0]).nextAll();
                    if (m.length > 0) {
                        var p = e(this.new_para());
                        p.find("[data-role=line]").remove(), p.append(m), p.insertAfter(a)
                    }
                    c.insertAfter(a)
                }
            else
                a.length > 0 && c.insertBefore(a);
            this.go_next(c)
        },last_text_child: function(e) {
            if (!e.lastChild)
                return e;
            var t = e.lastChild;
            return this.is_element(t) ? t.lastChild ? this.last_text_child(t.lastChild) : t : t
        },first_text_child: function(e) {
            if (!e.firstChild)
                return e;
            var t = e.firstChild;
            return this.is_element(t) ? t.firstChild ? this.first_text_child(t.firstChild) : t : t
        },go_prev: function(t, n) {
            var r = t.prev();
            n || (n = r.length === 0), n && (r = e(this.new_para()), r.insertBefore(t));
            if (this.is_para(r)) {
                var i = r.find(":last-child[data-role=line]"), s, o = 0;
                i.length > 0 && (i = i[0], s = this.last_text_child(i), this.is_element(s) ? o = 0 : o = s.nodeValue.length, this.setCaret(i, s, o))
            } else
                this.is_block(r) && (this.is_pic(r) ? this.setCaret(r, r[0].lastChild, 1) : this.setCaret(r, r[0].lastChild, 0))
        },go_next: function(t, n) {
            var r = t.next();
            r.length === 0 && (n = !0), n && (r = e(this.new_para()), r.insertAfter(t));
            if (this.is_para(r)) {
                var i = r.find(":first-child[data-role=line]"), s, o = 0;
                i.length > 0 && (s = this.first_text_child(i[0]), this.setCaret(i, s, o))
            } else
                this.is_block(r) && this.setCaret(r, r[0].firstChild, 0)
        },find_block: function(e) {
            return e.find("[data-role=block]")
        },find_para: function(e) {
            return e.find("[data-role=para]")
        },find_line: function(e) {
            return e.find("[data-role=line]")
        },is_line_empty: function(e) {
            return e.childNodes.length === 1 && e.innerHTML === "<br>"
        },check_empty_content: function(e) {
            var t = this.find_para(e), n = this.find_block(e);
            t.length === 0 && n.length === 0 && e.append(this.new_para())
        },caret_in_para_head: function() {
        },caret_in_line_head: function() {
        },caretInText: function(e) {
            return e.commonAncestorContainer.nodeType === Node.TEXT_NODE
        },caretInPara: function(t) {
            return this.is_para(e(t.commonAncestorContainer))
        },checkCaret: function(e, t) {
            var n = this.getRange();
            if (t) {
                this.setCaret(e, e, i);
                return
            }
            if (!e.contains(n.commonAncestorContainer)) {
                var r = e.lastChild, i = 0;
                r ? r.nodeType === Node.TEXT_NODE && (i = r.nodeValue.length) : (r = document.createTextNode(""), e.appendChild(r)), this.setCaret(e, r, i)
            }
        }}, t.aeditor_utils
}),
//	define("richtext-link-selector", ["jquery", "ui-mod/base", "libui/utils", "jquery-ui"], function(e, t, n) {
//    var r = {init: function(e) {
//            var n = e.data;
//            t.linkdialog({value: n.link_data,confirm: function(t) {
//                    n.title = n.title ? n.title : t.link_res_name, n.link_data = t, e.confirm.call(this, n)
//                }})
//        }};
//    return r
//}), 
	define("richtext-utils", [], function() {
    return {execCom: function(e, t) {
            return t ? document.execCommand(e, !1, t) : document.execCommand(e, !1, ""), !1
        },getRange: function() {
            var e, t = window.getSelection();
            return t.rangeCount > 0 ? e = t.getRangeAt(0) : e = document.createRange(), e
        },changeTag: function(e, t) {
            var n = document.createElement(t);
            if (e.nodeType === Node.TEXT_NODE)
                return n.innerHTML = e.nodeValue, n;
            if (e.attributes)
                for (var r = 0; r < e.attributes.length; r++) {
                    var i = e.attributes[r];
                    n.setAttribute(i.nodeName, i.nodeValue)
                }
            while (e.firstChild)
                n.appendChild(e.firstChild);
            return n
        },setCaret: function(e, t, n) {
            var r = document.createRange();
            r.setStart(t, n), r.collapse(!0);
            var i = window.getSelection();
            i.removeAllRanges(), i.addRange(r), e.focus()
        },isTopCaret: function(e, t) {
            return e.commonAncestorContainer.parentNode === t
        },format_line: function(e) {
            var t = $(e).wrap('<div data-role="line"></div>');
            return t.parent()
        },contains: function(e, t) {
            return e === t ? !1 : e.contains(t)
        },cur_ele: function(e) {
            return this.caretInText(e) ? e.commonAncestorContainer.parentNode : e.commonAncestorContainer
        },next_line: function(e, t, n) {
            var r = this.getRange(), i = this.caretInText(r), s;
            this.isTopCaret(r, e) ? i ? s = this.format_line(r.commonAncestorContainer) : s = $(r.commonAncestorContainer) : s = i ? $(r.commonAncestorContainer.parentNode) : $(r.commonAncestorContainer), n || (n = "<br>");
            var o = t === "block" ? '<div data-role="line" data-block="true" contenteditable="false">' + n + "</div>" : '<div data-role="line">' + n + "</div>", u = $(o);
            u.insertAfter(s);
            if (t === "block") {
                if (u.next().length === 0) {
                    var a = $('<div data-role="line"><br></div>');
                    a.insertAfter(u), this.setCaret(e, a[0].firstChild, 0)
                }
            } else
                this.setCaret(e, u[0].firstChild, 0);
            var r = this.getRange()
        },caretInText: function(e) {
            return e.commonAncestorContainer.nodeType === Node.TEXT_NODE
        },checkCaret: function(e, t) {
            var n = this.getRange();
            if (t) {
                this.setCaret(e, e, i);
                return
            }
            if (!e.contains(n.commonAncestorContainer)) {
                var r = e.lastChild, i = 0;
                r ? r.nodeType === Node.TEXT_NODE && (i = r.nodeValue.length) : (r = document.createTextNode(""), e.appendChild(r)), this.setCaret(e, r, i)
            }
        }}
}), define("richtext-modules", ["jquery", "ui-mod/base", "richtext-utils", "ui-mod/aeditor-utils"], function(e, t, n, r) {
    return {bold: {action_name: "bold",icon: '<span class="ki24 icon-page-bold"></span>',action: function(e) {
                n.execCom("Bold"), e.valChange()
            }},italic: {action_name: "italic",icon: '<span class="ki24 icon-page-i"></span>',action: function(e) {
                n.execCom("Italic"), e.valChange()
            }},underline: {action_name: "underline",icon: '<span class="ki24 icon-page-u"></span>',action: function(e) {
                n.execCom("Underline"), e.valChange()
            }},color: {action_name: "color",icon: '<span class="ki24 icon-page-fontcolor"></span>',action: function(e) {
                t.colorpanel({sourceElt: e.t,colorChange: function(t) {
                        n.execCom("ForeColor", t), e.valChange()
                    }})
            }},bgcolor: {action_name: "bgcolor",icon: '<span class="ki24 icon-page-color"></span>',action: function(e) {
                t.colorpanel({sourceElt: e.t,colorChange: function(t) {
                        n.execCom("BackColor", t), e.valChange()
                    }})
            }},align: {action_name: "align",icon: '<span class="ki24 icon-page-left"></span>',options: [{value: "left",content: '<span class="ki24 icon-page-left"></span>'}, {value: "center",content: '<span class="ki24 icon-page-midle"></span>'}, {value: "right",content: '<span class="ki24 icon-page-right"></span>'}],action: function(e) {
                var t = e.t.data("val");
                n.execCom("Justify" + t[0].toUpperCase() + t.slice(1)), e.valChange()
            }},align_left: {action_name: "align_left",icon: '<span class="ki24 icon-page-left"></span>',action: function(e) {
                n.execCom("JustifyLeft"), e.valChange()
            }},align_center: {action_name: "align_center",icon: '<span class="ki24 icon-page-midle"></span>',action: function(e) {
                n.execCom("JustifyCenter"), e.valChange()
            }},align_right: {action_name: "align_right",icon: '<span class="ki24 icon-page-right"></span>',action: function(e) {
                n.execCom("JustifyRight"), e.valChange()
            }},fontsize: {action_name: "fontsize",icon: '<span class="ki24 icon-page-fontsize"></span>',options: [{value: "1",content: "<em>12px</em>"}, {value: "2",content: "<em>14px</em>"}, {value: "3",content: "<em>16px</em>"}, {value: "4",content: "<em>18px</em>"}, {value: "5",content: "<em>24px</em>"}, {value: "6",content: "<em>32px</em>"}, {value: "7",content: "<em>48px</em>"}],action: function(e) {
                var t = e.t;
                n.execCom("FontSize", t.data("val")), e.valChange(), t.parents(".dropdown").hide()
            }},linehight: {action_name: "linehight",icon: '<span class="ki24 icon-page-hangju"></span>',options: [{value: "1.0",content: "<em>1.0</em>"}, {value: "1.5",content: "<em>1.5</em>"}, {value: "2.0",content: "<em>2.0</em>"}, {value: "2.5",content: "<em>2.5</em>"}, {value: "3.0",content: "<em>3.0</em>"}],action: function(e) {
                var t = e.t, n = e.w, r = n.find(".editable"), i = t.data("val");
                r.find("[data-role=line]").css("line-height", i), e.valChange(), t.parents(".dropdown").hide()
            }},light: {action_name: "light",icon: '<span class="ki24 icon-lightoff"></span>',isoff: !0,action: function(e) {
                var t = e.t, n = e.w, r = this.isoff;
                r ? (n.find(".content").css("background-color", "#666666"), 
                this.isoff = !r) : (n.find(".content").css("background-color", "#f5f5f5"), this.isoff = !r)
            }}}
}), define("richtext-pic", ["jquery", "ui-mod/base", "richtext-modules", "richtext-utils"], function(e, t, n, r) {
    var i = '<img src="{{url}}" data-img-id="{{id}}">';
    return n.pic = {action_name: "pic",icon: '<span class="ki24 icon-list-image"></span>',action: function(e) {
            var n = e.w, s = "site";
            LINEWELL.page && !LINEWELL.page.mapp_id && (s = "user"), t.picselector({mode: 1,source: s,select: function(s) {
                    var o = s, u, a = "";
                    for (var f = 0; f < o.length; f++)
                        u = o[f], a += t.render(i, u);
                    var l = r.getRange(), c = n.find(".editable")[0];
                    r.next_line(c, "block", a), e.valChange(n)
                }})
        }}, n
}), 
//	define("richtext-link", ["jquery", "ui-mod/base", "richtext-modules", "richtext-utils", "richtext-link-selector"], function(e, t, n, r, i) {
//    function u(e) {
//        return {link: e.attr("href"),link_res_id: e.data("link-id"),link_res_type: e.data("link-type"),link_res_name: e.data("link-name")}
//    }
//    function a(e) {
//        var n = e.link_data, r = {text: e.title ? e.title : "链接文字",type: n.link_res_type,name: n.link_res_name,id: n.link_res_id,link: n.link};
//        return t.render(s, r)
//    }
//    function f(e) {
//        return e.link_res_id || e.link
//    }
//    var s = "<a href='{{link}}' data-link-type='{{type}}' data-link-name='{{name}}' data-link-id='{{id}}'>{{text}}</a>", o = {link: "javascript:;",link_res_id: "",link_res_type: 3,link_res_name: ""};
//    return n.link = {action_name: "link",icon: '<span class="ki24 icon-btn-subbject"></span>',init: function(t) {
//            t.w.on("click", ".ui-richtext .content .editable a", function(n) {
//                var r = e(this), s, o;
//                if (r.parents("[data-role=block]").length > 0)
//                    return !0;
//                s = r.parents(".ui-richtext"), o = u(r), i.init({data: {title: r.text(),link_data: o},confirm: function(e) {
//                        if (f(e.link_data))
//                            var n = a(e);
//                        else
//                            n = e.title;
//                        r.replaceWith(n), t.valChange(s)
//                    }})
//            })
//        },action: function(n) {
//            var s = n.w, f = s.find(".editable")[0], l = r.getRange(f), c = window.getSelection(), h = r.cur_ele(l), p = n.valChange;
//            if (!r.contains(f, h)) {
//                t.alert("请在编辑框内编辑");
//                return
//            }
//            var d = e(h), v = d.closest("a");
//            if (v.length > 0) {
//                var m = v.eq(0), g = u(m);
//                i.init({data: {title: m.text(),link_data: g},confirm: function(e) {
//                        var t = a(e);
//                        m.replaceWith(t), p(s)
//                    }});
//                return
//            }
//            var y = "";
//            if (!l.collapsed) {
//                y = c.toString(), i.init({data: {title: y,link_data: o},confirm: function(e) {
//                        var t = a(e);
//                        c.removeAllRanges(), c.addRange(l), r.execCom("insertHTML", t), p(s)
//                    }});
//                return
//            }
//            i.init({data: {title: y,link_data: o},confirm: function(t) {
//                    var n = a(t);
//                    e(n).insertAfter(e(l.endContainer)), p(s)
//                }})
//        }}, n
//}), 
	define("ui-mod/richtext", ["jquery", "ui-mod/base", "richtext-utils", "ui-mod/aeditor-utils", "richtext-modules", "richtext-pic"], function(e, t, n, r, i) {  //, "richtext-link"
    var s = {get: function(e) {
            return this[e]
        },set: function(e, t) {
            this[e] = t
        }}, o = '<li data-action="{{action_name}}"><a class="ico" href="javascript:;">{{icon}}</a></li>', u = '<li data-action="{{action_name}}">                <a class="ico" href="javascript:;">{{icon}}</a>                <div class="dropdown">                    {{#options}}<a href="javascript:;" data-val="{{value}}">{{content}}</a>{{/options}}                </div>            </li>', a = '<div class="ui-richtext editor" data-editor-id="{{editor_id}}">                <div class="head">                    <ul>{{action_list}}</ul>                </div>                <div class="content">                    <div class="{{class}} editable" contenteditable="true">{{value}}</div>                </div>                <textarea  name="{{name}}">{{value}}</textarea>            </div>', f = "9", l = "13", c = "8", h = {empty: [],simple: ["bold", "italic", "underline", "color", "bgcolor", "light"],full: ["bold", "italic", "underline", "fontsize", "linehight", "color", "bgcolor", "align", "link", "light"]}, p = {"text/plain": function(t, n) {
            var r = t.getData("text/html");
            if (r) {
                var r = r.split("\n"), i = "", s = [];
                for (var o in r)
                    r[o] !== "" && s.push("<p>" + e.trim(r[o].replace(/^\s+/gi, "")) + "</p>");
                return i = s.join(""), i
            }
        },"text/html": function(e) {
            var t = e.getData("text/html");
            console.log(t)
        },Files: function(e) {
            var t = e.getData("Files");
            console.log(t)
        }};
    t.richtext = {_id: function() {
            return (new Date).getTime() + "" + Math.round(Math.random() * 1e4)
        },create: function(e) {
            e.theme || (e.theme = "full");
            var n = [], f = h[e.theme];
            if (f === undefined)
                return alert("unknow richtext theme"), !1;
            Array.prototype.push.apply(n, f), e.ext && e.ext.length > 0 && Array.prototype.push.apply(n, e.ext);
            var l = [];
            for (var c in n) {
                var p = n[c];
                if (i[p]) {
                    var d = i[p], v = d.options ? u : o;
                    l.push(t.render(v, d))
                } else
                    console.log("unknow : " + p)
            }
            e.icon_list = n;
            var m = this._id();
            return s.set(m, e), t.render(a, {editor_id: m,action_list: l.join(""),"class": e["class"],name: e.name,value: e.value})
        },init: function(t) {
            var r = this, s = function(e) {
                var t = e.find("textarea"), n = e.find(".editable").html();
                t.val(n).trigger("change", n)
            };
            e.each(i, function(n, r) {
                var i = r.options ? ".ui-richtext [data-action=" + n + "] .dropdown a" : ".ui-richtext [data-action=" + n + "] a";
                t.on("click", i, function() {
                    var t = e(this), n = t.parents(".ui-richtext"), i = {t: t,w: n,valChange: function() {
                            s(n)
                        }};
                    r.action(i)
                }), r.init && r.init({w: t,valChange: s})
            }), t.on("mouseenter", ".ui-richtext .head li", function() {
                e(this).find(".dropdown").show()
            }).on("mouseleave", ".ui-richtext .head li", function() {
                e(this).find(".dropdown").hide()
            }).on("paste", ".ui-richtext .editable", function(t) {
                var r = t.clipboardData ? t.clipboardData : t.originalEvent.clipboardData;
                if (r && r.getData) {
                    var i = r.getData("text/plain");
                    if (i) {
                        i = i.replace(/\n\n+/g, "\n");
                        i = i.replace(/</g, "&lt;");
                        i = i.replace(/\"/g, "&quot;");
                        var i = i.split("\n"), o = "", u = [];
                        for (var a in i)
                            i[a] != "" && u.push('<div data-role="line">' + e.trim(i[a].replace(/^\s+/gi, "")) + "</div>");
                        o = u.join(""), n.execCom("insertHTML", o)
                    }
                }
                return t.preventDefault && (t.stopPropagation(), t.preventDefault()), s(e(this).parents(".ui-richtext")), !1
            }).on("click", ".ui-richtext [data-action=para] a", function(e) {
                var t = n.getRange(), r = t.cloneContents();
                if (r.childNodes.length > 0) {
                    t.extractContents();
                    var i = r.childNodes, s;
                    for (var o = i.length - 1; o > -1; o--)
                        s = i[o], s = n.changeTag(s, "p"), t.insertNode(s)
                } else
                    "formatBlock", !1, "p"
            }).on("focus keydown", ".ui-richtext .editable [data-block=true]", function(e) {
                return e.preventDefault(), !1
            }).on("keydown", ".ui-richtext .editable", function(t) {
                var r = e(this), i = e(this).parents(".ui-richtext");
                if (t.keyCode === f) {
                    t.preventDefault();
                    var o = n.getRange();
                    if (o.collapsed === !1)
                        return;
                    if (o.startOffset !== 0)
                        return;
                    var u = i.find(".editable")[0];
                    if (n.isTopCaret(o, u)) {
                        document.execCommand("formatBlock", !1, "div");
                        var a = n.getRange().commonAncestorContainer;
                        a.style["text-indent"] = "2em", s(i);
                        return
                    }
                    if (o.commonAncestorContainer.parentElement == u) {
                        document.execCommand("formatBlock", !1, "div");
                        var a = n.getRange().commonAncestorContainer.parentNode;
                        if (a.className == "mod-text editable") {
                            n.getRange().commonAncestorContainer.style["text-indent"] = "2em", s(i);
                            return
                        }
                        a.style["text-indent"] = "2em", s(i);
                        return
                    }
                    var l = o.commonAncestorContainer.parentElement, h = e(l).parents("div")[0];
                    if (h.className == "mod-text editable") {
                        document.execCommand("formatBlock", !1, "div");
                        var a = e(n.getRange().commonAncestorContainer).parents("div")[0];
                        a.style["text-indent"] = "2em", s(i);
                        return
                    }
                    if (h == "" || h == null || typeof h == "undefined")
                        return;
                    h.style["text-indent"] = "2em", s(i)
                } else if (t.keyCode === c) {
                    var i = "", o = n.getRange();
                    if (o.collapsed == 0)
                        return;
                    if (o.startOffset != 0)
                        return;
                    var p = o.commonAncestorContainer;
                    if (p.tagName == "DIV")
                        p.style["text-indent"] == "2em" && (t.preventDefault(), p.style["text-indent"] = "");
                    else if (p.parentElement.tagName == "DIV") {
                        var i = p.parentElement;
                        i.style["text-indent"] === "2em" && (t.preventDefault(), i.style["text-indent"] = "")
                    } else {
                        var i = e(p.parentElement).parents("div")[0];
                        if (i.className == "mod-text editable")
                            return;
                        i.style["text-indent"] === "2em" && (t.preventDefault(), i.style["text-indent"] = "")
                    }
                    s(e(this).parents(".ui-richtext"))
                }
            }).on("keyup", ".ui-richtext .editable", function(t) {
                s(e(this).parents(".ui-richtext"))
            })
        }}
}), define("ui-mod/picedit", ["jquery", "ui-mod/base", "libui/ds", "libui/utils", "ui-mod/picselector", "jquery-ui", "lib/bootstrap"], function(e, t, n, r) {
    var i = '<div class="ui-picedit {{#sortable}}st-sortable{{/sortable}}" data-option="{{_option_}}" data-name="{{name}}">                <div class="head"></div>                <div class="content">{{content}}</div>                <div class="ctr"><a href="javascript:;" class="add js-add"><i class="ico">+</i>添加图片</a></div>                <input type="hidden" name="{{name}}" value="{{value}}">            </div>', s = '{{#items}}            <div class="picedit-item form-subrow {{#show_text}}st-use-desc{{/show_text}} {{#show_link}}st-use-link{{/show_link}}">                {{#_sort_}}<a href="javascript:;" class="sort-handle">&nbsp;</a>{{/_sort_}}                <div class="pic">                    <img src="{{image}}">                    <a class="delete js-delete"><i class="font-ico">&#xe692;</i></a>                </div>                <div class="oper">                    {{#_desc_}}                    <div class="desc oper-row">                        <label><input type="checkbox" name="show-text" value="true" {{#show_text}}checked="checked"{{/show_text}}>描述</label>                        <input class="desc-text" type="text" name="text" value="{{text}}" placeholder="在这里输入图片描述">                    </div>                    {{/_desc_}}                    {{#_link_}}                    <div class="link oper-row">                        <label><input type="checkbox" name="show-link" value="true" {{#show_link}}checked="checked"{{/show_link}}>链接</label>                        <div class="ui-linkselect-in" {{^show_link}}style="display:none;"{{/show_link}}>                            <span class="ui-linkselect-title">{{link_res_name}}</span>                            <a href="javascript:;" class="ui-linkselect-update">修改</a>                        </div>                    </div>                    {{/_link_}}                </div>            </div>            {{/items}}';
    return t.picedit = {_init: function(n) {
            function o() {
                var t = n.data("name"), r = n.find("input[name='" + t + "']").val();
                return r = r ? e.evalJSON(r) : [], r
            }
            function u(t) {
            	for (var i in t) {
                	if (t[i].text) {
                		t[i].text = t[i].text.replace(/</g, "&lt;");
                		t[i].text = t[i].text.replace(/\"/g, "&quot;");
                	}
            	}
                var r = n.data("name"), i = e.toJSON(t);
                n.find("input[name='" + r + "']").val(i).trigger("change", i)
            }
            function a() {
                return i.mode - n.find(".picedit-item").length
            }
            function f(e, t) {
                if (e === t)
                    return !1;
                var n = o(), r = n[e];
                n.splice(e, 1), n.splice(t, 0, r), u(n)
            }
            function l(e) {
                var r = [], a = o();
                for (var f in e) {
                    var l = e[f], h = {image_id: l.id,image: l.url_640_480,_sort_: i.sort,_desc_: i.desc,_link_: i.link}, p = {image_id: l.id,image: l.url_640_480};
                    i.desc && (h.text = l.name, p.text = l.name), r.push(h), a.push(p)
                }
                var d = t.render(s, {items: r});
                n.find(".content").append(d), c(), u(a)
            }
            function c() {
                n.find(".picedit-item").length >= i.mode ? n.addClass("st-add-full") : n.removeClass("st-add-full")
            }
            function h(n) {
                var r = n, i = r.parents(".picedit-item"), s = i.index(), a = o();
                t.linkdialog({value: a[s],
                	confirm: function(t) {
                        a[s] = e.extend(a[s], {
                        	link_res_name: t.link_res_name,
                        	link_res_id: t.link_res_id,
                        	link_res_type: t.link_res_type,
                        	link: t.link,
                        	module_id: t.module_id
                        });
                        if (!t.module_id) {
                        	delete a[s].module_id;
                        }
                        u(a), i.find(".ui-linkselect-in").show().find(".ui-linkselect-title").html(t.link_res_name)
                    },cancle: function() {
                        r.attr("name") == "show-link" && (i.find('input[name="show-link"]').click(), i.find(".ui-linkselect-in").hide())
                    }})
            }
            function p(e) {
                var t = e, n = t.parents(".picedit-item");
                n.find(".ui-linkselect-in").hide()
            }
            var r = this, i = n.data("option");
            c(), i.sort && n.find(".content").sortable({items: "> .picedit-item",handle: ".sort-handle",placeholder: "sort-placeholder",cursor: "move",start: function(t, n) {
                    var r = e(this), i = n.item.index();
                    r.data("sort-start", i)
                },stop: function(t, n) {
                    var r = e(this), i = r.data("sort-start"), s = n.item.index();
                    f(i, s), r.data("sort-start", null)
                }}), n.on("click", ".picedit-item .js-delete", function() {
                var t = e(this), n = t.parents(".picedit-item"), r = n.index(), i = o();
                n.remove(), c(), i.splice(r, 1), u(i)
            }).on("click", ".js-add", function() {
                var e = a();
                e >= 1 && t.picselector({mode: e,select: function(e) {
                        l(e)
                    }})
            }).on("change", ".picedit-item input[name='show-text']", function() {
                var t = e(this), n = t.is(":checked"), r = t.parents(".picedit-item"), i = r.index(), s = o();
                n ? r.addClass("st-use-desc") : r.removeClass("st-use-desc"), s[i] = e.extend(s[i], {show_text: n}), u(s)
            }).on("change", ".picedit-item input[name='text']", function() {
                var t = e(this), n = t.val(), r = t.parents(".picedit-item"), i = r.index(), s = o();
                s[i] = e.extend(s[i], {text: n}), u(s)
            }).on("change", ".picedit-item input[name='show-link']", function() {
                var t = e(this), n = t.is(":checked"), r = t.parents(".picedit-item"), i = r.index(), s = o();
                s[i] = e.extend(s[i], {show_link: n}), u(s), n ? (r.addClass("st-use-link"), s[i].link_res_name ? r.find(".ui-linkselect-in").show().find(".ui-linkselect-title").html(s[i].link_res_name) : h(t)) : (r.removeClass("st-use-link"), p(t))
            }).on("click", ".picedit-item .ui-linkselect-update", function() {
                var t = e(this);
                h(t)
            })
        },init: function(t) {
            var n = this;
            t.find(".ui-picedit").each(function(t, r) {
                var i = e(r);
                if (i.data("picedit-init"))
                    return !1;
                n._init(i), i.data("picedit-init", !0)
            })
        },create: function(n) {
            var o, u, a = "";
            n.sortable == undefined && (n.sortable = n.mode > 1);
            if (n.value) {
                Array.isArray(n.value) ? u = n.value : typeof n.value == "object" && (u = [n.value]), o = r.escapeHtml(e.toJSON(u));
                for (var f in u) {
                    var l = u[f];
                    l.link_res_type = parseInt(l.link_res_type), l._desc_ = n.edit_desc, l._link_ = n.edit_link, l._sort_ = n.sortable
                }
                a = t.render(s, {items: u})
            }
            return t.render(i, {name: n.name,value: o,sortable: n.sortable,content: a,_option_: r.escapeHtml(e.toJSON({desc: n.edit_desc == 1,link: n.edit_link == 1,sort: n.sortable,mode: n.mode ? n.mode : 1}))})
        }}, t.picedit
}), define("ui-mod/switchrow", ["jquery", "ui-mod/base", "jquery-ui", "lib/bootstrap"], function(e, t) {
    var n = '<div class="form-row ui-switchrow{{#value}} st-checked{{/value}}{{#_last_}} last{{/_last_}} {{class}}">                <label><input type="checkbox" name="{{name}}" value="{{value}}" data-role="switch" {{#value}}checked{{/value}}>{{title}}</label>                <div class="form-cell">                    {{content}}{{#tip}}<span class="tip tip-info next-line">{{tip}}</span>{{/tip}}                </div>            </div>';
    return t.switchrow = {create: function(e) {
            return e.value = e.value == 1, t.render(n, e)
        },init: function(t) {
            t.on("change", ".ui-switchrow [data-role='switch']", function(t) {
                var n = e(this), r = n.parents(".ui-switchrow");
                n.is(":checked") ? (r.addClass("st-checked"), this.value = !0) : (r.removeClass("st-checked"), this.value = !1)
            })
        }}, t.switchrow
}), define("ui-mod/uploadpreview", ["jquery", "ui-mod/base", "libui/utils"], function(e, t, n) {
    var r = '<div class="ui-uploadpreview"><div class="pic">{{#preview_img}}<img src="{{preview_img}}">{{/preview_img}}</div><a class="button" href="javascript:;" data-role="upload-pic">{{upload_text}}</a>{{#upload_tip}}<span class="tip tip-info"><i class="ki28 ki28-tip-info"></i><span>{{upload_tip}}</span></span>{{/upload_tip}}<input type="hidden" name="{{name}}" value="{{value}}" data-role="upload-value"></div>';
    return t.uploadpreview = {create: function(e) {
            return t.render(r, e)
        },init: function(t, n) {
            t.hasClass("ui-uploadpreview") ? console.log("please init on ui-upload-preview's parent") : t.on("click", ".ui-uploadpreview [data-role=upload-pic]", function() {
                var t = e(this), r = t.closest(".ui-uploadpreview");
                n.onUpload.call(this, function(e) {
                    r.find("img").remove(), r.find(".pic").append('<img src="' + e.preview_img + '">'), r.find("[data-role=upload-value]").val(e.value).trigger("change")
                })
            })
        }}, t.uploadpreview
}), define("aeditor-link-selector", ["jquery", "ui-mod/base", "libui/utils", "jquery-ui"], function(e, t, n) {
    var r = {init: function(e) {
            var n = e.data;
            t.linkdialog({value: n.link_data,confirm: function(t) {
                    n.title = n.title ? n.title : t.link_res_name, n.link_data = t, e.confirm.call(this, n)
                }})
        }};
    return r
}), define("aeditor-modules", ["jquery", "ui-mod/base", "ui-mod/aeditor-utils"], function(e, t, n) {
    return {bold: {action_name: "bold",icon: '<span class="ki24 icon-page-bold"></span>',action: function(e) {
                n.execCom("Bold"), e.valChange()
            }},italic: {action_name: "italic",icon: '<span class="ki24 icon-page-i"></span>',action: function(e) {
                n.execCom("Italic"), e.valChange()
            }},underline: {action_name: "underline",icon: '<span class="ki24 icon-page-u"></span>',action: function(e) {
                n.execCom("Underline"), e.valChange()
            }},color: {action_name: "color",icon: '<span class="ki24 icon-page-fontcolor"></span>',action: function(e) {
                t.colorpanel({sourceElt: e.t,colorChange: function(t) {
                        n.execCom("ForeColor", t), e.valChange()
                    }})
            }},bgcolor: {action_name: "bgcolor",icon: '<span class="ki24 icon-page-color"></span>',action: function(e) {
                t.colorpanel({sourceElt: e.t,colorChange: function(t) {
                        n.execCom("BackColor", t), e.valChange()
                    }})
            }},align: {action_name: "align",icon: '<span class="ki24 icon-page-left"></span>',options: [{value: "left",content: '<span class="ki24 icon-page-left"></span>'}, {value: "center",content: '<span class="ki24 icon-page-midle"></span>'}, {value: "right",content: '<span class="ki24 icon-page-right"></span>'}],action: function(e) {
                var t = e.t.data("val");
                n.execCom("Justify" + t[0].toUpperCase() + t.slice(1)), e.valChange()
            }},align_left: {action_name: "align_left",icon: '<span class="ki24 icon-page-left"></span>',action: function(e) {
                n.execCom("JustifyLeft"), e.valChange()
            }},align_center: {action_name: "align_center",icon: '<span class="ki24 icon-page-midle"></span>',action: function(e) {
                n.execCom("JustifyCenter"), e.valChange()
            }},align_right: {action_name: "align_right",icon: '<span class="ki24 icon-page-right"></span>',action: function(e) {
                n.execCom("JustifyRight"), e.valChange()
            }},fontsize: {action_name: "fontsize",icon: '<span class="ki24 icon-page-fontsize"></span>',options: [{value: "1",content: "<em>12px</em>"}, {value: "2",content: "<em>14px</em>"}, {value: "3",content: "<em>16px</em>"}, {value: "4",content: "<em>18px</em>"}, {value: "5",content: "<em>24px</em>"}, {value: "6",content: "<em>32px</em>"}, {value: "7",content: "<em>48px</em>"}],action: function(e) {
                var t = e.t;
                n.execCom("FontSize", t.data("val")), e.valChange(), t.parents(".dropdown").hide()
            }},lineheight: {action_name: "lineheight",icon: '<span class="ki24 icon-page-hangju"></span>',options: [{value: "1.0",content: "<em>1.0</em>"}, {value: "1.5",content: "<em>1.5</em>"}, {value: "2.0",content: "<em>2.0</em>"}, {value: "2.5",content: "<em>2.5</em>"}, {value: "3.0",content: "<em>3.0</em>"}],action: function(t) {
                var r = t.t, i = t.w, s = i.find(".editable")[0], o = n.getRange(s), u = r.data("val"), a = n.cur_line(o);
                if (a.length > 0)
                    a.css("line-height", u);
                else {
                    var f = n.cur_para(o);
                    if (f.length > 0)
                        if (o.collapsed)
                            n.find_line(f).css("line-height", u);
                        else {
                            var l = o.startContainer, c = n.is_element(l) ? l : l.parentNode, h = o.endContainer, p = o.commonAncestorContainer, d = n.is_element(h) ? h : h.parentNode, v = c, m = [], a;
                            while (v && v !== d)
                                a = n.parent_line(e(v)), a.length > 0 && m.push(a[0]), v = v.nextSibling;
                            a = n.parent_line(e(d)), a.length > 0 && m.push(a[0]), e(m).css("line-height", u)
                        }
                }
                t.valChange(), r.parents(".dropdown").hide()
            }}}
}), define("aeditor-pic", ["jquery", "ui-mod/base", "aeditor-modules", "ui-mod/aeditor-utils"], function(e, t, n, r) {
    return n.pic = {action_name: "pic",icon: '<span class="ki24 icon-list-image"></span>',action: function(e) {
            var n = e.w, i = "site";
            LINEWELL.page && !LINEWELL.page.mapp_id && (i = "user"), t.picselector({mode: 1,source: i,select: function(i) {
                    var s = i, o, u = "";
                    o = s[0], o.url = t.getImage(o.url, 320, 0);
                    var a = n.find(".editable")[0];
                    r.insert_image(a, {image: o.url,image_id: o.id}), e.valChange(n)
                }})
        }}, n
}), define("aeditor-link", ["jquery", "ui-mod/base", "aeditor-modules", "ui-mod/aeditor-utils", "aeditor-link-selector"], function(e, t, n, r, i) {
    function u(e) {
        return {link: e.attr("href"),link_res_id: e.data("link-id"),link_res_type: e.data("link-type"),link_res_name: e.data("link-name")}
    }
    function a(e) {
        var n = e.link_data, r = {text: e.title ? e.title : "链接文字",type: n.link_res_type,name: n.link_res_name,id: n.link_res_id,link: n.link};
        return t.render(s, r)
    }
    function f(e) {
        return e.link_res_id || e.link
    }
    var s = "<a href='{{link}}' data-link-type='{{type}}' data-link-name='{{name}}' data-link-id='{{id}}'>{{text}}</a>", o = {link: "javascript:;",link_res_id: 0,link_res_type: 3,link_res_name: ""};
    return n.link = {action_name: "link",icon: '<span class="ki24 icon-btn-subbject"></span>',init: function(t) {
            t.w.on("click", ".ui-richtext .content .editable a", function(n) {
                var s = e(this), o, l;
                if (r.parent_block(s).length > 0)
                    return !0;
                o = s.parents(".ui-richtext"), l = u(s), i.init({data: {title: s.text(),link_data: l},confirm: function(e) {
                        if (f(e.link_data))
                            var n = a(e);
                        else
                            n = e.title;
                        s.replaceWith(n), t.valChange(o)
                    }})
            })
        },action: function(n) {
            var s = n.w, f = s.find(".editable")[0], l = r.getRange(f), c = window.getSelection(), h = r.cur_ele(l), p = n.valChange;
            if (!r.contains(f, h)) {
                t.alert("请在编辑框内编辑");
                return
            }
            var d = e(h), v = r.parent_block(d), m = d.closest("a");
            if (v.length > 0) {
                t.alert("当前位置不支持插入链接");
                return
            }
            if (m.length > 0) {
                var g = m.eq(0), y = u(g);
                i.init({data: {title: g.text(),link_data: y},confirm: function(e) {
                        var t = a(e);
                        g.replaceWith(t), p(s)
                    }});
                return
            }
            if (l.collapsed)
                i.init({data: {title: "",link_data: o},confirm: function(e) {
                        var t = a(e);
                        c.removeAllRanges(), c.addRange(l), r.execCom("insertHTML", t), p(s)
                    }});
            else {
                var b = c.toString();
                i.init({data: {title: b,link_data: o},confirm: function(e) {
                        var t = a(e);
                        c.removeAllRanges(), c.addRange(l), r.execCom("insertHTML", t), p(s)
                    }})
            }
        }}, n
}), define("ui-mod/aeditor", ["jquery", "ui-mod/base", "ui-mod/aeditor-utils", "aeditor-modules", "aeditor-pic", "aeditor-link"], function(e, t, n, r) {
    var i = '<li data-action="{{action_name}}"><a class="ico" href="javascript:;">{{icon}}</a></li>', s = '<li data-action="{{action_name}}">                <a class="ico" href="javascript:;">{{icon}}</a>                <div class="dropdown">                    {{#options}}<a href="javascript:;" data-val="{{value}}">{{content}}</a>{{/options}}                </div>            </li>', o = '<div class="ui-richtext editor {{style_theme}}" data-editor-id="{{editor_id}}">                <div class="head-placeholder"></div><div class="head">                    <ul>{{action_list}}</ul>                </div>                <div class="content">                    <div class="{{class}} editable" contenteditable="true">{{value}}</div>                </div>                <textarea  name="{{name}}">{{value}}</textarea>            </div>', u = 9, a = 13, f = 8, l = {empty: [],simple: ["bold", "italic", "underline", "color", "bgcolor"],full: ["bold", "italic", "underline", "fontsize", "lineheight", "color", "bgcolor", "align", "link"]}, c = {"text/plain": function(t, n) {
            var r = t.getData("text/plain");
            if (r) {
                r = r.replace(/\n\n+/g, "\n");
                var r = r.split("\n"), i = "", s = [];
                for (var o in r)
                    r[o] !== "" && s.push('<div data-role="line">' + e.trim(r[o].replace(/^\s+/gi, "")) + "</div>");
                return i = s.join(""), i
            }
        },"text/html": function(e) {
            return ""
        },Files: function(e) {
            return ""
        }};
    t.aeditor = {_id: function() {
            return (new Date).getTime() + "" + Math.round(Math.random() * 1e4)
        },create: function(e) {
            e.theme || (e.theme = "full");
            var n = [], u = l[e.theme];
            if (u === undefined)
                return alert("unknow richtext theme"), !1;
            Array.prototype.push.apply(n, u), e.ext && e.ext.length > 0 && Array.prototype.push.apply(n, e.ext);
            var a = [];
            for (var f in n) {
                var c = n[f];
                if (r[c]) {
                    var h = r[c], p = h.options ? s : i;
                    a.push(t.render(p, h))
                } else
                    console.log("unknow : " + c)
            }
            e.icon_list = n;
            var d = this._id();
            return t.render(o, {editor_id: d,action_list: a.join(""),"class": e["class"],style_theme: e.style_theme,name: e.name,value: e.value})
        },init: function(i) {
            var s = this, o = function(e) {
                var t = e.find("textarea"), n = e.find(".editable").html();
                t.val(n).trigger("change", n)
            };
            e.each(r, function(t, n) {
                var r = n.options ? ".ui-richtext [data-action=" + t + "] .dropdown a" : ".ui-richtext [data-action=" + t + "] a";
                i.on("click", r, function() {
                    var t = e(this), r = t.parents(".ui-richtext"), i = {t: t,w: r,valChange: function() {
                            o(r)
                        }};
                    n.action(i)
                }), n.init && n.init({w: i,valChange: o})
            });
            var l = [];
            return i.find(".ui-richtext").each(function(t, n) {
                var r = e(n), i = r.data("offset");
                i || (i = r.offset(), r.data("offset", i)), l.push(r)
            }), e(document).on("scroll", function() {
                var e = window.scrollY;
                l.forEach(function(t) {
                    var n = t.data("offset"), r = n.top + t.height() - t.find(".head").height();
                    e > n.top && e < r ? t.addClass("fixed") : t.removeClass("fixed")
                })
            }), i.on("mouseenter", ".ui-richtext .head li", function() {
                e(this).find(".dropdown").show()
            }).on("mouseleave", ".ui-richtext .head li", function() {
                e(this).find(".dropdown").hide()
            }).on("paste", ".ui-richtext .editable", function(t) {
                var r = t.clipboardData ? t.clipboardData : t.originalEvent.clipboardData;
                if (r && r.items) {
                    var i = [];
                    for (var s in r.items) {
                        var u = r.items[s], a = u.type, f = c[a];
                        f && i.push(f(r, u))
                    }
                    var a = e(this), l = a[0], h = n.getRange(l), p = n.cur_line(h);
                    e(i.join("")).insertAfter(p)
                }
                return t.preventDefault && (t.stopPropagation(), t.preventDefault()), o(e(this).parents(".ui-richtext")), !1
            }).on("click", ".ui-richtext [data-action=para] a", function(t) {
                var r = e(this), i = r.closest(".editable")[0], s = n.getRange(i), o = s.cloneContents();
                if (o.childNodes.length > 0) {
                    s.extractContents();
                    var u = o.childNodes, a;
                    for (var f = u.length - 1; f > -1; f--)
                        a = u[f], a = n.changeTag(a, "p"), s.insertNode(a)
                }
            }).on("focus keydown", ".ui-richtext .editable [data-block=true]", function(e) {
                return e.preventDefault(), !1
            }).on("keydown", ".ui-richtext .editable", function(t) {
                var r = e(this), i = e(this).parents(".ui-richtext"), s = r, l = t.keyCode;
                if (l === u)
                    t.preventDefault();
                else if (l === f) {
                    var c = n.find_para(s), h = n.find_block(s);
                    if (h.length === 0 && c.length === 1) {
                        var p = n.find_line(c);
                        if (p.length === 1 && n.is_line_empty(p[0]))
                            return t.preventDefault(), !1
                    }
                    var d = s[0], v = n.getRange(d), m = n.cur_para(v), g = n.cur_line(v);
                    if (g.length > 0 && m.length > 0 && g.index() === 0) {
                        var y = m.prev();
                        if (n.is_block(y) && !n.is_line_empty(g[0]) && v.collapsed && v.startOffset === 0) {
                            var b = v.commonAncestorContainer, w = g[0], E = n.first_text_child(w);
                            if (b === w.firstChild || b === E)
                                return t.preventDefault(), !1
                        }
                    }
                } else
                    l === a;
                o(e(this).parents(".ui-richtext"))
            }).on("keyup", ".ui-richtext .editable", function(t) {
                o(e(this).parents(".ui-richtext"))
            }).on("dragstart", ".ui-richtext .editable [data-role=block] img", function(e) {
                e.preventDefault()
            }).on("click", ".ui-richtext .editable [data-role=block]", function(t) {
                var r = e(this), i = r.find(".cover")[0], s = r.data("type");
                s === "pic" ? n.setCaret(i, i, 1) : n.setCaret(i, i, 0)
            }).on("keydown", ".ui-richtext .editable [data-role=block]", function(t) {
                var r = e(this), i = t.keyCode, s = r.closest(".editable");
                if (i === f)
                    r = e(this), n.go_prev(r), r.remove(), n.check_empty_content(s), t.preventDefault(), t.stopPropagation();
                else if (i !== 37 && i !== 38 && i !== 39 && i !== 40)
                    if (i === a) {
                        var o = n.getRange(s[0]);
                        r.data("type") === "pic" ? o.collapsed && o.startOffset === 0 ? n.go_prev(r, !0) : n.go_next(r, !0) : n.go_next(r, !0), t.preventDefault(), t.stopPropagation()
                    } else
                        t.preventDefault(), t.stopPropagation()
            }).on("blur", ".ui-richtext .editable, .ui-richtext .editable [data-role=block]", function(t) {
                var r = e(this), i = r.closest(".editable")[0], s = n.getRange(i);
                n.saveRange(s)
            }).on("focus", ".ui-richtext .editable, .ui-richtext .editable [data-role=block]", function(e) {
                n.clearLastRange()
            }).on("command", ".ui-richtext .editable", function(t, r, i) {
                if (r === "insert_image")
                    n.insert_image(this, i), o(e(this).parents(".ui-richtext"));
                else if (r === "delete_image") {
                    var s = e(this).find("img[data-role=" + i.image_role + "]");
                    n.parent_block(s).remove(), o(e(this).parents(".ui-richtext"))
                } else if (r === "update_image") {
                    var s = e(this).find("img[data-role=" + i.image_role + "]");
                    s.attr("src", i.image), s.attr("data-img-id", i.image_id), o(e(this).parents(".ui-richtext"))
                }
            }), t.aeditor
        }}
}), define("ui", ["ui-mod/base", "ui-mod/basedialog", "ui-mod/form", "ui-mod/tab", "ui-mod/text", "ui-mod/select", "ui-mod/paging", "ui-mod/colorpanel", "ui-mod/colorpicker", "ui-mod/iconpanel", "ui-mod/iconselect", "ui-mod/slider", "ui-mod/typeahead", "ui-mod/linkselect", "ui-mod/linkdialog", "ui-mod/margin", "ui-mod/picselect", "ui-mod/typeselect", "ui-mod/picselector", "ui-mod/grouplink", "ui-mod/richtext", "ui-mod/picedit", "ui-mod/switchrow", "ui-mod/uploadpreview", "ui-mod/aeditor-utils", "ui-mod/aeditor"], function(e) {
    return e
});
