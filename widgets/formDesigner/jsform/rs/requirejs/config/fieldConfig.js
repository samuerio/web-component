/**
 * 字段html模板配置
 */
define([],function(){
	
	return {
		"handle": "<div class='handle'></div>",
		"instruct": "<p class='instruct hide'></p>",
		"fieldActions": "<div class='fieldActions hide'><a title='删除' href='#' class='icon-btn faDel'></a></div>",
		
		"COLUMN_TITLE":"<h3 id='stand' style='padding-top:15px;' class='color-blue'>常用类型</h3>",
		"COLUMN_TITLE1":"<h3 id='fancy' style='padding-top:15px;' class='color-blue'>标准类型</h3>",
		//配置是可否編輯的翻譯
		"propertyConfig":{
			"reqd":{"true":"(必填)","false":''}
		},
		 
		"field_li": "<li class='field default' text-multi=1></li>",
		"field_li2": "<li class='line' style='height:2px;widht:100%;background-color:red'></li>",
		"item_checkbox": "<li><input name='CHKED' value='1' class='checkbox' type='checkbox' title='默认选中此项' /><label></label><input name='VAL' type='text' class='l'/><a class='icononly-add' title='添加一个新的选择项'></a><a class='icononly-del' title='删除此选择项'></a></li>",
		"item_radio": "<li><input name='CHKED' value='1' class='radio' type='radio' title='默认选中此项' /><label></label><input name='VAL' type='text' class='l'/><a class='icononly-add' title='添加一个新的选择项'></a><a class='icononly-del' title='删除此选择项'></a></li>",
		"item_dropdown2": "<li><input name='VAL' type='text' class='xl'/><a class='icononly-add' title='添加一个新的选择项'></a><a class='icononly-del' title='删除此选择项'></a></li>",
		"item_other": "<li class='dropReq hide'><input name='CHKED' disabled='disabled' type='radio' title='默认选中此项' /><label>其他</label><input name='OTHER' disabled='disabled' type='text' class='m'/><a class='icononly-del' title='删除此选择项'></a><a style='position:absolute;margin-left:45px;float:right' href='#' class='help' title=''>(?)</a></li>",
		"line_split":"<div class='line' style='height:5px;width:100%;background-color:green;'></div>",
		//地址字段content内填充
		"address_f":"<input name='address' disabled='disabled' placeholder='省-市-县'/><input name='detail' disabled='disabled'  placeholder='详细地址'/>",
		//发起人
		"initiator": {
			"html": "<label class='desc'></label><div class='content'></div>",
			"json": "({LBLCN:'发起人',FTYPE:'initiator',EDIT:'CREATE',DEF:'CURRENTUSER'})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		
		//姓名
		"name": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
			"json": "({LBLCN:'姓名',FTYPE:'name',TOOLTIP:'请输入姓名',REQD:false,EDIT:'CREATE',DEF:'当前用户'})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		//日期控件
		"date":{
			"html": "<label class='desc'>日期 </label><label class='tip'></label><div class='content'></div><div class='inline' style='height:1px;background:#e2e2e2;width:100%;'></div><div class='alarm'>设置提醒</div>",
			"json": "({LBLCN:'日期',FTYPE:'date',REQD:false,EDIT:'CREATE','FMT':'YYYY-MM-DD','WARN':false})",
			"holder": "<li class='field prefocus' style='height:57px;width:97%'></li>"
		},
 
		//部门选择框
		"depts": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><input type='button' value='部门选择' disabled='disabled' maxlength='255' class='input' /></div>",
			"json": "({LBLCN:'部门选择',FTYPE:'depts',TOOLTIP:'请选择',REQD:false,EDIT:'CREATE',DEF:false})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		
		},
		//事项
		"options": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><div class='form-cell'></div></div>",
			"json": "({LBLCN:'事项',FTYPE:'options',TOOLTIP:'请选择',REQD:false,EDIT:'CREATE',ITMS:[{VAL:'选项 1'},{VAL:'选项 2'},{VAL:'选项 3'}],DEF:''})", //数据字典CREATE
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		//金额
		"money": {
			"html": "<div class='money'></div><label class='desc'></label><label class='tip'></label><div class='content'><b>￥</b><input type='text' disabled='disabled' maxlength='16' size='8' class='input' /></div>",
			"json": "({LBLCN:'金额',FTYPE:'money',REQD:false,EDIT:'CREATE',FMT:'yuan'})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		
		//时间区间
		 "ddate":{
			 "html":"<label class='desc top'></label><label class='tip'></label><div class='marrow'></div><div style='clear:both;'></div><div class='inline' style='height:1px;background:#e2e2e2;'></div><label class='desc'></label><label class='tip'></label><div class='marrow'></div><div class='inline' style='height:1px;background:#e2e2e2;width:100%;'></div><div class='alarm'>设置提醒</div>",
			 "json": "({LBLCN:'开始时间','LBLCN1':'结束时间',FTYPE:'ddate',REQD:false,EDIT:'CREATE','FMT':'YYYY-MM-DD','WARN':false})",
			 "holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		  },
		  
		//文件上传
		"file": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><input type='button' disabled='disabled' value='文件上传' /></div>",
			"json": "({LBLCN:'上传文件',FTYPE:'file',TOOLTIP:'请上传',REQD:false,EDIT:'CREATE'})",
			"holder": "<li class='field prefocus' style='height:54px;width:97%'></li>"
		},
		
		//图片上传
		"image_upload": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><input type='button' disabled='disabled' value='图片上传' /></div>",
			"json": "({LBLCN:'上传图片',FTYPE:'image_upload',TOOLTIP:'请上传',REQD:false,EDIT:'CREATE'})",
			"holder": "<li class='field prefocus' style='height:54px;width:97%'></li>"
		},
		
		//用户选择框
	 	"users": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><input type='button'  value='用户选择'   disabled='disabled' maxlength='255' class='input' /></div",
			"json": "({LBLCN:'用户选择',FTYPE:'users',TOOLTIP:'请选择',REQD:false,EDIT:'CREATE',DEF:false})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		
		//标签
		"label": {
			"html": "<label class='desc'></label>",
			"json": "({LBLCN:'描述',FTYPE:'label'})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		
		//文本输入框
		"text": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
			"json": "({LBLCN:'单行文本',FTYPE:'text',TOOLTIP:'请输入',REQD:false,EDIT:'CREATE'})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		//单选框
		"radio": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
			"json": "({LBLCN:'单选框',FTYPE:'radio',TOOLTIP:'请选择',REQD:false,EDIT:'CREATE',ITMS:[{VAL:'选项 1'},{VAL:'选项 2'},{VAL:'选项 3'}],DEF:''})",
			"holder": "<li class='field prefocus' style='height:92px;width:97%'></li>"
		},
		//下拉框
		"dropdown": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><div class='form-cell'></div></div>",
			"json": "({LBLCN:'下拉框',FTYPE:'dropdown',TOOLTIP:'请选择',REQD:false,EDIT:'CREATE',ITMS:[{VAL:'选项 1'},{VAL:'选项 2'},{VAL:'选项 3'}],DEF:''})",
			"holder": "<li class='field prefocus' style='height:46px;width:97%'></li>"
		},
		
		//图片
		"image": {
			"html": "<div class='content'><img  src='/rs/images/defaultimg.png'></div>",
			"json": "({FTYPE:'image',DEF:'../res/skin/images/img/pic-one.png',REQD:false,MARGINSTYLE:''})",
			"holder": "<li class='field prefocus' style='height:271px;width:97%'></li>"
		},
		
		
		//数字输入框
		"number": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
			"json": "({LBLCN:'数字',FTYPE:'number',TOOLTIP:'请输入数字',REQD:false,EDIT:'CREATE',MAX:'',MIN:''})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
			},
		//文本域
		"textarea": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
			"json": "({LBLCN:'多行文本',FTYPE:'textarea',TOOLTIP:'请输入',REQD:false,EDIT:'CREATE'})",
			"holder": "<li class='field prefocus' style='height:179px;width:97%'></li>"
			},
			
		//多选框
	    "checkbox": {
				"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
				"json": "({LBLCN:'多选框',FTYPE:'checkbox',TOOLTIP:'请选择',REQD:false,EDIT:'CREATE',ITMS:[{VAL:'选项 1'},{VAL:'选项 2'}],DEF:''})",
				"holder": "<li class='field prefocus' style='height:92px;width:97%'></li>"
		 	},
		//分隔符
		"separator":{
			"html": "<div class='noLabelAlign'><label class='desc section'></label></div>",
			"json": "({FTYPE:'separator'})",
			"holder": "<li class='field prefocus' style='height:45px;width:97%'></li>"
		},
		
		//电话号码
		"phone": {
				"html": "<label class='desc'></label><label class='tip'></label><div class='content oneline reduction'></div>",
				"json": "({LBLCN:'电话',FTYPE:'phone',TOOLTIP:'请输入电话',REQD:false,FMT:'MOBILE',EDIT:'CREATE'})",
				"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
			},
		//网址
		"url": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
			"json": "({LBLCN:'网址',FTYPE:'url',TOOLTIP:'请输入网址',REQD:false,EDIT:'CREATE'})",
			"holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		},
		//电子邮件
		"email": {
				"html": "<label class='desc'></label><label class='tip'></label><div class='content'></div>",
				"json": "({LBLCN:'Email',FTYPE:'email',TOOLTIP:'请输入邮箱',REQD:false,EDIT:'CREATE'})",
				"holder": "<li class='field prefocus' style='height:41px;width:97%'></li>"
			},
		//地址
		"address": {
			"html": "<label class='desc'></label><label class='tip'></label><div class='content'><div name='address' disabled='disabled' style='width: 90%;margin-right: 20px;'/><div class='inline'></div><div name='detail' disabled='disabled'  placeholder='详细地址' style='padding-left: 0;word-break: break-all;'/></div>",
			"json": "({LBLCN:'地址',FTYPE:'address',REQD:false,EDIT:'CREATE',SUBFLDS:{ZIP:'',PRV:'',CITY:'',DTL:''}})",
			 "holder": "<li class='field prefocus' style='height:177px;width:97%'></li>"
		},
		//子表明细
		 "detailTable":{
			 "html":"<label class='desc'></label><label class='tip'></label><div class='content'><div class='table'  ><div class='warnLi'>可拖入多个组件（不包含明细子表组件）</div></div></div>",
			 "json": "({LBLCN:'明细子表',FTYPE:'detailTable',FIELDS:[]})",
			 "holder": "<li class='field prefocus' style='height:43px;width:97%'></li>"
		 }
	 };
	
});