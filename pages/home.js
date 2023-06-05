const express2 = require('express');
const router2 = express2.Router();
const api_quantidade = require('../api/quantidade_clientes')
const api_aniversariantes = require('../api/aniversariantes')
const api_pagamentosmes = require('../api/pagamentos_mes')
const api_atualiza = require('../api/atualiza')
const api_contaspainel = require('../api/contas_painel')
const api_rankingstop = require('../api/rankings_top')
const api_politicasprivacidade = require('../api/politicasprivacidade')
const Check = require('../api/checkUser.js')
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function home(req){
    var atualiza = await api_atualiza(req)
    var quantidade_de_clientes = await api_quantidade(req)
    var aniversariantes = await api_aniversariantes(req)
    var pagamentos_mes = await api_pagamentosmes(req, 'Todos', '')
    var contas_painel = await api_contaspainel(req)
    var rankingstop_pag = await api_rankingstop(req, 'pagamento')
    var rankingstop_visitas = await api_rankingstop(req, 'visita')
    var politicasprivacidade = await api_politicasprivacidade(req)
    return JSON.stringify({qtd:quantidade_de_clientes, aniver:aniversariantes, 
        pagamentosmes:pagamentos_mes, atualiza:atualiza, contas_painel:contas_painel, 
        rank_pag:rankingstop_pag, rank_visitas:rankingstop_visitas,
        politicasprivacidade:politicasprivacidade})
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await home(req)
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