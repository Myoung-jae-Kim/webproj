var express = require('express'),
    Reply = require('../models/Reply'),
    List = require('../models/List'),
    Survey = require('../models/Survey');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  res.render('survey');
});

router.get('/create', function(req, res, next) {
  // List.findById(req.params.id)
  console.log(req.params);
  res.render('survey/edit', {survey: {}});
});

router.post('/', function(req, res, next) {
  var survey = new Survey({
    title: req.body.title,
    email: req.body.email,
    content: req.body.content,
    list: req.body._id
  });

  survey.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey/current');
  });
});

router.get('/current', function(req, res, next) {
  // console.log(req.params);
  Survey.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('survey/current', {surveys: docs});
  });
});

router.get('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    Reply.find({survey: survey.id}, function(err, replys) {
      if (err) {
        return next(err);
      }
      res.render('survey/reply', {survey: survey, replys: replys});
    });
  });
});

router.post('/:id/replys', function(req, res, next) {
  var reply = new Reply({
    survey: req.params.id,
    email: req.body.email,
    content: req.body.content
  });

  reply.save(function(err) {
    if (err) {
      return next(err);
    }
    Survey.findByIdAndUpdate(req.params.id, {$inc: {numReply: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/survey/' + req.params.id);
    });
  });
});

router.get('/:id/edit', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    res.render('survey/edit', {survey: survey});
  });
});

router.put('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }

    survey.email = req.body.email;
    survey.title = req.body.title;
    survey.content = req.body.content;
    survey.save(function(err) {
      res.redirect('/survey/' + req.params.id);
    });

    res.redirect('back');
  });
});

router.delete('/:id', function(req, res, next) {
  Survey.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey/current');
  });
});


module.exports = router;
