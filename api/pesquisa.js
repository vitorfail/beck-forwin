const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 
const sequelize = require('sequelize')
const Op = sequelize.Op

async function pesquisa(token, name){
    var autorization = token
    var n = ''
    if(name == '' || name == undefined || name == 'todos'){
        n = ''
    }
    else{
        n = name
    }
    try{
        var resultado = await table.tabela_clientes.findAll({
            where:{
                id_user:autorization.id,
                nome:{
                    [Op.like]:'%'+n+'%'
                }
            }
        })
        if(resultado.length == 0){
            return '1'
        }
        else{
            var array = []
            var id = []
            var nome = []
            var email = []
            var telefone = []
            var genero = []
            for(var i =0; resultado.length> i;i++){
                id.push(resultado[i].id)
                nome.push(resultado[i].nome)
                email.push(resultado[i].email)
                telefone.push(resultado[i].telefone)
                genero.push(resultado[i].genero) 
            }
            $conexao = null;
            array.push(id, nome, email, telefone, genero);
            return array
        }    
    }
    catch(error){
        return '1'
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await pesquisa(jwt.decode(req.headers.authorization.replace('Bearer ', '')), req.body.nome)
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