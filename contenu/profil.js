/* ==========================================================================
   profil.js : qui je suis (page Accueil, en-tête et pied de page)
   --------------------------------------------------------------------------
   Mise en forme possible dans les textes :
     - ligne vide = nouveau paragraphe
     - « - » en début de ligne = liste à puces
     - **gras**, [texte du lien](adresse)
     - [À COMPLÉTER : …] = information manquante (bien visible sur le site)
   ========================================================================== */
definirProfil({
  prenom: "Adaim",
  nom: "CHATTI",
  role: "Technicien support en alternance · Groupe Emera",
  formation: "BTS SIO option SISR",

  // Photo : à déposer dans images/commun/ avec exactement ce nom
  photo: "images/commun/photo-adaim-chatti.jpg",

  ecole: {
    nom: "UFIP",
    logo: "images/commun/logo-ufip.png"
  },

  entreprise: {
    nom: "Emera",
    logo: "images/commun/logo-emera.png"
  },

  // Laisser vide ("") pour ne pas afficher le lien
  linkedin: "",

  presentation: `
    Étudiant en BTS SIO option SISR à l'UFIP, je suis en alternance au support informatique du groupe Emera, qui gère des résidences services et des établissements médicalisés pour seniors. J'y assure le support de niveau 1 pour les collaborateurs du groupe, en France et en Belgique.

    Ce qui me passionne, c'est l'infrastructure et le réseau. Je les pratique au quotidien dans mon homelab, et c'est vers ce métier que je veux évoluer.
  `,

  // Fiche d'identité affichée sur l'accueil (libellé + valeur)
  fiche: [
    { libelle: "Formation", valeur: "BTS SIO option SISR (Solutions d'infrastructure, systèmes et réseaux) · UFIP" },
    { libelle: "Alternance", valeur: "Support informatique de niveau 1 · Groupe Emera (siège à Mougins)" },
    { libelle: "Objectif", valeur: "Évoluer vers l'infrastructure et le réseau" },
    { libelle: "Homelab", valeur: "Proxmox, WireGuard, Raspberry Pi avec AdGuard Home, FortiWiFi" }
  ],

  // Date affichée dans le pied de page : à changer à chaque grosse mise à jour
  miseAJour: "novembre 2026"
});
