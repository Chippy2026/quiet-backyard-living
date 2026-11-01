const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const core=require('../scripts/core.cjs');
test('every seasonal profile has evidenced featured stories, practical resources, Notebook and plans',()=>{
 const cards=core.read('data/story-cards.json'),profiles=core.read('data/heartbeat.json');
 assert.deepEqual(Object.keys(profiles),['building','spring','summer','fall']);
 for(const season of Object.values(profiles)){
  assert.ok(season.label&&season.chapter&&season.evidence&&season.intro);assert.equal(season.headline.length,2);
  for(const id of [season.feature,...season.featuredJourney,...season.featuredPractical,...season.notebook,...season.upNext.links])assert.ok(cards[id],id);
 }
 for(const c of Object.values(cards)){assert.ok(c.image.alt);assert.ok(core.read('data/media.json')[c.image.mediaId]);assert.ok(core.relatedUrl(c.href).startsWith('/'));assert.ok(core.readingTime(c.href)>=1)}
});
test('all 783 approved inputs, license manifests and factual queue remain byte-identical',()=>{
 const output=path.resolve(core.root,'../../outputs'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
 const inputs=core.read('reference/approved-input-hashes.json');assert.equal(Object.keys(inputs).length,783);
 for(const [file,expected] of Object.entries(inputs))assert.equal(hash(fs.readFileSync(path.join(output,file))),expected,file);
 for(const file of ['QBL-tomato-image-manifest.json','QBL-seven-image-manifest.json','QBL-field-guide-image-manifest.json','QBL-journey-image-manifest.json','QBL-factual-editorial-review-queue.json'])assert.equal(hash(fs.readFileSync(path.join(output,file))),hash(fs.readFileSync(path.join(core.root,'reference',file))),file);
});
test('Home keeps its approved upper progression and one restrained lower garden section; card is a single link',()=>{
 const entries=core.loadRecords(),home=entries.find(e=>e.id==='home'),journey=entries.find(e=>e.id==='journey');
 assert.deepEqual(home.blocks.map(b=>b.component),['editorial/home-cover','editorial/season-feature','editorial/home-stories','editorial/home-notebook','editorial/home-garden','editorial/help-and-search']);assert.ok(!home.blocks.some(b=>b.component==='home/grow-your-own-1'));
 const garden=core.read('data/home-garden.json');assert.equal(garden.length,3);for(const c of garden){assert.ok(core.read('data/media.json')[c.image.mediaId]);assert.ok(core.relatedUrl(c.href).startsWith('/'))}
 const gateway=core.read('data/growing-gateway.json');assert.deepEqual(gateway.doors.map(d=>d.title),['Vegetables','Herbs','Berries & Fruit','Plan Your Garden']);assert.equal(gateway.allHref,'/field-guide#grow');for(const d of gateway.doors){assert.ok(core.relatedUrl(d.href).startsWith('/'));assert.ok(d.image?core.read('data/media.json')[d.image.mediaId]:d.visual==='garden-plan')}
 assert.deepEqual(journey.blocks.map(b=>b.component),['journey-book/landing']);const landing=fs.readFileSync(path.join(core.root,'src/_includes/components/journey-book/landing.njk'),'utf8');assert.ok(landing.indexOf('{{ bookView(journey.book) }}')<landing.indexOf('id="what-were-up-to"'));
 const markup=fs.readFileSync(path.join(core.root,'src/_includes/components/editorial/cards.njk'),'utf8').split('{% endmacro %}')[0];assert.equal((markup.match(/<a\b/g)||[]).length,1);assert.equal((markup.match(/<\/a>/g)||[]).length,1);
});
