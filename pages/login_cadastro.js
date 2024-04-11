const express2 = require('express');
const router2 = express2.Router();
const api_login = require('../api/login')
const api_cadastro = require('../api/cadastro')
const Check = require('../api/checkUser.js')
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function login(req){
    var token = api_login(req.body.user, req.body.pass)
    return JSON.stringify({data:token})
}
async function cadastro(req){
    var cadastro = api_cadastro(req.body.username, req.body.password, req.body.email)
    return JSON.stringify({data:cadastro})
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            if(req.body.passe == 'login'){
                var qtd = await login(req)
                res.status(200).send(qtd)        
            }
            if(req.body.passe == 'cad'){
                var qtd = await cadastro(req)
                res.status(200).send(qtd)        
            }
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