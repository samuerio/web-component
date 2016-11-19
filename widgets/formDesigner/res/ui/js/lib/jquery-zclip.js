(function($) {
    $.fn.zclip = function(params) {
        if (typeof params == "object" && !params.length) {
            var settings = $.extend({path: "ZeroClipboard.swf",copy: null,beforeCopy: null,afterCopy: null,clickAfter: true,setHandCursor: true,setCSSEffects: true}, params);
            return this.each(function() {
                var o = $(this);
                if (o.is(":visible") && (typeof settings.copy == "string" || $.isFunction(settings.copy))) {
                    ZeroClipboard.setMoviePath(settings.path);
                    var clip = new ZeroClipboard.Client;
                    if ($.isFunction(settings.copy)) {
                        o.bind("zClip_copy", settings.copy)
                    }
                    if ($.isFunction(settings.beforeCopy)) {
                        o.bind("zClip_beforeCopy", settings.beforeCopy)
                    }
                    if ($.isFunction(settings.afterCopy)) {
                        o.bind("zClip_afterCopy", settings.afterCopy)
                    }
                    clip.setHandCursor(settings.setHandCursor);
                    clip.setCSSEffects(settings.setCSSEffects);
                    clip.addEventListener("mouseOver", function(client) {
                        o.trigger("mouseenter")
                    });
                    clip.addEventListener("mouseOut", function(client) {
                        o.trigger("mouseleave")
                    });
                    clip.addEventListener("mouseDown", function(client) {
                        o.trigger("mousedown");
                        if (!$.isFunction(settings.copy)) {
                            clip.setText(settings.copy)
                        } else {
                            clip.setText(o.triggerHandler("zClip_copy"))
                        }
                        if ($.isFunction(settings.beforeCopy)) {
                            o.trigger("zClip_beforeCopy")
                        }
                    });
                    clip.addEventListener("complete", function(client, text) {
                        if ($.isFunction(settings.afterCopy)) {
                            o.trigger("zClip_afterCopy")
                        } else {
                            if (text.length > 500) {
                                text = text.substr(0, 500) + "...\n\n(" + (text.length - 500) + " characters not shown)"
                            }
                            o.removeClass("hover");
                            alert("Copied text to clipboard:\n\n " + text)
                        }
                        if (settings.clickAfter) {
                            o.trigger("click")
                        }
                    });
                    clip.glue(o[0], o.parent()[0]);
                    $(window).bind("load resize", function() {
                        clip.reposition()
                    })
                }
            })
        } else if (typeof params == "string") {
            return this.each(function() {
                var o = $(this);
                params = params.toLowerCase();
                var zclipId = o.data("zclipId");
                var clipElm = $("#" + zclipId + ".zclip");
                if (params == "remove") {
                    clipElm.remove();
                    o.removeClass("active hover")
                } else if (params == "hide") {
                    clipElm.hide();
                    o.removeClass("active hover")
                } else if (params == "show") {
                    clipElm.show()
                }
            })
        }
    }
})(jQuery);
var ZeroClipboard = {version: "1.0.7",clients: {},moviePath: "ZeroClipboard.swf",nextId: 1,$: function(thingy) {
        if (typeof thingy == "string")
            thingy = document.getElementById(thingy);
        if (!thingy.addClass) {
            thingy.hide = function() {
                this.style.display = "none"
            };
            thingy.show = function() {
                this.style.display = ""
            };
            thingy.addClass = function(name) {
                this.removeClass(name);
                this.className += " " + name
            };
            thingy.removeClass = function(name) {
                var classes = this.className.split(/\s+/);
                var idx = -1;
                for (var k = 0; k < classes.length; k++) {
                    if (classes[k] == name) {
                        idx = k;
                        k = classes.length
                    }
                }
                if (idx > -1) {
                    classes.splice(idx, 1);
                    this.className = classes.join(" ")
                }
                return this
            };
            thingy.hasClass = function(name) {
                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"))
            }
        }
        return thingy
    },setMoviePath: function(path) {
        this.moviePath = path
    },dispatch: function(id, eventName, args) {
        var client = this.clients[id];
        if (client) {
            client.receiveEvent(eventName, args)
        }
    },register: function(id, client) {
        this.clients[id] = client
    },getDOMObjectPosition: function(obj, stopObj) {
        var info = {left: 0,top: 0,width: obj.width ? obj.width : obj.offsetWidth,height: obj.height ? obj.height : obj.offsetHeight};
        if (obj && obj != stopObj) {
            info.left += obj.offsetLeft;
            info.top += obj.offsetTop
        }
        return info
    },Client: function(elem) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = "ZeroClipboardMovie_" + this.id;
        ZeroClipboard.register(this.id, this);
        if (elem)
            this.glue(elem)
    }};
