/**
 * app生成
 * @author jliangliang@linewell.com
 * @since 2015/9/9
 */
define([ "jquery", "ui", "libui/utils", "notify", "lib/mustache"], function($, ui, utils, notify, mustache) {
	
	 var versionNum = {};
	 var mess = "应用描述";
	 var appBuild = {
		
		 /**
		  * 初始化数据
		  */
		 initData : function(){
			 var html;
			 $.ajax({
				 url : "app.action?type=mappReleaseAction&operType=getRelease",
				 dataType : "json",
				 type : "post",
				 data : "mAppId=" + utils.getUrlParameter("mapp_id"),
				 success : function(data){
					 
					 // 结果集 
					 ret = data.content;					 
					 
					 // 获得版本号 以.隔开
					 var androidNextVersion = ret.androidNextVersion.split(".");
					 $("#mainVersion").val(androidNextVersion[0]);
					 $("#secondVersion").val(androidNextVersion[1]);
					 $("#thirdVersion").val(androidNextVersion[2]);
					 $("#packNum").text("(今日剩余打包次数:"+ret.androidCurrentRemainPackTime+"次)");
					 
					 if(androidNextVersion.join(".") == "1.0.0"){
						 $("#remarkDel").html("应用描述");
						 $("#refleshInfo").attr("placeholder", "请填写应用描述");
					 }else{
						 mess = "更新说明";
					 }
					 
					 var androidPreVersion = ret.androidPreVersion.split(".");
					 versionNum.androidVersion = androidPreVersion;
					 
					 if(!ret){
						 notify.toast(data.message);
					 }else{
						 html = mustache.render($("#versionInfo").html(), ret);
						 
					 }
					 $(".wrapper").prepend(html);
				 }
			 });
		 },
		 
		 /**
		  * 绑定事件
		  */
		 bindEvent : function(){			 
			 
			 var sendData = {};
			 var self = this;
			 
			 var refleshInfo;
			 
			 // 选择版本
			 $('.checkbox,.app-type').click(function(){
                 $(this).toggleClass('checked');
                
             });
			 
			 
			 $(".app-type").click(function(){
				 $(this).parent().children(".checkbox").click();
			 });
			 
             // 确认生成
			 $("#SubmitBtn").click(function(){
				 var count = 0;
				 refleshInfo = $.trim($("#refleshInfo").val());
				 var infoLen = refleshInfo.length;
				 var $androidCheck = $("#androidCheck");
				 var $iosCheck = $("#iosCheck");
				 var $androidVersion =  $androidCheck.parent().children(".app-version");
				 var $iosVersion =  $iosCheck.parent().children(".app-version");
				 $(".client .checked").each(function(){
			
					 count = count + 1;					 				 
				 });
				 
				// 没有选版本
				 if(count == 0){
					 self.showMsg("请选择需生成的客户端类型！");
					 return;
				 }else if(refleshInfo == ""){
					 self.showMsg("请输入"+mess);
					 return;
				 }else if(infoLen > 400 || infoLen < 2){
					 self.showMsg(mess+",长度为2-400个字！");
					 return;
				 }
				 
				 // 选中android版本
				 if($androidCheck.hasClass("checked")){
					 versionValidate($androidVersion, "androidVersion");
				 }
				 
				 // 选中ios版本
				 if($iosCheck.hasClass("checked")){
					 versionValidate($iosVersion, "iosVersion");
				 }
				 
				 
			 });
			 
			 /**
			  * 版本号验证，获取
			  * @param $version 版本号对象
			  * @param versionType 版本类型
			  */
			 function versionValidate($version, versionType){
				 var version = "";
				 var versions = "";
				 var versionFlag = true;
				 var mainVersion = parseInt($version.children(".mainVersion").val());
				 var secondVersion = $version.children(".secondVersion").val();
				 var thirdVersion = $version.children(".thirdVersion").val();
				 var versionNums = versionNum[versionType][0] + versionNum[versionType][1] + versionNum[versionType][2];
				 
				 // 主版本号为零
				 if(mainVersion == 0){
					 self.showMsg("主版本号不能小于1");
					 return;
					 
				 // 主板本号小于原来
				 }else if(mainVersion < parseInt(versionNum[versionType][0])){
					 self.showMsg("当前填写的版本号过低!");
					 return;
				 }
				 
				 if(secondVersion < parseInt(versionNum[versionType][1]) && thirdVersion <= parseInt(versionNum[versionType][2])){
					 self.showMsg("当前填写的版本号过低!");
					 return;
				 }
				 
				 // 遍历输入框判断
				 $version.children(":input").each(function(){			
					 var $this = $(this);
					 var valVersion = $this.val();
					 var ret = new RegExp(/^(\d){1,2}$/); 
					 
					// 组装版本号 以.隔开
					 if(versions == ""){
						 versions += valVersion;
					 }else{
						 versions += "." + valVersion;
						 
					 }		 
					 
					 if(!ret.test(valVersion)){
						 versionFlag = false;
					 }					 
				 });
					 
				 // 小于原始版本
				 if("999999" == versionNums){
					 self.showMsg("当前版本是最高版本，不能生成APP！");
					 		     
			     // 不合法字符	
				 }else if(!versionFlag){
					 
					 self.showMsg("版本号非有效值，请输入0-99之间的数字");
				 }else{
				 
					// 设置版本号
					sendData[versionType] = versions;
					appPublish();
				 }				 
			 }
			 
			 /**
			  * 生成app
			  */
			 function appPublish(){
				 sendData.remark = refleshInfo;
				 sendData.mAppId = utils.getUrlParameter("mapp_id");
				 sendData.debug = false;
				 
				 $.ajax({
					 url : "app.action?type=mappReleaseAction&operType=packApp",
					 data : sendData,
					 type : "post",
					 dataType : "json",
					 success : function(data){
						 var res = data.content;
						 if(res == "true"){
							 location.href = "appPublish.jsp?mapp_id="+utils.getUrlParameter("mapp_id");
						 }else{
							 self.showMsg(data.message);
						 }						 
					 }				 
				 }); // ajax
			 }
		 },
		 
		 /**
		  * 显示提示信息
		  * @param msg 提示显示
		  */
		 showMsg : function(msg){
			 var $msg = $("#SubmitBtn+.tip");
			 $msg.removeClass("hide").html(msg);
			 
			 // 定时器
			 setTimeout(function(){
				 $msg.addClass("hide");
			 }, 3000);
		 }
	 };
	
	$(function(){
		
		// 初始化数据
		appBuild.initData();
		
		// 绑定事件
		appBuild.bindEvent();
	});
});