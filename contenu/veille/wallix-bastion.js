/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "wallix-bastion",
  theme: "bastion",        // id du thème dans contenu/veille.js
  numero: 3,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "en-etude",  // "adoptee" | "non-retenue" | "en-etude"
  titre: "WALLIX Bastion, la solution française certifiée",
  resume: `
    Un bastion commercial français, certifié par l'ANSSI, pensé pour les entreprises et les administrations.
  `,
  contexte: `
    Thème : centraliser et tracer les accès d'administration. WALLIX est la troisième solution étudiée : c'est un éditeur français, et son bastion est souvent cité pour les organisations qui ont des obligations de sécurité.
  `,
  deroule: [
    {
      titre: "La solution : WALLIX Bastion",
      texte: `
        WALLIX Bastion est une solution de **gestion des accès à privilèges** (PAM, pour « Privileged Access Management ») : elle contrôle et trace les accès des comptes qui ont des droits d'administration.

        - Les administrateurs passent par le bastion pour se connecter aux serveurs (RDP, SSH…).
        - Les sessions sont **enregistrées**.
        - Le bastion peut garder les mots de passe des comptes administrateurs : l'utilisateur se connecte sans jamais les connaître.

        Le produit a obtenu la certification **CSPN** de l'**ANSSI**, l'agence française de cybersécurité : un laboratoire agréé a vérifié sa sécurité.
      `,
      illustrations: [
        { fichier: "e4_veille1_ex1_sans-ou-avec-bastion.svg", legende: "Le principe du bastion : une seule porte d'entrée contrôlée" }
      ]
    },
    {
      titre: "Avantages et inconvénients",
      texte: `
        - **Avantages** : solution complète et clé en main, certifiée par l'ANSSI, éditeur français avec un support professionnel.
        - **Inconvénients** : **payante**, et dimensionnée pour des entreprises, pas pour un homelab.
      `,
      illustrations: [
        { fichier: "e4_veille1_comparatif-bastions.svg", legende: "Les trois solutions étudiées, comparées" }
      ]
    }
  ],
  conclusion: `
    Solution en cours d'étude. Pour mon homelab, son coût est un frein ; en revanche, c'est la solution la plus adaptée à une **entreprise** qui doit prouver la sécurité de ses accès d'administration, grâce à sa certification ANSSI.
  `
});
