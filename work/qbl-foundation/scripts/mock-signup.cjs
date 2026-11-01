// Loopback review only. Never deploy this script as a Netlify function.
const {createHandler}=require('../netlify/functions/qbl-signup.js');
const reply=(status,data={})=>({status,ok:status>=200&&status<300,json:async()=>data});
function mockHandler(){return createHandler({env:{RESEND_API_KEY:'local-mock-only'},audit:()=>{},request:async(url,options={})=>{
 const email=options.method==='POST'?JSON.parse(options.body).email:decodeURIComponent(url.split('/').pop());
 if(email==='failure@example.com')return reply(503);
 if(options.method==='POST')return reply(200,{id:'local-review-contact'});
 if(email==='duplicate@example.com')return reply(200,{unsubscribed:false});
 if(email==='unsubscribed@example.com')return reply(200,{unsubscribed:true});
 return reply(404);
}})}
exports.mockHandler=mockHandler;
