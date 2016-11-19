define("utils/site", [], function () {
    return {
        mapp_id: LINEWELL && LINEWELL.page && LINEWELL.page.mapp_id, page_id: LINEWELL && LINEWELL.page && LINEWELL.page.page_id, static_url: LINEWELL && LINEWELL.staticurl, get: function (e) {
            var t = e.split(".");
            return t.length > 1 ? LINEWELL[t[0]][t[1]] : LINEWELL[t[0]];
        }, getSiteId: function () {
            return this.get("page.mapp_id");
        }, getPageId: function () {
            return this.get("page.page_id");
        }
    };
}), define("componentRegistrar", [], function () {
    var e = [], t = {}, n = {
        register: function (t) {
            e.push(t), this._triggerNewRegister(t);
        }, _regEvents: [], onRegister: function (e) {
            this._regEvents.push(e);
        }, _triggerNewRegister: function (e) {
            this._regEvents.forEach(function (t) {
                t(e);
            });
        }, getMetas: function () {
            return e;
        }, getStyles: function () {
            return t;
        }, sort: function () {
            e.sort(function (t, n) {
                var r = parseInt(t.seq ? t.seq.toString() : "0"), i = parseInt(n.seq ? n.seq.toString() : "0");
                return r = isNaN(r) ? 0 : r, i = isNaN(i) ? 0 : i, r - i;
            });
        }, getMeta: function (t, n) {
            for (var r = 0; r < e.length; r++)
                if (typeof t == "number" && e[r].eid == t || typeof t == "string" && e[r].name == t || typeof t == "string" && /^\d+$/.test(t) && e[r].eid == t) {
                    if (n == null)
                        return e[r];
                    if (n === e[r].version)
                        return e[r];
                }
            return null;
        }, getMetaByename: function (t) {
            for (var n = 0; n < e.length; n++)
                if (e[n].ename == t)
                    return e[n];
            return null;
        }
    };
    return n;
}), define("registerHelper", ["componentRegistrar"], function (e) {
    var t = {
        _regEvents: [], _regFinishEvents: [], onRegister: function (e) {
            this._regEvents.push(e);
        }, onRegisterFinish: function (e) {
            this._regFinishEvents.push(e);
        }, _triggerRegister: function (e) {
            this._regEvents.forEach(function (t) {
                t(e);
            });
        }, _triggerRegisterFromPackageFinish: function () {
            this._regFinishEvents.forEach(function (e) {
                e();
            });
        }
    };
    t.registerFromCode = function (t, n, r) {
        try {
            n = $.extend({ Component: n }, t), e.register(n), this._triggerRegister(n), r && r(n);
        } catch (i) {
            console.log("创建组件失败", t, n, i), this._triggerRegister(null, i), r && r(null, i);
        }
    }, t.registerFromPackage = function (t, n) {
        function i() {
            var n = 0;
            t.forEach(function (i) {
                var s = "latest_version", o = i.ename.split("/"), u = o[0], a = o[1], f = "componentsPath/" + u + "/" + s + "/components/" + a + "/editing";
                require([f], function (s) {
                    s = $.extend({ Component: s }, i), e.register(s), r._triggerRegister(s), n++, n >= t.length && (e.sort(), r._triggerRegisterFromPackageFinish());
                }, function () {
                    console.log("创建组件失败", i.name, i.version), i.loadError = !0, e.register($.extend({ Component: null }, i)), n++, n >= t.length && (e.sort(), r._triggerRegisterFromPackageFinish());
                });
            });
        }
        if (!t)
            throw "Component 初始化数据读取出错";
        var r = this;
        n ? require([n], function () {
            i();
        }) : i();
    };
    var n = {};
    t.registerFromPackage2 = function (t, r) {
        if (!t)
            throw "Component 初始化数据读取出错";
        var i = this,
            s = 0,
            o = 0,
            u = function (t) {
                var n = "latest_version",
                    r = t.ename.split("/"),
                    u = r[0],
                    a = r[1],
                    f = "componentsPath/" + u + "/" + n + "/components/" + a + "/editing";
                require([f], function (n) {
                    t.Component = n;
                    e.register(t);
                    i._triggerRegister(t);
                    s++;
                    s >= o && (e.sort(), i._triggerRegisterFromPackageFinish());
                },
                function () {
                    console.log("创建组件失败", t.name, t.version);
                    t.loadError = !0;
                    e.register(t);
                    s++;
                    s >= o && (e.sort(), i._triggerRegisterFromPackageFinish());
                });
            },
            a = function (e) {
                if (!e)
                    return;
                n[e.code] = $.extend(!0, {}, e);
                if (!e.components || e.components.length <= 0) {
                    console.warn("该插件内没有组件信息", e);
                    return
                }
                e.components.forEach(function (t) {
                    t.plugin_code = e.code;
                    u(t);
                });
            },
            f = function () {
                t.forEach(function (e) {
                    if (!e || !e.components)
                        return;
                    o += e.components.length;
                });
                t.forEach(function (e) {
                    a(e);
                });
            };
        if (r) {
            require([r], function () {
                f();
            }, function () {
                console.log(r + " 加载失败,将分别加载editing.js");
                f();
            });
        } else {
            f();
        }
    };
    t.getPlugin = function (e) {
        return n[e];
    };
    return t;
}), define("component", ["jquery"], function (e) {
    var t = function (e) {
        var t = {}, n, r = e._meta.data_config;
        for (var i in r)
            n = r[i], t[i] = typeof n["default"] != "undefined" ? n["default"] : undefined;
        return t;
    }, n = function () {
        this.data = {};
    };
    return n.prototype = {
        init: function (n) {
            this.$viewEl = e(this.viewEl), this.$configEl = e(this.configEl);
            var r = t(this);
            e.extend(this.data, r, n);
        }, renderView: function () {
        }, renderConfigurator: function () {
        }, getData: function () {
            if (this.subComponentContainers) {
                this.data._containers_ = this.data._containers_ || {};
                for (var t in this.subComponentContainers)
                    this.data._containers_[t] = this.subComponentContainers[t].getData();
            }
            return e.extend(!0, {}, this.data);
        }, setData: function (e, t) {
            if (e === "_containers_")
                throw "无法对容器内数据进行直接设置，请配置容器内组件的数据";
            this.data[e] = t;
        }, isValid: function () {
            return !0;
        }
    }, n.extend = function (t) {
        var n = this, r = function () {
            return n.apply(this, arguments);
        };
        return e.extend(r, n), r.prototype = new n, e.extend(r.prototype, t), r.__super__ = n.prototype, r;
    }, n;
}),
    /*
        组件渲染及事件监听
    */
    define("kzEditorUI", ["ui", "lib/mustache", "utils/site", "registerHelper", "component"], function (e, t, n, r, i) {
        //构造对象
        var s = function (e) {
            this.$toolsPanel = e.$toolsPanel;
            this.$viewPanel = e.$viewPanel;
            this.$scrollContainer = this.$viewPanel.closest(".phone-main-w");
            this.$configurator = e.$configuratorPanel;
            this.$headerPanel = e.$headerPanel;
            this.editorCore = e.editorCore;
            this.$lastComponent = null;
            this.$del_tips = jQuery('<div class="module-delete-tip" style="display: none;">         <p>确定删除吗？</p>         <div class="btn-con"><input class="delete last" type="button" value="删除"></div>             <div class="ico-arrow"><span class="ico-arrow-bd"></span><span class="ico-arrow-bg"></span></div>         </div>').appendTo("body");
            this.static_url = e.static_url;
            this.initToolBarEvent();
            this.initComponentsEvent();
        };
        s.prototype = {
            init: function () {
                this.$toolsPanel.disableSelection();
                this.resetDrag();
            },
            /*
                初始化插件工具栏事件
            */
            initToolBarEvent: function () {
                var e = this;
                /*
                    鼠标按下事件
                */
                this.$toolsPanel.delegate("li.shortcut", "mousedown", function (t) {
                    e.$viewPanel.addClass("page-content-mousedown");
                    var n = jQuery(t.target).closest(".shortcut"),
                        r = n.data("meta");
                    r && (e.editorCore.subComponentContainers.forEach(function (e) {
                        e.acceptRole && !e.acceptRole(r) ? $(e.el).addClass("reject") :
                        $(e.component.viewEl).closest("[data-role='component']").addClass("accept-component");
                    }), e.resetDrag());
                });
                /*
                    鼠标弹起事件
                */
                this.$toolsPanel.delegate("li.shortcut", "mouseup", function (t) {
                    e.$viewPanel.removeClass("page-content-mousedown");
                    e.editorCore.subComponentContainers.forEach(function (e) {
                        $(e.el).removeClass("reject");
                        $(e.component.viewEl).closest("[data-role='component']").removeClass("accept-component");
                    });
                    e.resetDrag();
                });
            },
            validateLastComponent: function () {
                if (this.$lastComponent) {
                    var e = this.$lastComponent.data("component");
                    this.$lastComponent.removeClass("module_config_error");
                    if (e) {
                        var t = e.isValid();
                        t !== !0 && (this.$lastComponent.addClass("module_config_error"), typeof t == "object" ? this.$lastComponent.find("[data-role='error_msg']").html(t.message) : this.$lastComponent.find("[data-role='error_msg']").html(""));
                    }
                }
            },
            blurAllComponent: function () {
                this.editorCore._callPlugIns("beforeBlurComponent"), this.validateLastComponent(), this.$viewPanel.find(".module-cur").removeClass("module-cur"), this.setConfiguratorActive(null);
            },
            initContextMenu: function () {
                this.$viewPanel.bind("contextmenu", function (e) {
                    return e.preventDefault(), e.stopPropagation(), !1;
                });
            },
            _$findClosestComponent: function (e) {
                var t = $(e).closest("[data-role='component']");
                return t.size() > 0 ? t : null;
            },
            $getCurEl: function () {
                var e = this.$viewPanel.find(".module-cur");
                return e[0] ? e : null;
            },
            setAsCurrentComponent: function (e) {
                e instanceof jQuery ? e.trigger("click") : e instanceof Element ? $(e).trigger("click") : e instanceof i && $(e.viewEl).trigger("click");
            },
            /*
                初始化组件事件
            */
            initComponentsEvent: function () {
                var e = this;
                this.$scrollContainer.on("click", function (t) {
                	var deleteEvent = $(t.target).closest("[data-role='module-delete']").size() > 0;
                    var n = e._$findClosestComponent(t.target);
                    if (n) {
                        var r = n.data("id"), i = n.data("component");
                        r && (e.$lastComponent && e.$lastComponent.data("id") != r && (e.editorCore._callPlugIns("beforeBlurComponent", e.$lastComponent.data("component")), e.validateLastComponent()),  e.$headerPanel.removeAttr("selected"), e.$headerPanel.removeClass("module-cur"), e.$viewPanel.find(".module-cur").removeClass("module-cur"), n.addClass("module-cur"), e.setConfiguratorActive(r), e.editorCore._callPlugIns("afterActiveComponent", i), e.$lastComponent = n);
                        deleteEvent && e.blurAllComponent();
                    } else {
                        e.$lastComponent && e.editorCore._callPlugIns("beforeBlurComponent", e.$lastComponent.data("component"));
                        e.blurAllComponent();
                	}
                }),
                
                this.$headerPanel.on("click", function (t) {
                	e.$viewPanel.find(".module-cur").removeClass("module-cur");
                	$(this).attr("selected", "selected");
                });
                
                this.$viewPanel.delegate("[data-role='component']", "mouseup", function (t) {
                    e.$viewPanel.removeClass("page-content-mousedown");
                    e.editorCore.subComponentContainers.forEach(function (e) {
                        $(e.el).removeClass("reject");
                        $(e.component.viewEl).closest("[data-role='component']").removeClass("accept-component");
                    });
                    e.resetDrag();
                }),
                this.$viewPanel.delegate("[data-role='component']", "mouseover", function (t) {
                    var n = e._$findClosestComponent(t.target);
                    n && (n.addClass("hover"), t.stopPropagation());
                }),
                this.$viewPanel.delegate("[data-role='component']", "mouseout", function (t) {
                    var n = e._$findClosestComponent(t.target);
                    n && (n.removeClass("hover"), t.stopPropagation());
                }),
                /*
                    组件预览中的删除事件
                */
                this.$viewPanel.delegate("[data-role='module-delete']", "click", function (t) {
                    var n = e._$findClosestComponent(t.target);
                    if (!n)
                        return;
                    var r = n.data("cfgs");
                    if (r && !r.deletable)
                        return;
                    //弹出删除提示
                    //e._showdelTip($(t.target), function () {
                        //删除组件预览
                        e.removeComponent($(t.target).closest("[data-id]").data("id"));
                    //}), t.stopPropagation();
                });
            },
            _showdelTip: function (e, t) {
                function n(t) {
                    if ($(t.target).closest(".module-delete-tip").size() > 0 || $(t.target).closest('[data-role="module-delete"]').size() > 0 && $(t.target).closest('[data-role="component"]').data("id") === e.closest('[data-role="component"]').data("id"))
                        return;
                    i.$del_tips.hide(), $(document).unbind("click", n);
                }
                var r = e.offset();
                r = { left: r.left - this.$del_tips.width() + 40, top: r.top - this.$del_tips.height() - 10 };
                var i = this;
                this.$del_tips.css(r).show().find("input").unbind("click").bind("click", function () {
                    i.$del_tips.hide(), i.setConfiguratorActive(null), t && t();
                }), setTimeout(function () {
                    $(document).bind("click", n);
                }, 100);
            },
            /*
                添加各个插件到左下角分类中，并监听拖动
            */
            addShortCut: function (i) {
                var s = this,
                    o = '<li class="shortcut {{^is_paid}}disabled{{/is_paid}} {{^is_open}}disabled{{/is_open}} {{#loadError}}error disabled{{/loadError}}"><p>{{icon}}</p>{{title}}{{#loadError}}（出错）{{/loadError}}</li>',
                    u = $.extend(!0, {}, i);
                u.icon = function () {
                    if (this.image_icon)
                        return t.render('<img src="' + this.image_icon + '"/>', {});
                    if (this.font_icon)
                        return '<i class="font-ico">' + this.font_icon + "</i>";
                };
                var a = jQuery(t.render(o, u));
                a.data("meta", i);
                i.loadError;
                //插件拖动事件
                a.on("toSortable", function (t, i) {
                    s.editorCore._callPlugIns("beforeCreateComponent");
                    var o = jQuery(t.target).data("meta");
                    if (!o.is_paid) {
                        var u = r.getPlugin(o.plugin_code),
                            a = u.title,
                            f = u.brief;
                        e.alert({ msg: "<span class='h4'>您的站点尚未购买" + a + "</span> <span>" + f + " &nbsp; <a target='_blank' href='/plugin/cloudshop?mapp_id=" + n.mapp_id + "'>马上购买</a></span>" });
                        return;
                    }
                    var l, c = $(i).closest('[data-role="sub_component"]');
                    if (c.size() > 0) {
                        var h = c.data("sub-container");
                        l = h.addComponent(o, null, i);
                    } else
                        l = s.editorCore.addComponent(o, null, i);
                    l ? $(i).trigger("click") : jQuery(i).remove();
                });
                this.$toolsPanel.find(".nocontent").remove();
                this.$toolsPanel.find('ul[data-category="' + i.category + '"]').append(a);
                this.resetDrag();
            },
            addComponent: function (e, t, n, r, i) {
                var s = this._createPlaceHolder(n, { $parentComponentEl: r });
                this._addComponent(s, e, t, i);
            },
            _createPlaceHolder: function (e, t) {
                var n = this.$getCurEl();
                if (e)
                    return $(e);
                var r = $("<div></div>");
                return t && t.$parentComponentEl ? r.appendTo(t.$parentComponentEl) : n && t.before ? r.insertBefore(n) : n && t.after ? r.insertAfter(n) : r.appendTo(this.$viewPanel), r;
            },
            insertComponent: function (e, t, n, r) {
                var i = this._createPlaceHolder(null, { after: !r, before: r });
                this._addComponent(i, e, t, n);
            },
            /*
                 添加组件预览
            */
            _addComponent: function (e, t, n, r) {
                e.attr("data-cfgs", JSON.stringify(r)).attr("data-cfgs_movable", r.movable).attr("data-role", "component");
                e.html("").attr("class", "module").append("<div class='module-control' data-role='component_control' >" + (r.movable ? "<span class='module-move'><i class='font-ico'> </i></span>" : "") + (r.deletable ? "<span data-role='module-delete' class='module-delete'><i class='font-ico'> </i></span>" : "") + "<span class='module-error'><i class='font-ico'>&#xE6B8;</i><div data-role='error_msg'></div></span>" + "</div><div class='module-box' data-role='component_box'></div>");
                if (t) {
                    if (e.parent().is('[data-role="sub_component"]')) {
                        var i = e.parent().data("subContainer");
                        if (i.acceptRole && !i.acceptRole(t._meta))
                            return e.remove(), !1;
                    }
                    var s = this.createConfigurator(n);
                    t.viewEl = e.find("[data-role='component_box']")[0];
                    t.configEl = $(s)[0];
                    t.opts = r;
                } else
                    console.log("错误:组件为空"); 
                e.attr("data-id", n).data("id", n).data("component", t);
            },
            /*
                组件预览中显示和删除时操作：重置拖动
            */
            resetDrag: function () {
                var e = this;
                //组件预览拖动
                jQuery(this.$viewPanel.selector + " ," + this.$viewPanel.selector + ' [data-role="sub_component"]:not(.reject)').sortable({
                    connectWith: jQuery(this.$viewPanel.selector + " ," + this.$viewPanel.selector + ' [data-role="sub_component"]:not(.reject)'),
                    placeholder: "module-temp",
                    scroll: !0,
                    revert: !0,
                    beforeMouseDown: function (t) {
                        //组件预览点击处理
                        var n = e._$findClosestComponent(t.target);
                        if (!n)
                            return;
                        var r = n.data("component");
                        if (r && $(t.target).closest(".module-move")[0]) {
                            e.editorCore.subComponentContainers.forEach(function (e) {
                                e.acceptRole && !e.acceptRole(r._meta) && e.component !== r ? $(e.el).addClass("reject") : $(e.component.viewEl).closest("[data-role='component']").addClass("accept-component");
                            });
                            var i = n.closest('[data-role="sub_component"]');
                            i.size() > 0 && (i.removeClass("reject"), t.stopPropagation()),
                            e.resetDrag();
                        }
                    },
                    handle: ".module-move",
                    delay: 100
                });
                //工具栏拖动
                this.$toolsPanel.find("li.shortcut:not(.error)").draggable({
                    connectToSortable: jQuery(this.$viewPanel.selector + ', [data-role="sub_component"]:not(.reject)'),
                    helper: "clone"
                });
            },
            removeComponent: function (e) {
                var t = this,
                    n = this.$viewPanel.find("[data-id='" + e + "']"),
                    r = n.data("component");
                this.editorCore._callPlugIns("beforeRemoveComponent", r), setTimeout(function () {
                    r.beforeRemove && r.beforeRemove();
                }, 0),
                setTimeout(function () {
                    t.$viewPanel.find("[data-id='" + e + "']").remove(), t.$configurator.find("#config_" + e).remove(), t.$lastComponent && t.$lastComponent.data("id") == e && (t.$lastComponent = null);
                }, 0);
            },
            eachComponent: function (e) {
                //遍历组件预览所有子标签中带有：data-id
                this.$viewPanel.children("[data-id]").each(function () {
                    //取出组件的信息
                    e($(this).data("component"));
                });
            },
            eachComponentIncludeSub: function (e) {
                this.$viewPanel.find("[data-id]").each(function () {
                    e($(this).data("component"));
                });
            },
            createConfigurator: function (e) {
                var t = $("<div id='config_" + e + "' class='configurator hide'></div>");
                return this.$configurator.append(t), t;
            },
            setConfiguratorActive: function (e) {
            	
            	// 隐藏头部
            	$(".mod-config").css({visibility: "hidden", display : "none"});
            	
                this.$configurator.find(".configurator").addClass("hide");
                var t = this.$configurator.find("#config_" + e);
                t.removeClass("hide"), t.size() > 0 && !/^\s*$/gi.test(t.html()) ? this.$configurator.css({visibility : "visible", display : "block"}) : this.$configurator.css({visibility : "hidden", display : "none"});
            },
            clear: function () {
                this.$configurator.html(""), this.$viewPanel.html("");
            }
        };
        return s;
    }), define("componentContainer", ["componentRegistrar"], function (e) {
        var t = function (e, t, n, r, i, s) {
            this.guid = n, this.el = r, this.$el = $(r), this.name = t, this.editorCore = i, this.acceptRole = s && s.acceptRole, this.component = e;
        };
        return t.prototype = {
            addComponent: function (t, n, r, i) {
                var s;
                t.eid && (s = e.getMeta(t.eid));
                if (this.acceptRole && this.acceptRole(s))
                    return this.editorCore.addComponent(s, n, r, this.$el, i);
            }, initComponents: function (e) {
                var t = this;
                this.clear(), e && e.length > 0 && e.forEach(function (e) {
                    t.addComponent({ eid: e.eid, ename: e.ename, name: e.name, version: e.version }, e.value, null, t.editorCore._buildComponentOption(e));
                });
            }, clear: function () {
                $(this.$el).children("[data-id]").each(function () {
                    $("#config_" + $(this).data("id") + ".configurator").remove(), $(this).remove();
                });
            }, eachSubComponents: function (e) {
                $(this.$el).children("[data-id]").each(function () {
                    e($(this).data("component"));
                });
            }, getData: function () {
                var e = [], t = this;
                return this.eachSubComponents(function (n) {
                    var r = t.editorCore._getComponentData(n);
                    e.push(r);
                }), { name: this.name, components: e };
            }
        }, t;
    }), define("errorComponent", ["component", "utils/site"], function (e, t) {
        return e.extend({
            renderView: function () {
                this.$viewEl.html("<div class='no-open'><p>插件已关闭</p></div>");
            }
        });
    }),
