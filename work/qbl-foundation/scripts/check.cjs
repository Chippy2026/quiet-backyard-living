const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),core=require('./core.cjs');
const result=core.validate(),errors=[...result.errors];
const sha=text=>crypto.createHash('sha256').update(text).digest('hex');
for(const tool of Object.values(core.read('reference/tool-hashes.json')))if(sha(fs.readFileSync(path.join(core.root,tool.file)))!==tool.sha256)errors.push('Original tool script hash changed');
let built=false;
if(process.argv.includes('--built')){
 built=true;const dist=path.join(core.root,'dist');
 for(const e of result.entries){const file=path.join(dist,e.output);if(!fs.existsSync(file)){errors.push('Missing pilot output '+e.output);continue}const html=fs.readFileSync(file,'utf8');if((html.match(/<h1\b/g)||[]).length!==1)errors.push('Heading count '+e.route);if(!html.includes('noindex'))errors.push('Missing review protection '+e.route);if(html.includes('{{')||html.includes('{%'))errors.push('Unrendered template '+e.route);
  for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(!ref.startsWith('/')||ref.startsWith('//'))continue;let url;try{url=new URL(ref,'http://qbl.local')}catch{errors.push('Invalid URL '+ref);continue}const name=decodeURIComponent(url.pathname);let target=path.join(dist,name==='/'?'index.html':name.slice(1));if(!path.extname(target)&&fs.existsSync(target+'.html'))target+='.html';if(!fs.existsSync(target)){errors.push('Missing reference '+e.route+' '+ref);continue}if(url.hash&&path.extname(target)==='.html'&&!fs.readFileSync(target,'utf8').includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'))errors.push('Missing anchor '+ref)}
 }
 if(!fs.existsSync(path.join(dist,'pagefind/pagefind.js')))errors.push('Missing real Pagefind bundle');
}
fs.mkdirSync(path.join(core.root,'reports'),{recursive:true});fs.writeFileSync(path.join(core.root,'reports/check-results.json'),JSON.stringify({status:errors.length?'failed':'passed',scope:built?'generated-output-and-source':'source-only',managedEntries:result.entries.length,mediaRecords:result.mediaCount,errors,browserRendering:'not run',dependencyBuild:built?'actual build invoked separately':'not verified'},null,2));
console.log(`${built?'Build':'Source'} checks: ${result.entries.length} pilot records, ${result.mediaCount} media records, ${errors.length} errors.`);if(errors.length){console.error(errors.join('\n'));process.exitCode=1}
