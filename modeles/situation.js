/* ==========================================================================
   MODÈLE D'UNE SITUATION : à copier dans contenu/situations/<id>.js
   --------------------------------------------------------------------------
   1. Copier ce fichier dans contenu/situations/ et le renommer (minuscules,
      sans accents ni espaces, ex. sauvegarde-proxmox.js).
   2. Remplir chaque champ. Info inconnue → [À COMPLÉTER : …].
   3. Ajouter "situations/<id>.js" dans contenu/liste.js.
   4. Mettre statut: "publie" seulement quand les captures sont prêtes.
   ========================================================================== */
ajouterSituation({
  id: "mon-id",               // = nom du fichier sans .js
  numero: 10,                 // numéro suivant le plus grand déjà utilisé ; ne jamais le changer
  statut: "brouillon",        // "publie" = visible ; "brouillon" = caché
  type: "pro",                // "pro" | "perso" | "ecole"
  lieu: "Emera",              // "Emera" | "Homelab" | "UFIP"
  titre: "Titre court et précis",

  // Savoir-faire validés : codes de contenu/competences.js (ex. "B1.1.5")
  competences: [],

  outils: [],

  resume: `
    Une ou deux phrases pour les cartes.
  `,

  // 2 à 4 lignes au total
  contexte: {
    role: "Mon rôle dans cette mission.",
    objectif: "Ce qu'il fallait obtenir.",
    raison: "Pourquoi cette mission m'a été confiée."
  },

  // Le déroulé, de A à Z, comme un tutoriel. Chaque étape a ses captures.
  etapes: [
    {
      titre: "Titre de l'étape",
      texte: `
        Explication courte.

        - une action ;
        - une autre action.
      `,
      captures: [
        // Fichier à déposer dans images/situations/ avec exactement ce nom
        { fichier: "e4_sit10_etape1_description.png", legende: "Ce que montre la capture", masquer: "ce qu'il faut masquer" }
      ]
    }
  ],

  // Environ 2 lignes : objectif atteint ou non, et pourquoi
  conclusion: `
    Objectif atteint : …
  `
});
