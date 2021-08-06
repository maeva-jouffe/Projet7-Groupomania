const connection = require("../mySqlConfig");

// //Affichage des articles
// exports.getAllArticles = (req, res, next) => {
//     const query = "SELECT Articles.id, title, slug, description, subject, lien_web, date_post, username FROM Articles INNER JOIN Users ON Articles.user_id = Users.id WHERE Articles.deleted = false ORDER BY date_post DESC";
//     db.query(sql, function (err, data) {
//         if (err) {
//             return res.status(400).json({ err });
//         }
//         res.json({ status: 200, data, message: "Articles affichés avec succès !" })
//     });
// };


//Création d'un article
exports.createArticle = (req, res, next) => {
    const query = `INSERT INTO Articles(title, description, subject, link, user_id, date) VALUES (?,?,?,?,?,?)`;
    const values = [req.body.title, req.body.description, req.body.subject, req.body.link, req.body.user_id, req.body.date];
    connection.query(query, [values], function (err, data, fields) {
        if (err) {
            return res.status(400).json({ err });
        }
        res.json({ status: 201, data, message: "Article publié" })
    });
};

//Modification d'un article
exports.modifyArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    console.log(req.params.user_id);
    const query = "SELECT * FROM Articles WHERE user_id = ?";
    const value = req.params.user_id;
    connection.query(query, value, function (err, data) {
        if (err) {
            return res.status(400).json({ err });
        }
        const articleToModify = data[0];
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            //Création du nouveau slug correspondant au nouveau titre
            
            const query = `UPDATE Articles SET title = ?, description = ?, subject = ?, link = ?, user_id = ?, date = ? WHERE id = ?`;
            const values = [req.body.title, req.body.description, req.body.subject, req.body.link, req.body.user_id, req.body.date, req.params.id];
            connection.query(query, values, function (err, data, fields) {
                if (err) {
                    return res.status(400).json({ err });
                }
                res.json({ status: 201, data, message: "Article modifié !" })
            });
        } else {
            throw "Vous n\'avez pas les droits requis pour modifier ce contenu";
        }
    });
};


//Supprimer un article
exports.deleteArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    const query = "SELECT * FROM Articles WHERE id = ?";
    const value = req.params.id;
    connection.query(query, value, function (err, data) {
        if (err) {
            return res.status(400).json({ err });
        }
        const articleToDelete = data[0];
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToDelete.user_id === req.user.userId || req.user.isAdmin === 1) {
            const query = "UPDATE Articles SET deleted = true WHERE id = ?";
            value = req.params.id;
            connection.query(sql, value, function (err, data) {
                if (err) {
                    return res.status(400).json({ err });
                }
                res.json({ status: 200, data, message: "Article supprimé" })
            });
        } else {
            throw "Vous n\'avez pas les droits requis pour supprimer ce contenu";
        }
    });
};

