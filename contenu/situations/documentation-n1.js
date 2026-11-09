/* Situation n°5 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "documentation-n1",
  numero: 5,  // définitif : sert au nom des captures (e4_sit5_…)
  statut: "brouillon",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Rédaction d'une documentation pour les techniciens N1",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.5.3"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    [À COMPLÉTER : sujet et extrait anonymisé à fournir]
  `,

  contexte: {
    role: "[À COMPLÉTER]",
    objectif: "[À COMPLÉTER]",
    raison: "[À COMPLÉTER]"
  },

  outils: [],

  etapes: [],

  conclusion: `
    [À COMPLÉTER]
  `
});
