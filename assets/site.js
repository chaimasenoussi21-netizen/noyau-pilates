/* Noyau — éléments communs (navigation, pied de page, offres) */
window.NOYAU_OFFERS = {
  essentiel: { id: "essentiel", name: "Essentiel", price: 390, sessions: "1 séance / semaine", perMonth: 4,
    pitch: "Pour lancer une première habitude dans une équipe de 20 à 60 personnes." },
  equipe: { id: "equipe", name: "Équipe", price: 690, sessions: "2 séances / semaine", perMonth: 8,
    pitch: "Le format le plus choisi : régulier, mesurable, adapté aux équipes de 50 à 200 personnes." },
  entreprise: { id: "entreprise", name: "Entreprise", price: 1290, sessions: "4 séances / semaine", perMonth: 16,
    pitch: "Pour les sites de plus de 150 salariés ou plusieurs étages / bâtiments." }
};

(function () {
  const page = document.body.dataset.page || "";
  const I = {
    vente: '<path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    crm: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.5M18 19a5 5 0 0 0-2.5-4.3"/>',
    strategie: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    communication: '<path d="M4 10v4l11 5V5L4 10Z"/><path d="M15 9a3 3 0 0 1 0 6M7 15l1 5h3"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
  const links = [
    ["index.html", "Offre", "vente", "Ce que voit le client"],
    ["crm.html", "CRM", "crm", "Suivi des prospects"],
    ["strategie.html", "Stratégie", "strategie", "Pourquoi ce produit"],
    ["communication.html", "Communication", "communication", "Comment le vendre"]
  ];
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header side";
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="Noyau, accueil">
        <img src="assets/logo-light.svg" alt="" width="38" height="38">
        <span>Noyau<small>Pilates en entreprise</small></span>
      </a>
      <nav class="side-nav" aria-label="Les 4 espaces">
        <span class="side-label">Les 4 espaces</span>
        ${links.map(([href, label, key, sub], i) =>
          `<a href="${href}" class="${page === key ? "active" : ""}" ${page === key ? 'aria-current="page"' : ""}>
            <span class="n">0${i + 1}</span><span class="t">${label}<small>${sub}</small></span></a>`).join("")}
      </nav>
      <div class="side-foot">
        <a href="commander.html" class="btn btn-primary">Réserver</a>
        <p>Lyon · Paris<br>Séances de 45 min dans vos locaux</p>
      </div>`;
    const tab = document.createElement("nav");
    tab.className = "tabbar";
    tab.setAttribute("aria-label", "Navigation mobile");
    tab.innerHTML = links.map(([href, label, key]) =>
      `<a href="${href}" class="${page === key ? "active" : ""}">${icon(key)}<span>${label}</span></a>`).join("");
    document.body.appendChild(tab);
  }
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <div class="brand" style="color:#fff"><img src="assets/logo-light.svg" alt="" width="30" height="30"> Noyau</div>
            <p style="margin-top:12px;max-width:420px">Le studio de Pilates qui vient au bureau. Séances de 45 minutes dans vos locaux, à Lyon et Paris, pour des équipes qui passent leurs journées assises.</p>
          </div>
          <div>
            <strong style="color:#fff">Les 4 espaces</strong><br>
            <a href="index.html">Offre & achat</a><br>
            <a href="crm.html">CRM interne</a><br>
            <a href="strategie.html">Dossier stratégique</a><br>
            <a href="communication.html">Plan de communication</a>
          </div>
          <div>
            <strong style="color:#fff">Contact (démo)</strong><br>
            bonjour@noyau-demo.fr<br>
            04 00 00 00 00<br>
            Lyon 2e · Paris 11e
          </div>
        </div>
        <div class="legal">Projet étudiant INSEEC, démo sans vente réelle. Aucun paiement n'est encaissé, toutes les coordonnées, entreprises clientes et témoignages présents sur ce site sont fictifs. Les marques citées (concurrents, partenaires visés) n'ont aucun lien avec ce projet. Photos : Unsplash (licence libre), personnes non liées à Noyau.</div>
      </div>`;
  }
})();

/* Apparition douce des blocs au défilement */
(function () {
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js-reveal");
  const els = document.querySelectorAll("main h2, main .card, main .plan, main .post, main .gallery figure, main .photo-tilt, main .stack, main .timeline-min li, main details, main .table-wrap");
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
})();
