define(["jquery", "ui-mod/base"], function($, ui) {
    var tpl_form = '<form method="post" enctype="multipart/form-data" action="{{backend_url}}" target="{{_target_frame_}}" style="display:none;">                <input type="hidden" name="callback" value="{{callback}}">                <input type="file" name="{{filename}}" accept="{{accept}}" >                <iframe name="{{_target_frame_}}"></iframe>            </form>';
    var index = 0;
    ui.Uploader = function(opt, success) {
        this.init(opt, success)
    };
    ui.Uploader.prototype = {_create: function(opt) {
            var d = {}, default_opt = {filename: "apic",accept: "image/*",_target_frame_: "uploader-" + (new Date()).getTime() + index};
            $.extend(d, default_opt, opt);
            return ui.render(tpl_form, d)
        },init: function(opt, success) {
            var m = this, name = "upload_" + (new Date()).getTime() + index, form;
            if (!opt.maxsize)
                opt.maxsize = 4194304;
            var maxMB = Math.floor(opt.maxsize / 1048576) + "M";
            opt.callback = "LINEWELL." + name;
            form = $(m._create(opt));
            index++;
            LINEWELL[name] = function(data) {
                if (opt.complete) {
                    opt.complete.call(m, data);
                }
                if (data.success) {
                    success.call(m, data.content);
                } else {
                    ui.alert({msg: data.message});
                }
                form.find(":file").val("");
            };
            form.on("change", ":file", function() {
                if (this.files) {
                    var f = this.files[0];
                    if (f.size && f.size > opt.maxsize) {
                        ui.alert("请选择小于" + maxMB + " 的文件！");
                        $(this).val("");
                        return false
                    }
                }
                if (opt.uploadHandler) {
                	opt.uploadHandler.call(m, this.files && this.files[0] || null, form);
                	$(this).val("");
                } else {
                	form.submit()
                }
            });
            $("body").append(form);
            m.form = form
        },start: function() {
            this.form.find(":file").click()
        }};
    return ui.Uploader
});
