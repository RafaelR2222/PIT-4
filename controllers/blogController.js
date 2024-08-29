class BlogController {
    
    blogView(req, res) {
        res.render('blog/blog');
    }
}

module.exports = BlogController;