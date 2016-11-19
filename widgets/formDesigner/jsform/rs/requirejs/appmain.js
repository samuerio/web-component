/**
 * 定义总的入口
 * 定义方法：
 * createFields:根据全局的字段设置F 调用各模块的createField方法来渲染表单
 * 
 */
define("base",[],function(fieldConfig,fieldPropConfig){
	
	
	return {

	};
});

define(["base","requirejs/utils","requirejs/config/fieldConfig","requirejs/config/fieldPropConfig",
        "requirejs/field/dropdown",//下拉框
        "requirejs/field/money",//金额
        "requirejs/field/date",//日期
        "requirejs/field/ddate",//日期区间
        "requirejs/field/address",//地址
        "requirejs/field/option",//意见
        "requirejs/field/options",//事项
        "requirejs/field/radio",//单选框
        "requirejs/field/checkbox",//多选框
        "requirejs/field/detailTable",//明细子表
        "requirejs/field/initiator",//发起人
        "requirejs/field/depts",//部门选择框
        "requirejs/field/users",//用户选择框
        "requirejs/field/number",//数字输入框
        "requirejs/field/phone",//电话号码
        "requirejs/field/image",//图片
        "requirejs/field/label",//标签
        "requirejs/field/separator",//分隔符
        "requirejs/field/text",//单行文本
        "requirejs/field/textarea"//多行文本
        ],function(base,utils,fieldConfig,fieldPropConfig){
	
		base.server = {
			/**
			 * 根据表单ID获取表单字段配置信息
			 */
			getFormFieldConfig:function(mAppId,moduleId,formId,callBack){
				
				var params = {"operType":"getFormFieldsInfo",
						"mAppId":mAppId,"moduleId":moduleId,
						"formId":formId};
				
				$.post("app.action?type=appFormDesignAction",params,function(data){
					
					var formConfig=data.content;
					
					if(formConfig != undefined){
						//FTYPE属性值调整为小写再进行解析
						formConfig = JSON.parse(JSON.stringify(formConfig), function(key,value){
							switch(key){
							case "FTYPE"  : {
								if("DETAILTABLE" == value){
									return "detailTable";
								}
								return value.toLowerCase();
							}
							case "DEF" : {
								if("true"==value || "false"==value){
									return eval(value);
								}
								return value;
							}
							case "REQD": return eval(value);
							default : return value;
							}
						});
						console.log(JSON.stringify(formConfig));
					}else{
						formConfig=[];
					}
					//传接收到的表单配置信息给回调函数做处理
					callBack(formConfig);
				},"json");
			},
			
			/**
			 * 保存表单配置信息
			 */
			saveFormFieldConfig:function(obj, url, callBack){
				
				var formConfig = obj.config;
				//图片没有勾选边距调整时，不保存MARGINSTYLE值
				$.each(formConfig,function(index,field){
					if(field.FTYPE=='image'&&!field.REQD){
						field.MARGINSTYLE="";	
					}else if(field.FTYPE == "detailTable"){
						$.each(field.FIELDS,function(subindex,subfield){	
						   if(subfield.FTYPE=='image'&&!subfield.REQD){
							   subfield.MARGINSTYLE="";	
					     }
					   });
					}
				});
				
				if(formConfig != undefined){
					//FTYPE属性值调整为大写再进行保存
			    	var config = JSON.stringify(formConfig, function(key,val){
		    			switch(key){
		    				case "FTYPE":return val.toUpperCase();
		    				default:return val;
		    			}
			    	});
			    	obj.config = config; 
			    	console.log(config);
				}
				
		    	$.post(url,obj).done(function(data){
		    		data = eval("("+data+")");
		    		//data为JSON对象
		    		callBack(data);
		    	});
			}
		};
	
	base.fields={
			
		/**
		 * 将字段渲染进容器
		 * @param jsonDataArray 字段属性数组
		 * @param $container 容器
		 */
		
		createFields:function(jsonDataArray,$container){
			//插入字段的索引
			var $li;
			//1.判断是否需要进行容器的渲染
			if(jsonDataArray&&jsonDataArray.length>0){
				$.each(jsonDataArray,function(index,jsonData){
					$li = $(fieldConfig.field_li);
					$li.attr("id", "f" + index).appendTo($container).attr("index",index);
					if($container.attr("subForm")=="subForm"){
						$li.attr("subForm","subForm");
					}
					//base.fields.liMouseEnter($li);
					//2.根据jsonData进行容器内字段的渲染
					base.fields.createFiled($li,jsonData);
					
				});
			};
		},
		
		/**
		 * 渲染预览表单
		 */
		createView:function(jsonDataArray,$container){
			//插入字段的索引
			var $li;
			//1.判断是否需要进行容器的渲染
			if(jsonDataArray&&jsonDataArray.length>0){
				$.each(jsonDataArray,function(index,jsonData){
					$li = $(fieldConfig.field_li);
					$li.attr("id", "f" + index).appendTo($container).attr("index",index);
					if($container.attr("subForm")=="subForm"){
						$li.attr("subForm","subForm");
					}
					//2.根据jsonData进行容器内字段的渲染
					base.fields.createFiled($li,jsonData);
					
				});
			};
		},

		/**
		 * 聚焦某个控件
		 * @param   li对象
		 * @param   index下标,子表怎么办？
		 */
		setFocused:function($li) {
			$("#allProps").show();
			$("#notice").hide();
			$("#styletab").attr("class", "hide");
			$("#contentab").attr("class","cur");
			$("#imageStyle").hide();

				
			//切换背景色
			$li.parent().find(".focused").find(".fieldActions").hide();
			
			//1.先清空其他所有字段的focused类
			$("#fields li").removeClass("focused");
			//2.再给当前点击字段添加focused类
			$li.removeClass("prefocus").addClass("focused");
			
			//子元素
			$li.children(".fieldActions").show();
			var type = $li.attr("ftype");
		    //隐藏所有属性
		    $.each(fieldPropConfig.allProp, function(index, propId) {
		        $("#" + propId).hide();
		    });
		    
		    //根据配置显示属性
		    $.each(fieldPropConfig.fieldPropConfig[type], function(index, propId) {
		        $("#" + propId).show();
		    });
		    
		    var jsonData = null;
		    //li相对下标
		    var index = parseInt($li.attr("index"),10);
		    if($li.attr("subForm")=="subForm"){
		    	var pIndex = $li.parent().parent().parent().parent().attr("index");
		    	jsonData=F[parseInt(pIndex,10)].FIELDS[index];
		    }else{
		    	jsonData = F[index];
		    }
		    
		    //常规属性设置值,先清空所有属性值，再用F填充
		    $("#allProps").setValues(jsonData);
		    
		    //绑定公共属性
		    base.commonProp($li,jsonData);
		    //特殊属性设置值
		    if(base[type]&&base[type].setPropertieValues!=null){
		    	base[type].setPropertieValues($li,type,jsonData);
		    }
		},

		/**
		 * 渲染某个对象
		 * @params jsonData 配置数据
		 * @params $li li渲染对象
		 */
		createFiled:function($li,jsonData){
			//添加字段html
			var $html = $(fieldConfig[jsonData.FTYPE].html);
	        $li.empty().append($html).attr("ftype",jsonData.FTYPE).addClass("field");
	        
	        
	        $li.find("label.desc").text(jsonData.LBLCN);
	        if(jsonData.TOOLTIP&&!jsonData.REQD){
	        	$li.find("label.tip").text(jsonData.TOOLTIP);
	        }else if(!jsonData.TOOLTIP&&jsonData.REQD){
	        	$li.find("label.tip").text(fieldConfig.propertyConfig.reqd[jsonData.REQD]);
	        }else if(jsonData.TOOLTIP&&jsonData.REQD){
	        	$li.find("label.tip").text(jsonData.TOOLTIP+fieldConfig.propertyConfig.reqd[jsonData.REQD]);
	        }
	        
	        //添加操作按钮
	        var $fieldActions = $(fieldConfig.fieldActions);
	        $li.append($fieldActions);
	        //简单的模块组件不用，单独写模块
	        if(base[jsonData.FTYPE]&&base[jsonData.FTYPE].createFiled){
	        	base[jsonData.FTYPE].createFiled($li,jsonData);
	        }
	        
			//字段标签输入框、提示文字输入框失焦
			$("#LBLCN").blur();
			$("#LBLCN1").blur();
			$("#toolTip").blur();
		},
			
		/**
		 * 绑定对象的hover事件
		 * @params $selector 选择器
		 */
		//liMouseEnter:function($selector){
		//	$selector.hover(function(event){
		//		 //debugger;
		//		if(pageInfo.isdraggable){
		//			 var $this = $(this);
		//			 pageInfo.$currentLi = $(this);
		//			 pageInfo.inType="li";
		//			 $(this).after(pageInfo.$line);
		//			 pageInfo.currentY = $this.offset().top+($this.outerHeight()/2);
		//		 }else{
		//			 pageInfo.currentY= 0 ;
		//		 }
		//		 event.stopPropagation();
		//	 },function(){
		//	 });
		//},
		
		/**
		 * 将当前表单里面的所有标签对象填充到数组array----一维的(包括日期区间的第二个标签对象)
		 */
		fillLabelObjectArray:function(array,f,pIndex){
			//标签对象(包含标签名，标签index，父标签pIndex和isSubForm判别是否是子表的标志)
			$.each(f,function(index,field){
				var labelObj = {};
				labelObj.index = index;
				labelObj.lbl = field.LBLCN;
				labelObj.tooltip = field.TOOLTIP;
				labelObj.ftype = field.FTYPE;
				//允许pIndex = 0
				if(pIndex != undefined){
					labelObj.pIndex = pIndex;
				}
				array.push(labelObj);
				
				//如果是日期区间则将第二个标签名对象也压入array数组
				if("ddate" == field.FTYPE){
					var labelObj2 = $.cloneJSON(labelObj);
					labelObj2.lbl=field.LBLCN1;
					array.push(labelObj2);
				}
				if("detailTable" == field.FTYPE){
					labelObj.isSubForm = true;
					base.fields.fillLabelObjectArray(array,field.FIELDS,index);
				}
			});
		},
		/**
		 * 根据基础标签名创建该类型的唯一性标签
		 */
		createLable:function(baseLabel,curForm){
			
			var label = baseLabel;
			var i = 2;
			while(!($.inArray(label,curForm) == -1)){
				label = baseLabel+i;
				++i;
			}
			return label;
		},
		/**
		 * 当需要进行标签名唯一性判断时，更新curForm
		 */
		updateCurForm:function($li){
			/**
			 * 若为子表则根据其子表Index进行pageInfo.curForm的标签名填充。若index==undefined，则进行主表标签名的填充
			 */
			function fillCurForm(index){
				pageInfo.curForm = [];
				pageInfo.formLabelObjects = [];
				base.fields.fillLabelObjectArray(pageInfo.formLabelObjects,F);
				$.each(pageInfo.formLabelObjects,function(i,labelObj){
					if(index == labelObj.pIndex){
						pageInfo.curForm.push(labelObj.lbl);
					}
				});
			}
			
		    //添加字段所在表,并用该表的标签名填充它
		    pageInfo.curForm = [];
			$ul = $li.parent();
			var pIndex = undefined;
			if($ul.attr("subForm")){
				//该子表的ID
				pIndex = $ul.parent().parent().parent().attr("index");
			}
			fillCurForm(pIndex);
		}

	};
	
	base.commonProp=function($mli,jsonData){
		
		//判断标签名是否超过10个字
		if(10 < $("#LBLCN").val().length){
			$("#lblWarn").show().addClass("red");
		}else{
			$("#lblWarn").show().removeClass("red");
		}
		//判断提示文字是否超过20个字
		if(20 < $("#toolTip").val().length){
			$("#tipWarn").addClass("red");
		}else{
			$("#tipWarn").removeClass("red");
		}
		
		
		//点击字段标签输入框时，进行表单里面所有标签名的填充
		$("#LBLCN").unbind("focus").bind("focus",function(){
			base.fields.updateCurForm($mli);
			//排除自己的标签名
			pageInfo.curForm.splice($.inArray(jsonData.LBLCN,pageInfo.curForm),1);
			
		});
		
		$("#LBLCN").unbind("keyup").bind("keyup",function(){
			
			var value = $(this).val();
			//控制字数 10个汉字长度
//			var strLen = utils.strlen(value);
			var strLen = value.length;
			if(strLen>10){
				$("#lblWarn").addClass("red");
//				value = utils.subRealLen2(value,20);
//				$(this).val(value);
			}else if(strLen == 0 ){
				$.showPop("请输入字段标签名称");
				$("#lblWarn").removeClass("red");
			}else{
				$("#lblWarn").removeClass("red");
				
			}
			jsonData.LBLCN=value;
			$mli.find("label.desc:eq(0)").text(value);
			//当字段标签名为空的时候，不用进行重名验证
			if(strLen != 0){
				if($.inArray(value,pageInfo.curForm) != -1){
					$.showPop("字段标签重名，请重新输入");
				}
			}
		});
		
		$("#toolTip").unbind("keyup").bind("keyup",function(){
			var value = $(this).val();
			var $tip = $mli.find("label.tip");
//			//为空 居右，否则居左
//			if($.trim(value)==""){
//				$tip.css("text-align","right");
//			}else{
//				$tip.css("text-align","left");
//			}
			
			$tip.css("text-align","left");
			
//			var strLen = utils.strlen(value);
			var strLen = value.length;
			if(strLen>20){
				$("#tipWarn").addClass("red");
//				value = utils.subRealLen2(value,40);
//				$(this).val(value);
			}else{
				$("#tipWarn").removeClass("red");
			}
		   jsonData.TOOLTIP=value;
		   if(!jsonData.REQD){
			   $tip.text(jsonData.TOOLTIP);
		   }else{
			   $tip.text(jsonData.TOOLTIP+fieldConfig.propertyConfig.reqd[jsonData.REQD]);
		   }
		});
		//字段可编辑
		$("#pedit").find("input:[name='EDIT']").unbind("change").bind("change",function(){
			 var v = $(this).val();
			 jsonData.EDIT=v;
		});
		
		//必选
		$("#reqd").unbind("change").bind("change",function(){
			var value = $(this).prop("checked");
			jsonData.REQD=value;
			
			if($mli.attr("FTYPE") != "ddate" && $mli.attr("FTYPE") != "date"){
				//只有必填项时，居右，否则居左
//				if(jsonData.TOOLTIP&&$.trim(jsonData.TOOLTIP)!=""){
//					$mli.find("label.tip").css("text-align","left").text(jsonData.TOOLTIP+fieldConfig.propertyConfig.reqd[value]);
//				}else{
//					$mli.find("label.tip").css("text-align","right").text(fieldConfig.propertyConfig.reqd[value]);
//				}
				if(jsonData.TOOLTIP&&$.trim(jsonData.TOOLTIP)!=""){
					$mli.find("label.tip").css("text-align","left").text(jsonData.TOOLTIP+fieldConfig.propertyConfig.reqd[value]);
				}else{
					$mli.find("label.tip").css("text-align","left").text(fieldConfig.propertyConfig.reqd[value]);
				}
			}else{
				//日期格式初始化
				var dateFormat ="";
				if("YYYY-MM-DD" == jsonData.FMT){
					dateFormat = new Date().format("yyyy-MM-dd");
				}else if("YYYY-MM-DD HHMM" == jsonData.FMT){
					dateFormat = new Date().format("yyyy-MM-dd hh:mm");
				}
				//判断是否勾选
				if(value){
					$mli.find("label.tip").text(dateFormat);
				}else{
					$mli.find("label.tip").text("请选择");
				}
				
			}
			
		});
	}
	
	/**
	 * 唯一性校验
	 */
	base.unique={
			
			 /**
			  * 判断val值在items里面是否唯一
			  */
			 isUniqueItemValue:function(val,items){
				 //判断value是否在item里面是唯一的
				 var flag = true;
				 $.each(items,function(index,item){
					 if(item.VAL == val){
						 flag = false;
						 return false;//结束jquery循环
					 }
				 });
				 return flag;
			 },
			 
			 /**
			  * 根据基础值（例如"选项")和items里面VAL，动态生成唯一性添加的item的选项名
			  * （规则:从"选项 1"开始判断是否有同名的选项名，若没则使用该选项名进行选项插入，若有则+1("选项 2")继续上述判断，直到没有同名位置）
			  */
			 createItemValue:function(baseValue,items){
				 
				 var value = baseValue+" 1";
				 var i = 2;
				 while(!base.unique.isUniqueItemValue(value,items)){
					 value = baseValue +" "+ i;
					 ++i;
				 }
				 return value;
			 }
			

	};
	
	base.validate = {
			/**
			 * 标签名非同名验证：(不同表中的标签名允许相同，表分为子表和主表)
			 */
			RepeateLabelValidate:function(labelObjArray){
			    /**
			   	 * 获得同表(分为两种情况：同主表和同子表)中标签名相同的首个标签对象
			   	 */
			   	function getRepeateLabelObj(labelObjArray){
			   		var repeateLableObj = null;
			   		var length = pageInfo.formLabelObjects.length;
			   		$.each(pageInfo.formLabelObjects,function(index,labelObj){
			   			for(var compareIndex = index+1; compareIndex<length; ++compareIndex){
			   				var compareLabelObj = pageInfo.formLabelObjects[compareIndex];
			   				//两个标签对象同名并且存在同一个子表中，才认定为这两个标签名冲突
			   				if(labelObj.lbl == compareLabelObj.lbl && labelObj.pIndex == compareLabelObj.pIndex){
			   					repeateLableObj = labelObj;
			   					return false;//结束jquery each循环
			   				}
			   			}
			   		});
			   		return repeateLableObj;
			   	}
			   	
		    	//如果有重复标签名，则该变量是同名的标签对象(首个),否则为null
		    	var repeateLableObj = getRepeateLabelObj(labelObjArray);
		    	//判断是够存在同名字段,对于图片和分隔符控件不作同名标签验证
		    	if(null != repeateLableObj && repeateLableObj.lbl != undefined){
		    		//判断是够需要进行同名字段的定位
		    		var isNeedLocate = true;
		    		$("#fields li.focused").children(".desc").each(function(index,val){
		    			if($(this).text() == repeateLableObj.lbl){
		    				isNeedLocate = false;
		    			}
		    		});
		    		if(isNeedLocate){
		    			//进行同名字段的定位
		    			var $li;
		    			//pIndex = 0 可以进入
		    			if(repeateLableObj.pIndex != undefined){
		    				//空标签名字段在子表
		    				$pli = $("#fields").children("li[index="+repeateLableObj.pIndex+"]");
		    				$li = $pli.find("ul").children("li[index="+repeateLableObj.index+"]");
		    			}else{
		    				//空标签名字段在主表
		    				$li = $("#fields").children("li[index="+repeateLableObj.index+"]");
		    			}
		    			base.fields.setFocused($li);
		    		}
		    		return false;
		    	}
		    	return true;
			},
			/**
			 * 标签名非空验证
			 */
			emptyLabelValidate:function(labelObjArray){
		    	//判断标签对象数组中是否存在空标签名的标签对象,如果存在则获得该标签对象
		    	function getEmptyNameLabel(labelObjArray){
		    		var emptyNameLabelObj = null;
					$.each(labelObjArray,function(index,labelObj){
						if("" == $.trim(labelObj.lbl)){
							emptyNameLabelObj = labelObj;
							return false;
						}
					});
					return emptyNameLabelObj;
		    	}
		    	
		    	var emptyNameLabelObj = getEmptyNameLabel(labelObjArray);
		    	//判断是否存在空标签名的字段
		    	if(null != emptyNameLabelObj){
		    		//判断是够需要进行空标签名字段的定位
		    		var isNeedLocate = true;
		    		$("#fields li.focused").children(".desc").each(function(index,val){
		    			if($(this).text() == ""){
		    				isNeedLocate = false;
		    			}
		    		});
		    		if(isNeedLocate){
		    			//进行空标签名字段的定位
		    			var $li;
		    			//pIndex = 0 可以进入
		    			if(emptyNameLabelObj.pIndex != undefined){
		    				//空标签名字段在子表
		    				$pli = $("#fields").children("li[index="+emptyNameLabelObj.pIndex+"]");
		    				$li = $pli.find("ul").children("li[index="+emptyNameLabelObj.index+"]");
		    			}else{
		    				//空标签名字段在主表
		    				$li = $("#fields").children("li[index="+emptyNameLabelObj.index+"]");
		    			}
		    			base.fields.setFocused($li);
		    		}
		    		return false;
		    	}
		    	return true;
			},
			/**
			 * 标签名长度验证，不能超过10个字（不区分中英文和数字）
			 */
			labelLengthValidate:function(labelObjArray){
		    	function getOverLengthLabel(labelObjArray){
		    		var overLengthLabel = null;
					$.each(labelObjArray,function(index,labelObj){
						//排除掉“描述”的长度限制
						if(labelObj.lbl && 10 < labelObj.lbl.length && labelObj.ftype != "label"){
							overLengthLabel = labelObj;
							return false;
						}
					});
					return overLengthLabel;
		    	}
		    	
		    	var overLengthLabel = getOverLengthLabel(labelObjArray);
		    	
		    	if(null != overLengthLabel){
		    		var isNeedLocate = true;
		    		$("#fields li.focused").children(".desc").each(function(index,val){
		    			if($(this).text().length > 10){
		    				isNeedLocate = false;
		    			}
		    		});
		    		if(isNeedLocate){
		    			var $li;
		    			//pIndex = 0 可以进入
		    			if(overLengthLabel.pIndex != undefined){
		    				$pli = $("#fields").children("li[index="+overLengthLabel.pIndex+"]");
		    				$li = $pli.find("ul").children("li[index="+overLengthLabel.index+"]");
		    			}else{
		    				$li = $("#fields").children("li[index="+overLengthLabel.index+"]");
		    			}
		    			base.fields.setFocused($li);
		    		}
		    		return false;
		    	}
		    	return true;
			},
			/**
			 * 提示文字长度验证，不能超过20个字（不区分中英文和数字）
			 */
			tooptipLengthValidate:function(labelObjArray){
		    	function getOverLengthTooltip(labelObjArray){
		    		var overLengthTooltip = null;
					$.each(labelObjArray,function(index,labelObj){
						if(labelObj.tooltip && 20 < labelObj.tooltip.length){
							overLengthTooltip = labelObj;
							return false;
						}
					});
					return overLengthTooltip;
		    	}
		    	
		    	var overLengthTooltip = getOverLengthTooltip(labelObjArray);
		    	
		    	if(null != overLengthTooltip){
		    		var isNeedLocate = true;
		    		$("#fields li.focused").children(".tip").each(function(index,val){
		    			if($(this).text().length > 20){
		    				isNeedLocate = false;
		    			}
		    		});
		    		if(isNeedLocate){
		    			var $li;
		    			//pIndex = 0 可以进入
		    			if(overLengthTooltip.pIndex != undefined){
		    				$pli = $("#fields").children("li[index="+overLengthTooltip.pIndex+"]");
		    				$li = $pli.find("ul").children("li[index="+overLengthTooltip.index+"]");
		    			}else{
		    				$li = $("#fields").children("li[index="+overLengthTooltip.index+"]");
		    			}
		    			base.fields.setFocused($li);
		    		}
		    		return false;
		    	}
		    	return true;
			},
			/**
			 * 子表非空验证
			 */
			emptySubFormValidate:function(labelObjArray){
				//判断是否存在空子表
		    	function getEmptySubForm(labelObjArray){
		    		var EmptySubForm = null;
		    		var length = labelObjArray.length;
		    		
		    		if(length == 1){
		    			EmptySubForm = labelObjArray[0].isSubForm ? labelObjArray[0] : null;
		    			return EmptySubForm;
		    		}
		    		//判断子表是否有字段的标志
		    		var flag = false;
		    		
		    		$.each(labelObjArray,function(index,labelObj){
		    			if(labelObj.isSubForm){
		        			for(var compareIndex = index+1; compareIndex<length; ++compareIndex){
		        				var compareLabelObj = pageInfo.formLabelObjects[compareIndex];
		        				if(labelObj.index == compareLabelObj.pIndex){
		        					flag = true;
		        				}
		        			}
			        		if(flag == false){
			        			EmptySubForm = labelObj;
			        			return false;
			        		}
			        		flag = false;
		    			}
		    		});
		    		return EmptySubForm;
		    	}
		    	
		    	//如果有空子表，则该变量是首个空子表,否则为null
		    	var EmptySubForm = getEmptySubForm(labelObjArray);
		    	//判断是够存在空子表
		    	if(null != EmptySubForm){
		    		//判断是够需要进行空子表的定位
		    		var isNeedLocate = true;
		    		if($("#fields li.focused").find("ul li").size() == 0 && $("#fields li.focused").attr("ftype")=="detailTable"){
		    				isNeedLocate = false;
		    		}
		    		if(isNeedLocate){
		    			//进行空子表的定位
		    			var $li = $("#fields").children("li[index="+EmptySubForm.index+"]");
		    			base.fields.setFocused($li);
		    		}
		    		$.showPop("请添加组件到“"+EmptySubForm.lbl+"”中");
		    		return false;
		    	}
		    	return true;
			}
	}
	
	//工具类
	base.utils={
		getRandom:function(){
			return Math.ceil(Math.random()*1000)+"";
		}
	}
	return base;
});
