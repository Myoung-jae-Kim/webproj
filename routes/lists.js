var express = require('express'),
    User = require('../models/User'),
    List = require('../models/List');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}

router.get('/', needAuth, function(req, res, next) {
  List.find({user: req.user.id}, function(err, lists) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    res.json(lists);
  });
});

router.post('/', needAuth, function(req, res, next) {
  console.log(req.body);
  if (!req.body.content) {
    return res.status(400).json({message: 'need content'});
  }

  var list = new List({
    content: req.body.content,
    category: req.body.category || "N/A",
    priority: req.body.priority || 3,
    deadline: req.body.deadline,
    user: req.user.id
  });

  list.save(function(err, doc) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    res.status(201).json(doc);
  });
});

router.put('/:id', needAuth, function(req, res, next) {
  List.findById(req.params.id, function(err, list) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!list) {
      return res.status(404).json({message: 'task not found'});
    }
    if (req.body.content) {
      list.content = req.body.content;
    }
    if (req.body.category) {
      list.category = req.body.category;
    }
    if (req.body.priority) {
      list.priority = req.body.priority;
    }
    if (req.body.deadline) {
      list.deadline = req.body.deadline;
    }
    if (req.body.done) {
      list.done = req.body.done;
    }

    list.save(function(err) {
      if (err) {
        return res.status(500).json({message: 'internal error', desc: err});
      }
      res.json(list);
    });
  });
});

router.get('/:id', needAuth, function(req, res, next) {
  List.findById(req.params.id, function(err, list) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!list) {
      return res.status(404).json({message: 'task not found'});
    }
    res.json(list);
  });
});

router.delete('/:id', needAuth, function(req, res, next) {
  List.findOneAndRemove({_id: req.params.id}, function(err, list) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!list) {
      return res.status(404).json({message: 'task not found'});
    }
    res.json({id: list._id});
  });
});

module.exports = router;
