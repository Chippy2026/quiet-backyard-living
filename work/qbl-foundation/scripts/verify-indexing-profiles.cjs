const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),records=require('./core.cjs').loadRecords();
const results=[];
try{for(const production of [false,true]){
 const r=cp.spawnSync(process.execPath,['scripts/prepare-release.cjs',...(production?['--production']:[])],{cwd:root,encoding:'utf8',env:{...process.env,NETLIFY:'',CONTEXT:''}});assert.equal(r.status,0,r.stderr);
 for(const e of records){const html=fs.readFileSync(path.join(root,'release-dist',e.output),'utf8');assert.equal(html.includes('content="noindex,nofollow"'),!production,e.route);}
 assert.equal(/X-Robots-Tag: noindex/i.test(fs.readFileSync(path.join(root,'release-dist/_headers'),'utf8')),!production);
 assert.equal(fs.readFileSync(path.join(root,'release-dist/robots.txt'),'utf8').includes('Disallow: /'),!production);
 results.push({mode:production?'production':'protected-review',pages:records.length,meta:true,headers:true,robots:true});
}fs.writeFileSync(path.join(root,'reports/indexing-profiles.json'),JSON.stringify({passed:true,results},null,2));console.log(JSON.stringify(results,null,2));}
finally{const r=cp.spawnSync(process.execPath,['scripts/prepare-release.cjs','--production'],{cwd:root,stdio:'inherit',env:{...process.env,NETLIFY:'',CONTEXT:''}});assert.equal(r.status,0)}
