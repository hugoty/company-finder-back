jwt = require("jsonwebtoken");
CUSTOM_PRIVATE_KEY = require("../auth/private_key.js");
User= require("../models/User.js");

module.exports = Login = {
    login: async (req, res) => {
        User.findOne({ pseudo: req.body.username } )
            .then((user) => {
                if (!user) {
                    const message = "L'utilisateur demandé n'existe pas.";
                    return res.status(404).json({ message });
                }
                if (req.body.password === user.password && user.pseudo === req.body.username) {
                    console.log("Ok");
                    const token = jwt.sign(
                        { userId: user.id },
                        CUSTOM_PRIVATE_KEY,
                        { expiresIn: "24h" }
                    );

                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.status(200).json({ message, data: user, token });
                } else {
                    const message = "Le mot de passe est incorrect";
                    return res.status(401).json({ message });
                }
            })
            .catch((error) => {
                const message =
                    "L'utilisateur n'as pas pu se connecter. Réessayez dans quelques instants.";
                return res.status(500).json({ message, data: error });
            });
    },
};
