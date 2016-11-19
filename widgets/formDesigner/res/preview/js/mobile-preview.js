$(function() {
    parent.postMessage({topic: "iframehistory",link: window.location.href}, window.location.origin);
    var flist = ["/bbs/index", "/auth/me", "/plugin/page-proxy/"], fallback = function(href, e) {
        for (var i in flist) {
            var n = flist[i];
            if (href.indexOf(n) > -1) {
                e.preventDefault();
                window.location = "/preview/fallback";
                return true
            }
        }
        if (href.indexOf(window.location.origin + "/preview/") > -1) {
            return true
        } else {
            e.preventDefault();
            window.location = "/preview/fallback";
            return false;
        }
    };
    $("a").click(function(e) {
        var t = this;
        if ($(t).attr("href") === "javascript:;" || $(t).attr("href") === "javascript:void(0);") {
            return true
        }
        //---------做修改 拼凑url----------//
        if ($(t).attr("href").indexOf("preview.jsp") > -1 ) {
            return true
        }
        var ids = $(t).attr("href").split(",");
        //$(t).attr("href", "preview.jsp?mapp_id=" +LINEWELL.page.site_id+ "&page_id=" + $(t).attr("href"));
        if(ids.length == 2 && ids[1].indexOf("$") == -1){
        	$(t).attr("href", "preview.jsp?mapp_id=" +LINEWELL.page.site_id+ "&page_id=" + ids[0] + "&moduleId=" + ids[1]);
        }else{
        	$(t).attr("href", "preview.jsp?mapp_id=" +LINEWELL.page.site_id+ "&page_id=" + ids[0]);
        }
        
        return true;
        //------------------//
        var link_res_type = $(t).attr("data-link-type");
        if (link_res_type == 2 || link_res_type == 3) {
            var data = {mapp_id: LINEWELL.page.mapp_id,link: $(t).attr("href"),link_res_id: $(t).attr("data-link-id"),link_res_type: $(t).attr("data-link-type"),link_res_name: $(t).attr("data-link-name")};
            e.preventDefault();
            if (data.link == "javascript:;") {
                window.location.href = "javascript:;"
            } else {
                var newhref = encodeURI("/preview/link-hub?mapp_id=" + data.mapp_id + "&link=" + data.link + "&link_res_name=" + encodeURI(data.link_res_name) + "&link_res_type=" + data.link_res_type + "&link_res_id=" + data.link_res_id);
                window.location = newhref
            }
        } else {
            fallback(t.href, e)
        }
    });
    window.addEventListener("message", function(e) {
        console.log(e.data);
        if (e.data.topic == "iframeReturn") {
            window.location = e.data.link
        }
    }, false);
    function addnopop(el) {
        el.addClass("nopop");
        el.css("position", "relative");
        var $forumShadow = $('<div class="forumShadow" style="position: absolute;height: 100%;width: 100%;z-index: 10;left: 0px;top: 0px;"></div>');
        el.append($forumShadow)
    }
    function hidelist(list) {
        for (var i in list) {
            $(list[i]).each(function() {
                addnopop($(this))
            })
        }
    }
    var array = [".mod-ernie", ".mod-scrape", ".forumlist-mod", ".sohuecdom", ".mod-changyan", ".traffic-exchange", ".mod-shop", ".mod-map"];
    hidelist(array);
    $(".forumShadow").click(function() {
        window.location = "/preview/fallback"
    })
});
