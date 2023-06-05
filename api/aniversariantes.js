const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


module.exports =  async function aniversariantes(req){
    try{
        var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        var resultado = await table.tabela_clientes.findAll({
            attributes:['data_nascimento'],
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var lista = 0
            for(var i =0; resultado.length>i;i++){
                var data_formatada = resultado[i].data_nascimento.split("/") 
                var data = new Date(data_formatada[2], parseInt(data_formatada[1])-1, data_formatada[0])
                var hoje = new Date()
                if(data.getDay() == hoje.getDay() || data.getMonth() == hoje.getMonth()){
                    lista++
                }
            }
            return lista
        }
    }
    catch(error){
        console.log(error)
        return 'nada'
    }
}