/*
    组件工厂
*/
define("componentFactory", ["componentContainer", "errorComponent"], function (e, t) {
    var n = {};
    return n.create = function (n, r, i, s, o, u, a) {
        if (!n)
            return null;
        n.Component || (n.Component = t);
        var f = new n.Component;
        return f._meta = n,
            f.setComponentContainer = function (t, n, i) {
                this.data._containers_ = this.data._containers_ || {};
                var s = this;
                $(t).each(function (t) {
                    var o;
                    n instanceof Array ? o = n[t] : o = n;
                    var u = new e(s, o, r.subComponentContainers.length, $(this), r, { acceptRole: i && i.acceptRole }),
                        a = s.data._containers_[o];
                    a && a.components && u.initComponents(a.components),
                    r.subComponentContainers.push(u),
                    $(this).attr("data-role", "sub_component").data("sub-container", u),
                    f.subComponentContainers = f.subComponentContainers || {},
                    f.subComponentContainers[o] = u;
                });
            },
            f.getContext = function () {
                return { components: r.getData(), editor: r, placeHolder: s, $parentComponentEl: o, opts: u, position: a };
            },
            f;
    }, n;
}),
    /*
        特殊组件数据过滤和组装
    */
    define("utils/serverHelper", [], function () {
        function e(t) {
            if (t.items)
                if (t.eid == 14) {
                    var n = [], r = [], i = t.items[0] ? t.items[0] : [], s = null, o = [];
                    for (var u = 0; u < i.length; u++)
                        s = i[u], s = e(s), n.push(s);
                    i = t.items[1] ? t.items[1] : [];
                    for (var u = 0; u < i.length; u++)
                        s = i[u], s = e(s), r.push(s);
                    t.value._containers_ = { left_col: { name: "left_col", components: n }, right_col: { name: "right_col", components: r } };
                } else {
                    var a = { name: "sub-container" };
                    for (var f = 0; f < t.items.length; f++) {
                        var i = t.items[f], s = null, o = [];
                        for (var u = 0; u < i.length; u++)
                            s = i[u], s = e(s), o.push(s);
                        a.components = o;
                    }
                    t.value._containers_ = { "sub-container": a };
                }
            return t;
        }
        function t(e) {
            if (e.eid == 14) {
                e.items = [[], []];
                var n = 0;
                for (var r in e.value._containers_)
                    (function (r) {
                        e.items[n] = e.value._containers_[r].components, e.value._containers_[r].components.forEach(function (e) {
                            t(e);
                        });
                    })(r), n++;
                delete e.value._containers_;
            } else if (e.value._containers_) {
                e.items = [];
                var n = 0;
                for (var r in e.value._containers_)
                    (function (r) {
                        e.items[n] = e.value._containers_[r].components, e.value._containers_[r].components.forEach(function (e) {
                            t(e);
                        });
                    })(r), n++;
                delete e.value._containers_;
            }
        }
        return { Sever2Client: e, Client2Sever: t };
    }),
    /*
        组件加载入口
    */
    define("kzEditor", ["kzEditorUI", "componentFactory", "componentRegistrar", "utils/serverHelper", "ui"], function (e, t, n, r, i) {
        var s = function (t) {
            this._componentIndex = 0;
            this._plugins = [];
            this.subComponentContainers = [];
            this.kzEditorUI = new e({ editorCore: this, $headerPanel:t.$headerPanel, $toolsPanel: t.$toolsPanel, $viewPanel: t.$viewPanel, $configuratorPanel: t.$configuratorPanel, static_url: t.static_url });
        };
        return s.prototype = {
            init: function (e) {
                var t = this;
                //初始化UI
                this.kzEditorUI.init(); 
                //遍历组件添加到左下角中
                n.getMetas().forEach(function (e) {
                    t.addShortCut(e);
                });
                
                // 日常增加添加按钮
                t.kzEditorUI.$toolsPanel.find("ul[data-category=3],ul[data-category=4]").each(function () {
                	var $this = $(this);
                	var addPageUrl = $this.attr("add-page-url");
                	var $addItem = $("<li class=\shortcut-add\>+</li>");
                	$addItem.click(function () {
                		window.location.href = addPageUrl
                	})
                	$this.append($addItem);
                });
                
                this.initComponents(e);
            },
            $getCurEl: function () {
                return this.kzEditorUI.$getCurEl();
            },
            setAsCurrentComponent: function (e) {
                return this.kzEditorUI.setAsCurrentComponent(e);
            },
            initComponents: function (e) {
                var t = this;
                e && e.length > 0 && e.forEach(function (e) {
                    t.addComponent(e.meta, e.data, null, null, t._buildComponentOption(e));
                });
                this.kzEditorUI.setConfiguratorActive(null);
                
                // 可编辑的页面显示页面属性
        		if (LINEWELL.page.editable) {
        			$("#js-config-pageattr").css({visibility: "visible", display : "block"});
        		}
                this._callPlugIns("afterInitComponents");
            },
            /*
                绑定组件选项值
            */
            _buildComponentOption: function (e) {
                var t = { deletable: e.deletable, configurable: e.configurable, movable: e.movable };
                return e.role && (t.role = e.role), t;
            },
            _buildComponentData: function (e) {
                if (!e)
                    return console.log("组件数据位空，可能是脏数据"), null;
                var t;
                t = e.eid && n.getMeta(e.eid) || e.ename && n.getMetaByename(e.ename) || e;
                var i = { meta: t, deletable: e.deletable, configurable: e.configurable, movable: e.movable };
                //多短号返回最后一个变量
                return e = r.Sever2Client(e), i.data = e.value, e.role && (i.role = e.role), i;
            },
            _initComponentFromServerData: function (e) {
                //初始化组件表单中的数据
                var t = [], n = e;
                for (var r = 0; r < n.length; r++) {
                    var i = this._buildComponentData(n[r]);
                    i && t.push(i);
                }
                return t;
            },
            clearComponents: function () {
                this._componentIndex = 0,
                this.subComponentContainers = [],
                this.kzEditorUI.clear();
            },
            /*
                创建组件预览和组件配置
            */
            _addComponent: function (e, n, r, s, o, u) {
                var a = u || "end";
                this._componentIndex++;
                var f = t.create(e, this, n, r, s, o, u);
                f || console.log("创建组件失败", "arguments", arguments);
                if (f && f.beforeInit) {
                    var l;
                    if (s) {
                        var c = s.data("sub-container");
                        c && (l = {
                            component: {
                                eid: c.component._meta.eid,
                                name: c.component.name,
                                version: c.component.version,
                                value: c.component.getData()
                            },
                            container: { name: c.name, guid: c.guid }
                        });
                    }
                    var h = f.beforeInit(l);
                    if (h === !1)
                        return null;
                    if (typeof h == "object")
                        return i.alert({ msg: h.message || "组件初始化失败,原因请联系组件开发者" }), null;
                }
                var p = {
                    configurable: true,
                    deletable: e ? e.eid == "28" || e.eid == "29" || e.eid == "23" || e.eid == "30" ? false : true : true,
                    movable: true
                },
                d = $.extend({}, p, o || {});
                if (a === "after") {
                    this.kzEditorUI.insertComponent(f, this._componentIndex, d, false);
                } else if (a === "before") {
                    this.kzEditorUI.insertComponent(f, this._componentIndex, d, true);
                } else {
                    this.kzEditorUI.addComponent(f, this._componentIndex, r, s, d);
                }
                this._callPlugIns("afterCreateComponent", f);
                if (window.env === "development") {
                    f && f.init(n);
                    this._callPlugIns("afterInitComponent", f);
                }
                else {
                    try {
                        f && f.init(n);
                        this._callPlugIns("afterInitComponent", f);
                    } catch (v) {
                        return console.log("组件初始化出错", f, v), f;
                    }
                }
                if (d.configurable) {
                    if (window.env === "development") {
                        f && f.renderConfigurator();
                    } else {
                        try {
                            f && f.renderConfigurator();
                        } catch (v) {
                            console.log("组件创建配置框出错", f, v);
                        }
                    }
                }
                if (window.env === "development") {
                    f && f.renderView();
                } else {
                    try {
                        f && f.renderView();
                    } catch (v) {
                        console.log("组件创建预览出错", f, v);
                    }
                }
                this.kzEditorUI.resetDrag();
                return f;
            },
            /*
                创建组件
            */
            addComponent: function (e, t, n, r, i) {
                return this._addComponent(e, t, n, r, i);
            },
            insertComponent: function (e, t, n) {
                return this._addComponent(e, t, null, null, n, "after");
            },
            insertBeforeComponent: function (e, t, n) {
                return this._addComponent(e, t, null, null, n, "before");
            },
            addShortCut: function (e) {
                this.kzEditorUI.addShortCut(e);
            },
            eachComponent: function (e) {
                this.kzEditorUI.eachComponent(e);
            },
            eachComponentIncludeSub: function (e) {
                this.kzEditorUI.eachComponentIncludeSub(e);
            },
            blurAllComponent: function () {
                this.kzEditorUI.blurAllComponent();
            },
            isValid: function () {
                var e = !0, t = [], n = null;
                this.eachComponentIncludeSub(function (r) {
                    var i = r && r.isValid();
                    i !== !0 && (n = r && r.$viewEl.closest("[data-id]"), e = !1, typeof i == "object" ? (t.push(i), n.find("[data-role='error_msg']").html(i.message)) : n.find("[data-role='error_msg']").html(""), n.addClass("module_config_error"));
                });
                if (n) {
                    var r = this.kzEditorUI.$scrollContainer;
                    r.scrollTop(r.scrollTop() + (n.offset().top - r.offset().top)), n.trigger("click");
                } else
                    $(".module_config_error[data-role='component']").removeClass("module_config_error");
                return t.length > 0 ? t : e;
            },
            /*
                获取组件配置中的数据
            */
            _getComponentData: function (e) {
            	var t = { eid: e._meta.eid, name: e._meta.name, version: e._meta.version, deletable: e.opts ? e.opts.deletable : true, configurable: e.opts ? e.opts.configurable : true, movable: e.opts ? e.opts.movable : true, value: e.getData(), ename: e._meta.ename };
                return e.opts.role && (t.role = e.opts.role), this._callPlugIns("afterGetComponentData", { data: t, component: e }), t;
            },
            getData: function () {
                var e = [], t = this;
                //遍历组件
                this.eachComponent(function (n) {
                    if (n) {
                        var i = t._getComponentData(n);
                        r.Client2Sever(i);
                        e.push(i);
                    }
                });
                return e;
            },
            /*添加操作插件*/
            addPlugIn: function (e) {
                this._plugins.push(e);
            },
            /*调用操作插件方法*/
            _callPlugIns: function (e, t) {
                this._plugins.forEach(function (n) {
                    if (n[e]) {
                        n[e](t);
                    }
                });
            }
        }, s;
    }), define("kzEditorTpl", ["kzEditor", "jquery"], function (e, t) {
        var n = function (t) {
            e.apply(this, [t]);
        };
        return n.prototype = Object.create(e.prototype), n.__super__ = e.prototype, t.extend(n.prototype, {
            _buildComponentData: function (t) {
                var n = e.prototype._buildComponentData.apply(this, arguments);
                return t.datamap && (n.datamap = t.datamap), t.role && (n.role = t.role), n;
            }, _buildComponentOption: function (e) {
                var t = { deletable: e.deletable === !0 || e.deletable == 1, movable: !0, configurable: !0 };
                if (e.configurable === !1 || e.configurable === 0)
                    t.configurable = !1;
                if (e.movable === !1 || e.movable === 0)
                    t.movable = !1;
                e.datamap && (t.datamap = e.datamap);
                if (e.role) {
                    t.role = e.role;
                    switch (e.role) {
                        case "post-title":
                            t.configurable = !1, t.movable = !1;
                            break;
                        case "post-attr":
                            t.configurable = !1, t.movable = !1;
                            break;
                        case "article-content":
                            t.configurable = !1;
                            break;
                        case "article-bd":
                        case "article-recomnew":
                            t.configurable = !1;
                    }
                }
                return t;
            }, _getComponentData: function (t) {
                var n = e.prototype._getComponentData.apply(this, arguments);
                if (t.opts) {
                    var r = t.opts;
                    r.datamap && (n.datamap = r.datamap), r.role && (n.role = r.role);
                }
                return n;
            }
        }), n;
    }), define("utils/uiHelper", ["jquery", "ui"], function (e, t) {
        var n = { mini: !0 }, r = { width: "50%", height: "40px", align: "center" }, i = function (t, n, r, i) {
            return t.$configEl.delegate('[name="' + n + '"] ', "change", i || function (i) {
                var s = e(i.target).val();
                t.data[n] = s + r, t.renderView();
            }), this;
        }, s = function (e) {
            var t = e, n = !!(t.data["margin-top"] || t.data["margin-right"] || t.data["margin-bottom"] || t.data["margin-left"]), r = function () {
                t.$configEl.find(".margin_configurator").find("input:text").each(function () {
                    t.data[this.name] = (this.value || 0) + "px";
                }), t.renderView();
            };
            n && (t.$configEl.find(".margin_configurator").find("input:text").each(function () {
                this.value = t.data[this.name].replace("px", "");
            }), setTimeout(function () {
                t.$configEl.find("[name='chk_margin']").not(":checked").trigger("click");
            }, 100)), i(e, "margin-top", "", function () {
                r();
            }), i(e, "margin-right", "", function () {
                r();
            }), i(e, "margin-bottom", "", function () {
                r();
            }), i(e, "margin-left", "", function () {
                r();
            }), t.$configEl.delegate("input[name='chk_margin']", "click", function () {
                this.checked ? r() : (delete t.data["margin-top"], delete t.data["margin-right"], delete t.data["margin-bottom"], delete t.data["margin-left"], t.renderView());
            });
        }, o = function (e) {
            var t = e, n = !!t.data.width || !!t.data.height;
            n && setTimeout(function () {
                t.$configEl.find("[name='chk_size']").trigger("click");
            }, 500), i(e, "width", "%"), i(e, "height", "px"), e.$configEl.delegate("input[name='chk_size']", "click", function () {
                this.checked ? (t.data.width = (t.$configEl.find("[name='width']").val() || 50) + "%", t.data.height = (t.$configEl.find("[name='height']").val() || 40) + "px") : (delete t.data.width, delete t.data.height), t.renderView();
            });
        }, u = function (e) {
            var t = e;
            i(e, "align", ""), t.data.align && (t.$configEl.find("[name='chk_align']").click(), t.$configEl.find('[data-val="' + t.data.align + '"]').click()), i(e, "chk_align", "", function () {
                this.checked ? t.data.align = t.$configEl.find("[name='align']").val() : delete t.data.align, t.renderView();
            });
        }, a = {};
        return a.createConfiguartor = function (i) {
            var a = e(i.configEl),
                f = i._meta.widgets,
                l = "",
                c = function () {
                    var e = { tab_nav: [], tab_content: [] }, n = !1;
                    f.property && f.property.length > 0 && (e.tab_nav.push({ cur: !0, title: "内容" }), n = !0, e.tab_content.push({ content: '<form action="javascript:;" method="post" onsubmit="return false;"><fieldset class="js-tabpanel-property"></fieldset></form>' })), f.style && f.style.length > 0 && (e.tab_nav.push({ cur: !n, title: "样式" }), e.tab_content.push({ content: '<form action="javascript:;" method="post" onsubmit="return false;"><fieldset class="js-tabpanel-style"></fieldset></form>' })), l = t.tab.create(e), a.html(l), t.tab.init(a);
                    var r = { $propertyPanel: a.find("fieldset.js-tabpanel-property"), $stylePanel: a.find("fieldset.js-tabpanel-style") };
                    for (var i in r)
                        r[i].setAsOneCol = function () {
                            this.parent().addClass("single-col");
                        };
                    return r;
                }, h = c(), p = function (t, i) {
                    var s = e.extend(!0, {}, t.opt);
                    s.name || (s.name = t.data_name ? t.data_name : ""), s.name !== "" && (s.value = i[s.name]), !s.value && r[s.name] && (s.value = r[s.name]), t.type === "margin" ? s = { "margin-top": i["margin-top"], "margin-right": i["margin-right"], "margin-bottom": i["margin-bottom"], "margin-left": i["margin-left"] } : t.type === "colorpicker" && (s = e.extend({}, n, s));
                    if (t.type === "switchrow") {
                        var o = t.opt.content;
                        o && (o.type === "margin" && (o.opt = { "margin-top": i["margin-top"], "margin-right": i["margin-right"], "margin-bottom": i["margin-bottom"], "margin-left": i["margin-left"] }), o instanceof Array && o.forEach(function (e) {
                            e.opt.name == "width" && (e.opt.value = i.width || "50%"), e.opt.name == "height" && (e.opt.value = i.height || "45px");
                        }));
                    }
                    return s;
                }, d = function () {
                    var n = f, r = i.getData(), l = n.style, c = n.property, d = n.wiki, v = function (e, n) {
                        if (n && e)
                            if (t[e.type]) {
                                var f = p(e, r), l;
                                if (e.type === "switchrow") {
                                    var c = "", h = e.opt.content;
                                    if (h)
                                        if (h instanceof Array)
                                            h.forEach(function (e) {
                                                var n = p(e, r);
                                                c += '<div class="form-subrow js-subrow"><label>' + e.label + '</lable><div class="ui-typeahead js-typeahead">', c += t[e.type].create(n), c + "</div>";
                                            });
                                        else if (t[h.type]) {
                                            var d = p(h, r);
                                            c = t[h.type].create(d);
                                        } else
                                            h.name && (c = '<div class="ui-placeholder js-field-' + h.name + '"></div>');
                                    f.title = e.label, f.content = c, l = t.switchrow.create(f);
                                } else {
                                    var c = t[e.type].create(f);
                                    l = t.createRow({ title: e.label, content: c });
                                }
                                n.append(l), t[e.type].init(a), e.type === "switchrow" && e.opt.content && (e.opt.content instanceof Array ? e.opt.content.forEach(function (e) {
                                    t[e.type].init(a);
                                }) : t[e.opt.content.type] && t[e.opt.content.type].init(a), e.opt.name === "chk_margin" && s(i), e.opt.name === "chk_align" && u(i), e.opt.name === "chk_size" && o(i))
                            } else
                                n && n.append('<div class="ui-placeholder js-field-' + (e.name || e.data_name || "") + '"></div>');
                    }, m = 0;
                    l && l.forEach(function (e) {
                        v(e, h.$stylePanel), m++
                    }), m = 0, c && c.forEach(function (e) {
                        v(e, h.$propertyPanel), m++
                    });
                    if (d && d.length > 0) {
                        var g = e(h.$stylePanel.context), y = '<a class="compoment-wiki" href="' + d[0].href + '" target="_blank"  title="' + d[0].title + '"><span class="ki24 icon-btn-help"></span></a>';
                        g.append(y)
                    }
                };
            return d(), h
        }, a
    }),
    /*
        组件配置扩展
    */
    define("configurableComponent", ["jquery", "component", "lib/mustache", "ui", "utils/uiHelper"], function (e, t, n, r, i) {
        var s = { mini: !0 };
        return t.extend({
            init: function (t) {
                this.$viewEl = e(this.viewEl);
                this.$configEl = e(this.configEl);
                var n = this.getDefaults();
                this.data = e.extend({}, n, t)
            },
            getDefaults: function () {
                var e = {
                    "int": 0,
                    "float": 0,
                    "boolean": !1,
                    string: "",
                    array: [],
                    object: {}
                },
                t = {},
                n,
                r = this._meta.data_config;
                for (var i in r)
                    n = r[i], t[i] = typeof n["default"] != "undefined" ? n["default"] : e[n.type];
                return t
            },
            renderView: function (e) {
                e === undefined && (e = this.data);
                this.$viewEl.html(n.render(this.html_edit, e));
            },
            renderConfigurator: function (e) {
                e && (e.column == "property" && delete this._meta.widgets.style, e.column == "style" && delete this._meta.widgets.property);
                var t = i.createConfiguartor(this);
                this.$stylePanel = t.$stylePanel;
                this.$propertyPanel = t.$propertyPanel
            },
            listen: function (t, n, r) {
                var i = this;

                return this.$configEl.delegate('[name="' + t + '"] ', "change", r || function (r) {
                    var s = e(r.target).val();
                    i.data[t] = s + n, i.renderView()
                }), this
            },
            listenMargin: function () {

            },
            listenSize: function () {

            },
            listenAlign: function () {

            },
            createButtonStylesHtml: function () {
                var t = this,
                    n = r.createRow({
                        title: "样式",
                        content: r.typeselect.create({
                            name: "btn_style",
                            theme: "two-col",
                            options: [{
                                cur: this.data.type == "highlight" && this.data.theme_color === !0,
                                value: '{"type":"highlight", "theme":true}',
                                content: '<a href="javascript:;" class="btn-highlight btn-highlight-theme">按钮</a>'
                            },
                            {
                                cur: this.data.type == "highlight" && this.data.theme_color === !1,
                                value: '{"type":"highlight", "theme":false}',
                                content: '<a href="javascript:;" class="btn-highlight">按钮</a>'
                            },
                            {
                                cur: this.data.type == "flat" && this.data.theme_color === !0,
                                value: '{"type":"flat", "theme":true}',
                                content: '<a href="javascript:;" class="btn-flat btn-flat-theme">按钮</a>'
                            },
                            {
                                cur: this.data.type == "flat" && this.data.theme_color === !1,
                                value: '{"type":"flat", "theme":false}',
                                content: '<a href="javascript:;" class="btn-flat">按钮</a>'
                            },
                            {
                                cur: this.data.type == "gradient" && this.data.theme_color === !0,
                                value: '{"type":"gradient", "theme":true}',
                                content: '<a href="javascript:;" class="btn-gradient btn-gradient-theme">按钮</a>'
                            },
                            {
                                cur: this.data.type == "gradient" && this.data.theme_color === !1,
                                value: '{"type":"gradient", "theme":false}',
                                content: '<a href="javascript:;" class="btn-gradient">按钮</a>'
                            },
                            {
                                cur: this.data.type == "radian" && this.data.theme_color === !0,
                                value: '{"type":"radian", "theme":true}',
                                content: '<a href="javascript:;" class="btn-radian btn-radian-theme">按钮</a>'
                            },
                            {
                                cur: this.data.type == "radian" && this.data.theme_color === !1,
                                value: '{"type":"radian", "theme":false}',
                                content: '<a href="javascript:;" class="btn-radian">按钮</a>'
                            }]
                        })
                    });
                this.$stylePanel.prepend(n);
                r.typeselect.init(this.$configEl);
                this.$configEl.delegate('input[name="btn_style"]', "change", function (n) {
                    var r = e(this),
                        i = e.parseJSON(r.val());
                    t.data.type = i.type;
                    t.data.theme_color = i.theme;
                    t.renderView()
                })
            }, createLinkStyleHtml: function () {
                var t = this.$configEl.find(".js-field-link"), n;
                var value = {
                        link: this.data.link,
                        link_res_type: this.data.link_res_type,
                        link_res_id: this.data.link_res_id,
                        link_res_name: this.data.link_res_name
                };
                this.data.module_id && (value.module_id = this.data.module_id);
                n = r.createRow({
                    title: "链接到",
                    content: r.linkselect.create({
                        name: "link_data",
                        value: value
                    })
                });
                t.replaceWith(n);
                var i = this;
                this.listen("link_data", "", function () {
                    var t = JSON.parse(this.value);
                    !t.module_id && (delete i.data.module_id);
                    e.extend(i.data, t);
                });
                r.linkselect.init(this.$configEl);
            },
            isValid: function () {
                return !0
            }
        })
    });
