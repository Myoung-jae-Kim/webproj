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

router.get('/create/:id', function(req, res, next) {
  // List.findById(req.params.id)
  // console.log(req.params);
  res.render('survey/edit', {survey: {}, listId : req.params.id});
});

router.post('/', function(req, res, next) {
  var survey = new Survey({
    title: req.body.title,
    email: req.body.email,
    content: req.body.content,
    listId : req.body.listId
  });

  survey.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey');
  });
});

router.get('/current/:id', function(req, res, next) {
  // console.log(req.params);
  console.log("일단 들어옴! /current/:id");
  console.log(req.params.id);
  Survey.find({listId : req.params.id}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('survey/current', {surveys: docs, listId : req.params.id});
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

router.get('/:id/:listId/edit', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    res.render('survey/edit', {survey: survey, listId : req.params.listId});
  });
});

router.put('/:id', function(req, res, next) {
  console.log("here is /:id");
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }

    survey.email = req.body.email;
    survey.title = req.body.title;
    survey.content = req.body.content;
    console.log("값 변경 성공");
    survey.save(function(err) {
      if(err) {
        return next(err);
      }
      console.log("성공 current이동");
      res.redirect('/survey/current/' + req.body.listId);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Survey.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey');
  });
});


module.exports = router;
