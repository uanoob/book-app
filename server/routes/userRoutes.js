const { User } = require('../models/user');

module.exports = (app) => {
  app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
    });
  });

  app.post('/api/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err) {
        return res.json({
          success: false,
        });
      }
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });

  app.post('/api/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) return res.json({ isAuth: false, message: 'Auth fail, email not found' });
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) return res.json({ isAuth: false, message: 'Wrong password' });
        user.generateToken((e, u) => {
          if (e) return res.status(400).send(e);
          res.cookie('auth', u.token).json({
            isAuth: true,
            id: u._id,
            email: u.email,
          });
        });
      });
    });
  });

  app.post('/api/get_reviewer', (req, res) => {
    const { id } = req.query;
    User.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        name: doc.name,
        lastname: doc.lastname,
      });
    });
  });
};
