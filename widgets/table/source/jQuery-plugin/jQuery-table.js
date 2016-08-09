/**
 * 以jQuery插件的形式来提供表格组件
 * 1.借助jQuery选择器的优势
 * 2.采用OOP的开发方法
 */

//Usage 见例子

+(function($){
    $.extend($.fn,{
        buildTable:function(options){
            if(this.data("table")){
                var table = this.data("table")
                table.publicMethod().reBuildTable();
                return table;
            }else{
                var table = new $.Table(options,this[0]);
                this.data("table",table);
                return table;
            }
        }
    });

    //creator for table
    $.Table = function(options,tableContainer){
        this.settings = $.extend({}, $.Table.defaults,options);
        this.container = tableContainer;
        this.init();
    }

    $.extend($.Table,{
        defaults:{
            headData:[],
            bodyData:[]
        },
        setDefaults:function(settings){
            $.extend($.Table.defaults,settings);
        },
        prototype:{
            /**
             * 根据settings进行初始化工作
             */
            init:function(){
                this._loadThead();
                this._loadContent();
            },
            /**
             * 加载表头数据
             * @private
             */
            _loadThead:function(){
                $thead = $('<thead/>');
                $tr = $('<tr/>');
                $.each(this.settings.headData,function(index,meta){
                    $('<th/>').attr("name",meta.name)
                        .text(meta.title)
                        .appendTo($tr);
                });
                $thead.append($tr)
                    .appendTo($(this.container));
            },
            /**
             * 加载表格内容
             * @private
             */
            _loadContent:function(){
                var _self = this;
                var headData = _self.settings.headData;

                $tbody = $('<tbody/>');
                $.each(this.settings.bodyData,function(rowIndex,rowData){
                    $tr = _self._buildRow(rowIndex,rowData,headData);
                    $tbody.append($tr)
                        .appendTo($(_self.container));
                });
            },
            /**
             * 构造表格内容行
             * @param rowIndex
             * @param rowData
             * @param headData
             * @returns {*|HTMLElement}
             * @private
             */
            _buildRow:function(rowIndex,rowData,headData){
                $tr = $('<tr/>');

                $.each(headData,function(columnIndex,column){
                    var cellVal =  rowData[column.name] || "";

                    $td = $('<td/>').text(cellVal)
                        .appendTo($tr);
                    if(column.customColumn){//允许对表头字段进行定制
                        column.customColumn.call($td,rowIndex,columnIndex,cellVal,column);
                    }
                });
                return $tr;
            },
            /**
             * 向外提供的公共方法
             * @returns {{clearContent: clearContent}}
             */
            publicMethod:function(){
                var _self = this;
                return{
                    /**
                     * 清空内容
                     */
                    clearContent:function(){
                       $( _self.container).empty();
                    },
                    /**
                     * 重新构造表格
                     * @param options
                     */
                    reBuildTable:function(options){
                        if(options){
                            _self.settings = $.extend({}, $.Table.defaults,options);
                        }
                        _self.init();
                    }
                }
            }
        }
    })
})(jQuery);