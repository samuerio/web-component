/**
 * 字段显示配置
 */

define([],function(){
	
	return {
		fieldPropConfig:{
			//发起人
			initiator: ["plabel","pedit","pdefaultValue"],
			//意见
			option: ["plabel", "ptoolTip", "prequired", "pedit","pitems"],
			//日期
//			date: ["plabel", "ptoolTip", "prequired", "pedit","pdateformat","pwarn","check_default"],
			date: ["plabel", "prequired", "pedit","pdateformat","pwarn"],
			//地址
			address:["plabel", "prequired", "pedit","addr_default"],
			//部门选择
			depts: ["plabel", "ptoolTip", "prequired", "pedit","check_default"],
			//事项
			options: ["plabel", "ptoolTip", "prequired", "pedit" ,"pitems"],
			//金额
			money: [ "plabel", "prequired","pmoneyformat", "pedit"],
			//日期区域
//			ddate: ["plabel","plabel1","prequired","pdateformat","pwarn","pedit","check_default"],
			ddate: ["plabel","plabel1","prequired","pdateformat","pwarn","pedit"],
			//文件上传
			file: ["plabel","ptoolTip","prequired", "pedit"],
			//图片上传
			image_upload: ["plabel","ptoolTip","prequired", "pedit"],
			//用户选择
			users: ["plabel", "ptoolTip", "prequired", "pedit","check_default"],
			//标签
			label: ["plabel"],
			//单行文本
			text: ["plabel", "ptoolTip", "prequired","pedit"],
			//单选框
			radio: ["plabel", "ptoolTip", "prequired","pedit","pitems"],
			//下拉框
			dropdown: ["plabel", "ptoolTip", "prequired","pedit","pitems"],
			//图片
			image: ["pimage"],
			//数字
			number: ["plabel", "ptoolTip", "prequired","pedit","prange"],
			//多行文本
			textarea: ["plabel", "ptoolTip", "prequired","pedit"],
			//多选框
			checkbox: ["plabel", "ptoolTip", "prequired","pedit","pitems"],
			//分隔符
			separator: [],
			//明细子表
			detailTable: ["plabel"],
			//姓名
			name: ["plabel", "ptoolTip", "prequired","pedit"],
			//电子邮箱
			email: ["plabel", "ptoolTip", "prequired","pedit"],
			//电话号码
			phone: ["plabel", "ptoolTip", "prequired","pedit","pphoneformat"],
			//url
			url: ["plabel", "ptoolTip", "prequired","pedit"],
			//地图
			map: ["plabel", "ptoolTip", "prequired","pedit"]
		},
	    allProp:[
	             "plabel",//字段标签
	             "plabel1",//第二个字段  字段标签
	             "ptoolTip",//字段提示
	             "ptoolTip1",//第二个字段提示
	             "ptype", //类型
	             "check_default",//check类型的默认选择
	             "addr_default",//地址默认值
	             "pwarn",//提醒
	             "pmaxscore",//最大评分数
	             "pdateformat", //日期格式
	             "pphoneformat", //电话格式
	             "pmoneyformat",// 货币格式
	             "pitems", //选择项
	             "prequired", //必选项配置
	             "pimage", //上传图片
	             "pedit", //字段可见性
	             "prange", //范围
	             "pinstruct", //字段说明 
	             "psection", //分隔描述 
                 "pdefTable",//明细子表
	             "pdefaultValue"//默认内容
	           ]
	}
});