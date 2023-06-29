const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  // Crée une nouvelle instance de User avec les informations fournies dans le corps de la requête.
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    leagues: req.body.leagues,
    roles: "64450f55d482a55bd81b49bf"
  });

  // Enregistre le nouvel utilisateur dans la base de données.
  user.save((err, user) => {

    // Si une erreur se produit lors de l'enregistrement, envoie un message d'erreur et un statut 500.
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    
    // Si l'utilisateur est enregistré avec succès, envoie un message de succès et un statut 200.
    res.status(200).send({ message: "L'utilisateur a été enregistré avec succès !" });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
    leagues: req.body.leagues,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Mot de passe incorrect !" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        leagues: user.leagues,
        roles: authorities,
        token: token
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Vous avez été déconnecté !" });
  } catch (err) {
    this.next(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};