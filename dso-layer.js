(function(global){
  'use strict';
  const D2R=Math.PI/180;
  const BIN_RA=5,BIN_DEC=5,RA_BINS=72,DEC_BINS=36;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,Number(v)));
  const finite=v=>Number.isFinite(Number(v));
  const normRa=v=>((Number(v)%360)+360)%360;
  let records=[],bins=Array.from({length:RA_BINS*DEC_BINS},()=>[]),version=0;

  function binIndex(ra,dec){
    const rb=Math.min(RA_BINS-1,Math.max(0,Math.floor(normRa(ra)/BIN_RA)));
    const db=Math.min(DEC_BINS-1,Math.max(0,Math.floor((clamp(dec,-90,90)+90)/BIN_DEC)));
    return db*RA_BINS+rb;
  }
  function cleanLabel(o){
    if(Number.isFinite(Number(o?.m))&&Number(o.m)>0)return`M${Number(o.m)}`;
    const vals=[o?.mapLabel,o?.name,...(Array.isArray(o?.aliases)?o.aliases:[])].filter(Boolean).map(x=>String(x).trim());
    const pats=[/^NGC\s*0*\d+/i,/^IC\s*0*\d+/i,/^LDN\s*0*\d+/i,/^LBN\s*0*\d+/i,/^Sh\s*2[-\s]?0*\d+/i,/^vdB\s*0*\d+/i,/^RCW\s*0*\d+/i,/^(?:Barnard|B)\s*0*\d+/i,/^(?:Abell|ACO)\s*0*\d+/i];
    for(const re of pats){const v=vals.find(x=>re.test(x));if(v)return v.replace(/\s+/g,' ').replace(/^Sh\s*2\s*/i,'Sh2-');}
    const first=vals[0]||'DSO';
    return first.length>28?first.slice(0,27)+'…':first;
  }
  function classify(o){
    const code=String(o?.typeCode||'').trim(),t=String(o?.type||'').toLowerCase();
    if(['G','GPair','GTrpl','GGroup','GCluster'].includes(code))return code==='GCluster'?'galaxy-cluster':code==='G'?'galaxy':'galaxy-group';
    if(t.includes('gromada galakty'))return'galaxy-cluster';if(t.includes('galakty'))return'galaxy';
    if(code==='OCl'||t.includes('gromada otwarta'))return'open-cluster';
    if(code==='GCl'||t.includes('gromada kulista'))return'globular-cluster';
    if(code==='PN'||t.includes('planetarna'))return'planetary-nebula';
    if(code==='SNR'||t.includes('supernow'))return'snr';
    if(['HII','Neb','EmN','RfN','DrkN','Cl+N'].includes(code)||t.includes('mgław')||t.includes('mglaw'))return'nebula';
    if(code==='**'||t.includes('podwójn'))return'double-star';
    return'other';
  }
  function normalizeObject(o,i){
    const ra=Number(o?.raDeg),dec=Number(o?.decDeg);if(!finite(ra)||!finite(dec)||dec<-90||dec>90)return null;
    const maj=finite(o?.majorAxisArcmin)&&Number(o.majorAxisArcmin)>0?Number(o.majorAxisArcmin):null;
    const min=finite(o?.minorAxisArcmin)&&Number(o.minorAxisArcmin)>0?Number(o.minorAxisArcmin):(maj||null);
    const pa=finite(o?.positionAngleDeg)?((Number(o.positionAngleDeg)%180)+180)%180:null;
    const mag=finite(o?.mag)?Number(o.mag):null;
    const groups=Array.isArray(o?.groups)?o.groups.map(x=>String(x).toLowerCase()):[];
    const kind=classify(o),label=cleanLabel(o);
    const priority=(Number.isFinite(Number(o?.m))? -100:0)+(o?.custom?-70:0)+(maj? -Math.min(30,maj/8):0)+(mag!=null?mag:18);
    return{id:String(o?.uid||o?.id||`${label}:${ra.toFixed(6)}:${dec.toFixed(6)}:${i}`),raDeg:normRa(ra),decDeg:dec,label,name:String(o?.name||label),type:String(o?.type||''),typeCode:String(o?.typeCode||''),kind,mag,majorAxisArcmin:maj,minorAxisArcmin:min,positionAngleDeg:pa,groups,custom:!!o?.custom,m:Number.isFinite(Number(o?.m))?Number(o.m):null,priority};
  }
  function setObjects(objects){
    const next=[],seen=new Set();
    for(let i=0;i<(Array.isArray(objects)?objects.length:0);i++){
      const r=normalizeObject(objects[i],i);if(!r)continue;
      const key=`${r.label.toLowerCase()}|${r.raDeg.toFixed(4)}|${r.decDeg.toFixed(4)}`;if(seen.has(key))continue;seen.add(key);next.push(r);
    }
    records=next;bins=Array.from({length:RA_BINS*DEC_BINS},()=>[]);
    for(let i=0;i<records.length;i++)bins[binIndex(records[i].raDeg,records[i].decDeg)].push(i);
    version++;
    try{global.dispatchEvent(new CustomEvent('astro-dso-ready',{detail:{count:records.length,version}}));}catch(_){}
    return records.length;
  }
  function candidateRaBins(centerRa,centerDec,radius){
    const c=Math.max(.03,Math.cos(Number(centerDec)*D2R)),span=Math.min(180,Number(radius)/c+BIN_RA);
    if(span>=179)return Array.from({length:RA_BINS},(_,i)=>i);
    const a=normRa(centerRa-span),b=normRa(centerRa+span),out=[];
    for(let i=0;i<RA_BINS;i++){const mid=(i+.5)*BIN_RA;if(a<=b?(mid>=a&&mid<=b):(mid>=a||mid<=b))out.push(i);}
    return out;
  }
  function profile(radiusDeg){
    const r=Number(radiusDeg)||4;
    if(r>20)return{limit:70,magLimit:9,unknownMinArcmin:25,labelLimit:7};
    if(r>10)return{limit:120,magLimit:10.5,unknownMinArcmin:12,labelLimit:10};
    if(r>5)return{limit:220,magLimit:12.5,unknownMinArcmin:6,labelLimit:14};
    if(r>2)return{limit:350,magLimit:15,unknownMinArcmin:2,labelLimit:20};
    return{limit:520,magLimit:20,unknownMinArcmin:0,labelLimit:28};
  }
  function query(centerRa,centerDec,radiusDeg){
    if(!records.length||!finite(centerRa)||!finite(centerDec)||!(Number(radiusDeg)>0))return[];
    const radius=clamp(radiusDeg,.02,45),p=profile(radius),ra0=normRa(centerRa)*D2R,dec0=Number(centerDec)*D2R,cosLimit=Math.cos(radius*D2R),sin0=Math.sin(dec0),cos0=Math.cos(dec0);
    const db0=Math.max(0,Math.floor((clamp(Number(centerDec)-radius,-90,90)+90)/BIN_DEC)),db1=Math.min(DEC_BINS-1,Math.floor((clamp(Number(centerDec)+radius,-90,90)+90)/BIN_DEC)),rbs=candidateRaBins(centerRa,centerDec,radius),out=[];
    for(let db=db0;db<=db1;db++)for(const rb of rbs)for(const idx of bins[db*RA_BINS+rb]){
      const o=records[idx];
      let dra=o.raDeg*D2R-ra0;while(dra>Math.PI)dra-=2*Math.PI;while(dra<-Math.PI)dra+=2*Math.PI;
      const dr=o.decDeg*D2R,cosDist=sin0*Math.sin(dr)+cos0*Math.cos(dr)*Math.cos(dra);if(cosDist<cosLimit)continue;
      const important=o.m||o.custom||o.majorAxisArcmin!=null;
      if(o.mag!=null&&o.mag>p.magLimit&&!o.m&&!o.custom)continue;
      if(o.mag==null&&!important&&radius>5)continue;
      if(o.mag==null&&o.majorAxisArcmin!=null&&o.majorAxisArcmin<p.unknownMinArcmin&&!o.m&&!o.custom)continue;
      const dist=Math.acos(clamp(cosDist,-1,1))/D2R;out.push({...o,distanceDeg:dist});
    }
    out.sort((a,b)=>a.priority-b.priority||a.distanceDeg-b.distanceDeg||a.label.localeCompare(b.label));
    return out.slice(0,p.limit);
  }
  function getStatus(){return{status:records.length?'ready':'empty',count:records.length,version};}
  global.AstroDsoLayer={setObjects,query,getStatus,profile,classify};
})(window);
