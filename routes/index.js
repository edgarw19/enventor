var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var eventItem = require('../models/eventItems');
/* GET home page. */




//Get event items
router.get('/eventItems', function (req, res) {
  var isLoggedIn = false;
  if (req.user) isLoggedIn = true;
  eventItem.find(function(err, data) {
    var jsondata = JSON.stringify(data);
    res.render('eventItems', {events : jsondata, loggedIn: isLoggedIn, user: req.user });
  });


});

//post register information
router.post('/searchEvents', function(req, res) {
  var searchTitle = req.body.searchCriteria;
  var isLoggedIn = false;
  if (req.user) isLoggedIn = true;
   eventItem.find({title: searchTitle}, function(err, data) {
    console.log(data);
    var jsondata = JSON.stringify(data);
    res.render('searchEvents', {events : jsondata, loggedIn: isLoggedIn,  matching_events: data, user : req.user });
  });

});





//backbone URL to get event items
router.get('/eventList', function (req, res) {
	eventItem.find(function(err, data) {
		if(err) return;
		res.json(data);
  });


});

//post to add event to database
router.post('/addEvent', isLoggedIn, function (req, res) {
  var itemProperties = req.body;
  var tagsForSearching = [];

  for (var i = 0; i < itemProperties.modal_tags.length; i++)
  {
    tagsSearch.push(itemProperties.modal_tags[i].toLowerCase);
  }

  var newItem = new eventItem(
  {
    title: itemProperties.modal_title,
    description: itemProperties.modal_description,
    type: itemProperties.modal_type,
    tags: itemProperties.modal_tags,
    date: itemProperties.modal_date,
    picture: itemProperties.modal_picture,
    creator_id: req.user._id,
    time: itemProperties.modal_time,
    location: itemProperties.modal_location,
    titleSearch: itemProperties.modal_title.toLowerCase(),
    tagsSearch: tagsForSearching
  });
  newItem.save(function(err) {
    if (err)
      console.log('error on update');
    else
      console.log('successful update');
    res.redirect('/eventItems');

  });

});







//home page
router.get('/', function (req, res) {
  if (req.user){
    res.redirect('eventItems');
  }
  else
  {
    res.render('index');
  }

});


//register page 

router.get('/register', function(req, res) {

  res.render('register', {info:"stuff"});

});


//post register information
router.post('/register', function(req, res) {
  if((req.body.password).length < 4){
    return res.render("register", {info: "Get a longer password"});
  }
  User.register(new User({ username : req.body.username , name: req.body.name}), req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }

    passport.authenticate('local-signup')(req, res, function () {
      res.redirect('/eventItems');
    });
  });
});

//login page
router.get('/login', function(req, res) {
  res.render('login', {});
});


//post login credentials
router.post('/login', passport.authenticate('local', {
  successRedirect : '/eventItems',
  failureRedirect : '/login',
  failureFlash : true
}));

//currently needs more work
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
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
