<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.linewell.ccip.api.commonbean.bean.LoginInfo"%>
<%@page import="com.linewell.ccip.appcommon.utils.AppSessionUtils"%>
<%@page import="com.linewell.ccip.appmodel.utils.AppFileUtils"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
LoginInfo loginInfo = AppSessionUtils.getLoginInfo(request);

String mAppId = request.getParameter("mapp_id");
String moduleId = request.getParameter("moduleId");
String formId = request.getParameter("formId");
String pageType = request.getParameter("page_type");
%>
<!DOCTYPE>

<html>
 <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="keywords" content="jsform,表单大师,在线表单,自定义表单,表单设计器">
        <meta name="description" content="表单大师提供的表单设计器，支持文本、图片、商品、单选、多选，下拉等多种输入类型，通过简单属性设置就能创建在线订单,客户关系管理,CRM,办公系统,OA,市场调研,满意度调查,报名表,反馈表,申请表,登记表。">
        <title>表单设计</title>

        <link type="text/css" rel="stylesheet" href="rs/css/common.css?v=20150723" />
        <link type="text/css" rel="stylesheet" href="rs/css/formbuild.css?v=20150723" />
        <link rel="stylesheet" type="text/css" href="../res/ui/css/base-new.css" />
      	<link rel="stylesheet" type="text/css" href="../res/ui/css/base.css" />
        <link rel="stylesheet" type="text/css" href="../res/skin/css/pubpage.css" />
        <link rel="stylesheet" type="text/css" href="../res/ui/css/screen.css" />
        <link rel="stylesheet" type="text/css" href="../res/skin/css/drag.css" />
        <link rel="stylesheet" type="text/css" href="../res/pageui/css/formView.css"/>
        <link rel="stylesheet" type="text/css" href="../res/preview/css/preview.css"/>
        <link rel="stylesheet" type="text/css" href="../res/pageui/css/moduleLib.css"/>
        <link rel="stylesheet" type="text/css" href="../res/pageui/css/popBox.css"/>
        <script src="../res/skin/js/lib/jquery-2.1.0.js?v=4.6"></script>
        <style type="text/css">
        #imageStyle{
        	padding:15px;
        }
        
        #imageStyle .form-row>label{
        	display:inline-block;
        	margin-right:15px;
        	vertical-align:top;
        }
        </style>
    </head>

    <body>
      	<%@include file="../template/head.jsp"%>
        <div id="status" class="status hide">
            <div id="y" class="y" style="top:0xp;left:0px">
                <div id="statusText" class="statusText">正在加载中..</div>
            </div>
        </div>
          <div id="container" class="content">
            <div id="left" class="left-box">

                <ul id="tabs" class="g hide">
                    <li id="t1"><a href="javascript:void(0);" title="向表单中添加字段">添加字段</a></li>
                </ul>
                <div class="sub-header">组件</div>
                <div id="addFields" class="overhide">

                </div>
                <!-- addFields -->

            </div>
            <!-- left end -->

            <div id="right" class="right-box editing_phone">
                <div class="forms right-top-bar">
                    <div id="fbForm" class="page-pub-ctr">
                        <div class="left-con btn-con">
                           
                  <!--      <a href="javascript:void(0)" disable="disable" class="undo"><i
                            class="icon-pre icon-undo"></i>撤销</a>
                            <a href="javascript:void(0)" disable="disable" class="redo"><i class="icon-pre icon-redo"></i>恢复</a> -->
                            <a href="javascript:void(0)" class="copy" id="copy">
                            <i class="icon-pre icon-copy"></i>复制</a>
                            <a href="javascript:void(0)" disable="disable" id="paste" class="paste"><i class="icon-pre icon-paste"></i>粘贴</a>
                             
                            <a href="javascript:void(0);" class="button hide" title="流程设计" id="flowDesigner">流程设计</a>
                            <a href="javascript:void(0);" class="button" title="保存表单" id="saveForm" disabledSend="false">保存</a>
                            <a href="javascript:void(0);" class="button" title="预览" id="pView">预览</a>
                            <a href="javascript:void(0);" class="button setting approveSetting hide" title="删除当前字段" id="formSet">审批设置</a>
                             <a href="javascript:void(0);" class="button approveSetting hide" title="设置" id="reSetting">设置</a>
                        
                        </div>
                    </div>
                </div>
                
