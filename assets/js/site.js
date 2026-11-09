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
      function remplacer() { img.outerHTML = img.getAttribute("data-si-absente"); }
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
    ecole: { court: "Pédagogique",  long: "Situation pédagogique" }
  };

  function situationsPubliees() {
    return SITE.situations.filter(function (s) { return s.statut === "publie"; });
  }

  function lienSituation(s) { return "situation.html?id=" + encodeURIComponent(s.id); }
  function lienCompetence(c) { return "competence.html?id=" + encodeURIComponent(c.code); }

  // Situations publiées qui valident ce savoir-faire précis (ex. "B1.1.1")
  function preuvesSavoirFaire(code) {
    return situationsPubliees().filter(function (s) { return (s.competences || []).indexOf(code) !== -1; });
  }

  // Situations publiées qui valident au moins un savoir-faire de la compétence
  function preuvesCompetence(c) {
    var codes = c.savoirFaire.map(function (sf) { return sf.code; });
    return situationsPubliees().filter(function (s) {
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

  function numeroSituation(s) { return "SIT-" + String(s.numero).padStart(2, "0"); }

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
    var sits = situationsPubliees();
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

    var cartes = preuves.map(function (s) {
      var codes = (s.competences || []).filter(function (x) { return x.indexOf(c.code + ".") === 0; });
      return '<article class="carte-situation">' +
        '<div class="switch-haut"><span>' + numeroSituation(s) + "</span><span>" + echapper(s.lieu) + "</span></div>" +
        '<div class="carte-corps"><h3><a href="' + lienSituation(s) + '">' + echapper(s.titre) + "</a></h3>" +
        '<div class="texte">' + formater(s.resume) + "</div>" +
        '<p class="etiquettes">' + etiquetteType(s) + codes.map(function (x) { return '<span class="etiquette">' + echapper(x) + "</span>"; }).join("") + "</p>" +
        '<a class="bouton accent" href="' + lienSituation(s) + '">Lire la situation <span aria-hidden="true">→</span></a></div>' +
        "</article>";
    }).join("");

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
