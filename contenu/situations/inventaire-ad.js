/* Situation n°1 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "inventaire-ad",
  numero: 1,  // définitif : sert au nom des captures (e4_sit1_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Fiabilisation de l'inventaire via Active Directory",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.1"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Croisement de l'Active Directory avec le tableau des RH et les dates de dernière connexion, pour repérer les postes inactifs et mettre à jour les objets et leurs descriptions.
  `,

  contexte: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `,

  etapes: [],

  conclusion: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `
});
