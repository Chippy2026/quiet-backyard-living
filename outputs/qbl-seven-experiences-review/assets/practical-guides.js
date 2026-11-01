/* Presentation only. Existing garden-planner calculations are unchanged. */
document.querySelectorAll('.pg-print').forEach(button=>button.addEventListener('click',()=>window.print()));
let printDetails=[];
window.addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll('main details:not([open])')];printDetails.forEach(d=>d.open=true)});
window.addEventListener('afterprint',()=>{printDetails.forEach(d=>d.open=false);printDetails=[]});
