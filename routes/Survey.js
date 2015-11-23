var express = require('express');
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
