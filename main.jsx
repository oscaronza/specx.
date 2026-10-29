import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Check,
  CircleHelp, CircleDot, Compass, Download, ExternalLink, Image as ImageIcon,
  Layers3, Menu, Minus, Plus, RotateCcw, Save, Search, Share2, ShieldCheck,
  SlidersHorizontal, Sparkles, Upload, X, ZoomIn, ZoomOut, Camera, Info,
  Paintbrush, Footprints, Armchair, Disc3, Grip, Gauge, Lightbulb, Shield,
  Wrench, Cog, Flag, Sticker, Disc, PackageCheck, Bike, ScanLine, Maximize2
} from 'lucide-react';
import './style.css';

// These are reference PHOTO URLs from third-party stores. They are not bundled or licensed
// by SpecX. Replace with images you have permission to use before a commercial launch.
// The configurator is a visual concept, not a manufacturer-approved fitment guide.
const bikes = [
  { id:'surron', brand:'SURRON', model:'Light Bee X', type:'E-MOTO / OFF-ROAD', base:6500, number:'01',
    image:'https://ronhack.com/cdn/shop/files/surron-light-bee-x-2026-black.jpg?v=1779451457&width=1600',
    source:'https://ronhack.com/blogs/surron/exploring-the-power-of-the-sur-ron-light-bee-x-top-speed-weight-and-key-upgrades' },
  { id:'talaria', brand:'TALARIA', model:'Sting R MX4', type:'E-MOTO / OFF-ROAD', base:7200, number:'02',
    image:'https://highvoltagepev.com/cdn/shop/products/Sting-MX4-B2-1024x1024-1_1024x_4b8d45c9-cdc4-437c-bbfa-ce5fc0e752e9.webp?v=1680653462&width=1445',
    source:'https://highvoltagepev.com/products/talaria-sting-r-mx4' },
  { id:'stark', brand:'STARK VARG', model:'EX', type:'FULL-SIZE / E-MOTO', base:19500, number:'03',
    image:'https://img.ridewill.it/public/imgprod2021/big/varg_grey-9fc660.jpg',
    source:'https://www.ridewill.com/p/de/stark-future-vargex-60-gp-elektro-motorrad-stark-varg-ex-21-18-60-ps-mit-pedalbremse-grau-zugelassen/1691084/' },
  { id:'eride', brand:'E RIDE PRO', model:'SS 2.0', type:'E-MOTO / OFF-ROAD', base:7990, number:'04',
    image:'https://dealer.eridepro.com/cdn/shop/files/2025-09-30_174350_451-ProSS2.0BlackSpoke.png?v=1772588551&width=1200',
    source:'https://dealer.eridepro.com/products/pro-ss-2-0' },
  { id:'79bike', brand:'79 BIKE', model:'Falcon M', type:'E-MOTO / OFF-ROAD', base:6900, number:'05',
    image:'https://79bikes-ca.com/cdn/shop/files/1_97766a5d-7935-4287-a352-f863ea386873.jpg?v=1748431938',
    source:'https://79bikes-ca.com/products/79bike-falcon-m-electric-dirt-bike' },
  { id:'rtr', brand:'ETM RTR', model:'Sport', type:'ELECTRIC / PIT BIKE', base:5800, number:'06',
    image:'https://jerseyebikes.com/cdn/shop/files/IMG_7842-Photoroom_9bf5f4af-a2c8-4b43-84aa-dd1418054ba8.png?v=1770836987',
    source:'https://jerseyebikes.com/products/etm-rtr-sport' },
  { id:'ridstar', brand:'RIDSTAR', model:'Q20', type:'FAT-TYRE / E-BIKE', base:2200, number:'07',
    image:'https://img.gkbcdn.com/s3/p/2023-11-25/Ridstar-Q20-1000W-Motor-Electric-Bike-522946-6.jpg',
    source:'https://www.geekbuying.com/item/Ridstar-Q20-Electric-Bike-20-inch-1000W-Motor-48V-20Ah-48km-h-Speed-522946.html' }
];