ZeroClipboard.Client.prototype = {id: 0,ready: false,movie: null,clipText: "",handCursorEnabled: true,cssEffects: true,handlers: null,glue: function(elem, appendElem, stylesToAdd) {
        this.domElement = ZeroClipboard.$(elem);
        var zIndex = 99;
        if (this.domElement.style.zIndex) {
            zIndex = parseInt(this.domElement.style.zIndex, 10) + 1
        }
        if (typeof appendElem == "string") {
            appendElem = ZeroClipboard.$(appendElem)
        } else if (typeof appendElem == "undefined") {
            appendElem = document.getElementsByTagName("body")[0]
        }
        var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);
        this.div = document.createElement("div");
        this.div.className = "zclip";
        this.div.id = "zclip-" + this.movieId;
        $(this.domElement).data("zclipId", "zclip-" + this.movieId);
        var style = this.div.style;
        style.position = "absolute";
        style.left = "" + box.left + "px";
        style.top = "" + box.top + "px";
        style.width = "" + box.width + "px";
        style.height = "" + box.height + "px";
        style.zIndex = zIndex;
        if (typeof stylesToAdd == "object") {
            for (addedStyle in stylesToAdd) {
                style[addedStyle] = stylesToAdd[addedStyle]
            }
        }
        appendElem.appendChild(this.div);
        this.div.innerHTML = this.getHTML(box.width, box.height)
    },getHTML: function(width, height) {
        var html = "";
        var flashvars = "id=" + this.id + "&width=" + width + "&height=" + height;
        if (navigator.userAgent.match(/MSIE/)) {
            var protocol = location.href.match(/^https/i) ? "https://" : "http://";
            html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>'
        } else {
            html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />'
        }
        return html
    },hide: function() {
        if (this.div) {
            this.div.style.left = "-2000px"
        }
    },show: function() {
        this.reposition()
    },destroy: function() {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = "";
            var body = document.getElementsByTagName("body")[0];
            try {
                body.removeChild(this.div)
            } catch (e) {
            }
            this.domElement = null;
            this.div = null
        }
    },reposition: function(elem) {
        if (elem) {
            this.domElement = ZeroClipboard.$(elem);
            if (!this.domElement)
                this.hide()
        }
        if (this.domElement && this.div) {
            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var style = this.div.style;
            style.left = "" + box.left + "px";
            style.top = "" + box.top + "px"
        }
    },setText: function(newText) {
        this.clipText = newText;
        if (this.ready) {
            this.movie.setText(newText)
        }
    },addEventListener: function(eventName, func) {
        eventName = eventName.toString().toLowerCase().replace(/^on/, "");
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(func)
    },setHandCursor: function(enabled) {
        this.handCursorEnabled = enabled;
        if (this.ready) {
            this.movie.setHandCursor(enabled)
        }
    },setCSSEffects: function(enabled) {
        this.cssEffects = !!enabled
    },receiveEvent: function(eventName, args) {
        eventName = eventName.toString().toLowerCase().replace(/^on/, "");
        switch (eventName) {
            case "load":
                this.movie = document.getElementById(this.movieId);
                if (!this.movie) {
                    var self = this;
                    setTimeout(function() {
                        self.receiveEvent("load", null)
                    }, 1);
                    return
                }
                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                    var self = this;
                    setTimeout(function() {
                        self.receiveEvent("load", null)
                    }, 100);
                    this.ready = true;
                    return
                }
                this.ready = true;
                try {
                    this.movie.setText(this.clipText)
                } catch (e) {
                }
                try {
                    this.movie.setHandCursor(this.handCursorEnabled)
                } catch (e) {
                }
                break;
            case "mouseover":
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass("hover");
                    if (this.recoverActive) {
                        this.domElement.addClass("active")
                    }
                }
                break;
            case "mouseout":
                if (this.domElement && this.cssEffects) {
                    this.recoverActive = false;
                    if (this.domElement.hasClass("active")) {
                        this.domElement.removeClass("active");
                        this.recoverActive = true
                    }
                    this.domElement.removeClass("hover")
                }
                break;
            case "mousedown":
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass("active")
                }
                break;
            case "mouseup":
                if (this.domElement && this.cssEffects) {
                    this.domElement.removeClass("active");
                    this.recoverActive = false
                }
                break
        }
        if (this.handlers[eventName]) {
            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
                var func = this.handlers[eventName][idx];
                if (typeof func == "function") {
                    func(this, args)
                } else if (typeof func == "object" && func.length == 2) {
                    func[0][func[1]](this, args)
                } else if (typeof func == "string") {
                    window[func](this, args)
                }
            }
        }
    }};
