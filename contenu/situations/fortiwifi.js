/* Situation n°7 : voir le modèle complet et les règles dans README.md */
ajouterSituation({
  id: "fortiwifi",
  numero: 7,  // définitif : sert au nom des captures (e4_sit7_…)
  statut: "publie",  // "publie" = visible sur le site ; "brouillon" = caché
  type: "perso",  // "pro" | "perso" | "ecole"
  lieu: "Homelab",
  titre: "Segmentation réseau et accès sécurisé aux services avec un FortiWiFi 60D",

  // Savoir-faire validés (codes de contenu/competences.js)
  competences: ["B1.1.3", "B1.5.2", "B1.5.1", "B1.6.1", "B1.6.4"],

  outils: ["FortiWiFi 60D (FortiOS 5.4)", "Proxmox", "AdGuard Home", "Nginx", "WireGuard"],

  // Une ou deux phrases, affichées sur les cartes
  resume: `
    Découpage de mon réseau en VLAN, DNS AdGuard distribué à tous, politiques de pare-feu au plus juste, publication de deux services par reverse proxy et accès distant par VPN WireGuard avec des droits selon le profil.
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
        - **VPN** : le serveur WireGuard d'accès à distance.
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

        - Vers le VLAN DNS, j'autorise **seulement le service DNS**, et seulement vers l'objet Adguard. Seul le profil administrateur du VPN a tous les services, pour ouvrir l'interface web d'AdGuard.
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
        Deux types d'accès depuis Internet, chacun par une **IP virtuelle (VIP)** sur wan1 :

        1. **Jellyfin et Seerr** sont publiés par le **reverse proxy Nginx** : les VIP redirigent les ports 80 et 443 vers Nginx, qui transmet les requêtes à ces deux services seulement (politique Nginx_TO_MEDIA). Aucun autre service n'est exposé.
        2. **Tout le reste passe par le VPN WireGuard** : une VIP redirige les ports UDP 6000 et 6001 vers le serveur VPN. Une fois connecté, chaque utilisateur n'a accès qu'à ce que son profil autorise :

        - **VPN_ADMIN** : accès aux VLAN Proxy, MEDIA, VM et TEST, pour administrer ;
        - **VPN_USER** : accès **uniquement** à Jellyfin et Seerr, au DNS et à Internet.
      `,
      captures: [
        { fichier: "e4_sit7_etape5_vip.png", legende: "Les IP virtuelles : VPN WireGuard et reverse proxy Nginx", masquer: "adresse IP publique" }
      ]
    },
    {
      titre: "Problème rencontré : le DNS ne résolvait rien",
      texte: `
        Au début, le VLAN du serveur DNS n'avait **aucun accès à Internet**. Les appareils obtenaient bien leur adresse IP, mais aucune résolution de nom ne fonctionnait : AdGuard Home ne pouvait pas joindre ses serveurs **upstream**.

        J'ai donc ajouté la politique **DNS_TO_WAN**, qui autorise le serveur AdGuard à sortir vers Internet (avec NAT), puis vérifié la configuration de ses serveurs upstream. La résolution a alors fonctionné sur tous les VLAN.
      `,
      captures: [
        { fichier: "e4_sit7_etape6_policies-dns.png", legende: "Les politiques liées au DNS : DNS_TO_WAN (ligne 2) et les accès de chaque VLAN, limités au service DNS", masquer: "rien d'obligatoire" }
      ]
    },
    {
      titre: "Tester",
      texte: `
        Depuis mon PC connecté par le VPN WireGuard :

        - \`ipconfig /all\` montre l'adresse reçue dans le tunnel (10.10.40.2) et le serveur DNS **10.0.30.253**, c'est-à-dire AdGuard Home ;
        - \`nslookup google.com\` confirme que c'est bien **adguard.local** qui répond.
      `,
      captures: [
        { fichier: "e4_sit7_etape7_ipconfig-vpn.png", legende: "Le tunnel WireGuard : adresse et DNS AdGuard", masquer: "rien d'obligatoire (adresses privées)" },
        { fichier: "e4_sit7_etape7_nslookup.png", legende: "La résolution de noms passe par AdGuard Home", masquer: "rien d'obligatoire (adresses privées)" }
      ]
    }
  ],

  conclusion: `
    Objectif atteint : le réseau est découpé en VLAN, chaque flux est autorisé explicitement et seuls deux services sont publiés, et le reste n'est accessible que par un VPN dont les droits dépendent du profil. Deux limites à corriger : le DNS filtrant n'est pas **forcé** (un appareil peut en utiliser un autre ; il faudrait bloquer le port 53 vers tout autre serveur), et **FortiOS 5.4 n'est plus maintenu** par Fortinet.
  `
});
