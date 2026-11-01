// Generated signup surfaces only. The approved source/article bodies remain untouched.
const fs=require('node:fs'),path=require('node:path'),core=require('./core.cjs'),signup=require('./signup.cjs');
for(const entry of core.loadRecords()){
 const file=path.join(core.root,'dist',entry.output);let html=fs.readFileSync(file,'utf8');
 if(['/pages/get-updates-from-around-the-yard','/pages/story-signup'].includes(entry.route)){
  const invite=signup.form({id:'journey',kind:'landing'});
  html=html.replace(/<form id="(?:yardSignupForm|storySignupForm)"[\s\S]*?<\/form>/,invite)
   .replace(/<p id="(?:yardSignupMessage|storySignupMessage)"[^>]*><\/p>/g,'')
   .replace(/<aside class="complete-review-note">[\s\S]*?<\/aside>/g,'');
 }
 // Add a bot-trap without another visible or required field. No personal data requested.
 html=html.replace(/(<form\b[^>]*data-qbl-new-signup[^>]*>)/g,'$1<div hidden aria-hidden="true"><label>Leave this empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>');
 fs.writeFileSync(file,html);
}
console.log('Prepared shared signup forms on existing service URLs; source bodies unchanged.');
