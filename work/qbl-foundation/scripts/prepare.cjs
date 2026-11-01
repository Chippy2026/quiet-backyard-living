const fs=require('node:fs'),path=require('node:path');const core=require('./core.cjs');
const result=core.validate();if(result.errors.length)throw Error(result.errors.join('\n'));
const dir=path.join(core.root,'public/assets/qbl');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'editorial-data.js'),'window.QBL_EDITORIAL='+JSON.stringify(core.read('data/editorial.json'))+';');
fs.writeFileSync(path.join(core.root,'public/robots.txt'),'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(core.root,'public/_headers'),'/*\n  X-Robots-Tag: noindex, nofollow\n');
fs.writeFileSync(path.join(core.root,'public/149-routes.json'),JSON.stringify([...core.read('reference/pilot-routes.json').map(e=>({route:e.route,managed:true})),...core.read('reference/legacy-support.json').map(file=>({route:'/'+file.replace(/\.html$/,''),managed:false}))],null,2));
fs.copyFileSync(path.join(core.root,'public/149-routes.json'),path.join(core.root,'public/route-inventory.json'));
console.log(`Prepared ${result.entries.length} managed entries; ${result.mediaCount} media records. Sending disabled.`);

const catalog=core.loadEntries().map(e=>({id:e.id,route:e.route,title:e.storyTitle||e.title.replace(/ \| Quiet Backyard Living$/,''),description:e.description,kind:e.kind,department:e.department||({basil:'growing','garden-thread':'growing','raised-bed':'growing',wildlife:'wildlife',workshop:'making',project:'making',home:'journey',journey:'journey','our-story':'journey'}[e.id])||(['chapter','journey','notebook','story','project-story','chapter-index','notebook-index','origin'].includes(e.kind)?'journey':e.kind==='project'?'making':'help')}));
fs.writeFileSync(path.join(dir,'library-catalog.json'),JSON.stringify(catalog));
