#Installation So Pekocko

Dossier dwj-projet6 :

- npm install
- npm install node -sass

Lancer le serveur avec 'ng serve'.

Dossier backend :

- npm init avec un entrypoint server.js
- npm install -g nodemon (Permet de redémarrer le serveur à chaque sauvegarde automatiquement).
- npm install --save express (Express est un framework pour construire des applications web basées sur Node.js).
- npm install --save mongoose (Mongoose est une bibliothèque JavaScript).
- npm install --save mongoose-unique-validator (Permet d'enregistrer dans la BDD qu'une seule fois la même adresse mail).
- npm install --save bcrypt (Permet de hasher les informations clients).
- npm install --save body-parser (body-parser est un middleware express qui stocke en tant qu'object javascript).
- npm install --save jsonwebtoken (Il permet l'échange sécurisé de jetons (tokens) entre plusieurs parties).
- npm install --save multer (Permet de gérer les fichiers entrants dans les requêtes HTTP).

Lancer 'nodemon server' pour executer le serveur.

Ouvrir une page HTML et dans l'url, ajoutez 'localhost://4200'.