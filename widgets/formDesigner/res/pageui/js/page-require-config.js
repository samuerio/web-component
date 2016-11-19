(function(require, staticurl) {
	if (window.env === "development") {
		require(["editing_page_debugging"], function() {
			console.log("dev page");
		});
	} else if (window.env === "debugging") {
		require(["editing_page_debugging"], function() {
			console.log("debugging page");
		});
	} else if (window.env === "custom" && window.IdeEntrance) {
		require([window.IdeEntrance], function() {
			console.log("debugging page");
		});
	} else {
		require(["editing_page"], function() {
			console.log("editing page");
		});
	}
})(require, LINEWELL.staticurl);