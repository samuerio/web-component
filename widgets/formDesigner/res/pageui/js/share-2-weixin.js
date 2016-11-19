define(["ui", "jquery", "lib/bootstrap", "lib/jquery.zclip"], function(ui, $) {
    var tpl = '<div class="weixin-pop2">                <div class="wxcontainer clearfix">                    <div class="content clearfix">                         <a href="javascript:;" class="image" {{#pic}}style="background-image: url({{pic}});"{{/pic}} {{^pic}}style="background-image: url({{_staticurl_}}/res/weixin/images/default-img.png);"{{/pic}}>                            <span class="changeimg">更换图片</span>                        </a>                        <div class="form">                             <div class="title">{{title}}</div>                            <input type="text" name="title" value="">                            <div class="description">{{desc}}</div>                            <input type="text" name="description" value="">                            <a href="javascript:;" class="edit">修改</a>                            <div class="destip">描述内容</div>                        </div>                    </div>                    <div class="asideleft">                        <h1>分享到微信</h1>                        <img class="qrcode" src="{{_qrcode_}}">                        <p>打开微信，扫描二维码分享</p>                        <p>到朋友圈 <a target="_blank" href="http://wiki.kuaizhan.sohuno.com/pub/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/%E5%BE%AE%E4%BF%A1%E5%88%86%E4%BA%AB%E7%9A%84%E4%BD%BF%E7%94%A8#preview">如何使用？</a></p>                    </div>                    <div class="asideright">                        <h1>分享到其他平台</h1>                        <ul class="platform-list clearfix" role="other-platform">                        {{_sharlist_}}                        </ul>                    </div>                </div>                <div class="footer-url">                    <span>地址：</span><a class="link" target="_blank" href="{{url}}">{{url}}</a><a href="javascript:;" class="copylink">复制</a>                </div>                <div class="icon-close"></div>            </div>', share_list = '<li>                                <a class="weibo" href="{{weibo}}" target="_blank" data-type="weibo"></a>                            </li>                            <li>                                <a class="qzone" href="{{qzone}}" target="_blank" data-type="qzone"></a>                            </li>                            <li>                                <a class="renren" href="{{renren}}" target="_blank" data-type="renren"></a>                            </li>                            <li>                                <a class="txweibo" href="{{txweibo}}" target="_blank" data-type="txweibo"></a>                            </li>                            <li>                                <a class="douban" href="{{douban}}" target="_blank" data-type="douban"></a>                            </li>', url_list = {weibo: "http://v.t.sina.com.cn/share/share.php?url={{url}}&appkey=705007486&title=%E3%80%90{{title}}%E3%80%91{{desc}}&pic={{pic}}",qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{url}}&title=%E3%80%90{{title}}%E3%80%91&summary={{desc}}&pics={{pic}}&site={{site_url}}",renren: "http://widget.renren.com/dialog/share?srcUrl={{url}}&resourceUrl={{url}}&title=%E3%80%90{{title}}%E3%80%91&pic={{pic}}&description={{desc}}",txweibo: "http://share.v.t.qq.com/index.php?c=share&a=index&title=%E3%80%90{{title}}%E3%80%91&nbsp;{{desc}}&url={{url}}&pic={{pic}}",douban: "http://www.douban.com/share/service?bm=1&image={{pic}}&href={{url}}&updated=&name=%E3%80%90{{title}}%E3%80%91&nbsp;{{desc}}"}, pop = null;
    ui.share2weixin = {open: function(data, opt) {
            var savecallback = opt.savecallback;
            var d = $.extend({}, data);
            var _data = data;
            for (var n in d) {
                d[n] = encodeURIComponent(d[n])
            }
            for (var name in url_list) {
                data[name] = ui.render(url_list[name], d)
            }
            var qrcode_url = "/common/encode-png?large=true&data=" + encodeURIComponent(data.url);
            if (LINEWELL.wwwurl) {
                qrcode_url = LINEWELL.wwwurl + qrcode_url
            }
            data["_qrcode_"] = qrcode_url;
            data["_sharlist_"] = ui.render(share_list, data);
            var html = ui.render(tpl, data);
            if (pop) {
                pop.remove()
            }
            pop = $(html);
            pop.modal({show: true,backdrop: true,center: false});
            pop.on("click", ".icon-close", function() {
                pop.modal("hide")
            });
            var copy_sel = window.$(pop).find(".copylink");
            copy_sel.on("click", function(e) {
                e.preventDefault()
            });
            copy_sel.zclip({path: LINEWELL.staticurl + "/res/ui/js/lib/ZeroClipboard.swf",copy: function() {
                    return pop.find(".link").attr("href")
                },afterCopy: function() {
                    ui.insetSuccess({msg: "已复制到剪贴板!",position: "center",timeout: 3e3,callback: function() {
                            console.log("inset success pop hide.")
                        }})
                }});
            if (opt.noedit) {
                pop.find(".edit").hide();
                pop.find(".changeimg").hide();
                return
            }
            if (data.desc == "") {
                pop.find(".destip").show()
            }
            pop.on("click", ".edit", function() {
                var f = pop.find(".form");
                var title = f.find(".title").html();
                f.find(".title").hide();
                f.find('[name="title"]').val(title).show();
                var des = f.find(".description").html();
                f.find(".description").hide();
                f.find('[name="description"]').val(des).show();
                $(this).attr("class", "save").html("保存");
                f.find(".destip").hide()
            }).on("click", ".save", function() {
                var f = pop.find(".form");
                var title = f.find('[name="title"]').val();
                var des = f.find('[name="description"]').val();
                var that = this;
                if (title == "") {
                    ui.alert({msg: "标题不能为空"});
                    return
                }
                if (title.length > 64) {
                    ui.alert({msg: "标题长度不能大于64"});
                    return
                }
                if (des.length > 120) {
                    ui.alert({msg: "描述长度不能大于120"});
                    return
                }
                savecallback({share_title: title,share_desc: des}, function(data) {
                    _data["title"] = title;
                    _data["desc"] = des;
                    var d = $.extend({}, _data);
                    for (var n in d) {
                        d[n] = encodeURIComponent(d[n])
                    }
                    for (var name in url_list) {
                        _data[name] = ui.render(url_list[name], d)
                    }
                    var $share = ui.render(share_list, _data);
                    pop.find(".platform-list").html($share);
                    f.find('[name="title"]').hide();
                    f.find(".title").html(title).show();
                    f.find('[name="description"]').hide();
                    f.find(".description").html(des).show();
                    $(that).attr("class", "edit").html("修改");
                    if (des == "") {
                        f.find(".destip").show()
                    }
                })
            }).on("click", ".image", function() {
                var that = this;
                ui.picselector({mode: 1,select: function(data) {
                        savecallback({share_pic_id: data[0].id}, function(json) {
                            $(that).css("background-image", "url(" + data[0].url_700_700 + ")");
                            _data["pic"] = data[0].url_700_700;
                            for (var name in url_list) {
                                _data[name] = ui.render(url_list[name], _data)
                            }
                            var $share = ui.render(share_list, _data);
                            pop.find(".platform-list").html($share)
                        })
                    }})
            })
        },sharePage: function(data) {
            var t = this;
            if (data.page_id) {
                ui.loading();
                $.ajax({url: "/pageui/ajax-page-share-info",type: "POST",dataType: "json",data: {page_id: data.page_id},success: function(json) {
                        ui.hideLoading();
                        if (json.ret === 0) {
                            t.open(json.data, data.opt)
                        } else {
                            ui.alert({msg: json.msg})
                        }
                    }})
            } else {
                t.open(data.data, data.opt)
            }
        }};
    return ui.share2weixin
});
