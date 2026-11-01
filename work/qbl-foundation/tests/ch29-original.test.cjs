const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const core=require('../scripts/core.cjs');
test('Chapter 29 acceptance uses original source photo sides and insertion order, without reader review notes',()=>{
 const original=fs.readFileSync(path.join(core.root,'reference/journey-authored-original.html'),'utf8').match(/<article class="story-entry" id="chapter-29">[\s\S]*?<\/article>/)[0];
 const c=core.loadRecords().find(r=>r.id==='journey-ch29');assert.equal(c.originalLayout,true);
 assert.equal(core.loadRecords().filter(r=>r.originalLayout).length,29);
 let cursor=0;for(const b of c.storyBlocks){const pos=original.indexOf(b.sourceHtml,cursor);assert.ok(pos>=cursor,b.sourceBlockId+' agrees with original source');cursor=pos+b.sourceHtml.length;}
 const rendered=fs.readFileSync(path.join(core.root,'dist',c.output),'utf8');
 const originalSides=[...original.matchAll(/<figure class="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(c.storyBlocks.filter(b=>b.type==='figure').map(b=>b.sourceAttributes.class),originalSides);
 assert.ok(rendered.indexOf('data-source-block="ch29-b001"')<rendered.indexOf('<h1>'));
 for(const chapter of core.loadRecords().filter(r=>r.kind==='chapter')){const html=fs.readFileSync(path.join(core.root,'dist',chapter.output),'utf8');assert.ok(!html.includes('Photo held for Jeff'));assert.ok(!html.includes('qj-local-note'));}
});
test('all 29 approved original layouts match original source headings, photos and narrative sequence',()=>{
 const source=fs.readFileSync(path.join(core.root,'reference/journey-authored-original.html'),'utf8');const articles=[...source.matchAll(/<article class="story-entry"[^>]*>[\s\S]*?<\/article>/g)].map(m=>m[0]);
 for(const c of core.loadRecords().filter(r=>r.kind==='chapter')){
  const matches=articles.filter(a=>c.storyBlocks.every(b=>a.includes(b.sourceHtml)));assert.equal(matches.length,1,c.id);const original=matches[0];let cursor=0;
  for(const b of c.storyBlocks){const index=original.indexOf(b.sourceHtml,cursor);assert.ok(index>=cursor,c.id+' '+b.sourceBlockId);cursor=index+b.sourceHtml.length;}
  const label=original.match(/<span class="story-label">([\s\S]*?)<\/span>/);assert.equal(c.originalChapterLabel,label[1]);assert.equal(c.originalHeadingAfterBlocks,c.storyBlocks.filter(b=>original.indexOf(b.sourceHtml)<label.index).length);
  const html=fs.readFileSync(path.join(core.root,'dist',c.output),'utf8');assert.ok(html.includes('qj-original-body'));const title=html.indexOf('<h1>');if(c.originalHeadingAfterBlocks===0)assert.ok(title<html.indexOf('data-source-block='));else assert.ok(title>html.indexOf('data-source-block="'+c.storyBlocks[c.originalHeadingAfterBlocks-1].sourceBlockId+'"'));
 }
});
