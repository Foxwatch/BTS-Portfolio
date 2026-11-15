/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "pihole",
  theme: "dns",            // id du thème dans contenu/veille.js
  numero: 3,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "non-retenue",  // "adoptee" | "non-retenue" | "en-etude"
  titre: "Pi-hole, l'alternative la plus connue",
  resume: `
    Un serveur DNS filtrant très populaire, comparé après coup à AdGuard Home. Non retenu : il ne sait pas chiffrer les requêtes sans outil supplémentaire.
  `,
  contexte: `
    Thème : filtrer et chiffrer les requêtes DNS de mon réseau (projet personnel). Après avoir installé AdGuard Home, j'ai voulu vérifier mon choix en le comparant à Pi-hole, la solution la plus citée sur les forums et sur Reddit pour ce besoin.
  `,
  deroule: [
    {
      titre: "La solution : Pi-hole",
      texte: `
        Pi-hole fonctionne sur le même principe qu'AdGuard Home : c'est un serveur DNS installé sur le réseau, souvent sur un Raspberry Pi, qui bloque les domaines présents dans des **listes de blocage** (publicités, traceurs) et transmet les autres requêtes à un serveur upstream.
      `,
      illustrations: [
        { fichier: "e4_veille2_ex1_filtrage-dns.svg", legende: "Le principe commun aux deux solutions : le serveur DNS filtre puis transmet" }
      ]
    },
    {
      titre: "Avantages et inconvénients",
      texte: `
        - **Avantages** : gratuit, open source, très répandu, avec une très grande communauté et beaucoup de tutoriels.
        - **Inconvénients** : il ne chiffre pas lui-même ses requêtes vers Internet ; il faut lui ajouter un autre outil (par exemple Unbound ou cloudflared). Et il ne sait pas, de base, jouer le rôle de **serveur DNS over TLS** pour un téléphone.
      `,
      illustrations: [
        { fichier: "e4_veille2_ex3_adguard-ou-pihole.svg", legende: "AdGuard Home et Pi-hole comparés sur mon besoin" }
      ]
    }
  ],
  conclusion: `
    Non retenu : il filtre aussi bien qu'AdGuard Home, mais mon besoin incluait le **chiffrement**, notamment le DNS over TLS pour mon téléphone. AdGuard Home le fait nativement, alors que Pi-hole demanderait des outils en plus.
  `
});
