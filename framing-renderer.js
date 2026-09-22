(function(global){
  'use strict';
  const E=global.AstroFraming;
  const D2R=Math.PI/180;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,Number(v)));

  function viewCenter(layout,opts={}){
    const ra=Number.isFinite(Number(opts.viewRaDeg))?E.normRa(opts.viewRaDeg):layout.targetRaDeg;
    const dec=Number.isFinite(Number(opts.viewDecDeg))?clamp(opts.viewDecDeg,-90,90):layout.targetDecDeg;
    return{raDeg:ra,decDeg:dec};
  }
  function localPoints(layout,center){
    if(!layout)return[];
    const out=[];
    const tgt=E.projectToTangent(layout.targetRaDeg,layout.targetDecDeg,center.raDeg,center.decDeg);if(tgt)out.push(tgt);
    const ctr=E.projectToTangent(layout.centerRaDeg,layout.centerDecDeg,center.raDeg,center.decDeg);if(ctr)out.push(ctr);
    for(const p of layout.panels||[])for(const c of p.corners||[]){const q=E.projectToTangent(c.raDeg,c.decDeg,center.raDeg,center.decDeg);if(q)out.push(q);}
    return out;
  }
  function stableScale(layout,width=640,height=360,padding=30,coverage=.56){
    const center={raDeg:layout.centerRaDeg,decDeg:layout.centerDecDeg};
    const pts=localPoints(layout,center);let maxX=.08,maxY=.06;
    for(const p of pts){maxX=Math.max(maxX,Math.abs(p.x));maxY=Math.max(maxY,Math.abs(p.y));}
    const usableW=Math.max(40,width-padding*2),usableH=Math.max(40,height-padding*2),cov=Math.min(.82,Math.max(.28,Number(coverage)||.56));
    return Math.max(.0001,Math.min((usableW*cov)/(maxX*2),(usableH*cov)/(maxY*2)));
  }
  function viewport(layout,width=640,height=360,padding=30,fixedScale=null,opts={}){
    const center=viewCenter(layout,opts),pts=localPoints(layout,center);let maxX=.65,maxY=.45;
    for(const p of pts){maxX=Math.max(maxX,Math.abs(p.x));maxY=Math.max(maxY,Math.abs(p.y));}
    maxX*=1.18;maxY*=1.18;
    const usableW=Math.max(40,width-padding*2),usableH=Math.max(40,height-padding*2);
    const autoScale=Math.max(.0001,Math.min(usableW/(maxX*2),usableH/(maxY*2)));
    const scale=Number(fixedScale)>0?Number(fixedScale):autoScale;
    return{width,height,padding,scale,maxX,maxY,cx:width/2,cy:height/2,viewRaDeg:center.raDeg,viewDecDeg:center.decDeg};
  }
  function skyToScreen(q,v){return{x:v.cx-q.x*v.scale,y:v.cy-q.y*v.scale};}
  function projectScreen(raDeg,decDeg,v){const q=E.projectToTangent(raDeg,decDeg,v.viewRaDeg,v.viewDecDeg);return q?skyToScreen(q,v):null;}
  function panelPath(panel,v){
    const pts=(panel.corners||[]).map(c=>projectScreen(c.raDeg,c.decDeg,v)).filter(Boolean);
    return pts.length===4?pts.map((p,i)=>(i?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2)).join(' ')+' Z':'';
  }
  function starRadius(mag,preview){
    const base=3.15-.27*(Number(mag)+1),r=clamp(base,.55,3.2);
    return preview?Math.max(.5,r*.88):r;
  }
  function starLayer(layout,v,preview){
    const S=global.AstroStarLayer;if(!S||S.getStatus?.().status!=='ready')return{html:'',count:0,limit:null};
    const radius=Math.hypot(v.width/(2*v.scale),v.height/(2*v.scale))*1.08,limit=S.magnitudeLimit?S.magnitudeLimit(radius):10;
    const stars=S.query(v.viewRaDeg,v.viewDecDeg,radius,limit),parts=[];let visible=0;
    for(const st of stars){
      const sp=projectScreen(st.raDeg,st.decDeg,v);if(!sp)continue;
      if(sp.x<-5||sp.x>v.width+5||sp.y<-5||sp.y>v.height+5)continue;
      visible++;const r=starRadius(st.mag,preview),op=clamp(.48+(limit-Number(st.mag))*.055,.46,.94);
      if(st.mag<=2.2)parts.push(`<circle cx="${sp.x.toFixed(1)}" cy="${sp.y.toFixed(1)}" r="${(r*2.0).toFixed(2)}" fill="rgba(190,215,255,.08)"/>`);
      parts.push(`<circle cx="${sp.x.toFixed(1)}" cy="${sp.y.toFixed(1)}" r="${r.toFixed(2)}" fill="rgba(224,235,255,${op.toFixed(2)})"/>`);
    }
    return{html:`<g class="frStars" aria-hidden="true">${parts.join('')}</g>`,count:visible,limit};
  }

  function niceGridStep(spanDeg){
    const steps=[0.05,0.1,0.2,0.5,1,2,5,10,15,30,45,60];
    const target=Math.max(0.04,Number(spanDeg)/5.2);
    return steps.find(s=>s>=target)||steps[steps.length-1];
  }
  function normDeltaDeg(v){let d=((Number(v)+540)%360)-180;return d;}
  function formatRaLabel(raDeg,stepDeg){
    const totalMin=Math.round(E.normRa(raDeg)/15*60),h=Math.floor(totalMin/60)%24,m=totalMin%60;
    return stepDeg>=15?`${String(h).padStart(2,'0')}h`:`${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m`;
  }
  function formatDecLabel(decDeg,stepDeg){
    const sign=decDeg>=0?'+':'−',abs=Math.abs(decDeg);
    if(stepDeg>=1)return`${sign}${Math.round(abs)}°`;
    return`${sign}${abs.toFixed(1)}°`;
  }
  function buildPath(points){
    let d='',open=false;
    for(const p of points){
      if(!p){open=false;continue;}
      d+=(open?' L ':'M ')+p.x.toFixed(2)+' '+p.y.toFixed(2);
      open=true;
    }
    return d.trim();
  }
  function gridLayer(v,preview){
    const widthSpan=v.width/v.scale,heightSpan=v.height/v.scale;
    const cosDec=Math.max(.16,Math.cos(v.viewDecDeg*D2R));
    const raSpan=Math.min(179,widthSpan/cosDec*.62),decSpan=Math.min(89,heightSpan*.62),
          raStep=niceGridStep(raSpan),decStep=niceGridStep(decSpan);
    const decMin=clamp(v.viewDecDeg-decSpan,-89.8,89.8),decMax=clamp(v.viewDecDeg+decSpan,-89.8,89.8);
    const raHalf=Math.max(raSpan,raStep*2.5);
    const raStart=Math.floor((v.viewRaDeg-raHalf)/raStep)*raStep,raEnd=Math.ceil((v.viewRaDeg+raHalf)/raStep)*raStep;
    const decStart=Math.floor(decMin/decStep)*decStep,decEnd=Math.ceil(decMax/decStep)*decStep;
    const lines=[],labels=[];
    const majorStroke=`rgba(140,165,205,${preview?.16:.20})`,minorStroke=`rgba(140,165,205,${preview?.08:.11})`;

    for(let ra=raStart;ra<=raEnd+1e-9;ra+=raStep){
      const pts=[];const segments=Math.max(16,Math.min(56,Math.round((decMax-decMin)/Math.max(decStep,.1))*8));
      for(let i=0;i<=segments;i++){
        const dec=decMin+(decMax-decMin)*(i/segments),sp=projectScreen(E.normRa(ra),dec,v);
        pts.push(sp&&sp.x>-50&&sp.x<v.width+50&&sp.y>-50&&sp.y<v.height+50?sp:null);
      }
      const d=buildPath(pts);if(d)lines.push(`<path d="${d}" fill="none" stroke="${Math.abs(normDeltaDeg(ra-v.viewRaDeg))<raStep*.55?majorStroke:minorStroke}" stroke-width="1"/>`);
      if(!preview){
        const labelPoint=projectScreen(E.normRa(ra),clamp(v.viewDecDeg,decMin,decMax),v);
        if(labelPoint&&labelPoint.x>28&&labelPoint.x<v.width-28)labels.push(`<text x="${labelPoint.x.toFixed(1)}" y="18" text-anchor="middle" fill="#93a9d0" font-size="10" font-weight="700">${esc(formatRaLabel(ra,raStep))}</text>`);
      }
    }
    for(let dec=decStart;dec<=decEnd+1e-9;dec+=decStep){
      if(dec<-89.8||dec>89.8)continue;
      const pts=[];const span=Math.min(179,raHalf*1.18/Math.max(.16,Math.cos(dec*D2R)));const segments=Math.max(18,Math.min(60,Math.round(span/Math.max(raStep,.1))*4));
      for(let i=0;i<=segments;i++){
        const ra=E.normRa(v.viewRaDeg-span+(2*span)*(i/segments)),sp=projectScreen(ra,dec,v);
        pts.push(sp&&sp.x>-50&&sp.x<v.width+50&&sp.y>-50&&sp.y<v.height+50?sp:null);
      }
      const d=buildPath(pts);if(d)lines.push(`<path d="${d}" fill="none" stroke="${Math.abs(dec-v.viewDecDeg)<decStep*.55?majorStroke:minorStroke}" stroke-width="1"/>`);
      if(!preview){
        const labelPoint=projectScreen(v.viewRaDeg,dec,v);
        if(labelPoint&&labelPoint.y>18&&labelPoint.y<v.height-12)labels.push(`<text x="10" y="${(labelPoint.y-2).toFixed(1)}" text-anchor="start" fill="#93a9d0" font-size="10" font-weight="700">${esc(formatDecLabel(dec,decStep))}</text>`);
      }
    }
    return{html:`<g class="frGrid" aria-hidden="true">${lines.join('')}${labels.join('')}</g>`,raStep,decStep};
  }

  function render(layout,opts={}){
    if(!layout)return'';
    const width=Number(opts.width)||640,height=Number(opts.height)||360,preview=!!opts.preview;
    const v=viewport(layout,width,height,Number(opts.padding)||28,opts.fixedScale,opts);
    const grid=gridLayer(v,preview),stars=starLayer(layout,v,preview);
    const panels=(layout.panels||[]).map((p,i)=>{
      const path=panelPath(p,v),sp=projectScreen(p.centerRaDeg,p.centerDecDeg,v)||{x:v.cx,y:v.cy};
      const handle=preview?'':`<path class="frFrameHandle" d="${path}" fill="none" stroke="rgba(0,0,0,0.001)" stroke-width="32" pointer-events="stroke" vector-effect="non-scaling-stroke"/>`;
      return`<g class="frPanel">${handle}<path d="${path}" fill="rgba(106,167,255,${preview?.08:.10})" stroke="${i===0?'#8fc0ff':'#6aa7ff'}" stroke-width="${preview?1.5:2}" vector-effect="non-scaling-stroke" pointer-events="none"/><circle cx="${sp.x.toFixed(1)}" cy="${sp.y.toFixed(1)}" r="${preview?2:3}" fill="#9ec7ff" pointer-events="none"/><text x="${sp.x.toFixed(1)}" y="${(sp.y-(preview?7:10)).toFixed(1)}" text-anchor="middle" fill="#dce9ff" font-size="${preview?14:16}" font-weight="800" pointer-events="none">${esc(p.name)}</text></g>`;
    }).join('');
    const tgt=projectScreen(layout.targetRaDeg,layout.targetDecDeg,v),ctr=projectScreen(layout.centerRaDeg,layout.centerDecDeg,v);
    const target=tgt?`<g class="frTarget"><circle cx="${tgt.x.toFixed(1)}" cy="${tgt.y.toFixed(1)}" r="${preview?5:7}" fill="none" stroke="#68d391" stroke-width="2"/><line x1="${(tgt.x-10).toFixed(1)}" y1="${tgt.y.toFixed(1)}" x2="${(tgt.x+10).toFixed(1)}" y2="${tgt.y.toFixed(1)}" stroke="#68d391"/><line x1="${tgt.x.toFixed(1)}" y1="${(tgt.y-10).toFixed(1)}" x2="${tgt.x.toFixed(1)}" y2="${(tgt.y+10).toFixed(1)}" stroke="#68d391"/></g>`:'';
    const center=ctr?`<g class="frCenter">${preview?'':`<circle class="frFrameHandle" cx="${ctr.x.toFixed(1)}" cy="${ctr.y.toFixed(1)}" r="24" fill="rgba(0,0,0,0.001)" pointer-events="all"/>`}<circle cx="${ctr.x.toFixed(1)}" cy="${ctr.y.toFixed(1)}" r="${preview?3:4}" fill="#f6c453" pointer-events="none"/></g>`:'';
    const orient=!preview?`<g class="frOrient" font-size="12" fill="#8ea3c8" font-weight="700"><text x="${width-28}" y="25" text-anchor="end">N ↑</text><text x="${width-28}" y="42" text-anchor="end">E ←</text></g>`:'';
    return`<svg class="framingSvg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Podgląd kadru" data-ppd="${v.scale}" data-view-ra="${v.viewRaDeg}" data-view-dec="${v.viewDecDeg}" data-star-count="${stars.count}"${stars.limit!=null?` data-star-limit="${stars.limit}"`:''}>`+
      `<g class="frMapRoot">${stars.html}${grid.html}${panels}${target}${center}</g>${orient}</svg>`;
  }
  global.AstroFramingRenderer={render,viewport,stableScale};
})(window);
