Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate:'notfound'
});

Router.route('/', function () {
    this.render('home');
});