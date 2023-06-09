const database = require('./db.js')
const Sequelize = require('sequelize')
const Users = database.define('Users', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    politicas:{
        type: Sequelize.STRING,
        defaultValue: '0'
    },
    email:{
        type: Sequelize.STRING,
    },
    cnpj:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    nome:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    endereco:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    municipio:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    uf:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    tema:{
        type: Sequelize.STRING,
        defaultValue: 'temapadrao'
    }
})
const Acumulado = database.define('Acumulado', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    id_cliente:{
        type: Sequelize.INTEGER,
        allowNull:true,
    },
    id_user:{
        type: Sequelize.INTEGER,
        allowNull:true,
    },
    nome:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    valor:{
        type: Sequelize.DECIMAL,
        allowNull:false,
    },
    visitas:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
})
const Clientes = database.define('Clientes', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    id_user:{
        type: Sequelize.INTEGER,
        allowNull:true,
    },
    nome :{
        type: Sequelize.STRING,
        allowNull:true
    },
    data_nascimento :{
        type: Sequelize.STRING,
        allowNull:true    
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull:true
    },
    estado_civil:{
        type: Sequelize.STRING,
        allowNull:true
    },
    genero:{
        type: Sequelize.STRING,
        allowNull:true
    },
    uf:{
        type: Sequelize.STRING,
        allowNull:true
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull:true
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull:true
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull:true
    },
    notific:{
        type: Sequelize.STRING,
        allowNull:true
    }
})
const Contas = database.define('Contas', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    id_user:{
        type: Sequelize.INTEGER,
        allowNull:true,
    },
    conta :{
        type: Sequelize.STRING,
        allowNull:true
    },
    data :{
        type: Sequelize.STRING,
        allowNull:true    
    },
    mensal:{
        type: Sequelize.STRING,
        allowNull:true
    },
    valor:{
        type: Sequelize.STRING,
        allowNull:true
    },
    situacao:{
        type: Sequelize.STRING,
        allowNull:true
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull:true
    },
})
const Pagamentos = database.define('Pagamentos', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    id_user:{
        type: Sequelize.INTEGER,
        allowNull:true,
    },
    id_cliente :{
        type: Sequelize.STRING,
        allowNull:true
    },
    nome :{
        type: Sequelize.STRING,
        allowNull:true    
    },
    valor:{
        type: Sequelize.FLOAT,
        allowNull:true
    },
    data:{
        type: Sequelize.STRING,
        allowNull:true
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull:true
    },
    procedimento:{
        type: Sequelize.STRING,
        allowNull:true
    },
})
module.exports = {
    tabela_user:Users,
    tabela_contas:Contas,
    tabela_acumulado:Acumulado,
    tabela_clientes: Clientes,
    tabela_pagamentos:Pagamentos
}