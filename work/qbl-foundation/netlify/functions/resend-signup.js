// Preserve the existing endpoint for previously loaded production pages.
const {createHandler,config}=require('./qbl-signup.js');
function compatibilityHandler(options){const handler=createHandler(options);return async event=>{
 let body;try{body=JSON.parse(event.body||'{}')}catch{return handler(event)}
 return handler({...event,body:JSON.stringify({...body,context:'journey',placement:'primary',path:'/pages/get-updates-from-around-the-yard',consentVersion:'legacy-yard-form'})});
}}
exports.handler=compatibilityHandler();exports.compatibilityHandler=compatibilityHandler;exports.config={...config,path:'/.netlify/functions/resend-signup'};
