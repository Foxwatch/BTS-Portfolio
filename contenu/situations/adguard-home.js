/* ==========================================================================
   Situation n°6 : Filtrage DNS avec AdGuard Home (projet personnel)
   --------------------------------------------------------------------------
   Modèle d'une situation : voir README.md.
   ========================================================================== */
ajouterSituation({
  id: "adguard-home",
  numero: 6,  // définitif : sert au nom des captures (e4_sit6_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "perso",  // "pro" | "perso" | "ecole"
  lieu: "Homelab",
  titre: "Filtrage DNS avec AdGuard Home",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.5.1", "B1.5.2"],

  outils: ["Raspberry Pi", "AdGuard Home", "SSH", "ufw", "Certificat TLS", "Android"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Installation d'AdGuard Home sur un Raspberry Pi pour filtrer publicités et traceurs sur tout le réseau, avec chiffrement des requêtes en DNS over TLS.
  `,

  contexte: {
    role: "Projet personnel, réalisé seul dans mon homelab.",
    objectif: "Filtrer les publicités, les traceurs et les domaines indésirables pour tous les appareils de mon réseau, puis chiffrer les requêtes DNS de mon téléphone.",
    raison: "Je voulais un contrôle centralisé du trafic DNS de mon réseau et mettre en place un service réseau complet, de l'installation jusqu'aux clients."
  },

  etapes: [
    {
      titre: "Installer AdGuard Home sur le Raspberry Pi",
      texte: `
        Je me connecte au Raspberry Pi en SSH depuis mon PC, puis j'installe AdGuard Home comme service, pour qu'il démarre automatiquement :

        ~~~
        ssh utilisateur@<adresse-ip-du-pi>
        sudo ./AdGuardHome -s install
        ~~~

        [À COMPLÉTER : comment le programme AdGuard Home a été téléchargé sur le Pi]
      `,
      captures: [
        { fichier: "e4_sit6_etape1_installation-ssh.png", legende: "Connexion SSH et installation du service", masquer: "rien d'obligatoire (adresses privées)" }
      ]
    },
    {
      titre: "Configurer les ports avec l'assistant web",
      texte: `
        L'assistant de démarrage, ouvert dans le navigateur, permet de choisir les interfaces et les ports d'écoute : l'interface d'administration d'un côté, le serveur DNS de l'autre.
      `,
      captures: [
        { fichier: "e4_sit6_etape2_assistant-ports.png", legende: "Choix des interfaces et des ports dans l'assistant", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Ouvrir les ports dans le pare-feu du Pi",
      texte: `
        J'autorise dans le pare-feu **ufw** le port 53 (DNS classique) et le port 853 (DNS over TLS) :

        ~~~
        sudo ufw allow 53
        sudo ufw allow 853
        ~~~
      `,
      captures: [
        { fichier: "e4_sit6_etape3_ufw-ports.png", legende: "Ouverture des ports 53 et 853 avec ufw", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Activer les listes de blocage",
      texte: `
        Dans **Filtres > Listes de blocage DNS**, j'active plusieurs listes communautaires, dont AdGuard DNS filter, AdAway et des listes HaGeZi contre les traceurs. Chaque liste contient des milliers de domaines à bloquer et se met à jour automatiquement.
      `,
      captures: [
        { fichier: "e4_sit6_etape4_listes-blocage.png", legende: "Les listes de blocage activées", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Choisir les serveurs DNS upstream",
      texte: `
        Dans **Paramètres > Paramètres DNS**, je définis les serveurs auxquels AdGuard transmet les requêtes autorisées : Quad9 en DNS over HTTPS, complété par Google et Cloudflare. J'y ajoute des règles qui envoient certains domaines vers un serveur de cache de mon réseau local.
      `,
      captures: [
        { fichier: "e4_sit6_etape5_dns-upstream.png", legende: "Les serveurs DNS upstream", masquer: "rien d'obligatoire (adresses privées)" }
      ]
    },
    {
      titre: "Bloquer des services entiers",
      texte: `
        Dans **Filtres > Services bloqués**, je bloque d'un clic des catégories complètes de sites, par exemple les jeux d'argent, sans avoir à lister leurs domaines un par un.
      `,
      captures: [
        { fichier: "e4_sit6_etape6_services-bloques.png", legende: "Le blocage de services par catégorie", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Configurer un poste client",
      texte: `
        Sur un PC Windows, dans les propriétés IPv4 de la carte réseau, je renseigne l'adresse du Raspberry Pi comme serveur DNS préféré. Toutes les requêtes DNS du poste passent alors par AdGuard Home.
      `,
      captures: [
        { fichier: "e4_sit6_etape7_client-windows.png", legende: "Le DNS du Raspberry Pi configuré sur un PC Windows", masquer: "rien d'obligatoire (adresses privées)" }
      ]
    },
    {
      titre: "Vérifier le fonctionnement",
      texte: `
        Le **tableau de bord** affiche le nombre de requêtes reçues, la part bloquée par les filtres et les clients les plus actifs. C'est la preuve que le filtrage fonctionne sur le réseau.
      `,
      captures: [
        { fichier: "e4_sit6_etape8_tableau-de-bord.png", legende: "Le tableau de bord d'AdGuard Home", masquer: "noms des appareils dans « Meilleurs clients »" }
      ]
    },
    {
      titre: "Bonus : récupérer un certificat pour le DNS over TLS",
      texte: `
        Le DNS over TLS chiffre les requêtes entre l'appareil et le serveur : personne ne peut les lire en chemin. Il faut pour cela un nom de domaine et un certificat valide.

        Je télécharge depuis l'espace client de mon fournisseur de domaine (IONOS) le certificat et le certificat intermédiaire.
      `,
      captures: [
        { fichier: "e4_sit6_etape9_telechargement-certificat.png", legende: "Téléchargement du certificat et du certificat intermédiaire", masquer: "informations du compte client" }
      ]
    },
    {
      titre: "Bonus : activer le chiffrement dans AdGuard Home",
      texte: `
        Dans **Paramètres > Chiffrement**, je renseigne le nom du serveur, le port DNS over TLS (853) et l'emplacement du certificat sur le Pi. AdGuard confirme que la chaîne de certificat est valide.
      `,
      captures: [
        { fichier: "e4_sit6_etape10_parametres-chiffrement.png", legende: "Nom du serveur et port DNS over TLS", masquer: "adresse IP publique si elle apparaît" },
        { fichier: "e4_sit6_etape10_certificat-valide.png", legende: "Le certificat installé et reconnu comme valide", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Bonus : configurer un téléphone Android",
      texte: `
        Dans les paramètres réseau d'Android, option **DNS privé**, je saisis le nom d'hôte de mon serveur. Le téléphone envoie alors ses requêtes chiffrées à AdGuard Home, même en dehors de chez moi.

        [À COMPLÉTER : capture du journal des requêtes montrant les requêtes du téléphone, pour prouver que le DNS over TLS fonctionne]
      `,
      captures: [
        { fichier: "e4_sit6_etape11_android-dns-prive.png", legende: "Le DNS privé configuré sur Android", masquer: "rien d'obligatoire" },
        { fichier: "e4_sit6_etape11_journal-requetes.png", legende: "Les requêtes du téléphone reçues par AdGuard Home", masquer: "noms des autres appareils, adresse IP publique" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : AdGuard Home filtre les requêtes DNS de tout mon réseau local, et mon téléphone utilise le DNS over TLS pour envoyer ses requêtes chiffrées. Ce projet m'a fait mettre en place un service complet, de l'installation aux tests sur les clients.
  `
});
