(function(){
var d=document,w=window;d.documentElement.classList.add('js');
var rvs=[].slice.call(d.querySelectorAll('.rv'));
function reveal(){var h=w.innerHeight;rvs.forEach(function(el){if(!el.classList.contains('in')&&el.getBoundingClientRect().top<h*.92)el.classList.add('in')})}
var nav=d.getElementById('nav');
function onScroll(){reveal();nav.classList.toggle('is-scrolled',w.scrollY>30)}
w.addEventListener('scroll',onScroll,{passive:true});w.addEventListener('resize',reveal);
onScroll();setTimeout(reveal,300);
var mn=d.getElementById('mnav');
d.getElementById('menuBtn').onclick=function(){mn.classList.add('is-open')};
d.getElementById('menuClose').onclick=function(){mn.classList.remove('is-open')};
[].forEach.call(mn.querySelectorAll('a'),function(a){a.addEventListener('click',function(){mn.classList.remove('is-open')})});
})();

(function(){var m=document.getElementById('fm');if(!m)return;var f=document.getElementById('fmF'),st=document.getElementById('fmS');
function open(e){if(e)e.preventDefault();m.hidden=false;document.body.style.overflow='hidden';setTimeout(function(){f.querySelector('input').focus()},50)}
function close(){m.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('[data-open-form]').forEach(function(b){b.addEventListener('click',open)});
m.querySelectorAll('[data-close-form]').forEach(function(b){b.addEventListener('click',close)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close()});
f.addEventListener('submit',function(e){e.preventDefault();var btn=f.querySelector('button[type=submit]');btn.disabled=true;st.textContent='Sending…';
fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){if(r.ok){f.reset();st.textContent='Thank you — I\'ll get back to you within 48 hours.'}else{st.textContent='Something went wrong. Please email garciamartinezelena1@gmail.com'}}).catch(function(){st.textContent='Something went wrong. Please email garciamartinezelena1@gmail.com'}).finally(function(){btn.disabled=false})})})();
