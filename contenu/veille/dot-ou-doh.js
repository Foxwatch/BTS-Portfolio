/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "dot-ou-doh",
  theme: "dns",            // id du thème dans contenu/veille.js
  numero: 2,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "adoptee",      // "adoptee" | "non-retenue" | "en-etude"
  titre: "DNS over TLS ou DNS over HTTPS ?",

  situationLiee: "adguard-home",

  resume: `
    Deux protocoles pour chiffrer le DNS. Je les utilise tous les deux, chacun à l'endroit où il est le plus adapté.
  `,

  contexte: `
    Thème : filtrer et chiffrer les requêtes DNS de mon réseau. Une requête DNS classique circule **en clair** : n'importe qui sur le chemin peut voir les sites demandés, voire modifier la réponse pour rediriger vers un faux site (le **DNS hijacking**).

    [À COMPLÉTER : comment j'ai découvert ces protocoles (sources)]
  `,

  deroule: [
    {
      titre: "Deux façons de chiffrer le DNS",
      texte: `
        - **DNS over TLS (DoT)** : les requêtes passent dans un tunnel TLS, sur un port dédié, le **853**. Le trafic DNS reste reconnaissable : un administrateur réseau peut le repérer et le contrôler.
        - **DNS over HTTPS (DoH)** : les requêtes sont envoyées comme du trafic web, en HTTPS sur le port **443**. Elles se confondent avec la navigation : c'est plus discret, mais plus difficile à filtrer pour un administrateur.

        Un troisième protocole, le **DNS over QUIC (DoQ)**, plus récent, est lui aussi proposé par AdGuard Home.
      `,
      illustrations: [
        { fichier: "e4_veille2_ex2_dot-ou-doh.svg", legende: "DoT sur son port dédié, DoH mélangé au trafic web" }
      ]
    },
    {
      titre: "Ce que ça apporte à mon projet",
      texte: `
        - Sur Android, l'option **DNS privé** utilise le DoT : c'est donc ce protocole qui permet à mon téléphone d'envoyer ses requêtes chiffrées à mon serveur.
        - Entre AdGuard Home et Internet, le **DoH** vers Quad9 évite que mon fournisseur d'accès voie ou modifie les requêtes qui sortent de chez moi.
      `,
      illustrations: []
    }
  ],

  conclusion: `
    Les deux sont adoptés, chacun là où il est le plus adapté : le DoT entre mon téléphone et AdGuard Home, car c'est le protocole de l'option DNS privé d'Android, et le DoH entre AdGuard Home et le serveur upstream Quad9.
  `
});
