const express2 = require('express');
const router2 = express2.Router();
const Check = require('./checkUser.js')
const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function cadastro(req){
    try{
        var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
        console.log(autorization)
        var resultado = await table.tabela_clientes.findAll({
            where:{
                id_user:autorization.id,
                cpf:req.body.cpf_input
            }
        })
        if(resultado.length == 0){
            var r = await table.tabela_clientes.create({
                id_user:autorization.id,
                nome:req.body.nome_input,
                data_nascimento:req.body.data_input,
                cpf:req.body.cpf_input,
                estado_civil:req.body.estado_civil_input,
                genero:req.body.genero_input,
                uf:req.body.uf_input,
                endereco:req.body.endereco_input,
                cidade:req.body.cidade_input,
                telefone:req.body.telefone_input,
                email:req.body.email_input,
                notific:req.body.notific_input,
            })
            return 1
        }
        else{
            return '0'
        }
    }
    catch(error){
        console.log(error)
        return 'nada'
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var cad = await cadastro(req)
            res.status(200).send(JSON.stringify({cad}))    
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