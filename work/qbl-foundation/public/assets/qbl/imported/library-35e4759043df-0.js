const crops = [
      { name: 'Tomatoes', url: 'what-to-grow-near-tomatoes.html', status: 'ready', terms: ['tomato', 'tomatoes'] },
      { name: 'Cucumbers', url: 'what-to-grow-near-cucumbers.html', status: 'ready', terms: ['cucumber', 'cucumbers'] },
      { name: 'Peppers', url: 'what-to-grow-near-peppers.html', status: 'ready', terms: ['pepper', 'peppers'] },
      { name: 'Lettuce', url: 'what-to-grow-near-lettuce.html', status: 'ready', terms: ['lettuce'] },
      { name: 'Kale', url: 'what-to-grow-near-kale.html', status: 'ready', terms: ['kale'] },
      { name: 'Green Beans', url: 'what-to-grow-near-green-beans.html', status: 'ready', terms: ['green bean', 'green beans', 'beans', 'bean'] },
      { name: 'Squash or Zucchini', url: 'what-to-grow-near-squash.html', status: 'ready', terms: ['squash', 'zucchini'] },
      { name: 'Strawberries', url: 'what-to-grow-near-strawberries.html', status: 'ready', terms: ['strawberry', 'strawberries'] },
      { name: 'Carrots', url: 'what-to-grow-near-carrots.html', status: 'ready', terms: ['carrot', 'carrots'] },
      { name: 'Cabbage Family Crops', url: 'what-to-grow-near-cabbage-family-crops.html', status: 'ready', terms: ['cabbage', 'broccoli', 'cauliflower', 'brassicas'] },
      { name: 'Peas', url: 'what-to-grow-near-peas.html', status: 'ready', terms: ['pea', 'peas'] },
      { name: 'Broccoli', url: 'what-to-grow-near-broccoli.html', status: 'ready', terms: ['broccoli'] },
      { name: 'Potatoes', url: 'what-to-grow-near-potatoes.html', status: 'ready', terms: ['potato', 'potatoes'] },
      { name: 'Cauliflower', url: 'what-to-grow-near-cauliflower.html', status: 'ready', terms: ['cauliflower'] },
      { name: 'Artichokes', url: 'what-to-grow-near-artichokes.html', status: 'ready', terms: ['artichoke', 'artichokes'] },
      { name: 'Arugula', url: 'what-to-grow-near-arugula.html', status: 'ready', terms: ['arugula'] },
      { name: 'Asparagus', url: 'what-to-grow-near-asparagus.html', status: 'ready', terms: ['asparagus'] },
      { name: 'Beets', url: 'what-to-grow-near-beets.html', status: 'ready', terms: ['beet', 'beets'] },
      { name: 'Brussels Sprouts', url: 'what-to-grow-near-brussels-sprouts.html', status: 'ready', terms: ['brussels sprouts', 'brussels sprout'] },
      { name: 'Cabbage', url: 'what-to-grow-near-cabbage.html', status: 'ready', terms: ['cabbage'] },
      { name: 'Celery', url: 'what-to-grow-near-celery.html', status: 'ready', terms: ['celery'] },
      { name: 'Swiss Chard', url: 'what-to-grow-near-swiss-chard.html', status: 'ready', terms: ['swiss chard', 'chard'] },
      { name: 'Chili Peppers', url: 'what-to-grow-near-chili-peppers.html', status: 'ready', terms: ['chili pepper', 'chili peppers', 'hot pepper', 'hot peppers'] },
      { name: 'Corn', url: 'what-to-grow-near-corn.html', status: 'ready', terms: ['corn'] },
      { name: 'Eggplant', url: 'what-to-grow-near-eggplant.html', status: 'ready', terms: ['eggplant', 'eggplants'] },
      { name: 'Garlic', url: 'what-to-grow-near-garlic.html', status: 'ready', terms: ['garlic'] },
      { name: 'Endive', url: 'what-to-grow-near-endive.html', status: 'ready', terms: ['endive'] },
      { name: 'Okra', url: 'what-to-grow-near-okra.html', status: 'ready', terms: ['okra'] },
      { name: 'Rutabaga', url: 'what-to-grow-near-rutabaga.html', status: 'ready', terms: ['rutabaga', 'rutabagas'] },
      { name: 'Shallots', url: 'what-to-grow-near-shallots.html', status: 'ready', terms: ['shallot', 'shallots'] },
      { name: 'Onions', url: 'what-to-grow-near-onions.html', status: 'ready', terms: ['onion', 'onions'] },
      { name: 'Radishes', url: 'what-to-grow-near-radishes.html', status: 'ready', terms: ['radish', 'radishes'] },
      { name: 'Spinach', url: 'what-to-grow-near-spinach.html', status: 'ready', terms: ['spinach'] },
      { name: 'Zucchini', url: 'what-to-grow-near-zucchini.html', status: 'ready', terms: ['zucchini'] },
      { name: 'Pumpkins', url: 'what-to-grow-near-pumpkins.html', status: 'ready', terms: ['pumpkin', 'pumpkins'] },
      { name: 'Leeks', url: 'what-to-grow-near-leeks.html', status: 'ready', terms: ['leek', 'leeks'] },
      { name: 'Turnips', url: 'what-to-grow-near-turnips.html', status: 'ready', terms: ['turnip', 'turnips'] },
      { name: 'Parsnips', url: 'what-to-grow-near-parsnips.html', status: 'ready', terms: ['parsnip', 'parsnips'] },
      { name: 'Collards', url: 'what-to-grow-near-collards.html', status: 'ready', terms: ['collard', 'collards'] },
      { name: 'Mustard Greens', url: 'what-to-grow-near-mustard-greens.html', status: 'ready', terms: ['mustard greens', 'mustard green'] },
      { name: 'Bok Choy', url: 'what-to-grow-near-bok-choy.html', status: 'ready', terms: ['bok choy', 'pak choi'] },
      { name: 'Scallions', url: 'what-to-grow-near-scallions.html', status: 'ready', terms: ['scallion', 'scallions', 'green onion', 'green onions'] },
      { name: 'Fennel', url: 'what-to-grow-near-fennel.html', status: 'ready', terms: ['fennel'] },
      { name: 'Sorrel', url: 'what-to-grow-near-sorrel.html', status: 'ready', terms: ['sorrel'] },
      { name: 'Watermelon', url: 'what-to-grow-near-watermelon.html', status: 'ready', terms: ['watermelon', 'watermelons'] },
      { name: 'Cantaloupe', url: 'what-to-grow-near-cantaloupe.html', status: 'ready', terms: ['cantaloupe', 'muskmelon'] },
      { name: 'Winter Squash', url: 'what-to-grow-near-winter-squash.html', status: 'ready', terms: ['winter squash'] },
      { name: 'Summer Squash', url: 'what-to-grow-near-summer-squash.html', status: 'ready', terms: ['summer squash'] },
      { name: 'Sweet Potatoes', url: 'what-to-grow-near-sweet-potatoes.html', status: 'ready', terms: ['sweet potato', 'sweet potatoes'] },
      { name: 'Tomatillos', url: 'what-to-grow-near-tomatillos.html', status: 'ready', terms: ['tomatillo', 'tomatillos'] },
      { name: 'Ground Cherries', url: 'what-to-grow-near-ground-cherries.html', status: 'ready', terms: ['ground cherry', 'ground cherries'] },
      { name: 'Kohlrabi', url: 'what-to-grow-near-kohlrabi.html', status: 'ready', terms: ['kohlrabi'] },
      { name: 'Romanesco', url: 'what-to-grow-near-romanesco.html', status: 'ready', terms: ['romanesco'] },
      { name: 'Celeriac', url: 'what-to-grow-near-celeriac.html', status: 'ready', terms: ['celeriac'] },
      { name: 'Tatsoi', url: 'what-to-grow-near-tatsoi.html', status: 'ready', terms: ['tatsoi'] },
      { name: 'Mizuna', url: 'what-to-grow-near-mizuna.html', status: 'ready', terms: ['mizuna'] },
      { name: 'Cress', url: 'what-to-grow-near-cress.html', status: 'ready', terms: ['cress'] },
      { name: 'Microgreens', url: 'what-to-grow-near-microgreens.html', status: 'ready', terms: ['microgreen', 'microgreens'] },
      { name: 'Chickpeas', url: 'what-to-grow-near-chickpeas.html', status: 'ready', terms: ['chickpea', 'chickpeas', 'garbanzo', 'garbanzos'] },
      { name: 'Edamame', url: 'what-to-grow-near-edamame.html', status: 'ready', terms: ['edamame'] },
      { name: 'Lima Beans', url: 'what-to-grow-near-lima-beans.html', status: 'ready', terms: ['lima bean', 'lima beans'] },
      { name: 'Jicama', url: 'what-to-grow-near-jicama.html', status: 'ready', terms: ['jicama'] },
      { name: 'Salsify', url: 'what-to-grow-near-salsify.html', status: 'ready', terms: ['salsify'] }
    ];

    const form = document.getElementById('cropFinderForm');
    const input = document.getElementById('cropFinder');
    const results = document.getElementById('finderResults');
    const note = document.getElementById('finderNote');

    function render(matches) {
      results.innerHTML = '';
      if (!matches.length) {
        note.textContent = 'No close match yet. Try tomatoes, cucumbers, peppers, lettuce, kale, beans, squash, strawberries, carrots, or cabbage.';
        return;
      }
      note.textContent = matches.length === 1 ? 'Here is the closest match so far.' : 'Here are the closest matches so far.';
      matches.forEach(crop => {
        const el = document.createElement(crop.url === '#' ? 'button' : 'a');
        el.textContent = crop.url === '#' ? `${crop.name} (${crop.status})` : crop.name;
        if (crop.url !== '#') el.href = crop.url;
        else el.type = 'button';
        results.appendChild(el);
      });
    }

    function quickPick(term) {
      input.value = term;
      const q = term.trim().toLowerCase();
      const matches = crops.filter(c => c.terms.some(t => t.includes(q) || q.includes(t)) || c.name.toLowerCase().includes(q));
      render(matches);
    }

    function getMatches(q) {
      return crops.filter(c => c.terms.some(t => t.includes(q) || q.includes(t)) || c.name.toLowerCase().includes(q));
    }

    function goToBestMatch() {
      const q = input.value.trim().toLowerCase();
      if (!q) return;
      const matches = getMatches(q);
      render(matches);
      if (!matches.length) return;
      const first = matches[0];
      if (first.url && first.url !== '#') {
        window.location.href = first.url;
      }
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.innerHTML = '';
        note.textContent = 'Start typing a vegetable name to see matching pages.';
        return;
      }
      render(getMatches(q));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      goToBestMatch();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        goToBestMatch();
      }
    });