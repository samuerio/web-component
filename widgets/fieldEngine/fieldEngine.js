//字段状态管理引擎


//Usage
//var fieldTransEngine = new FieldTransEngine({outputElType:'a'});
//fieldTransEngine.toReadonly({
//    fields:[
//        'zhibanyuan',
//        ['qushifadidian',
//            {id:'zhenshifadidian',filterValue:'--请选择--',translator:{key:value}},
//            'xiangxishifadidian'
//        ],
//        ['baosongdanwei',
//            {id:'selectDept',outputElType:'none'}
//        ]
//    ]
//});


var FieldTransEngine = (function(){//闭包,避免污染全局

    var FieldTransEngine = function(options){
        this.settings = Object.assign({},FieldTransEngine.detaults,options);
    }

    Object.assign(FieldTransEngine,{
        defaults: {
            outputElType:'p'
        },
        setDefaults:function(settings){
            Object.assign(FieldTransEngine.defaults,settings);
        },
        prototype:{
            /**
             * 转只读状态
             * @param fields
             */
            toReadonly: function(fields){
                var _self = this;

                fields.map(function(field){
                    if(typeof field === 'string'){//为标识Id
                        _self.elToReadonly({
                            sourceEl: document.getElementById(field)
                        });
                    }else if(field instanceof Array){//Array
                        _self.toReadonly(field);
                    }else{//Object
                        _self.elToReadonly({
                            sourceEl: document.getElementById(field.id),
                            outputElType: field.outputElType,
                            filterValue: field.filterValue,
                            appendPoint: field.appendPoint,
                            translator: field.translator
                        })
                    }
                });
            },
            /**
             * 单个字段配置对象的转化
             * @param fieldMeta
             */
            elToReadonly: function(fieldMeta){

                var _self = this;
                var defaultOutputElType = this.settings.outputElType;
                var sourceEl = fieldMeta.sourceEl;

                var ouputEl = _self._getOuputEl(fieldMeta.outputElType || defaultOutputElType,
                    sourceEl);
                if(!ouputEl){
                    return ;
                }

                //添加输出标签的值
                var sourceVal = _self._getSourceVal(sourceEl,fieldMeta.filterValue,fieldMeta.translator);
                ouputEl.appendChild(document.createTextNode(sourceVal));

                //将输出的标签插入到文档中
                var appendPoint = fieldMeta.appendPoint || fieldMeta.sourceEl.parentNode;
                appendPoint.appendChild(ouputEl);
                sourceEl.parentNode.removeChild(sourceEl);

            },
            /**
             * 获取输出的Dom对象
             * @param outputElType
             * @returns {Element}
             * @private
             */
            _getOuputEl: function(outputElType,sourceEl){
                if('none' === outputElType){
                    sourceEl.parentNode
                        .removeChild(sourceEl);
                    return;
                }
                return document.createElement(outputElType);
            },
            /**
             * 获取源Dom的值
             * @param sourceEl
             * @param translator
             * @returns {*}
             * @private
             */
            _getSourceVal: function(sourceEl,filterValue,translator){
                var sourceVal = sourceEl.value || sourceEl.innerText;

                if(filterValue && filterValue === sourceVal){//过滤值
                    return '';
                }

                var property = sourceVal;
                if(translator && translator.hasOwnProperty(property)){
                    sourceVal = translator[property];
                }

                return sourceVal;
            }
        }
    });


    return  FieldTransEngine;

})();