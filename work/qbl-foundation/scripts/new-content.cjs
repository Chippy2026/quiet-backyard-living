const fs=require('node:fs'),path=require('node:path'),core=require('./core.cjs');
function create(input,{directory=core.root}={}){
 if(!/^[a-z0-9][a-z0-9-]+$/.test(input.id||''))throw Error('Use a stable lowercase ID');
 if(!['journey','project','notebook','update','guide','wildlife'].includes(input.kind))throw Error('Unknown content kind');
 if(!input.title||!input.body)throw Error('Provide the real title and account');
 if(input.kind==='update'&&!input.parentId)throw Error('An update needs its earlier story');
 const route=input.route||'/drafts/'+input.id;core.safePath(route);
 const record={id:input.id,kind:input.kind,authorable:true,route,output:core.outputFor(route),status:'draft',title:input.title,description:input.description||'',kicker:input.kicker||'From Jeff & Vanessa’s journal',eventDate:input.eventDate||null,bodyFile:'content/bodies/'+input.id+'.md',hero:input.hero||null,caption:input.caption||'',projectId:input.projectId||null,parentId:input.parentId||null,outcome:input.outcome||'unreported',related:input.related||[],videoIds:input.videoIds||[],videos:[],sections:input.sections||[],bodyClass:'hp-edition co-edition hy-edition',styles:['/assets/magazine.css','/assets/happy-place.css','/assets/balanced-edition.css','/assets/hybrid-polish.css','/assets/consolidated.css'],scripts:[],factualReview:'needs-editorial-review'};
 for(const sub of ['content/entries','content/bodies'])fs.mkdirSync(path.join(directory,sub),{recursive:true});
 const target=path.join(directory,'content/entries',input.id+'.json');if(fs.existsSync(target))throw Error('ID already exists; create a dated update instead of overwriting');
 fs.writeFileSync(target,JSON.stringify(record,null,2));fs.writeFileSync(path.join(directory,record.bodyFile),input.body+'\n');return record;
}
if(require.main===module){const intake=process.argv[2];if(!intake){console.error('Usage: node scripts/new-content.cjs intake.json');process.exitCode=1}else console.log('Draft created:',create(JSON.parse(fs.readFileSync(intake,'utf8'))).route)}
module.exports={create};
