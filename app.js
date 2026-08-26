const products=window.OS_PRODUCTS||[];
function renderProducts(target='#productGrid',filter='all'){const el=document.querySelector(target);if(!el)return;const filtered=filter==='all'?products:products.filter(p=>p.type===filter);el.innerHTML=filtered.map(p=>`<article class="card"><a class="card-media" href="/products/${p.slug}.html"><img src="${p.img}" alt="Only Samosas ${p.name} frozen samosa pack" loading="lazy" width="800" height="800"></a><div class="card-body"><span class="badge ${p.type==='vegan'?'':p.type==='veg'?'':'red'}">${p.tag}</span><div class="card-title-row"><h3><a class="plain-link" href="/products/${p.slug}.html">${p.name}</a></h3></div><p>${p.desc}</p><div class="card-actions"><a class="btn primary" href="/products/${p.slug}.html">Explore flavour</a></div></div></article>`).join('')}
function toast(msg){const el=document.createElement('div');el.className='toast';el.role='status';el.textContent=msg;document.body.append(el);setTimeout(()=>el.remove(),2300)}
document.querySelector('#newsletterForm')?.addEventListener('submit',e=>{e.preventDefault();const email=e.currentTarget.querySelector('input[type=email]')?.value.trim();if(!email)return;try{localStorage.setItem('os_launch_interest_email',email)}catch{}toast('Thanks — your launch interest has been saved on this device.');e.currentTarget.reset()});
const banner=document.querySelector('#cookieBanner');
const COOKIE_KEY='os_cookie_pref';
function getCookiePreference(){try{return localStorage.getItem(COOKIE_KEY)}catch{return null}}
function setCookiePreference(value){try{localStorage.setItem(COOKIE_KEY,value)}catch{}document.documentElement.dataset.cookieConsent=value;window.dispatchEvent(new CustomEvent('os:cookie-consent',{detail:{value}}));if(banner)banner.hidden=true}
const savedCookiePreference=getCookiePreference();
if(savedCookiePreference){document.documentElement.dataset.cookieConsent=savedCookiePreference;if(banner)banner.hidden=true}else if(banner){banner.hidden=false}
document.querySelector('#acceptCookies')?.addEventListener('click',()=>setCookiePreference('optional'));
document.querySelector('#rejectCookies')?.addEventListener('click',()=>setCookiePreference('essential'));
renderProducts();