class HomeController {
    
    homeView(req, res) {
        res.render('home/home', 
            {
                professor: 'Fulvio Fanelli', 
                integrantes: ["Rafael Ribeiro", "Vitor Otsuka"] 
            }
        );
    }
}

module.exports = HomeController;