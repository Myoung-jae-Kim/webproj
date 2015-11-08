var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Survey', {
    tasks: [
      {_id: 1, content: '설문1', category: '학교', priority: 1, deadline: null},
      {_id: 2, content: '이런저런일2', category: null, priority: 2, deadline: null},
      {_id: 3, content: '이런저런일3', category: '집', priority: 3, deadline: new Date("2015-12-25")},
      {_id: 4, content: '이런저런일4', category: '학교', priority: 1, deadline: new Date("2015-11-21")},
      {_id: 5, content: '이런저런일5', category: '집', priority: 2, deadline: null},
    ],
    category: [
      '학교',
      '집',
    ]
  });
});

router.post('/', function(req, res, next) {
  req.flash('success', '새로운 설문조사가 추가 되었습니다');
  res.redirect('/Survey');
});

router.put('/:id', function(req, res, next) {
  req.flash('success', '설문조사 내용 변경');
  res.redirect('/Survey');
});

router.delete('/:id', function(req, res, next) {
  req.flash('success', '설문조사 삭제완료');
  res.redirect('/Survey');
});

module.exports = router;
