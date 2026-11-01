/* Local release candidate: existing Resend contacts; no list migration or bulk writes. */
const contexts=new Set(['homepage','journey','latest-chapter','practical-guide','wildlife','project','footer','engagement']);
function createHandler({env=process.env,request=global.fetch,audit=record=>console.info(JSON.stringify(record)),now=()=>new Date().toISOString()}={}){return async event=>{
 const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};const reply=(statusCode,status,ok=false)=>({statusCode,headers,body:JSON.stringify({ok,status})});
 const origin=event.headers?.origin||event.headers?.Origin;const origins=new Set(['https://quietbackyardliving.com','https://www.quietbackyardliving.com','https://harmonious-kitten-495cdd.netlify.app']);
 if(origin&&!origins.has(origin))return reply(403,'origin_not_allowed');
 if(origin)headers['Access-Control-Allow-Origin']=origin;
 if(event.httpMethod==='OPTIONS')return {statusCode:204,headers:{...headers,'Access-Control-Allow-Origin':origin||'https://quietbackyardliving.com','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'},body:''};
 if(event.httpMethod!=='POST')return reply(405,'method_not_allowed');
 if(!origin)return reply(403,'origin_required');
 if((event.body||'').length>2048)return reply(413,'invalid_request');let body;try{body=JSON.parse(event.body||'{}')}catch{return reply(400,'invalid_request')}
 const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
 if(body.website)return reply(400,'invalid_request');
 if(email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return reply(400,'invalid_email');
 if(!contexts.has(body.context)||!['primary','footer'].includes(body.placement)||!['qbl-follow-v1','legacy-yard-form'].includes(body.consentVersion)||typeof body.path!=='string'||!/^\/[a-zA-Z0-9/_-]*(?:\.html)?$/.test(body.path)||body.path.length>500)return reply(400,'invalid_context');
 // Same secret NAME as the verified existing production function. No new provider setup.
 if(!env.RESEND_API_KEY)return reply(503,'signup_not_configured');
 const auth={Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'};
 try{
  const existing=await request('https://api.resend.com/contacts/'+encodeURIComponent(email),{headers:auth,signal:AbortSignal.timeout(8000)});
  if(existing.ok){const contact=await existing.json();if(typeof contact.unsubscribed!=='boolean')return reply(503,'provider_unavailable');return reply(200,contact.unsubscribed?'previously_unsubscribed':'already_exists',true)}
  if(existing.status!==404)return reply(503,'provider_unavailable');
  // Omit an explicit subscription-status override. Existing opt-outs are never patched.
  const result=await request('https://api.resend.com/contacts',{method:'POST',headers:auth,body:JSON.stringify({email}),signal:AbortSignal.timeout(8000)});
  if(result.ok){const contact=await result.json();if(!contact.id)return reply(503,'provider_unavailable');try{audit({event:'qbl_signup_created',contactId:contact.id,context:body.context,placement:body.placement,path:body.path,consentVersion:body.consentVersion,at:now()})}catch{}return reply(200,'created',true);}
  if(result.status===409){const raced=await request('https://api.resend.com/contacts/'+encodeURIComponent(email),{headers:auth,signal:AbortSignal.timeout(8000)});if(!raced.ok)return reply(503,'provider_unavailable');const contact=await raced.json();if(typeof contact.unsubscribed!=='boolean')return reply(503,'provider_unavailable');return reply(200,contact.unsubscribed?'previously_unsubscribed':'already_exists',true);}
  return reply(503,'provider_unavailable');
 }catch{return reply(503,'provider_unavailable')}
 // Context audit contains no email/IP; Netlify log retention is not a durable consent database.
}}
exports.createHandler=createHandler;exports.handler=createHandler();
exports.config={path:'/.netlify/functions/qbl-signup',rateLimit:{windowLimit:6,windowSize:60,aggregateBy:['ip','domain'],action:'rate_limit'}};
