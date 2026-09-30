(function(){
  const pre=document.getElementById('preloader'), bar=document.getElementById('loaderBar'), pct=document.getElementById('loaderPct'), stage=document.getElementById('loaderStage'), log=document.getElementById('loaderLog');
  let n=0;
  const stages=[[0,'BOOTING SECURE UI','establishing controlled lab environment...'],[25,'LOADING OPS MATRIX','mounting visual security layers...'],[52,'VERIFYING LAB MODE','live targets disabled...'],[76,'STARTING CONSOLE','loading ethical hacker interface...'],[100,'SYSTEM READY','HerOps node online // authorized learning mode']];
  function boot(){n=Math.min(100,n+(n<70?2:1));bar.style.width=n+'%';pct.textContent=n+'%';let s=stages[0];for(const x of stages){if(n>=x[0])s=x}stage.textContent=s[1];log.textContent='> '+s[2];if(n<100)setTimeout(boot,28);else setTimeout(()=>pre.classList.add('done'),450)}
  window.addEventListener('load',()=>setTimeout(boot,160));

  const menu=document.getElementById('opsMenu'), nav=document.querySelector('.ops-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}

  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(x=>io.observe(x))}else reveals.forEach(x=>x.classList.add('visible'));

  // Decorative matrix rain: visual-only, no network activity.
  const canvas=document.getElementById('matrix'), ctx=canvas&&canvas.getContext('2d');
  if(canvas&&ctx){let w=0,h=0,cols=[],font=12;function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;font=12;cols=Array(Math.ceil(w/font)).fill(0).map(()=>Math.random()*h/font)}resize();window.addEventListener('resize',resize);function draw(){ctx.fillStyle='rgba(8,5,7,.12)';ctx.fillRect(0,0,w,h);ctx.font=font+'px monospace';ctx.fillStyle='rgba(240,47,117,.10)';for(let i=0;i<cols.length;i++){const ch='01<>[]{}#$'.charAt(Math.floor(Math.random()*10));ctx.fillText(ch,i*font,cols[i]*font);if(cols[i]*font>h&&Math.random()>.975)cols[i]=0;cols[i]++}requestAnimationFrame(draw)}draw()}

  const output=document.getElementById('terminalOutput'), input=document.getElementById('terminalInput'), run=document.getElementById('terminalRun');
  const commands={
    help:['AVAILABLE COMMANDS','  help          list safe console commands','  status        show HerOps node status','  whoami        show training identity','  scan --demo   run a simulated lab scan','  lab           show controlled-lab policy','  guild         open the official HerOps guild','  clear         clear the console'],
    status:['HEROPS NODE STATUS','CORE ............... ONLINE','LAB MODE ........... CONTROLLED','LIVE TARGETS ....... DISABLED','ETHICS GATE ........ ENABLED','COMMUNITY .......... ACTIVE'],
    whoami:['IDENTITY PROFILE','ROLE ............... ETHICAL HACKER / LEARNER','ACCESS ............. AUTHORIZED TRAINING','OBJECTIVE .......... LEARN / TEST / DEFEND','RULE ................ NO UNAUTHORIZED ACCESS'],
    'scan --demo':['DEMO SCAN / SIMULATION','[00:01] loading synthetic target: LAB-DEMO-01','[00:02] checking mock services: 3 found','[00:03] reviewing sample configuration: 1 note','[00:04] result: SIMULATION COMPLETE','No real network request was made.'],
    lab:['CONTROLLED LAB POLICY','Use systems you own or have explicit permission to test.','Keep experiments inside approved scopes and isolated environments.','Document findings and avoid unnecessary access to private data.','HerOps console: training mode only.'],
    guild:['HEROPS GUILD','Official community entry point:','https://krackeddevs.com/guilds/krackeddev-herops','Opening official guild page...']
  };
  function write(lines,type){if(!output)return;lines.forEach(line=>{const el=document.createElement('div');el.className='terminal-line '+(type||'info');el.textContent=line;output.appendChild(el)});output.scrollTop=output.scrollHeight}
  function command(raw){const cmd=String(raw||'').trim().toLowerCase();if(!cmd)return;const p=document.createElement('div');p.className='terminal-line command';p.textContent='analyst@herops:~$ '+cmd;output.appendChild(p);if(cmd==='clear'){output.innerHTML='';return}if(commands[cmd]){write(commands[cmd],cmd==='scan --demo'?'success':'info');if(cmd==='guild')setTimeout(()=>window.open('https://krackeddevs.com/guilds/krackeddev-herops','_blank','noopener'),300)}else write(['COMMAND NOT FOUND: '+cmd,'Type "help" for available commands.'],'error')}
  if(output){write(['HEROPS SECURE CONSOLE v1.0','Training environment initialized.','All commands are local simulations.','Type "help" to continue.'],'success');document.querySelectorAll('[data-command]').forEach(b=>b.addEventListener('click',()=>command(b.dataset.command)));input&&input.addEventListener('keydown',e=>{if(e.key==='Enter'){command(input.value);input.value=''}});run&&run.addEventListener('click',()=>{command(input.value);input.value='';input.focus()})}
  // Mission dashboard: synthetic local telemetry only. No network requests.
  const clock=document.getElementById('dashClock'), activeLabs=document.getElementById('activeLabs'), alerts=document.getElementById('alertCount'), uptime=document.getElementById('uptime'), progress=document.getElementById('missionProgress'), progressText=document.getElementById('missionPercent'), feed=document.getElementById('eventFeed'), pulse=document.getElementById('dashPulse');
  if(clock&&activeLabs&&alerts&&uptime&&progress&&progressText&&feed){
    const feedPool=[['OK','LAB-07 heartbeat received'],['INFO','Scope verification completed'],['WARN','Sample credential pattern detected'],['OK','Ethics gate remains enabled'],['INFO','Mission telemetry synchronized'],['OK','Synthetic endpoint validated'],['INFO','Analyst session checkpoint saved']];
    function pad(n){return String(n).padStart(2,'0')}
    function tickDashboard(){
      const d=new Date(); clock.textContent=pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds())+' MYT';
      const labs=6+Math.floor(Math.random()*4), al=1+Math.floor(Math.random()*3), up=(99.94+Math.random()*.05).toFixed(2)+'%';
      activeLabs.textContent=pad(labs); alerts.textContent=pad(al); uptime.textContent=up;
      const current=parseInt(progressText.textContent,10)||68, next=current>=92?64:current+Math.floor(Math.random()*3);
      progress.style.width=next+'%'; progressText.textContent=next+'%';
      if(Math.random()>.45){const item=feedPool[Math.floor(Math.random()*feedPool.length)], now=pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds()); const row=document.createElement('div'); const cls=item[0].toLowerCase(); row.innerHTML='<time>'+now+'</time><span class="'+cls+'">'+item[0]+'</span><p>'+item[1]+'</p>'; feed.prepend(row); while(feed.children.length>6)feed.removeChild(feed.lastElementChild); pulse.textContent='SIGNAL '+(item[0]==='WARN'?'REVIEW':'STABLE');}
    }
    tickDashboard(); setInterval(tickDashboard,3000);
  }

})();
