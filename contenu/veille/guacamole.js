/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "guacamole",
  theme: "bastion",        // id du thème dans contenu/veille.js
  numero: 1,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "en-etude",     // "adoptee" | "non-retenue" | "en-etude"
  titre: "Apache Guacamole, un bastion dans le navigateur",
  resume: `
    Un bastion gratuit et open source : on administre ses serveurs (RDP, SSH, VNC) depuis une simple page web, et les sessions peuvent être enregistrées.
  `,
  contexte: `
    Thème : centraliser et tracer les accès d'administration de mon homelab. En cherchant ce qu'est un bastion et quelles solutions existent, j'ai retenu trois solutions très différentes. Guacamole est la plus simple et la seule entièrement gratuite.
  `,
  deroule: [
    {
      titre: "C'est quoi, un bastion ?",
      texte: `
        Un bastion est un **point de passage obligé** pour administrer des serveurs. Au lieu de se connecter directement à chaque machine, l'administrateur passe par le bastion, qui :

        1. vérifie **qui** se connecte ;
        2. vérifie s'il a le **droit** d'accéder à ce serveur ;
        3. **enregistre** la session, pour savoir après coup ce qui a été fait.
      `,
      illustrations: [
        { fichier: "e4_veille1_ex1_sans-ou-avec-bastion.svg", legende: "Sans bastion, un accès direct par serveur ; avec bastion, une seule porte d'entrée contrôlée" }
      ]
    },
    {
      titre: "La solution : Apache Guacamole",
      texte: `
        Guacamole est un projet de la fondation **Apache**. On l'installe sur un serveur, et on y accède avec un simple **navigateur web**, sans rien installer sur le poste de l'administrateur.

        - Il gère les protocoles **RDP** (Windows), **SSH** (Linux) et **VNC**.
        - Chaque utilisateur ne voit que les connexions qu'on lui a attribuées.
        - Les sessions peuvent être **enregistrées** et rejouées depuis l'historique des connexions.
      `,
      illustrations: []
    },
    {
      titre: "Avantages et inconvénients",
      texte: `
        - **Avantages** : gratuit, open source, simple à installer (une VM ou des conteneurs Docker suffisent), aucun logiciel à installer côté client.
        - **Inconvénients** : moins de fonctions de sécurité avancées qu'un produit commercial (par exemple la rotation automatique des mots de passe), et c'est à moi d'assurer les mises à jour.
      `,
      illustrations: []
    },
    {
      titre: "Ce que ça apporterait à mon projet",
      texte: `
        Je n'ouvrirais plus, pour le profil administrateur du VPN, qu'**un seul accès** : celui du bastion. Tous les accès aux serveurs passeraient par lui et seraient tracés. C'est aussi une compétence recherchée en entreprise, où les bastions sont courants.
      `,
      illustrations: [
        { fichier: "e4_veille1_comparatif-bastions.svg", legende: "Les trois solutions étudiées, comparées" }
      ]
    }
  ],
  conclusion: `
    Solution en cours d'étude, et c'est celle que je compte **tester en premier** dans mon homelab : elle est gratuite, simple et couvre tous les protocoles que j'utilise. Le test me dira si elle suffit à mon besoin.
  `
});
