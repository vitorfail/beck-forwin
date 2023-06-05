const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


async function Politicasprivacidade(req){
    try{
        var autorization = jwt.decode(token)
        var resultado = await table.tabela_user.findAll({
            where:{id_user:autorization.id}
        })
        if(resultado.length == 0){
            return '2'
        }
        else{
            if(resultado[0] == '0'){
                return false
            }
            if(resultado[0] == '1'){
                return true
            }
        }
    }
    catch(error){
        return '2'
    }
}

router2.post('/', async (req, res) =>{
    try{
        var checando = await Check(req)
        if(checando == true){
            var qtd = await Politicasprivacidade(req.headers.authorization.replace('Bearer ', ''), req.body.key)
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