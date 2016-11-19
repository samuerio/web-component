(function(g, $) {
	var apiurl = "http://pv.kuaizhan.com/",
		cookie_name = "kz.sohu.uuid",
		pagedata = g.SOHUZ.page,
		site_id = pagedata.site_id,
		setCookie = function(name, domain, value) {
			var now = new Date,
				time = now.getTime() + 1e3 * 86400 * 365;
			now.setTime(time);
			document.cookie = name + "=" + value + "; expires=" + now.toGMTString() + "; path=/;domain=" + domain
		},
		getCookie = function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg)) return unescape(arr[2]);
			else return null
		},
		gif_req = function(url, data, goto_url) {
			var d = [];
			for (var i in data) {
				d.push("" + i + "=" + encodeURIComponent(data[i]))
			}
			url = url + d.join("&");
			var img = new Image;
			if (goto_url) {
				var cback = function() {
					window.location.href = goto_url
				};
				img.onload = cback;
				img.onerror = cback
			}
			img.src = url
		},
		jsonpRequest = function(url, data, callback) {
			var self = this;
			$.ajax({
				url: url,
				type: "GET",
				data: data,
				dataType: "jsonp",
				jsonp: "jsonpcallback",
				success: function(data) {
					callback.call(self, data)
				},
				error: function(data) {}
			})
		},
		setPv = function() {
			var uuid = getCookie(cookie_name),
				utime = new Date;
			var refer = document.referrer;
			if (refer) {
				var index = refer.indexOf("/", 7);
				if (index > 0) {
					refer = refer.substr(0, index + 1)
				}
			} else {
				refer = "http://" + document.domain + "/"
			}
			var pageurl = window.location.href;
			gif_req(apiurl + "pv.gif?", {
				uuid: uuid,
				siteid: site_id,
				time: utime.getTime(),
				refer: refer,
				pageurl: pageurl
			})
		},
		setAdClick = function(goto_url) {
			var uuid = getCookie(cookie_name),
				utime = new Date;
			gif_req(apiurl + "ad.gif?", {
				uuid: uuid,
				siteid: site_id,
				time: utime.getTime()
			}, goto_url)
		},
		setZujian = function(ele_type) {
			var uuid = getCookie(cookie_name),
				ele_id = 1,
				utime = new Date;
			gif_req(apiurl + "zujian.gif?", {
				uuid: uuid,
				siteid: site_id,
				time: utime.getTime(),
				type: ele_type,
				moduleid: ele_id
			})
		};
	if (!getCookie(cookie_name)) {
		jsonpRequest(apiurl + "getUUID.do", {
			siteid: site_id
		}, function(data) {
			setCookie(cookie_name, window.location.host.split(":")[0], data.uuid);
			setPv()
		})
	} else {
		setPv()
	}
	$(function() {
		$(".mod-button[data-eid='34']").on("click", function() {
			setZujian(34)
		});
		$.ajax({
			dataType: "jsonp",
			url: SOHUZ.CONF.url_api + "/adt/ajax-get-ad-info",
			cache: false,
			jsonpCallback: "jsonp_adt",
			data: {
				site_id: pagedata.site_id
			},
			success: function(data) {
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
						var footer = $("#phone-main footer");
						if (footer.length > 0) {
							footer.prepend(data["ad_info"])
						} else {
							$('<footer class="kz-footer">' + data["ad_info"] + "</footer>").insertAfter("#page-content")
						}
					}
					$(".ad_tap_class").on("click", function(e) {
						e.preventDefault();
						setAdClick(this.href)
					})
				} else {}
			}
		})
	})
})(this, Zepto);