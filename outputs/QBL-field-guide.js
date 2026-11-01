/* Landing-only discovery. Uses the existing full-library search implementation. */
(() => {
 const form=document.getElementById('fg-search-form'),query=document.getElementById('fg-query'),list=document.getElementById('fg-search-results'),status=document.getElementById('fg-search-status');
 const script=document.currentScript;const root=new URL('qbl-seven-experiences-review/',script.src);
 function show(){
  const term=query.value.trim();list.replaceChildren();
  if(!term){list.hidden=true;status.textContent='';return}
  if(!window.QBL_SEARCH){list.hidden=true;status.textContent='Search is unavailable. Use the photographic departments below or open the complete library.';return}
  const matches=window.QBL_SEARCH.find(term);list.hidden=false;
  matches.slice(0,6).forEach(record=>{const li=document.createElement('li'),a=document.createElement('a');a.href=new URL(record.file,root).href;a.textContent=record.title;li.append(a);list.append(li)});
  status.textContent=matches.length?matches.length+' matching pages'+(matches.length>6?' · Showing the first 6.':''):'No matches yet. Try a crop, animal, project or fewer words.';
 }
 form.addEventListener('submit',e=>{e.preventDefault();show()});query.addEventListener('input',show);
 document.querySelectorAll('[data-fg-query]').forEach(button=>button.addEventListener('click',()=>{query.value=button.dataset.fgQuery;show();query.focus()}));
 document.querySelectorAll('.fg-external').forEach(img=>{
  const fail=()=>{const box=img.closest('.fg-photo');if(!box||box.classList.contains('is-missing'))return;box.classList.add('is-missing');const text=document.createElement('span');text.className='fg-image-error';text.textContent=img.alt+' — reference photograph unavailable. Connect to the internet and reload. The guide link still works.';box.appendChild(text)};
  img.addEventListener('error',fail);if(img.complete&&img.naturalWidth===0)fail();
 });
})();
