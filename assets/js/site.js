/* ==========================================================================
   site.js : le « moteur » du portfolio
   --------------------------------------------------------------------------
   Ce fichier ne contient AUCUN texte du portfolio : tout le contenu est
   dans le dossier contenu/. Ici, on se contente de :
     1. fournir les fonctions que les fichiers de contenu appellent
        (definirProfil, ajouterSituation, …) ;
     2. charger les fichiers listés dans contenu/liste.js ;
     3. construire l'en-tête, le menu, le pied de page et la page demandée.

   Chaque page HTML indique ce qu'elle est avec <body data-page="…">.
   Le site marche en double-cliquant sur index.html (sans serveur) et en ligne.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. LE REGISTRE : les fichiers de contenu y déposent leurs données
     ------------------------------------------------------------------------ */
  var SITE = {
    profil: null,        // rempli par contenu/profil.js
    competences: [],     // rempli par contenu/competences.js
    situations: [],      // un appel ajouterSituation() par fichier
    veille: null,        // rempli par contenu/veille.js
    exemplesVeille: [],  // un appel ajouterExempleVeille() par fichier
    erreurs: []          // problèmes de chargement, affichés à l'écran
  };
  window.SITE = SITE;

  window.definirProfil = function (donnees) { SITE.profil = donnees; };
  window.ajouterCompetence = function (donnees) { SITE.competences.push(donnees); };
  window.ajouterSituation = function (donnees) { SITE.situations.push(donnees); };
  window.definirVeille = function (donnees) { SITE.veille = donnees; };
  window.ajouterExempleVeille = function (donnees) { SITE.exemplesVeille.push(donnees); };
  window.definirEntreprise = function (donnees) { SITE.entreprise = donnees; };
  window.definirRealisations = function (donnees) { SITE.realisations = donnees; };

  /* ------------------------------------------------------------------------
     2. LE MENU : une seule définition, utilisée par toutes les pages.
        « parent » sert aux pages détail (pages « .b ») : elles allument
        l'entrée de menu de leur page d'ensemble.
     ------------------------------------------------------------------------ */
  var MENU = [
    { id: "accueil",      titre: "Accueil",              lien: "index.html",        desc: "" },
    { id: "entreprise",   titre: "Entreprise",           lien: "entreprise.html",   desc: "Le groupe Emera et ma mission en alternance" },
    { id: "cv",           titre: "CV",                   lien: "cv.html",           desc: "Mon parcours, à consulter ou télécharger" },
    { id: "competences",  titre: "Compétences",          lien: "competences.html",  desc: "Le bloc 1 de l'épreuve E4 et leurs preuves" },
    { id: "situations",   titre: "Situations",           lien: "situations.html",   desc: "Mes situations professionnelles, étape par étape" },
    { id: "realisations", titre: "Réalisations",         lien: "realisations.html", desc: "Mes réalisations professionnelles" },
    { id: "veille",       titre: "Veille technologique", lien: "veille.html",       desc: "Mes thèmes de veille technologique et les solutions étudiées" }
  ];

  var PAGES_DETAIL = { competence: "competences", situation: "situations", "veille-exemple": "veille" };

  /* ------------------------------------------------------------------------
     3. OUTILS
     ------------------------------------------------------------------------ */

  // Protège le texte avant de l'insérer dans la page (évite qu'un « < » casse tout)
  function echapper(texte) {
    return String(texte == null ? "" : texte)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Mise en forme à l'intérieur d'une ligne : **gras**, `code`, [lien](adresse), [À COMPLÉTER …]
  function formaterLigne(texte) {
    var html = echapper(texte);
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (tout, libelle, adresse) {
      var externe = /^https?:\/\//.test(adresse);
      return '<a href="' + adresse + '"' + (externe ? ' target="_blank" rel="noopener"' : "") + ">" + libelle + "</a>";
    });
    html = html.replace(/\[À COMPLÉTER[^\]]*\]/g, function (marque) {
      return '<span class="a-completer">' + marque + "</span>";
    });
    return html;
  }

  /* Transforme un texte des fichiers de contenu en HTML.
     Règles (rappelées dans le README) :
       - une ligne vide sépare deux paragraphes ;
       - des lignes qui commencent par « - » forment une liste à puces ;
       - des lignes qui commencent par « 1. », « 2. »… forment une liste numérotée ;
       - un bloc entre deux lignes « ~~~ » est affiché comme du code. */
  function formater(texte) {
    if (!texte) return "";
    var lignes = String(texte).replace(/\r/g, "").split("\n");

    // On retire l'indentation commune (due à la présentation dans le fichier)
    var retrait = null;
    lignes.forEach(function (l) {
      if (l.trim() === "") return;
      var n = l.match(/^ */)[0].length;
      if (retrait === null || n < retrait) retrait = n;
    });
    lignes = lignes.map(function (l) { return l.slice(retrait || 0); });

    var html = "";
    var bloc = [];
    var dansCode = false;
    var code = [];

    function viderBloc() {
      if (!bloc.length) return;
      if (bloc.every(function (l) { return /^\s*- /.test(l); })) {
        html += "<ul>" + bloc.map(function (l) { return "<li>" + formaterLigne(l.replace(/^\s*- /, "")) + "</li>"; }).join("") + "</ul>";
      } else if (bloc.every(function (l) { return /^\s*\d+\. /.test(l); })) {
        html += "<ol>" + bloc.map(function (l) { return "<li>" + formaterLigne(l.replace(/^\s*\d+\. /, "")) + "</li>"; }).join("") + "</ol>";
      } else {
        html += "<p>" + formaterLigne(bloc.join(" ")) + "</p>";
      }
      bloc = [];
    }

    lignes.forEach(function (l) {
      if (l.trim() === "~~~") {
        if (dansCode) { html += "<pre><code>" + echapper(code.join("\n")) + "</code></pre>"; code = []; }
        else { viderBloc(); }
        dansCode = !dansCode;
        return;
      }
      if (dansCode) { code.push(l); return; }
      if (l.trim() === "") { viderBloc(); return; }
      bloc.push(l.trim());
    });
    viderBloc();
    return html;
  }

  // Raccourci pour créer du HTML à partir d'un modèle
  function el(selecteur) { return document.querySelector(selecteur); }

  /* ------------------------------------------------------------------------
     4. CHARGEMENT DES FICHIERS DE CONTENU
     ------------------------------------------------------------------------ */

  // Si un fichier de contenu contient une faute de syntaxe (virgule oubliée…),
  // on note quel fichier pose problème pour l'afficher clairement.
  window.addEventListener("error", function (e) {
    if (e.filename && e.filename.indexOf("/contenu/") !== -1) {
      SITE.erreurs.push({
        fichier: e.filename.slice(e.filename.indexOf("contenu/")),
        message: "Erreur d'écriture ligne " + e.lineno + " : " + e.message
      });
    }
  });

  function chargerScript(chemin) {
    return new Promise(function (fini) {
      var s = document.createElement("script");
      s.src = chemin;
      s.onload = fini;
      s.onerror = function () {
        SITE.erreurs.push({ fichier: chemin, message: "Fichier introuvable (vérifier le nom dans contenu/liste.js)" });
        fini();
      };
      document.head.appendChild(s);
    });
  }

  // Charge les fichiers un par un, dans l'ordre de contenu/liste.js
  function chargerContenu() {
    var liste = window.LISTE_CONTENU || [];
    return liste.reduce(function (suite, fichier) {
      return suite.then(function () { return chargerScript("contenu/" + fichier); });
    }, Promise.resolve());
  }

  /* ------------------------------------------------------------------------
     5. EN-TÊTE, MENU ET PIED DE PAGE (communs à toutes les pages)
     ------------------------------------------------------------------------ */
  function construireEntete(pageActive) {
    var p = SITE.profil || {};
    var entreeActive = PAGES_DETAIL[pageActive] || pageActive;

    var liens = MENU.map(function (m) {
      var actif = m.id === entreeActive ? ' aria-current="page"' : "";
      return '<li><a href="' + m.lien + '"' + actif + ">" + m.titre + "</a></li>";
    }).join("");

    el("#entete").outerHTML =
      '<header class="entete">' +
        '<div class="conteneur entete-interieur">' +
          '<a class="marque" href="index.html">' + echapper((p.prenom || "").toLowerCase()) + "<b>.</b>" + echapper((p.nom || "").toLowerCase()) + " <span>/ portfolio</span></a>" +
          '<button class="bouton-menu" type="button" aria-expanded="false" aria-controls="menu-principal"><span class="barres" aria-hidden="true"></span>Menu</button>' +
          '<nav class="menu" id="menu-principal" aria-label="Menu principal"><ul>' + liens + "</ul></nav>" +
        "</div>" +
      "</header>";

    // Ouverture / fermeture du menu sur téléphone
    var bouton = el(".bouton-menu");
    var menu = el("#menu-principal");
    bouton.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("ouvert")) {
        menu.classList.remove("ouvert");
        bouton.setAttribute("aria-expanded", "false");
        bouton.focus();
      }
    });
  }

  function construirePied() {
    var p = SITE.profil || {};
    var linkedin = p.linkedin ? ' · <a href="' + echapper(p.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' : "";
    el("#pied").outerHTML =
      '<footer class="pied">' +
        '<div class="conteneur pied-interieur">' +
          "<span>" + echapper(p.prenom) + " " + echapper(p.nom) + " · " + echapper(p.formation) + " · " + echapper(p.ecole && p.ecole.nom) + linkedin + "</span>" +
          "<span>Mise à jour : " + echapper(p.miseAJour) + "</span>" +
        "</div>" +
      "</footer>";
  }

  // Affiche en haut de la page les fichiers de contenu qui n'ont pas pu être lus
  function afficherErreurs() {
    if (!SITE.erreurs.length) return "";
    return '<div class="alerte" role="alert"><strong>Un fichier de contenu pose problème :</strong>' +
      SITE.erreurs.map(function (e) { return "<span><code>" + echapper(e.fichier) + "</code> : " + echapper(e.message) + "</span>"; }).join("") +
      "</div>";
  }

  /* ------------------------------------------------------------------------
     6. LES PAGES
     ------------------------------------------------------------------------ */

  // Image avec un emplacement visible si le fichier n'existe pas encore
  function image(src, alt, texteSiAbsente, classeVide) {
    var vide = '<span class="' + classeVide + ' libelle">' + echapper(texteSiAbsente) + "</span>";
    if (!src) return vide;
    return '<img src="' + echapper(src) + '" alt="' + echapper(alt) + '" data-si-absente="' + echapper(vide) + '">';
  }

  // Remplace une image introuvable par son emplacement « à fournir »
  function surveillerImages() {
    document.querySelectorAll("img[data-si-absente]").forEach(function (img) {
      function remplacer() {
        // Si l'image est dans un lien « agrandir », on remplace le lien entier
        var cible = img.parentElement && img.parentElement.tagName === "A" ? img.parentElement : img;
        cible.outerHTML = img.getAttribute("data-si-absente");
      }
      if (img.complete && img.naturalWidth === 0) remplacer();
      else img.addEventListener("error", remplacer);
    });
  }

  var PAGES = {};

  // ---- Accueil ----
  PAGES.accueil = function () {
    var p = SITE.profil;

    var fiche = (p.fiche || []).map(function (ligne) {
      return "<dt>" + echapper(ligne.libelle) + "</dt><dd>" + formaterLigne(ligne.valeur) + "</dd>";
    }).join("");

    var logos = [
      { info: p.ecole, legende: "École" },
      { info: p.entreprise, legende: "Entreprise d'accueil" }
    ].map(function (l) {
      return '<figure class="logo"><figcaption class="libelle">' + l.legende + "</figcaption>" +
        '<div class="logo-cadre">' + image(l.info.logo, "Logo " + l.info.nom, "[LOGO " + l.info.nom.toUpperCase() + " À FOURNIR]", "logo-vide") + "</div></figure>";
    }).join("");

    var ports = MENU.filter(function (m) { return m.id !== "accueil"; }).map(function (m, i) {
      return '<a class="port" href="' + m.lien + '">' +
        '<span class="port-haut"><span class="prise" aria-hidden="true"></span><span class="led" aria-hidden="true"></span></span>' +
        '<span class="port-num" aria-hidden="true">PORT ' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="port-titre">' + m.titre + "</span>" +
        '<span class="port-desc">' + m.desc + "</span></a>";
    }).join("");

    return (
      '<section class="accueil-hero">' +
        '<figure class="photo">' + image(p.photo, "Photo d'" + p.prenom + " " + p.nom, "[PHOTO À FOURNIR]", "photo-vide") + "</figure>" +
        '<div class="accueil-identite">' +
          '<p class="libelle">Portfolio · ' + echapper(p.formation) + "</p>" +
          "<h1>" + echapper(p.prenom) + " " + echapper(p.nom) + "</h1>" +
          '<p class="accueil-role">' + echapper(p.role) + "</p>" +
          '<div class="texte">' + formater(p.presentation) + "</div>" +
          '<div class="logos">' + logos + "</div>" +
        "</div>" +
      "</section>" +
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">En bref</p><h2>Fiche d\'identité</h2></div>' +
        '<dl class="fiche">' + fiche + "</dl>" +
      "</section>" +
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Accès rapide</p><h2>Parcourir le portfolio</h2></div>' +
        '<nav class="baie" aria-label="Accès rapide aux pages">' + ports + "</nav>" +
      "</section>"
    );
  };

  /* ---- Liens entre situations et compétences ----
     Ce sont les situations qui déclarent les savoir-faire qu'elles valident.
     Tout le reste (pages compétences, tableau de couverture) en est déduit. */

  var TYPES = {
    pro:   { court: "Pro",          long: "Situation professionnelle" },
    perso: { court: "Projet perso", long: "Projet personnel" },
    ecole: { court: "Pédagogique",  long: "Situation pédagogique" },
    veille: { court: "Veille",      long: "Veille technologique" }
  };

  function situationsPubliees() {
    return SITE.situations.filter(function (s) { return s.statut === "publie"; });
  }

  /* Toutes les preuves possibles : les situations publiées, plus la veille
     technologique (qui prouve les savoir-faire déclarés dans contenu/veille.js). */
  function toutesLesPreuves() {
    var preuves = situationsPubliees();
    var v = SITE.veille;
    if (v && (v.competences || []).length) {
      preuves = preuves.concat([{
        id: "veille", type: "veille", lieu: "Veille", lien: "veille.html",
        titre: "Veille technologique", resume: v.resume || "", competences: v.competences
      }]);
    }
    return preuves;
  }

  function lienSituation(s) { return s.lien || "situation.html?id=" + encodeURIComponent(s.id); }
  function lienCompetence(c) { return "competence.html?id=" + encodeURIComponent(c.code); }

  // Preuves qui valident ce savoir-faire précis (ex. "B1.1.1")
  function preuvesSavoirFaire(code) {
    return toutesLesPreuves().filter(function (s) { return (s.competences || []).indexOf(code) !== -1; });
  }

  // Preuves qui valident au moins un savoir-faire de la compétence
  function preuvesCompetence(c) {
    var codes = c.savoirFaire.map(function (sf) { return sf.code; });
    return toutesLesPreuves().filter(function (s) {
      return (s.competences || []).some(function (code) { return codes.indexOf(code) !== -1; });
    });
  }

  // Règle du prof : on n'affiche que les compétences prouvées
  function competencesAffichees() {
    return SITE.competences.filter(function (c) { return preuvesCompetence(c).length > 0; });
  }

  function etiquetteType(s) {
    var t = TYPES[s.type] || { court: s.type };
    return '<span class="etiquette etiquette-' + echapper(s.type) + '">' + echapper(t.court) + "</span>";
  }

  function numeroSituation(s) { return s.type === "veille" ? "VEILLE" : "SIT-" + String(s.numero).padStart(2, "0"); }

  // Fil d'Ariane des pages détail
  function filAriane(parent, lien, actuel) {
    return '<nav class="fil-ariane" aria-label="Fil d\'Ariane"><a href="' + lien + '">' + echapper(parent) + "</a>" +
      '<span aria-hidden="true">/</span><span aria-current="page">' + echapper(actuel) + "</span></nav>";
  }

  // Carte « switch » d'une compétence : chaque situation qui la prouve est un port branché
  function carteCompetence(c) {
    var preuves = preuvesCompetence(c);
    var ports = preuves.map(function (s) {
      return '<li><span class="port-n">' + numeroSituation(s) + '</span><a href="' + lienSituation(s) + '">' + echapper(s.titre) + "</a>" + etiquetteType(s) + "</li>";
    }).join("");
    return '<article class="switch">' +
      '<div class="switch-haut"><span><span class="voyant" aria-hidden="true"></span>' + echapper(c.code) + "</span>" +
      "<span>" + preuves.length + " port" + (preuves.length > 1 ? "s" : "") + " actif" + (preuves.length > 1 ? "s" : "") + "</span></div>" +
      '<h3><a href="' + lienCompetence(c) + '">' + echapper(c.titre) + "</a></h3>" +
      '<ul class="ports">' + ports + "</ul>" +
      '<a class="bouton" href="' + lienCompetence(c) + '">Voir la compétence <span aria-hidden="true">→</span></a>' +
      "</article>";
  }

  // Tableau de synthèse : savoir-faire (lignes) × situations (colonnes)
  function tableauCouverture(competences) {
    var sits = toutesLesPreuves();
    var entete = "<tr><th scope=\"col\">Savoir-faire</th>" + sits.map(function (s) {
      return '<th scope="col"><a href="' + lienSituation(s) + '" title="' + echapper(s.titre) + '">' + numeroSituation(s) + "</a></th>";
    }).join("") + "</tr>";
    var lignes = competences.map(function (c) {
      var groupe = '<tr class="groupe"><th scope="rowgroup" colspan="' + (sits.length + 1) + '"><a href="' + lienCompetence(c) + '">' + echapper(c.code) + " · " + echapper(c.titre) + "</a></th></tr>";
      return groupe + c.savoirFaire.map(function (sf) {
        return '<tr><th scope="row"><span class="code">' + echapper(sf.code) + "</span> " + echapper(sf.texte) + "</th>" + sits.map(function (s) {
          var ok = (s.competences || []).indexOf(sf.code) !== -1;
          return ok ? '<td class="oui"><span aria-hidden="true">●</span><span class="sr">validé par ' + numeroSituation(s) + "</span></td>" : "<td></td>";
        }).join("") + "</tr>";
      }).join("");
    }).join("");
    return '<div class="tableau-defilant"><table class="couverture">' + "<thead>" + entete + "</thead><tbody>" + lignes + "</tbody></table></div>" +
      '<p class="legende">' + sits.map(function (s) { return "<span><b>" + numeroSituation(s) + "</b> " + echapper(s.titre) + "</span>"; }).join("") + "</p>";
  }

  // ---- Compétences (vue d'ensemble) ----
  PAGES.competences = function () {
    var liste = competencesAffichees();
    return (
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Épreuve E4 · Bloc 1</p><h1>Compétences</h1></div>' +
        '<div class="texte"><p>Les compétences du bloc 1 que j\'ai mobilisées en entreprise, à l\'école et dans mes projets personnels. Chacune est prouvée par au moins une situation : ses « ports actifs » mènent directement aux situations qui la valident.</p></div>' +
        '<div class="grille-switchs">' + liste.map(carteCompetence).join("") + "</div>" +
      "</section>" +
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Synthèse</p><h2>Tableau de couverture</h2></div>' +
        '<div class="texte"><p>Chaque point indique qu\'une situation valide le savoir-faire de la ligne.</p></div>' +
        tableauCouverture(liste) +
      "</section>"
    );
  };

  // ---- Compétence (page détail, « 4.b ») ----
  PAGES.competence = function () {
    var code = new URLSearchParams(location.search).get("id");
    var c = competencesAffichees().filter(function (x) { return x.code === code; })[0];
    if (!c) {
      return '<section class="planche section"><h1>Compétence introuvable</h1><p>Cette compétence n\'existe pas ou n\'est pas encore prouvée.</p>' +
        '<p><a class="bouton" href="competences.html">Retour aux compétences</a></p></section>';
    }
    document.title = c.code + " " + c.titre + " · " + SITE.profil.prenom + " " + SITE.profil.nom;
    var preuves = preuvesCompetence(c);

    var savoirFaire = c.savoirFaire.map(function (sf) {
      var sits = preuvesSavoirFaire(sf.code);
      var liens = sits.length
        ? sits.map(function (s) { return '<a class="puce-lien" href="' + lienSituation(s) + '">' + numeroSituation(s) + "</a>"; }).join("")
        : '<span class="sans-preuve">Pas encore de situation</span>';
      return '<li class="' + (sits.length ? "couvert" : "non-couvert") + '"><span class="code">' + echapper(sf.code) + "</span>" +
        '<span class="sf-texte">' + echapper(sf.texte) + '</span><span class="sf-preuves">' + liens + "</span></li>";
    }).join("");

    var indicateurs = c.indicateurs && c.indicateurs.length
      ? '<section class="section"><div class="section-tete"><h2>Indicateurs de l\'épreuve</h2></div><div class="texte"><ul>' +
        c.indicateurs.map(function (i) { return "<li>" + formaterLigne(i) + "</li>"; }).join("") + "</ul></div></section>"
      : "";

    var cartes = preuves.map(function (s) { return carteSituation(s, c.code); }).join("");

    return (
      filAriane("Compétences", "competences.html", c.code) +
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Compétence ' + echapper(c.code) + "</p><h1>" + echapper(c.titre) + "</h1></div>" +
        '<div class="texte">' + formater(c.description) + "</div>" +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Savoir-faire du référentiel</h2></div>' +
        '<ul class="savoir-faire">' + savoirFaire + "</ul></section>" +
      indicateurs +
      '<section class="section"><div class="section-tete"><h2>Situations qui valident cette compétence</h2></div>' +
        '<div class="grille-cartes">' + cartes + "</div></section>"
    );
  };

  /* ---- Captures d'écran ----
     Si le fichier n'existe pas encore, on affiche à la place un emplacement
     qui indique le chemin exact où déposer la capture, ce qu'elle doit montrer
     et ce qu'il faut masquer. Dès que le fichier est déposé, il s'affiche. */
  var compteurFigures = 0;

  function capture(c, dossier) {
    compteurFigures++;
    var chemin = dossier + c.fichier;
    var vide = '<div class="capture-vide">' +
      '<span class="libelle">Capture à fournir</span>' +
      "<code>" + echapper(chemin) + "</code>" +
      (c.masquer ? '<span class="capture-masquer"><b>À masquer :</b> ' + echapper(c.masquer) + "</span>" : "") +
      "</div>";
    return '<figure class="capture">' +
      '<a href="' + echapper(chemin) + '" target="_blank" rel="noopener" title="Agrandir la capture">' +
      '<img src="' + echapper(chemin) + '" alt="' + echapper(c.legende) + '" data-si-absente="' + echapper(vide) + '"></a>' +
      '<figcaption><span class="libelle">Fig. ' + compteurFigures + "</span> " + formaterLigne(c.legende) + "</figcaption></figure>";
  }

  function situationParId(id) {
    return situationsPubliees().filter(function (s) { return s.id === id; })[0];
  }

  // Compétences (et savoir-faire) validées par une situation, regroupées
  function competencesDeSituation(s) {
    return SITE.competences.map(function (c) {
      var sf = c.savoirFaire.filter(function (x) { return (s.competences || []).indexOf(x.code) !== -1; });
      return { competence: c, savoirFaire: sf };
    }).filter(function (g) { return g.savoirFaire.length; });
  }

  // Carte d'une situation (pages Situations et Compétence)
  function carteSituation(s, filtreCompetence) {
    var codes = (s.competences || []).filter(function (x) { return !filtreCompetence || x.indexOf(filtreCompetence + ".") === 0; });
    return '<article class="carte-situation">' +
      '<div class="switch-haut"><span>' + numeroSituation(s) + "</span><span>" + echapper(s.lieu) + "</span></div>" +
      '<div class="carte-corps"><h3><a href="' + lienSituation(s) + '">' + echapper(s.titre) + "</a></h3>" +
      '<div class="texte">' + formater(s.resume) + "</div>" +
      '<p class="etiquettes">' + etiquetteType(s) + codes.map(function (x) { return '<span class="etiquette">' + echapper(x) + "</span>"; }).join("") + "</p>" +
      '<a class="bouton accent" href="' + lienSituation(s) + '">' + (s.type === "veille" ? "Voir la veille technologique" : "Lire la situation") + ' <span aria-hidden="true">→</span></a></div>' +
      "</article>";
  }

  // ---- Situations (vue d'ensemble) ----
  PAGES.situations = function () {
    var groupes = [
      { type: "pro",   titre: "En entreprise", intro: "Réalisées en alternance au support informatique du groupe Emera." },
      { type: "ecole", titre: "À l'école",       intro: "Réalisées à l'école, en équipe." },
      { type: "perso", titre: "Projets personnels",          intro: "Réalisés seul dans mon homelab, en dehors de l'entreprise." }
    ];
    var html = groupes.map(function (g) {
      var sits = situationsPubliees().filter(function (s) { return s.type === g.type; });
      if (!sits.length) return "";
      return '<section class="section">' +
        '<div class="section-tete"><h2>' + g.titre + '</h2><p class="intro-groupe">' + g.intro + "</p></div>" +
        '<div class="grille-cartes">' + sits.map(function (s) { return carteSituation(s); }).join("") + "</div>" +
        "</section>";
    }).join("");
    return (
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Épreuve E4</p><h1>Situations professionnelles</h1></div>' +
        '<div class="texte"><p>Chaque situation est présentée comme un tutoriel : le contexte, le déroulé étape par étape avec les captures d\'écran, puis la conclusion et les compétences qu\'elle valide.</p></div>' +
      "</section>" + html
    );
  };

  // ---- Situation (page détail, « 6.b ») ----
  PAGES.situation = function () {
    var s = situationParId(new URLSearchParams(location.search).get("id"));
    if (!s) {
      return '<section class="planche section"><h1>Situation introuvable</h1><p>Cette situation n\'existe pas ou n\'est pas encore publiée.</p>' +
        '<p><a class="bouton" href="situations.html">Retour aux situations</a></p></section>';
    }
    document.title = s.titre + " · " + SITE.profil.prenom + " " + SITE.profil.nom;
    var dossier = "images/situations/";
    var type = TYPES[s.type] || { long: s.type };
    var ctx = s.contexte || {};

    var avertissementPerso = s.type === "perso"
      ? '<p class="note-perso"><b>Projet personnel</b> réalisé dans mon homelab, en dehors de l\'entreprise.</p>'
      : "";

    var outils = (s.outils || []).length
      ? '<p class="etiquettes"><span class="libelle">Outils</span>' + s.outils.map(function (o) { return '<span class="etiquette">' + echapper(o) + "</span>"; }).join("") + "</p>"
      : "";

    var contexte = '<dl class="fiche">' +
      "<dt>Mon rôle</dt><dd>" + formaterLigne(ctx.role) + "</dd>" +
      "<dt>Objectif</dt><dd>" + formaterLigne(ctx.objectif) + "</dd>" +
      "<dt>Pourquoi moi</dt><dd>" + formaterLigne(ctx.raison) + "</dd></dl>";

    var etapes = s.etapes || [];
    var sommaire = etapes.length
      ? '<nav class="sommaire" aria-label="Étapes"><p class="libelle">Étapes</p><ol>' +
        etapes.map(function (e, i) { return '<li><a href="#etape-' + (i + 1) + '">' + echapper(e.titre) + "</a></li>"; }).join("") + "</ol></nav>"
      : "";

    var deroule = etapes.map(function (e, i) {
      return '<section class="etape" id="etape-' + (i + 1) + '">' +
        '<h3><span class="etape-num">Étape ' + (i + 1) + "</span> " + echapper(e.titre) + "</h3>" +
        '<div class="texte">' + formater(e.texte) + "</div>" +
        (e.captures || []).map(function (c) { return capture(c, dossier); }).join("") +
        "</section>";
    }).join("");

    var competences = competencesDeSituation(s).map(function (g) {
      return '<li><a href="' + lienCompetence(g.competence) + '"><b>' + echapper(g.competence.code) + "</b> " + echapper(g.competence.titre) + "</a>" +
        "<ul>" + g.savoirFaire.map(function (sf) { return "<li><span class=\"code\">" + echapper(sf.code) + "</span> " + echapper(sf.texte) + "</li>"; }).join("") + "</ul></li>";
    }).join("");

    return (
      filAriane("Situations", "situations.html", numeroSituation(s)) +
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">' + echapper(numeroSituation(s)) + " · " + echapper(type.long) + " · " + echapper(s.lieu) + "</p>" +
        "<h1>" + echapper(s.titre) + "</h1></div>" +
        avertissementPerso + outils +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Contexte</h2></div>' + contexte + "</section>" +
      '<section class="section"><div class="section-tete"><h2>Déroulé</h2></div>' + sommaire + '<div class="etapes">' + deroule + "</div></section>" +
      '<section class="section"><div class="section-tete"><h2>Conclusion</h2></div>' +
        '<div class="texte">' + formater(s.conclusion) + "</div>" +
        '<div class="competences-validees"><p class="libelle">Compétences validées par cette situation</p><ul>' + competences + "</ul></div>" +
      "</section>"
    );
  };

  /* ======================================================================
     VEILLE TECHNOLOGIQUE
     Un thème = un besoin ; un exemple = une solution trouvée pour y répondre.
     ====================================================================== */
  var VERDICTS = {
    "adoptee":     { texte: "Solution adoptée", classe: "verdict-oui" },
    "non-retenue": { texte: "Non retenue",      classe: "verdict-non" },
    "en-etude":    { texte: "En cours d'étude", classe: "verdict-etude" }
  };

  function exemplesPublies() {
    return SITE.exemplesVeille.filter(function (e) { return e.statut === "publie"; });
  }
  function lienExemple(e) { return "veille-exemple.html?id=" + encodeURIComponent(e.id); }
  function badgeVerdict(e) {
    var v = VERDICTS[e.verdict] || { texte: "[À COMPLÉTER : verdict]", classe: "verdict-etude" };
    return '<span class="verdict ' + v.classe + '">' + echapper(v.texte) + "</span>";
  }
  function themeDe(e) {
    return ((SITE.veille && SITE.veille.themes) || []).filter(function (t) { return t.id === e.theme; })[0] || { titre: e.theme, numero: "?" };
  }

  // Semaine type : le créneau de veille est mis en évidence
  function semaineVeille(planning) {
    var jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
    return '<div class="semaine" role="img" aria-label="Créneau de veille : ' + echapper(planning.jour + " à " + planning.heure) + '">' +
      jours.map(function (j) {
        var actif = j === planning.jour;
        return '<div class="jour' + (actif ? " jour-actif" : "") + '"><span class="libelle">' + j.slice(0, 3) + ".</span>" +
          (actif ? '<span class="creneau"><b>' + echapper(planning.heure) + "</b> Veille technologique" + (planning.duree ? "<br>" + formaterLigne(planning.duree) : "") + "</span>" : "") +
          "</div>";
      }).join("") + "</div>";
  }

  PAGES.veille = function () {
    var v = SITE.veille;
    if (!v) return pageEnConstruction("veille");
    var outils = (v.outils || []).map(function (o) {
      return "<dt>" + echapper(o.nom) + "</dt><dd>" + formaterLigne(o.usage) + "</dd>";
    }).join("");

    var themes = (v.themes || []).map(function (t) {
      var exemples = exemplesPublies().filter(function (e) { return e.theme === t.id; });
      if (!exemples.length) return "";
      var cartes = exemples.map(function (e) {
        return '<article class="carte-situation">' +
          '<div class="switch-haut"><span>THÈME ' + t.numero + " · EX. " + e.numero + "</span>" + badgeVerdict(e) + "</div>" +
          '<div class="carte-corps"><h4><a href="' + lienExemple(e) + '">' + echapper(e.titre) + "</a></h4>" +
          '<div class="texte">' + formater(e.resume) + "</div>" +
          '<a class="bouton accent" href="' + lienExemple(e) + '">Voir l\'exemple <span aria-hidden="true">→</span></a></div></article>';
      }).join("");
      return '<section class="theme">' +
        '<div class="section-tete"><p class="libelle">Thème ' + t.numero + (t.cadre ? " · " + echapper(t.cadre) : "") + "</p><h3>" + echapper(t.titre) + "</h3></div>" +
        '<div class="texte">' + formater(t.besoin) + "</div>" +
        '<div class="grille-cartes">' + cartes + "</div></section>";
    }).join("");

    return (
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Développement professionnel · B1.6</p><h1>Veille technologique</h1></div>' +
        '<div class="texte">' + formater(v.definition) + "</div>" +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Planning</h2></div>' +
        semaineVeille(v.planning || {}) +
        '<div class="texte">' + formater(v.methode) + "</div>" +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Mes outils de veille</h2></div><dl class="fiche">' + outils + "</dl></section>" +
      '<section class="section"><div class="section-tete"><h2>Thèmes et exemples</h2></div>' +
        '<div class="texte"><p>Chaque thème part d\'un besoin. Chaque exemple est une solution trouvée pendant ma veille pour y répondre, avec ma conclusion : adoptée ou non, et pourquoi.</p></div>' +
        '<div class="themes">' + themes + "</div></section>"
    );
  };

  PAGES["veille-exemple"] = function () {
    var id = new URLSearchParams(location.search).get("id");
    var e = exemplesPublies().filter(function (x) { return x.id === id; })[0];
    if (!e) {
      return '<section class="planche section"><h1>Exemple introuvable</h1><p>Cet exemple n\'existe pas ou n\'est pas encore publié.</p>' +
        '<p><a class="bouton" href="veille.html">Retour à la veille technologique</a></p></section>';
    }
    document.title = e.titre + " · Veille technologique · " + SITE.profil.prenom + " " + SITE.profil.nom;
    var t = themeDe(e);
    var deroule = (e.deroule || []).map(function (bloc) {
      return '<section class="bloc-veille"><h3>' + echapper(bloc.titre) + "</h3>" +
        '<div class="texte">' + formater(bloc.texte) + "</div>" +
        (bloc.illustrations || []).map(function (c) { return capture(c, "images/veille/"); }).join("") + "</section>";
    }).join("");
    var lie = e.situationLiee ? situationParId(e.situationLiee) : null;
    var lienSit = lie ? '<p><a class="bouton" href="' + lienSituation(lie) + '">Voir la mise en place : ' + echapper(lie.titre) + ' <span aria-hidden="true">→</span></a></p>' : "";

    return (
      filAriane("Veille technologique", "veille.html", "Thème " + t.numero + " · Exemple " + e.numero) +
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Thème ' + t.numero + " · " + echapper(t.titre) + "</p><h1>" + echapper(e.titre) + "</h1></div>" +
        '<p class="etiquettes">' + badgeVerdict(e) + "</p>" +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Contexte</h2></div><div class="texte">' + formater(e.contexte) + "</div></section>" +
      '<section class="section"><div class="section-tete"><h2>Déroulé</h2></div><div class="blocs-veille">' + deroule + "</div></section>" +
      '<section class="section"><div class="section-tete"><h2>Conclusion</h2></div>' +
        '<div class="conclusion-veille">' + badgeVerdict(e) + '<div class="texte">' + formater(e.conclusion) + "</div></div>" + lienSit +
      "</section>"
    );
  };

  /* ======================================================================
     ENTREPRISE, CV, RÉALISATIONS
     ====================================================================== */
  PAGES.entreprise = function () {
    var en = SITE.entreprise;
    if (!en) return pageEnConstruction("entreprise");
    var p = SITE.profil;
    var outils = (en.outils || []).map(function (o) { return '<span class="etiquette">' + echapper(o) + "</span>"; }).join("");
    var missions = (en.missions || []).map(function (m) {
      var sit = m.situation ? situationParId(m.situation) : null;
      return "<li><b>" + echapper(m.titre) + "</b> " + formaterLigne(m.texte) +
        (sit ? ' <a class="puce-lien" href="' + lienSituation(sit) + '">' + numeroSituation(sit) + "</a>" : "") + "</li>";
    }).join("");
    return (
      '<section class="section entreprise-tete">' +
        '<div class="section-tete"><p class="libelle">Entreprise d\'accueil</p><h1>' + echapper(en.nom) + "</h1></div>" +
        '<div class="logo-cadre logo-grand">' + image(p.entreprise.logo, "Logo " + en.nom, "[LOGO À FOURNIR]", "logo-vide") + "</div>" +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Présentation de l\'entreprise</h2></div>' +
        '<div class="texte">' + formater(en.description) + "</div>" +
        '<dl class="fiche">' + (en.fiche || []).map(function (l) { return "<dt>" + echapper(l.libelle) + "</dt><dd>" + formaterLigne(l.valeur) + "</dd>"; }).join("") + "</dl>" +
      "</section>" +
      '<section class="section"><div class="section-tete"><h2>Ma mission</h2></div>' +
        '<div class="texte">' + formater(en.mission) + "</div>" +
        (en.schema ? capture(en.schema, "images/entreprise/") : "") +
        '<div class="section-tete"><h3>Ce que je fais au quotidien</h3></div>' +
        '<ul class="liste-missions">' + missions + "</ul>" +
        '<p class="etiquettes"><span class="libelle">Outils</span>' + outils + "</p>" +
      "</section>"
    );
  };

  PAGES.cv = function () {
    var cv = SITE.profil.cv || {};
    return (
      '<section class="section">' +
        '<div class="section-tete"><p class="libelle">Parcours</p><h1>Curriculum vitæ</h1></div>' +
        '<p><a class="bouton accent" href="' + echapper(cv.pdf) + '" download>Télécharger le CV (PDF) <span aria-hidden="true">↓</span></a></p>' +
        '<figure class="cv-image">' + image(cv.image, "CV d'" + SITE.profil.prenom + " " + SITE.profil.nom, "[CV À FOURNIR : " + cv.image + " et " + cv.pdf + "]", "cv-vide") + "</figure>" +
      "</section>"
    );
  };

  PAGES.realisations = function () {
    var r = SITE.realisations || { message: "", liste: [] };
    var liste = (r.liste || []).filter(function (x) { return x.statut === "publie"; });
    var contenu = liste.length
      ? '<div class="grille-cartes">' + liste.map(function (x) {
          return '<article class="carte-situation"><div class="carte-corps"><h3>' + echapper(x.titre) + '</h3><div class="texte">' + formater(x.description) + "</div></div></article>";
        }).join("") + "</div>"
      : '<div class="planche texte">' + formater(r.message) + "</div>";
    return '<section class="section"><div class="section-tete"><p class="libelle">Épreuve E4</p><h1>Réalisations professionnelles</h1></div>' + contenu + "</section>";
  };

  /* ======================================================================
     VÉRIFICATION (page hors menu) : tout ce qui manque avant l'épreuve
     ====================================================================== */

  // Cherche les « [À COMPLÉTER » dans n'importe quel texte d'un objet
  function chercherACompleter(objet, chemin, resultats) {
    if (typeof objet === "string") {
      var m = objet.match(/\[À COMPLÉTER[^\]]*\]/g);
      if (m) m.forEach(function (x) { resultats.push({ ou: chemin, quoi: x }); });
    } else if (objet && typeof objet === "object") {
      Object.keys(objet).forEach(function (k) { chercherACompleter(objet[k], chemin, resultats); });
    }
    return resultats;
  }

  // Liste de toutes les images attendues par le contenu publié
  function imagesAttendues() {
    var liste = [];
    var p = SITE.profil;
    [p.photo, p.ecole.logo, p.entreprise.logo, p.cv && p.cv.image].forEach(function (src) { if (src) liste.push({ src: src, ou: "profil.js" }); });
    situationsPubliees().forEach(function (s) {
      (s.etapes || []).forEach(function (e) { (e.captures || []).forEach(function (c) { liste.push({ src: "images/situations/" + c.fichier, ou: numeroSituation(s) }); }); });
    });
    exemplesPublies().forEach(function (e) {
      (e.deroule || []).forEach(function (b) { (b.illustrations || []).forEach(function (c) { liste.push({ src: "images/veille/" + c.fichier, ou: "Veille : " + e.titre }); }); });
    });
    if (SITE.entreprise && SITE.entreprise.schema) liste.push({ src: "images/entreprise/" + SITE.entreprise.schema.fichier, ou: "entreprise.js" });
    return liste;
  }

  function ligneEtat(ok, texte) {
    return '<li class="' + (ok ? "etat-ok" : "etat-ko") + '"><span class="etat" aria-hidden="true">' + (ok ? "✔" : "✘") + "</span><span>" + texte + "</span></li>";
  }

  PAGES.verification = function () {
    var sansPreuve = SITE.competences.filter(function (c) { return preuvesCompetence(c).length === 0; });
    var sfNonCouverts = [];
    SITE.competences.forEach(function (c) {
      if (preuvesCompetence(c).length === 0) return;
      c.savoirFaire.forEach(function (sf) { if (!preuvesSavoirFaire(sf.code).length) sfNonCouverts.push(sf); });
    });
    var brouillons = SITE.situations.filter(function (s) { return s.statut !== "publie"; })
      .map(function (s) { return numeroSituation(s) + " · " + s.titre; })
      .concat(SITE.exemplesVeille.filter(function (e) { return e.statut !== "publie"; }).map(function (e) { return "Veille · " + e.titre; }));

    var aCompleter = [];
    chercherACompleter(SITE.profil, "profil.js", aCompleter);
    chercherACompleter(SITE.entreprise, "entreprise.js", aCompleter);
    chercherACompleter(SITE.veille, "veille.js", aCompleter);
    situationsPubliees().forEach(function (s) { chercherACompleter(s, numeroSituation(s) + " " + s.titre, aCompleter); });
    exemplesPublies().forEach(function (e) { chercherACompleter(e, "Veille : " + e.titre, aCompleter); });

    // Situations publiées sans aucune capture : la consigne donne 0
    var sansCapture = situationsPubliees().filter(function (s) {
      return !(s.etapes || []).some(function (e) { return (e.captures || []).length; });
    });

    var images = imagesAttendues();

    function liste(items, vide) {
      return items.length ? "<ul>" + items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : '<p class="tout-bon">' + vide + "</p>";
    }

    var checklist = [
      ligneEtat(!SITE.erreurs.length, "Tous les fichiers de contenu se chargent sans erreur"),
      ligneEtat(!sansPreuve.length, "Toutes les compétences de la grille sont prouvées (" + (SITE.competences.length - sansPreuve.length) + "/" + SITE.competences.length + ")"),
      ligneEtat(!sansCapture.length, "Chaque situation publiée contient des captures"),
      ligneEtat(!aCompleter.length, "Aucun [À COMPLÉTER] restant (" + aCompleter.length + ")"),
      '<li id="etat-images" class="etat-attente"><span class="etat" aria-hidden="true">…</span><span>Vérification des images en cours</span></li>',
      ligneEtat(!!SITE.veille && exemplesPublies().length > 0, "La veille technologique a au moins un exemple publié"),
      ligneEtat(!!(SITE.profil.cv && SITE.profil.cv.pdf), "Un CV en PDF est déclaré")
    ].join("");

    // Les images sont testées après l'affichage (voir verifierImages)
    setTimeout(function () { verifierImages(images); }, 0);

    return (
      '<section class="section"><div class="section-tete"><p class="libelle">Page de contrôle · hors menu</p><h1>Vérification du portfolio</h1></div>' +
        '<div class="texte"><p>Cette page liste automatiquement ce qui manque avant l\'épreuve. Elle n\'apparaît pas dans le menu.</p></div>' +
        '<ul class="checklist">' + checklist + "</ul></section>" +
      afficherErreurs() +
      '<section class="section"><div class="section-tete"><h2>Compétences sans preuve (cachées sur le site)</h2></div>' +
        liste(sansPreuve.map(function (c) { return "<b>" + echapper(c.code) + "</b> " + echapper(c.titre); }), "Toutes les compétences sont prouvées.") + "</section>" +
      '<section class="section"><div class="section-tete"><h2>Savoir-faire pas encore couverts</h2></div>' +
        liste(sfNonCouverts.map(function (sf) { return "<b>" + echapper(sf.code) + "</b> " + echapper(sf.texte); }), "Tous les savoir-faire des compétences affichées sont couverts.") + "</section>" +
      '<section class="section"><div class="section-tete"><h2>Images introuvables</h2></div><div id="images-manquantes"><p>Vérification en cours…</p></div></section>' +
      '<section class="section"><div class="section-tete"><h2>[À COMPLÉTER] restants</h2></div>' +
        liste(aCompleter.map(function (x) { return "<b>" + echapper(x.ou) + "</b> : " + echapper(x.quoi); }), "Rien à compléter.") + "</section>" +
      '<section class="section"><div class="section-tete"><h2>Brouillons (non publiés)</h2></div>' +
        liste(brouillons.map(echapper), "Aucun brouillon.") + "</section>"
    );
  };

  // Teste chaque image attendue et affiche celles qui n'existent pas
  function verifierImages(images) {
    var manquantes = [];
    var restantes = images.length;
    function fin() {
      var zone = el("#images-manquantes");
      var etat = el("#etat-images");
      if (!zone || !etat) return;
      zone.innerHTML = manquantes.length
        ? "<p>" + manquantes.length + " image(s) sur " + images.length + " à fournir :</p><ul>" + manquantes.map(function (m) { return "<li><code>" + echapper(m.src) + "</code> (" + echapper(m.ou) + ")</li>"; }).join("") + "</ul>"
        : '<p class="tout-bon">Toutes les images sont présentes.</p>';
      etat.outerHTML = ligneEtat(!manquantes.length, "Toutes les images sont présentes (" + (images.length - manquantes.length) + "/" + images.length + ")");
    }
    if (!restantes) return fin();
    images.forEach(function (im) {
      var test = new Image();
      test.onload = function () { if (--restantes === 0) fin(); };
      test.onerror = function () { manquantes.push(im); if (--restantes === 0) fin(); };
      test.src = im.src;
    });
  }

  // ---- Pages pas encore construites (remplacées au fil des étapes) ----
  function pageEnConstruction(id) {
    var entree = MENU.filter(function (m) { return m.id === (PAGES_DETAIL[id] || id); })[0];
    return '<section class="en-construction planche"><p class="libelle">En cours de construction</p><h1>' +
      echapper(entree ? entree.titre : id) + "</h1><p>Cette page arrive dans une prochaine étape.</p></section>";
  }

  /* ------------------------------------------------------------------------
     7. DÉMARRAGE
     ------------------------------------------------------------------------ */
  function demarrer() {
    var page = document.body.getAttribute("data-page") || "accueil";
    chargerContenu().then(function () {
      if (!SITE.profil) {
        SITE.erreurs.push({ fichier: "contenu/profil.js", message: "Profil introuvable : la page ne peut pas s'afficher." });
        SITE.profil = { prenom: "", nom: "", ecole: {}, entreprise: {} };
      }
      construireEntete(page);
      var rendu = PAGES[page] ? PAGES[page]() : pageEnConstruction(page);
      el("#contenu").innerHTML = afficherErreurs() + rendu;
      construirePied();
      surveillerImages();
    });
  }

  // Outils mis à disposition des futures pages (et de la page de vérification)
  SITE.outils = {
    formater: formater, formaterLigne: formaterLigne, echapper: echapper, menu: MENU,
    preuvesCompetence: preuvesCompetence, competencesAffichees: competencesAffichees, situationsPubliees: situationsPubliees
  };

  demarrer();
})();
