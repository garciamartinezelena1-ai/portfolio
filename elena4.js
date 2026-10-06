(function(){
var d=document,w=window;d.documentElement.classList.add('js');
var rvs=[].slice.call(d.querySelectorAll('.rv,.rv-i,.sl'));
var bar=d.getElementById('bar'),word=d.getElementById('word'),open=d.getElementById('open');
function tick(){var h=w.innerHeight,y=w.scrollY;
rvs.forEach(function(el){if(!el.classList.contains('in')&&el.getBoundingClientRect().top<h*.9)el.classList.add('in')});
bar.classList.toggle('on',y>open.offsetHeight*.7);
if(y<h*1.2)word.style.transform='translate(-50%,calc(-46% + '+(y*.35)+'px))';}
w.addEventListener('scroll',tick,{passive:true});w.addEventListener('resize',tick);tick();setTimeout(tick,300);

/* hover preview (index + services) */
var pv=d.getElementById('pv'),pimg=pv.querySelector('img'),tx=0,ty=0,cx=0,cy=0,fine=w.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(fine){
d.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;var t=e.target.closest&&e.target.closest('[data-img]');if(t){if(pimg.getAttribute('src')!==t.dataset.img)pimg.src=t.dataset.img;if(!pv.classList.contains('on')){cx=tx;cy=ty}pv.classList.add('on')}else pv.classList.remove('on')});
(function loop(){cx+=(tx-cx)*.16;cy+=(ty-cy)*.16;pv.style.transform='translate3d('+(cx+24)+'px,'+(cy-90)+'px,0)';requestAnimationFrame(loop)})();
}
})();
