const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Recherche un utilisateur avec le nom d'utilisateur spécifié dans le corps de la requête.
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    // Si une erreur se produit lors de la recherche, envoie un message d'erreur et un statut 500.
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // Si un utilisateur avec ce nom d'utilisateur est trouvé dans la bdd, envoie un message d'erreur et un statut 400.
    if (user) {
      res.status(400).send({ message: "Échec ! Le nom d'utilisateur est déjà utilisé !" });
      return;
    }

    // Si aucun utilisateur avec ce nom d'utilisateur n'est trouvé, passe à la vérification de l'email.

    // Recherche un utilisateur avec l'email spécifié dans le corps de la requête.
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      // Si une erreur se produit lors de la recherche, envoie un message d'erreur et un statut 500.
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // Si un utilisateur avec cet email est trouvé dans la bdd, envoie un message d'erreur et un statut 400.
      if (user) {
        res.status(400).send({ message: "Échec ! L'email est déjà utilisé !" });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Échec ! Rôle ${req.body.roles[i]} n'existe pas !`,
        });
        return;
      }
    }
  }

  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};
module.exports = verifySignUp;
