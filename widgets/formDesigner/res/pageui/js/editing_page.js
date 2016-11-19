!function(require, staticurl, pkgs, element_list) {
    define("page-edit-pops", ["jquery", "lib/bootstrap"], function($) {
        return {modify_success: $("#js-modify-success").modal({show: false,backdrop: false})}
    });

    require(["kzEditor", "registerHelper", "componentRegistrar", "plugins/undoTool", "plugins/hotKeyTool", "plugins/cssLoading", "plugins/containerSelector", "themeManager", "ui", "page-edit-pops", "res/preview/js/phonepreview", "libui/utils"], function(kzEditor, registerHelper, componentRegistrar, UndoTool, hotKeyTool, cssLoading, ContainerSelector, themeManager, ui, pops, utils) {
        "use strict";
        cssLoading(pkgs, LINEWELL.pfileurl);
        var zEditor = new kzEditor({$toolsPanel: $("#js-tools-panel"), $headerPanel: $("#page-header") ,$viewPanel: $("#page-content"),$configuratorPanel: $("#js-config-panel"),static_url: staticurl});
        var undoTool = new UndoTool(zEditor, 20);
        var hotkey = new hotKeyTool(zEditor, componentRegistrar, {$copyBtn: $("a.copy"),$pasteBtn: $("a.paste")}), editorReady = false, init_data, isPageChanged = function() {
            return JSON.stringify(init_data) != JSON.stringify(zEditor.getData())
        };
        var containerSelector = new ContainerSelector(zEditor);
        undoTool.push = function() {
            UndoTool.prototype.push.apply(this);
            setUndoStatus()
        };
        zEditor.addPlugIn(containerSelector);
        zEditor.addPlugIn(undoTool);
        zEditor.addPlugIn(hotkey);
        zEditor.addPlugIn({beforeBlurComponent: function() {
                $(".side-config .mod-config:not(#js-config-panel)").hide()
            }});
        zEditor.addPlugIn({afterInitComponents: function() {
                editorReady = true;
                init_data = zEditor.getData();
                $(window).on("beforeunload", function() {
                    if (isPageChanged())
                        return "确认离开本页？未保存的内容将会丢失"
                })
            }});
        var init = function() {
            var components = zEditor._initComponentFromServerData(element_list);
            zEditor.init(components);
            $(".sidebar .shortcut_category").each(function() {
                if ($(this).children("li").size() % 3 !== 0) {
                    $(this).children("li:last").css("border-right", "solid 1px #ddd")
                }
            })
        };
        registerHelper.onRegisterFinish(function() {
            init()
        });
        var editing_all = LINEWELL.pfileurl + "/files/editing_basic.js";
        registerHelper.registerFromPackage2(pkgs, editing_all);
        require(["res/pageui/js/header-edit"], function(headerEditor) {
            headerEditor.init({wrap: $("#js-config-header"),headerData: LINEWELL.page.header_conf})
        });
        require(["res/pageui/js/page-attr-edit"], function(pageattrEditor) {
            var pageattr_config = $("#js-config-pageattr");
            pageattrEditor.init({wrap: pageattr_config,titleWrap: $("#page-pub-ctr"),pageWrap: $("#page-content").parent(),pageAttr: LINEWELL.page.page_attr})
        });
        require(["res/pageui/js/footer-edit"], function(footerEdit) {
            footerEdit.init({footerData: LINEWELL.page.footer_conf,wrap: "#js-config-footer"})
        });
        require(["res/pageui/js/share-2-weixin"], function(share) {
            $(".js-weixin-share").on("click", function() {
                var t = $(this);
                if (!LINEWELL.page.site_published) {
                    ui.confirm({msg: "站点未发布，是否发布站点？",confirm: function() {
                            window.location = "/site/publish?mapp_id=" + LINEWELL.page.mapp_id
                        }});
                    return false
                }
                if (parseInt(LINEWELL.page.status) == 3 && !isPageChanged()) {
                    share.sharePage({page_id: LINEWELL.page.page_id,opt: {savecallback: function(sharedate, callback) {
                                $.ajax({url: "/pageui/ajax-share-info-save",type: "get",data: {page_id: LINEWELL.page.page_id,share_title: sharedate.share_title,share_desc: sharedate.share_desc,share_pic_id: sharedate.share_pic_id},success: function(data) {
                                        callback(data)
                                    }})
                            }}})
                } else {
                    ui.confirm({msg: "页面未发布，是否发布并分享页面？",confirm: function() {
                            publish(function() {
                                t.trigger("click")
                            }, false)
                        }})
                }
            })
        });
        
        // 应用是否发布
        if(LINEWELL.page.status != "PUBLISHED"){
     	   $(".js-publish").addClass("disabled");
        }
        
        // app发布页面
        var publish = function() {
        	
        	// 页面可发布
           if(!$(this).hasClass("disabled")){
        	   
        	   // 保存并发布页面
        	   save(function() {
                   $.ajax({
                	   url: "/pageui/ajax-page-publish",
                	   data: {page_id: LINEWELL.page.page_id, mAppId: LINEWELL.page.mapp_id},
                	   type: "post",
                	   dataType : "json",
                	   success: function(data) {
                          /* if (isqr !== false)
                               qropen();
                           SOHUZ.page.status = 3;
                           if (callback) {
                               callback.call(this)
                           }*/
                       }
                   	});
        	   });
           }
        };
        
        // 保存页面组件
        var save = function(afterCallback) {
            if (!editorReady)
                return false;
            var vd = zEditor.isValid();
            if (vd !== true) {
            	if(typeof vd == "object"){
            		ui.alert({msg: vd[0].message});
            		return;
            	}
                var message = "页面中有组件配置错误，请更正后再尝试保存";
                ui.alert({msg: message});
                return
            }
            
            // 获取数据
            init_data = zEditor.getData();
            
            var url = "app.action?type=mappPageAction&operType=saveComponents&page_id="+LINEWELL.page.page_id+"&mapp_id="+LINEWELL.page.mapp_id;
            $.ajax({
            	url: url,
            	data: JSON.stringify(init_data),
            	method: "post",
            	dataType : "json",
            	contentType : "application/json; charset=utf-8",
            	success: function(data) {
	                if (data && !data.success) {
	                    ui.alert({msg: data.message});
	                    return
	                }
	                if (afterCallback) {
	                    afterCallback();
	                } else {
	                    var p = pops.modify_success;
	                    p.modal("show");
	                    setTimeout(function() {
	                        p.modal("hide");
	                    }, 3e3)
	                }
	                LINEWELL.page.status = 2;
            }})
        };
        
        // 发布
        var qropen = function() {
            if (LINEWELL.page.site_published) {
                $.ajax({url: "/pageui/ajax-page-share-info",type: "POST",dataType: "json",data: {page_id: LINEWELL.page.page_id},success: function(data) {
                        var json = data.data;
                        var publish_msg = LINEWELL.page.page_publish_time > 0 ? "更新" : "发布";
                        ui.alert({msg: '<div class="preview-qr">                                        <div class="inner" style="margin: 0 30px; text-align: center; width: 260px; height: 200px;">                                            <img style="width: 200px;" src="/common/encode-png?large=true&data=' + encodeURIComponent(json.url) + '" alt="" >                                        </div>                                        <p style="text-align: center; margin-top: 10px;"><span>页面' + publish_msg + "成功，请用手机扫描二维码查看效果</span></p>                                    </div>"});
                        $('#page-pub-ctr [data-role="page-publish-msg"]').html("更新页面");
                        LINEWELL.page.page_publish_time = (new Date).getTime()
                    }})
            } else {
                ui.confirm({msg: '<span style="text-align:center; width: 100%; display: inline-block;">页面发布成功</span></br>站点未发布，该页面仍不可访问。',yes_text: "发布站点",no_text: "暂不发布",confirm: function() {
                        location.href = "/site/publish?mapp_id=" + LINEWELL.page.mapp_id
                    }})
            }
        };
        
        // 预览事件
        $("#page-pub-ctr").on("click", ".js-preview", function() {
            var that = this;
            var confirm = $(".js-preview");
            if (isPageChanged()) {
                ui.confirm({msg: "您修改的数据尚未保存，请先保存后再进行预览！",confirm: function() {
                        save()
                    }})
            } else {
                $(that).trigger("preview.open")
            }
            
        // 保存
        }).on("click", ".js-save", function() {
            save()
            
        // 发布
        }).on("click", ".js-publish", function() {
            publish();
        }).on("click", ".undo:not([disable])", function() {
            undoTool.undo();
            setUndoStatus()
        }).on("click", ".redo:not([disable])", function() {
            undoTool.redo();
            setUndoStatus()
        });
        $(".main").click(function(ev) {
            if (ev.target === this) {
                zEditor.blurAllComponent()
            }
        });
        function setUndoStatus() {
            if (!undoTool.canUndo()) {
                $(".undo").attr("disable", "disable")
            } else {
                $(".undo").removeAttr("disable")
            }
            if (!undoTool.canRedo()) {
                $(".redo").attr("disable", "disable")
            } else {
                $(".redo").removeAttr("disable")
            }
        }
        setUndoStatus();
        //$(".container").height(document.documentElement.clientHeight - 455 + "px");
        $(".phone_middle").height($(".main").height() - 260);
        $(window).resize(function() {
            //$(".container").height(document.documentElement.clientHeight - $("header").height() - 5 + "px");
            $(".phone_middle").height($(".main").height() - $(".phone_top").height() - $(".phone_bottom").height() - 80)
        });
        $('[data-role="shortCut_menu"] li').on("mouseover", function() {
            $(".shortcut_category").hide();
            $('.shortcut_category[data-category="' + $(this).attr("data-role") + '"]').show();
            $('[data-role="shortCut_menu"] li.cur').removeClass("cur");
            $(this).addClass("cur")
        });
        $('[data-role="shortCut_menu"] li:eq(0)').trigger("mouseover");
        window.zEditor = zEditor;
        
        // 页面管理
        require(["res/pageui/js/page-manage"], function(page_manage) {

            page_manage.init($(".page-manage"))
        });
        
        
        $("#btn_change_theme").click(function() {
            themeMng.setTheme($("#theme_options").val())
        });
        $(".theme-edit").click(function() {
            $(".mod-config").css("visibility", "hidden");
            $("#js-config-theme").css("visibility", "visible").show()
        });
        require(["res/pageui/js/editor-footer-ad"], function(foot_ad) {
            foot_ad.init()
        })
    })
}(require, LINEWELL.staticurl, LINEWELL.page.pkg_list, LINEWELL.page.element_list[0]);
