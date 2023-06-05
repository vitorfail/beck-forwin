const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


module.exports = async function tipospagamento(req){
    try{
        var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        var resultado = await table.tabela_pagamentos.findAll({
            attributes:['data', 'valor'],
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var debito_ = 0
            var credito_ = 0
            var credito_parcelado_ = 0
            var a_vista_ = 0
            var boleto_ = 0
            var cheque_ = 0
            var array = 0
            for(var i =0; resultado.length > i; i++){
                if(resultado[i].tipo ==  'debito'){
                    debito_ = debito_+1
                }
                if(resultado[i].tipo ==  'credito'){
                    credito_ = credito_+1
                } 
                if(resultado[i].tipo == 'credito-parcelado'){
                    credito_parcelado_ = credito_parcelado_+1
                } 
                if(resultado[i].tipo == 'a-vista'){
                    a_vista_ = a_vista_+1
                }
                if(resultado[i].tipo ==  'boleto'){
                    boleto_ = boleto_+1
                }
                if(resultado[i].tipo ==  'cheque'){
                    cheque_ = cheque_+1
                }
            }
            array.push(debito_, credito_, credito_parcelado_, a_vista_, boleto_, cheque_)
            return array;
}
    }
    catch(error){
        return 'nada'
    }
}
