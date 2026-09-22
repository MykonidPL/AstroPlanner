(function(global){
  'use strict';
  const E=global.AstroFraming;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function localPoints(layout){
    if(!layout)return[];
    const out=[{x:0,y:0,kind:'target'}];
    for(const p of layout.panels)for(const c of p.corners||[]){const q=E.projectToTangent(c.raDeg,c.decDeg,layout.targetRaDeg,layout.targetDecDeg);if(q)out.push(q);}
    const cc=E.projectToTangent(layout.centerRaDeg,layout.centerDecDeg,layout.targetRaDeg,layout.targetDecDeg);if(cc)out.push(cc);
    return out;
  }
  function viewport(layout,width=640,height=360,padding=30){
    const pts=localPoints(layout);let maxX=.5,maxY=.35;
    for(const p of pts){maxX=Math.max(maxX,Math.abs(p.x));maxY=Math.max(maxY,Math.abs(p.y));}
    maxX*=1.22;maxY*=1.22;
    const usableW=Math.max(40,width-padding*2),usableH=Math.max(40,height-padding*2),scale=Math.max(.0001,Math.min(usableW/(maxX*2),usableH/(maxY*2)));
    return{width,height,padding,scale,maxX,maxY,cx:width/2,cy:height/2};
  }
  function skyToScreen(q,v){return{x:v.cx-q.x*v.scale,y:v.cy-q.y*v.scale};}
  function panelPath(panel,layout,v){
    const pts=(panel.corners||[]).map(c=>E.projectToTangent(c.raDeg,c.decDeg,layout.targetRaDeg,layout.targetDecDeg)).filter(Boolean).map(q=>skyToScreen(q,v));
    return pts.length===4?pts.map((p,i)=>(i?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2)).join(' ')+' Z':'';
  }
  function render(layout,opts={}){
    if(!layout)return'';
    const width=Number(opts.width)||640,height=Number(opts.height)||360,v=viewport(layout,width,height,Number(opts.padding)||28),preview=!!opts.preview;
    const axisAlpha=preview?.16:.22,minorAlpha=preview?.08:.11;
    const grid=[];
    for(const f of [-.75,-.5,-.25,.25,.5,.75]){
      const x=v.cx+f*(width*.44),y=v.cy+f*(height*.40);
      grid.push(`<line x1="${x.toFixed(1)}" y1="18" x2="${x.toFixed(1)}" y2="${height-18}" stroke="rgba(140,165,205,${minorAlpha})" stroke-width="1"/>`);
      grid.push(`<line x1="18" y1="${y.toFixed(1)}" x2="${width-18}" y2="${y.toFixed(1)}" stroke="rgba(140,165,205,${minorAlpha})" stroke-width="1"/>`);
    }
    grid.push(`<line x1="${v.cx}" y1="16" x2="${v.cx}" y2="${height-16}" stroke="rgba(140,165,205,${axisAlpha})" stroke-width="1"/>`);
    grid.push(`<line x1="16" y1="${v.cy}" x2="${width-16}" y2="${v.cy}" stroke="rgba(140,165,205,${axisAlpha})" stroke-width="1"/>`);
    const panels=layout.panels.map((p,i)=>{
      const path=panelPath(p,layout,v),centerQ=E.projectToTangent(p.centerRaDeg,p.centerDecDeg,layout.targetRaDeg,layout.targetDecDeg),sp=centerQ?skyToScreen(centerQ,v):{x:v.cx,y:v.cy};
      return`<g class="frPanel"><path d="${path}" fill="rgba(106,167,255,${preview?.08:.10})" stroke="${i===0?'#8fc0ff':'#6aa7ff'}" stroke-width="${preview?1.5:2}" vector-effect="non-scaling-stroke"/><circle cx="${sp.x.toFixed(1)}" cy="${sp.y.toFixed(1)}" r="${preview?2:3}" fill="#9ec7ff"/><text x="${sp.x.toFixed(1)}" y="${(sp.y-(preview?7:10)).toFixed(1)}" text-anchor="middle" fill="#dce9ff" font-size="${preview?14:16}" font-weight="800">${esc(p.name)}</text></g>`;
    }).join('');
    const tgt={x:v.cx,y:v.cy},centerQ=E.projectToTangent(layout.centerRaDeg,layout.centerDecDeg,layout.targetRaDeg,layout.targetDecDeg)||{x:0,y:0},ctr=skyToScreen(centerQ,v);
    const orient=!preview?`<g font-size="12" fill="#8ea3c8" font-weight="700"><text x="${width-28}" y="25" text-anchor="end">N ↑</text><text x="${width-28}" y="42" text-anchor="end">E ←</text></g>`:'';
    return`<svg class="framingSvg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Podgląd kadru" data-ppd="${v.scale}">${grid.join('')}${panels}<g class="frTarget"><circle cx="${tgt.x}" cy="${tgt.y}" r="${preview?5:7}" fill="none" stroke="#68d391" stroke-width="2"/><line x1="${tgt.x-10}" y1="${tgt.y}" x2="${tgt.x+10}" y2="${tgt.y}" stroke="#68d391"/><line x1="${tgt.x}" y1="${tgt.y-10}" x2="${tgt.x}" y2="${tgt.y+10}" stroke="#68d391"/></g><g class="frCenter"><circle cx="${ctr.x.toFixed(1)}" cy="${ctr.y.toFixed(1)}" r="${preview?3:4}" fill="#f6c453"/></g>${orient}</svg>`;
  }
  global.AstroFramingRenderer={render,viewport};
})(window);