<!--                 <div id="nofields" class="notice hide" style="margin:10px 18px 0px 28px"> -->
<!--                     <div id="addFromButton" style="cursor:pointer;" class="info"> -->
<!--                         <h2 class="color-red"> ← 没有字段!</h2> -->
<!--                         <a href="javascript:void(0);">此处为表单设计的预览界面，目前表单中还没有字段。您可以通过点击或拖动左侧的字段类型来添加字段。 -->
<!-- 	添加完成后，您还可以点击预览界面的相关字段进行属性设置，或拖动移动字段的位置。</a> -->
<!--                     </div> -->
<!--                 </div> -->
                
                <div id="phone-frame" class="phone" style="">
                    <div class="phone_top"></div>
                    <div class="phone_middle" style="height: 0px;">
                        <div class="phone-main-w" style="overflow:auto;overflow-x:hidden">
                            <div class="phone-main phone-editing Scroller-Container" id="js-view-panel">
                                <div class="page-w" style="background-color:#F9F9F9;">
                                	<!-- <div class="warnLi" style="display: none;" id="warnLi">拖拽添加更多组件</div> -->
                                    <ul id="fields" class="fields" style="min-height: 404px;"><img src="rs/css/images/form-guide.png" id="form_guide" hidden="hidden" /></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="phone_bottom"></div>
                </div>
                
