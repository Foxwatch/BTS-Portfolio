/* Situation n°7 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "fortiwifi",
  numero: 7,  // définitif : sert au nom des captures (e4_sit7_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "perso",  // "pro" | "perso" | "ecole"
  lieu: "Homelab",
  titre: "Segmentation réseau et publication de services avec un FortiWiFi 60D",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.3", "B1.5.2"],

  outils: ["FortiWiFi 60D (FortiOS 5.4)", "Proxmox", "AdGuard Home", "Plex", "Seerr"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Découpage de mon réseau en VLAN, filtrage des flux par des politiques de pare-feu, DNS AdGuard distribué par DHCP et publication de deux services sur Internet.
  `,

  contexte: {
    role: "Administrateur de mon propre réseau (projet personnel, homelab).",
    objectif: "Séparer les usages de mon réseau en VLAN, contrôler les flux entre eux et publier deux services (Plex et Seerr) sur Internet sans exposer le reste.",
    raison: "Faute de switch manageable, c'est le FortiWiFi qui gère les VLAN : ce projet me fait pratiquer le réseau et la sécurité, le domaine vers lequel je veux évoluer."
  },

  etapes: [
    {
      titre: "Découper le réseau en VLAN",
      texte: `
        Je crée une interface par usage. Chaque VLAN a son propre réseau d'adresses, et le trafic entre deux VLAN doit passer par le pare-feu :

        - **ADMINISTRATION** : l'administration des équipements ;
        - **DNS** : le serveur AdGuard Home ;
        - **MEDIA** : les services multimédias ;
        - **Machines**, **VM**, **Proxy** et **TEST** : mes postes, mes machines virtuelles et mes essais ;
        - **VPN** : les connexions à distance ;
        - une interface dédiée à l'hyperviseur **Proxmox**.
      `,
      captures: [
        { fichier: "e4_sit7_etape1_interfaces-vlan.png", legende: "Les interfaces et VLAN créés sur le FortiWiFi", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Distribuer le DNS filtrant par DHCP",
      texte: `
        Sur chaque VLAN, le serveur DHCP du FortiWiFi distribue l'adresse IP, la passerelle et, comme serveur DNS, l'adresse de mon **AdGuard Home** (hébergé sur Proxmox). Tous les appareils, y compris ceux connectés par VPN, utilisent ainsi le DNS filtrant sans configuration manuelle.
      `,
      captures: [
        { fichier: "e4_sit7_etape2_dhcp-dns.png", legende: "Le serveur DHCP d'un VLAN, avec AdGuard comme DNS", masquer: "rien d'obligatoire (adresses privées)" }
      ]
    },
    {
      titre: "Créer des objets et des groupes d'adresses",
      texte: `
        Plutôt que de répéter des adresses IP dans chaque règle, je crée des **objets d'adresse** (un serveur, un réseau) et je les regroupe en **groupes d'adresses**. Les politiques restent lisibles, et une modification se fait à un seul endroit.
      `,
      captures: [
        { fichier: "e4_sit7_etape3_groupes-adresses.png", legende: "Les objets et groupes d'adresses", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Écrire les politiques de filtrage",
      texte: `
        Pour chaque flux autorisé, j'écris une politique : interface source, interface de destination, adresses, services et action. Tout ce qui n'est pas explicitement autorisé est bloqué.
      `,
      captures: [
        { fichier: "e4_sit7_etape4_liste-policies.png", legende: "La liste des politiques de pare-feu", masquer: "adresse IP publique" },
        { fichier: "e4_sit7_etape4_detail-policy.png", legende: "Le détail d'une politique entre deux VLAN", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Publier Plex et Seerr sur Internet",
      texte: `
        Pour rendre Plex et Seerr accessibles de l'extérieur, je crée des **IP virtuelles (VIP)** qui redirigent un port public vers le serveur concerné, puis une politique qui autorise seulement ces ports, depuis Internet, vers ces deux services. Le reste du réseau n'est pas exposé.
      `,
      captures: [
        { fichier: "e4_sit7_etape5_vip.png", legende: "Les IP virtuelles de Plex et de Seerr", masquer: "adresse IP publique" },
        { fichier: "e4_sit7_etape5_policy-entrante.png", legende: "La politique entrante vers les services publiés", masquer: "adresse IP publique" }
      ]
    },
    {
      titre: "Problème rencontré : le DNS ne résolvait rien",
      texte: `
        Au début, le VLAN du serveur DNS n'avait **aucun accès à Internet**. Les appareils obtenaient bien leur adresse IP, mais aucune résolution de nom ne fonctionnait : AdGuard Home ne pouvait pas joindre ses serveurs **upstream**.

        J'ai donc ajouté une politique qui autorise le serveur DNS à sortir vers Internet, puis vérifié que ses serveurs upstream étaient bien configurés. La résolution a alors fonctionné sur tous les VLAN.
      `,
      captures: [
        { fichier: "e4_sit7_etape6_policy-dns-internet.png", legende: "La politique qui autorise le serveur DNS à joindre Internet", masquer: "adresse IP publique" }
      ]
    },
    {
      titre: "Tester",
      texte: `
        - Depuis un poste, \`nslookup\` montre que la réponse vient bien d'AdGuard Home.
        - Depuis mon téléphone en 4G, hors de mon réseau, Plex et Seerr sont accessibles.
        - Le journal du trafic du FortiWiFi montre les flux autorisés et refusés.
      `,
      captures: [
        { fichier: "e4_sit7_etape7_nslookup.png", legende: "La résolution passe par AdGuard Home", masquer: "rien d'obligatoire (adresses privées)" },
        { fichier: "e4_sit7_etape7_acces-4g.png", legende: "Accès à un service publié depuis le réseau mobile", masquer: "nom de domaine, adresse IP publique" },
        { fichier: "e4_sit7_etape7_journal-trafic.png", legende: "Le journal du trafic : flux autorisés et refusés", masquer: "adresse IP publique" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : le réseau est découpé en VLAN, les flux sont contrôlés par le pare-feu et seuls Plex et Seerr sont publiés. Deux limites à corriger : le DNS filtrant n'est pas **forcé** (un appareil peut en utiliser un autre ; il faudrait bloquer le port 53 vers tout autre serveur), et **FortiOS 5.4 n'est plus maintenu** par Fortinet.
  `
});
