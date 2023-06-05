const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function pagamentos(token, id){
    try{
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_pagamentos.findAll({
            where:{
                id_cliente:id,
                id_user:autorization.id
            }
        })
        var resultado2 = await table.tabela_acumulado.findAll({
            attributes: [
                'id', 'valor',
                [Sequelize.literal('(RANK() OVER (ORDER BY valor DESC))'), 'rank']
            ],
            where:{
                id_cliente:id,
                id_user:autorization.id
            }
        })
        if(resultado.length == 0 || resultado2.length == 0){
            return 0
        }
        else{
            var array = []
            var data = []
            var valor = []
            var nome = []
            var id_cliente = []
            var tipo = []
            var procedimento = []
            var rank = resultado2.rank
            for(var i = 0; resultado.length <i;i++){
                data.push(resultado[i].data)
                valor.push(resultado[i].valor)
                nome.push(resultado[i].nome)
                id_cliente.push(resultado[i].id_cliente)
                tipo.push(resultado[i].tipo)
                procedimento.push(resultado[i].procedimento)
            }
            array.push(nome, data, valor, tipo,  procedimento,rank)
            return array
        }
    }
    catch(error){
        return 'nada'
    }
}
router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await pagamentos(req.headers.authorization.replace('Bearer ', ''), req.body.id)
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