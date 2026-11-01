/* UI-only stage comparison. No planner calculations or growing dates are introduced. */
(() => {
  const bed=document.getElementById('tomato-bed');
  const note=document.getElementById('bed-stage-note');
  const buttons=[...document.querySelectorAll('[data-bed-stage]')];
  const notes={early:'Early: a front strip of lettuce can use space before the tomato canopy fills in.',later:'Later: let the early lettuce finish. Keep the front accessible as the tomato canopy fills in.'};
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const stage=button.dataset.bedStage;
    bed.dataset.stage=stage;
    bed.setAttribute('aria-label',stage==='early'?'Conceptual early bed: tomatoes in the center, basil nearby, onions on the side, carrots in their own pocket, flowers at corners and lettuce at the front.':'Conceptual later bed: the tomato canopy fills in, the early lettuce has finished, and the front is left accessible. Basil, onions, carrots and flowers remain outside the main tomato space.');
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    note.textContent=notes[stage];
  }));
  document.getElementById('tf-print').addEventListener('click',()=>window.print());
  let printDetails=[];
  window.addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll('main details:not([open])')];printDetails.forEach(d=>d.open=true)});
  window.addEventListener('afterprint',()=>{printDetails.forEach(d=>d.open=false);printDetails=[]});
  document.querySelectorAll('.tf-external').forEach(img=>{
    const failure=()=>{
      const box=img.closest('.tf-photo');
      if(!box||box.classList.contains('is-missing'))return;
      box.classList.add('is-missing');
      const text=document.createElement('span');text.className='tf-image-error';
      text.textContent=img.alt+' — this reference photograph could not load. Connect to the internet and reload; its source is listed in Photo credits.';
      box.appendChild(text);
    };
    img.addEventListener('error',failure);
    if(img.complete&&img.naturalWidth===0)failure();
  });
})();
