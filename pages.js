const menuButton=document.getElementById('menuButton');
const navLinks=document.getElementById('navLinks');
if(menuButton&&navLinks){
  menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuButton.textContent=open?'✕':'☰';});
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');menuButton.textContent='☰';}));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
document.querySelectorAll('[data-mail-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form);const email='info@bolbalatrust.com';const subject=encodeURIComponent(form.dataset.subject||'Message for Bolbala Trust');const body=encodeURIComponent([...f.entries()].map(([k,v])=>k+': '+v).join('\n'));const notice=form.querySelector('.notice');if(notice){notice.textContent='Your email app will open with a prepared message. Review it and press Send to contact the Trust.';notice.classList.add('show')}window.location.href='mailto:'+email+'?subject='+subject+'&body='+body}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===button));const category=button.dataset.filter;document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=category!=='all'&&item.dataset.category!==category})}));
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion&&'IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('main section,.card,.story-card,.gallery figure,.panel').forEach((el,i)=>{el.classList.add('js-reveal');el.style.transitionDelay=(Math.min(i%4,3)*55)+'ms';revealObserver.observe(el)});
}
let lightbox;
function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');document.body.style.overflow='';}
const galleryImages=[...document.querySelectorAll('.gallery img')];
if(galleryImages.length){
  lightbox=document.createElement('div');lightbox.className='lightbox';lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Gallery photo preview');
  const close=document.createElement('button');close.className='lightbox-close';close.type='button';close.setAttribute('aria-label','Close photo preview');close.textContent='×';
  const figure=document.createElement('div');const image=document.createElement('img');const caption=document.createElement('div');caption.className='lightbox-caption';figure.append(image,caption);lightbox.append(close,figure);document.body.append(lightbox);
  const openLightbox=img=>{image.src=img.currentSrc||img.src;image.alt=img.alt;caption.textContent=img.closest('figure')?.querySelector('figcaption')?.textContent||img.alt;lightbox.classList.add('open');document.body.style.overflow='hidden';close.focus()};
  galleryImages.forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Open photo: '+(img.alt||'gallery image'));img.addEventListener('click',()=>openLightbox(img));img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(img)}})});
  close.addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
}
