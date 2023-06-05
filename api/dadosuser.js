const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function Dadosuser(token){
    try{
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_user.findAll({
            where:{id:autorization.id}
        })
        if(resultado.length == 0){
            return '1'
        }
        else{
            return {cnpj:resultado.cnpj,
                nome:resultado.nome,
                endereco:resultado.endereco,
                municipio:resultado.municipio,
                uf:resultado.uf,
                tema:resultado.tema}
        }
    }
    catch(error){
        return '1'
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await Dadosuser(req.headers.authorization.replace('Bearer ', ''))
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