const table = require('../tabelas.js') 
var jwt = require('jsonwebtoken');
require('dotenv').config(); 

module.exports =  async function Rankings(req, passe){
    var autorization = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
    if( passe == 'visita'){
        try{
            var resultado = await table.tabela_acumulado.findAll({
                attributes:['nome', 'visitas'],
                where:{
                    id_user:autorization.id
                },
                order:['visitas', 'DESC'],
                limit:5
            })
            var array= array();
            var nome = array();
            var visitas = array();
            if(resultado.length > 0){
                for(var i = 0; resultado.length > i;i++){
                    nome.push(resultado[i].nome);
                    visitas.push(resultado[i].visitas);
                }
                array.push(nome, visitas);
                return array;
            }
            else{
                return '1';
            }
        }
        catch(error){
            return '2';
        } 
    }
    if( passe == 'pagamento'){
        try{
            var resultado = await table.tabela_acumulado.findAll({
                attributes:['nome', 'valor'],
                where:{
                    id_user:autorization.id
                },
                order:['valor', 'DESC'],
                limit:5
            })
            var array= array();
            var nome = array();
            var valor = array();
            if(resultado.length > 0){
                for(var i = 0; resultado.length > i;i++){
                    nome.push(resultado[i].nome);
                    visitas.push(resultado[i].valor);
                }
                array.push(nome, valor);
                return array;
            }
            else{
                return '1';
            }
        }
        catch(error){
            return '2';
        } 
    }
}
