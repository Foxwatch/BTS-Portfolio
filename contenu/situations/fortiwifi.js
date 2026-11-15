/* Situation n°7 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "fortiwifi",
  numero: 7,  // définitif : sert au nom des captures (e4_sit7_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "perso",  // "pro" | "perso" | "ecole"
  lieu: "Homelab",
  titre: "Segmentation réseau et accès sécurisé aux services avec un FortiWiFi 60D",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.3", "B1.5.2"],

  outils: ["FortiWiFi 60D (FortiOS 5.4)", "Proxmox", "AdGuard Home", "Nginx", "VPN"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Découpage de mon réseau en VLAN, DNS AdGuard distribué par DHCP, politiques de pare-feu au plus juste et accès distant par VPN avec des droits différents pour les administrateurs et les utilisateurs.
  `,

  contexte: {
    role: "Administrateur de mon propre réseau (projet personnel, homelab).",
    objectif: "Séparer les usages de mon réseau en VLAN, n'autoriser que les flux nécessaires et accéder à mes services depuis l'extérieur sans les exposer directement.",
    raison: "Faute de switch manageable, c'est le FortiWiFi qui gère les VLAN : ce projet me fait pratiquer le réseau et la sécurité, le domaine vers lequel je veux évoluer."
  },

  etapes: [
    {
      titre: "Découper le réseau en VLAN",
      texte: `
        Je crée un VLAN par usage, tous portés par l'interface **internal2**. Chaque VLAN a son propre réseau, et le trafic entre deux VLAN passe obligatoirement par le pare-feu :

        - **ADMINISTRATION** : l'hyperviseur Proxmox et les outils d'administration ;
        - **DNS** : le serveur AdGuard Home ;
        - **MEDIA** : les services multimédias (Jellyfin, Seerr…) ;
        - **Proxy** : le reverse proxy Nginx ;
        - **VM**, **Machines** et **TEST** : mes machines virtuelles, mes postes et mes essais ;
        - **VPN** : le serveur d'accès à distance.
      `,
      captures: [
        { fichier: "e4_sit7_etape1_interfaces-vlan.png", legende: "Les VLAN créés sur le FortiWiFi", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Distribuer le DNS filtrant par DHCP",
      texte: `
        Sur chaque VLAN, j'active le serveur DHCP du FortiWiFi. Exemple avec le VLAN **Machines** (ID 51) :

        - adresse de l'interface : 192.168.51.254/24, qui sert de passerelle ;
        - plage distribuée : de 192.168.51.100 à 192.168.51.200 ;
        - serveur DNS : **spécifié** sur l'adresse d'AdGuard Home (10.0.30.253), au lieu du DNS du système.

        Les appareils utilisent ainsi le DNS filtrant sans aucune configuration manuelle.
      `,
      captures: [
        { fichier: "e4_sit7_etape2_dhcp-dns.png", legende: "Le VLAN Machines : adresse, plage DHCP et DNS AdGuard", masquer: "rien d'obligatoire (adresses privées)" }
      ]
    },
    {
      titre: "Créer des objets et des groupes d'adresses",
      texte: `
        Plutôt que de répéter des adresses IP dans chaque règle, je crée un **objet d'adresse** par service (une adresse en /32) et je les regroupe :

        - **MEDIA** : Download, Jellyfin, Seerr et Unmanic ;
        - **VMs** : 12 services hébergés sur mes machines virtuelles ;
        - **Pelican** : le panneau et le nœud de mon serveur de jeux.

        Une règle qui vise un groupe s'applique à tous ses membres : ajouter un service se fait à un seul endroit.
      `,
      captures: [
        { fichier: "e4_sit7_etape3_objets-adresses.png", legende: "Les objets d'adresse : un objet par service", masquer: "rien d'obligatoire (adresses privées)" },
        { fichier: "e4_sit7_etape3_groupes-adresses.png", legende: "Les groupes d'adresses MEDIA, Pelican et VMs", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Écrire les politiques de filtrage au plus juste",
      texte: `
        Chaque flux autorisé a sa politique, nommée **SOURCE_TO_DESTINATION** pour rester lisible (par exemple MEDIA_TO_DNS ou VM_TO_WAN). Tout ce qui n'est pas autorisé est bloqué.

        - Vers le VLAN DNS, j'autorise **seulement le service DNS**, et seulement vers l'objet Adguard.
        - Le **NAT** n'est activé que sur les politiques qui sortent vers Internet (wan1).
        - Le reverse proxy **Nginx** n'a le droit de joindre que les services qu'il dessert (par exemple Jellyfin et Seerr).
      `,
      captures: [
        { fichier: "e4_sit7_etape4_liste-policies.png", legende: "Les politiques de pare-feu (l'infobulle montre les membres du groupe MEDIA)", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Accéder aux services à distance, avec des droits selon le profil",
      texte: `
        Une **IP virtuelle (VIP)** redirige les ports UDP 6000 et 6001 reçus sur wan1 vers mon serveur VPN. Une fois connecté, chaque utilisateur n'a accès qu'à ce que son profil autorise :

        - **VPN_ADMIN** : accès aux VLAN Proxy, MEDIA, VM et TEST, pour administrer ;
        - **VPN_USER** : accès **uniquement** à Jellyfin et Seerr, au DNS et à Internet.

        Deux autres VIP redirigent les ports 80 et 443 vers le reverse proxy Nginx.
      `,
      captures: [
        { fichier: "e4_sit7_etape5_vip.png", legende: "Les IP virtuelles : VPN et reverse proxy Nginx", masquer: "adresse IP publique" }
      ]
    },
    {
      titre: "Problème rencontré : le DNS ne résolvait rien",
      texte: `
        Au début, le VLAN du serveur DNS n'avait **aucun accès à Internet**. Les appareils obtenaient bien leur adresse IP, mais aucune résolution de nom ne fonctionnait : AdGuard Home ne pouvait pas joindre ses serveurs **upstream**.

        J'ai donc ajouté une politique qui autorise le serveur DNS à sortir vers Internet, puis vérifié la configuration de ses serveurs upstream. La résolution a alors fonctionné sur tous les VLAN.
      `,
      captures: [
        { fichier: "e4_sit7_etape6_policy-dns-internet.png", legende: "La politique qui autorise le serveur DNS à joindre Internet", masquer: "adresse IP publique" }
      ]
    },
    {
      titre: "Tester",
      texte: `
        - Sur un poste, \`ipconfig /all\` montre que le DNS reçu par DHCP est bien AdGuard Home, et \`nslookup\` que la réponse vient de lui.
        - Le journal du trafic du FortiWiFi montre les flux autorisés et refusés.
      `,
      captures: [
        { fichier: "e4_sit7_etape7_nslookup.png", legende: "Le DNS reçu par DHCP et la résolution par AdGuard Home", masquer: "rien d'obligatoire (adresses privées)" },
        { fichier: "e4_sit7_etape7_journal-trafic.png", legende: "Le journal du trafic : flux autorisés et refusés", masquer: "adresse IP publique" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : le réseau est découpé en VLAN, chaque flux est autorisé explicitement et l'accès à distance passe par un VPN dont les droits dépendent du profil. Deux limites à corriger : le DNS filtrant n'est pas **forcé** (un appareil peut en utiliser un autre ; il faudrait bloquer le port 53 vers tout autre serveur), et **FortiOS 5.4 n'est plus maintenu** par Fortinet.
  `
});
