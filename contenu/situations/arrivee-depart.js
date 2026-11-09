/* ==========================================================================
   Situation n°2 : Arrivée d'un collaborateur sur un poste existant
   --------------------------------------------------------------------------
   Modèle d'une situation : voir README.md.
   Les captures vont dans images/situations/ avec exactement le nom indiqué
   dans « fichier ». Tant qu'elles manquent, le site affiche un emplacement
   avec le chemin à utiliser et ce qu'il faut masquer.
   ========================================================================== */
ajouterSituation({
  id: "arrivee-depart",
  numero: 2,  // définitif : sert au nom des captures (e4_sit2_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Arrivée d'un collaborateur sur un poste existant",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.2.1", "B1.2.2", "B1.2.3", "B1.1.3"],

  outils: ["Freshservice", "Active Directory (ADUC)", "Remote Desktop Manager", "Microsoft 365", "Outlook"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Réaffectation d'un compte existant à un nouveau collaborateur : lien avec le ticket de départ, mise à jour de l'identité dans l'AD, contrôles Microsoft 365 et Freshservice.
  `,

  contexte: {
    role: "Technicien support N1 en alternance, en charge du ticket d'arrivée de bout en bout.",
    objectif: "Préparer le compte, le poste, la messagerie et la fiche du collaborateur pour sa prise de poste, sans perdre l'historique du poste.",
    raison: "Les arrivées et les départs font partie des demandes traitées au quotidien par le support N1. En résidence, les comptes de poste ne sont pas nominatifs : une arrivée consiste à réaffecter le compte existant à la nouvelle personne."
  },

  etapes: [
    {
      titre: "Prendre connaissance du ticket d'arrivée",
      texte: `
        La demande arrive dans Freshservice sous forme de formulaire « Arrivée collaborateur ». Je vérifie que toutes les informations nécessaires sont présentes :

        - l'établissement et le poste occupé ;
        - l'identité et la fonction du collaborateur ;
        - la date d'embauche et le type de contrat ;
        - le responsable hiérarchique et le profil référent, qui sert à copier les droits d'accès.
      `,
      captures: [
        { fichier: "e4_sit2_etape1_ticket-arrivee.png", legende: "Le formulaire d'arrivée reçu dans Freshservice", masquer: "nom, prénom, établissement, responsable, profil référent, numéro de ticket" }
      ]
    },
    {
      titre: "Préparer le suivi dans le ticket",
      texte: `
        J'ajoute une **note privée** avec la checklist de l'équipe. Elle liste tout ce qui doit être vérifié avant de clôturer :

        - **Active Directory** : compte, mot de passe, statut MFA, nom du PC ;
        - **Microsoft 365** : délégations ou redirections, message d'absence ;
        - **Freshservice** : compte du demandeur, à mettre à jour sans jamais le supprimer.

        J'insère aussi le lien vers le **ticket de départ** de l'ancien titulaire du poste. Les deux demandes restent ainsi reliées, et l'historique du poste est conservé.
      `,
      captures: [
        { fichier: "e4_sit2_etape2_note-checklist.png", legende: "La checklist ajoutée en note privée", masquer: "le libellé de la ligne MFA (garder seulement « MFA »)" },
        { fichier: "e4_sit2_etape2_lien-ticket-depart.png", legende: "Le lien vers le ticket de départ de l'ancien titulaire", masquer: "nom de l'ancien titulaire, numéros de ticket" }
      ]
    },
    {
      titre: "Accuser réception de la demande",
      texte: `
        Je réponds au demandeur pour confirmer la prise en charge et lui indiquer que tout sera finalisé dès que possible. Il sait ainsi que sa demande est traitée, et par qui.
      `,
      captures: [
        { fichier: "e4_sit2_etape3_prise-en-charge.png", legende: "La réponse de prise en charge envoyée au demandeur", masquer: "prénom et adresse du demandeur, adresse du helpdesk, numéro de ticket" }
      ]
    },
    {
      titre: "Réaffecter le compte dans l'Active Directory",
      texte: `
        Je me connecte au serveur d'administration avec **Remote Desktop Manager**, puis j'ouvre la console **Utilisateurs et ordinateurs Active Directory** (ADUC).

        1. Je retrouve le compte du poste dans l'unité de l'établissement.
        2. J'active le compte s'il a été désactivé lors du départ.
        3. Je réinitialise son mot de passe.
        4. Dans l'onglet **Général**, je mets à jour le nom complet et la description, avec la référence du ticket.
        5. Je vérifie le statut MFA du compte.
      `,
      captures: [
        { fichier: "e4_sit2_etape4_connexion-rdm.png", legende: "Connexion au serveur d'administration avec Remote Desktop Manager", masquer: "noms des serveurs, nom de domaine, identifiant, icônes du bureau" },
        { fichier: "e4_sit2_etape4_activer-compte.png", legende: "Activation du compte et réinitialisation du mot de passe dans ADUC", masquer: "noms des comptes, établissement, fonctions" },
        { fichier: "e4_sit2_etape4_onglet-general.png", legende: "Mise à jour du nom complet et de la description", masquer: "nom, établissement, téléphone, adresse e-mail, numéro de ticket" }
      ]
    },
    {
      titre: "Vérifier le poste de travail",
      texte: `
        Dans l'unité des ordinateurs de l'établissement, je retrouve le PC grâce à sa description. Je vérifie qu'il est bien actif dans le domaine, je l'active si besoin, puis je note son nom dans la checklist.
      `,
      captures: [
        { fichier: "e4_sit2_etape5_poste-actif.png", legende: "Le poste retrouvé grâce à sa description dans l'AD", masquer: "arborescence de l'AD, noms des établissements, noms des PC" }
      ]
    },
    {
      titre: "Transmettre le mot de passe",
      texte: `
        J'envoie le mot de passe au responsable par **e-mail chiffré**. Il le garde jusqu'à l'arrivée du collaborateur, qui devra le changer à sa première connexion.
      `,
      captures: [
        { fichier: "e4_sit2_etape6_mail-chiffre.png", legende: "L'e-mail chiffré envoyé au responsable", masquer: "destinataire, mot de passe, règles de mot de passe, numéro de ticket" }
      ]
    },
    {
      titre: "Contrôler la messagerie dans Microsoft 365",
      texte: `
        Dans le **centre d'administration Microsoft 365**, j'ouvre le compte (Utilisateurs actifs), puis l'onglet **Courrier** :

        - **Autorisations de boîte aux lettres** : une délégation de l'ancien titulaire était encore présente. Je la signale au demandeur plutôt que de la supprimer d'office, car elle peut être voulue.
        - **Réponses automatiques** : je vérifie qu'aucun message d'absence n'est resté actif.
      `,
      captures: [
        { fichier: "e4_sit2_etape7_m365-courrier.png", legende: "L'onglet Courrier : délégations et réponses automatiques", masquer: "nom du compte, photo, adresses e-mail" }
      ]
    },
    {
      titre: "Mettre à jour la fiche dans Freshservice",
      texte: `
        Dans **Paramètres généraux > Demandeurs**, je recherche la fiche liée au poste et je mets à jour ses informations. La règle de l'équipe est de **ne jamais supprimer un compte** : on garde ainsi tout l'historique des tickets du poste.
      `,
      captures: [
        { fichier: "e4_sit2_etape8_demandeurs-freshservice.png", legende: "La liste des demandeurs dans Freshservice", masquer: "noms, adresses e-mail, tickets visibles dans la recherche" },
        { fichier: "e4_sit2_etape8_fiche-demandeur.png", legende: "Mise à jour de la fiche, sans suppression", masquer: "adresse e-mail, nom, prénom, téléphone" }
      ]
    },
    {
      titre: "Rendre compte et clôturer l'échange",
      texte: `
        J'envoie une réponse finale au demandeur. Elle indique :

        - que le compte est à jour, avec un délai de synchronisation ;
        - la démarche à suivre pour le télétravail ;
        - que le mot de passe a été envoyé par e-mail chiffré ;
        - la procédure de première connexion, s'il s'agit d'un nouveau PC ;
        - la délégation trouvée, en demandant s'il faut la supprimer.

        Je passe ensuite le ticket au statut **« en attente de l'utilisateur »**, le temps qu'il réponde.
      `,
      captures: [
        { fichier: "e4_sit2_etape9_reponse-finale.png", legende: "La réponse finale et le statut du ticket", masquer: "prénom, adresses e-mail, nom de la délégation, numéro de ticket" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : le compte, le poste, la messagerie et la fiche Freshservice sont à jour, et l'historique du poste est conservé grâce au lien avec le ticket de départ. La délégation restante a été signalée au demandeur plutôt que supprimée sans son accord.
  `
});
