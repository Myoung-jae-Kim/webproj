var express = require('express'),
    User = require('../models/User'),
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
  res.render('survey/create', {survey: {}});
});

router.post('/', function(req, res, next) {
  var survey = new Survey({
    email: req.body.email,
    password: req.body.password,
    title: req.body.title,
    content: req.body.content
  });
  survey.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey/' + doc.id);
  });
});

router.get('/current', function(req, res, next) {
  res.render('survey/current');
});

router.get('/edit', function(req, res, next) {
  res.render('survey/edit');
});

router.get('/reply', function(req, res, next) {
  res.render('survey/reply');
});
// router.post('/', function(req, res, next) {
//   req.flash('success', '새로운 설문조사가 추가 되었습니다');
//   res.redirect('/Survey');
// });
//
// router.put('/:id', function(req, res, next) {
//   req.flash('success', '설문조사 내용 변경');
//   res.redirect('/Survey');
// });
//
// router.delete('/:id', function(req, res, next) {
//   req.flash('success', '설문조사 삭제완료');
//   res.redirect('/Survey');
// });

module.exports = router;
