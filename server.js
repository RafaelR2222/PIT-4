const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const HomeRoute = require('./routes/homeRoute');
const ProdutoRoute = require('./routes/produtoRoute');
const FornecedorRoute = require('./routes/fornecedorRoute');
const QuartoRoute = require('./routes/quartoRoute');
const ReservaRoute = require('./routes/reservaRoute');
const BlogRoute = require('./routes/blogRoute');
const ContatoRoute = require('./routes/contatoRoute');
const UsuarioRoute = require('./routes/usuarioRoute');
const LoginRoute = require('./routes/loginRoute');
const CompraRoute = require('./routes/compraRoute');

const Autenticacao = require('./middlewares/autenticacao');

const app = express()

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded())
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(ejsLayout);
app.use(cookieParser());

app.use(express.static("public/"))

let auth = new Autenticacao();

let homeRota = new HomeRoute();
app.use('/', homeRota.router);
let loginRota = new LoginRoute();
app.use('/login', loginRota.router);
let quartoRota = new QuartoRoute();
app.use('/quartos', quartoRota.router);
let reservaRota = new ReservaRoute();
app.use('/reservas', reservaRota.router);
let blogRota = new BlogRoute();
app.use('/blog', blogRota.router);
let contatoRota = new ContatoRoute();
app.use('/contato', contatoRota.router);

//Daqui pra baixo tem que ser ADM
// Rotas que precisam de autenticação de funcionários ou admin
app.use(auth.verificaUsuarioFuncLogado);

// Rotas protegidas (admin e funcionários podem acessar)
let produtoRota = new ProdutoRoute();
app.use('/produtos', produtoRota.router);
let fornecedorRota = new FornecedorRoute();
app.use('/fornecedor', fornecedorRota.router);
let compraRota = new CompraRoute();
app.use('/compras', compraRota.router);

// Rotas que somente administradores podem acessar (usuários)
let usuarioRota = new UsuarioRoute();
app.use('/usuarios', auth.verificaUsuarioFuncLogado, usuarioRota.router);
//app.use('/usuarios/cadastrar', auth.verificaUsuarioADMLogado, usuarioRota.router);
app.listen('5000', function () {
    console.log("servidor web iniciado no link: localhost:5000");
})