const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


module.exports=  async function quantidade(req){
    try{
        var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        var resultado = await table.tabela_clientes.count({
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            return resultado
        }
    }
    catch(error){
        return 'nada'
    }
}
