const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    console.log(req.body);
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce)
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
exports.likeOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            switch (req.body.like) {
                case -1:
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.userDisliked.push(req.body.userId);
                    Sauce = {
                        "dislikes": sauce.dislikes,
                        "userDisliked": sauce.userDisliked
                    }
                    break;
                case 0:
                    if (sauce.userDisliked.find(user => user === req.body.userId)) {
                        sauce.userDisliked = sauce.userDisliked.filter(user => user !== req.body.userId);
                        sauce.dislikes = sauce.dislikes - 1;
                        Sauce = {
                            "dislikes": sauce.dislikes,
                            "userDisliked": sauce.userDisliked
                        }
                    } else {
                        sauce.userLiked = sauce.userLiked.filter(user => user !== req.body.userId);
                        sauce.likes = sauce.likes - 1;
                        Sauce = {
                            "likes": sauce.likes,
                            "userLiked": sauce.userLiked
                        }
                    }
                    break;
                case 1:
                    sauce.likes = sauce.likes + 1;
                    sauce.userLiked.push(req.body.userId);
                    Sauce = {
                        "likes": sauce.likes,
                        "userLiked": sauce.userLiked
                    }
                    break;
                default:
                    return res.status(500).json({ error });
            }

            Sauce.updateOne({ _id: req.params.id }, { set: Sauce })
                .then(() => res.status(200).json({ message: 'Sauce liké !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(() => res.status(400).json({ error: 'Sauce non trouvée !' }));
}