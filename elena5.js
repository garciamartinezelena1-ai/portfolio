(function(){
var d=document,w=window,html=d.documentElement;html.classList.add('js');
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
d.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
/* nav scrolled + active pill */
var nav=d.getElementById('nav'),links=[].slice.call(d.querySelectorAll('.nav__links a')),pill=d.querySelector('.nav__pill');
var secs=links.map(function(a){return d.querySelector(a.getAttribute('href'))});
function setPill(a){if(!a){pill.style.opacity=0;links.forEach(function(l){l.classList.remove('is-on')});return}links.forEach(function(l){l.classList.toggle('is-on',l===a)});pill.style.opacity=1;pill.style.width=a.offsetWidth+'px';pill.style.transform='translateX('+a.offsetLeft+'px)'}
/* process bar */
var steps=d.querySelector('.steps'),bar=d.querySelector('.steps__bar'),stepEls=[].slice.call(d.querySelectorAll('.step'));
function onScroll(){var y=w.scrollY,h=w.innerHeight;nav.classList.toggle('is-scrolled',y>20);
var cur=null;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<h*.4)cur=links[i]});setPill(cur);
if(steps&&bar){var r=steps.getBoundingClientRect(),p=Math.min(1,Math.max(0,(h*.75-r.top)/(r.height+h*.25)));bar.style.setProperty('--p',p);stepEls.forEach(function(s,i){s.classList.toggle('on',p>=i/(stepEls.length-1)-.02)})}}
w.addEventListener('scroll',onScroll,{passive:true});w.addEventListener('resize',onScroll);onScroll();
/* mobile menu */
var mn=d.getElementById('mnav');
d.getElementById('menuBtn').onclick=function(){mn.classList.add('is-open')};
d.getElementById('menuClose').onclick=function(){mn.classList.remove('is-open')};
mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('is-open')})});
/* digital swap */
var dg=d.querySelector('.dgs');
if(dg&&!rm){var it=dg.querySelectorAll('.dgs__i'),cl=['#2447E8','#D9582B','#2E5641'],k=0,n=0;it[0].style.setProperty('--c',cl[0]);
function go(){var p=it[n];p.classList.remove('is-on');p.classList.add('is-out');setTimeout(function(){p.classList.remove('is-out')},850);n=1-n;k=(k+1)%cl.length;it[n].style.setProperty('--c',cl[k]);it[n].classList.add('is-on');var wr=dg.parentNode;wr.style.setProperty('--dc',cl[k]);wr.classList.remove('pulse');void wr.offsetWidth;wr.classList.add('pulse')}
var t=setInterval(go,2600);dg.parentNode.addEventListener('mouseenter',function(){clearInterval(t);go();t=setInterval(go,2600)})}
/* stack scale */
var pcs=[].slice.call(d.querySelectorAll('.pc'));
function stack(){var mob=false;pcs.forEach(function(p,i){var nx=pcs[i+1];if(!nx||mob){p.style.setProperty('--sc',1);p.style.setProperty('--dim',0);return}var r=nx.getBoundingClientRect().top,pr=p.getBoundingClientRect().top,q=Math.min(1,Math.max(0,1-(r-pr)/w.innerHeight));p.style.setProperty('--sc',1-q*.06);p.style.setProperty('--dim',q)})}
if(!rm){w.addEventListener('scroll',stack,{passive:true});w.addEventListener('resize',stack);stack()}
/* index peek */
var pk=d.querySelector('.peek'),pimg=pk&&pk.querySelector('img');
if(pk&&matchMedia('(hover:hover)').matches){var mx=0,my=0,px=0,py=0,on=false;
d.querySelectorAll('.row[data-img]').forEach(function(r){r.addEventListener('mouseenter',function(){if(r.parentNode.classList.contains('open'))return;pimg.src=r.dataset.img;pk.classList.add('on');on=true});r.addEventListener('mouseleave',function(){pk.classList.remove('on');on=false})});
w.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
(function loop(){px+=(mx-px)*.16;py+=(my-py)*.16;pk.style.transform='translate('+(px+24)+'px,'+(py-110)+'px) scale('+(on?1:.85)+')';requestAnimationFrame(loop)})()}
/* copy email */
d.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();var v=b.dataset.copy;(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(function(){b.classList.add('ok');setTimeout(function(){b.classList.remove('ok')},1600)}).catch(function(){location.href='mailto:'+v})})});
})();
(function(){var m=document.getElementById('fm');if(!m)return;var f=document.getElementById('fmF'),st=document.getElementById('fmS');
function open(e){if(e)e.preventDefault();m.hidden=false;document.body.style.overflow='hidden';setTimeout(function(){f.querySelector('input').focus()},60)}
function close(){m.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('[data-open-form]').forEach(function(b){b.addEventListener('click',open)});
m.querySelectorAll('[data-close-form]').forEach(function(b){b.addEventListener('click',close)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close()});
f.addEventListener('submit',function(e){e.preventDefault();var btn=f.querySelector('button[type=submit]');btn.disabled=true;st.textContent=document.documentElement.lang==='es'?'Enviando…':'Sending…';
fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){var es=document.documentElement.lang==='es';if(r.ok){f.reset();st.textContent=es?'¡Gracias! Te responderé en menos de 48 horas.':'Thank you — I\'ll get back to you within 48 hours.';setTimeout(function(){close();st.textContent=''},1800)}else{st.textContent=es?'Algo ha fallado. Escríbeme a garciamartinezelena1@gmail.com':'Something went wrong. Please email garciamartinezelena1@gmail.com'}}).catch(function(){st.textContent=document.documentElement.lang==='es'?'Algo ha fallado. Escríbeme a garciamartinezelena1@gmail.com':'Something went wrong. Please email garciamartinezelena1@gmail.com'}).finally(function(){btn.disabled=false})})})();


