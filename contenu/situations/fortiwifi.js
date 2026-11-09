/* Situation n°7 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "fortiwifi",
  numero: 7,  // définitif : sert au nom des captures (e4_sit7_…)
  statut: "brouillon",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "perso",  // "pro" | "perso" | "ecole"
  lieu: "Homelab",
  titre: "Segmentation réseau avec un FortiWiFi 60D",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.3", "B1.5.1", "B1.5.2"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    [À COMPLÉTER : VLAN, politiques de filtrage et routage inter-VLAN, captures à fournir]
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
