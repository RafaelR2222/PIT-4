const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const HomeRoute = require('./routes/homeRoute.js');
const ProdutoRoute = require('./routes/produtoRoute.js');
const FornecedorRoute = require('./routes/fornecedorRoute.js');
const QuartoRoute = require('./routes/quartoRoute.js');
const ReservaRoute = require('./routes/reservaRoute.js');
const BlogRoute = require('./routes/blogRoute.js');
const ContatoRoute = require('./routes/contatoRoute.js');
const UsuarioRoute = require('./routes/usuarioRoute.js');
const LoginRoute = require('./routes/loginRoute.js');
const CompraRoute = require('./routes/compraRoute.js');
const Autenticacao = require('./middlewares/autenticacao.js');

const app = express();
dotenv.config(); // Carrega as variáveis de ambiente
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da nossa página de layout
app.set('layout', './layout');
app.use(ejsLayout);
app.use(cookieParser());

app.use(express.static("public/"));

const auth = new Autenticacao();

const homeRota = new HomeRoute();
app.use('/', homeRota.router);

const loginRota = new LoginRoute();
app.use('/login', loginRota.router);

const quartoRota = new QuartoRoute();
app.use('/quartos', quartoRota.router);

const reservaRota = new ReservaRoute();
app.use('/reservas', reservaRota.router);

const blogRota = new BlogRoute();
app.use('/blog', blogRota.router);

const contatoRota = new ContatoRoute();
app.use('/contato', contatoRota.router);

// Rotas que precisam de autenticação de funcionários ou admin
app.use(auth.verificaUsuarioFuncLogado);

// Rotas protegidas (admin e funcionários podem acessar)
const produtoRota = new ProdutoRoute();
app.use('/produtos', produtoRota.router);

const fornecedorRota = new FornecedorRoute();
app.use('/fornecedor', fornecedorRota.router);

const compraRota = new CompraRoute();
app.use('/compras', compraRota.router);

// Rotas que somente administradores podem acessar (usuários)
const usuarioRota = new UsuarioRoute();
app.use('/usuarios', auth.verificaUsuarioADMLogado, usuarioRota.router);

app.listen(5000, function () {
    console.log("Servidor web iniciado no link: http://localhost:5000");
});
