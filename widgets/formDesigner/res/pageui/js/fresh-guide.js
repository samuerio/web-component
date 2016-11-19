define(["jquery", "ui"], function($, ui) {
    var modal_mask = $('<div class="fresh-guide-backdrop"></div>'), frame1 = $('<div class="fresh-guide-frame fresh-guide-frame1" data-val="1"><a href="javascript:void(0);" class="btn">下一步</a><a href="javascript:void(0);" class="close">关闭提示</a></div>'), frame2 = $('<div class="fresh-guide-frame fresh-guide-frame2" data-val="2"><a href="javascript:void(0);" class="btn">下一步</a><a href="javascript:void(0);" class="close">关闭提示</a></div>'), frame3 = $('<div class="fresh-guide-frame fresh-guide-frame3" data-val="3"><a href="javascript:void(0);" class="btn">下一步</a><a href="javascript:void(0);" class="close">关闭提示</a></div>'), frame4 = $('<div class="fresh-guide-frame fresh-guide-frame4" data-val="4"><a href="javascript:void(0);" class="btn">立即体验</a><a href="javascript:void(0);" class="close">关闭提示</a></div>');
    var guide = {init: function() {
            var that = this;
            if (LINEWELL.page.nav_tutorial_complete) {
                return
            }
            $.ajax({url: "/passport/ajax-complete-user-task",type: "post",data: {task_id: 1001},success: function(data) {
                    console.log(data);
                    that._init()
                }})
        },_init: function() {
            var dx1 = "629", dy1 = "0", dx2 = "0", dy2 = "276", dx3 = "416", dy3 = "88", dx4 = "48", dy4 = "416";
            if ($(".global-header").find(".js-header-nav-add")[0]) {
                dx1 = $(".global-header").find(".js-header-nav-add").offset().top - 15;
                dy1 = $(".global-header").find(".js-header-nav-add").offset().left - 274
            }
            if ($(".component-content")[0]) {
                dx2 = $(".component-content").offset().top - 100;
                dy2 = $(".component-content").offset().left
            }
            if ($("#page-pub-ctr")[0]) {
                dx3 = $("#page-pub-ctr").offset().top;
                dy3 = $("#page-pub-ctr").offset().left + 106
            }
            if ($(".header-publish")[0]) {
                dy4 = $(".header-publish").find("span").offset().left - 60
            }
            frame1.css({top: dx1 + "px",left: dy1 + "px"});
            frame2.css({top: dx2 + "px",left: dy2 + "px"});
            frame3.css({top: dx3 + "px",left: dy3 + "px"});
            frame4.css({top: dx4 + "px",left: dy4 + "px"});
            $("body").append(modal_mask);
            $("body").append(frame1);
            $("body").delegate(".fresh-guide-frame .btn", "click", function() {
                var val = $(this).closest(".fresh-guide-frame").data("val");
                $(this).closest(".fresh-guide-frame").remove();
                if (val == 1) {
                    $("body").append(frame2)
                } else if (val == 2) {
                    $("body").append(frame3)
                } else if (val == 4 || LINEWELL.page.site_published) {
                    $(".fresh-guide-frame").remove();
                    $(".fresh-guide-backdrop").remove()
                } else if (val == 3) {
                    $("body").append(frame4)
                }
            });
            $("body").delegate(".fresh-guide-frame .close", "click", function() {
                $(".fresh-guide-frame").remove();
                $(".fresh-guide-backdrop").remove()
            })
        }};
    return guide
});
