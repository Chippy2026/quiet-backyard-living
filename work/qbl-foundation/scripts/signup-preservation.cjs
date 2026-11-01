/* Compare approved layout/content while permitting only authorized signup additions. */
function withoutSignup(input){return String(input).replace(/<div class="hp-wrap qbl-signup-wrap"><section class="qbl-signup[\s\S]*?<\/section><\/div>/g,'').replace(/<section class="qbl-signup[\s\S]*?<\/section>/g,'').replace(/<link rel="stylesheet" href="\/assets\/qbl\/signup.css">/g,'').replace(/<script src="\/assets\/qbl\/signup.js" defer><\/script>/g,'').replace(/\{\{ entry \| signupFooter \| safe \}\}/g,'');}
module.exports={withoutSignup};
