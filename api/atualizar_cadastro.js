const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function atualizar_cadastro(token, id, nome, data, cpf, estado_civil, genero, uf, endereco, cidade, telefone, email, notific){
    try{
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_clientes.update(
            {where:{id_user:autorization.id, id: id}},
            {nome: nome},
            {data: data},
            {cpf: cpf},
            {estado_civil: estado_civil},
            {genero: genero},
            {uf: uf},
            {endereco: endereco},
            {cidade: cidade},
            {telefone: telefone},
            {email: email},
            {notific: notific}
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
            var qtd = await atualizar_cadastro(req.headers.authorization.replace('Bearer ', ''), req.body.id ,req.body.nome,
            req.body.data,
            req.body.cpf,
            req.body.estado_civil,
            req.body.genero,
            req.body.uf,
            req.body.endereco,
            req.body.cidade,
            req.body.telefone,
            req.body.email,
            req.body.notific,)
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