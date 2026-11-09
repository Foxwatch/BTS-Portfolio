/* Situation n°2 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "arrivee-depart",
  numero: 2,  // définitif : sert au nom des captures (e4_sit2_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Arrivée d'un collaborateur sur un poste existant",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.2.1", "B1.2.2", "B1.2.3", "B1.1.3"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Réaffectation d'un compte existant à un nouveau collaborateur : lien avec le ticket de départ, mise à jour de l'identité dans l'AD, contrôles Microsoft 365 et Freshservice.
  `,

  contexte: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `,

  etapes: [],

  conclusion: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `
});
