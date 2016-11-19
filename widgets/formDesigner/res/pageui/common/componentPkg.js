/**
 * 组件包
 */
define(function(){
	
	return{
		pkgList : [ {
			"submit_version" : "6.6.17",
			"is_theme" : true,
			"states" : [ 100 ],
			"code" : "system_plugin",
			"is_plugin" : true,
			"default_open" : true,
			"category" : 4,
			"app_type" : [ "plugin", "theme" ],
			"title" : "\u7cfb\u7edf\u63d2\u4ef6\u5305", // 系统插件包
			"proxy-paths" : {
				"common" : "*"
			},
			"brief" : "\u63d0\u4f9b\u4e86\u7cfb\u7edf\u9ed8\u8ba4\u7684\u4e00\u4e9b\u5c0f\u7ec4\u4ef6,\u5efa\u8bae\u5f00\u542f,\u65b9\u4fbf\u5efa\u7ad9.", //提供了系统默认的一些小组件,建议开启,方便建站
			"version" : "6.6.17",
			"icon" : "",
			"oauth-callback-url" : null,
			"entrance" : "",
			"price" : 0,
			"app_key" : "XmuJFz3JRPqLmdmr2uLd89mn",
			"user_id" : "1",
			"closable" : true,
			"utime" : 1407466566000,
			"vtime" : 1437960850000,
			"ctime" : 1404443256000,
			"cover" : "http:\/\/7bede40ef4e00.cdn.sohucs.com\/d62de7760c70c5e15ec981b5f4012178",
			"components" : [
					{
						"category" : 2,
						"ename" : "system_plugin\/text",
						"name" : "text",
						"data_config" : {
							"align" : {
								"default" : "left",
								"required" : false,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"richtext" : {
								"default" : "\u9ed8\u8ba4\u6587\u672c", // 默认文本
								"widget" : {
									"opt" : {
										"class" : "mod-text"
									},
									"data_name" : "richtext",
									"type" : "richtext",
									"label" : ""
								},
								"required" : true,
								"type" : "string"
							}
						},
						"title" : "\u6587\u672c", // 文本
						"font_icon" : "&#xE602;",
						"_kz_edit_css" : true,
						"_kz_style_css" : false,
						"html" : "<div class=\"mod mod-text {{class}}\" style=\"margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};background:{{background}}\">{{richtext}}<\/div>",
						"eid" : "16",
						"version" : "6.6.17",
						"widgets" : {
							"style" : [ {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"opt" : {
									"class" : "mod-text"
								},
								"data_name" : "richtext",
								"type" : "richtext",
								"label" : ""
							}, {
								"data_name" : "align"
							}, {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"image_icon" : "",
						"seq" : 1000000,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 2,
						"ename" : "system_plugin\/pic",
						"name" : "pic",
						"data_config" : {
							"link_res_type" : {
								"default" : 0,
								"vd_rules" : {
									"expect" : {
										"values" : [ 0, 1, 2, 3 ]
									}
								},
								"required" : true,
								"type" : "enum"
							},
							"link_res_id" : {
								"default" : 0,
								"vd_rules" : [

								],
								"required" : true,
								"type" : "int"
							},
							"image" : {
								"default" : "\/res\/skin\/images\/img\/pic-one.png",
								"vd_rules" : [

								],
								"required" : true,
								"type" : "string"
							},
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"image_id" : {
								"default" : 0,
								"vd_rules" : [

								],
								"required" : true,
								"type" : "int"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"link" : {
								"default" : "javascript:;",
								"vd_rules" : [

								],
								"required" : true,
								"type" : "string"
							},
							"link_res_name" : {
								"default" : "",
								"vd_rules" : [

								],
								"required" : true,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							}
						},
						"title" : "\u56fe\u7247", // 图片
						"font_icon" : "&#xe60B;",
						"_kz_edit_css" : false,
						"_kz_style_css" : false,
						"html" : "<div class=\"mod mod-pic mod-picone\" style=\"margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};\">{{#link}}<a href=\"{{link}}\">{{\/link}}<img src=\"{{image}}\" title=\"{{alt}}\" height=\"{{height}}\" data-imgid=\"{{image_id}}\" fit=\"{{fit}}\">{{#link}}<\/a>{{\/link}} <\/div>",
						"eid" : "18",
						"version" : "6.6.17",
						"widgets" : {
							"style" : [ {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"data_name" : "image"
							}, {
								"data_name" : "image_id"
							}, {
								"data_name" : "link"
							}, {
								"data_name" : "link_res_type"
							}, {
								"data_name" : "link_res_id"
							}, {
								"data_name" : "link_res_name"
							}, {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"image_icon" : "",
						"seq" : 1000001,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 2,
						"ename" : "system_plugin\/focus",
						"name" : "focus",
						"seq" : 1000003,
						"title" : "\u7ec4\u56fe", // 组图
						"font_icon" : "&#xE60A;",
						"_kz_edit_css" : false,
						"data_config" : {
							"automove" : {
								"default" : "false",
								"required" : true,
								"type" : "string"
							},
							"items" : {
								"default" : [ {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"text" : "\u5728\u9009\u9879\u4e2d\u53ef\u4ee5\u6dfb\u52a0\u56fe\u7247\u63cf\u8ff0", // 在选项中可以添加图片描述
									"image" : "\/res\/skin\/images\/img\/default-focus.png",
									"image_id" : 0,
									"link" : "javascript:;",
									"link_res_name" : "",
									"show_text" : true
								} ],
								"vd_rules" : {
									"array" : {
										"object" : {
											"link_res_type" : {
												"default" : 0,
												"vd_rules" : {
													"expect" : {
														"values" : [ 0, 1, 2, 3 ]
													}
												},
												"required" : true,
												"type" : "enum"
											},
											"link_res_id" : {
												"default" : 0,
												"vd_rules" : [

												],
												"required" : true,
												"type" : "int"
											},
											"image" : {
												"default" : "\/res\/skin\/images\/img\/default-pg.png",
												"vd_rules" : [

												],
												"required" : true,
												"type" : "string"
											},
											"image_id" : {
												"default" : 0,
												"vd_rules" : [

												],
												"required" : true,
												"type" : "int"
											},
											"link" : {
												"default" : "javascript:;",
												"vd_rules" : [

												],
												"required" : true,
												"type" : "string"
											},
											"link_res_name" : {
												"default" : "",
												"vd_rules" : [

												],
												"required" : true,
												"type" : "string"
											}
										}
									}
								},
								"required" : true,
								"type" : "array"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"height_percent" : {
								"category" : "style",
								"default" : "75%",
								"widget" : {
									"opt" : {
										"theme" : "three-col",
										"name" : "height_percent",
										"options" : [ {
											"content" : "4:3",
											"value" : "75%"
										}, {
											"content" : "16:9",
											"value" : "56.2%"
										}, {
											"content" : "2:1",
											"value" : "50%"
										} ]
									},
									"data_name" : "height_percent",
									"type" : "typeselect",
									"label" : "\u56fe\u7247\u6bd4\u4f8b" // 图片比例
								},
								"required" : false,
								"type" : "string"
							}
						},
						"_kz_style_css" : true,
						"html" : "<div {{_progdata_}} class=\"mod mod-focus\" data-auto=\"{{automove}}\" style=\"margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};\" {{#eid}}data-eid=\"{{eid}}\"{{\/eid}}> <div class=\"focus-w\"><div id='slider' class='swipe'><div class='swipe-wrap' style=\"padding-bottom:{{height_percent}}\">{{#items}} <div>{{#show_link}}<a href=\"{{link}}\">{{\/show_link}}<img src=\"{{image}}\" alt=\"\" data-imgid=\"{{image_id}}\" fit=\"{{fit}}\">{{#show_text}}<p {{#unshow}}style=\"display:none;\"{{\/unshow}}>{{text}}<\/p>{{\/show_text}}{{#show_link}}<\/a>{{\/show_link}}<\/div>{{\/items}}{{^items}}<div><a><img src=\"{{_staticurl_}}\/res\/skin\/images\/img\/default-focus.png\"><\/a><\/div>{{\/items}} <\/div> <\/div> <div class=\"focus-ctr\">{{#items}} <span class=\"\"><\/span>{{\/items}} <\/div> <\/div> <\/div>",
						"eid" : "20",
						"version" : "6.6.17",
						"example_json" : {
							"items" : [

							]
						},
						"widgets" : {
							"style" : [ {
								"opt" : {
									"theme" : "three-col",
									"name" : "height_percent",
									"options" : [ {
										"content" : "4:3",
										"value" : "75%"
									}, {
										"content" : "16:9",
										"value" : "56.2%"
									}, {
										"content" : "2:1",
										"value" : "50%"
									} ]
								},
								"data_name" : "height_percent",
								"type" : "typeselect",
								"label" : "\u56fe\u7247\u6bd4\u4f8b" // 图片比例
							}, {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							}, {
								"opt" : {
									"name" : "chk_automove"
								},
								"data_name" : "auto_move",
								"type" : "switchrow",
								"label" : "\u81ea\u52a8\u8f6e\u64ad" // 自动轮播
							} ],
							"property" : [ {
								"data_name" : "items"
							}, {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"image_icon" : "",
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : "2",
						"ename" : "system_plugin\/link",
						"name" : "link",
						"data_config" : {
							"link_res_type" : {
								"default" : 3,
								"required" : false,
								"type" : "enum"
							},
							"link_res_id" : {
								"default" : "",
								"vd_rules" : [

								],
								"required" : false,
								"type" : "string"
							},
							"text" : {
								"widget" : {
									"opt" : {
										"theme" : "simple",
										"class" : "mod-link"
									},
									"data_name" : "text",
									"type" : "richtext",
									"label" : "\u94fe\u63a5\u6587\u5b57" // 链接文字
								},
								"vd_msg" : {
									"*" : "",
									"chlength_too_long" : "\u94fe\u63a5\u6587\u5b57\u4e0d\u80fd\u8d85\u8fc7100\u4e2a\u5b57", //链接文字不能超过100个字

									"chlength_too_short" : "\u4e0d\u80fd\u4e3a\u7a7a" // 不能为空
								},
								"default" : "\u94fe\u63a5\u6587\u5b57", // 链接文字
								"required" : true,
								"vd_rules" : {
									"chLength" : {
										"stripHtml" : true, // 输入链接可带html
										"max" : 200, // 长度最长限制
										"min" : 1
									}
								},
								"type" : "string"
							},
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"theme" : {
								"default" : "t0",
								"vd_rules" : {
									"expect" : {
										"values" : [ "t0", "t1", "t2", "t3" ]
									}
								},
								"required" : false,
								"type" : "enum"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"link" : {
								"default" : "",
								"vd_rules" : [

								],
								"required" : false,
								"type" : "string"
							},
							"link_res_name" : {
								"default" : "",
								"required" : false,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							}
						},
						"title" : "\u94fe\u63a5", // 链接
						"font_icon" : "&#xE609;",
						"_kz_edit_css" : false,
						"_kz_style_css" : false,
						"html" : "<div class=\"mod mod-link {{theme}}\" style=\"margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};\"> <h2><a href=\"{{link}}\">{{text}}<\/a><\/h2><\/div>",
						"eid" : "8",
						"version" : "6.6.17",
						"widgets" : {
							"style" : [ {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"opt" : {
									"theme" : "simple",
									"class" : "mod-link"
								},
								"data_name" : "text",
								"type" : "richtext",
								"label" : "\u94fe\u63a5\u6587\u5b57" // 链接文字
							}, {
								"data_name" : "link"
							}, {
								"data_name" : "link_res_type"
							}, {
								"data_name" : "link_res_id"
							}, {
								"data_name" : "link_res_name"
							}, {
								"data_name" : "background"
							}, {
								"data_name" : "theme"
							}, {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"seq" : 1000002,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 1,
						"ename" : "system_plugin\/divider", // 分隔符
						"name" : "divider",
						"data_config" : {
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"width" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"max" : 100,
										"unit" : "%",
										"min" : 0
									},
									"data_name" : "width",
									"type" : "slider",
									"label" : "\u5bbd\u5ea6" // 宽度
								},
								"default" : "50%",
								"required" : true,
								"vd_rules" : {
									"match" : "\/^[0-9]{1,3}%$\/"
								},
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							}
						},
						"title" : "\u5206\u9694\u7b26", // 分隔符
						"font_icon" : "&#xE615;",
						"_kz_edit_css" : false,
						"_kz_style_css" : true,
						"html" : "<div class=\"mod mod-divider\" style='margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};'><hr style=\"width:{{width}}\"><\/div>",
						"eid" : "6",
						"version" : "6.6.17",
						"widgets" : {
							"style" : [ {
								"opt" : {
									"max" : 100,
									"unit" : "%",
									"min" : 0
								},
								"data_name" : "width",
								"type" : "slider",
								"label" : "\u5bbd\u5ea6" // 宽度
							}, {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"image_icon" : "",
						"seq" : 1000015,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : "1",
						"ename" : "system_plugin\/layout2coloums",
						"name" : "layout2coloums",
						"data_config" : {
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							}
						},
						"title" : "\u53cc\u680f", // 双栏
						"font_icon" : "&#xE612;",
						"_kz_edit_css" : true,
						"_kz_style_css" : false,
						"html" : "<div class=\"mod mod-layout2coloums mod-column mod-2column\" style=\"margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};\"><div class=\"devide-con\">{{#items}} <div class=\"cell\" style=\"width:{{width}};\">{{content}}<\/div>{{\/items}}    <\/div><\/div>",
						"eid" : "14",
						"version" : "6.6.17",
						"widgets" : {
							"style" : [ {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"image_icon" : "",
						"seq" : 1000016,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : "1",
						"status" : null,
						"update_time" : "1376017315",
						"name" : "space",
						"seq" : 1000017,
						"ename" : "system_plugin\/space", // 留空的图标
						"font_icon" : "&#xE617;",
						"area" : "10",
						"data_config" : {
							"height" : {
								"category" : "style",
								"default" : "36px",
								"widget" : {
									"opt" : {
										"max" : 200,
										"unit" : "px",
										"min" : 5
									},
									"data_name" : "height",
									"type" : "slider",
									"label" : "\u9ad8\u5ea6" // 高度
								},
								"required" : true,
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							}
						},
						"_kz_style_css" : true,
						"html" : "<div class=\"mod mod-space\" style=\"margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};\"><div class=\"space\" style=\"height:{{height}}\"><\/div><\/div>",
						"create_time" : "1374655801",
						"eid" : "5",
						"version" : "6.6.17",
						"example_json" : {
							"height" : "36px"
						},
						"widgets" : {
							"style" : [ {
								"opt" : {
									"max" : 200,
									"unit" : "px",
									"min" : 5
								},
								"data_name" : "height",
								"type" : "slider",
								"label" : "\u9ad8\u5ea6" // 高度
							}, {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"title" : "\u7559\u7a7a", //  留空
						"_kz_edit_css" : false,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : "1",
						"ename" : "system_plugin\/layout_floor", // 底板
						"name" : "layout_floor",
						"data_config" : {
							"background-image" : {
								"require" : false,
								"type" : "string"
							},
							"background-size" : {
								"default" : "100% 100%",
								"require" : false,
								"type" : "string"
							},
							"background-repeat" : {
								"require" : false,
								"type" : "string"
							},
							"margin-right" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-bottom" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"margin-top" : {
								"category" : "style",
								"widget" : {
									"opt" : {
										"content" : {
											"type" : "margin"
										},
										"name" : "chk_margin"
									},
									"data_name" : "margin-top",
									"type" : "switchrow",
									"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
								},
								"required" : false,
								"type" : "string"
							},
							"margin-left" : {
								"category" : "style",
								"required" : false,
								"type" : "string"
							},
							"class" : {
								"default" : "",
								"require" : false,
								"type" : "string"
							},
							"background-color" : {
								"default" : "",
								"type" : "string"
							}
						},
						"title" : "\u5e95\u677f", //底板
						"font_icon" : "&#xE618;",
						"_kz_edit_css" : false,
						"_kz_style_css" : true,
						"html" : "<div class=\"mod mod-layout_floor {{class}}\" data-role=\"sub-container\" style=\"background-size:{{background-size}};margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};background-color:{{background-color}};{{#background-image}}background-image:url({{background-image}});{{\/background-image}}{{#background-repeat}}background-repeat:{{background-repeat}}{{\/background-repeat}}\">{{content}}<\/div>",
						"eid" : "114",
						"version" : "6.6.17",
						"widgets" : {
							"wiki" : [ {
								"href" : "http:\/\/wiki.kuaizhan.com\/pub\/%E7%BB%84%E4%BB%B6%E4%BB%8B%E7%BB%8D\/%E5%BA%95%E6%9D%BF",
								"title" : "\u5982\u4f55\u4f7f\u7528" // 如何使用
							} ],
							"style" : [ {
								"opt" : {
									"content" : {
										"name" : "background-color"
									},
									"name" : "chk_background-color"
								},
								"data_name" : "background-color",
								"type" : "switchrow",
								"label" : "\u4fee\u6539\u80cc\u666f\u8272" // 修改背景色
							}, {
								"opt" : {
									"content" : {
										"name" : "background-image"
									},
									"name" : "chk_background-image"
								},
								"data_name" : "background-image",
								"type" : "switchrow",
								"label" : "\u6dfb\u52a0\u80cc\u666f\u56fe" // 添加背景图
							}, {
								"opt" : {
									"content" : {
										"type" : "margin"
									},
									"name" : "chk_margin"
								},
								"data_name" : "margin-top",
								"type" : "switchrow",
								"label" : "\u8c03\u6574\u8fb9\u8ddd" // 调整边距
							} ],
							"property" : [ {
								"data_name" : "class"
							}, {
								"data_name" : "background-repeat"
							}, {
								"data_name" : "background-size"
							}, {
								"data_name" : "margin-right"
							}, {
								"data_name" : "margin-bottom"
							}, {
								"data_name" : "margin-left"
							} ]
						},
						"image_icon" : "",
						"seq" : 1000029,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 0,
						"ename" : "system_plugin\/theme-nav-28",
						"name" : "theme-nav-28",
						"data_config" : {
							"opacity" : {
								"default" : 1,
								"type" : "float"
							},
							"items" : {
								"default" : [ {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5934\u6761", // 头条
									"link" : "javascript:;",
									"link_res_name" : "",
									"icon" : "\ue004"
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u4f53\u80b2", // 体育
									"link" : "javascript:;",
									"link_res_name" : "",
									"icon" : "\ue004"
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5a31\u4e50", // 娱乐
									"link" : "javascript:;",
									"link_res_name" : "",
									"icon" : "\ue004"
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u8d22\u7ecf", // 财经
									"link" : "javascript:;",
									"link_res_name" : "",
									"icon" : "\ue004"
								} ],
								"type" : "array"
							},
							"navtype" : {
								"default" : "mod-themenav2-type2",
								"type" : "string"
							}
						},
						"title" : "\u5bfc\u822a2", //  导航2
						"font_icon" : "",
						"_kz_edit_css" : true,
						"_kz_style_css" : true,
						"html" : "<div id=\"js-theme-nav\" class=\"mod mod-themenav2 {{navtype}}\"  style=\"opacity: {{opacity}}\"><div class=\"module\"><ul class=\"wrapper\">{{#items}}<li><a href=\"{{link}}\" ><p class=\"font-ico\">{{icon}}<\/p><p class=\"title\">{{title}}<\/p> <\/a><\/li>{{\/items}}<\/ul><\/div><\/div>",
						"eid" : 28,
						"version" : "6.6.17",
						"widgets" : {
							"style" : [
									{
										"data_name" : "opacity"
									},
									{
										"category" : "content",
										"opt" : {
											"theme" : "two-col",
											"options" : [
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-1.png?v=4.5\">",
														"value" : "28"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-2.png?v=4.5\">",
														"value" : "23"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-3.png?v=4.5\">",
														"value" : "29"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-4.png?v=4.5\">",
														"value" : "30"
													} ]
										},
										"data_name" : "nav_type",
										"type" : "typeselect",
										"label" : "\u5bfc\u822a\u6837\u5f0f" // 导航样式
									} ],
							"property" : [ [

							] ]
						},
						"seq" : 1000026,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 0,
						"ename" : "system_plugin\/theme-nav-29",
						"name" : "theme-nav-29",
						"data_config" : {
							"opacity" : {
								"default" : 1,
								"type" : "float"
							},
							"items" : {
								"default" : [ {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5934\u6761", // 头条
									"selected" : true,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u4f53\u80b2", // 体育
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5a31\u4e50", // 娱乐
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u8d22\u7ecf", // 财经
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								} ],
								"category" : "property",
								"widget" : {
									"category" : "content",
									"opt" : {
										"max" : 10,
										"min" : 2
									},
									"data_name" : "items",
									"type" : "grouplink",
									"label" : ""
								},
								"type" : "array",
								"vd_rules" : [

								]
							}
						},
						"title" : "\u5bfc\u822a3", //  导航3
						"font_icon" : "",
						"_kz_edit_css" : false,
						"_kz_style_css" : false,
						"html" : "<div id=\"js-theme-nav\" class=\"mod mod-themenav4\" style=\"opacity: {{opacity}}\"><a href=\"javascript:;\"><i class=\"font-ico\"><\/i><\/a><div class=\"dropbox\"><ul>{{#items}}<li><a href=\"{{link}}\">{{title}}<\/a><\/li>{{\/items}}<\/ul><span class=\"ico-arrow\"><em class=\"ico-arrow-bd\"><\/em><em class=\"ico-arrow-bg\"><\/em><\/span><\/div><\/div>",
						"eid" : 29,
						"version" : "6.6.17",
						"widgets" : {
							"style" : [
									{
										"data_name" : "opacity"
									},
									{
										"category" : "content",
										"opt" : {
											"theme" : "two-col",
											"options" : [
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-1.png?v=4.5\">",
														"value" : "28"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-2.png?v=4.5\">",
														"value" : "23"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-3.png?v=4.5\">",
														"value" : "29"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-4.png?v=4.5\">",
														"value" : "30"
													} ]
										},
										"data_name" : "nav_type",
										"type" : "typeselect",
										"label" : "\u5bfc\u822a\u6837\u5f0f" // 导航样式
									} ],
							"property" : [ {
								"category" : "content",
								"opt" : {
									"max" : 10,
									"min" : 2
								},
								"data_name" : "items",
								"type" : "grouplink",
								"label" : ""
							} ]
						},
						"seq" : 1000027,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 0,
						"ename" : "system_plugin\/theme-nav-30",
						"name" : "theme-nav-30",
						"data_config" : {
							"opacity" : {
								"default" : 1,
								"type" : "float"
							},
							"items" : {
								"default" : [ {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5934\u6761", // 头条
									"selected" : true,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u4f53\u80b2", // 体育
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5a31\u4e50", // 娱乐
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u8d22\u7ecf", // 财经
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								} ],
								"category" : "property",
								"widget" : {
									"category" : "content",
									"opt" : {
										"max" : 10,
										"min" : 2
									},
									"data_name" : "items",
									"type" : "grouplink",
									"label" : ""
								},
								"type" : "array",
								"vd_rules" : [

								]
							}
						},
						"title" : "\u5bfc\u822a4", //  导航4
						"font_icon" : "",
						"_kz_edit_css" : false,
						"_kz_style_css" : false,
						"html" : "<div id=\"js-theme-nav\" class=\"mod mod-themenav3\" style=\"opacity: {{opacity}}\"><ul>{{#items}}{{#selected}}<li class=\"cur\"><a href=\"{{link}}\">{{title}}<i class=\"font-ico\">\ue065<\/i><\/a><\/li>{{\/selected}}{{^selected}}<li><a href=\"{{link}}\">{{title}}<i class=\"font-ico\">\ue065<\/i><\/a><\/li>{{\/selected}}{{\/items}}<\/ul><\/div>",
						"eid" : 30,
						"version" : "6.6.17",
						"widgets" : {
							"style" : [
									{
										"data_name" : "opacity"
									},
									{
										"category" : "content",
										"opt" : {
											"theme" : "two-col",
											"options" : [
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-1.png?v=4.5\">",
														"value" : "28"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-2.png?v=4.5\">",
														"value" : "23"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-3.png?v=4.5\">",
														"value" : "29"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-4.png?v=4.5\">",
														"value" : "30"
													} ]
										},
										"data_name" : "nav_type",
										"type" : "typeselect",
										"label" : "\u5bfc\u822a\u6837\u5f0f" // 导航样式
									} ],
							"property" : [ {
								"category" : "content",
								"opt" : {
									"max" : 10,
									"min" : 2
								},
								"data_name" : "items",
								"type" : "grouplink",
								"label" : ""
							} ]
						},
						"seq" : 1000028,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					},
					{
						"category" : 0,
						"ename" : "system_plugin\/theme-nav-23",
						"name" : "theme-nav-23",
						"data_config" : {
							"opacity" : {
								"default" : 1,
								"type" : "float"
							},
							"items" : {
								"default" : [ {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5934\u6761", // 头条
									"selected" : true,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u4f53\u80b2", // 体育
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u5a31\u4e50", // 娱乐
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								}, {
									"link_res_type" : 0,
									"link_res_id" : 0,
									"title" : "\u8d22\u7ecf", // 财经
									"selected" : false,
									"link" : "javascript:;",
									"link_res_name" : ""
								} ],
								"category" : "property",
								"widget" : {
									"category" : "content",
									"opt" : {
										"max" : 10,
										"min" : 2
									},
									"data_name" : "items",
									"type" : "grouplink",
									"label" : ""
								},
								"type" : "array",
								"vd_rules" : [

								]
							}
						},
						"title" : "\u5bfc\u822a1", // 导航1
						"font_icon" : "",
						"_kz_edit_css" : false,
						"_kz_style_css" : true,
						"html" : "<div id=\"js-theme-nav\" class=\"mod mod-themenav1\" style=\"opacity: {{opacity}}\"><ul>{{#items}}{{#selected}}<li class=\"cur\"><a href=\"{{link}}\">{{title}}<\/a><i><\/i><\/li>{{\/selected}}{{^selected}}<li><a href=\"{{link}}\">{{title}}<\/a><\/li>{{\/selected}}{{\/items}}<\/ul><\/div>",
						"eid" : 23,
						"version" : "6.6.17",
						"widgets" : {
							"style" : [
									{
										"data_name" : "opacity"
									},
									{
										"category" : "content",
										"opt" : {
											"theme" : "two-col",
											"options" : [
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-1.png?v=4.5\">",
														"value" : "28"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-2.png?v=4.5\">",
														"value" : "23"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-3.png?v=4.5\">",
														"value" : "29"
													},
													{
														"content" : "<img src=\"http:\/\/s0.kuaizhan.com\/res\/skin\/images\/img\/theme-4.png?v=4.5\">",
														"value" : "30"
													} ]
										},
										"data_name" : "nav_type",
										"type" : "typeselect",
										"label" : "\u5bfc\u822a\u6837\u5f0f" // 导航样式
									} ],
							"property" : [ {
								"category" : "content",
								"opt" : {
									"max" : 10,
									"min" : 2
								},
								"data_name" : "items",
								"type" : "grouplink",
								"label" : ""
							} ]
						},
						"seq" : 1000025,
						"is_open" : true,
						"is_paid" : true,
						"is_free" : true
					}

			],

			"proxy-prefixes" : {
				"manage-api" : "",
				"backend-api" : "",
				"backend-page" : "",
				"api" : "",
				"common" : "",
				"manage-page" : "",
				"page" : ""
			},
			"jump-prefixes" : null,
			"_id" : "53b68af8670ca92825ff0d0c",
			"is_paid" : true,
			"is_free" : true,
			"is_open" : true
		}

		];
	}
})