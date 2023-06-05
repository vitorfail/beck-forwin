const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function deletar_cliente(token, id){
    try{
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_clientes.deleteAll(
            {where:{
                id_user:autorization.id,
                id:id
            }}
        )
        return '1'
    }
    catch(error){
        return '0'
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await atualizar_cadastro(req.headers.authorization.replace('Bearer ', ''), req.body.id)
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