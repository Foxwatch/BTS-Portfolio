/* Situation n°3 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "etiquetage-tablettes",
  numero: 3,  // définitif : sert au nom des captures (e4_sit3_…)
  statut: "brouillon",  // passer à "publie" quand les captures sont déposées (et avec l'accord du tuteur)
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Identification des tablettes lors d'un renouvellement de parc",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.1"],

  outils: ["Étiqueteuse", "Microsoft Teams"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Pendant le renouvellement des tablettes, j'ai étiqueté chaque appareil avec son numéro de série et transmis la correspondance avec sa destination, pour faciliter le support.
  `,

  contexte: {
    role: "Technicien support N1 en alternance, sur une tâche du projet de renouvellement des tablettes piloté par le DSI.",
    objectif: "Pouvoir identifier chaque tablette rapidement une fois arrivée en établissement.",
    raison: "Démarche à mon initiative : sans repère visible, retrouver une tablette précise lors d'un appel au support aurait été difficile."
  },

  etapes: [
    {
      titre: "Étiqueter chaque tablette",
      texte: `
        Avant l'expédition, je relève le **numéro de série** de chaque tablette et je le colle sur l'appareil sous forme d'étiquette. J'en ai préparé **12**.
      `,
      captures: [
        { fichier: "e4_sit3_etape1_tablettes-etiquetees.png", legende: "Les tablettes étiquetées avec leur numéro de série", masquer: "milieu des numéros de série (garder les derniers caractères)" }
      ]
    },
    {
      titre: "Transmettre la correspondance",
      texte: `
        J'envoie à mon responsable, sur Teams, la liste **numéro de série → établissement de destination**. Le support sait ainsi quelle tablette se trouve où.
      `,
      captures: [
        { fichier: "e4_sit3_etape2_message-teams.png", legende: "Le message envoyé au responsable", masquer: "nom du responsable, milieu des numéros de série, noms des établissements" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : les 12 tablettes sont identifiables et leur destination est connue. Limite : la liste reste dans un message Teams ; l'idéal serait de l'enregistrer dans un **outil de gestion de parc** pour qu'elle soit consultable par toute l'équipe.
  `
});
