const t = require('../tabelas.js')
var jwt = require('jsonwebtoken')
require('dotenv').config(); 

module.exports = async function idades(token){
    try{
        var autorization = jwt.decode(token)
        var resultado = await t.tabela_clientes.findAll({
            attributes:['data_nascimento'],
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var lista = []
            for(var i =0; resultado.length>i;i++){
                var data_formatada = resultado[i].data_nascimento.split("/") 
                var data = new Date(data_formatada[2], data_formatada[1], data_formatada[0])
                var hoje = new Date()
                var idade =  hoje.getFullYear() - data.getFullYear()
                lista.push(idade)
            }
            return lista
        }
    }
    catch(error){
        console.log(error)
        return 'nada'
    }
};
