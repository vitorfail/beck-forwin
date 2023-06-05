const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


module.exports =  async function Contas_painel(req){
    try{
        var token = jwt.decode(req.headers.authorization.replace('Bearer ', '')) 
        var mes_query = req.body.mes_query
        var dat = req.body.dat
        var ano = req.body.ano
        var marcador = req.body.marcador
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_contas.findAll({
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var array = []
            var id = []
            var conta = []
            var valor = []
            var data = []
            var situacao = []
            var tipo = []
            var validade = []
            for(var i =0; resultado.length <i; i++){
                var data_formatada = resultado[i].data.split('-');
                if(data_formatada.length == 3){
                    if(marcador == "Todos"){
                        var data  = new Date(resultado[i].data)
                        var data2 = new Date(dat)
                        var dif = Math.ceil(Math.abs(data.getTime() - data2.getTime()) / (1000 * 3600 * 24));                        
                        id.push(resultado[i].id)
                        conta.push(resultado[i].conta)
                        valor.push(resultado[i].valor)
                        data.push(resultado[i].data)
                        situacao.push(resultado[i].situacao)
                        tipo.push(resultado[i].tipo)
                        validade.push(dif)
                    }    
                    else{
                        if(data_formatada[1] == mes_query && data_formatada[0] == ano){
                            var data  = new Date(resultado[i].data)
                            var data2 = new Date(dat)
                            var dif = Math.ceil(Math.abs(data.getTime() - data2.getTime()) / (1000 * 3600 * 24));                        
                            id.push(resultado[i].id)
                            conta.push(resultado[i].conta)
                            valor.push(resultado[i].valor)
                            data.push(resultado[i].data)
                            situacao.push(resultado[i].situacao)
                            tipo.push(resultado[i].tipo)
                            validade.push(dif)
                        }
                    }
                }
            }
            array.push(id, conta, valor, data, situacao ,tipo ,validade)
            return array
        }
    }
    catch(error){
        return 'nada'
    }
}
