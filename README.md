# Portfolio BTS SIO SISR : Adaim CHATTI

Portfolio de l'épreuve **E4**. Site statique, **sans aucun outil à installer** :
il marche en double-cliquant sur `index.html` et une fois en ligne.

> Les règles complètes pour une IA (confidentialité, conventions, état du projet)
> sont dans [`CLAUDE.md`](CLAUDE.md). À lire avant toute modification.

---

## 1. Voir le site sur mon PC

1. Télécharger le dépôt : bouton vert **Code** sur GitHub, puis **Download ZIP**, puis décompresser.
2. Double-cliquer sur `index.html`.
3. Pour voir ce qui manque : ouvrir `verification.html` (page hors menu).

## 2. Comment le site est rangé

| Je veux modifier… | Fichier |
|---|---|
| Mon nom, ma présentation, la fiche de l'accueil, LinkedIn, le CV | `contenu/profil.js` |
| La page Entreprise | `contenu/entreprise.js` |
| Les compétences de la grille E4 | `contenu/competences.js` |
| Une situation | `contenu/situations/<id>.js` |
| La définition, le planning, les outils et les thèmes de veille | `contenu/veille.js` |
| Un exemple de veille | `contenu/veille/<id>.js` |
| La page Réalisations | `contenu/realisations.js` |
| La liste des fichiers chargés (et leur ordre) | `contenu/liste.js` |
| Les couleurs, les tailles | `assets/css/style.css` (bloc `:root`) |
| Le menu, l'affichage des pages | `assets/js/site.js` |

**Règle d'or : pour ajouter ou corriger du contenu, on ne touche qu'au dossier `contenu/`
(et on dépose les images dans `images/`).** Les fichiers `.html` sont des modèles vides.

### Mise en forme dans les textes

| J'écris | Résultat |
|---|---|
| une ligne vide | nouveau paragraphe |
| `- texte` | liste à puces |
| `1. texte` | liste numérotée |
| `**texte**` | **gras** |
| `` `texte` `` | `code` |
| `[texte](https://…)` | lien |
| `[À COMPLÉTER : …]` | marqueur orange, listé dans `verification.html` |
| une ligne `~~~`, du code, une ligne `~~~` | bloc de code (commandes) |

⚠️ Les textes sont entre deux accents graves `` ` ``. Ne pas en mettre trois d'affilée
dans un texte : utiliser `~~~` pour les blocs de code.

## 3. Ajouter une capture d'écran

1. **Masquer d'abord** sur mon PC (outil rectangle de Greenshot, rectangles **opaques**, pas de flou) :
   noms de personnes, e-mails, téléphones, établissements, serveurs, postes, arborescence AD,
   domaines internes, adresses du helpdesk, numéros de ticket, IP publiques, numéros de série,
   règles de mot de passe, détails du MFA.
2. Nommer le fichier **exactement** comme indiqué sur la page (chemin affiché dans l'emplacement
   orange), par exemple `e4_sit2_etape1_ticket-arrivee.png`.
3. Le déposer dans `images/situations/` (ou `images/veille/` pour la veille).
4. Recharger la page : la capture remplace l'emplacement.

Modèle de nom : `e4_sit<numéro>_etape<n>_<description>.png`, en minuscules, sans accents ni espaces.

## 4. Ajouter une situation

1. Copier `modeles/situation.js` dans `contenu/situations/` et le renommer (ex. `sauvegarde-proxmox.js`).
2. Remplir les champs. Le champ `competences` liste les savoir-faire validés (codes de `contenu/competences.js`,
   par exemple `"B1.1.5"`) : **les pages compétences se mettent à jour toutes seules**.
3. Ajouter `"situations/sauvegarde-proxmox.js"` dans `contenu/liste.js`.
4. Laisser `statut: "brouillon"` tant que les captures ne sont pas prêtes (sans captures, la consigne donne 0),
   puis passer à `statut: "publie"`.

Phrase à donner à une IA :
> Ajoute cette situation à mon portfolio en suivant `CLAUDE.md` et `modeles/situation.js`.
> Ne modifie que le dossier `contenu/`. N'invente rien : mets `[À COMPLÉTER]` si une info manque.
> Voici mes notes : …

## 5. Ma routine de veille technologique (mercredi 15 h)

1. **Lire mes sources** : Feedly, Google Alertes, Reddit (r/sysadmin, r/cybersecurity), bulletins ANSSI / CERT-FR.
2. **Garder seulement ce qui répond à un besoin** : un de mes thèmes (dans `contenu/veille.js`) ou un nouveau besoin.
3. **Noter pour chaque solution trouvée** : la source et la date, ce que fait la solution,
   ce qu'elle apporterait à l'entreprise ou à mon homelab, et si je l'adopte (et pourquoi).
4. **Si possible, la tester** dans mon homelab et faire une capture : c'est la meilleure illustration.
5. **L'ajouter au site** : copier `modeles/exemple-veille.js` dans `contenu/veille/`, le remplir,
   l'ajouter à `contenu/liste.js`. Ou donner mes notes à une IA :
   > Ajoute cet exemple de veille à mon portfolio en suivant `CLAUDE.md` et `modeles/exemple-veille.js`.
   > Thème : … Ne modifie que le dossier `contenu/`. Voici mes notes : …
6. **Nouveau besoin ?** Ajouter un thème dans `contenu/veille.js` (`id`, `numero`, `cadre`, `titre`, `besoin`).

## 6. Ajouter ou modifier une compétence

Les compétences et leurs savoir-faire sont dans `contenu/competences.js`, avec les textes du référentiel.
On n'y met **aucune preuve** : ce sont les situations (et la veille) qui déclarent les savoir-faire qu'elles valident.
Une compétence sans preuve publiée **n'est pas affichée** sur le site (règle du prof) ; elle apparaît dans
`verification.html`.

## 7. Avant l'épreuve : vérifier

Ouvrir `verification.html`. Elle liste automatiquement :
- les compétences sans preuve et les savoir-faire non couverts ;
- les images introuvables ;
- les `[À COMPLÉTER]` restants ;
- les brouillons ;
- les fichiers de contenu qui contiennent une erreur.

## 8. Mettre le site en ligne (GitHub Pages, gratuit)

1. Sur GitHub, dépôt `BTS-Portfolio` : **Settings > Pages**.
2. *Source* : **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
3. Après une ou deux minutes, le site est en ligne sur `https://foxwatch.github.io/BTS-Portfolio/`.

### Avec mon domaine (IONOS)

Le domaine racine `foxwarch.com` sert déjà à mon DNS over TLS : on utilise un **sous-domaine**.

1. Chez IONOS : **Domaines & SSL > foxwarch.com > DNS > Ajouter un enregistrement** de type **CNAME** :
   nom d'hôte `portfolio`, valeur `foxwatch.github.io`.
2. Sur GitHub : **Settings > Pages > Custom domain** : `portfolio.foxwarch.com`, puis **Save**.
3. Attendre la validation (de quelques minutes à quelques heures), puis cocher **Enforce HTTPS**.

## 9. Consignes du prof

La checklist complète est dans `CLAUDE.md` (section 6).
