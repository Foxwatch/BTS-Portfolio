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
  competences: ["B1.1.1", "B1.1.3"],

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
        Les données de l'entreprise ne peuvent pas être montrées : les captures de cette situation sont une **reconstitution** réalisée en TP, sur un domaine de test avec des données fictives.

        Je réunis trois sources :

        - la liste des ordinateurs présents dans l'Active Directory ;
        - le tableau fourni par les RH, qui indique qui occupe quel poste ;
        - la date de dernière connexion de chaque poste (Last Logon), relevée dans l'AD ou dans Intune.

        La liste des postes et de leur date de dernière connexion est extraite de l'AD **avec un script**, ce qui évite de relever chaque poste à la main.
      `,
      captures: [
        { fichier: "e4_sit1_lab_connexion-rdp.png", legende: "Reconstitution en TP : connexion au contrôleur de domaine d'un lab", masquer: "rien (environnement de test)" },
        { fichier: "e4_sit1_lab_console-aduc.png", legende: "Reconstitution en TP : la console ADUC du domaine de test", masquer: "rien (environnement de test)" }
      ]
    },
    {
      titre: "Croiser l'AD avec le tableau des RH",
      texte: `
        Je compare les deux listes pour repérer les écarts : postes sans utilisateur connu, utilisateurs partis, postes qui ne se sont plus connectés depuis longtemps.

        J'utilise les **filtres d'Excel** pour isoler les postes qui ne se sont plus connectés depuis **plus de 4 mois**. Avant de conclure, j'**appelle l'établissement** concerné pour vérifier que le poste n'est vraiment plus utilisé.
      `,
      captures: [
        { fichier: "e4_sit1_lab_croisement-excel.png", legende: "Reconstitution en TP : un tableau RH (données fictives) comparé à l'annuaire", masquer: "rien (données fictives)" }
      ]
    },
    {
      titre: "Confirmer l'état des postes dans Intune",
      texte: `
        Pour les postes suspects, je vérifie dans **Microsoft Intune** la date de dernière connexion et l'état de l'appareil, avant de prendre une décision.
      `,
      captures: [
      ]
    },
    {
      titre: "Désactiver les objets obsolètes",
      texte: `
        Dans la console ADUC, je désactive les comptes ordinateurs identifiés comme obsolètes. Je les désactive au lieu de les supprimer, ce qui permet de revenir en arrière en cas d'erreur.
      `,
      captures: [
      ]
    },
    {
      titre: "Mettre à jour les descriptions des postes",
      texte: `
        Je complète à la main le champ **Description** de chaque PC pour indiquer à qui il appartient. Le support retrouve ainsi le poste d'un utilisateur en quelques secondes.
      `,
      captures: [
      ]
    }
  ],

  conclusion: `
    Objectif atteint : l'inventaire des postes est fiable et chaque PC indique à qui il appartient. La vérification est devenue une tâche récurrente, refaite au rythme des mouvements de personnel, pour que la base reste à jour en vue de la délégation des arrivées aux RH.
  `
});
