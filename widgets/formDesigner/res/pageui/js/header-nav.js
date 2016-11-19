define(["jquery", "ui"], function($, ui) {
    var modal_mask = $('<div class="modal-backdrop"></div>');
    var tmp = '<div class="pop-nav">                     <div class="pop-nav-header">添加模块至导航<a class="pop-nav-close" href="javascript:void(0);"></a></div>                    <ul class="clearfix">                        <li class="weizhan" data-modules="site">                            <div class="img"></div>                            <p class="title">站点</p>                            <p class="desc">通过组件拖拽生成手机官网，所见即所得</p>                            {{#site.opened}}<a class="button normal btn-disable">不可移除</a>{{/site.opened}}                            {{^site.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/site.opened}}                        </li>                        <li class="haibao" data-modules="page">                            <div class="img"></div>                            <p class="title">海报</p>                            <p class="desc">制作H5翻页海报，支持数十种酷炫效果</p>                            {{#page.opened}}<a class="button normal js-btn-remove">移除</a>{{/page.opened}}                            {{^page.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/page.opened}}                        </li>                        <li class="wxpublic" data-modules="weixin">                            <div class="img"></div>                            <p class="title">公众号</p>                            <p class="desc">为微信订阅号、服务号提供多种运营服务</p>                            {{#weixin.opened}}<a class="button normal js-btn-remove">移除</a>{{/weixin.opened}}                            {{^weixin.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/weixin.opened}}                        </li>                        <li class="article" data-modules="post">                            <div class="img"></div>                            <p class="title">文章</p>                            <p class="desc">移动CMS，可设置多个栏目、管理网页文章</p>                            {{#post.opened}}<a class="button normal js-btn-remove">移除</a>{{/post.opened}}                            {{^post.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/post.opened}}                        </li>                        <li class="dianshan" data-modules="ec">                            <div class="img"></div>                            <p class="title">电商</p>                            <p class="desc">快速开店，发布商品、订单管理与支付收款</p>                            {{#ec.opened}}<a class="button normal js-btn-remove">移除</a>{{/ec.opened}}                            {{^ec.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/ec.opened}}                        </li>                        <li class="club" data-modules="forum">                            <div class="img"></div>                            <p class="title">社区</p>                            <p class="desc">用户互动论坛，支持线上活动、私信等</p>                            {{#forum.opened}}<a class="button normal js-btn-remove">移除</a>{{/forum.opened}}                            {{^forum.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/forum.opened}}                        </li>                        <li class="app" data-modules="app">                            <div class="img"></div>                            <p class="title">APP</p>                            <p class="desc">生成Android和iOS APP，支持消息推送</p>                            {{#app.opened}}<a class="button normal js-btn-remove">移除</a>{{/app.opened}}                            {{^app.opened}}<a class="button confirm normal js-btn-add">添加</a>{{/app.opened}}                        </li>                    </ul>                </div>';
    var nav_tmp = '{{#items}}{{#opened}}<li class="{{name}}{{#cur}} cur{{/cur}}">                        <a href="{{link}}">{{title}}</a>                    </li>{{/opened}}{{/items}}';
    var nav = {nav_modules: null,cur: null,init: function() {
            var that = this;
            var w;
            var hashopen = false;
            $.ajax({url: "/api-bridge/site/ajax-list-module?mapp_id=" + LINEWELL.page.mapp_id,type: "get",dataType: "json",success: function(data) {
                    that.nav_modules = data.data.list;
                    for (var i in that.nav_modules) {
                        that.nav_modules[i].link = that.nav_modules[i].link.replace("{{mapp_id}}", LINEWELL.page.mapp_id)
                    }
                    if ($(".global-header .modules .cur")[0]) {
                        that.cur = $(".global-header .modules .cur").attr("class").slice(0, -4)
                    }
                    w = $(ui.render(tmp, that.nav_modules));
                    w.on("click", ".js-btn-add", function(data) {
                        var self = this;
                        var m = $(self).closest("li");
                        var modules = m.data("modules");
                        that.add_item(modules, function(data) {
                            that.update_nav();
                            $(self).remove();
                            m.append($('<a class="button normal js-btn-remove">移除</a>'))
                        })
                    }).on("click", ".js-btn-remove", function() {
                        var self = this;
                        var m = $(self).closest("li");
                        var modules = m.data("modules");
                        that.del_item(modules, function(data) {
                            $(self).remove();
                            m.append($('<a class="button confirm normal js-btn-add">添加</a>'));
                            $(".global-header").find(".modules").find("." + modules).remove()
                        })
                    }).on("click", ".pop-nav-close", function() {
                        w.hide();
                        modal_mask.hide();
                        window.location.hash = ""
                    });
                    $("body").on("click", ".modal-backdrop", function() {
                        w.hide();
                        modal_mask.hide();
                        window.location.hash = ""
                    });
                    if (hashopen) {
                        $("body").append(w);
                        $("body").append(modal_mask)
                    }
                }});
            $(document).on("click", ".js-header-nav-add", function() {
                openPop()
            });
            if (/^#module-setting$/.test(window.location.hash)) {
                hashopen = true
            }
            function openPop() {
                if (!$(".pop-nav")[0]) {
                    $("body").append(w)
                } else {
                    $(".pop-nav").show()
                }
                if (!$(".modal-backdrop")[0]) {
                    $("body").append(modal_mask).show()
                } else {
                    modal_mask.show()
                }
            }
        },update_nav: function() {
            var array = $.map(this.nav_modules, function(value, index) {
                return [value]
            });
            $(".global-header .modules ul").html($(ui.render(nav_tmp, {items: array})));
            $(".global-header .modules").find("." + this.cur).addClass("cur")
        },add_item: function(modules, callback) {
            var that = this;
            $.ajax({url: "/api-bridge/site/ajax-open-module",type: "get",dataType: "json",data: {mapp_id: LINEWELL.page.mapp_id,module_name: modules},success: function(data) {
                    that.nav_modules[modules].opened = true;
                    callback(data)
                }})
        },del_item: function(modules, callback) {
            var that = this;
            $.ajax({url: "/api-bridge/site/ajax-close-module",type: "get",dataType: "json",data: {mapp_id: LINEWELL.page.mapp_id,module_name: modules},success: function(data) {
                    that.nav_modules[modules].opened = false;
                    callback(data)
                }})
        }};
    return nav
});
