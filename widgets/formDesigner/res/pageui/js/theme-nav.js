define(["jquery", "ui", "libui/uploader", "libui/imagecut"], function($, ui) {
    function ThemeNav1(opt) {
        var m = this;
        m.wrap = opt.wrap;
        m.litpl = '<li><a href="javascript:;">{{text}}</a></li>';
        m.wrap.bind("NavAddItem", function(e, text) {
            m.addItem(text, opt)
        });
        m.wrap.bind("NavDelItem", function(e, index) {
            m.delItem(index)
        });
        m.wrap.bind("NavItemMoveLeft", function(e, index) {
            m.moveLeft(index)
        });
        m.wrap.bind("NavItemMoveRight", function(e, index) {
            m.moveRight(index)
        });
        m.wrap.bind("NavItemUpdate", function(e, index, text) {
            m.updateItem(index, text)
        });
        m.ul = m.wrap.find("ul");
        m.itemCount = m.ul.find("li").length;
        m.init(opt)
    }
    ThemeNav1.prototype = {init: function(opt) {
            var m = this;
            if (m.itemCount > 4) {
                var d = $('<div class="dropbox">                                <ul></ul>                            <span class="ico-arrow"><em class="ico-arrow-bd"></em><em class="ico-arrow-bg"></em></span>                        </div>');
                d.find("ul").append(m.ul.find("li:gt(3)"));
                if (opt.nav2) {
                    m.ul.append('<li class="more"><a href="javascript:;"><p class="font-ico"><i></i><i></i><i></i></p><p class="title">更多</p></a></li>')
                } else {
                    m.ul.append('<li class="more"><a href="javascript:;"><i></i><i></i><i></i></a></li>')
                }
                d.insertAfter(m.ul);
                if (opt.showmore)
                    m.wrap.addClass("mod-themenav-more")
            }
        },addItem: function(text, opt) {
            var m = this, h = m.litpl.replace("{{text}}", text);
            m.itemCount++;
            if (m.itemCount == 5) {
                m.wrap.trigger("NavItemTooMany");
                var d = $('<div class="dropbox">                                <ul></ul>                            <span class="ico-arrow"><em class="ico-arrow-bd"></em><em class="ico-arrow-bg"></em></span>                        </div>');
                d.find("ul").append(m.ul.find("li:gt(3)"));
                if (opt.nav2) {
                    m.ul.append('<li class="more"><a href="javascript:;"><p class="font-ico"><i></i><i></i><i></i></p><p class="title">更多</p></a></li>')
                } else {
                    m.ul.append('<li class="more"><a href="javascript:;"><i></i><i></i><i></i></a></li>')
                }
                d.insertAfter(m.ul);
                d.find("ul").append(h);
                m.wrap.addClass("mod-themenav-more")
            } else if (m.itemCount > 5) {
                m.wrap.find("div.dropbox ul").append(h)
            } else {
                m.ul.append($(h))
            }
        },_getItem: function(index) {
            if (index < 4) {
                return this.ul.find("li:eq(" + index + ")")
            } else {
                return this.wrap.find("div.dropbox ul li:eq(" + (index - 4) + ")")
            }
        },updateItem: function(index, text) {
            this._getItem(index).replaceWith(this.litpl.replace("{{text}}", text))
        },delItem: function(index) {
            this._getItem(index).remove();
            if (index < 4 && this.itemCount > 4) {
                this.ul.append();
                this._getItem(4).insertAfter(this._getItem(2))
            }
            this.itemCount--;
            if (this.itemCount < 5) {
                this.ul.find("li.more").remove();
                this.wrap.find("div.dropbox").remove();
                this.wrap.removeClass("mod-themenav-more")
            }
        },moveLeft: function(index) {
            var t = this._getItem(index), p = this._getItem(index - 1);
            if (index == 4) {
                t.insertBefore(p);
                this.wrap.find("div.dropbox ul").prepend(p)
            } else {
                t.insertBefore(p)
            }
        },moveRight: function(index) {
            var t = this._getItem(index), n = this._getItem(index + 1);
            if (index == 3) {
                t.insertAfter(n);
                n.insertAfter(this._getItem(index - 1))
            } else {
                t.insertAfter(n)
            }
        }};
    function ThemeNav3(opt) {
        var m = this;
        m.wrap = opt.wrap;
        m.litpl = '<li><a href="javascript:;">{{text}}</a></li>';
        m.type = "";
        if (opt.showmore)
            m.wrap.addClass("mod-themenav-more");
        m.wrap.bind("NavAddItem", function(e, text) {
            m.addItem(text)
        });
        m.wrap.bind("NavDelItem", function(e, index) {
            m.delItem(index)
        });
        m.wrap.bind("NavItemMoveLeft", function(e, index) {
            m.moveLeft(index)
        });
        m.wrap.bind("NavItemMoveRight", function(e, index) {
            m.moveRight(index)
        });
        m.wrap.bind("NavItemUpdate", function(e, index, text) {
            m.updateItem(index, text)
        });
        m.ul = m.wrap.find("ul");
        m.itemCount = m.ul.find("li").length
    }
    ThemeNav3.prototype = {addItem: function(text) {
            var m = this, h = m.litpl.replace("{{text}}", text);
            m.itemCount++;
            if (m.itemCount == 5) {
                m.wrap.trigger("NavItemTooMany")
            }
            m.ul.append($(h))
        },updateItem: function(index, text) {
            this.ul.find("li:eq(" + index + ")").replaceWith(this.litpl.replace("{{text}}", text))
        },delItem: function(index) {
            this.ul.find("li:eq(" + index + ")").remove();
            this.itemCount--
        },moveLeft: function(index) {
            var t = this.ul.find("li:eq(" + index + ")");
            t.insertBefore(t.prev())
        },moveRight: function(index) {
            var t = this.ul.find("li:eq(" + index + ")");
            t.insertAfter(t.next())
        }};
    function ThemeNav4(opt) {
        var m = this;
        m.wrap = opt.wrap;
        m.litpl = '<li><a href="javascript:;">{{text}}<i class="font-ico"></i></a></li>';
        m.type = "";
        if (opt.showmore)
            m.wrap.addClass("mod-themenav-more");
        m.wrap.bind("NavAddItem", function(e, text) {
            m.addItem(text)
        });
        m.wrap.bind("NavDelItem", function(e, index) {
            m.delItem(index)
        });
        m.wrap.bind("NavItemMoveLeft", function(e, index) {
            m.moveLeft(index)
        });
        m.wrap.bind("NavItemMoveRight", function(e, index) {
            m.moveRight(index)
        });
        m.wrap.bind("NavItemUpdate", function(e, index, text) {
            m.updateItem(index, text)
        });
        m.ul = m.wrap.find("ul");
        m.itemCount = m.ul.find("li").length
    }
    ThemeNav4.prototype = {addItem: function(text) {
            var m = this, h = m.litpl.replace("{{text}}", text);
            m.itemCount++;
            if (m.itemCount == 5) {
                m.wrap.trigger("NavItemTooMany")
            }
            m.ul.append($(h))
        },updateItem: function(index, text) {
            this.ul.find("li:eq(" + index + ")").replaceWith(this.litpl.replace("{{text}}", text))
        },delItem: function(index) {
            this.ul.find("li:eq(" + index + ")").remove();
            this.itemCount--
        },moveLeft: function(index) {
            var t = this.ul.find("li:eq(" + index + ")");
            t.insertBefore(t.prev())
        },moveRight: function(index) {
            var t = this.ul.find("li:eq(" + index + ")");
            t.insertAfter(t.next())
        }};
    return {init: function(wrap, showmore) {
            if (wrap.hasClass("mod-themenav2")) {
                $(".phone-main").css({marginBottom: "45px"});
                return new ThemeNav1({wrap: wrap,showmore: showmore,nav2: true})
            } else if (wrap.hasClass("mod-themenav1")) {
                return new ThemeNav1({wrap: wrap,showmore: showmore})
            } else if (wrap.hasClass("mod-themenav3")) {
                return new ThemeNav4({wrap: wrap,showmore: showmore})
            } else if (wrap.hasClass("mod-themenav4")) {
                return new ThemeNav3({wrap: wrap,showmore: showmore})
            }
        }}
});
