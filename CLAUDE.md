# CLAUDE.md : guide pour toute IA qui travaille sur ce portfolio

> ⚠️ Ce dépôt est **public**. N'écris ici (et nulle part dans le site) aucun nom de
> personne, nom de serveur, adresse interne, règle de mot de passe ou mécanisme
> de sécurité de l'entreprise.

## 1. Le projet

Portfolio BTS SIO option SISR d'**Adaim CHATTI**, évalué à l'épreuve **E4**.
Statut réel : **technicien support en alternance** (support N1) au groupe **Emera**
(résidences services et établissements médicalisés pour seniors, siège à Mougins).
Objectif professionnel : évoluer vers l'infrastructure et le réseau. Homelab :
Proxmox, WireGuard (avec un tableau de bord web), Raspberry Pi + AdGuard Home,
FortiWiFi 60D (FortiOS 5.4).

## 2. Façon de travailler avec Adaim (obligatoire)

- **On discute avant de coder.** Poser des questions plutôt que supposer.
- Adaim ne code pas mais lit le code : **expliquer simplement**, code **commenté
  en français**, **aucun framework ni outil de build** sans son accord.
- Ton direct et concret, sans formules.
- **N'inventer aucune mission, étape technique ni résultat.** Info manquante →
  la demander ou écrire `[À COMPLÉTER : …]` (affiché en orange sur le site).
- Construire page par page et **montrer chaque type de page** (captures
  Playwright bureau + téléphone) avant de passer au suivant.
- Commits en français, poussés sur `main` à chaque étape.

## 3. Confidentialité (règles strictes)

- Adaim fournit désormais ses captures **déjà masquées** (rectangles opaques
  dans Greenshot). Vérifier quand même chaque capture avant de l'ajouter.
- À masquer ou ne jamais publier : noms et prénoms de personnes (sauf Adaim),
  e-mails, téléphones, noms d'établissements, noms de serveurs et de postes,
  arborescence AD, noms de domaine internes, adresses du helpdesk, numéros de
  ticket complets, IP publiques, numéros de série, **règles de mot de passe**,
  **détails de fonctionnement du MFA** (écrire seulement « vérification du
  statut MFA »), marque et état des accès distants de l'entreprise.
- Masquer avec des **rectangles opaques**, jamais du flou. Supprimer les
  métadonnées des images (`convert … -strip`).
