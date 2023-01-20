User = require("../models/User.js");
City = require("../models/City.js");

const Users = {
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: "Error fetching users from database" });
    }
  },
  getByUsername: async (req, res) => {
    const username = req.params.username;
    try {
      const user = await User.findOne({ pseudo: username } )
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: "Error fetching user from database" });
    }
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: "Error fetching user from database" });
    }
  } 
};

module.exports =  Users;
