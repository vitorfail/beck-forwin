const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


module.exports =  async function pagamentos_mes(req, mes, ano){
    try{
        var token = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_pagamentos.findAll({
            where:{
                id_user:autorization.id
            }
        })
        if(resultado.length == 0){
            return 0
        }
        else{
            var array = []
            var data = []
            var valor = []
            var nome = []
            var id_cliente = []
            var tipo = []
            for(var i = 0; resultado.length <i;i++){
                var linha = resultado[i]
                if(mes == 'Todos'){
                    var data_mes = linha.data.split('-')
                    if(data_mes.length == 3){
                        if(data_mes[0] == ano){
                            data.push(resultado[i].data)
                            valor.push(resultado[i].valor)
                            nome.push(resultado[i].nome)
                            id_cliente.push(resultado[i].id_cliente)
                            tipo.push(resultado[i].tipo)
                        }
                    }
                }
                else{
                    var data_mes = linha.data.split('-')
                    if(data_mes.length == 3){
                        if(data_mes[0] == ano || data_mes[1] == mes){
                            data.push(resultado[i].data)
                            valor.push(resultado[i].valor)
                            nome.push(resultado[i].nome)
                            id_cliente.push(resultado[i].id_cliente)
                            tipo.push(resultado[i].tipo)
                        }
                    }
                }
            }
            array.push(data, valor, nome, id_cliente, tipo)
            return array
        }
    }
    catch(error){
        return 'nada'
    }
}
