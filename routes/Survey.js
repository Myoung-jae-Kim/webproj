var express = require('express'),
    Reply = require('../models/Reply'),
    // List = require('../models/List'),
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
  res.render('survey/edit', {survey: {}});
});

router.post('/', function(req, res, next) {
  var survey = new Survey({
    title: req.body.title,
    email: req.body.email,
    content: req.body.content
  });

  survey.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey/current');
  });
});

router.get('/current', function(req, res, next) {
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


// router.get('/reply', function(req, res, next) {
//   res.render('survey/reply');
// });

// router.post('/', function(req, res, next) {
//   var survey = new Survey({
//     email: req.body.email,
//     // password: req.body.password,
//     title: req.body.title,
//     content: req.body.content
//   });
//   // survey.number = survey.number + 1;
//   survey.save(function(err, doc) {
//     if (err) {
//       // console.error(err);
//       return next(err);
//     }
//     // res.redirect('/survey/' + doc.id);
//     res.redirect('/survey');
//   });
// });
//
// router.get('/:id', function(req, res, next) {
//   Survey.findById(req.params.id, function(err, survey) {
//     if (err) {
//       return next(err);
//     }
//     if (survey) {
//       survey.response = survey.response + 1;
//       survey.save(function(err) { });
//       res.render('survey/reply', {survey: survey});
//     }
//     return next(new Error('not found'));
//   });
// });
//
// router.get('/current', function(req, res, next) {
//   Survey.find({}, function(err, docs) {
//     if (err) {
//       // console.error(err);
//       return next(err);
//     }
//     res.render('survey/current', {surveying: docs});
//   });
// });
//
// router.get('/edit', function(req, res, next) {
//   res.render('survey/edit');
// });
//
// router.get('/:id/edit', function(req, res, next) {
//   Survey.findById(req.params.id, function(err, survey) {
//     if (err) {
//       return next(err);
//     }
//     res.render('survey/edit', {survey: survey});
//   });
// });

// router.put('/:id', function(req, res, next) {
//   Survey.findById(req.params.id, function(err, survey) {
//     if (err) {
//       return next(err);
//     }
//     survey.title = req.body.title;
//     survey.content = req.body.content;
//     survey.save(function(err) {
//       res.redirect('/survey/' + req.params.id);
//     });
//     res.redirect('back');
//   });
// });

// router.get('/reply', function(req, res, next) {
//   res.render('survey/reply');
// });

router.delete('/:id', function(req, res, next) {
  Survey.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey/current');
  });
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
