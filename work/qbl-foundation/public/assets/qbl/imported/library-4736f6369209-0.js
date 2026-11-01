const protectCrops = [
      { name: 'Tomatoes', url: 'what-to-grow-near-tomatoes.html#protect-my-veggie', terms: ['tomato', 'tomatoes'] },
      { name: 'Cucumbers', url: 'what-to-grow-near-cucumbers.html#protect-my-veggie', terms: ['cucumber', 'cucumbers'] },
      { name: 'Peppers', url: 'what-to-grow-near-peppers.html#protect-my-veggie', terms: ['pepper', 'peppers'] },
      { name: 'Lettuce', url: 'what-to-grow-near-lettuce.html#protect-my-veggie', terms: ['lettuce'] },
      { name: 'Kale', url: 'what-to-grow-near-kale.html#protect-my-veggie', terms: ['kale'] },
      { name: 'Green Beans', url: 'what-to-grow-near-green-beans.html#protect-my-veggie', terms: ['green bean', 'green beans', 'beans', 'bean'] },
      { name: 'Squash or Zucchini', url: 'what-to-grow-near-squash.html#protect-my-veggie', terms: ['squash', 'zucchini'] },
      { name: 'Strawberries', url: 'what-to-grow-near-strawberries.html#protect-my-veggie', terms: ['strawberry', 'strawberries'] },
      { name: 'Carrots', url: 'what-to-grow-near-carrots.html#protect-my-veggie', terms: ['carrot', 'carrots'] },
      { name: 'Cabbage Family Crops', url: 'what-to-grow-near-cabbage-family-crops.html#protect-my-veggie', terms: ['cabbage', 'broccoli', 'cauliflower', 'brassicas'] },
      { name: 'Peas', url: 'what-to-grow-near-peas.html#protect-my-veggie', terms: ['pea', 'peas'] },
      { name: 'Broccoli', url: 'what-to-grow-near-broccoli.html#protect-my-veggie', terms: ['broccoli'] },
      { name: 'Potatoes', url: 'what-to-grow-near-potatoes.html#protect-my-veggie', terms: ['potato', 'potatoes'] },
      { name: 'Cauliflower', url: 'what-to-grow-near-cauliflower.html#protect-my-veggie', terms: ['cauliflower'] },
      { name: 'Artichokes', url: 'what-to-grow-near-artichokes.html#protect-my-veggie', terms: ['artichoke', 'artichokes'] },
      { name: 'Arugula', url: 'what-to-grow-near-arugula.html#protect-my-veggie', terms: ['arugula'] },
      { name: 'Asparagus', url: 'what-to-grow-near-asparagus.html#protect-my-veggie', terms: ['asparagus'] },
      { name: 'Beets', url: 'what-to-grow-near-beets.html#protect-my-veggie', terms: ['beet', 'beets'] },
      { name: 'Brussels Sprouts', url: 'what-to-grow-near-brussels-sprouts.html#protect-my-veggie', terms: ['brussels sprouts', 'brussels sprout'] },
      { name: 'Cabbage', url: 'what-to-grow-near-cabbage.html#protect-my-veggie', terms: ['cabbage'] },
      { name: 'Celery', url: 'what-to-grow-near-celery.html#protect-my-veggie', terms: ['celery'] },
      { name: 'Swiss Chard', url: 'what-to-grow-near-swiss-chard.html#protect-my-veggie', terms: ['swiss chard', 'chard'] },
      { name: 'Chili Peppers', url: 'what-to-grow-near-chili-peppers.html#protect-my-veggie', terms: ['chili pepper', 'chili peppers', 'hot pepper', 'hot peppers'] },
      { name: 'Corn', url: 'what-to-grow-near-corn.html#protect-my-veggie', terms: ['corn'] },
      { name: 'Eggplant', url: 'what-to-grow-near-eggplant.html#protect-my-veggie', terms: ['eggplant', 'eggplants'] },
      { name: 'Garlic', url: 'what-to-grow-near-garlic.html#protect-my-veggie', terms: ['garlic'] },
      { name: 'Endive', url: 'what-to-grow-near-endive.html#protect-my-veggie', terms: ['endive'] },
      { name: 'Okra', url: 'what-to-grow-near-okra.html#protect-my-veggie', terms: ['okra'] },
      { name: 'Rutabaga', url: 'what-to-grow-near-rutabaga.html#protect-my-veggie', terms: ['rutabaga', 'rutabagas'] },
      { name: 'Shallots', url: 'what-to-grow-near-shallots.html#protect-my-veggie', terms: ['shallot', 'shallots'] },
      { name: 'Onions', url: 'what-to-grow-near-onions.html#protect-my-veggie', terms: ['onion', 'onions'] },
      { name: 'Radishes', url: 'what-to-grow-near-radishes.html#protect-my-veggie', terms: ['radish', 'radishes'] },
      { name: 'Spinach', url: 'what-to-grow-near-spinach.html#protect-my-veggie', terms: ['spinach'] },
      { name: 'Zucchini', url: 'what-to-grow-near-zucchini.html#protect-my-veggie', terms: ['zucchini'] },
      { name: 'Pumpkins', url: 'what-to-grow-near-pumpkins.html#protect-my-veggie', terms: ['pumpkin', 'pumpkins'] },
      { name: 'Leeks', url: 'what-to-grow-near-leeks.html#protect-my-veggie', terms: ['leek', 'leeks'] },
      { name: 'Turnips', url: 'what-to-grow-near-turnips.html#protect-my-veggie', terms: ['turnip', 'turnips'] },
      { name: 'Parsnips', url: 'what-to-grow-near-parsnips.html#protect-my-veggie', terms: ['parsnip', 'parsnips'] },
      { name: 'Collards', url: 'what-to-grow-near-collards.html#protect-my-veggie', terms: ['collard', 'collards'] },
      { name: 'Mustard Greens', url: 'what-to-grow-near-mustard-greens.html#protect-my-veggie', terms: ['mustard greens', 'mustard green'] },
      { name: 'Bok Choy', url: 'what-to-grow-near-bok-choy.html#protect-my-veggie', terms: ['bok choy', 'pak choi'] },
      { name: 'Scallions', url: 'what-to-grow-near-scallions.html#protect-my-veggie', terms: ['scallion', 'scallions', 'green onion', 'green onions'] },
      { name: 'Fennel', url: 'what-to-grow-near-fennel.html#protect-my-veggie', terms: ['fennel'] },
      { name: 'Sorrel', url: 'what-to-grow-near-sorrel.html#protect-my-veggie', terms: ['sorrel'] },
      { name: 'Watermelon', url: 'what-to-grow-near-watermelon.html#protect-my-veggie', terms: ['watermelon', 'watermelons'] },
      { name: 'Cantaloupe', url: 'what-to-grow-near-cantaloupe.html#protect-my-veggie', terms: ['cantaloupe', 'muskmelon'] },
      { name: 'Winter Squash', url: 'what-to-grow-near-winter-squash.html#protect-my-veggie', terms: ['winter squash'] },
      { name: 'Summer Squash', url: 'what-to-grow-near-summer-squash.html#protect-my-veggie', terms: ['summer squash'] },
      { name: 'Sweet Potatoes', url: 'what-to-grow-near-sweet-potatoes.html#protect-my-veggie', terms: ['sweet potato', 'sweet potatoes'] },
      { name: 'Tomatillos', url: 'what-to-grow-near-tomatillos.html#protect-my-veggie', terms: ['tomatillo', 'tomatillos'] },
      { name: 'Ground Cherries', url: 'what-to-grow-near-ground-cherries.html#protect-my-veggie', terms: ['ground cherry', 'ground cherries'] },
      { name: 'Kohlrabi', url: 'what-to-grow-near-kohlrabi.html#protect-my-veggie', terms: ['kohlrabi'] },
      { name: 'Romanesco', url: 'what-to-grow-near-romanesco.html#protect-my-veggie', terms: ['romanesco'] },
      { name: 'Celeriac', url: 'what-to-grow-near-celeriac.html#protect-my-veggie', terms: ['celeriac'] },
      { name: 'Tatsoi', url: 'what-to-grow-near-tatsoi.html#protect-my-veggie', terms: ['tatsoi'] },
      { name: 'Mizuna', url: 'what-to-grow-near-mizuna.html#protect-my-veggie', terms: ['mizuna'] },
      { name: 'Cress', url: 'what-to-grow-near-cress.html#protect-my-veggie', terms: ['cress'] },
      { name: 'Microgreens', url: 'what-to-grow-near-microgreens.html#protect-my-veggie', terms: ['microgreen', 'microgreens'] },
      { name: 'Chickpeas', url: 'what-to-grow-near-chickpeas.html#protect-my-veggie', terms: ['chickpea', 'chickpeas', 'garbanzo', 'garbanzos'] },
      { name: 'Edamame', url: 'what-to-grow-near-edamame.html#protect-my-veggie', terms: ['edamame'] },
      { name: 'Lima Beans', url: 'what-to-grow-near-lima-beans.html#protect-my-veggie', terms: ['lima bean', 'lima beans'] },
      { name: 'Jicama', url: 'what-to-grow-near-jicama.html#protect-my-veggie', terms: ['jicama'] },
      { name: 'Salsify', url: 'what-to-grow-near-salsify.html#protect-my-veggie', terms: ['salsify'] }
    ];

    const form = document.getElementById('protectFinderForm');
    const input = document.getElementById('protectFinder');
    const results = document.getElementById('protectResults');
    const note = document.getElementById('protectNote');

    function getMatches(q) {
      return protectCrops.filter(c => c.terms.some(t => t.includes(q) || q.includes(t)) || c.name.toLowerCase().includes(q));
    }

    function render(matches) {
      results.innerHTML = '';
      if (!matches.length) {
        note.textContent = 'No close match yet. Try tomatoes, cucumbers, peppers, lettuce, kale, peas, carrots, squash, strawberries, or cabbage.';
        return;
      }
      note.textContent = matches.length === 1 ? 'Here is the closest match so far.' : 'Here are the closest matches so far.';
      matches.forEach(crop => {
        const el = document.createElement('a');
        el.textContent = crop.name;
        el.href = crop.url;
        results.appendChild(el);
      });
    }

    function goToBestMatch() {
      const q = input.value.trim().toLowerCase();
      if (!q) return;
      const matches = getMatches(q);
      render(matches);
      if (!matches.length) return;
      window.location.href = matches[0].url;
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.innerHTML = '';
        note.textContent = 'Start typing a vegetable name to jump right to the pest-help section for that crop.';
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