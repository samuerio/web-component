define(["jquery", "cookie", "ui", "libui/ds", "lib/mustache", "libui/utils", "notify", "jquery-ui", "lib/bootstrap"], function($, cookie, ui, ds, Mustache, utils, notify) {
    var page_manage = {init: function(wrap) {
            var m = this;
            m.wrap = wrap;
            if(m.wrap.find(".selected").hasClass("NAV")){
            	  $(".tools").removeClass("cur");
            	  $(".page-manage").addClass("cur");          	
            }else{
            	openApproveManage();
            }
            
            /**
             * 打开审批页面页签
             */
            function openApproveManage(){
            	$(".tools").removeClass("cur");
           	    $(".approve-manage").addClass("cur");
                m.adjustComponentHeight();   
            }
            
            /**
             *  关闭审批页面页签
             */
            function closeApproveMange(){
            	$(".tools").removeClass("cur");
           	    $(".page-manage").addClass("cur");
  	             m.adjustComponentHeight();
            }
           
            var cur_page_item = m.wrap.find(".page-content .selected"), page_content = m.wrap.find(".page-content");
            if (cur_page_item[0] != undefined) {
                var index = cur_page_item.index(), scroll_height = window.localStorage.getItem("scroll_height");
                if (scroll_height) {
                    page_content.scrollTop(scroll_height);
                } else {
                    page_content.scrollTop(page_content.scrollTop() + 40 * index);
                }
            }
            m.wrap.find(".page-body .page").remove();
            if (parseInt(LINEWELL.page.page_info.totalpage) > 1) {
                var foot_html = ui.paging.create({total: parseInt(LINEWELL.page.page_info.totalnum),page: parseInt(LINEWELL.page.page_info.curpage),perpage: LINEWELL.page.page_info.perpage});
                m.wrap.find(".page-body").append(foot_html);
            }
            
            // 分页加载
            ui.paging.init(wrap, {fetch: function(page) {
        		var url = utils.getAppAction("mappPageAction", "getCurrentPageList");
                $.ajax(
                		url, 
                		{
                			type: "POST",
                			data: {mapp_id: LINEWELL.page.mapp_id,page: page,perpage: LINEWELL.page.page_info.perpage},
                			dataType: "json",
                			success: function(data) {
                				var page_item_tpl = wrap.find("#page-item-tpl"), html = "";
                				var ret = data.content;
                				for (var i = 0; i < ret.length; i++) {
                					var page_item = "";
                					ret[i].name = utils.escapeHtml(ret[i].name);
                					if (ret[i].id == LINEWELL.page.page_id) {
                						page_item = Mustache.to_html(page_item_tpl.html(), {cur_page: "cur-page-item",page_id: ret[i].id,page_title: ret[i].name, deletableStyle : ret[i].deletable && "deletable" || ""});
                					} else {
                						page_item = Mustache.to_html(page_item_tpl.html(), {cur_page: "",page_id: ret[i].id,page_title: ret[i].name, deletableStyle : ret[i].deletable && "deletable" || ""});
                					}
                					html += page_item;
                				}
                				m.wrap.find(".page-content").html(html);
                				m.wrap.find(".page-body .page").remove();
                				if (parseInt(LINEWELL.page.page_info.totalpage) > 1) {
                					var foot_html = ui.paging.create({total: parseInt(LINEWELL.page.page_info.totalnum),page: parseInt(page),perpage: LINEWELL.page.page_info.perpage});
                					m.wrap.find(".page-body").append(foot_html);
                					var flag = true;
                					$(".js-put-paging a").each(function(){
                						if($(this).hasClass("cur")){
                							flag = false;
                							return;
                						}
                					})
                					if(flag){
                						$("a[data-page=4]").addClass("cur");
                					}
                				}
                			}
                		}
                	);
            	}});
            	m.adjustComponentHeight();
            	$(window).resize(function() {
                m.adjustComponentHeight();
            });
            
            var page_new = m.wrap.find(".page-new"), page_body = m.wrap.find(".page-body");
            $(".add-page").click(function(){
            	$(".tools").removeClass("cur");
            	$(".page-manage").addClass("cur");
            	m.adjustComponentHeight();
            });
            
            // 页面管理切换
            $('.tools .toggle-config, .tools span').click(function(){
            	$(this).parent().parent().toggleClass('cur').siblings('.tools').toggleClass('cur');
            	 page_new.hide(); 
            	m.adjustComponentHeight();
            });          
            
            // 页面编辑事件  
            $(".approve-manage").on("click", ".page-item", function() {
                var t = $(this);
                m.clickItem(t);             
            });         
            
            // 开启页面管理
            m.wrap.on("click", ".js-open-config", function() {
                var t = $(this);
                $(this).hide();
                m.wrap.find(".page-head").addClass("page-bottom-border");
                m.wrap.find(".js-close-config").show();
                m.wrap.find(".page-body").show();
                $(".approve-manage").find(".page-body").hide();
                $(".approve-manage").find(".js-close-config").hide();
                $(".approve-manage").find(".js-open-config").show();
                m.adjustComponentHeight();
            
            
            }).on("click", ".js-close-config", function() {
                $(this).hide();
                m.wrap.find(".page-head").removeClass("page-bottom-border");
                m.wrap.find(".js-open-config").show();
               
                m.wrap.find(".page-body").hide();
                $(".approve-manage").find(".page-body").show();
                $(".approve-manage").find(".js-close-config").show();
                $(".approve-manage").find(".js-open-config").hide();
                m.adjustComponentHeight();
                
            // 增加页面事件
            }).on("click", ".js-add-page", function() {
                
                if (page_body.is(":hidden")) {
                    page_new.show();
                    page_body.show();
                    m.wrap.find(".js-close-config").show();
                    m.wrap.find(".js-open-config").hide();
                    m.wrap.find(".page-body").show();
                    m.wrap.find(".page-new input[name=page_title]").focus();
                } else {
                    if (page_new.is(":hidden")) {
                        m.wrap.find(".page-new").show();
                        var page_edit = m.wrap.find(".page-edit");
                        if (page_edit[0] != undefined) {
                            page_edit.next().show();
                            page_edit.remove();
                        }
                        m.wrap.find(".page-new input[name=page_title]").focus();
                    } else {
                        m.wrap.find(".page-new").hide();
                    }
                }
                m.adjustComponentHeight();
                
            // 取消添加页面事件
            }).on("click", ".js-new-cancel", function() {
                var page_new = m.wrap.find(".page-new");
                m.wrap.find(".page-new").hide();
                m.adjustComponentHeight();
            
            // 确定添加页面事件
            }).on("click", ".page-new .js-new-confirm", function() {
                m.addItem(m.wrap);
                
            // 点击页面跳转事件
            }).on("click", ".page-item", function() {
                var t = $(this);
                m.clickItem(t);
                
            // 页面编辑事件    
            }).on("click", ".page-item .js-edit-page", function(e) {
                e.stopPropagation();
                var t = $(this);
                
                m.editItem(m.wrap, t.parent());
                
            // 取消编辑
            }).on("click", ".page-edit .js-edit-cancel", function() {
                var t = $(this);
                t.parent().next().show();
                t.parent().remove();
                
            // 确定修改
            }).on("click", ".page-edit .js-edit-confirm", function() {
                var t = $(this);
                m.saveItem(t.parent());
                
            // 删除页面
            }).on("click", ".page-item .js-del-page", function(e) {
                e.stopPropagation();
                var t = $(this);
                m.delItem(t.parent());
            });
        },adjustPageHeight: function() {
            var page_content = $(".page-manage .page-content"), page_content_height = page_content.children().length * 41 + 2;
            page_content.height(page_content_height);
        },adjustComponentHeight: function() {
        	//$(".component-cate .component-content").height($(".sidebar").height() - $(".page-manage").height() - $(".component-head").height() - 5)
        	$(".component-cate .component-content").height($(".container").height()-375);
            
        // 增加页面
        },addItem: function(wrap) {
            var page_new = wrap.find(".page-new");
            var url = utils.getAppAction("mappPageAction", "createNormal");
            
            // 文本框值
            var title = page_new.find("input").val();
            title = $.trim(title);
            if (title == "") {
                ui.alert({msg: "请输入页面名称"});
            } else if(!utils.inputValidate(title)){
            	ui.alert({msg: "页面名称，长度为1-20个字"});
            }else{
            	utils.send(url, {mapp_id: LINEWELL.page.mapp_id,title: title}, function(data){
            		if (data.success) {
            				window.location.href = "page.jsp?page_id=" + data.content + "&mapp_id=" + LINEWELL.page.mapp_id;		
    				} else {
    					ui.alert({msg: data.message});
    				}
            	},true);
            }
        
        // 页面跳转
        },clickItem: function(t) {
        	
        	// 如果是当前页 只显示页面设置
        	if (t.is(".selected")) {
        		if (LINEWELL.page.editable) { // 可编辑的页面显示页面属性
            		$(".mod-config:not(#js-config-pageattr)").css({visibility: "hidden", display:"none"});
            		$("#js-config-pageattr").css({visibility: "visible", display: "block"});
        		}
        		return;
        	}

        	
        	// 获取页面id
            var page_id = t.data("page-id");
            
            // 页面类型
            var pageType = t.parent().data("page-type");
            
            // 缓存高度
            window.localStorage.setItem("scroll_height", $(".page-manage .page-content").scrollTop());
            
            // 跳转页面
            window.location.href = "page.jsp?page_id=" + page_id+"&mapp_id="+LINEWELL.page.mapp_id;
            
            cookie.set("page-type", pageType);
            cookie.set("page-id", page_id);
            
        // 页面编辑
        },editItem: function(wrap, t) {
            var page_edit_tpl = wrap.find("#page-edit-tpl"), page_id = t.data("page-id"), page_title = t.find("span").text(), html = Mustache.to_html(page_edit_tpl.html(), {page_id: page_id,page_title: page_title});
            var page_edit = wrap.find(".page-edit");
            if (page_edit[0] != undefined) {
                page_edit.next().show();
                page_edit.remove();
            }
            var page_new = wrap.find(".page-new");
            if (!page_new.is(":hidden")) {
                page_new.hide();
            }
            
            // 追加元素
            t.before(html);
            
            // 隐藏原有标题
            t.hide();
            
        // 保存修改
        },saveItem: function(t) {
            var page_id = t.data("page-id"), page_title = t.find("input").val();
            page_title = $.trim(page_title);
            var url = utils.getAppAction("mappPageAction", "update");
            if (page_title == "") {
                ui.alert({msg: "请输入页面名称"});
            } else if(!utils.inputValidate(page_title)){
            	ui.alert({msg: "页面名称，长度为1-20个字"});
            }else{
            	utils.send(url, {page_id: page_id,title: page_title, mapp_id: LINEWELL.page.mapp_id}, function(data){
            		if (data.success) {
    					t.next().find("span").text(page_title);
    					t.next().show();
    					t.remove();
    					
    					page_id == LINEWELL.page.page_id && $(".js-set-pageattr input[name=name]").val(page_title);
    				} else {
    					ui.alert({msg: data.message});
    				}
            	},true);
            }
            
        // 删除页面
        },delItem: function(t) {
        	$(".mask").removeClass("hide");
        	notify.confirm("确认删除该页面吗？", function(){
        		var page_id = t.data("page-id");
                var url = utils.getAppAction("mappPageAction", "delete");
                utils.send(url, {page_id: page_id, mapp_id: LINEWELL.page.mapp_id}, function(data){
                	if (data.success) {
                        t.remove();
            			window.location.href = "page.jsp?page_id=" + LINEWELL.page.index_page_id + "&mapp_id=" + LINEWELL.page.mapp_id;
                        
                    } else {
                        ui.alert({msg: data.message});
                    }
                },true);
        	})
        }};
    return page_manage;
});
