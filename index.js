require('dotenv').config();
var express = require('express')
const home = require('./pages/home.js')
const planilhas = require('./pages/planilhas.js')
const login_cadastro = require('./pages/login_cadastro.js')
const cadastro_cliente = require('./api/cadastrar_cliente.js')
const dadosuser = require('./api/dadosuser.js')
const pagamentos = require('./api/pagamentos.js')
const pesquisainfo = require('./api/pesquisainfo.js')
const pesquisa = require('./api/pesquisa.js')
const financeiro = require('./pages/financeiro.js')

const atualizar_cadastro = require('./api/atualizar_cadastro')


const app = express()
var cors = require('cors')

async function incio(){
    const database = require('./db.js');
    const tabelas = require('./tabelas.js');
    await database.sync();
}
incio()
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json({ extended: false }))

app.use('/api/planilhas', planilhas)
app.use('/api/cadastrar_cliente', cadastro_cliente)
app.use('/api/login_cadastro', login_cadastro)
app.use('/api/dadosuser', dadosuser)
app.use('/api/pagamentos', pagamentos)
app.use('/api/pesquisa', pesquisa)
app.use('/api/pesquisainfo', pesquisainfo)

const Port = process.env.PORT ||8080;
app.listen(Port, () => console.log("Servidor rodando na porta "+Port))

