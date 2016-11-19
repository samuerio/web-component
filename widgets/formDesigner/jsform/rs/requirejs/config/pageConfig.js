/**
 * 页面配置
 */

define([],function(){
	
	return {
		//审批设计页
		approvePage:{
		   
		  col1:[
		      	{id:"date",name:"date",title:"日期",description:""},
		      	{id:"address",name:"address",title:"地址",description:""},
		      	{id:"depts",name:"depts",title:"部门选择",description:""},
		      	{id:"initiator",name:"initiator",title:"发起人",description:""},
		      	{id:"money",name:"money",title:"金额",description:""}
		      	
		      ],
	      col2:[
		      	{id:"ddate",name:"ddate",title:"日期区间",description:""},
		      	{id:"file",name:"file",title:"文件上传",description:""},
		      	{id:"users",name:"users",title:"用户选择",description:""},
		      	{id:"options",name:"options",title:"事项",description:""},
		      	{id:"image_upload",name:"image_upload",title:"图片上传",description:""}
		      	
		      ],
	      col3:[
		      	{id:"label",name:"label",title:"描述",description:""},
		      	{id:"text",name:"text",title:"单行文本",description:""},
		      	{id:"radio",name:"radio",title:"单选框",description:""},
		      	{id:"dropdown",name:"dropdown",title:"下拉框",description:""},
		    	{id:"detailTable",name:"detailTable",title:"明细子表",description:""}
//		      	{id:"image",name:"image",title:"图片",description:""}
		      ],
	      col4:[
		      	{id:"number",name:"number",title:"数字",description:""},
		      	{id:"textarea",name:"textarea",title:"多行文本",description:""},
		      	{id:"checkbox",name:"checkbox",title:"多选框",description:""},
		      	{id:"separator",name:"separator",title:"分隔符",description:""}
		      
		      ]
			},
			
			
		//日常页配置
		dailyPage:{
				
		  col1:[
		        {id:"date",name:"date",title:"日期",description:""},
		        {id:"address",name:"address",title:"地址",description:""},
		        {id:"depts",name:"depts",title:"部门选择",description:""},
		      	{id:"name",name:"name",title:"姓名",description:""},
		      	{id:"email",name:"email",title:"电子邮箱",description:""},
		      	{id:"image_upload",name:"image_upload",title:"图片上传",description:""}
		      
		      ],
	      col2:[
	            {id:"ddate",name:"ddate",title:"日期区间",description:""},
	            {id:"file",name:"file",title:"文件上传",description:""},
	            {id:"users",name:"users",title:"用户选择",description:""},
		      	{id:"phone",name:"phone",title:"电话",description:""},
		      	{id:"url",name:"url",title:"网址",description:""}
		      	
		      ],
	      col3:[
		      	{id:"label",name:"label",title:"描述",description:""},
		      	{id:"text",name:"text",title:"单行文本",description:""},
		      	{id:"radio",name:"radio",title:"单选框",description:""},
		      	{id:"dropdown",name:"dropdown",title:"下拉框",description:""},
		      	{id:"detailTable",name:"detailTable",title:"明细子表",description:""}
//		      	{id:"image",name:"image",title:"图片",description:""}
		      ],
	      col4:[
	        	{id:"number",name:"number",title:"数字",description:""},
		      	{id:"textarea",name:"textarea",title:"多行文本",description:""},
		      	{id:"checkbox",name:"checkbox",title:"多选框",description:""},
		      	{id:"separator",name:"separator",title:"分隔符",description:""}
		      ]
			}
	
	};
});