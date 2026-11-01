const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),approval=require('../reference/production-approval.json');
const manifestFile=path.join(root,'reference/approved-release-files.json');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(fs.readFileSync(manifestFile));const errors=[];
if(!approval.approved||sha(fs.readFileSync(manifestFile))!==approval.candidateManifestSHA256)errors.push('Missing or mismatched Jeff approval');
// The production build still runs real Eleventy, Pagefind and the full tests.
// Publish the exact Pagefind artifact Jeff reviewed, avoiding platform-specific
// search compression/cache differences. Validate every frozen byte before use.
const search=Object.entries(manifest).filter(([file])=>file.startsWith('release-dist/pagefind/'));
const archive=path.join(root,'reference/approved-search-artifact.tar.gz');
if(!fs.existsSync(archive)||sha(fs.readFileSync(archive))!=='835235ad55cff8cc87105eb7a84d13a2a682016747203b8eb0e6a6e850d8a89c')errors.push('Approved search archive hash mismatch');
if(!errors.length){
 const cp=require('node:child_process'),expectedPaths=new Set(search.map(([f])=>f.slice('release-dist/pagefind/'.length)));
 const names=cp.execFileSync('tar',['-tzf',archive],{encoding:'utf8'}).trim().split(/\r?\n/);
 if(names.length!==search.length||names.some(n=>!expectedPaths.has(n)))throw Error('Unexpected approved-search archive paths');
 fs.mkdirSync(path.join(root,'reports'),{recursive:true});const scratch=fs.mkdtempSync(path.join(root,'reports/approved-search-'));
 cp.execFileSync('tar',['-xzf',archive,'-C',scratch]);
 for(const [file,expected] of search){const p=path.join(scratch,file.slice('release-dist/pagefind/'.length));if(!fs.existsSync(p)||sha(fs.readFileSync(p))!==expected)errors.push('Approved search artifact: '+file)}
 if(!errors.length){const target=path.resolve(root,'release-dist/pagefind');if(path.relative(root,target)!==path.join('release-dist','pagefind'))throw Error('Unsafe generated search target');fs.rmSync(target,{recursive:true,force:true});for(const [file] of search){const dest=path.join(root,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(scratch,file.slice('release-dist/pagefind/'.length)),dest)}}
}
for(const [file,expected] of Object.entries(manifest)){const p=path.join(root,file);if(!fs.existsSync(p)||sha(fs.readFileSync(p))!==expected)errors.push(file)}
if(errors.length){console.error('Release fingerprint gate failed',errors);process.exitCode=1}else console.log('Jeff approved: all '+Object.keys(manifest).length+' release files match the reviewed candidate.');
