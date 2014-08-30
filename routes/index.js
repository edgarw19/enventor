var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var eventItem = require('../models/eventItems');
/* GET home page. */


router.get('/backbone', function (req, res) {
  res.render('backbone', { user : req.user, title: "blah" });

});



router.get('/eventItems', function (req, res) {
	eventItem.find(function(err, data) {
		var jsondata = JSON.stringify(data);
		 res.render('eventItems', {events : jsondata });
		});


});

router.get('/eventList', function (req, res) {
	eventItem.find(function(err, data) {
		if(err) return;
		res.json(data);
		});


});

router.post('/addEvent', function (req, res) {
  var newItem = new eventItem();

  console.log(req.body.modal_title);
  console.log(req.body.modal_description);

  console.log(req.body.modal_type);
  newItem.save(function(err) {
        if (err)
          console.log('error on update');
        else
          console.log('successful update');
      });
  res.redirect('/eventItems');

});


router.get('/', function (req, res) {
  res.render('index', { user : req.user, title: "blah" });

});

router.get('/backbone', function (req, res) {
  res.render('backbone', {});

});

router.get('/test', function (req, res) {
  res.render('test', { });

});

router.get('/register', function(req, res) {

  res.render('register', {info:"stuff"});

});


router.post('/register', function(req, res) {
  if((req.body.password).length < 4){
    return res.render("register", {info: "Get a longer password"});
  }
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }

    passport.authenticate('local-signup')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
});




router.get('/search', function(req, res) {      
  res.render('search', {});
});

router.post('/search', function(req, res) {
  var university = req.body.university.toLowerCase();
  var categorysearch = req.body.categorysearch;
  if (categorysearch) {
    var categorysearch = categorysearch.toLowerCase();
    User.find({categories: {$regex: new RegExp("^" + categorysearch)}, education_key : { $regex: new RegExp("^" + university)}}, function(err, matching_users) {
      res.render('searchresults', {user_array: matching_users, school : req.body.university, categorysearch: req.body.categorysearch});
    });
  }
  else {
    User.find({education_key : { $regex: new RegExp("^" + university)}}, function(err, matching_users){
      res.render('searchresults', {user_array : matching_users, school : req.body.university});
    });
  }
});





    router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    router.get('/ping', function(req, res){
      res.send("pong!", 200);
    });

    function isLoggedIn(req, res, next) {

      if (req.isAuthenticated())
        return next();
      res.redirect('/');
    };



    module.exports = router;
