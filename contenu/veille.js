/* ==========================================================================
   veille.js : la page Veille technologique (définition, planning, thèmes)
   --------------------------------------------------------------------------
   Rappel de la consigne : un THÈME = un besoin ; un EXEMPLE = une solution
   trouvée pendant la veille pour répondre à ce besoin.
   Les exemples sont dans contenu/veille/ (un fichier par exemple) et
   indiquent leur thème avec le champ « theme » (= id du thème ci-dessous).
   ========================================================================== */
definirVeille({
  definition: `
    La veille technologique consiste à suivre de façon régulière et organisée les évolutions de mon métier : nouvelles solutions, failles de sécurité, fins de support de produits.

    Pour moi, elle a un but concret : trouver des solutions aux besoins que je rencontre en entreprise ou dans mon homelab, les étudier, puis décider si je les adopte.
  `,

  // Phrase affichée sur la page de la compétence B1.6
  resume: `
    Une veille organisée chaque semaine, tournée vers des solutions concrètes pour l'entreprise et pour mon homelab.
  `,

  // Savoir-faire prouvés par la veille (codes de contenu/competences.js)
  competences: ["B1.6.2"],

  planning: {
    jour: "mercredi",   // en minuscules : lundi, mardi, mercredi, jeudi ou vendredi
    heure: "15 h",
    duree: "[À COMPLÉTER : durée]"
  },

  methode: `
    [À COMPLÉTER : comment se passe une séance, par exemple : lecture des flux et des alertes, tri des articles utiles, prise de notes, étude d'une solution]
  `,

  outils: [
    { nom: "Feedly", usage: "Lecteur de flux RSS : je suis les sites spécialisés au même endroit." },
    { nom: "Google Alertes", usage: "Alertes par e-mail sur des mots-clés choisis." },
    { nom: "Reddit", usage: "r/sysadmin et r/cybersecurity : retours d'expérience d'administrateurs et actualité de la sécurité." },
    { nom: "ANSSI / CERT-FR", usage: "Bulletins officiels d'alerte et avis de vulnérabilités." }
  ],

  themes: [
    {
      id: "acces-distant",
      numero: 1,
      cadre: "Entreprise",
      titre: "Remplacer le VPN SSL pour l'accès à distance",
      besoin: `
        Le VPN SSL permet aux collaborateurs de se connecter à distance au réseau de l'entreprise. Visé par de nombreuses failles, il est abandonné par certains constructeurs de pare-feu. Il faut donc anticiper une solution de remplacement, aussi sûre et aussi simple pour les utilisateurs.
      `
    },
    {
      id: "dns",
      numero: 2,
      cadre: "Homelab",
      titre: "Filtrer et chiffrer mes requêtes DNS",
      besoin: `
        Chez moi, tous les appareils envoyaient leurs requêtes DNS en clair, et rien ne bloquait les publicités, les traceurs ou les domaines malveillants. Je cherchais une solution pour filtrer ces requêtes sur tout le réseau, puis pour les chiffrer.
      `
    },
    {
      id: "ia-locale",
      numero: 3,
      cadre: "Projet",
      titre: "Utiliser l'IA sans faire sortir de données",
      besoin: `
        [À COMPLÉTER : le besoin (par exemple : profiter d'un assistant IA sans envoyer de données à un service extérieur)]
      `
    }
  ]
});
