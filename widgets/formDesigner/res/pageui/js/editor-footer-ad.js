define(["ui", "jquery"], function(ui, $) {
    return {init: function() {
            $.ajax({dataType: "jsonp",url: LINEWELL.wwwurl + "/adt/ajax-get-ad-info",cache: false,jsonpCallback: "jsonp_adt",data: {mapp_id: LINEWELL.page.mapp_id},success: function(data) {
                    if (data["ret"] == 0) {
                        var changeCloseSize = function() {
                            var offset = $(".ad_div").offset();
                            var real_width = 640;
                            var real_height = 100;
                            var ratio = 1;
                            if (offset.width < 640) {
                                real_width = offset.width;
                                real_height = offset.width / 640 * 100;
                                ratio = offset.width / 640
                            }
                            offset.left = (offset.width - real_width) / 2 + real_width - real_height;
                            offset.top = offset.top;
                            offset.width = real_height;
                            offset.height = real_height
                        };
                        if (data["ad_info"]) {
                            var footer = $("#js-view-panel");
                            footer.append($(data["ad_info"]))
                        }
                        $(".ad_tap_class").on("click", function(e) {
                            e.preventDefault();
                            ui.confirm({title: "关闭快站品牌展示？",msg: "用户开通商业版后，可确保品牌利益受到保护，</br>快站品牌展示将不再显示。",yes_text: "去开通",confirm: function() {
                                    location.href = "/plugin/intro?mapp_id=" + LINEWELL.page.mapp_id + "&plugin_id=remove_ad"
                                },cancel: function() {
                                }})
                        })
                    } else {
                    }
                }})
        }}
});
