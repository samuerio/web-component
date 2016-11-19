!function(require, staticurl, pfileurl) {
    var init = function() {
        require.config({baseUrl: staticurl,urlArgs: "t=" + (new Date).getTime().toString().substring(0, 6),paths: {componentsPath: pfileurl + "/files",zepto: "res/skin/js/require.zepto.min",swipe: "res/skin/js/swipe","lib/mustache": "res/skin/js/lib/mustache.min","utils/site": "res/pageui/js/kzEditor/utils/site",wxsdk: "http://res.wx.qq.com/open/js/jweixin-1.0.0"}});
        var portal_all = pfileurl + "/files/portal_basic.js";
        var main = function() {
            $("[data-component]").each(function() {
                var that = this;
                var _meta = $(this).data("component");
                if (!_meta.ename) {
                    if (_meta.name == "traffic_exchange") {
                        _meta.ename = "traffic_exchange/" + _meta.name
                    } else if (_meta.name == "form") {
                        _meta.ename = "form/" + _meta.name
                    } else {
                        _meta.ename = "system_plugin/" + _meta.name
                    }
                }
                var split = _meta.ename.split("/");
                var plugin_code = split[0];
                var comp_name = split[1];
                var version = "latest_version";
                var comp = "componentsPath/" + plugin_code + "/" + version + "/components/" + comp_name + "/portal";
                require([comp], function(portal) {
                    "use strict";
                    if (portal) {
                        portal.onAfterRender && portal.onAfterRender(that, window, document)
                    }
                })
            })
        };
        require(["res/post/js/mobile-wx-share", portal_all], function(wx_share) {
            main();
            var is_weixin = /micromessenger/gi.test(window.navigator.userAgent), s = LINEWELL.share;
            s.url = window.location.href;
            if (window.pageData) {
                var d = window.pageData;
                s.pic = d.screen;
                s.desc = d.desc;
                s.title = d.title
            }
            if (is_weixin) {
                wx_share.init(s)
            }
        }, function() {
            main()
        })
    };
    if (require) {
        init()
    } else {
        console.log("未知原因造成require未加载，重新加载");
        delete window.require;
        delete window.requirejs;
        delete window.define;
        $.getScript = function(url, success, error) {
            var script = document.createElement("script"), $script = $(script);
            script.src = url;
            $("head").append(script);
            $script.bind("load", success);
            $script.bind("error", error)
        };
        $.getScript(staticurl + "/res/skin/js/lib/require.js?v=" + (new Date).getTime(), function() {
            init()
        })
    }
}(require, LINEWELL.CONF.url_res, LINEWELL.CONF.url_pfile ? LINEWELL.CONF.url_pfile : "http://127.0.0.1:8080/appmodel");