var theme_id = "main_theme";
define("themeManager", ["utils/site"], function (e) {
    return function () {
        $("#" + theme_id).size() <= 0 && $("head").append('<link rel="stylesheet" id="main_theme" type="text/css">');
        var t = $("#" + theme_id);
        return {
            setTheme: function (n) {
                t.attr("href", e.static_url + "/res/skin/themes/" + n + "/theme.css")
            }, removeTheme: function () {
                t.removeAttr("href")
            }
        }
    }
}),
    /*
        可操作工具栏
    */
    define("plugins/undoTool", [], function () {
        var e = function (e) {
            this.length = e;
            this._undoList = [];
            this._redoList = [];
        };
        e.prototype = {
            push: function (e) {
                var t = this._undoList[this._undoList.length - 1];
                if (t && JSON.stringify(t.data) === JSON.stringify(e))
                    return;
                this._undoList.length >= this.length && this._undoList.shift();
                this._undoList.push($.extend(!0, {}, { data: e }));
                this._redoList = [];
            },
            undo: function () {
                if (this._undoList.length <= 0)
                    return null;
                var e = this._undoList.pop();
                return this._redoList.push(e), e.data
            },
            redo: function () {
                if (this._redoList.length <= 0)
                    return null;
                var e = this._redoList.pop();
                return this._undoList.push(e), e.data
            }
        };
        var t = function (t, n) {
            this.kzEditor = t;
            this._cache = new e(n);
        };
        return t.prototype = {
            beforeBlurComponent: function () {
                this.push()
            },
            beforeRemoveComponent: function () {
                this.push()
            },
            beforeCreateComponent: function () {
                this.push()
            },
            push: function () {
                this._cache.push(this.kzEditor.getData())
            },
            undo: function () {
                var e = this._cache.undo();
                e && JSON.stringify(e) != JSON.stringify(this.kzEditor.getData()) ? (this.kzEditor.clearComponents(),
                this.kzEditor.initComponents(this.kzEditor._initComponentFromServerData(e))) : e && this.undo()
            },
            redo: function () {
                var e = this._cache.redo();
                e && JSON.stringify(e) != JSON.stringify(this.kzEditor.getData()) ? (this.kzEditor.clearComponents(), this.kzEditor.initComponents(this.kzEditor._initComponentFromServerData(e))) : e && this.redo()
            },
            canUndo: function () {
                return this._cache._undoList.length <= 0 ? !1 : this._cache._undoList.length == 1 && JSON.stringify(this._cache._undoList[0].data) == JSON.stringify(this.kzEditor.getData()) ? !1 : !0
            },
            canRedo: function () {
                return this._cache._redoList.length > 0
            }
        }, t
    }), define("plugins/hotKeyTool", ["ui", "utils/site"], function (e, t) {
        var n = function (e, t, n) {
            var r = this;
            this.$copyBtn = n && n.$copyBtn, this.$pasteBtn = n && n.$pasteBtn, this.$copyBtn && this.$copyBtn.on("click", function () {
                r.copy()
            }), this.$pasteBtn && this.$pasteBtn.on("click", function () {
                r.paste()
            }), r.canPaste() && this.$pasteBtn && this.$pasteBtn.removeAttr("disable"), this.componentRegistrar = t, this.kzEditor = e, $(document).on("keydown", function (e) {
                if (e.target.tagName != "BODY")
                    return;
                if (e.ctrlKey)
                    switch (e.keyCode) {
                        case 38:
                            r.moveUp();
                            break;
                        case 40:
                            r.moveDown();
                            break;
                        case 67:
                            r.copy();
                            break;
                        case 86:
                            r.paste()
                    }
                else if (e.shiftKey)
                    switch (e.keyCode) {
                        case 38:
                            r.moveUp();
                            break;
                        case 40:
                            r.moveDown()
                    }
            })
        };
        return n.prototype = {
            moveUp: function () {
                var e = this.kzEditor.$getCurEl();
                e && (e.prev()[0] ? e.prev().before(e) : e.parent().closest('[data-role="component"]') && e.parent().closest('[data-role="component"]').before(e), this.kzEditor.kzEditorUI.$scrollContainer.scrollTop(e.position().top - 200))
            }, moveDown: function () {
                var e = this.kzEditor.$getCurEl();
                e && (e.next()[0] ? e.next().after(e) : e.parent().closest('[data-role="component"]') && e.parent().closest('[data-role="component"]').after(e), this.kzEditor.kzEditorUI.$scrollContainer.scrollTop(e.position().top - 200))
            }, copy: function () {
                if (!this.$pasteBtn)
                    return !1;
                var n = this.kzEditor.$getCurEl();
                if (n) {
                    var r = n.data("component"), i = r._meta, s = r.getData(), o = JSON.stringify({ meta: i.ename, data: s, site: t.mapp_id });
                    window.localStorage.kz_clipboard = o, this.$pasteBtn && this.$pasteBtn.removeAttr("disable"), e.insetSuccess({
                        msg: "已复制到剪切板<br/>(Ctrl+V 粘贴组件)", parent: $("#phone-frame .phone_middle"), position: "center", timeout: 1500, callback: function () {
                        }
                    })
                } else
                    e.alert({ msg: "请先选中要复制的组件" })
            }, canPaste: function () {
                var e;
                try {
                    e = JSON.parse(window.localStorage.kz_clipboard)
                } catch (n) {
                }
                return e && e.site == t.mapp_id
            }, paste: function () {
                if (!this.$pasteBtn)
                    return !1;
                var e = this.kzEditor.$getCurEl(), n, r;
                try {
                    n = JSON.parse(window.localStorage.kz_clipboard)
                } catch (i) {
                }
                if (!n)
                    return;
                if (n.site !== t.mapp_id)
                    return;
                e || ($('[data-role="component"]:eq(0)').click(), e = this.kzEditor.$getCurEl()), e ? r = zEditor.insertBeforeComponent(this.componentRegistrar.getMetaByename(n.meta), n.data) : r = zEditor.addComponent(this.componentRegistrar.getMetaByename(n.meta), n.data), r && this.kzEditor.setAsCurrentComponent(r)
            }
        }, n
    }), define("plugins/containerSelector", [], function () {
        var e = function (e) {
            var t = this;
            this.kzEditor = e, this.kzEditor.kzEditorUI.$viewPanel.on("dblclick", function (e) {
                var n = $(e.target).parents("[data-role='sub_component']");
                t.curComponent = [], n.size() > 0 && n.each(function (e, n) {
                    t.curComponent.push($(n).data("sub-container").component)
                }), t.showSelector(e)
            }), $(document).delegate("[data-role='container-layer'] li", "click", function (e) {
                t.curComponent[$(this).data("id")] && t.kzEditor.setAsCurrentComponent($(t.curComponent[$(this).data("id")].viewEl)), $("[data-role='container-layer']").remove(), e.stopPropagation()
            }), $(document).on("click", function (e) {
                $(e.target).closest("[data-role='container-layer']").size() <= 0 && $("[data-role='container-layer']").remove()
            })
        };
        return e.prototype = {
            showSelector: function (e) {
                if (!this.curComponent || this.curComponent.length <= 0)
                    return;
                if (this.curComponent.length == 1)
                    this.kzEditor.setAsCurrentComponent($(this.curComponent[0].viewEl));
                else {
                    var t = "<div class='container-layer' data-role='container-layer' style='position:fixed;top:" + e.pageY + "px;left:" + e.pageX + "px;'><ul>", n = 0;
                    this.curComponent.forEach(function (e) {
                        t += '<li data-id="' + n + '">' + e._meta.title + "</li>", n++
                    }), $("[data-role='container-layer']").size() > 0 ? $("[data-role='container-layer']").replaceWith(t) : $("body").append(t)
                }
            }
        }, e
    }), define("utils/requireFactory", [], function () {
        return function (e, t) {
            return require.config($.extend(!0, { context: e }, t))
        }
    }), define("utils/apiBuilder", ["utils/site"], function (e) {
        return {
            backend_api: function (t, n) {
                return "/pa/" + n + "/" + t + "?mapp_id=" + e.mapp_id
            }, backend_page: function (t, n) {
                return "/pp/" + t + "/" + n + "?mapp_id=" + e.mapp_id
            }, frontend_page: function (t, n) {
                return "/fp/" + t + "/" + n + "?mapp_id=" + e.mapp_id
            }, frontend_api: function (t, n) {
                return "/fa/" + t + "/" + n + "?mapp_id=" + e.mapp_id
            }, api: function (e, t) {
                return this.backend_api(e, t)
            }, entrance: function (t, n) {
                return "/pp/" + t + "/" + n + "?mapp_id=" + e.mapp_id
            }
        }
    }), define("plugins/cssLoading", ["jquery"], function (e) {
        return function (t, n) {
            var r = ["app", "changyan", "ec", "form", "html", "js", "passport", "system_plugin", "traffic-exchange", "weixin"], i = e("#editing_all_css");
            for (var s in t) {
                var o = t[s];
                o.code && r.indexOf(o.code) <= 0 && (e('<link rel="stylesheet" type="text/css" href="' + n + "/files/" + o.code + '/latest_version/components/portal_all.css">').insertAfter(i), e('<link rel="stylesheet" type="text/css" href="' + n + "/files/" + o.code + '/latest_version/components/editing_all.css">').insertAfter(i))
            }
        }
    });
