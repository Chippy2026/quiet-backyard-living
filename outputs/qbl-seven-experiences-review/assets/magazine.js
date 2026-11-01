(()=>{
const script=document.currentScript;const root=new URL('../',script.src);const library=window.QBL_LIBRARY||[];
const normalize=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/×/g,'x').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const synonyms={chippy:['chipmunk','chipmunks'],harry:['hummingbird','hummingbirds'],veggie:['vegetable','vegetables'],veggies:['vegetables'],herb:['herbs','basil','oregano','thyme'],herbs:['herb','basil','oregano','thyme'],water:['watering','irrigation','olla'],watering:['water','olla'],scrap:['lumber','wood'],squirrel:['squirrels','chipmunks'],retirement:['happy place','our place'],meal:['kitchen','harvest','herbs']};
const indexed=library.filter(r=>r.listed).map(r=>({record:r,title:normalize(r.title),tags:normalize([r.topic,r.type,...r.tags].join(' ')),description:normalize(r.description),body:normalize(r.text)}));
function find(query,department='all',type='all'){
 const tokens=normalize(query).split(' ').filter(Boolean);const scored=[];
 for(const item of indexed){const r=item.record;if(department!=='all'&&r.department!==department||type!=='all'&&r.type!==type)continue;let score=0,ok=true;
 for(const token of tokens){const terms=[token,...(synonyms[token]||[])];let best=0;for(const term of terms){const weight=term===token?1:.75;const value=item.title.includes(term)?30:item.tags.includes(term)?12:item.description.includes(term)?6:item.body.includes(term)?1:0;best=Math.max(best,value*weight)}if(!best){ok=false;break}score+=best}
 if(ok){if(tokens.length&&item.title.includes(normalize(query)))score+=35;scored.push({record:r,score})}}
 return scored.sort((a,b)=>b.score-a.score||a.record.title.localeCompare(b.record.title)).map(x=>x.record);
}
window.QBL_SEARCH={find,normalize};
const panel=document.querySelector('#search-panel'),toggle=document.querySelector('#search-toggle'),input=document.querySelector('#story-search'),results=document.querySelector('#search-results'),status=document.querySelector('#search-status');
const target=r=>new URL(r.file,root).href;
function showResults(){const list=find(input.value);results.replaceChildren();for(const r of list.slice(0,12)){const li=document.createElement('li'),a=document.createElement('a');a.href=target(r);a.textContent=r.title;li.append(a);results.append(li)}status.textContent=input.value.trim()?list.length+' matching pages'+(list.length>12?' · Showing the first 12. Browse the library for every result.':''): 'Search stories, practical guides and tools across QBL.'}
toggle?.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden){showResults();input.focus()}});input?.addEventListener('input',showResults);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel&&!panel.hidden){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus()}});
const form=document.querySelector('#library-form');
if(form){const query=document.querySelector('#library-query'),department=document.querySelector('#library-department'),type=document.querySelector('#library-type'),grid=document.querySelector('#library-results'),count=document.querySelector('#library-status');
 function render(){const list=find(query.value,department.value,type.value);grid.replaceChildren();for(const r of list){const article=document.createElement('article');article.className='co-card';const label=document.createElement('span');label.className='hp-label';label.textContent=r.topic+' / '+r.type;const h=document.createElement('h2'),a=document.createElement('a');a.href=target(r);a.textContent=r.title;h.append(a);const p=document.createElement('p');p.textContent=r.description;article.append(label,h,p);grid.append(article)}count.textContent=list.length+' matching pages'+(list.length?'':' · Try fewer words or another department.');}
 form.addEventListener('submit',e=>e.preventDefault());query.addEventListener('input',render);department.addEventListener('change',render);type.addEventListener('change',render);render();}
const progress=document.querySelector('.reading-progress');if(progress){const update=()=>{const body=document.querySelector('.article-body,.complete-guide');if(!body)return;const top=body.getBoundingClientRect().top+scrollY,end=top+body.offsetHeight-innerHeight;const pct=end>top?Math.max(0,Math.min(100,(scrollY-top)/(end-top)*100)):0;progress.style.width=pct+'%'};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();}
})();