- Aucune image prise sur internet (photos d'illustration, logos de produits).
  Les illustrations sont des captures d'Adaim ou des schémas dessinés pour le site.
- Le CV public ne doit contenir ni adresse postale, ni téléphone, ni âge.

## 4. Architecture (option A, choisie par Adaim)

Site statique sans build. Marche en double-cliquant sur `index.html` **et** en ligne.

```
index.html, entreprise.html, cv.html, competences.html, competence.html,
situations.html, situation.html, realisations.html, veille.html,
veille-exemple.html, verification.html   ← modèles vides, ne pas y écrire de texte
contenu/                ← TOUT le texte du site est ici
  liste.js              ← liste des fichiers de contenu chargés (ordre = affichage)
  profil.js             ← identité, présentation, fiche (accueil, pied de page)
  competences.js        ← B1.1 à B1.6 + T (transverse), savoir-faire du référentiel
  situations/*.js       ← une situation par fichier : ajouterSituation({…})
  veille/*.js           ← un exemple de veille par fichier (étape 4)
assets/js/site.js       ← moteur : menu, rendu des pages, liens automatiques
assets/css/style.css    ← mise en page ; couleurs UNIQUEMENT dans :root
assets/polices/         ← IBM Plex Sans / Condensed / Mono en local
images/commun/          ← photo-adaim-chatti.jpg, logo-ufip.png, logo-emera.png
images/situations/      ← captures des situations
images/veille/          ← illustrations de la veille
documents/              ← CV en PDF
```

- Les pages détail se lisent par paramètre : `competence.html?id=B1.1`,
  `situation.html?id=inventaire-ad`, `veille-exemple.html?id=…`.
- Le menu est défini **une seule fois** dans `site.js` (tableau `MENU`).
  Il ne contient que les pages principales, jamais les pages détail.

### Règles de cohérence (automatiques)

- **Chaque situation déclare les savoir-faire qu'elle valide**
  (`competences: ["B1.1.1", …]`, codes de `competences.js`).
  Les pages compétences et le tableau de couverture s'en déduisent.
- `statut: "publie"` = visible ; `statut: "brouillon"` = caché et ne compte pas
  comme preuve.
- **Une compétence sans preuve publiée n'est pas affichée** (règle du prof).
- `verification.html` (étape 6, à faire) doit lister : compétences sans preuve,
  images introuvables, `[À COMPLÉTER]` restants, brouillons, fichiers cassés.

### Mise en forme dans les textes de contenu

Ligne vide = paragraphe ; `- ` = puces ; `1. ` = liste numérotée ;
`**gras**` ; `` `code` `` ; `[texte](lien)` ; bloc de code entre deux lignes `~~~`
(pas de triple accent grave : les textes sont dans des gabarits JavaScript).

### Noms de fichiers

Minuscules, sans accents ni espaces. Captures :
`e4_sit<numéro>_etape<n>_<description>.png` (ex. `e4_sit2_etape3_mise-a-jour-ad.png`) ;
veille : `e4_veille<thème>_ex<n>_<description>.png`.
Le **numéro d'une situation est définitif** (ne jamais renuméroter).

## 5. Style visuel : « Plan réseau » (choisi par Adaim)

Bleu encre `#1B3A5C`, orange signal `#E8772E` (texte orange : `#B4500F`),
fond papier quadrillé `#EEF1F4`, blanc. Pas d'autre couleur.
Métaphores : accueil = baie de brassage (chaque page est un port) ;
compétence = switch dont chaque situation est un port branché.

## 6. Consignes du prof (checklist)

- Même en-tête partout, menu accessible partout (aussi sur téléphone), Accueil en premier.
- Un seul terme : « **veille technologique** ».
- 2 à 3 couleurs max ; chaque page illustrée ; titres H1/H2/H3 ; paragraphes courts.
- Accueil : nom, prénom, photo, logo UFIP, logo entreprise.
- Entreprise : description + ma mission.
- CV : image visible directement + bouton de téléchargement du PDF.
- Compétences : vue d'ensemble cohérente avec la grille E4, un bouton par compétence.
  Page compétence : titre, description, lien vers les situations qui la valident.
- Réalisations professionnelles : structure prête + message neutre (pas encore de consigne).
- Situations : vue d'ensemble + une page par situation : **titre**, **contexte**
  (2 à 4 lignes : rôle, objectif, raison de l'attribution), **déroulé** comme un
  tutoriel **avec captures** (sans captures = 0), **conclusion** (~2 lignes :
  objectif atteint ou non, pourquoi, lien vers les compétences).
- Veille : définition (3-4 lignes), planning, thèmes, exemples avec un bouton
  chacun. Page exemple : titre, contexte (thème, comment la solution a été
  trouvée), déroulé (la solution et son intérêt pour l'entreprise ou le projet
  pro), conclusion (solution adoptée ou non, pourquoi).
  **Un thème = un besoin ; un exemple = une solution trouvée pour y répondre.**
- Projets personnels clairement affichés comme tels.

## 7. État d'avancement

| Étape | Contenu | État |
|---|---|---|
| 1 | Moteur, en-tête, menu responsive, accueil | ✅ fait |
| 2 | Compétences + page compétence + tableau de couverture | ✅ fait |
| 3 | Situations + page situation (tutoriel) | ✅ fait (sit. 1, 2, 6 rédigées ; captures à fournir) |
| 4 | Veille technologique + page exemple | ⏳ |
| 5 | Entreprise, CV, Réalisations | ⏳ |
| 6 | verification.html, README.md | ⏳ |
| 7 | Mise en ligne GitHub Pages | ⏳ |

### Situations prévues (fichiers déjà créés dans `contenu/situations/`)

| N° | id | Type | Statut | Savoir-faire proposés (à faire valider) |
|---|---|---|---|---|
| 1 | inventaire-ad | pro | publie | B1.1.1 |
| 2 | arrivee-depart | pro | publie | B1.2.1, B1.2.2, B1.2.3, B1.1.3 |
| 3 | etiquetage-tablettes | pro | brouillon (accord du tuteur) | B1.1.1 |
| 4 | deploiement-postes | pro | brouillon | B1.5.2, B1.5.3 |
| 5 | documentation-n1 | pro | brouillon | B1.5.3 |
| 6 | adguard-home | perso | publie | B1.5.1, B1.5.2 |
| 7 | fortiwifi | perso | brouillon (captures) | B1.1.3, B1.5.1, B1.5.2 |
| 8 | audit-visibilite | pro | brouillon (à réaliser) | B1.3.2 |
| 9 | lab-mode-projet | ecole | brouillon (à réaliser) | B1.4.1-3, T.1 |

Les situations 1, 2 et 6 sont rédigées. Leurs captures manquent : chaque
emplacement affiche le chemin exact du fichier attendu et ce qu'il faut masquer.
Dès qu'un fichier est déposé à ce chemin, il s'affiche. Quelques
`[À COMPLÉTER]` restent (sit. 1 : méthode d'extraction et de comparaison ;
sit. 6 : téléchargement d'AdGuard, journal des requêtes du téléphone).

### Modèle d'une situation

```js
ajouterSituation({
  id: "mon-id", numero: 10, statut: "publie", type: "pro", lieu: "Emera",
  titre: "…", competences: ["B1.2.1"], outils: ["…"], resume: `…`,
  contexte: { role: "…", objectif: "…", raison: "…" },
  etapes: [
    { titre: "…", texte: `…`,
      captures: [{ fichier: "e4_sit10_etape1_….png", legende: "…", masquer: "…" }] }
  ],
  conclusion: `…`
});
```

## 8. Matière déjà connue (validée par Adaim, sans données internes)

**Sit. 1 : Inventaire AD.** Croisement de l'AD avec un tableau fourni par les RH
et avec les dates de dernière connexion (Last Logon, lues via l'AD ou Intune)
pour repérer les postes inactifs ; désactivation des objets obsolètes et mise à
jour des descriptions des PC (à qui appartient chaque poste). Préalable à un
projet de délégation des arrivées aux RH ; devenu une tâche récurrente.
Les anciennes captures venaient d'un **AD de test** (reconstitution) : si on les
réutilise, l'écrire clairement. Question ouverte : un script « LastLogon » a-t-il
été utilisé ? Ne mentionner PowerShell que s'il est montré.

**Sit. 2 : Arrivée sur un poste existant.** En résidence, les comptes de poste ne
sont pas nominatifs : l'arrivée consiste à réaffecter un compte existant.
Déroulé réel observé sur ses captures :
1. réception du ticket d'arrivée (formulaire Freshservice : établissement,
   identité, fonction, date d'embauche, type de contrat, responsable, profil référent) ;
2. note privée avec la checklist de l'équipe (AD / M365 / Freshservice) et lien
   vers le ticket de départ de l'ancien titulaire ;
3. premier retour au demandeur (prise en charge) ;
4. connexion au serveur d'administration (Remote Desktop Manager), console ADUC :
   activer le compte du poste, réinitialiser le mot de passe, mettre à jour nom
   complet et description, vérifier le statut MFA, vérifier que le PC est actif ;
5. envoi du mot de passe au responsable par e-mail chiffré ;
6. centre d'administration Microsoft 365 : autorisations de la boîte aux lettres
   (délégation existante signalée au demandeur), réponses automatiques désactivées ;
7. Freshservice : mise à jour de la fiche « demandeur » (règle : ne jamais
   supprimer un compte) ;
8. réponse finale au demandeur, ticket passé en attente de l'utilisateur.
Utilisation du script PowerShell **existant** de l'équipe pour créer des
utilisateurs : montrer seulement une exécution masquée, jamais le script.

**Sit. 6 : AdGuard Home (homelab).** Installation sur Raspberry Pi
(`./AdGuardHome -s install` en SSH), assistant web (ports et interfaces),
ouverture des ports 53 et 853 avec `ufw`, listes de blocage, DNS upstream
(dont Quad9 en DoH), services bloqués, configuration d'un client Windows
(DNS manuel), tableau de bord. Bonus DoT : certificat **Sectigo** (wildcard,
téléchargé depuis l'espace IONOS), installé dans AdGuard (`/etc/ssl/certs/…`),
client Android en « DNS privé ». Le domaine racine sert au DoT.

**Sit. 4 : Déploiement de postes.** Via Intune ; remise par la poste, livraison
par l'équipe ou en main propre au siège de Mougins. Étapes et captures à fournir.

**Sit. 5 : Documentation N1.** Rédigée sur Freshservice et Microsoft OneNote.
Sujet et extrait anonymisé à fournir.

**Sit. 7 : FortiWiFi 60D (FortiOS 5.4, homelab).** Fait : politiques de filtrage,
création de VLAN, routage inter-VLAN. VIP/DNAT : à confirmer. Ne pas publier
sans captures. Liste de captures déjà proposée : interfaces VLAN, édition d'un
VLAN, serveur DHCP, rattachement SSID/port, liste des policies, policy
inter-VLAN, policy vers Internet, ping autorisé, ping bloqué, logs de trafic.
FortiOS 5.4 n'est plus maintenu : à mentionner en conclusion.

**Sit. 8 : Audit de visibilité du site d'Emera (B1.3).** Référencement,
performance (PageSpeed), accessibilité, présence en ligne. Ne rien publier sur
la sécurité du site. Accord du tuteur nécessaire.

**Sit. 9 : Mode projet (B1.4 + transverse).** Adaim est un peu le leader de son
trio en lab. Lui fournir un kit simple : tableau Trello/GitHub Projects, fiche
projet d'une page, comptes rendus de point, bilan avec 2-3 indicateurs.

**Veille technologique (étape 4).** Créneau : **mercredi 15 h**. Outils : Feedly,
Google Alertes, Reddit r/sysadmin et r/cybersecurity, bulletins ANSSI / CERT-FR.
- Thème 1 « Remplacer le VPN SSL en fin de support » : exemple ZTNA, **présenté
  par Adaim et retenu par la DSI** (formulation à faire valider ; rester général
  sur l'entreprise).
- Thème 2 « Filtrer et chiffrer mes requêtes DNS » (homelab) : AdGuard Home
  (adopté), Pi-hole / NextDNS (non retenus, à justifier), DoT face à DoH.
- Thème 3 optionnel : IA locale (Ollama), « en cours d'étude ».
- regreSSHion : retiré (ce n'est pas une solution à un besoin).
- Le README doit expliquer pas à pas la routine de veille et l'ajout d'un exemple.

**Entreprise / mission (étape 5).** Support N1 pour les collaborateurs d'Emera
(France, Belgique… liste des pays à confirmer). Perspective : passage vers
l'infrastructure prévu au 1er janvier (à confirmer, ne pas l'écrire tant que ce
n'est pas acté). L'ancienne page était trop gonflée : rester factuel.

## 9. Questions en attente

1. Script « LastLogon » utilisé pour l'inventaire ?
2. École : UFIP (dit par Adaim) ou EFITECH (écrit sur l'ancien CV) ?
3. CV : Adaim le refait, ou on en refait un (sans adresse, téléphone ni âge,
   avec Emera, SISR, homelab) ?
4. Publier le portfolio sur `portfolio.foxwarch.com` (le domaine racine sert au DoT) ?
5. Validation des savoir-faire attribués aux situations 1, 2 et 6.
6. URL LinkedIn (champ `linkedin` de `profil.js`).
7. Accord du tuteur : publication des situations, tablettes, audit, captures.

## 10. Hébergement (étape 7)

GitHub Pages sur le dépôt `Foxwatch/BTS-Portfolio` (branche `main`, racine),
fichier `.nojekyll` déjà présent. Domaine chez **IONOS** : ajouter un
enregistrement CNAME `portfolio` → `foxwatch.github.io` et un fichier `CNAME`.
Pas de reverse proxy ni d'ouverture de pare-feu nécessaire.
