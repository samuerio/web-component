define([ "res/template/js/mask", "ui", "jquery", "res/template/js/jquery-ui.min" ], function(mask, ui, $) {
    var tmpl = $(".kzp-page-config");
    var createNew = function(opts, handle) {
        var postData = {
            mapp_id:LINEWELL.page.mapp_id,
            screen:opts.screen,
            title:opts.title,
            desc:opts.desc,
            category:opts.category,
            json:opts.json,
            tmpl_id:opts.tmpl_id,
            paging_control:opts.paging_control,
            paging_second:opts.paging_second,
            play_control:opts.play_control,
            "jump-url":opts["jump-url"]
        };
        $.ajax({
            url:"/newsite/ajax-new-haibao",
            type:"post",
            data:postData,
            success:function(data) {
                if (data.ret == 0) {
                    location.href = data.data.goto;
                } else {
                    ui.alert(data.msg);
                    handle.cancel();
                }
            }
        });
    };
    return function() {
        return {
            $el:null,
            createPage:function(json, tmpl_id) {
                var that = this;
                mask.show({
                    onClick:function() {
                        that.cancel();
                    }
                });
                this.json = json;
                this.$el = $(tmpl).appendTo("body");
                this.$el.find("#config-title").html("新建海报");
                this.$el.show();
                this.init();
                this.tmpl_id = tmpl_id;
                var that = this;
                this.$el.delegate("[data-role='save']", "click", function() {
                    that.create();
                });
            },
            init:function() {
                var that = this;
                this.$el.find("[data-role='save']").text("保存").removeAttr("disabled");
                this.$el.delegate("[data-role='cancel']", "click", function() {
                    that.cancel();
                });
                this.$el.delegate("[data-role='upload-pic']", "click", function() {
                    ui.picselector({
                        mode:1,
                        source:"user",
                        select:function(data) {
                            that.$el.find('[data-model="screen"]').val(data[0].url.replace(/240x180$/, "304x304"));
                            that.$el.find(".screen_preview").html("<img src='" + data[0].url.replace(/240x180$/, "304x304") + "'/>");
                        }
                    });
                });
                this.$el.delegate("[data-model='play_control']", "change", function() {
                    if (this.value == "2") {
                        that.$el.find('[data-model="jump-url"]').show();
                    } else {
                        that.$el.find('[data-model="jump-url"]').hide();
                    }
                });
                this.$el.delegate("[data-model='paging_control']", "change", function() {
                    if (this.value == "1") {
                        that.$el.find('[data-role="paging_second_wrapper"]').show();
                    } else {
                        that.$el.find('[data-role="paging_second_wrapper"]').hide();
                    }
                });
                this.$el.find("[data-model='play_control']").trigger("change");
                this.$el.find("[data-model='paging_control']").trigger("change");
                this.$el.find("[data-theme='spinner']").each(function() {
                    var $el = $(this);
                    var step = parseFloat($el.data("step")) || 1;
                    var max = parseFloat($el.data("max"));
                    max = isNaN(max) ? undefined :max;
                    var min = parseFloat($el.data("min"));
                    min = isNaN(min) ? undefined :min;
                    $el.spinner({
                        step:step,
                        max:max,
                        min:min
                    });
                });
                that.$el.find("select").selectmenu({
                    change:function(event, ui) {
                        $(this).val(ui.item.value).trigger("change");
                    }
                });
            },
            create:function() {
                if (this.validate()) {
                    this.$el.find("[data-role='save']").text("保存中...").attr("disabled", "disabled");
                    var data = this.getData();
                    createNew({
                        json:JSON.stringify(this.json),
                        title:data.title,
                        screen:data.screen,
                        desc:data.desc,
                        category:data.category,
                        paging_second:data.paging_second,
                        play_control:data.play_control,
                        paging_control:data.paging_control,
                        "jump-url":data["jump-url"],
                        tmpl_id:this.tmpl_id
                    }, this);
                }
            },
            validate:function() {
                var data = this.getData();
                var validating = {
                    title:function(val) {
                        if (val.length <= 0 || val.length > 20) {
                            return "名称不能为空，不能超过20个字";
                        }
                    },
                    desc:function(val) {
                        if (val && val.length > 50) {
                            return "描述不能超过50个字";
                        }
                    }
                };
                var result;
                for (var n in data) {
                    var r = validating[n] && validating[n](data[n]);
                    if (r) {
                        result = result || {};
                        result[n] = r;
                    }
                }
                if (result) {
                    this.renderError(result);
                }
                return !result;
            },
            renderError:function(result) {
                if (!result) {
                    return;
                }
                this.$el.find("[data-validate]").each(function() {
                    var $this = $(this);
                    var r = result[$this.data("validate")];
                    if (r) {
                        $this.html(r);
                    } else {
                        $this.html("");
                    }
                });
            },
            getData:function() {
                var scope = {};
                this.$el.find("[data-model]").each(function() {
                    scope[$(this).data("model")] = $(this).val();
                });
                return scope;
            },
            setData:function(data) {
                this.$el.find("[data-model]").each(function() {
                    $(this).val(data[$(this).data("model")]);
                    if (this.tagName == "SELECT") {
                        $(this).find('[value="' + data[$(this).data("model")] + '"]').attr("selected", "selected");
                    }
                });
                if (data["screen"]) {
                    this.$el.find(".screen_preview").html("<img src='" + data["screen"] + "'/>");
                }
                if (data["category"]) {
                    this.category = data["category"];
                }
            },
            cancel:function() {
                mask.hide();
                this.$el && this.$el.remove();
            }
        };
    }();
});