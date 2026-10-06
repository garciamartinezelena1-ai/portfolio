(function(){
var d=document,w=window,root=d.documentElement;root.classList.add('js');
var mobile=function(){return w.matchMedia('(max-width:860px)').matches};
var hero=d.querySelector('.hero');
setTimeout(function(){hero&&hero.classList.add('is-in')},60);

/* reveal + counters */
var rvs=[].slice.call(d.querySelectorAll('.rv'));
var counters=[].slice.call(d.querySelectorAll('[data-count]'));
function countUp(el){if(el.dataset.done)return;el.dataset.done=1;var t=+el.dataset.count,s=Date.now(),dur=1400;var id=setInterval(function(){var p=Math.min(1,(Date.now()-s)/dur);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p>=1)clearInterval(id)},30)}
function reveal(){var h=w.innerHeight;rvs.forEach(function(el){if(!el.classList.contains('in')&&el.getBoundingClientRect().top<h*.9)el.classList.add('in')});counters.forEach(function(el){if(el.getBoundingClientRect().top<h*.85)countUp(el)})}

/* nav */
var nav=d.getElementById('nav');
function navState(){nav.classList.toggle('is-scrolled',w.scrollY>40)}

/* hero parallax */
function heroScroll(){if(hero)hero.style.setProperty('--sy',Math.min(w.scrollY,1200))}
if(hero)hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*2);hero.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*2)});

/* process horizontal */
var po=d.getElementById('procOuter'),ps=d.getElementById('procSticky'),pt=d.getElementById('procTrack'),pb=d.getElementById('procBar');
var steps=pt?[].slice.call(pt.children):[],maxX=0;
function procMeasure(){if(!po)return;if(mobile()){po.style.height='';pt.style.transform='';return}maxX=Math.max(0,pt.scrollWidth-ps.clientWidth);po.style.height=(maxX+w.innerHeight)+'px';procScroll()}
function procScroll(){if(!po||mobile())return;if(!po.style.height){procMeasure();return}var total=po.offsetHeight-w.innerHeight,top=po.getBoundingClientRect().top;var p=total>0?Math.min(1,Math.max(0,-top/total)):0;pt.style.transform='translate3d('+(-p*maxX)+'px,0,0)';pb.style.width=(p*100)+'%';var a=Math.min(steps.length-1,Math.floor(p*steps.length*.999));steps.forEach(function(s,i){s.classList.toggle('is-on',i<=a)})}

function onScroll(){reveal();navState();heroScroll();procScroll()}
w.addEventListener('scroll',onScroll,{passive:true});
w.addEventListener('resize',function(){procMeasure();reveal()});
w.addEventListener('load',procMeasure);
procMeasure();onScroll();setTimeout(function(){procMeasure();reveal()},400);
if(w.ResizeObserver&&po){var ro=new ResizeObserver(function(){procMeasure()});ro.observe(ps);ro.observe(pt)}
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(procMeasure);

/* cursor */
var cur=d.getElementById('cur'),tx=0,ty=0,cx=0,cy=0;
if(w.matchMedia('(hover:hover) and (pointer:fine)').matches&&cur){
d.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;var t=e.target.closest&&e.target.closest('[data-cursor]');cur.classList.toggle('is-on',!!t);if(t)cur.style.setProperty('--c',t.dataset.accent||'#FF5B1F');if(!cx){cx=tx;cy=ty}});
(function loop(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)';requestAnimationFrame(loop)})();
/* magnetic */
[].forEach.call(d.querySelectorAll('.magnetic'),function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22)+'px,'+((e.clientY-r.top-r.height/2)*.32)+'px)'});b.addEventListener('pointerleave',function(){b.style.transition='transform .6s cubic-bezier(.22,1,.36,1),background .35s,color .35s';b.style.transform='';setTimeout(function(){b.style.transition=''},600)})});
}

/* view all */
var allBtn=d.getElementById('allBtn'),work=d.getElementById('work');
if(allBtn)allBtn.addEventListener('click',function(){var on=work.classList.toggle('is-all');allBtn.textContent=on?'Show less ↑':'View all projects →';procMeasure()});

/* testimonials */
var sl=[].slice.call(d.querySelectorAll('.tq__slide')),si=0,cnt=d.getElementById('tqCount');
function show(i){si=(i+sl.length)%sl.length;sl.forEach(function(s,k){s.classList.toggle('is-on',k===si)});cnt.textContent=('0'+(si+1))+' / 0'+sl.length}
var pv=d.getElementById('tqPrev'),nx=d.getElementById('tqNext');
if(pv){pv.onclick=function(){show(si-1)};nx.onclick=function(){show(si+1)}}

/* mobile menu */
var mn=d.getElementById('mnav');
d.getElementById('menuBtn').onclick=function(){mn.classList.add('is-open')};
d.getElementById('menuClose').onclick=function(){mn.classList.remove('is-open')};
[].forEach.call(mn.querySelectorAll('a'),function(a){a.addEventListener('click',function(){mn.classList.remove('is-open')})});
})();
