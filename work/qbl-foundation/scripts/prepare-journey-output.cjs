// Generated review output only. Original legacy URLs/content stay available.
const fs=require('node:fs'),path=require('node:path'),core=require('./core.cjs');
const dist=path.join(core.root,'dist'),aliases=core.read('data/journey-aliases.json');let linked=0;
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory()&&item.name!=='pagefind')walk(file);else if(item.isFile()&&file.endsWith('.html')){
 const relative=path.relative(dist,file).replace(/\\/g,'/');if(relative==='index.html')continue;
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/href="([^"]+)"/g,(whole,href)=>{let u;try{u=new URL(href.replace(/&amp;/g,'&'),'http://qbl.local/'+relative)}catch{return whole}if(!['qbl.local','quietbackyardliving.com','www.quietbackyardliving.com'].includes(u.hostname)||u.pathname.replace(/\.html$/,'')!=='/pages/what-we-re-up-to-around-the-yard-and-cabin')return whole;const target=aliases[decodeURIComponent(u.hash.slice(1))];if(!target)return whole;linked++;return `href="${target.route}"`});
 if(relative==='pages/what-we-re-up-to-around-the-yard-and-cabin.html')html=html.replace(/<main\b(?![^>]*data-pagefind-ignore)/,'<main data-pagefind-ignore="all"');
 fs.writeFileSync(file,html);
}}}walk(dist);console.log(`Journey output: ${linked} legacy chapter links connected. Homepage untouched; legacy journal retained, duplicate full-text index suppressed.`);
