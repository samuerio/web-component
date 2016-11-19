var conditionItemList = ['express','AND','(','express','OR','(','express','AND','express',')','OR','express',')','AND','express','AND','(','express','OR','express',')'];



var parseResult = parseOuter(conditionItemList);
console.log(parseResult);
console.log(JSON.stringify(transToMongoDbJson(parseResult),null,'\t'));

/**
 * 解析最外层的括号
 * @param conditionItems
 * @returns {{}}
 */
function parseOuter(conditionItems){

    //1.遍历一次,将()里面逻辑包裹成一个conditionItems列表(可能存在多个conditionItems)

    var parseRs = [];
    var tempRs = [];

    var flag = 0;

    conditionItems.map(function(conditionItem){

        if('(' === conditionItem){
            ++flag;
            if(1 != flag){//非最外层的"("
                tempRs.push(conditionItem);
            }
            return;
        }

        if(')' === conditionItem){
            --flag;
            if(0 != flag){//非最外层的")"
                tempRs.push(conditionItem);
            }else{
                parseRs.push(tempRs)
                tempRs = [];
            }
            return;
        }

        if(0 === flag){
            parseRs.push(conditionItem);
        }else{
            tempRs.push(conditionItem);
        }

    });

    return parseRs
}

function transToMongoDbJson(parseArr){
    var mongodbJson = {};
    var key = getParseArrKey(parseArr);
    mongodbJson[key] = [];

    parseArr.map(function(parseMeta){
        if(Array.isArray(parseMeta)){
            var extraParseMeta = parseOuter(parseMeta);
            var extraMongodbJson = transToMongoDbJson(extraParseMeta);
            mongodbJson[key].push(extraMongodbJson);
            return;
        }

        if('OR' === parseMeta || 'AND' === parseMeta ){
            return;
        }else{
            mongodbJson[key].push({type:'express'});
        }
    });
    return mongodbJson;
}

function  getParseArrKey(parseArr){
    var key = '';
    var map = {
        OR:'$or',
        AND:'$and'
    };
    parseArr.map(function(parseMeta){

        if('OR' === parseMeta || 'AND' === parseMeta){
            var tempKey = map[parseMeta];
            if(key != '' && tempKey !== key){
                alert("错误的表达式");
            }else{
                key = tempKey;
            }
        }

    });
    return key;
}



