/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "ztna",
  theme: "acces-distant",  // id du thème dans contenu/veille.js
  numero: 1,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "adoptee",      // "adoptee" | "non-retenue" | "en-etude"
  titre: "Le ZTNA (Zero Trust Network Access)",

  resume: `
    Donner accès à une application précise, après vérification de l'identité et du poste, au lieu d'ouvrir tout le réseau.
  `,

  contexte: `
    Thème : remplacer le VPN SSL, dont la fin du support est annoncée par le constructeur du pare-feu.

    [À COMPLÉTER : comment j'ai découvert le ZTNA (article, bulletin, documentation du constructeur…) et à quelle date]
  `,

  deroule: [
    {
      titre: "Le principe : ne jamais faire confiance, toujours vérifier",
      texte: `
        Le ZTNA repose sur le modèle **Zero Trust** : « ne jamais faire confiance, toujours vérifier ».

        - Avec un **VPN classique**, une fois l'utilisateur authentifié, il accède à tout le segment réseau.
        - Avec le **ZTNA**, il n'accède qu'à l'application ou à la ressource dont il a besoin. Chaque connexion est vérifiée selon son identité, le poste utilisé et le contexte (l'état de sécurité du poste, par exemple).
      `,
      illustrations: [
        { fichier: "e4_veille1_ex1_vpn-ou-ztna.svg", legende: "VPN SSL ou ZTNA : ce à quoi l'utilisateur a accès une fois connecté" }
      ]
    },
    {
      titre: "Ce que ça apporte à l'entreprise",
      texte: `
        - **Moins de surface d'attaque** : un compte volé n'ouvre plus tout le réseau, seulement les applications autorisées pour ce compte.
        - **Un contrôle du poste** : un ordinateur qui ne respecte pas les règles de sécurité peut être refusé, même avec un bon mot de passe.
        - **Des accès plus fins** : on autorise application par application, selon le besoin de chaque utilisateur.
        - **La fin d'une technologie abandonnée** : on remplace le VPN SSL avant qu'il ne soit plus maintenu.
      `,
      illustrations: []
    }
  ],

  conclusion: `
    Solution adoptée : j'ai présenté le ZTNA comme remplacement du VPN SSL, et la DSI l'a retenue. Aucune autre solution n'a été proposée en parallèle.

    [À COMPLÉTER : le ZTNA est-il déjà déployé, ou seulement prévu ?]
  `
});
