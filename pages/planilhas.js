const express2 = require('express');
const router2 = express2.Router();
const api_quantidade = require('../api/quantidade_clientes')
const api_aniversariantes = require('../api/aniversariantes')
const api_atualiza = require('../api/atualiza')
const api_idades = require('../api/idades')
const api_sexo = require('../api/sexo')
const api_estadocivil = require('../api/estado_civil')
const api_politicasprivacidade = require('../api/politicasprivacidade')
const api_tipospagamento = require('../api/tipospagamento')
const Check = require('../api/checkUser.js')
require('dotenv').config(); 


async function planilhas(req){
    var pagamentos_mes = await api_pagamentosmes(req)
    var atualiza = await api_atualiza(req)
    var idades = await api_idades(req)
    var quantidade_de_clientes = await api_quantidade(req)
    var aniversariantes = await api_aniversariantes(req)
    var politicasprivacidade = await api_politicasprivacidade(req)
    var sexo = await api_sexo(req)
    var estadocivil = await api_estadocivil(req)
    var tipospagamento = await api_tipospagamento(req)
    return JSON.stringify({qtd:quantidade_de_clientes, aniver:aniversariantes,  atualiza:atualiza,
        politicasprivacidade:politicasprivacidade,idades:idades, sexo:sexo
        , pagamentosmes:pagamentos_mes, estado_civil:estadocivil, tipospagamento:tipospagamento})
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await planilhas(req)
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