/* Situation n°6 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "adguard-home",
  numero: 6,  // définitif : sert au nom des captures (e4_sit6_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "perso",  // "pro" | "perso" | "ecole"
  lieu: "Homelab",
  titre: "Filtrage DNS avec AdGuard Home",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.5.1", "B1.5.2"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Installation d'AdGuard Home sur un Raspberry Pi pour filtrer publicités et traceurs sur tout le réseau, avec chiffrement des requêtes en DNS over TLS.
  `,

  contexte: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `,

  etapes: [],

  conclusion: `
    [À COMPLÉTER : rédigé à l'étape 3]
  `
});
