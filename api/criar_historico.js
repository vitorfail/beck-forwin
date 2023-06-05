module.exports= function (json){
    var list = []
    for(var i =0; i< json.length;i++){
        list.push(json[i].dataValues)
    }
    return list
}