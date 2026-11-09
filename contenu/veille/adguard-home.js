/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "adguard-home",
  theme: "dns",            // id du thème dans contenu/veille.js
  numero: 1,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "adoptee",      // "adoptee" | "non-retenue" | "en-etude"
  titre: "AdGuard Home, un serveur DNS qui filtre tout le réseau",

  // Situation où la solution a été mise en place (bouton en bas de page)
  situationLiee: "adguard-home",

  resume: `
    Un serveur DNS installé chez soi qui bloque publicités et traceurs pour tous les appareils, et qui sait chiffrer les requêtes.
  `,

  contexte: `
    Thème : filtrer et chiffrer les requêtes DNS de mon réseau.

    [À COMPLÉTER : comment j'ai découvert AdGuard Home (article, Reddit, vidéo…)]
  `,

  deroule: [
    {
      titre: "La solution",
      texte: `
        AdGuard Home est un serveur DNS que l'on installe sur son propre réseau, par exemple sur un Raspberry Pi. Chaque appareil lui envoie ses requêtes DNS :

        - si le domaine figure dans une **liste de blocage** (publicité, traceur, site malveillant), AdGuard renvoie une réponse vide et le contenu ne se charge pas ;
        - sinon, il transmet la requête à un **serveur DNS upstream** et renvoie la réponse à l'appareil.

        Tout se gère depuis une interface web : listes de blocage, statistiques, journal des requêtes, chiffrement.
      `,
      illustrations: [
        { fichier: "e4_veille2_ex1_filtrage-dns.svg", legende: "Le trajet d'une requête DNS à travers AdGuard Home" }
      ]
    },
    {
      titre: "Ce que ça apporte à mon projet",
      texte: `
        - **Un filtrage pour tout le réseau**, sans rien installer sur chaque appareil.
        - **Une visibilité** sur ce que font les appareils, grâce aux statistiques et au journal des requêtes.
        - **Le chiffrement intégré** : AdGuard Home sait jouer le rôle de serveur DNS over TLS, ce qui répond à la deuxième partie de mon besoin.
        - **Une vraie pratique d'administration** : installation sous Linux, pare-feu, certificats, configuration des clients.
      `,
      illustrations: []
    }
  ],

  conclusion: `
    Solution adoptée : je l'ai installée sur mon Raspberry Pi. Elle gère nativement le DNS over TLS, ce qui me permettait de chiffrer les requêtes de mon téléphone sans outil supplémentaire.

    [À COMPLÉTER : autres raisons de ce choix, et solutions comparées s'il y en a eu]
  `
});
