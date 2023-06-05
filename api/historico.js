const express3 = require('express');
const { Op } = require('sequelize')
const routas = express3.Router();
var Check3 = require('./checkUser.js')
const tablelas = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
var json_array = require('./criar_historico.js')
async function check_historico(req){
    try{
        var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        var resultado = await tablelas.tabela_trf.findAll({
            where:{
                [Op.or]:[
                    {debitedAccountId:autorization.id},
                    {creditedAccountId:autorization.id}
                ]
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{

            var j = json_array(resultado)
            return {dados:j, id:autorization.id}
        }
    }
    catch(error){
        return 'ERROR'
    }
}

routas.post('/', async (req, res) =>{
    try{
        var checando = await Check3(req)
        if(checando == true){
            var historico = await check_historico(req)
            res.status(200).send(JSON.stringify({historico}))    
        }
        else{
            res.status(200).send("USER_ERROR")
        }
    }
    catch(error){
        res.status(200).send(null)
    }
})
module.exports = routas;