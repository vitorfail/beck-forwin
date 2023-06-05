const express2 = require('express');
const router2 = express2.Router();
const api_quantidade = require('../api/quantidade_clientes')
const api_aniversariantes = require('../api/aniversariantes')
const api_pagamentosmes = require('../api/pagamentos_mes')
const api_politicasprivacidade = require('../api/politicasprivacidade')
const Check = require('../api/checkUser.js')
require('dotenv').config(); 


async function financeiro(req){
    var quantidade_de_clientes = await api_quantidade(req)
    var aniversariantes = await api_aniversariantes(req)
    var pagamentos_mes = await api_pagamentosmes(req, req.body.mes, req.body.ano)
    var politicasprivacidade = await api_politicasprivacidade(req)
    return JSON.stringify({qtd:quantidade_de_clientes, aniver:aniversariantes, 
        pagamentosmes:pagamentos_mes, politicasprivacidade:politicasprivacidade})
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await financeiro(req)
            res.status(200).send(qtd)    
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