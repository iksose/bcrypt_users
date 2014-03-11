var express = require('express')
    , app = express()
    , db = require('./config/dbschema')
    , path = require('path')
    , pass = require('./config/pass')
    , passport = require('passport')
    , basic_routes = require('./routes/basic')
    , user_routes = require('./routes/user')
    , movie = movie = require('./config/movies')
    , flash = require('connect-flash');

app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

// use express.session before passport, so that passport session will work
app.use(express.session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// clearly denote public content
// app.use('/client', express.static('public'));
app.use(express.static(path.join(__dirname, 'client')));

// set up our security to be enforced on all requests to secure paths
app.all('/secure', pass.ensureAuthenticated);
app.all('/secure/admin', pass.ensureAdmin);


// app.use(function(req, res, next) {
//   res.locals.messages = "Hahahaha"
//   next()
// })


// Basic pages
app.get('/', basic_routes.index);

// Login pages
app.get('/dmz/login', user_routes.getlogin);
app.post('/dmz/login', user_routes.postlogin);
app.get('/dmz/logout', user_routes.logout);

// secure pages
app.get('/secure/account', user_routes.account);

//admin pages
app.get('/secure/admin', user_routes.admin);

app.get('/secure/admin/movies', pass.ensureAdmin, movie.findAll);
app.post('/secure/admin/movies', pass.ensureAdmin, movie.addMovie)

app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});

