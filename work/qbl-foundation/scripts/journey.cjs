const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function buildBook(records){
 const all=records.filter(c=>c.kind==='chapter'&&c.status==='published').sort((a,b)=>a.chapterOrder-b.chapterOrder);
 const orders=new Set,numbers=new Set,ids=new Set;
 for(const c of all){if(!Number.isInteger(c.chapterOrder)||c.chapterOrder<1||orders.has(c.chapterOrder)||numbers.has(c.chapterNumber)||ids.has(c.id))throw Error('Chapter order, number and identity must be unique');orders.add(c.chapterOrder);numbers.add(c.chapterNumber);ids.add(c.id)}
 const brief=c=>c?{id:c.id,route:c.route,storyTitle:c.storyTitle,chapterNumber:c.chapterNumber,coverMedia:c.coverMedia,dateLabel:c.dateLabel}:null;
 const chapters=all.map((c,i)=>({...c,readingMinutes:Math.max(1,Math.ceil((c.storyBlocks||[]).filter(b=>b.type==='paragraph').reduce((n,b)=>n+(b.text.match(/\S+/g)||[]).length,0)/220)),previous:brief(all[i-1]),next:brief(all[i+1])}));
 const latest=chapters.at(-1)||null;const archive=chapters.filter(c=>c.id!==latest?.id);
 const jumps=chapters.filter(c=>c.chapterNumber===1||c.chapterNumber%10===0).map(c=>({label:'Chapter '+c.chapterNumber,route:c.route,chapterNumber:c.chapterNumber}));if(latest)jumps.push({label:'Latest',route:latest.route,chapterNumber:latest.chapterNumber});
 return {all:chapters,latest,archive,jumps,byId:Object.fromEntries(chapters.map(c=>[c.id,c]))};
}
function renderBlock(block){
 const id=esc(block.sourceBlockId);
 if(block.type==='paragraph')return block.html.replace(/^<p\b/,`<p data-source-block="${id}"`);
 if(block.type!=='figure')throw Error('Unknown story block type');
 if(block.reviewStatus==='held-for-jeff')return `<!-- data-source-block="${id}" -->`;
 const attrs=block.sourceAttributes||{},classes='qj-inline-figure '+(attrs.class||'');
 const image=require('./core.cjs').mediaImage(block.image);
 const captions=(block.captionText||[]).map(c=>`<figcaption>${esc(c)}</figcaption>`).join('');
 return `<figure class="${esc(classes)}" data-source-block="${id}"${attrs.id?` id="${esc(attrs.id)}"`:''}>${image}${captions}</figure>`;
}
function loadJourney(){const core=require('./core.cjs'),records=core.loadRecords(),book=buildBook(records),config=core.read('data/journey-editorial.json');const byId=Object.fromEntries(records.map(r=>[r.id,r]));return {book,config,byId,notes:records.filter(r=>r.kind==='notebook').sort((a,b)=>(book.byId[b.parentId]?.chapterOrder||0)-(book.byId[a.parentId]?.chapterOrder||0)||a.id.localeCompare(b.id)),latestCompanions:config.latestCompanions.filter(id=>id!==book.latest?.id&&byId[id]?.parentId!==book.latest?.id).map(id=>book.byId[id]||byId[id]).filter(Boolean),selectedNotes:config.notebookSelection.map(id=>byId[id]).filter(Boolean)}}
module.exports={buildBook,renderBlock,loadJourney};
