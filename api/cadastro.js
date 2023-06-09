const tabelas = require('../tabelas.js')
const md5 = require('md5');

module.exports = async function criar(username, password, email, cnpj, nome, endereco, municipio, uf, tema){
    var result = await tabelas.tabela_user.findAll({
        where:{
            username:(username)
        }
    })
    if(result.length === 0){
        try{
            tabelas.tabela_user.create({
                username: (username),
                password: (md5(password)),
                email: (email),
                cnpj: (cnpj),
                nome: (nome),
                endereco: (endereco),
                municipio: (municipio),
                uf: (uf),
                tema: (tema),
            })
            return '1';
        }
        catch(error){
            return '2';
        }
    }
    else{
        return 'EXIST';
    }
}