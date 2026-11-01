/* Context only: email never enters analytics, URLs, logs, cookies or storage. */
(()=>{
const demoSeen=new Set();const forms=[...document.querySelectorAll('form[data-qbl-new-signup]')];
function event(form,stage,extra={}){document.dispatchEvent(new CustomEvent('qbl:signup',{detail:{stage,placement:form.dataset.placement,context:form.dataset.context,pageContext:form.dataset.pageContext,path:location.pathname,...extra}}))}
const observed=new WeakSet();if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting&&e.intersectionRatio>=.5&&!observed.has(e.target)){observed.add(e.target);event(e.target,'impression');observer.unobserve(e.target)}},{threshold:.5});forms.forEach(f=>observer.observe(f))}
for(const form of forms){let pending=false;form.addEventListener('submit',async e=>{e.preventDefault();if(pending||!form.reportValidity())return;const input=form.querySelector('input[name=email]'),button=form.querySelector('button'),status=form.querySelector('[role=status]'),email=input.value.trim().toLowerCase();pending=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Just a moment…';event(form,'attempt');try{
let result;const mode=new URLSearchParams(location.search).get('signup-demo');if(form.dataset.mode==='local'){
 if(mode==='error')throw Error('preview');result={ok:true,status:mode==='duplicate'||demoSeen.has(email)?'already_exists':'created'};demoSeen.add(email);
}else{const response=await fetch('/.netlify/functions/qbl-signup',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(12000),body:JSON.stringify({email,context:form.dataset.context,placement:form.dataset.placement,pageContext:form.dataset.pageContext,path:location.pathname,website:form.querySelector('[name=website]')?.value||'',consentVersion:'qbl-follow-v1'})});result=await response.json();if(!response.ok||!result.ok)throw Error('request')}
if(!['created','already_exists','previously_unsubscribed'].includes(result.status))throw Error('unconfirmed');
if(result.status==='previously_unsubscribed'){status.textContent='It looks like you previously opted out. Please contact us if you’d like to come back.';event(form,'reconfirmation_needed');}
else{status.textContent=result.status==='already_exists'?'Looks like you’re already coming along with us.':'You’re in. 🌱 We’ll let you know when there’s another chapter, project or backyard idea worth sharing.';input.value='';event(form,form.dataset.mode==='local'?'preview_success':'success',{outcome:result.status});}
}catch{status.textContent='That didn’t quite work. We couldn’t confirm your signup. Please try again in a little while.';event(form,'error');}finally{pending=false;button.disabled=false;form.removeAttribute('aria-busy')}})}
// Evaluate an engagement prompt after real signup data exists. No popup in this candidate.
})();
// When the new inline invitation exists, retire only the exact old marketing trio.
// Documentary paragraphs and their photographs remain untouched and in source order.
(()=>{if(!document.querySelector('.qbl-signup-primary'))return;for(const a of document.querySelectorAll('.qj-body a[href*="get-updates-from-around-the-yard"]')){const buttonP=a.closest('p'),intro=buttonP?.previousElementSibling,title=intro?.previousElementSibling;if(title?.textContent.trim()==='Want the next chapter when it’s ready?'&&intro?.textContent.trim().startsWith('This is the real version, not the polished version.')){title.hidden=true;intro.hidden=true;buttonP.hidden=true;}}})();
