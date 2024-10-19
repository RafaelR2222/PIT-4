class ContatoController {
    
    contatoView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        res.render('contato/contato', {usuario: usuario} );
    }
}

module.exports = ContatoController;