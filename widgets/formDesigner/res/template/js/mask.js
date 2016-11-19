define([], function() {
    return function() {
        var el = '<div data-role="mask" class="mask black"></div>', $el = $("[data-role='mask']").size() > 0 ? $("[data-role='mask']") :$(el).appendTo("body");
        return {
            $el:$el,
            show:function(opt) {
                $el.off("click").on("click", function() {
                    opt && opt.onClick && opt.onClick();
                });
                $el.show();
            },
            hide:function() {
                $el.hide();
            }
        };
    }();
});