/**
 * Created by ZHe on 16/8/8.
 */
var fieldTransEngine = new FieldTransEngine({outputElType:'a'});
fieldTransEngine.toReadonly([{
    id:'test1',
    translator:{
        'dddddd':'Haha'
    },
    appendPoint:document.getElementById('container')
    //filterValue:'dddddd'
    //outputElType:'none'
}]);
