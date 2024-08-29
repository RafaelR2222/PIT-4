class HomeController {
    
    homeView(req, res) {
        res.render('home/home', 
            {
                professor: 'Fulvio Fanelli', 
                integrantes: ["Brayann Lima", "Leandro Silva", "Rafael Ribeiro"] 
            }
        );
    }
}

module.exports = HomeController;