<!--                 
                <div class="formButtons hide" id="formButtons" >
                    <table style="width:50%;margin:auto;font-size:1.0em">
                        <tr>
                            <td><a class="btn icon-confirm btn-blue left" id="saveForm" href="javascript:void(0);"><b></b>保存表单</a></td>
                            <td><a class="btn btn-blue icon-plus left" id="btnAddField2" href="javascript:void(0);"><b></b>添加新字段</a></td>
                        </tr>
                    </table>
                </div> -->
                <div id="right1">
                    <div id="fieldProperties" hidden="hidden">
                        <ul class="tab-nav" >
                        <li  id="contentab"  class="cur"> <a href="javascript:;">内容</a> </li> 
                        <li  id="styletab" class="hide"> <a href="javascript:;">样式</a></li>
                        </ul>
                        
                        <!-- <div class="notice disn" id="notice" style="margin-top:30px">
                            <p>请先在左侧选择需要编辑的字段，然后在此编辑字段的属性。</p>
                        </div> -->
    
                        <ul id="allProps" class='disn'>
                            <li class="num" id="liPos">1.</li>
                            <!-- 1 -->
                            <li id="plabel">
                                <fieldset>
                                    <label class="desc" for="LBLCN">字段标签 </label>
                                    <input id="LBLCN" name="LBLCN" class="xl" type="text"></input>
                                    <div class="lenWarn"><span id="lblWarn">字段标签，最多可输入10个字</span> </div>
                                </fieldset>
                            </li>
    
                            <!-- 2 -->
                            <li id="ptoolTip">
                                <fieldset>
                                    <label class="desc" for="toolTip">提示文字</label>
                                    <input id="toolTip" name="TOOLTIP" class="xl" type="text"></input>
                                      <div class="lenWarn"><span id="tipWarn">提示文字，最多可输入20个字</span> </div>
                                </fieldset>
                            </li>
    
                            <!-- 1.1 时间区间，的第二个字段-->
                            <li id="plabel1">
                                <fieldset>
                                    <label class="desc" for="LBLCN1">字段标签</label>
                                    <input id="LBLCN1" name="LBLCN1" class="xl" type="text"></input>
                                     <div class="lenWarn"><span id="lblWarn1">字段标签，最多可输入10个字</span> </div>
                                </fieldset>
                            </li>
    
                            <!-- 2.1 -->
                            <li id="ptoolTip1">
                                <fieldset>
                                    <label class="desc" for="toolTip1">提示文字</label>
                                    <input id="toolTip1" name="TOOLTIP1" class="xl" type="text"></input>
                                </fieldset>
                            </li>
    
                            <!-- 2.2 -->
                            <li id="pdefaultValue">
                                <fieldset>
                                    <label class="desc" for="pdefaultValue">默认内容</label>
                                    <select name="DEFAULT">
                                        <option selected value="CURRENTUSER">当前用户</option>
                                        <option value="CURRENTDEPT">当前部门</option>
                                    </select>
                                </fieldset>
                            </li>
    
                            <!-- 3  日期格式 -->
                            <li id="pdateformat">
                                <fieldset>
                                    <label class="desc" for="dateformat">日期格式</label>
                                    <div class="form-cell">
                                        <input id="sec_pub" name="FMT" type="radio" value="YYYY-MM-DD" />
                                        <label for="sec_pub">年-月-日</label>
                                        <input id="sec_pri" name="FMT" type="radio" value="YYYY-MM-DD HHMM" />
                                        <label for="sec_pri">年-月-日 时分</label>
                                    </div>
                                    
                                </fieldset>
                            </li>
    
                            <!-- 4 电话号码格式 -->
                            <li id="pphoneformat">
                                <fieldset>
                                    <label class="desc" for="phoneformat">电话格式</label>
                                    <select id="phoneformat" name="FMT">
                                        <option value="MOBILE" selected="selected">手机</option>
                                        <option value="TEL">座机</option>
                                    </select>
                                </fieldset>
                            </li>
    
                            <!-- 5  金额类型 -->
                            <li id="pmoneyformat">
                                <fieldset>
                                    <label class="desc" for="moneyfomat">货币格式</label>
                                    <select id="moneyfomat" name="FMT">
                                        <option value="yuan">人民币</option>
                                        <option value="yen">日元</option>
                                        <option value="dollars">美元</option>
                                        <option value="pounds">英镑</option>
                                        <option value="euros">欧元</option>
                                    </select>
                                </fieldset>
                            </li>
    
                            <!-- 6  选择框，NAME="SELECT" -->
                            <li id="pitems" class="clear">
                                <fieldset>
                                    <label>选择项</label>
                                    <ul id="itemList">
                                    </ul>
                                    <div id="pitems_radio" class="center">
                                        <a id="btnItemsPredefine" href="javascript:void(0);" class="btn no-icon btn-gray">批量编辑</a>
                                    </div>
                                </fieldset>
                            </li>
    
                            <!-- 7 是否必填 -->
                            <li class="clear" id="prequired">
                                <fieldset>
                                    <label class="desc"><label for="reqd">设置</label></label>
                                    <input id="reqd" name="REQD" type="checkbox" value="1" />
                                    <label for="reqd">必填</label>
                                </fieldset>
                            </li>
    
                            <!-- 8 图片 -->
                            <li id="pimage">
                                <fieldset>
                                    <form name="uploadImageForm" action="" method="POST" enctype="multipart/form-data" style="padding:5px 0px;">
                                        <label class="desc" for="uploadImage">上传图片</label>
                                        <input type="button" id="uploadImage" value="上传图片" name="uploadImage" title="支持jpg、jpeg、png等格式，图片大小不能超过5M" accept="image/jpeg,image/png,image/bmp" />
                                    </form>
                                </fieldset>
                            </li>
    
                            <!--10 取值范围 -->
                            <li id="prange">
                                <fieldset>
                                    <label>范围</label>                                    
                                    
                                    <div class="float-wrapper">
                                        <div class="half left">
                                            <label class="desc min" for="min">最小值</label>
                                            <input class="xxl number" id="min" name="MIN" type="text" value="" />
                                        </div>
                                        <div class="half left">
                                            <label class="desc max" for="max">最大值</label>
                                            <input class="xxl number" id="max" name="MAX" type="text" value="" />
                                        </div>
                                    </div>
                                </fieldset>
                            </li>
    
                            <!--提醒-->
                            <li id="pwarn">
                                <fieldset>
                                    <label ><label for='warn'>提醒设置</label></label>
                                    <input type="checkbox" id="warn" name="WARN" /><label for="warn">开启提醒</label>
                                </fieldset>
                            </li>
    
                            <!-- check类型的默认选择 -->
                            <li id="check_default">
                                <fieldset>
                                    <label class="desc" for="default">部门选择设置</label>
                                    <input type="checkbox" id="default" name="DEF" />
                                    <label class="desc2" for="default">默认当前部门</label>
                                </fieldset>
                            </li>
    
                            <!-- 地址 类型的默认选择 -->
                            <li id="addr_default">
                                <fieldset>
                                    <label class="desc" for="defval_country">默认值</label>
                                    <div class="form-cell city-select">
                                        <select id="defval_province" name="DEF_PROVINCE" class="s"></select>
                                        <select id="defval_city" name="DEF_CITY" class="s">
                                            <option>市</option>
                                        </select>
                                        <select id="defval_zip" name="DEF_ZIP" class="s">
                                            <option>区/县</option>
                                        </select>
                                        <textarea id="defval_detail" style='height:40px;' class='input xxl detail' placeholder='详细地址'></textarea>
                                    </div>
                                    
                                    
                                </fieldset>
                            </li>
    
                            <!-- 11 子表明细 -->
                            <li id="pdefTable" class="clear">
                                <fieldset>
                                    <label>表头择项</label>
                                    <div>
                                    </div>
                                    <ul id="pdefTabl_ul">
                                    </ul>
                                </fieldset>
                            </li>
    
                            <!-- 9 是否可编辑 -->
                            <li class="clear" id="pedit">
                                <fieldset>
                                   <label>字段可编辑</label>
                                   <div class="form-cell">
                                        <input id="ECIT_1" name="EDIT" type="radio" value="CREATE" />
                                        <label for="ECIT_1">创建者可编辑</label>
                                        <input id="ECIT_2" name="EDIT" type="radio" value="EVERYONE" checked="checked" />
                                        <label for="ECIT_2">每个人可编辑</label>
                                   </div>
                                </fieldset>
                            </li>
                            <li class="clear noheight"></li>
                        </ul>
                        <!--图片样式调整 -->
                        <ul id="imageStyle" class='disn configurator' style="margin-top:20px;'">
                        <fieldset class="js-tabpanel-style">
			                        <div class="form-row ui-switchrow st-checked">
			                        <input id="gauge" name="REQD" type="checkbox" />
			                        <label for="gauge">调整边距</label>
			                        <div class="form-cell hide">   
			                        <div class="margin_configurator"> 
			                        <div class="input_top"><input type="text" name="margin-top" value="0"> px</div>      
			                        <div class="input_right"><input type="text" name="margin-right" value="0"> px</div>       
			                        <div class="input_bottom"><input type="text" name="margin-bottom" value="0"> px</div>        
			                        <div class="input_left"><input type="text" name="margin-left" value="0"> px</div>    
		                            <div class="inner_box"></div>      
		                            </div>      
			                        <input id="separation"  style="vertical-align:middle;" type="checkbox" class="symmetry">
			                        <label for="separation">间距对称</label>    
		                            </div>
	                              </div>
                        </fieldset>
                        </ul>
                   
                    </div>
                    <!-- end field properties -->
