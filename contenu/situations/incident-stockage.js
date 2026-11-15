/* Situation n°10 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "incident-stockage",
  numero: 10,  // définitif : sert au nom des captures (e4_sit10_…)
  statut: "brouillon",  // passer à "publie" quand les captures sont déposées
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Incident : disque saturé sur le poste d'un utilisateur",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.2.1", "B1.2.2"],

  outils: ["Freshservice", "WinDirStat", "Windows (Applications, powercfg)"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Diagnostic d'un disque plein avec WinDirStat : un logiciel constructeur inutile occupait l'essentiel de la place. Environ 100 Go libérés.
  `,

  contexte: {
    role: "Technicien support N1 en alternance, en charge du ticket.",
    objectif: "Comprendre pourquoi le disque d'un utilisateur était saturé alors qu'il n'installait rien, et libérer de l'espace sans casser le poste.",
    raison: "L'utilisateur a ouvert un ticket au support : traiter ce type d'incident fait partie de mes missions de niveau 1."
  },

  etapes: [
    {
      titre: "Constater le problème",
      texte: `
        L'utilisateur signale par ticket que son disque est plein, alors qu'il n'installe habituellement rien. Je commence par regarder l'espace libre du disque C:.

        Les captures de cette situation sont une **reconstitution** réalisée sur un autre PC : le poste de l'utilisateur n'est plus accessible.
      `,
      captures: [
        { fichier: "e4_sit10_etape1_espace-avant.png", legende: "Reconstitution : l'espace libre du disque avant l'intervention", masquer: "nom du PC, nom d'utilisateur" }
      ]
    },
    {
      titre: "Trouver ce qui occupe la place",
      texte: `
        J'installe **WinDirStat**, qui analyse le disque et affiche la taille de chaque dossier. Le résultat est clair : un dossier d'un **logiciel de sécurité Dell** occupe une très grande partie du disque.
      `,
      captures: [
        { fichier: "e4_sit10_etape2_windirstat.png", legende: "Reconstitution : WinDirStat montre les dossiers les plus volumineux", masquer: "nom d'utilisateur dans les chemins" }
      ]
    },
    {
      titre: "Vérifier avant de supprimer",
      texte: `
        Avant de toucher à un logiciel constructeur, je vérifie par une recherche sur le web s'il est nécessaire au bon fonctionnement du poste. Ce n'est pas le cas : je peux le désinstaller sans risque.
      `,
      captures: [
        { fichier: "e4_sit10_etape3_recherche.png", legende: "La recherche qui confirme que le logiciel n'est pas indispensable", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Désinstaller le logiciel et désactiver l'hibernation",
      texte: `
        Je désinstalle le logiciel depuis les paramètres de Windows. Je désactive aussi l'**hibernation**, dont le fichier \`hiberfil.sys\` occupe plusieurs gigaoctets :

        ~~~
        powercfg /h off
        ~~~
      `,
      captures: [
        { fichier: "e4_sit10_etape4_desinstallation.png", legende: "Reconstitution : la désinstallation du logiciel", masquer: "nom d'utilisateur" },
        { fichier: "e4_sit10_etape4_powercfg.png", legende: "Reconstitution : la désactivation de l'hibernation", masquer: "nom d'utilisateur dans l'invite" }
      ]
    },
    {
      titre: "Vérifier le résultat et clôturer",
      texte: `
        Je contrôle l'espace libre : environ **100 Go** ont été récupérés. J'informe l'utilisateur et je clôture le ticket.
      `,
      captures: [
        { fichier: "e4_sit10_etape5_espace-apres.png", legende: "Reconstitution : l'espace libre après l'intervention", masquer: "nom du PC, nom d'utilisateur" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : environ 100 Go libérés et le poste fonctionne normalement. Le point clé a été de **vérifier l'utilité du logiciel avant de le supprimer**, plutôt que d'effacer au hasard.
  `
});
