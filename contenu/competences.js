/* ==========================================================================
   competences.js : les compétences de la grille E4 (bloc 1)
   --------------------------------------------------------------------------
   Chaque compétence a :
     - un code (B1.1 … B1.6, ou « T » pour la compétence transverse) ;
     - un titre et une courte description ;
     - ses savoir-faire, tels qu'écrits dans le référentiel, chacun avec
       son propre code (B1.1.1, B1.1.2…) ;
     - les indicateurs donnés par le prof, quand il y en a.

   ⚠️ On ne met ICI aucune preuve. Ce sont les situations qui déclarent
   les savoir-faire qu'elles valident (champ « competences » de chaque
   fichier de contenu/situations/). Les pages compétences se remplissent
   toutes seules à partir de ces déclarations.

   Une compétence sans aucune preuve publiée n'est PAS affichée sur le site
   (règle du prof : toute compétence affichée doit être prouvée). Elle reste
   visible sur la page verification.html.
   ========================================================================== */

ajouterCompetence({
  code: "B1.1",
  titre: "Gérer le patrimoine informatique",
  description: `
    Connaître et tenir à jour l'ensemble des ressources informatiques de l'organisation (postes, comptes, équipements, logiciels), contrôler qui a accès à quoi, et s'assurer que les services restent disponibles et sauvegardés.
  `,
  savoirFaire: [
    { code: "B1.1.1", texte: "Recenser et identifier les ressources numériques" },
    { code: "B1.1.2", texte: "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique" },
    { code: "B1.1.3", texte: "Mettre en place et vérifier les niveaux d'habilitation associés à un service" },
    { code: "B1.1.4", texte: "Vérifier les conditions de la continuité d'un service informatique" },
    { code: "B1.1.5", texte: "Gérer des sauvegardes" },
    { code: "B1.1.6", texte: "Vérifier le respect des règles d'utilisation des ressources numériques" }
  ],
  indicateurs: [
    "Le recensement est réalisé au moyen d'un outil de gestion des actifs."
  ]
});

ajouterCompetence({
  code: "B1.2",
  titre: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
  description: `
    Prendre en charge les demandes des utilisateurs, de la réception du ticket à sa clôture : les comprendre, les orienter, les résoudre en suivant les procédures, et en rendre compte clairement.
  `,
  savoirFaire: [
    { code: "B1.2.1", texte: "Collecter, suivre et orienter des demandes" },
    { code: "B1.2.2", texte: "Traiter des demandes concernant les services réseau et système" },
    { code: "B1.2.3", texte: "Traiter des demandes concernant les applications" }
  ],
  indicateurs: [
    "La méthode de diagnostic est adéquate.",
    "Le logiciel de gestion de parc et d'incidents est utilisé de manière maîtrisée.",
    "Le compte rendu d'intervention est clair et explicite."
  ]
});

ajouterCompetence({
  code: "B1.3",
  titre: "Développer la présence en ligne de l'organisation",
  description: `
    Contribuer à l'image de l'organisation sur internet : mesurer la visibilité de ses services en ligne et participer à leur amélioration.
  `,
  savoirFaire: [
    { code: "B1.3.1", texte: "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques" },
    { code: "B1.3.2", texte: "Référencer les services en ligne de l'organisation et mesurer leur visibilité" },
    { code: "B1.3.3", texte: "Participer à l'évolution d'un site Web exploitant les données de l'organisation" }
  ],
  indicateurs: []
});

ajouterCompetence({
  code: "B1.4",
  titre: "Travailler en mode projet",
  description: `
    Mener un travail en équipe de façon organisée : comprendre les objectifs, répartir et planifier les tâches, puis suivre l'avancement avec des indicateurs.
  `,
  savoirFaire: [
    { code: "B1.4.1", texte: "Analyser les objectifs et les modalités d'organisation d'un projet" },
    { code: "B1.4.2", texte: "Planifier les activités" },
    { code: "B1.4.3", texte: "Évaluer les indicateurs de suivi d'un projet et analyser les écarts" }
  ],
  indicateurs: []
});

ajouterCompetence({
  code: "B1.5",
  titre: "Mettre à disposition des utilisateurs un service informatique",
  description: `
    Installer, configurer et tester un service avant de le livrer, puis accompagner les utilisateurs dans sa prise en main.
  `,
  savoirFaire: [
    { code: "B1.5.1", texte: "Réaliser les tests d'intégration et d'acceptation d'un service" },
    { code: "B1.5.2", texte: "Déployer un service" },
    { code: "B1.5.3", texte: "Accompagner les utilisateurs dans la mise en place d'un service" }
  ],
  indicateurs: []
});

ajouterCompetence({
  code: "B1.6",
  titre: "Organiser son développement professionnel",
  description: `
    Continuer à apprendre par soi-même, suivre les évolutions du métier grâce à la veille technologique, et construire son identité et son projet professionnels.
  `,
  savoirFaire: [
    { code: "B1.6.1", texte: "Mettre en place son environnement d'apprentissage personnel" },
    { code: "B1.6.2", texte: "Mettre en œuvre des outils et stratégies de veille informationnelle" },
    { code: "B1.6.3", texte: "Gérer son identité professionnelle" },
    { code: "B1.6.4", texte: "Développer son projet professionnel" }
  ],
  indicateurs: []
});

ajouterCompetence({
  code: "T",
  titre: "Rendre compte d'un travail réalisé en équipe projet",
  description: `
    Compétence transverse : présenter un travail mené à plusieurs en montrant clairement sa propre contribution.
  `,
  savoirFaire: [
    { code: "T.1", texte: "Rendre compte d'un travail réalisé au sein d'une équipe projet en mettant en évidence sa contribution personnelle" }
  ],
  indicateurs: []
});
