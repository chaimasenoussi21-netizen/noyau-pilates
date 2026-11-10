/* Noyau — données de démo du CRM, stockées dans le navigateur (localStorage).
   Toutes les personnes, entreprises et coordonnées sont FICTIVES. */
(function () {
  const KEY = "noyau-crm-v2";
  const OFFERS = { essentiel: 390, equipe: 690, entreprise: 1290 };
  const OFFER_NAMES = { essentiel: "Essentiel", equipe: "Équipe", entreprise: "Entreprise" };

  const h = (date, type, note) => ({ date, type, note });
  const c = (id, nom, poste, entreprise, secteur, ville, effectif, source, stage, offre, hist, next) => ({
    id, nom, poste, entreprise, secteur, ville, effectif, source, stage, offre,
    valeur: OFFERS[offre],
    email: nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z ]/g, "").split(" ").join(".") + "@" +
      entreprise.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "") + ".example",
    tel: "06 00 00 " + String(10 + id).padStart(2, "0") + " " + String(40 + id * 2).padStart(2, "0"),
    historique: hist, prochaine: next, creeLe: hist[0].date
  });

  const SEED = [
    c(1, "Claire Morel", "DRH", "Atelier Lumen", "Agence design", "Lyon 2e", 72, "LinkedIn", "gagne", "equipe",
      [h("2026-09-15", "LinkedIn", "Réaction au post « 8 h assis ». Message de prise de contact."), h("2026-09-22", "Appel", "Cadrage 30 min : salle de 35 m², créneaux mardi/jeudi midi."), h("2026-10-01", "Proposition", "Envoi devis Équipe 690 € HT/mois."), h("2026-10-08", "Signature", "Contrat signé, démarrage 3 novembre.")],
      { date: "2026-11-24", label: "Point participation après 3 semaines" }),
    c(2, "Thomas Girard", "Office manager", "Pixel & Fils", "Studio jeu vidéo", "Villeurbanne", 48, "Salon", "gagne", "essentiel",
      [h("2026-09-24", "Salon", "Rencontré au salon RH de Lyon, stand partenaire."), h("2026-10-02", "Démo", "Séance d'essai : 11 participants."), h("2026-10-09", "Signature", "Essentiel signé.")],
      { date: "2026-11-18", label: "Envoyer le kit de communication interne" }),
    c(3, "Inès Haddad", "Head of People", "Kalibre", "Éditeur SaaS", "Paris 10e", 140, "Recommandation", "gagne", "equipe",
      [h("2026-09-10", "Mail", "Recommandée par Claire Morel (Atelier Lumen)."), h("2026-09-18", "Appel", "Besoin : 2 étages, équipe tech très sédentaire."), h("2026-09-30", "Proposition", "Devis Équipe."), h("2026-10-14", "Signature", "Signé après validation CSE.")],
      { date: "2026-12-01", label: "Préparer le questionnaire posture à 6 semaines" }),
    c(4, "Julien Faure", "DRH", "Groupe Orvel", "Cabinet de conseil", "Lyon 6e", 210, "Partenaire", "gagne", "entreprise",
      [h("2026-09-05", "Partenaire", "Lead transmis par le réseau d'ostéopathes partenaire."), h("2026-09-12", "Appel", "Deux bâtiments, 210 salariés, budget QVT 30 k€/an."), h("2026-09-26", "Proposition", "Devis Entreprise 1 290 € HT."), h("2026-10-20", "Signature", "Signé pour 12 mois.")],
      { date: "2026-11-20", label: "Présentation du programme au CSE" }),
    c(5, "Sarah Lemaire", "Responsable RH", "Bleu Carré", "Agence communication", "Paris 3e", 55, "Instagram", "gagne", "essentiel",
      [h("2026-10-03", "Instagram", "DM après le reel « 3 exercices sans quitter sa chaise »."), h("2026-10-10", "Appel", "Équipe créa, envie de tester."), h("2026-10-22", "Signature", "Essentiel signé.")],
      { date: "2026-11-26", label: "Proposer le passage en formule Équipe" }),
    c(6, "Antoine Rey", "CEO", "Datavéa", "Data / IA", "Lyon 7e", 95, "LinkedIn", "proposition", "equipe",
      [h("2026-10-12", "LinkedIn", "Commentaire sur le post du fondateur."), h("2026-10-20", "Appel", "Intéressé, veut un pilote de 3 mois."), h("2026-10-29", "Proposition", "Devis Équipe envoyé.")],
      { date: "2026-11-12", label: "Relance téléphonique sur le devis" }),
    c(7, "Mélanie Brun", "Office manager", "Nexo Légal", "Cabinet d'avocats", "Paris 8e", 65, "Site web", "proposition", "essentiel",
      [h("2026-10-18", "Site web", "Formulaire de contact : « mal de dos généralisé »."), h("2026-10-24", "Appel", "Créneau souhaité : 8 h 30, avant les rendez-vous."), h("2026-11-02", "Proposition", "Devis Essentiel.")],
      { date: "2026-11-13", label: "Envoyer 2 créneaux pour la séance d'essai" }),
    c(8, "Karim Benali", "Head of People", "Fluxo", "Fintech", "Paris 11e", 60, "Salon", "proposition", "equipe",
      [h("2026-10-01", "Salon", "Rencontré au salon Solutions RH."), h("2026-10-15", "Démo", "Séance d'essai : 14 participants, très bon retour."), h("2026-10-28", "Proposition", "Devis Équipe.")],
      { date: "2026-11-14", label: "Répondre à la question sur l'exonération URSSAF" }),
    c(9, "Lucie Perrin", "DRH", "Verso Industrie", "Industrie (siège)", "Vénissieux", 180, "Partenaire", "proposition", "entreprise",
      [h("2026-10-06", "Partenaire", "Introduite par la mutuelle partenaire (programme prévention)."), h("2026-10-21", "Visite", "Visite du site : salle de pause de 50 m²."), h("2026-11-04", "Proposition", "Devis Entreprise.")],
      { date: "2026-11-19", label: "Rendez-vous avec le directeur de site" }),
    c(10, "Hugo Martins", "Responsable QVT", "Opalia Santé", "Mutuelle régionale", "Lyon 3e", 120, "LinkedIn", "contacte", "equipe",
      [h("2026-10-25", "LinkedIn", "Invitation acceptée après le carrousel « coût du mal de dos »."), h("2026-11-03", "Mail", "Envoi de la plaquette.")],
      { date: "2026-11-12", label: "Appel de découverte" }),
    c(11, "Camille Robin", "Office manager", "Studio Hublot", "Architecture", "Lyon 1er", 28, "Instagram", "contacte", "essentiel",
      [h("2026-10-30", "Instagram", "Commentaire sur le post « avant / après posture »."), h("2026-11-05", "Appel", "Message vocal laissé.")],
      { date: "2026-11-13", label: "Rappeler en fin de matinée" }),
    c(12, "Nicolas Dumas", "COO", "Trajecto", "Logistique (bureaux)", "Saint-Priest", 150, "Site web", "contacte", "equipe",
      [h("2026-11-01", "Site web", "Achat simulé abandonné à l'étape 2."), h("2026-11-04", "Mail", "Relance avec cas client.")],
      { date: "2026-11-15", label: "Proposer une séance d'essai" }),
    c(13, "Emma Lefèvre", "Talent manager", "Hoplà", "Marketplace", "Paris 2e", 85, "Partenaire", "contacte", "equipe",
      [h("2026-11-02", "Partenaire", "Lead issu du webinar co-organisé avec un média RH."), h("2026-11-06", "Mail", "Envoi du replay + grille tarifaire.")],
      { date: "2026-11-17", label: "Appel de découverte" }),
    c(14, "Yanis Cherif", "Fondateur", "Ondine Bio", "Cosmétique", "Lyon 9e", 35, "Instagram", "contacte", "essentiel",
      [h("2026-11-03", "Instagram", "DM : « vous venez aussi à Vaise ? »."), h("2026-11-07", "Instagram", "Réponse : oui, zone couverte.")],
      { date: "2026-11-16", label: "Envoyer le devis Essentiel" }),
    c(15, "Pauline Garnier", "DRH", "Mercure Assurances", "Courtage", "Paris 9e", 230, "LinkedIn", "nouveau", "entreprise",
      [h("2026-11-08", "LinkedIn", "A téléchargé le guide « Exonération sport en entreprise ».")],
      { date: "2026-11-12", label: "Premier message LinkedIn personnalisé" }),
    c(16, "Romain Blanc", "Office manager", "Cobalt Studio", "Production vidéo", "Paris 20e", 22, "Site web", "nouveau", "essentiel",
      [h("2026-11-08", "Site web", "Formulaire de contact.")],
      { date: "2026-11-12", label: "Rappeler sous 24 h" }),
    c(17, "Léa Fontaine", "Responsable RH", "Alto Énergie", "Énergie (bureaux)", "Lyon 3e", 110, "Salon", "nouveau", "equipe",
      [h("2026-11-06", "Salon", "Carte récupérée au salon RH.")],
      { date: "2026-11-13", label: "Mail de suivi salon" }),
    c(18, "Mathis Roux", "CEO", "Brickly", "PropTech", "Paris 10e", 40, "Recommandation", "nouveau", "essentiel",
      [h("2026-11-09", "Mail", "Recommandé par Inès Haddad (Kalibre).")],
      { date: "2026-11-12", label: "Appel de découverte" }),
    c(19, "Chloé Mercier", "People partner", "Quadra Audit", "Audit", "Lyon 2e", 160, "Partenaire", "nouveau", "equipe",
      [h("2026-11-09", "Partenaire", "Lead transmis par l'espace de coworking partenaire.")],
      { date: "2026-11-14", label: "Qualifier le besoin" }),
    c(20, "Bastien Noël", "Office manager", "Lumio", "E-commerce", "Villeurbanne", 50, "Instagram", "perdu", "essentiel",
      [h("2026-09-20", "Instagram", "DM entrant."), h("2026-09-28", "Proposition", "Devis Essentiel."), h("2026-10-15", "Perdu", "A choisi un abonnement salle de sport multi-sites.")],
      { date: "2027-03-01", label: "Recontacter au renouvellement" }),
    c(21, "Sophie Caron", "DRH", "Helix Pharma", "Pharma (siège)", "Lyon 7e", 260, "LinkedIn", "perdu", "entreprise",
      [h("2026-09-08", "LinkedIn", "Prise de contact."), h("2026-09-25", "Proposition", "Devis Entreprise."), h("2026-10-12", "Perdu", "Budget QVT 2026 déjà engagé.")],
      { date: "2027-01-10", label: "Relancer pour le budget 2027" }),
    c(22, "Adrien Petit", "COO", "Tandem RH", "Cabinet de recrutement", "Paris 17e", 30, "Salon", "perdu", "essentiel",
      [h("2026-10-01", "Salon", "Rencontre salon."), h("2026-10-19", "Perdu", "Pas de salle disponible dans les locaux.")],
      { date: "2027-02-01", label: "Recontacter après le déménagement" })
  ];

  // Contacts intéressés par un événement (fictifs)
  SEED[16].evenement = "Semaine de la QVT (2 490 € HT)";
  SEED[16].historique.push(h("2026-11-09", "Mail", "Souhaite une semaine de la QVT en mars 2027 avant de choisir un abonnement."));
  SEED[16].prochaine = { date: "2026-11-13", label: "Envoyer le devis Semaine de la QVT" };
  SEED[12].evenement = "Pilates & brunch (1 190 € HT)";
  SEED[12].historique.push(h("2026-11-08", "Appel", "Séminaire d'équipe prévu en janvier : intéressée par le format Pilates & brunch."));

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { contacts: JSON.parse(JSON.stringify(SEED)), nextId: SEED.length + 1 };
  }
  function save(db) { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  const today = () => new Date().toISOString().slice(0, 10);
  const plusDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

  window.NoyauStore = {
    OFFERS, OFFER_NAMES,
    STAGES: [["nouveau", "Nouveau"], ["contacte", "Contacté"], ["proposition", "Proposition envoyée"], ["gagne", "Gagné"], ["perdu", "Perdu"]],
    all() { return load().contacts; },
    get(id) { return load().contacts.find(x => x.id === id); },
    update(id, patch) {
      const db = load(); const i = db.contacts.findIndex(x => x.id === id);
      if (i < 0) return; db.contacts[i] = Object.assign(db.contacts[i], patch); save(db); return db.contacts[i];
    },
    addNote(id, type, note) {
      const db = load(); const ct = db.contacts.find(x => x.id === id); if (!ct) return;
      ct.historique.push(h(today(), type, note)); save(db);
    },
    reset() { try { localStorage.removeItem(KEY); } catch (e) {} },
    addLead(d) {
      const db = load(); const id = db.nextId++;
      const offre = d.effectif === "20 à 50" ? "essentiel" : d.effectif === "200 et plus" ? "entreprise" : "equipe";
      db.contacts.unshift({ id, nom: d.nom || "Contact sans nom", poste: "Non renseigné", entreprise: d.entreprise || "Entreprise",
        secteur: "À qualifier", ville: "Non renseignée", effectif: d.effectif, source: "Site web", stage: "nouveau", offre,
        valeur: OFFERS[offre], email: d.email, tel: "Non renseigné",
        historique: [h(today(), "Site web", (d.evenement ? "Demande d'événement : " + d.evenement : "Formulaire de contact") + (d.message ? " · « " + d.message + " »" : "."))],
        prochaine: { date: plusDays(1), label: d.evenement ? "Envoyer le devis événement et proposer des dates" : "Rappeler sous 24 h" },
        creeLe: today(), evenement: d.evenement || "" });
      save(db); return id;
    },
    addOrder(o) {
      const db = load(); const id = db.nextId++;
      db.contacts.unshift({ id, nom: o.nom, poste: o.poste || "Non renseigné", entreprise: o.entreprise, secteur: "À qualifier",
        ville: o.ville, effectif: o.effectif, source: "Site web", stage: "gagne", offre: o.offre, valeur: OFFERS[o.offre],
        email: o.email, tel: o.tel || "Non renseigné",
        historique: [h(today(), "Commande en ligne", `Commande ${o.ref} : formule ${OFFER_NAMES[o.offre]}, ${OFFERS[o.offre]} € HT/mois, démarrage souhaité le ${o.debut}. Paiement simulé.`)],
        prochaine: { date: plusDays(2), label: "Appel de cadrage (salle, créneaux)" }, creeLe: today(), commande: o.ref });
      save(db); return id;
    }
  };
})();
