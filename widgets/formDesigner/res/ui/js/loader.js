define([], function($, ui) {
    function _get(id) {
        return document.getElementById(id);
    }
    var loader = {_load: function(elt, onSuccess, onError) {
            try {
                document.getElementsByTagName("head")[0].appendChild(elt);
                if (elt.addEventListener) {
                    elt.addEventListener("load", onSuccess, false);
                } else if (elt.attachEvent) {
                    elt.attachEvent("onreadystatechange", function() {
                        if (elt.readyState == 4 || elt.readyState == "complete" || elt.readyState == "loaded") {
                            onSuccess.call();
                        }
                    });
                }
            } catch (e) {
                onError.call(e);
            }
        },loadCSS: function(opt) {
            if (opt.id && _get(opt.id)) {
                return
            }
            var css = document.createElement("link");
            css.id = opt.id;
            css.href = opt.url;
            css.rel = "stylesheet";
            css.type = "text/css";
            this._load(css, opt.success, opt.error);
        },loadJS: function(opt) {
            if (opt.id && _get(opt.id)) {
                opt.success.call();
            }
            var script = document.createElement("script");
            script.src = opt.url;
            script.type = "text/javascript";
            this._load(script, opt.success, opt.error);
        }};
    return loader;
});
