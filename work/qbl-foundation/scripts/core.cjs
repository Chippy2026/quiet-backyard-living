const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function safePath(value){if(typeof value!=='string'||!value.startsWith('/')||value.startsWith('//')||value.includes('..')||/[\\\x00-\x1f]/.test(value))throw Error('Unsafe local route '+value);return value}
function outputFor(route){safePath(route);if(!/^\/[a-zA-Z0-9/_-]*$/.test(route))throw Error('A route must be a clean stable path');return route==='/'?'index.html':route.slice(1)+'.html'}
function markdown(text){return require('markdown-it')({html:false,linkify:false,typographer:false}).render(text||'')}
function readingTime(relation){
 const route=relatedUrl(relation).split('#')[0].replace(/\.html$/,'');
 const record=loadRecords().find(e=>e.route===route);
 let text='';
 if(record){text=Object.values(record.blocks||[]).map(b=>Object.values(b.copy||{}).join(' ')).join(' ');if(record.bodyFile)text+=' '+fs.readFileSync(path.join(root,record.bodyFile),'utf8');if(record.preservedBodyFile)text+=' '+fs.readFileSync(path.join(root,record.preservedBodyFile),'utf8')}
 else {const file=path.join(root,'public',route.slice(1)+'.html');if(fs.existsSync(file)){const html=fs.readFileSync(file,'utf8');text=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)||[])[1]||''}}
 text=text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ');
 return Math.max(1,Math.ceil((text.match(/\S+/g)||[]).length/220));
}
function loadRecords(){return fs.readdirSync(path.join(root,'content/entries')).filter(n=>n.endsWith('.json')).sort().map(name=>read('content/entries/'+name))}
function loadEntries(){return loadRecords().map(entry=>{if(entry.bodyFile)entry.bodyHtml=markdown(fs.readFileSync(path.join(root,entry.bodyFile),'utf8'));if(entry.preservedBodyFile)entry.recoveredHtml=fs.readFileSync(path.join(root,entry.preservedBodyFile),'utf8');entry.videos=(entry.videoIds||[]).map(id=>read('data/videos.json').find(v=>v.recordId===id));return entry})}
function mediaImage(options){const media=read('data/media.json')[options.mediaId];if(!media)throw Error('Unknown media '+options.mediaId);const attrs={src:media.src,srcset:media.srcset,width:media.width,height:media.height,...options};delete attrs.mediaId;return '<img '+Object.entries(attrs).filter(([,v])=>v!==undefined&&v!==null&&v!=='').map(([k,v])=>{if(!/^[a-zA-Z][\w-]*$/.test(k))throw Error('Invalid image attribute');return `${k}="${esc(v)}"`}).join(' ')+'>'}
function relatedUrl(relation){if(typeof relation==='string'){if(relation.startsWith('#')||/^https:\/\//.test(relation)||/^mailto:/.test(relation))return relation;return safePath(relation)}if(relation.href)return safePath(relation.href);const entry=loadRecords().find(e=>e.id===relation.contentId);if(!entry)throw Error('Unknown content '+relation.contentId);return entry.route+(relation.fragment?'#'+encodeURIComponent(relation.fragment):'')}
function optionalVideo(video){if(!video)return '';if(video.provider!=='youtube'||!/^[-_a-zA-Z0-9]{11}$/.test(video.id)||!video.title||video.status!=='verified')throw Error('Video needs a real verified provider ID/title');return `<figure class="qbl-video"><figcaption>${esc(video.title)}</figcaption><a class="hp-text-link" href="https://www.youtube.com/watch?v=${esc(video.id)}" rel="noopener">${esc(video.action||'Watch the project')} ↗</a>${video.transcriptHref?`<a href="${esc(safePath(video.transcriptHref))}">Read the transcript</a>`:''}</figure>`}
function validate(){const names=fs.readdirSync(path.join(root,'content/entries')).filter(n=>n.endsWith('.json'));const entries=names.map(n=>read('content/entries/'+n));const ids=new Set,routes=new Set;const media=read('data/media.json');const errors=[];
 for(const e of entries){try{if(!e.id||ids.has(e.id))throw Error('Duplicate/missing ID');ids.add(e.id);if(routes.has(e.route))throw Error('Duplicate route');routes.add(e.route);if(e.output!==outputFor(e.route))throw Error('Output/route mismatch');if(!e.title||!e.kind||!e.status)throw Error('Required metadata');if(e.kind==='update'&&!e.parentId)throw Error('Update needs parent');if(e.bodyFile&&!fs.existsSync(path.join(root,e.bodyFile)))throw Error('Missing Markdown body');for(const b of e.blocks||[]){if(!fs.existsSync(path.join(root,'src/_includes/components',b.component+'.njk')))throw Error('Missing component '+b.component);for(const image of Object.values(b.images||{}))if(!media[image.mediaId])throw Error('Unknown media ID')}for(const v of e.videoIds||[])if(!read('data/videos.json').some(x=>x.recordId===v))throw Error('Unknown video record')}catch(err){errors.push(e.id+': '+err.message)}}
 for(const group of read('data/relationships.json'))for(const item of group.items){if(item.contentId&&!ids.has(item.contentId))errors.push('Unknown related content '+item.contentId);if(!item.contentId&&!item.href)errors.push('Empty relationship');if(!group.evidence)errors.push('Relationship missing evidence')}
 const editorial=read('data/editorial.json');if(!editorial.fieldGuide[editorial.activeSeason]||!editorial.journey[editorial.activeSeason])errors.push('Invalid selected season');
 if(read('data/review.json').allowSending!==false)errors.push('Sending must stay disabled in this pilot');
 for(const e of entries){if(e.parentId&&!ids.has(e.parentId))errors.push('Unknown update parent '+e.parentId);if(e.eventDate&&(!/^\d{4}(-\d{2}){0,2}$/.test(e.eventDate.value)||!e.eventDate.precision))errors.push('Date precision missing/invalid '+e.id)}
 const licenses=read('data/licenses.json');for(const m of Object.values(media))if(m.kind==='external-reference'&&!licenses[m.licenseId])errors.push('External media missing license record '+m.id);
 return {entries,errors,mediaCount:Object.keys(media).length};
}
module.exports={root,read,esc,safePath,outputFor,markdown,loadRecords,loadEntries,mediaImage,relatedUrl,optionalVideo,validate,readingTime};

