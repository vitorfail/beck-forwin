const t = require('../tabelas.js')
var jwt = require('jsonwebtoken')

module.exports = async function estado_civil(token){
    try{
        var autorization = jwt.decode(token)
        var resultado = await t.tabela_clientes.findAll({
            attributes:['estado_civil'],
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var array = []
            for(var i =0; resultado.length> i; i++){
                array.push(resultado[i].estado_civil)
            } 
            return array
        }
    }
    catch(error){
        return 'nada'
    }
}