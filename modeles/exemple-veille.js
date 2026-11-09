/* ==========================================================================
   MODÈLE D'UN EXEMPLE DE VEILLE : à copier dans contenu/veille/<id>.js
   --------------------------------------------------------------------------
   Un exemple = UNE solution trouvée pendant la veille pour répondre au
   besoin d'un thème (thèmes définis dans contenu/veille.js).
   1. Copier ce fichier dans contenu/veille/ et le renommer.
   2. Remplir les champs. Info inconnue → [À COMPLÉTER : …].
   3. Ajouter "veille/<id>.js" dans contenu/liste.js, après veille.js.
   ========================================================================== */
ajouterExempleVeille({
  id: "mon-exemple",          // = nom du fichier sans .js
  theme: "dns",               // id d'un thème de contenu/veille.js
  numero: 3,                  // numéro de l'exemple dans son thème
  statut: "brouillon",        // "publie" ou "brouillon"
  verdict: "en-etude",        // "adoptee" | "non-retenue" | "en-etude"
  titre: "Nom de la solution",

  // Facultatif : id d'une situation où la solution a été mise en place
  // situationLiee: "adguard-home",

  resume: `
    Une phrase pour la carte.
  `,

  // 2 à 4 lignes : le thème, et comment j'ai trouvé cette solution (source, date)
  contexte: `
    Thème : …. Trouvée le … grâce à … (Feedly, Google Alertes, Reddit, CERT-FR…).
  `,

  // Présentation de la solution, puis ce qu'elle apporte à l'entreprise ou à mon projet
  deroule: [
    {
      titre: "La solution",
      texte: `
        …
      `,
      illustrations: [
        // Fichier à déposer dans images/veille/ (capture d'un test ou schéma, jamais une image d'un autre site)
        { fichier: "e4_veille2_ex3_description.png", legende: "Ce que montre l'illustration" }
      ]
    },
    {
      titre: "Ce que ça apporte",
      texte: `
        - …
      `,
      illustrations: []
    }
  ],

  // 2 à 3 lignes : solution adoptée ou non, et pourquoi
  conclusion: `
    …
  `
});
