// Mark only generated <main> content for the real Pagefind index.
// Supporting HTML sources stay unchanged; this is not a library migration.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../dist');let count=0;
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory()&&e.name!=='pagefind')walk(file);else if(e.isFile()&&e.name.endsWith('.html')){let html=fs.readFileSync(file,'utf8');if(/<main\b/i.test(html)&&!/<main\b[^>]*\bdata-pagefind-body/i.test(html)){html=html.replace(/<main\b/i,'<main data-pagefind-body');fs.writeFileSync(file,html)}count++}}}walk(root);console.log(`Search preparation: ${count} generated HTML files; input sources unchanged.`);
