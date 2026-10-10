const root = document.documentElement;
try { if (localStorage.getItem('stphe-theme') === 'light') root.classList.add('light'); } catch {}
document.querySelector('#theme').addEventListener('click', () => {
    root.classList.toggle('light');
    try { localStorage.setItem('stphe-theme', root.classList.contains('light') ? 'light' : 'dark'); } catch {}
});
const menu = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(navigation.classList.toggle('open'))));
navigation.addEventListener('click', event => {
    if (event.target.closest('a')) {
        navigation.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
    }
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        navigation.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
    }
});
let index;
const search = document.querySelector('#search');
const results = document.querySelector('#results');
search.addEventListener('input', async () => {
    const query = search.value.trim().toLowerCase();
    results.replaceChildren();
    if (!query) return;
    try {
        index ??= await fetch('search-index.json', { cache: 'no-cache' }).then(response => {
            if (!response.ok) throw Error('Search index unavailable');
            return response.json();
        });
        if (search.value.trim().toLowerCase() !== query) return;
        // All words, in any order: "import tags" and "tags import" both work.
        const terms = query.match(/[\p{L}\p{N}]+/gu) || [query];
        const hits = index.filter(page => terms.every(term => (page.title + ' ' + page.text).toLowerCase().includes(term)));
        const score = page => terms.reduce((total, term) => total
            + (page.title.toLowerCase().includes(term) ? 1 : 0)
            + ((page.title.split(' · ')[1] || '').toLowerCase().includes(term) ? 3 : 0), 0);
        hits.sort((a, b) => score(b) - score(a));
        const summary = document.createElement('p');
        summary.textContent = hits.length ? hits.length + ' matching sections' : 'No matching sections. Try a feature name.';
        results.append(summary);
        for (const hit of hits) {
            const link = document.createElement('a');
            link.href = hit.url;
            link.textContent = hit.title;
            results.append(link);
        }
    } catch {
        if (search.value.trim().toLowerCase() === query) results.textContent = 'Search is unavailable. Use the guide links below.';
    }
});
for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
        const address = document.getElementById(button.dataset.copy).textContent;
        const status = document.querySelector('#copy-status');
        try {
            await navigator.clipboard.writeText(address);
            status.textContent = 'Address copied.';
        } catch {
            status.textContent = 'Copy unavailable. Select and copy the address above.';
        }
    });
}
