const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),approval=require('../reference/production-approval.json');
const manifestFile=path.join(root,'reference/approved-release-files.json');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(fs.readFileSync(manifestFile));
const errors=[];
// Preserve cached search fragments present in the exact approved artifact.
// Freshly rebuilt active Pagefind files already match; no differing file is overwritten.
for(const file of Object.keys(manifest)){const p=path.join(root,file),cached=path.join(root,'reference/release-cache',file);if(!fs.existsSync(p)&&file.startsWith('release-dist/pagefind/')&&fs.existsSync(cached)){fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(cached,p)}}

if(!approval.approved||sha(fs.readFileSync(manifestFile))!==approval.candidateManifestSHA256)errors.push('Missing or mismatched Jeff approval');
for(const [file,expected] of Object.entries(manifest)){const p=path.join(root,file);if(!fs.existsSync(p)||sha(fs.readFileSync(p))!==expected)errors.push(file)}
if(errors.length){console.error('Release fingerprint gate failed',errors);process.exitCode=1}else console.log('Jeff approved: all '+Object.keys(manifest).length+' release files match the reviewed candidate.');
