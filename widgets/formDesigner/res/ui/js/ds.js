define(["jquery"], function($) {
    var ds = {}, alert = function(msg) {
        require(["ui"], function(ui) {
            ui.alert(msg);
        });
    };
    ds.local = {_access: function(name) {
            var parts = name.split("."), cur = window.LINEWELL, key = null;
            for (var i in parts) {
                key = parts[i];
                if (cur[key] !== undefined) {
                    cur = cur[key];
                } else {
                    console.error("local access error: name=" + name);
                }
            }
            return cur;
        },get: function(name) {
            return this._access(name);
        },set: function(name, value) {
            var parts = name.split("."), key = parts.pop(), name = parts.join("."), cur = this._access(name);
            cur[key] = value;
        }};
	    /*
	    链接：页面数据：下拉列表
	*/
	ds.page = {
	    list: function (opt) {
	        $.ajax({
	            //url: "/pageui/ajax_page_list",
	        	//url:utils.getAppAction("getAppAction","getLinkPageList"),
	        	url:"app.action?type=mappPageAction&operType=getLinkPageList",
	            type: "GET",
	            data: {
	            	mapp_id: LINEWELL.page.mapp_id
	            },
	            dataType: "json",
	            success: function (data) {
	                if (data.success) {
	                	 var json = {count: 0,list: []};
	                     json.count = data.content.length;
	                	  for (var i in data.content) {
	                          var item = {};
	                          item.id = data.content[i].id;
	                          item.link = "id";
	                          item.name = data.content[i].name;
	                          json.list.push(item);
	                      }
	                      opt.onReady.call(this, json);
	                } else {
	                    alert(data.message);
	                }
	            }
	        });
	    }
	};
    ds.site = {list: function(opt) {
            $.ajax({url: "/post/ajax-list-site",type: "GET",data: {page: opt.page,perpage: opt.perpage},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.category = {list: function(opt) {
            $.ajax({url: "/post/ajax-get-cate",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.post = {search: function(opt) {
            $.ajax({url: "/post/ajax-search-post",type: "GET",data: {q: opt.q,mapp_id: LINEWELL.page.mapp_id},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        },list: function(opt) {
            $.ajax({url: "/post/ajax-list-bycate",type: "GET",data: {category_id: opt.category_id,n_posts: opt.n_posts,mapp_id: LINEWELL.page.mapp_id},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data.items);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.pic = {list: function(opt) {
            var url_prefix = "";
            $.ajax({url: url_prefix + "/appmodel/app.action",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id,page: opt.page, operType: "listPics", type: "mappPictureAction"},dataType: "json",success: function(data) {
                    if (data.success) {
                        opt.onReady.call(this, data.content);
                    } else {
                        alert(data.message);
                    }
                }});
        },post: function(opt) {
        }};
    ds.userpic = {list: function(opt) {
            var url_prefix = "";
            $.ajax({url: url_prefix + "/open/ajax-list-pic",type: "GET",data: {page: opt.page},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.ec = {list: function(opt) {
            $.ajax({url: "/nav/ajax-list-link",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id,type: 13},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.forum = {search: function(opt) {
            $.ajax({url: "/club/apiv1/sites/" + LINEWELL.page.mapp_id + "/topics",type: "GET",data: {query: opt.q},dataType: "json",success: function(data) {
                    var json = {count: 0,list: []};
                    json.count = data.length;
                    for (var i in data) {
                        var item = {};
                        item.id = data[i]._id;
                        item.name = data[i].content;
                        item.link = "/club/apiv1/topics/" + data[i]._id + "/jump-to";
                        json.list.push(item);
                    }
                    opt.onReady.call(this, json);
                }});
        },list: function(opt) {
            $.ajax({url: "/nav/ajax-list-link",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id,type: 6},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.template = {list: function(opt) {
            $.ajax({url: "/template/ajax-list-bytype",type: "GET",data: {type: opt.type,page: opt.page,perpage: opt.perpage,namespace: opt.namespace},dataType: "json",success: function(data) {
                    if (data.ret === 0 && data.data) {
                        opt.onReady.call(this, data.data);
                    }
                }});
        }};
    ds.theme = {list: function(opt) {
            $.ajax({url: "/preview/ajax-list-theme",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id,type: 6},dataType: "json",success: function(data) {
                    if (data.ret === 0) {
                        opt.onReady.call(this, data.data);
                    } else {
                        alert(data.msg);
                    }
                }});
        }};
    ds.haibao = {list: function(opt) {
            $.ajax({url: "/pa/page/backend-api/pages",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id,page: opt.page ? opt.page : 1,page_size: opt.prepage ? opt.prepage : 100,"abstract": 1},dataType: "json",success: function(data) {
                    var results = {count: data.results.total,list: [],page_url: "/pp/page/manage/create?mapp_id=" + LINEWELL.page.mapp_id};
                    for (var i in data.results.list) {
                        var item = {};
                        item.id = data.results.list[i]._id;
                        item.link = "";
                        item.name = data.results.list[i].title;
                        results.list.push(item);
                    }
                    opt.onReady.call(this, results);
                }});
        }};
    ds.supform = {list: function(opt) {
            $.ajax({url: "/pa/survey/surveys",type: "GET",data: {mapp_id: LINEWELL.page.mapp_id,page_no: opt.page,page_size: opt.prepage},dataType: "json",success: function(data) {
                    var results = {count: data.data.totalCount,list: [],supform_url: "/plugin/page-proxy/survey/survey?mapp_id=" + LINEWELL.page.mapp_id};
                    for (var i in data.data.dataList) {
                        var item = {};
                        item.id = data.data.dataList[i].id;
                        item.name = data.data.dataList[i].title;
                        results.list.push(item);
                    }
                    opt.onReady.call(this, results);
                },error: function(e) {
                    var r = {error: e,supform_url: "/plugin/page-proxy/survey/survey?mapp_id=" + LINEWELL.page.mapp_id};
                    opt.onError.call(this, r);
                }});
        }};
    ds.usergroup = {list: function(opt) {
            var mapp_id = LINEWELL.page.mapp_id;
            $.ajax({url: "/club/apiv1/sites/" + mapp_id + "/groups",type: "GET",data: {},dataType: "json",success: function(list) {
                    var results = [], item;
                    for (var i in list) {
                        item = list[i];
                        results.push({id: item.group_id,name: item.title ? item.title : item.name});
                    }
                    opt.onReady.call(this, results);
                },error: function(xhr, status, text) {
                    alert(xhr.responseJSON.msg);
                }});
        }};
    return ds;
});
