const router = require("express").Router();
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const UserModel = require("../database/models/user.model");
const { keyPub } = require("../env/keys");
const TodoModel = require("../database/models/todo.model");

const cleanUser = (user) => {
  if (!user) {
    console.error("Utilisateur non défini!");
    return null;  // Retourne null si l'utilisateur est indéfini
  }

  const { password, ...cleanedUser } = user.toObject ? user.toObject() : user;
  return cleanedUser;
};

// create a new user
router.post("/add", async (req, res) => {
  const body = req.body;
  let user = new UserModel({
    name: body.name,
    email: body.email,
    password: await bcrypt.hash(body.password, 8),
  });
  try {
    const savedUser = await user.save();  // Sauvegarde de l'utilisateur
    res.status(200).json(cleanUser(savedUser));  // Retourne l'utilisateur sans le mot de passe
  } catch (err) {
    
    let errorMsg = "Erreur lors de l'inscription!";
    if(err && err.code === 11000) {
      errorMsg = "Un compte avec cet email exist déjà!";
    }
    console.error("CREATE USER: ", errorMsg);
    res.status(400).json(errorMsg);
  }
});

// delete current user
router.delete("/delete", async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    if(ObjectId.isValid(decodedToken.sub)) {
      const query = { _id: new ObjectId(decodedToken.sub) };
      try {
        await TodoModel.deleteMany(query);
        await UserModel.findOneAndDelete(query);
        res.status(200).clearCookie('token').json(null);
      } catch (err) {
        console.error("DELETE USER: ", err);
        res.status(400).json("Erreur lors de la suppression de l'utilisateur");
      }
    }
  } else {
    res.status(400).json(null);
  }
});

// update the current user
router.patch("/edit", async (req, res) => {
  const token = req.cookies?.token;
  const body = req.body;
  if (token) {
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    if(ObjectId.isValid(decodedToken.sub)) {
      const query = { _id: new ObjectId(decodedToken.sub) };
      const updates = {
        $set: body
      };
      try {
        let result = await UserModel.findOneAndUpdate(
          query, 
          updates, 
          { 
            select: { "_id": 0, "password": 0, '__v': 0 },
            new: true 
          }
        );
        res.status(200).json(result);
      } catch (err) {
        console.error("UPDATE USER: ", err);
        res.status(400).json(null);
      }
    }
  } else {
    res.status(400).json(null);
  }
});

// get the current user
// not a function .select("-_id -password -__v").exec();
router.get("/", async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const user = await UserModel.findById(decodedToken.sub)
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json(null);
      }
    } catch (err) {
      console.error("GET USER: ", err);
      res.status(400).json(null);
    }
  } else {
    res.status(400).json(null);
  }
});

// login user
router.post("/login", async (req, res) => {
  // Pour tester le Test coverage vizualizer
  return res.json({ message: "test" });
});

module.exports = router;
