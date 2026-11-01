// Netlify production context is explicit; previews must never inherit indexability.
function productionMode(env=process.env,args=process.argv){
  if(env.NETLIFY==='true')return env.CONTEXT==='production';
  return args.includes('--production');
}
module.exports={productionMode};