(function(){var accs=document.querySelectorAll('.acc'),pk=document.querySelector('.peek');
accs.forEach(function(a){var b=a.querySelector('.row');b.addEventListener('click',function(){var o=!a.classList.contains('open');accs.forEach(function(x){x.classList.remove('open');x.querySelector('.row').setAttribute('aria-expanded','false')});if(o){a.classList.add('open');b.setAttribute('aria-expanded','true')}if(pk)pk.classList.remove('on')});
var rail=a.querySelector('.car__rail');if(!rail)return;var cn=a.querySelector('.car__c b'),sl=rail.children,cur=0,app=a.querySelector('.car--app');function per(){return app&&innerWidth>760?3:1}
function go(n){var max=Math.max(0,sl.length-per());cur=Math.max(0,Math.min(max,n));rail.style.transform='translateX('+(-(sl[0].offsetWidth+12)*cur)+'px)';if(cn)cn.textContent=cur+1}
a.querySelectorAll('.car__b').forEach(function(bt){bt.addEventListener('click',function(){go(cur+(+bt.dataset.dir))})});
var sx=null;rail.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});rail.addEventListener('touchend',function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1));sx=null});
window.addEventListener('resize',function(){go(cur)})})})();


(function(){var d=document,w=window,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
d.querySelectorAll('.sec-h').forEach(function(h){var s=d.createElement('span');s.className='ln';while(h.firstChild)s.appendChild(h.firstChild);h.appendChild(s)});
var st=d.querySelector('.statement'),tt=d.querySelector('.totop'),pcs=[].slice.call(d.querySelectorAll('.pc'));
tt.addEventListener('click',function(){w.scrollTo({top:0,behavior:rm?'auto':'smooth'})});
function f(){var h=w.innerHeight,y=w.scrollY,max=d.documentElement.scrollHeight-h;
tt.classList.toggle('on',y>h*.8);tt.style.setProperty('--sp2',max>0?y/max:0);
if(st&&!rm){var r=st.getBoundingClientRect();st.style.setProperty('--sp',Math.min(1,Math.max(0,(h*.85-r.top)/(r.height+h*.35))))}
if(!rm){pcs.forEach(function(p){var t=p.getBoundingClientRect().top,k=Math.min(1,Math.max(0,(h-t)/(h*.7)));p.style.setProperty('--pp',1-Math.pow(1-k,2.2))})}}
w.addEventListener('scroll',f,{passive:true});w.addEventListener('resize',f);f();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var n=e.target.firstChild,v=parseInt(n.nodeValue,10);if(isNaN(v)||rm)return;var t0=null;function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1200);n.nodeValue=Math.round(v*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)})},{threshold:.6});
d.querySelectorAll('.stat__n').forEach(function(s){io.observe(s)})})();
