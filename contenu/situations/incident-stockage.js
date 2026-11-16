/* Situation n°10 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "incident-stockage",
  numero: 10,  // définitif : sert au nom des captures (e4_sit10_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "pro",  // "pro" | "perso" | "ecole"
  lieu: "Emera",
  titre: "Incident : disque saturé sur le poste d'un utilisateur",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.2.1", "B1.2.2", "B1.2.3"],

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

        Les captures de cette situation sont une **reconstitution** réalisée sur mon PC personnel : le poste de l'utilisateur n'est plus accessible, et le logiciel désinstallé y est remplacé par un autre, à titre d'exemple.
      `,
      captures: [
        { fichier: "e4_sit10_etape1_espace-avant.png", legende: "Reconstitution : l'espace libre du disque avant l'intervention", masquer: "nom du PC, nom d'utilisateur" }
      ]
    },
    {
      titre: "Trouver ce qui occupe la place",
      texte: `
        J'installe **WinDirStat**, qui analyse le disque et affiche la taille de chaque dossier, du plus gros au plus petit, avec une carte de couleurs. Sur le poste de l'utilisateur, le résultat était clair : un dossier d'un **logiciel de sécurité Dell** occupait une très grande partie du disque.

        Sur la reconstitution, on voit aussi le fichier **hiberfil.sys** (fichier d'hibernation), qui pèse à lui seul plus de 12 Go.
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
      ]
    },
    {
      titre: "Désinstaller le logiciel et désactiver l'hibernation",
      texte: `
        Je désinstalle le logiciel depuis le **Panneau de configuration** (Programmes et fonctionnalités). Je désactive aussi l'**hibernation**, dont le fichier \`hiberfil.sys\` occupe plusieurs gigaoctets, avec une invite de commandes lancée **en administrateur** :

        ~~~
        powercfg /h off
        ~~~
      `,
      captures: [
        { fichier: "e4_sit10_etape4_desinstallation.png", legende: "Reconstitution : la désinstallation d'un logiciel (ici VLC, à titre d'exemple)", masquer: "nom d'utilisateur" },
        { fichier: "e4_sit10_etape4_powercfg.png", legende: "Reconstitution : la désactivation de l'hibernation", masquer: "nom d'utilisateur dans l'invite" }
      ]
    },
    {
      titre: "Vérifier le résultat et clôturer",
      texte: `
        Je contrôle l'espace libre : sur le poste de l'utilisateur, environ **100 Go** ont été récupérés. J'informe l'utilisateur et je clôture le ticket.

        Sur la reconstitution, la seule désactivation de l'hibernation fait passer l'espace libre de **259 Go à 272 Go**, soit environ 13 Go, la taille de \`hiberfil.sys\`.
      `,
      captures: [
        { fichier: "e4_sit10_etape5_espace-apres.png", legende: "Reconstitution : 272 Go libres après la désactivation de l'hibernation (contre 259 Go avant)", masquer: "rien d'obligatoire" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : environ 100 Go libérés et le poste fonctionne normalement. Le point clé a été de **vérifier l'utilité du logiciel avant de le supprimer**, plutôt que d'effacer au hasard.
  `
});
