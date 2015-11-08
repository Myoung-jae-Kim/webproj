module.exports = function(app, passport) {
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/Survey',
    failureRedirect : 'signin',
    faulureFlash : true
  }));

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email'})
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFalsh : true
    }),
    function(req, res, next) {
      req.flash('success', '로그인 되었습니다.');
      res.redirect('/Survey');
    }
  );

  app.get('/signout', function(req, res) {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
  });
};
