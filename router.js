Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate:'notfound',
    loadingTemplate:'loding'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/about', function () {
    this.render('about');
});
