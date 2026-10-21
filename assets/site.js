document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reduced.matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('is-pending');observer.unobserve(entry.target);}}),{threshold:.04});
 document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight+60){el.classList.add('is-pending');observer.observe(el);}});
}
const tabs=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('[data-article]')];
let category=tabs[0]?.dataset.filter||'all';
function filter(){
 let visible=0;
 cards.forEach(card=>{const show=category==='all'||card.dataset.topic===category;card.hidden=!show;if(show){visible++;card.classList.remove('is-pending');}});
 const status=document.querySelector('#filter-status');if(status)status.textContent=`${visible} bài viết`;
}
tabs.forEach(tab=>tab.addEventListener('click',()=>{category=tab.dataset.filter;tabs.forEach(item=>item.setAttribute('aria-selected',String(item===tab)));filter();}));
if(tabs.length)filter();
const market=document.querySelector('.market');
if(market&&'IntersectionObserver' in window&&!reduced.matches){
 const chartObserver=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){market.classList.add('chart-live');chartObserver.disconnect();}},{threshold:.22});
 chartObserver.observe(market);
}else market?.classList.add('chart-live');
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a');
 if(!anchor||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.target||anchor.hasAttribute('download'))return;
 const next=new URL(anchor.href,location.href);
 if(!/^https?:$|^file:$/.test(next.protocol)||next.origin!==location.origin||(next.pathname===location.pathname&&next.hash))return;
 event.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>{location.href=anchor.href;},160);
});