<!--                     <div id="noProps"> -->
<!--                         <h4>没有选择字段</h4> -->
<!--                         <p> -->
<!--                            	 请先在左侧选择需要编辑的字段，然后在此编辑字段的属性。 -->
<!--                         </p> -->
<!--                     </div> -->
            </div>
            </div>
        </div>
        <!-- container end -->
        <script type="text/javascript">
		function showWx(){
			var img=document.getElementById("imgWeixin");
			img.style.display=(img.style.display=="none"?"block":"none");
			return false;
		}
		function hideWx(){document.getElementById("imgWeixin").style.display="none";return false;}
		</script>
		<div id="overlay" class="overlay disn"></div>
		<div id="lightBox" class="lightbox disn">
			<div id="lbContent" class="lbcontent"></div>
		</div>
		<div id="viewForm"></div>
		<input type="hidden" value="<%=request.getParameter("page_type") %>" id="pageType"/>
		<span id="helpTip" class="helpTip disn"><b></b><em></em></span>
          <div class="mask hide" id="mask">
            <div class="pop-box module-lib hide-tabs">
                <div class="box-header">审批设置</div>
                <ul class="tabs">
                    <li class="current">空白模板</li>
                    <li>公告</li>
                    <li>文档管理</li>
                    <li>日程安排</li>
                    <li>日志</li>
                    <li>项目交流</li>
                    <li>会议纪要</li>
                </ul>
                <!--tab-content是右侧内容的容器-->
                <div class="tab-content">
                    <div class="text-line">
                        <span>审批模块名称</span>
                        <input type="text" name="" id="moduleName" value="" placeholder="审批模块名称" />
                    </div>
                    <div class="text-line">
                        <span>审批模块说明 </span>
                        <input type="text" name="" id="moduleInfo" value="" placeholder="审批模块说明 " />
                    </div>
                    <div class="dott-line"></div>
                    <div class="text-line">
                        <span>图标</span>
                        <ul class="tabs-btn">
                            <li class="current" type="systemIcon">选择图标</li>
                            <li type="localIcon">上传图标</li>
                        </ul>
                        <div class="icon-preview">
                            <img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon1.png" />
                        </div>
                        <div class="icon-preview-text">图标预览</div>
                        <div class="tab-content-icon" id="systemIcon">
                            <div class="icon-list-wrapper pages iconSelect">
                                <ul class="icon-list">
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon1.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon2.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon3.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon4.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon5.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon6.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon3.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon1.png" /></li>
                                    
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon2.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon1.png" /></li>
                                    
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon2.png" /></li>
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon1.png" /></li>
                                    
                                    <li><img src="<%=AppFileUtils.getInstance().getAccessUrl() %>/appsetting/daily-icon2.png" /></li>
                                </ul>
                                <div class="arrow-left"></div>
                                <div class="arrow-right"></div>
                            </div>
                            
                        </div>
                        <div class="tab-content-icon hide" id="localIcon">
                            <div class="upload-btn js-add-icon"></div>
                            <div class="upload-text">建议：PNG<br />1024X1024
							</div>
                            
                            <div class="icon-list-wrapper pages upload localIconSelect">
	                            <ul class="icon-list" id="icon-list">
	                                
	                            </ul>
	                            <div class="arrow-left"></div>
	                            <div class="arrow-right"></div>
                            </div>
                        </div>
                        <script type="text/html" id="iconList">
										{{#list}}
											<li><img src="{{url_origin}}"></li>
										{{/list}}
									</script>
                    </div>
                    <div class="buttons">
                        <div class="button" id="createSubmit">确定</div>
                        <div class="button" id="js-close-btn">取消</div>
                        <div class="tip hide"></div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="mask hide" id="maskFlow">
	        <div class="pop-box save-tip">
	                <div class="close-btn">
	                </div>
	                <div class="box-body">
	                    <p>是否保存当前内容，进入流程设计页面？</p>
	                    <div class="buttons">
	                        <a href="javascript:" class="button" id="saveSubmit">保存</a>
	
	                        <a href="javascript:" class="button ghost" id="noSaveSubmit">不保存</a></div>
	                </div>
	         </div>
 	    </div>    
        <script type="text/javascript" src="rs/requirejs/require.js"></script>
	<script type="text/javascript">
	//表单的基本信息
	var  M={
		 
	}
	//页面信息
	var pageInfo = {
		//插入位置对象
		$line:null,
		//当前悬浮的li
		 $currentLi : null,
		//当前进入ul对象
		 $currentUl : null,
		//进入的对象类型
		 inType : null,
		 //是否在拖拽
		 isdraggable:false,
		 //用于保存当前li的中间Y轴坐标
		 currentY:0,
		 //元素插入的方向
		 direction:0,   // 1：下方向  -1上方向
		 
		 //当前表：分为主表和子表，存放当前表的标签名（若为主表，则不包括子表里面的标签名）。1.安放拉拽组件的位置所在的表||2.点击表单主键时，该组件所在的表
		 curForm:[],
		 //点击保存输入时，进行表单里面所有标签对象的填充，包括子表。标签对象(包含标签名，标签index，父标签pIndex和isSubForm判别是否是子表的标志)
		 formLabelObjects:[],
		 
		 mAppId:"<%=mAppId%>",
		 moduleId:"<%=moduleId%>",
		 //表单id
		 formId:"<%=formId%>",
		 //复制对象li
		 $copyLi:null,
		 //复制对象值
		 copyData:null,
		 //页面类型 ：approvePage  dailyPage
		 pageType:"<%= pageType%>",
		 //上一次保存表单字段 信息
		 preSaveF:[]
		 
	};
	//已 配置表单字段 信息，用于初始化配置
	 var F=[];
	
	
	var LINEWELL = {
				wwwurl : "/appmodel",
				staticurl : "/appmodel",
				pfileurl : "/appmodel",
				cluburl : "/appmodel"
			};	
	
		LINEWELL.page={
			mapp_id:"<%=mAppId%>",
		};	
			
			
			
	require.config({
		baseUrl:'/appmodel',
		bundles : {
		
		'ui' : [ "ui", "ui-mod/base", "ui-mod/basedialog",
								'ui-mod/form', 'ui-mod/tab', 'ui-mod/text',
								'ui-mod/select', 'ui-mod/paging',
								'ui-mod/colorpanel', 'ui-mod/colorpicker',
								'ui-mod/iconpanel', 'ui-mod/iconselect',
								'ui-mod/slider', 'ui-mod/typeahead',
								'ui-mod/linkselect', 'ui-mod/margin',
								'ui-mod/picselect', 'ui-mod/typeselect',
								'ui-mod/picselector', 'ui-mod/grouplink',
								'ui-mod/richtext', 'ui-mod/picedit',
								'ui-mod/switchrow' ]
				   },     
			paths : {
						"jquery" : "res/skin/js/lib/jquery-2.1.0",
						"jquery-private" : "res/skin/js/jquery-private",
						"jquery-ui" : "res/ui/js/lib/jquery-ui-1.10.4.custom.min",
						"lib" : "res/ui/js/lib",
						"libui" : "res/ui/js",
	 					"ui" : "res/ui/js/ui",
						"ui-mod" : "res/ui/js/ui-modules",
						"vd" : "res/ui/js/vd",
						"header-nav" : "res/pageui/js/header-nav",
						"moment" : "res/ui/js/moment",
	 					"requirejs" : "jsform/rs/requirejs",
	 					"PageTab" : "res/ui/js/PageTab"
						
					}
	    //,urlArgs : "t=" + Math.random()
	});
	var isIn=false;
	require(["requirejs/formNew","jquery"], function(form,$) {
		//approvePage
		//dailyPage
		form.init(pageInfo.pageType);
		$(window).bind("beforeunload",function(){
			var fStr = null;
			if(0 == F.length){
				fStr = "[]";
			}else{
				fStr = JSON.stringify(F,function(key,value){
					if($.trim(value) == ""){
						return undefined;
					}
					return value;
				});
			}
			var preSaveFStr = JSON.stringify(pageInfo.preSaveF);
			if(fStr != preSaveFStr){
				return "确认离开本页？未保存的内容将会丢失！"
			}
		});
		
	});
	</script>
	<script type="text/javascript" src="rs/js/jquery-1.11.0.js"></script>
	<script>
			$(document).ready(function (){
				//选中当前项
				var $current = $(".header-nav a.item2 ");
	            $current.addClass("selected");
	            $current.siblings().removeClass("selected");
			});
			
		</script>
	</body>
	</html>