export const projects = [
  {
    id: 'iryse',
    title: 'Iryse',
    year: '2024—',
    status: { en: 'Live', it: 'Online' },
    location: 'Rome, IT',
    description: {
      en: 'A multiservice single-page application for a company based in Rome. Built end to end, including an advanced admin dashboard covering every page on the site and internal tools that support the company\'s day-to-day operations.',
      it: 'Una single-page application multiservizio per un\'azienda di Roma. Realizzata dall\'inizio alla fine, incluso un pannello di amministrazione avanzato che copre ogni pagina del sito e strumenti interni a supporto delle operazioni quotidiane dell\'azienda.',
    },
    tags: ['React', 'Landing page', 'Admin Dashboard'],
    link: '',
    preview: '/previews/placeholder.svg',
    caseStudy: {
      role: { en: 'Solo developer', it: 'Sviluppatore unico' },
      timeline: { en: '2024 — ongoing', it: '2024 — in corso' },
      sections: [
        {
          heading: { en: 'The brief', it: 'La richiesta' },
          body: {
            en: 'A Rome-based company needed one system to replace several disconnected tools — customer-facing pages, internal record-keeping, and day-to-day admin tasks were all living in different places.',
            it: 'Un\'azienda romana aveva bisogno di un unico sistema per sostituire diversi strumenti scollegati tra loro — pagine rivolte ai clienti, archiviazione interna e attività amministrative quotidiane vivevano tutte in luoghi diversi.',
          },
        },
        {
          heading: { en: 'What I built', it: 'Cosa ho realizzato' },
          body: {
            en: 'A single React application covering both the public site and a full admin dashboard, with role-based views so staff only see the tools relevant to their job. Every page in the admin panel was designed and built from scratch to match how the team actually works.',
            it: 'Un\'unica applicazione React che copre sia il sito pubblico sia una dashboard di amministrazione completa, con viste basate sul ruolo in modo che lo staff veda solo gli strumenti utili al proprio lavoro. Ogni pagina del pannello è stata progettata e costruita da zero per adattarsi al modo di lavorare reale del team.',
          },
        },
        {
          heading: { en: 'Result', it: 'Risultato' },
          body: {
            en: 'The company now runs its daily operations from one internal tool instead of several, with the public-facing side kept in perfect sync since they share the same codebase.',
            it: 'L\'azienda oggi gestisce le operazioni quotidiane da un unico strumento interno invece di diversi, con la parte pubblica sempre perfettamente sincronizzata perché condivide la stessa base di codice.',
          },
        },
      ],
    },
  },
  {
    id: 'molise-festival',
    title: 'Molise Festival',
    year: '2026',
    status: { en: 'Launching September', it: 'Online a settembre' },
    location: 'Molise, IT',
    description: {
      en: 'The website for a festival taking place in Molise this September. Designed and built solo, front to back — vanilla HTML, CSS and JavaScript on the client, with a Node.js server. The background is a live Game of Life automaton, the same idea that runs behind this site.',
      it: 'Il sito di un festival che si terrà in Molise a settembre. Progettato e sviluppato in autonomia, dal front-end al back-end — HTML, CSS e JavaScript vanilla lato client, con un server Node.js. Lo sfondo è un automa Game of Life dal vivo, la stessa idea che anima questo sito.',
    },
    tags: ['Vanilla JS', 'Node.js', 'Game of Life'],
    link: '',
    preview: '/previews/placeholder.png',
    caseStudy: {
      role: { en: 'Solo developer & designer', it: 'Sviluppatore e designer unico' },
      timeline: { en: 'Launching September 2026', it: 'Online da settembre 2026' },
      sections: [
        {
          heading: { en: 'The brief', it: 'La richiesta' },
          body: {
            en: 'A festival taking place in Molise this September needed a site that felt alive and a little unconventional — not another templated event page with a countdown and a lineup grid.',
            it: 'Un festival in programma in Molise a settembre aveva bisogno di un sito che risultasse vivo e un po\' fuori dagli schemi — non l\'ennesima pagina evento con countdown e griglia della lineup.',
          },
        },
        {
          heading: { en: 'What I built', it: 'Cosa ho realizzato' },
          body: {
            en: 'A vanilla HTML/CSS/JS front end backed by a small Node.js server, with a live Game of Life automaton running behind the content — the same dithering technique used on this portfolio, adapted for the festival\'s own palette.',
            it: 'Un front-end in HTML/CSS/JS vanilla appoggiato a un piccolo server Node.js, con un automa Game of Life dal vivo che scorre dietro ai contenuti — la stessa tecnica di retinatura usata in questo portfolio, adattata alla palette del festival.',
          },
        },
      ],
    },
  },
]
