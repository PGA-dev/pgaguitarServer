var express = require('express');
var router = express.Router();

router.post('/signup', (req, res) => {
  User.register(
      new User({username: req.body.username}),
      req.body.password,
      err => {
          if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
          } else {
              passport.authenticate('local')(req, res, () => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({success: true, status: 'Registration Successful!'});
              });
          }
      }
  );
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({success: true, status: 'You are successfully logged in!'});
// });

module.exports = router;
