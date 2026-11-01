const noteFilters=[...document.querySelectorAll('[data-note-filter]')];
const noteCards=[...document.querySelectorAll('[data-note-category]')];
const noteStatus=document.querySelector('#notebook-status');
for(const button of noteFilters){button.addEventListener('click',()=>{const choice=button.dataset.noteFilter;let count=0;for(const card of noteCards){const match=choice==='all'||card.dataset.noteCategory===choice;card.hidden=!match;if(match)count++;}for(const control of noteFilters)control.setAttribute('aria-pressed',String(control===button));if(noteStatus)noteStatus.textContent=count+(count===1?' note':' notes')+' from the journal';});}
