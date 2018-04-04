const { Book } = require('../models/book');

module.exports = app => {
  app.get('/api/getbook', (req, res) => {
    const id = req.query.id;
    Book.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
  });

  app.get('/api/books', (req, res) => {
    // http://localhost:5000/api/books?skip=2&limit=5&order=asc
    const skip = parseInt(req.query.skip, 10);
    const limit = parseInt(req.query.limit, 10);
    const { order } = req.query;
    // order = asc[ending] || desc[ending]
    Book.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.json({ success: false });
        res.status(200).send(doc);
      });
  });

  app.post('/api/book', (req, res) => {
    const book = new Book(req.body);
    book.save((err, doc) => {
      if (err) return res.json({ success: false });
      res.status(200).json({
        bookId: doc._id,
        post: true,
      });
    });
  });

  app.post('/api/book_update', (req, res) => {
    Book.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
          success: true,
          doc,
        });
      },
    );
  });

  app.delete('/api/book_delete', (req, res) => {
    const { id } = req.query;
    Book.findByIdAndRemove(id, (err, doc) => {
      if (err) return res.json({ success: false });
      res.json(true);
    });
  });
};
