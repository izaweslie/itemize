const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Users
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    // db.Item
    //   .find(req.query)
    //   .sort({ date: -1 })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    //console.log("req", req)
    db.Users
      //.findById({user_id: req.params.id})
      .findOne({user_id: req.params.id}).populate("items")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // db.Item
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    //console.log("req", req);
    db.Users
      .create({user_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // db.Item
    //   .create(req.body)
    //   .then((dbModel) => {
    //     res.json(dbModel)
    //     console.log(dbModel)
    //   })
    //   .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("req", req.params.id)
    db.Users
      .findOneAndUpdate({ "user_id": req.params.id }, {$push: { "items": 10}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // db.Item
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Users
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // db.Item
    //   .findById({ _id: req.params.id })
    //   .then(dbModel => dbModel.remove())
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};

// module.exports = {
//   findAll: function(req, res) {
//     db.Item
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Item
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Item
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Item
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Item
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
// };

