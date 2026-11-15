/* Exemple de veille technologique : voir le modèle dans README.md */
ajouterExempleVeille({
  id: "teleport",
  theme: "bastion",        // id du thème dans contenu/veille.js
  numero: 2,               // numéro de l'exemple dans son thème
  statut: "publie",        // "publie" ou "brouillon"
  verdict: "non-retenue",  // "adoptee" | "non-retenue" | "en-etude"
  titre: "Teleport, un bastion moderne pour les équipes techniques",
  resume: `
    Un bastion qui remplace les mots de passe par des certificats temporaires et enregistre les sessions. Puissant, mais plus technique.
  `,
  contexte: `
    Thème : centraliser et tracer les accès d'administration de mon homelab. Teleport est la deuxième solution que j'ai étudiée, très présente dans les entreprises qui gèrent beaucoup de serveurs.
  `,
  deroule: [
    {
      titre: "La solution : Teleport",
      texte: `
        Teleport sert de point d'entrée unique vers les serveurs (**SSH**), mais aussi vers d'autres ressources comme **Kubernetes** ou des **bases de données**.

        Son idée principale : au lieu de mots de passe ou de clés qui ne changent jamais, l'utilisateur reçoit un **certificat temporaire** après s'être identifié. Ce certificat expire tout seul au bout de quelques heures : un accès volé devient vite inutilisable.

        Les sessions sont **enregistrées** et peuvent être rejouées.
      `,
      illustrations: [
        { fichier: "e4_veille3_ex1_sans-ou-avec-bastion.svg", legende: "Le principe du bastion : une seule porte d'entrée contrôlée" }
      ]
    },
    {
      titre: "Avantages et inconvénients",
      texte: `
        - **Avantages** : très sécurisé (certificats qui expirent), couvre beaucoup de types de ressources, enregistrement des sessions inclus dans la version gratuite.
        - **Inconvénients** : plus complexe à comprendre et à installer. Depuis la version 16, la version gratuite (Community Edition) est réservée aux particuliers et aux entreprises de **moins de 100 salariés** et de moins de 10 millions de dollars de chiffre d'affaires ; au-delà, il faut la version payante.
      `,
      illustrations: [
        { fichier: "e4_veille3_comparatif-bastions.svg", legende: "Les trois solutions étudiées, comparées" }
      ]
    }
  ],
  conclusion: `
    Non retenue pour l'instant : elle est plus complexe que mon besoin, qui est surtout d'administrer quelques serveurs en SSH et en RDP. Je la garde en tête pour plus tard, car ses certificats temporaires sont une très bonne pratique de sécurité.
  `
});
