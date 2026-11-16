/* Situation n°3 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "etiquetage-tablettes",
  numero: 3,  // définitif : sert au nom des captures (e4_sit3_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Préparation et traçabilité des tablettes lors d'un renouvellement de parc",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.1", "T.1"],

  outils: ["Tablettes Android", "Enrôlement par QR code", "Étiqueteuse", "Microsoft Teams"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Préparation et déploiement des nouvelles tablettes, puis étiquetage avec leur numéro de série et transmission de la liste au responsable, pour la traçabilité des envois.
  `,

  contexte: {
    role: "Technicien support N1 en alternance, sur une tâche du projet de renouvellement des tablettes piloté par le DSI.",
    objectif: "Préparer les tablettes pour les établissements et savoir à tout moment quelle tablette part où.",
    raison: "La préparation m'a été confiée ; l'étiquetage et la liste envoyée au responsable sont une initiative personnelle, pour la traçabilité des envois."
  },

  etapes: [
    {
      titre: "Préparer et déployer les tablettes",
      texte: `
        Pour chaque tablette :

        - je pose une **vitre de protection** et une **coque** renforcée, adaptées à un usage en établissement ;
        - je la **déploie par QR code** : la tablette est enrôlée et configurée automatiquement, sans réglage à la main.
      `,
      captures: []
    },
    {
      titre: "Étiqueter chaque tablette avec son numéro de série",
      texte: `
        Je colle sur chaque tablette une étiquette avec son **numéro de série**. Il se lit sans démonter la coque : le support peut identifier l'appareil tout de suite, par exemple lors d'un appel.
      `,
      captures: [
        { fichier: "e4_sit3_etape2_tablettes-etiquetees.jpg", legende: "Les tablettes équipées de leur coque et étiquetées", masquer: "début des numéros de série" }
      ]
    },
    {
      titre: "Transmettre la liste pour la traçabilité",
      texte: `
        Une fois un lot prêt, j'envoie à mon responsable sur Teams la liste des numéros de série, les actions faites et l'établissement de destination. Les tablettes attendent ensuite leur carton d'expédition.

        Le jour de cette capture, le lot comptait **9 tablettes**, sur les **12** que j'ai préparées.
      `,
      captures: [
        { fichier: "e4_sit3_etape3_message-teams.png", legende: "Le message envoyé au responsable : numéros de série, actions faites et destination", masquer: "début des numéros de série, établissement de destination" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : les 12 tablettes sont prêtes, identifiables, et on sait où chacune est envoyée. Limite : la liste reste dans un message Teams ; l'idéal serait de l'enregistrer dans un **outil de gestion de parc**, consultable par toute l'équipe.
  `
});
