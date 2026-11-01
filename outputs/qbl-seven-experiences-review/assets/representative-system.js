/* Review presentation only. The retained planner script owns calculations. */
(() => {
  const layouts={"tomato": {"label": "Tomato & pepper", "back": "Tomatoes · support & airflow", "middle": "Peppers · room to mature", "front": "Onions or early lettuce", "edge": "Basil near a few plants", "text": "A mix built around tomatoes and peppers, with low crops at the reachable front. Check mature size and spacing for your varieties."}, "salad": {"label": "Salad", "back": "Peas on a trellis · if season fits", "middle": "Lettuce, spinach, arugula or chard", "front": "Radishes or carrots", "edge": "Chives, parsley or a little dill", "text": "Greens in distinct blocks, a crunchy front strip and a few herbs. This is a direction for meals, not a promise that all crops fit at once."}, "salsa": {"label": "Salsa & sauce", "back": "Tomatoes · support & access", "middle": "Peppers · leave room", "front": "Onions and cilantro", "edge": "Basil or flowers at corners", "text": "Tomatoes and peppers are the backbone. Keep onions and cilantro easy to reach; leave flowers on corners rather than filling every gap."}, "mixed": {"label": "Mixed family", "back": "Choose a main fruiting crop", "middle": "One separate root-crop zone", "front": "One leafy front strip", "edge": "One or two herbs", "text": "Fewer main crops and distinct zones. Limit large fruiting crops instead of building a crowded sampler pack."}};
  const layoutButtons=[...document.querySelectorAll('[data-layout]')];
  layoutButtons.forEach(button=>button.addEventListener('click',()=>{
    const choice=layouts[button.dataset.layout];if(!choice)return;
    for(const zone of ['back','middle','front','edge'])document.getElementById('bed-zone-'+zone).textContent=choice[zone];
    document.getElementById('bed-layout-title').textContent=choice.label;
    document.getElementById('bed-layout-note').textContent=choice.text;
    document.getElementById('bed-concept').setAttribute('aria-label','Conceptual four-by-eight-foot '+choice.label+' bed: '+choice.back+'; '+choice.middle+'; '+choice.front+'; '+choice.edge+'. Zones are not to scale; no exact spacing is calculated.');
    layoutButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
  const filters=[...document.querySelectorAll('[data-problem-filter]')];
  const problems=[...document.querySelectorAll('[data-problem]')];
  filters.forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.problemFilter;let shown=0;
    problems.forEach(p=>{p.hidden=key!=='all'&&p.dataset.problem!==key;if(!p.hidden)shown++});
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.getElementById('problem-status').textContent=key==='all'?'Showing all three observation groups.':'Showing '+shown+' observation group. This is a comparison, not a diagnosis.';
  }));
  const form=document.getElementById('plannerForm');
  const result=document.getElementById('plannerResults');
  const empty=document.getElementById('rs-plan-empty');
  if(form&&result&&empty){
    const sync=()=>{empty.hidden=result.classList.contains('show')};
    form.addEventListener('submit',()=>{sync();if(empty.hidden){const title=document.getElementById('planTitle');title.setAttribute('tabindex','-1');title.focus({preventScroll:true})}});
    document.getElementById('plannerReset').addEventListener('click',sync);
    sync();
  }
  document.querySelectorAll('[data-rs-print]').forEach(button=>button.addEventListener('click',()=>{
    if(form&&result&&!result.classList.contains('show')){
      empty.setAttribute('tabindex','-1');empty.focus();
      const hint=empty.querySelector('p');if(hint)hint.textContent='Build a plan first, then print the generated result.';
      return;
    }
    window.print();
  }));
  let closed=[];
  window.addEventListener('beforeprint',()=>{closed=[...document.querySelectorAll('main details:not([open])')];closed.forEach(d=>d.open=true)});
  window.addEventListener('afterprint',()=>{closed.forEach(d=>d.open=false);closed=[]});
  document.querySelectorAll('.rs-external').forEach(img=>{
    const fail=()=>{
      const box=img.closest('.rs-photo');if(!box||box.classList.contains('is-missing'))return;
      box.classList.add('is-missing');const message=document.createElement('span');message.className='rs-image-error';
      message.textContent=img.alt+' — the reference photograph could not load. Connect to the internet and reload. Its source is listed in Photography & guide scope.';
      box.appendChild(message);
    };
    img.addEventListener('error',fail);if(img.complete&&img.naturalWidth===0)fail();
  });
})();