const categories = [
  { id:'pegs', name:'Foot pegs', subtitle:'Grip and detail', icon:Footprints, options:[['Factory pegs',0],['Prickly Motorsports pegs',295],['Warp 9-style pegs',225],['Anodised CNC peg set',245]] },
  { id:'seat', name:'Seat covers', subtitle:'Seat and stitching', icon:Armchair, options:[['Factory seat cover',0],['Guts Racing gripper cover',190],['Guts Racing custom cover',245],['Ribbed custom seat cover',210]] },
  { id:'coat', name:'Powder coating', subtitle:'Frame and swingarm', icon:Paintbrush, options:[['Factory finish',0],['Frame powder coating',550],['Frame + swingarm powder coating',850]] },
  { id:'brakes', name:'Foot brakes', subtitle:'Rear brake setup', icon:Disc3, options:[['Factory brake controls',0],['Foot brake conversion concept',260],['Premium foot brake setup',480]] },
  { id:'bars', name:'Handlebars', subtitle:'Cockpit', icon:SlidersHorizontal, options:[['Factory handlebars',0],['ProTaper bars',185],['Renthal bars',225],['Rise bar kit',265]] },
  { id:'grips', name:'Grips', subtitle:'Contact points', icon:Grip, options:[['Factory grips',0],['ODI-style grips',49],['Lock-on grip set',79]] },
  { id:'wheels', name:'Wheels', subtitle:'Rims and wheelsets', icon:Disc, options:[['Factory wheels',0],['Black rim package',340],['Premium wheelset concept',980]] },
  { id:'tyres', name:'Tyres', subtitle:'Tread and terrain', icon:CircleDot, options:[['Factory tyres',0],['Off-road tyre package',320],['Dual-surface tyre package',360]] },
  { id:'suspension', name:'Suspension', subtitle:'Fork and shock', icon:Gauge, options:[['Factory suspension',0],['Suspension service / tuning',690],['Premium suspension package',1450]] },
  { id:'graphics', name:'Graphics kit', subtitle:'Visual identity', icon:Sticker, options:[['Factory graphics',0],['Minimal decal kit',145],['Custom graphics kit',195],['Full custom wrap concept',390]] },
  { id:'lights', name:'Lighting', subtitle:'Visibility and style', icon:Lightbulb, options:[['Factory lighting',0],['LED lighting package',165],['Premium light kit',290]] },
  { id:'guards', name:'Protection', subtitle:'Guards and plates', icon:Shield, options:[['Factory protection',0],['Skid plate concept',175],['Guard package',310]] },
  { id:'drivetrain', name:'Drivetrain', subtitle:'Service and finishing', icon:Cog, options:[['Factory drivetrain',0],['Chain and sprocket service',235],['Premium drivetrain parts',495]] },
  { id:'fenders', name:'Fenders', subtitle:'Bodywork', icon:Flag, options:[['Factory fenders',0],['Minimal fender kit',130],['Custom fender set',220]] },
  { id:'details', name:'Small details', subtitle:'Caps, bolts, accents', icon:Wrench, options:[['Factory details',0],['Anodised detail kit',115],['Complete accent hardware kit',260]] },
];
const colors = [
  {label:'Lunar white', hex:'#f3f4f2'}, {label:'Void black',hex:'#1a1c1e'},
  {label:'Titanium',hex:'#8c929a'}, {label:'Ion silver',hex:'#cbd1d6'},
  {label:'Mars red',hex:'#a23d3a'}, {label:'Deep ocean',hex:'#2f576e'},
  {label:'Desert sand',hex:'#c3aa86'}
];
const money = (n) => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n);
const defaults = {bike:'surron', parts:{}, color:'Void black'};
const VALID_BIKES = new Set(bikes.map(b=>b.id));
function validateBuild(raw){
  const bike = VALID_BIKES.has(raw?.bike) ? raw.bike : defaults.bike;
  const parts = {};
  for(const c of categories){
    const choice = Number(raw?.parts?.[c.id]);
    if(Number.isInteger(choice) && choice > 0 && choice < c.options.length) parts[c.id]=choice;
  }
  const color = colors.some(c=>c.label===raw?.color) ? raw.color : defaults.color;
  return {bike,parts,color};
}
function initialBuild(){
  try {
    const query = new URLSearchParams(window.location.search).get('build');
    if(query){ const decoded = decodeURIComponent(escape(atob(query))); return validateBuild(JSON.parse(decoded)); }
    return validateBuild(JSON.parse(window.localStorage.getItem('specx-build-v2')||'{}'));
  } catch { return defaults; }
}
function SpecXLogo(){
  return <div className="logo-lockup"><span className="logo-symbol"><span>Ⅹ</span></span><div className="logo-type"><strong>SPEC<span>X</span></strong><small>BUILD BEYOND LIMITS.</small></div></div>;
}
function App(){
  const [build,setBuild] = useState(initialBuild);
  const [step,setStep] = useState(0);
  const [openCat,setOpenCat] = useState('pegs');
  const [search,setSearch] = useState('');
  const [zoom,setZoom] = useState(1);
  const [photoFailed,setPhotoFailed] = useState(false);
  const [userPhoto,setUserPhoto] = useState(null);
  const [showZoom,setShowZoom] = useState(false);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [toast,setToast] = useState('');
  const inputRef = useRef(null);
  const toastRef = useRef(null);
  const bike = bikes.find(b=>b.id===build.bike) || bikes[0];
  const added = categories.filter(c=>(build.parts[c.id]||0)>0).map(c=>({...c, choice:c.options[build.parts[c.id]]}));
  const upgradePrice = added.reduce((sum,c)=>sum+c.choice[1],0);
  const total = bike.base + upgradePrice;
  const color = colors.find(c=>c.label===build.color) || colors[1];
  const chosenCoat = (build.parts.coat || 0)>0;
  const displayPhoto = userPhoto || bike.image;
  const showToast = (message) => {setToast(message);clearTimeout(toastRef.current);toastRef.current=setTimeout(()=>setToast(''),3300)};
  useEffect(()=>{try{localStorage.setItem('specx-build-v2',JSON.stringify(build));}catch{}},[build]);
  useEffect(()=>()=>{clearTimeout(toastRef.current)},[]);
  useEffect(()=>()=>{if(userPhoto)URL.revokeObjectURL(userPhoto)},[userPhoto]);
  function changeBike(id){setBuild(b=>({...b,bike:id}));setZoom(1);setPhotoFailed(false);setUserPhoto(null);}
  function selectOption(categoryId,index){setBuild(b=>({...b,parts:{...b.parts,[categoryId]:index}}));}
  function selectColor(label){setBuild(b=>({...b,color:label}));}
  function uploadPhoto(e){
    const f=e.target.files?.[0]; if(!f)return;
    if(!f.type.startsWith('image/')){showToast('Please choose an image file.');return;}
    if(f.size>12*1024*1024){showToast('Choose an image smaller than 12 MB.');return;}
    setUserPhoto(URL.createObjectURL(f));setPhotoFailed(false);setZoom(1);showToast('Your photo is only shown on this device.');e.target.value='';
  }
  function resetPhoto(){setUserPhoto(null);setPhotoFailed(false);setZoom(1);}
  function resetBuild(){setBuild(defaults);setStep(0);setOpenCat('pegs');setUserPhoto(null);setZoom(1);setPhotoFailed(false);showToast('New build started.');}
  function downloadBuild(){
    const lines=[
      'SPECX  /  BUILD SHEET', 'BUILD BEYOND LIMITS.', '─────────────────────────────────────────','',
      `BIKE             ${bike.brand} ${bike.model}`,`BASE ESTIMATE    ${money(bike.base)}`,
      `FINISH IDEA      ${build.color}${chosenCoat?' (powder coat package selected)':' (visual reference only)'}`,'',
      'SELECTED UPGRADES',
      ...(added.length?added.map(c=>`${c.name.padEnd(19,' ')} ${c.choice[0]}   ${money(c.choice[1])}`):['None selected']),
      '','─────────────────────────────────────────',
      `UPGRADES         ${money(upgradePrice)}`,`TOTAL ESTIMATE   ${money(total)} AUD`,'',
      'This is an illustrative concept estimate only; prices, compatibility, labour, shipping and legal requirements must be confirmed with qualified suppliers. Bike photography does not visually reflect chosen aftermarket parts. SpecX is not affiliated with manufacturers or aftermarket brands.'
    ];
    const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}),link=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=link;a.download=`SpecX-${bike.id}-estimate.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(link),1000);showToast('Build sheet downloaded.');
  }
  async function shareBuild(){
    try{
      const encoded=btoa(unescape(encodeURIComponent(JSON.stringify(build))));
      const url=new URL(window.location.href);url.searchParams.set('build',encoded);
      await navigator.clipboard.writeText(url.toString());showToast('Share link copied. Your uploaded photo is not included.');
    }catch{showToast('Sharing unavailable here. You can download the build sheet instead.');}
  }
  const filtered = bikes.filter(b=>(b.brand+' '+b.model).toLowerCase().includes(search.toLowerCase()));
  const steps=[{number:'01',label:'CHOOSE BIKE'},{number:'02',label:'CUSTOMISE'},{number:'03',label:'BUILD SHEET'}];
  return <div className="site-shell">
    <div className="starfield" aria-hidden="true"/><div className="planet-glow" aria-hidden="true"/>
    <header className="site-header">
      <div className="header-inner"><button type="button" className="brand-button" onClick={()=>setStep(0)} aria-label="SpecX home"><SpecXLogo/></button>
      <nav className={mobileMenu?'desktop-nav open':'desktop-nav'} aria-label="Primary navigation">
        <button onClick={()=>{setStep(0);setMobileMenu(false)}}>THE GARAGE</button><button onClick={()=>{setStep(1);setMobileMenu(false)}}>CUSTOMISER</button><button onClick={()=>{setStep(2);setMobileMenu(false)}}>BUILD SHEET</button>
      </nav>
      <div className="header-actions"><span className="online"><i/> SYSTEM ONLINE</span><button className="header-price" onClick={()=>setStep(2)}>{money(total)} <ArrowUpRight size={15}/></button><button className="menu-btn" aria-label="Toggle menu" onClick={()=>setMobileMenu(v=>!v)}>{mobileMenu?<X size={20}/>:<Menu size={20}/>}</button></div></div>
    </header>

    <main className="main-container">
      <div className="top-meta"><span><span className="crosshair-icon">✳</span> SPECX DESIGN LAB <span className="top-meta-muted">/ RELEASE 02.0</span></span><span className="meta-right">AUSTRALIA <span className="tiny-disc">●</span> PRICES IN AUD</span></div>
      <section className="hero" aria-labelledby="hero-title"><div className="hero-left"><div className="hero-tag"><span className="pulse-dot"/> YOUR MACHINE. YOUR UNIVERSE.</div><h1 id="hero-title">BUILD OUTSIDE<br/><span>THE ORDINARY<span className="hero-period">.</span></span></h1><p>Make it yours, down to the last detail. Choose a bike, explore the parts, and see your build come together.</p></div><div className="orbit-mark" aria-hidden="true"><div className="orbital-ring one"/><div className="orbital-ring two"/><div className="orbital-core">X</div><small>NO LIMITS / 02</small></div></section>
      <div className="worktop-bar"><div><span className="worktop-square">▦</span> CONFIGURATOR <span className="worktop-muted">/ PERSONAL GARAGE</span></div><div className="worktop-counter"><span>PROJECT 001</span><span>◦</span><span>7 MACHINES AVAILABLE</span></div></div>

      <div className="workspace">
        <section className="preview-column" aria-label="Bike preview">
          <div className="preview-top"><div className="preview-overline"><span className="preview-dot"/> SHOWROOM / 2D VIEW</div><div className="view-badges"><span><Camera size={13}/> REAL BIKE PHOTO</span><span className="badge-outline">SIDE PROFILE</span></div></div>
          <div className="photo-stage">
            <div className="photo-grid" aria-hidden="true"/><div className="photo-stage-title"><small>MACHINE / {bike.number.padStart(3,'0')}</small><strong>{bike.brand}<br/><span>{bike.model}</span></strong></div>
            <div className="photo-coordinate top-right">X / {bike.number} — 007</div>
            <div className="bike-image-wrap" key={bike.id+'-'+String(userPhoto)}>
              {!photoFailed?<img className="bike-image" style={{transform:`scale(${zoom})`}} src={displayPhoto} alt={`Reference side-profile photograph of ${bike.brand} ${bike.model}`} onError={()=>setPhotoFailed(true)}/>:<div className="no-photo"><ImageIcon size={43} strokeWidth={1}/><strong>PHOTO UNAVAILABLE</strong><p>The external image couldn't load. Upload your own photo to keep designing.</p><button onClick={()=>inputRef.current?.click()}><Upload size={15}/> UPLOAD PHOTO</button></div>}
            </div>
            <div className="photo-corner left-bottom"><span>REF / {bike.id.toUpperCase()}</span><span>IMAGE NOT A LIVE RENDER</span></div>
            <div className="stage-zoom" aria-label="Photo zoom"><button onClick={()=>setZoom(z=>Math.max(1,+(z-.15).toFixed(2)))} aria-label="Zoom out"><Minus size={17}/></button><span>{Math.round(zoom*100)}%</span><button onClick={()=>setZoom(z=>Math.min(1.9,+(z+.15).toFixed(2)))} aria-label="Zoom in"><Plus size={17}/></button></div>
          </div>
          <div className="preview-footer">
            <div className="preview-note"><Info size={16}/><span>Stock reference photo — upgrades are listed separately. <a href={bike.source} target="_blank" rel="noopener noreferrer">Photo source ↗</a></span></div>
            <div className="preview-tools"><input ref={inputRef} type="file" accept="image/*" hidden onChange={uploadPhoto}/><button onClick={()=>inputRef.current?.click()} title="Use your own bike photo"><Upload size={15}/> <span>MY PHOTO</span></button>{userPhoto&&<button onClick={resetPhoto} title="Restore reference photo"><RotateCcw size={15}/></button>}<button onClick={()=>setShowZoom(true)} title="Full-screen preview" aria-label="Open large bike preview"><Maximize2 size={15}/></button></div>
          </div>
          <div className="finish-panel"><div className="finish-heading"><div><span className="micro">FINISH STUDIO <span>// 01</span></span><h3>Set the tone.</h3></div><span className="finish-sub">COLOUR INSPIRATION</span></div><div className="finish-row"><div className="finish-swatches">{colors.map(c=><button key={c.label} title={c.label} aria-label={c.label} aria-pressed={build.color===c.label} className={build.color===c.label?'swatch active':'swatch'} onClick={()=>selectColor(c.label)} style={{'--color':c.hex}}/>)}</div><span className="selected-color"><span className="colour-check" style={{background:color.hex}}/>{build.color}</span></div><div className="finish-tip">{chosenCoat?`Powder coating selected. ${build.color} is your finish reference; actual supplier colour may vary.`:'Colours are reference swatches only. Select powder coating in Customise to add its estimated cost.'}</div></div>
          <div className="quick-spec-row"><div><small>SELECTED MACHINE</small><strong>{bike.brand} <span>{bike.model}</span></strong></div><div><small>PARTS ADDED</small><strong>{String(added.length).padStart(2,'0')} <span>/ {String(categories.length).padStart(2,'0')}</span></strong></div><div><small>PROJECT TOTAL</small><strong>{money(total)}</strong></div></div>
        </section>
        <aside className="configurator" aria-label="Build configurator">
          <div className="config-top"><div className="config-heading"><span className="micro">SPECX / BUILD CONTROL</span><span className="config-status"><i/> ACTIVE SESSION</span></div><h2>Make it <span>yours.</span></h2><p>Every build starts with a choice.</p></div>
          <div className="progress-tabs">{steps.map((s,i)=><button key={i} className={step===i?'progress-tab active':'progress-tab'} onClick={()=>setStep(i)} aria-current={step===i?'step':undefined}><span>{s.number}</span><small>{s.label}</small></button>)}</div>
          <div className="config-content" key={step}>
            {step===0&&<><div className="section-title"><div><span className="micro muted-micro">STEP 01 / 03</span><h3>Choose your machine.</h3></div><span className="item-count">07 MODELS</span></div><div className="search-wrap"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search bikes..." aria-label="Search bikes"/></div><div className="bike-list">{filtered.map(b=><button key={b.id} className={build.bike===b.id?'bike-choice chosen':'bike-choice'} onClick={()=>changeBike(b.id)}><div className="bike-thumb"><img loading="lazy" src={b.image} alt="" onError={e=>{e.currentTarget.style.display='none'}}/><Bike size={17} className="thumb-fallback"/></div><div className="bike-choice-details"><strong>{b.brand}</strong><span>{b.model}</span></div><div className="bike-choice-right"><strong>{money(b.base)}</strong>{build.bike===b.id?<span className="selected-check"><Check size={11}/></span>:<span className="choice-arrow"><ChevronRight size={16}/></span>}</div></button>)}{!filtered.length&&<p className="empty-search">No matching bikes. Try another search.</p>}</div><p className="inline-warning"><CircleHelp size={15}/> Prices shown are demo estimates, not live retailer listings.</p><button className="action-main" onClick={()=>setStep(1)}>CUSTOMISE THIS BIKE <ArrowUpRight size={18}/></button></>}
            {step===1&&<><div className="section-title"><div><span className="micro muted-micro">STEP 02 / 03</span><h3>The details matter.</h3></div><span className="item-count">{added.length} ADDED</span></div><p className="parts-intro">Choose one option per category. All prices update live.</p><div className="part-accordion">{categories.map((cat,i)=>{const Icon=cat.icon;const index=build.parts[cat.id]||0;return <div className={openCat===cat.id?'part-category expanded':'part-category'} key={cat.id}><button className="part-category-head" onClick={()=>setOpenCat(openCat===cat.id?'':cat.id)} aria-expanded={openCat===cat.id}><span className="part-icon"><Icon size={17}/></span><span className="part-text"><strong>{cat.name}</strong><small>{index?cat.options[index][0]:cat.subtitle}</small></span><span className="part-price">{index?`+${money(cat.options[index][1])}`:'STANDARD'}</span><ChevronDown size={17} className="accordion-arrow"/></button>{openCat===cat.id&&<div className="option-list">{cat.options.map(([label,price],j)=><button key={j} className={index===j?'option-row chosen':'option-row'} onClick={()=>selectOption(cat.id,j)}><span className="option-radio"><Check size={11}/></span><span>{label}</span><strong>{price?`+${money(price)}`:'INCLUDED'}</strong></button>)}<div className="fitment-note"><ShieldCheck size={14}/> Concept options only — check fitment with a qualified supplier.</div></div>}</div>})}</div><button className="action-main" onClick={()=>setStep(2)}>REVIEW BUILD <ArrowRight size={17}/></button></>}
            {step===2&&<><div className="section-title"><div><span className="micro muted-micro">STEP 03 / 03</span><h3>Your build sheet.</h3></div><span className="item-count">READY</span></div><div className="sheet-id">BUILD ID <strong>SX / {bike.number} / {String(added.length).padStart(2,'0')}</strong></div><div className="summary-bike"><div className="summary-thumb"><img src={bike.image} alt=""/></div><div><span>BASE MACHINE</span><strong>{bike.brand}</strong><small>{bike.model}</small></div><b>{money(bike.base)}</b></div><div className="summary-heading">SELECTED UPGRADES <span>{added.length} TOTAL</span></div>{added.length?<div className="summary-list">{added.map(c=><div key={c.id}><span><small>{c.name}</small>{c.choice[0]}</span><b>+{money(c.choice[1])}</b></div>)}</div>:<div className="summary-empty">No upgrades selected yet. Your build includes the base bike only.</div>}<div className="summary-finish"><Paintbrush size={15}/> FINISH REFERENCE <strong>{build.color}</strong></div><div className="summary-pricing"><div><span>Bike</span><strong>{money(bike.base)}</strong></div><div><span>Upgrades</span><strong>{money(upgradePrice)}</strong></div><div className="grand-total"><span>ESTIMATED TOTAL</span><strong>{money(total)}</strong></div></div><div className="summary-actions"><button className="action-main" onClick={downloadBuild}><Download size={17}/> DOWNLOAD BUILD SHEET</button><button className="action-alt" onClick={shareBuild}><Share2 size={16}/> COPY SHARE LINK</button><button className="reset-button" onClick={resetBuild}><RotateCcw size={14}/> START A NEW BUILD</button></div><p className="disclaimer">Estimate only, not a quote. Prices are illustrative in AUD. Part compatibility, installation, taxes, shipping and riding regulations must be checked independently.</p></>}
          </div>
          <div className="price-footer"><div><span>LIVE BUILD ESTIMATE <span className="aud-tag">AUD</span></span><strong>{money(total)}</strong><small>{added.length} upgrades selected · indicative pricing</small></div><div className="price-signal"><span>↗</span></div></div>
        </aside>
      </div>
      <section className="bottom-banner"><div className="banner-icon"><Compass size={24}/></div><div><span>DESIGNED TO BE DIFFERENT</span><h3>Every detail. One vision.</h3><p>SpecX is an independent concept builder. The photos are reference images; real build results and part compatibility depend on your bike and supplier.</p></div><button onClick={()=>setStep(1)}>EXPLORE UPGRADES <ArrowUpRight size={16}/></button></section>
      <footer><span className="footer-logo">SPEC<span>X</span><small>®</small></span><span>THE ELECTRIC FRONTIER / EST. 2026</span><span>CONCEPT BUILD TOOL · NOT A SALES QUOTE</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>BACK TO TOP ↑</button></footer>
    </main>
    {showZoom&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Full-size bike photo" onClick={()=>setShowZoom(false)}><button className="lightbox-close" onClick={()=>setShowZoom(false)} aria-label="Close preview"><X size={23}/></button><div className="lightbox-image" onClick={e=>e.stopPropagation()}><img src={displayPhoto} alt={`${bike.brand} ${bike.model}`}/></div><span>{bike.brand} / {bike.model} · STOCK PHOTO</span></div>}
    {toast&&<div className="toast" role="status"><Check size={16}/>{toast}</div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
