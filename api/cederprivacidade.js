const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function Cederprivacidade(token, key){
    try{
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_user.update(
            {where:{id_user:autorization.id}},
            {politicas: key}
        )
        return'1'
    }
    catch(error){
        return '2'
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await Cederprivacidade(req.headers.authorization.replace('Bearer ', ''), req.body.key)
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