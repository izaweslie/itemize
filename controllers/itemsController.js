const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Item
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Item
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Item
      .create(req.body.item)
      .then(dbItem => {
        return db.Users.findOneAndUpdate({user_id: req.body.id}, { $push: { items: dbItem._id } }, { new: true });
      })
      .then(dbUser => {
         res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Item
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log(req.params)
    db.Item
      .findById({ _id: req.params.item_id })
      .then(dbItem =>{
        return db.Users.findOneAndUpdate({user_id: req.params.id}, { $pull: { items: dbItem._id } })
        }) //dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

