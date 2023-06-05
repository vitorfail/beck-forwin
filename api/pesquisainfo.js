const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 
const sequelize = require('sequelize')
const Op = sequelize.Op

async function pesquisainfo(token, id){
    if(id == ''|| id == null || id == undefined){
        return '1'
    }
    else{
        var autorization = token
        var resultado = await table.tabela_clientes.findAll({
            where:{
                id:id,
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return '1'
        }
        else{
            var id1 = resultado[0].id
            var nome = resultado[0].nome
            var data_nascimento = resultado[0].data_nascimento
            var cpf = resultado[0].cpf
            var estado_civil = resultado[0].estado_civil
            var genero = resultado[0].genero
            var uf = resultado[0].uf
            var endereco = resultado[0].endereco
            var cidade = resultado[0].cidade
            var telefone = resultado[0].telefone
            var email = resultado[0].email
            var notific = resultado[0].notific            
            return [id1, nome, data_nascimento, cpf, estado_civil, genero, uf, endereco, cidade, telefone, email, notific]    
        }
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await pesquisainfo(jwt.decode(req.headers.authorization.replace('Bearer ', '')), req.body.id)
            res.status(200).send(JSON.stringify({data:qtd}))    
        }
        else{
            res.status(200).send("USER_ERROR")
        }
    }
    catch(error){
        res.status(200).send(null)
    }
})
module.exports = router2;