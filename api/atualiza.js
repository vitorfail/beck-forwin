const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


module.exports = async function atualiza(req){
    try{
        var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        var resultado = await table.tabela_clientes.findAll({
            order:['id', 'DESC'],
            limit:5,
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var array = [] 
            var nome = []
            var telefone = []
            var genero = []
            for(var i = 0; resultado.length > i; i++){
                nome.push(resultado[i].nome)
                telefone.push(resultado[i].telefone)
                genero.push(resultado[i].genero)
            }
            array.push(nome, telefone, genero)
            return array
        }
    }
    catch(error){
        return 'nada'
    }
}
