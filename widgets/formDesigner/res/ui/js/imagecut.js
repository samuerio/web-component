define(["jquery", "ui-mod/base", "lib/jquery-imgareaselect"], function($, ui) {
    var tpl = '<div class="ui-pop-lite ui-imgcut">                <div class="image">                    <img src="{{_emptygif_}}" data-rol="origin-img">                </div>                <div class="btn-con">                    <button class="confirm" data-action="confirm">确定</button>                    <button class="cancel" data-dismiss="modal">取消</button>                </div>            </div>';
    ui.ImageCut = function(opt, onConfirm) {
        var m = this, default_opt = {x1: 0,y1: 0,x2: 50,y2: 50,handles: true,instance: true,minHeight: 50,minWidth: 50};
        m.opt = $.extend({}, default_opt, opt);
        m.onConfirm = onConfirm;
        m.pop = $(ui.render(tpl)).hide().modal({show: false,center: false}).bind("click.action.modal", function(e, n) {
            if (n === "confirm") {
                m.confirm()
            }
        }).on("hide", function() {
            m.endSelect()
        });
        $("body").append(m.pop)
    };
    ui.ImageCut.prototype = {confirm: function() {
            var m = this, img = m.pop.find("img[data-rol='origin-img']"), size = img.data("size"), data = m.handler ? m.handler.getSelection(true) : null;
            if (data.width === 0) {
            	ui.alert({msg : "您还没有选择要裁剪的区域"});
            	return;
            }
            var radio = 1, w = size.width, h = size.height;
            if (w > 500 || h > 500) {
                radio = w > h ? w / 500 : h / 500
            }
           
            var d = {x1: Math.ceil(data.x1 * radio),y1: Math.ceil(data.y1 * radio),width: Math.ceil(data.width * radio),height: Math.ceil(data.height * radio)};
            if (m.onConfirm) {
            	if (m.opt.local) {
            		var canvas = document.createElement("canvas");
            		canvas.width = m.opt.width || 500;
            		canvas.height = m.opt.height || 500;
            		var img = m.pop.find("img[data-rol='origin-img']")[0];
            		
            		var ctx = canvas.getContext("2d");
            		ctx.drawImage(img, d.x1, d.y1, d.width, d.height, 0, 0, canvas.width, canvas.height);
            		d = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
            	}
            	m.onConfirm.call(m, d);
            }
                
            m.pop.modal("hide")
        },start: function(opt) {
            var m = this, img = m.pop.find("img[data-rol='origin-img']"), new_img = new Image;
            m.opt.url = opt.image;
            new_img.onload = function() {
                img.data("size", {width: this.width,height: this.height});
                m.pop.removeClass("hide").modal("center").modal("show");
                if (!m.handler)
                    m.handler = img.imgAreaSelect(m.opt);
                m.opt.show = true;
                m.opt.aspectRatio = "1:1";
                m.handler.setOptions(m.opt);
                m.handler.update()
            };
            new_img.src = opt.image;
            img.attr("src", opt.image)
        },endSelect: function() {
            if (this.handler) {
                this.handler.cancelSelection();
                this.handler.update()
            }
        }};
    return ui.ImageCut
});
