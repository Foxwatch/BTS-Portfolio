/* ==========================================================================
   Situation n°1 : Fiabilisation de l'inventaire via Active Directory
   --------------------------------------------------------------------------
   Modèle d'une situation : voir README.md.
   ========================================================================== */
ajouterSituation({
  id: "inventaire-ad",
  numero: 1,  // définitif : sert au nom des captures (e4_sit1_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Fiabilisation de l'inventaire via Active Directory",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.1"],

  outils: ["Active Directory (ADUC)", "Microsoft Intune", "Excel"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Croisement de l'Active Directory avec le tableau des RH et les dates de dernière connexion, pour repérer les postes inactifs et mettre à jour les objets et leurs descriptions.
  `,

  contexte: {
    role: "Technicien support N1 en alternance.",
    objectif: "Fiabiliser l'inventaire des postes : repérer les postes inactifs, désactiver les objets obsolètes et indiquer à qui appartient chaque PC.",
    raison: "Cette mise à jour est un préalable au projet de délégation des arrivées aux RH : l'outil prévu a besoin d'une base parfaitement à jour pour fonctionner."
  },

  etapes: [
    {
      titre: "Rassembler les données à comparer",
      texte: `
        Je réunis trois sources :

        - la liste des ordinateurs présents dans l'Active Directory ;
        - le tableau fourni par les RH, qui indique qui occupe quel poste ;
        - la date de dernière connexion de chaque poste (Last Logon), relevée dans l'AD ou dans Intune.

        [À COMPLÉTER : comment la liste des postes a été extraite (export depuis ADUC, script « LastLogon » ?)]
      `,
      captures: [
        { fichier: "e4_sit1_etape1_export-postes.png", legende: "L'extraction des postes et de leur dernière connexion", masquer: "noms des PC, arborescence de l'AD, noms des établissements, nom de domaine" }
      ]
    },
    {
      titre: "Croiser l'AD avec le tableau des RH",
      texte: `
        Je compare les deux listes pour repérer les écarts : postes sans utilisateur connu, utilisateurs partis, postes qui ne se sont plus connectés depuis longtemps.

        [À COMPLÉTER : méthode de comparaison dans Excel (RECHERCHEV, filtre…) et durée à partir de laquelle un poste est considéré comme inactif]
      `,
      captures: [
        { fichier: "e4_sit1_etape2_croisement-excel.png", legende: "Le croisement des données dans Excel", masquer: "noms et prénoms, matricules, noms des PC" }
      ]
    },
    {
      titre: "Confirmer l'état des postes dans Intune",
      texte: `
        Pour les postes suspects, je vérifie dans **Microsoft Intune** la date de dernière connexion et l'état de l'appareil, avant de prendre une décision.
      `,
      captures: [
        { fichier: "e4_sit1_etape3_intune-derniere-connexion.png", legende: "La date de dernière connexion d'un poste dans Intune", masquer: "noms des appareils, utilisateurs, numéros de série" }
      ]
    },
    {
      titre: "Désactiver les objets obsolètes",
      texte: `
        Dans la console ADUC, je désactive les comptes ordinateurs identifiés comme obsolètes. Je les désactive au lieu de les supprimer, ce qui permet de revenir en arrière en cas d'erreur.
      `,
      captures: [
        { fichier: "e4_sit1_etape4_desactivation.png", legende: "Désactivation d'un compte ordinateur obsolète", masquer: "noms des PC, arborescence de l'AD" }
      ]
    },
    {
      titre: "Mettre à jour les descriptions des postes",
      texte: `
        Je complète à la main le champ **Description** de chaque PC pour indiquer à qui il appartient. Le support retrouve ainsi le poste d'un utilisateur en quelques secondes.
      `,
      captures: [
        { fichier: "e4_sit1_etape5_descriptions-postes.png", legende: "Les descriptions mises à jour dans l'AD", masquer: "noms des PC, établissements, fonctions, numéros de ticket" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : l'inventaire des postes est fiable et chaque PC indique à qui il appartient. La vérification est devenue une tâche récurrente, refaite au rythme des mouvements de personnel, pour que la base reste à jour en vue de la délégation des arrivées aux RH.
  `
});
