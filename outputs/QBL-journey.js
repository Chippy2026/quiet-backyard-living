/* Journey-only seasonal copy, using the existing shared editorial selection. */
(() => {
 const key=window.QBL_SEASONAL_EDITORIAL?.activeSeason;
 const profile=window.QBL_JOURNEY_EDITORIAL?.profiles?.[key];
 const valid=path=>typeof path==='string'&&path.length&&!path.startsWith('/')&&!path.includes('..')&&!/^[a-z][a-z0-9+.-]*:/i.test(path);
 if(!profile||!valid(profile.path)||!profile.image||!Array.isArray(profile.headline))return;
 const root=new URL('qbl-seven-experiences-review/',document.currentScript.src);
 document.getElementById('jy-season-label').textContent=profile.label;
 document.getElementById('jy-season-copy').textContent=profile.copy;
 const title=document.getElementById('jy-season-headline');title.replaceChildren();
 profile.headline.forEach((line,i)=>{if(i)title.appendChild(document.createElement('br'));const text=i?document.createElement('em'):document.createElement('span');text.textContent=line;title.appendChild(text)});
 const img=document.getElementById('jy-season-image');img.width=profile.image.width;img.height=profile.image.height;img.src=profile.image.src;img.srcset=profile.image.srcset;img.alt=profile.image.alt;
 document.getElementById('jy-season-caption').textContent=profile.caption;
 const link=document.getElementById('jy-season-link');link.href=new URL(profile.path,root).href;link.textContent=profile.action+' ↗';
 document.getElementById('main').dataset.journeySeason=key;
})();
