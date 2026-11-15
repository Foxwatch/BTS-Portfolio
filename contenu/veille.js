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
    Une veille organisée, tournée vers des solutions concrètes pour l'entreprise et pour mon homelab.
  `,

  // Savoir-faire prouvés par la veille (codes de contenu/competences.js)
  competences: ["B1.6.2"],

  planning: {
    jour: "mercredi",   // en minuscules : lundi, mardi, mercredi, jeudi ou vendredi
    heure: "15 h",
    duree: "1 h"
  },

  methode: `
    1. Je parcours mes sources : flux Feedly, alertes Google, Reddit et bulletins du CERT-FR.
    2. Je garde seulement ce qui répond à un de mes thèmes, c'est-à-dire à un besoin réel.
    3. Pour chaque solution retenue, je note la source, ce qu'elle fait et ce qu'elle apporterait.
    4. Quand c'est possible, je la teste dans mon homelab avant de décider si je l'adopte.
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
      id: "bastion",
      numero: 3,
      cadre: "Homelab",
      titre: "Centraliser et tracer les accès d'administration",
      besoin: `
        Dans mon homelab, quand je suis connecté au VPN avec le profil administrateur, j'accède directement à chaque serveur, chacun avec son propre mot de passe et son propre protocole (SSH, RDP, interfaces web). Rien ne garde de trace centralisée de qui s'est connecté où, ni de ce qui a été fait. Je cherche une **porte d'entrée unique** pour administrer mes serveurs : un **bastion**.
      `
    }
  ]
});
