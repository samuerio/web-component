(function(g) {
    if (!g.LINEWELL) {
        g.LINEWELL = {}
    }
    g.LINEWELL.CONF = {url_api: "http://127.0.0.1:8080/appmodel",url_res: "http://127.0.0.1:8080/appmodel",url_pfile: "http://127.0.0.1:8080/appmodel"}
})(window);
(function($, g) {
    if (!g.LINEWELL)
        g.LINEWELL = {};
    var Z = g.LINEWELL, n = {}, windowWidth = null;
    Z.isTouch = function() {
        return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
    };
    Z.isPreviewMode = function() {
        return Z.page["mode"] && Z.page["mode"] === "preview"
    };
    n.winWidth = function() {
        if (!windowWidth && document.body) {
            windowWidth = document.body.offsetWidth
        }
        return windowWidth
    };
    g.winWidth = n.winWidth;
    n.imgResize = function($img, w, radioFree) {
        var picw = 0, pich = 0;
        if (!radioFree) {
            if (w < 240) {
                picw = 240;
                pich = 180
            } else if (w < 640) {
                picw = 640;
                pich = 480
            } else {
                picw = 1e3;
                pich = 750
            }
        } else {
            if (w < 640) {
                picw = 640;
                pich = 0
            } else {
                picw = 1e3;
                pich = 0
            }
        }
        var src = $img.attr("src"), p_url = /\/[0-9a-zA-Z]{32}-[0-9]+-[0-9]+$/, n_url = /\d+x\d+$/, newSrc = src;
        if (p_url.test(src)) {
            newSrc = src.replace(/-[0-9]+-[0-9]+/, "-" + picw + "-" + pich)
        } else if (n_url.test(src)) {
            newSrc = src.replace(n_url, picw + "x" + pich)
        }
        $img.attr("src", newSrc);
        $img.css("width", w + "px")
    };
    g.maxImg = function($img, radioFree) {
        n.imgResize($img, n.winWidth(), radioFree)
    }
})(Zepto, this);
(function($, g) {
    var Z = g.LINEWELL, doc = g.document, ui = Z.ui ? Z.ui : {};
    var loader_tpl = '<div class="mod-loader">                            <span class="icon-loading"></span>                            <h1>加载中...</h1>                        </div>', picview_tpl = '<div class="picview" style="z-index:13;">                            <div style="position: relative;">                            <div class="close-div">                                <p class="close font-ico" style="font-size:30px;line-height:60px;margin-right:10px;color:white;display: block;position: absolute;right: 0;text-align: center;">&#xe010;</p>                            </div>                            <div class="picwrap" style="text-align: center;"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="float:left;"></div>                            <div class="desc" style="color: white;line-height: 16px;overflow:hidden;word-wrap: break-word;"></div>                            </div>                        </div>', toast_tpl = '<div class="mui-toast"><div class="inner"></div></div>', endEvent = function(event) {
        event.preventDefault()
    };
    ui.loader = {show: function(msg) {
            var m = this;
            if (!m.wrap) {
                m.wrap = $(loader_tpl);
                $(doc.body).append(m.wrap)
            }
            if (msg) {
                m.wrap.find("h1").html(msg)
            }
            m.wrap.show()
        },hide: function() {
            this.wrap.hide()
        }};
    ui.toast = {show: function(opt) {
            var m = this;
            if (!m.wrap) {
                m.wrap = $(toast_tpl);
                $(doc.body).append(m.wrap)
            }
            if (typeof opt === "string") {
                opt = {msg: opt}
            }
            if (opt.msg) {
                m.wrap.find(".inner").html(opt.msg)
            }
            m.wrap.addClass("show")
        },hide: function(delay) {
            var m = this;
            if (!delay) {
                delay = 0
            }
            setTimeout(function() {
                m.wrap.removeClass("show")
            }, delay)
        }};
    ui.PicView = function(opt) {
        var m = this, wrap = $(picview_tpl).hide(), pg = opt.pg;
        $(doc.body).append(wrap);
        pg.find("li").not(".st-link").find("img").tap(function() {
            m.show($(this));
            doc.body.addEventListener("touchmove", endEvent, false)
        });
        m.wrap = wrap;
        m.pg = pg
    };
    ui.PicView.prototype = {show: function(img) {
            var m = this, src = img.attr("src"), desc = img.next("p").html(), wrap = m.wrap;
            var close_div = m.wrap.find(".close-div"), pic_wrap = m.wrap.find(".picwrap"), img = pic_wrap.find("img"), desc_div = m.wrap.find(".desc");
            if (!desc) {
                desc = ""
            }
            wrap.find(".close").on("touchstart click", function(e) {
                e.stopPropagation();
                if (e.type == "touchstart") {
                } else if (e.type == "click") {
                    m.hide()
                }
            });
            m.wrap.find(".picwrap img").attr("src", src);
            window.maxImg(m.wrap.find(".picwrap img"));
            desc = desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
            m.wrap.find(".desc").html(desc);
            close_div.css("height", "60px").css("width", $(window).width());
            desc_div.css("width", $(window).width() - 20).css("padding", "10px");
            m.wrap.show();
            var pic_wrap_height = $(window).height() - 60 - desc_div.height();
            pic_wrap.css("height", pic_wrap_height);
            var imgHeight = window.winWidth() * .75;
            img.css("margin-top", Math.floor((pic_wrap_height - imgHeight) / 2) + "px")
        },hide: function() {
            this.wrap.find(".close").off("touchstart click");
            doc.body.removeEventListener("touchmove", endEvent, false);
            this.wrap.hide()
        }};
    Z.ui = ui
})(Zepto, this);
function SwipeV1(container, options) {
    "use strict";
    var noop = function() {
    };
    var offloadFn = function(fn) {
        setTimeout(fn || noop, 0)
    };
    var browser = {addEventListener: !!window.addEventListener,touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,transitions: function(temp) {
            var props = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"];
            for (var i in props)
                if (temp.style[props[i]] !== undefined)
                    return true;
            return false
        }(document.createElement("swipe"))};
    if (!container)
        return;
    var element = container.children[0];
    var slides, slidePos, width;
    options = options || {};
    var index = parseInt(options.startSlide, 10) || 0;
    var speed = options.speed || 300;
    options.continuous = options.continuous ? options.continuous : true;
    function setup() {
        slides = element.children;
        slidePos = new Array(slides.length);
        width = container.getBoundingClientRect().width || container.offsetWidth;
        var pos = slides.length;
        while (pos--) {
            var slide = slides[pos];
            slide.style.display = "block";
            slide.setAttribute("data-index", pos);
            if (browser.transitions) {
                move(pos, index > pos ? -width : index < pos ? width : 0, 0)
            }
        }
        if (!browser.transitions) {
            container.style.visibility = "visible"
        }
    }
    function prev() {
        if (index)
            slide(index - 1);
        else if (options.continuous)
            slide(slides.length - 1)
    }
    function next() {
        if (index < slides.length - 1)
            slide(index + 1);
        else if (options.continuous)
            slide(0)
    }
    function slide(to, slideSpeed) {
        if (index == to)
            return;
        if (browser.transitions) {
            var diff = Math.abs(index - to) - 1;
            var direction = Math.abs(index - to) / (index - to);
            while (diff--)
                move((to > index ? to : index) - diff - 1, width * direction, 0);
            move(index, width * direction, slideSpeed || speed);
            move(to, 0, slideSpeed || speed)
        } else {
            animate(index * -width, to * -width, slideSpeed || speed)
        }
        index = to;
        offloadFn(options.callback && options.callback(index, slides[index]))
    }
    function move(index, dist, speed) {
        translate(index, dist, speed);
        slidePos[index] = dist
    }
    function translate(index, dist, speed) {
        var slide = slides[index];
        var style = slide && slide.style;
        if (!style)
            return;
        style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + "ms";
        style.webkitTransform = "translate(" + dist + "px,0)" + "translateZ(0)";
        style.msTransform = style.MozTransform = style.OTransform = "translateX(" + dist + "px)"
    }
    function animate(from, to, speed) {
        if (!speed) {
            element.style.left = to + "px";
            return
        }
        var start = +new Date;
        var timer = setInterval(function() {
            var timeElap = +new Date - start;
            if (timeElap > speed) {
                element.style.left = to + "px";
                if (delay)
                    begin();
                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
                clearInterval(timer);
                return
            }
            element.style.left = (to - from) * (Math.floor(timeElap / speed * 100) / 100) + from + "px"
        }, 4)
    }
    var delay = options.auto || 0;
    var interval;
    function begin() {
        interval = setTimeout(next, delay)
    }
    function stop() {
        delay = 0;
        clearTimeout(interval)
    }
    var start = {};
    var delta = {};
    var isScrolling;
    var events = {handleEvent: function(event) {
            switch (event.type) {
                case "touchstart":
                    this.start(event);
                    break;
                case "touchmove":
                    this.move(event);
                    break;
                case "touchend":
                    offloadFn(this.end(event));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    offloadFn(this.transitionEnd(event));
                    break;
                case "resize":
                    offloadFn(setup.call());
                    break
            }
            if (options.stopPropagation)
                event.stopPropagation()
        },start: function(event) {
            var touches = event.touches[0];
            start = {x: touches.pageX,y: touches.pageY,time: +new Date};
            isScrolling = undefined;
            delta = {};
            element.addEventListener("touchmove", this, false);
            element.addEventListener("touchend", this, false)
        },move: function(event) {
            if (event.touches.length > 1 || event.scale && event.scale !== 1)
                return;
            if (options.disableScroll)
                event.preventDefault();
            var touches = event.touches[0];
            delta = {x: touches.pageX - start.x,y: touches.pageY - start.y};
            if (typeof isScrolling == "undefined") {
                isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y))
            }
            if (!isScrolling) {
                event.preventDefault();
                stop();
                delta.x = delta.x / (!index && delta.x > 0 || index == slides.length - 1 && delta.x < 0 ? Math.abs(delta.x) / width + 1 : 1);
                translate(index - 1, delta.x + slidePos[index - 1], 0);
                translate(index, delta.x + slidePos[index], 0);
                translate(index + 1, delta.x + slidePos[index + 1], 0)
            }
        },end: function(event) {
            var duration = +new Date - start.time;
            var isValidSlide = Number(duration) < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > width / 2;
            var isPastBounds = !index && delta.x > 0 || index == slides.length - 1 && delta.x < 0;
            var direction = delta.x < 0;
            if (!isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    if (direction) {
                        move(index - 1, -width, 0);
                        move(index, slidePos[index] - width, speed);
                        move(index + 1, slidePos[index + 1] - width, speed);
                        index += 1
                    } else {
                        move(index + 1, width, 0);
                        move(index, slidePos[index] + width, speed);
                        move(index - 1, slidePos[index - 1] + width, speed);
                        index += -1
                    }
                    options.callback && options.callback(index, slides[index])
                } else {
                    move(index - 1, -width, speed);
                    move(index, 0, speed);
                    move(index + 1, width, speed)
                }
            }
            element.removeEventListener("touchmove", events, false);
            element.removeEventListener("touchend", events, false)
        },transitionEnd: function(event) {
            if (parseInt(event.target.getAttribute("data-index"), 10) == index) {
                if (delay)
                    begin();
                options.transitionEnd && options.transitionEnd.call(event, index, slides[index])
            }
        }};
    setup();
    if (delay)
        begin();
    if (browser.addEventListener) {
        if (browser.touch)
            element.addEventListener("touchstart", events, false);
        if (browser.transitions) {
            element.addEventListener("webkitTransitionEnd", events, false);
            element.addEventListener("msTransitionEnd", events, false);
            element.addEventListener("oTransitionEnd", events, false);
            element.addEventListener("otransitionend", events, false);
            element.addEventListener("transitionend", events, false)
        }
        window.addEventListener("resize", events, false)
    } else {
        window.onresize = function() {
            setup()
        }
    }
    return {setup: function() {
            setup()
        },slide: function(to, speed) {
            slide(to, speed)
        },prev: function() {
            stop();
            prev()
        },next: function() {
            stop();
            next()
        },getPos: function() {
            return index
        },kill: function() {
            stop();
            element.style.width = "auto";
            element.style.left = 0;
            var pos = slides.length;
            while (pos--) {
                var slide = slides[pos];
                slide.style.width = "100%";
                slide.style.left = 0;
                if (browser.transitions)
                    translate(pos, 0, 0)
            }
            if (browser.addEventListener) {
                element.removeEventListener("touchstart", events, false);
                element.removeEventListener("webkitTransitionEnd", events, false);
                element.removeEventListener("msTransitionEnd", events, false);
                element.removeEventListener("oTransitionEnd", events, false);
                element.removeEventListener("otransitionend", events, false);
                element.removeEventListener("transitionend", events, false);
                window.removeEventListener("resize", events, false)
            } else {
                window.onresize = null
            }
        }}
}
(function($, win) {
    var doc = win.document, Z = win.LINEWELL, ui = Z.ui, CONF = Z.CONF, url_api = CONF["url_api"];
    if (!Z.isTouch()) {
        $(doc).delegate("body", "click", function(e) {
            $(e.target).trigger("tap")
        })
    }
    $(function() {
        var doc = $(win.document), picgroup = $("div.mod-picgroup"), picview = null, index_url = LINEWELL.page.index_url ? LINEWELL.page.index_url : "/", is_embed = window.location.href.indexOf("embed=true") > 0 ? true : false, is_preview = window.location.origin == url_api;
        if (is_embed) {
            doc.on("click", "a", function(e) {
                var url = this.href, l = url.length, ih = url.indexOf("#"), p = url.indexOf("?") > -1 ? "&embed=true" : "?embed=true";
                if (ih > -1) {
                    var sub = url.substr(ih);
                    url = url.replace(sub, p + sub)
                } else {
                    url = url + p
                }
                this.href = url
            })
        }
        var ctx = {is_touch: Z.isTouch(),is_embed: is_embed,doc: doc,conf: CONF,ui: ui,page: Z.page};
        function navon(on) {
            if (on) {
                doc.find("body").addClass("nav-on");
                var videos = $(".mod-video iframe.video");
                for (var i = 0; i < videos.length; i++) {
                    var elem = $(videos[i]);
                    elem.height(0)
                }
            } else {
                doc.find("body").removeClass("nav-on");
                var videos = $(".mod-video iframe.video");
                for (var i = 0; i < videos.length; i++) {
                    var elem = $(videos[i]);
                    elem.height(elem.data("height"))
                }
            }
        }
        (function(ctx) {
            var tn = $("#js-theme-nav"), doc = ctx.doc, nav_on = false;
            if (tn.hasClass("mod-themenav4")) {
                tn.find("i.font-ico").tap(function() {
                    tn.addClass("mod-themenav-more");
                    navon(true);
                    nav_on = true;
                    return false
                }).click(function() {
                    tn.addClass("mod-themenav-more");
                    navon(true);
                    nav_on = true;
                    return false
                });
                doc.on("tap", function(e) {
                    if (nav_on) {
                        var t = $(e.target);
                        if (t.parents(".mod-themenav4").length == 0 && !t.hasClass(".mod-themenav4")) {
                            tn.removeClass("mod-themenav-more");
                            navon(false);
                            nav_on = false
                        }
                    }
                })
            } else if (tn.hasClass("mod-themenav1") || tn.hasClass("mod-themenav2")) {
                if (tn.hasClass("mod-themenav2")) {
                    var phone_main = doc.find("#phone-main");
                    if (phone_main.length > 0) {
                        phone_main.css({marginBottom: "45px"})
                    }
                    doc.find("body").addClass("nav-on-bottom")
                }
                var ul = tn.find("ul"), len = tn.find("li").length;
                if (len > 4) {
                    var d = $('<div class="dropbox">                                <ul></ul>                            <span class="ico-arrow"><em class="ico-arrow-bd"></em><em class="ico-arrow-bg"></em></span>                        </div>'), more = tn.hasClass("mod-themenav2") ? $('<li class="more"><a href="javascript:void(0);"><p class="font-ico"><i></i><i></i><i></i></p><p class="title">更多</p></a></li>') : $('<li class="more"><a href="javascript:;"><i></i><i></i><i></i></a></li>');
                    d.find("ul").append(ul.find("li").slice(4));
                    ul.append(more);
                    d.insertAfter(ul);
                    more.click(function() {
                        tn.addClass("mod-themenav-more");
                        navon(true);
                        nav_on = true;
                        return false
                    }).tap(function() {
                        tn.addClass("mod-themenav-more");
                        navon(true);
                        nav_on = true;
                        return false
                    });
                    doc.on("tap", function(e) {
                        if (nav_on) {
                            var t = $(e.target);
                            if (t.parents(".mod-themenav1,.mod-themenav2").length == 0 && !t.hasClass(".mod-themenav1") && !t.hasClass(".mod-themenav2")) {
                                tn.removeClass("mod-themenav-more");
                                navon(false);
                                nav_on = false
                            }
                        }
                    })
                }
            }
        })(ctx);
        if (picgroup.length > 0) {
            picgroup = picgroup.filter(function(index) {
                var $w = picgroup.eq(index);
                if ($w.closest("[data-component]").length > 0) {
                    return false
                }
                return true
            });
            if (picgroup.length > 0) {
                picview = new ui.PicView({pg: picgroup})
            }
        }
        function initFocus() {
            if (ctx.is_touch) {
                for (var i = 0; i < $(".swipe").length; i++) {
                    var w = document.querySelectorAll(".swipe")[i], $w = $(w);
                    if ($w.parents("[data-component]").length > 0) {
                        continue
                    }
                    new SwipeV1(w, {startSlide: 0,speed: 400,auto: false,continuous: true,disableScroll: false,stopPropagation: false,callback: function(index, elem) {
                            $(elem).parents(".focus-w").find(".focus-ctr").eq(index).addClass("cur").siblings().removeClass("cur")
                        },transitionEnd: function(index, elem) {
                            $(elem).parents(".focus-w").find(".focus-ctr").find("span").removeClass("cur").eq(index).addClass("cur")
                        }})
                }
            }
        }
        initFocus();
        $(win).bind("orientationchange", function(event) {
            initFocus()
        });
        (function(ctx) {
            var url_api = ctx.conf["url_api"], ui = ctx.ui;
            $(".mod-pictxt").on("click", ".mod-button-load a", function(e) {
                if (e.preventDefault) {
                    e.stopPropagation();
                    e.preventDefault()
                }
                var t = $(this), p = t.parents(".mod-pictxt"), param = p.data("param"), nextpage = p.data("nextpage") ? p.data("nextpage") : 2;
                ui.loader.show();
                $.ajax({url: url_api + "/post/ajax-postlist",type: "GET",data: {site_id: ctx.page.site_id,param: param,page: nextpage},dataType: "jsonp",jsonp: "jsonpcallback",success: function(data) {
                        ui.loader.hide();
                        if (data.ret === 0) {
                            var w = $(data.data);
                            p.find(".mod-button-load").remove();
                            p.find("ul").append(w.find("ul li"));
                            var load_btn = w.find(".mod-button-load");
                            if (load_btn.length == 0) {
                                load_btn = $("<div class='nocontent-more'>没有更多内容</div>")
                            }
                            p.append(load_btn);
                            nextpage++;
                            p.data("nextpage", nextpage)
                        } else {
                        }
                    }});
                return false
            })
        })(ctx)
    })
})(Zepto, this);
