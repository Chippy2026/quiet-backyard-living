const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');const root=path.resolve(__dirname,'..');process.chdir(root);
function bin(pkg,name){const file=path.join(root,'node_modules',pkg,'package.json');if(!fs.existsSync(file))throw Error(`Missing ${pkg}. Install the pinned dependencies before building. No fallback build is used.`);const p=JSON.parse(fs.readFileSync(file,'utf8'));return path.resolve(path.dirname(file),typeof p.bin==='string'?p.bin:p.bin[name])}
try{
 const eleventy=bin('@11ty/eleventy','eleventy'),pagefind=bin('pagefind','pagefind');
 require('./prepare.cjs');
 for(const [command,args] of [[process.execPath,[eleventy]],[process.execPath,['scripts/prepare-journey-output.cjs']],[process.execPath,['scripts/prepare-signup-output.cjs']],[process.execPath,['scripts/prepare-search.cjs']],[process.execPath,[pagefind,'--site','dist','--root-selector','main']],[process.execPath,['scripts/check.cjs','--built']]]){const r=cp.spawnSync(command,args,{cwd:root,stdio:'inherit'});if(r.status!==0)throw Error('Build stage failed')}
 fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/build-status.json',JSON.stringify({status:'built',eleventy:true,pagefind:true,production:false,builtAt:new Date().toISOString()},null,2));
}catch(e){fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/build-status.json',JSON.stringify({status:'blocked',reason:e.message,eleventy:false,pagefind:false,production:false},null,2));console.error(e.message);process.exitCode=1}
