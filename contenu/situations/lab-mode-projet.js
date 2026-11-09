/* Situation n°9 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "lab-mode-projet",
  numero: 9,  // définitif : sert au nom des captures (e4_sit9_…)
  statut: "brouillon",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "ecole",  // "pro" | "perso" | "ecole"
  lieu: "UFIP",
  titre: "Lab en équipe mené en mode projet",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.4.1", "B1.4.2", "B1.4.3", "T.1"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    [À COMPLÉTER : prochain lab en trio, avec le kit projet]
  `,

  contexte: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `,

  etapes: [],

  conclusion: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `
});
