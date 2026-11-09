/* ==========================================================================
   entreprise.js : la page Entreprise (présentation + ma mission)
   --------------------------------------------------------------------------
   Rester factuel : ne décrire que ce que je fais réellement.
   Aucune information interne (noms, serveurs, organisation de la sécurité).
   ========================================================================== */
definirEntreprise({
  nom: "Groupe Emera",

  description: `
    Emera est un groupe spécialisé dans l'accueil des seniors. Il gère des résidences services et des établissements médicalisés, en France et en Belgique. Son siège social est à Mougins.

    Le système d'information est essentiel à son fonctionnement : chaque établissement dépend de postes de travail, de comptes et d'outils fiables pour que les équipes puissent se consacrer aux résidents.
  `,

  fiche: [
    { libelle: "Secteur", valeur: "Résidences services et établissements médicalisés pour seniors" },
    { libelle: "Siège", valeur: "Mougins (Alpes-Maritimes)" },
    { libelle: "Implantation", valeur: "France et Belgique [À COMPLÉTER : autres pays, nombre d'établissements]" },
    { libelle: "Mon service", valeur: "Support informatique [À COMPLÉTER : taille de l'équipe]" },
    { libelle: "Alternance", valeur: "[À COMPLÉTER : date de début et rythme]" }
  ],

  mission: `
    J'assure le support informatique de niveau 1 pour les collaborateurs de tous les établissements du groupe. Je reçois leurs demandes sous forme de tickets dans Freshservice, je les traite en suivant les procédures de l'équipe, puis je rends compte de chaque intervention au demandeur.
  `,

  // Schéma affiché sous la mission (fichier dans images/entreprise/)
  schema: { fichier: "e4_entreprise_parcours-demande.svg", legende: "Le parcours d'une demande, du collaborateur jusqu'à la réponse" },

  // « situation » = id d'une situation publiée : un lien s'affiche automatiquement
  missions: [
    { titre: "Traitement des tickets :", texte: "incidents et demandes des collaborateurs des établissements." },
    { titre: "Arrivées et départs :", texte: "réaffectation des comptes, contrôles dans l'AD, Microsoft 365 et Freshservice.", situation: "arrivee-depart" },
    { titre: "Gestion du parc :", texte: "fiabilisation de l'inventaire des postes dans l'Active Directory.", situation: "inventaire-ad" },
    { titre: "Déploiement de postes :", texte: "préparation avec Intune, puis envoi par la poste, livraison ou remise en main propre au siège.", situation: "deploiement-postes" },
    { titre: "Documentation :", texte: "rédaction de procédures pour les techniciens N1, sur Freshservice et OneNote.", situation: "documentation-n1" }
  ],

  outils: ["Freshservice", "Active Directory", "Microsoft 365", "Microsoft Intune", "Remote Desktop Manager", "OneNote"]
});
