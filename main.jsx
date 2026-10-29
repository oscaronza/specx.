import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Check,
  CircleHelp, CircleDot, Compass, Download, ExternalLink, Image as ImageIcon,
  Layers3, Menu, Minus, Plus, RotateCcw, Save, Search, Share2, ShieldCheck,
  SlidersHorizontal, Sparkles, Upload, X, ZoomIn, ZoomOut, Camera, Info,
  Paintbrush, Footprints, Armchair, Disc3, Grip, Gauge, Lightbulb, Shield,
  Wrench, Cog, Flag, Sticker, Disc, PackageCheck, Bike, ScanLine, Maximize2, Pencil, RefreshCw, Instagram
} from 'lucide-react';
import './style.css';

// These are reference PHOTO URLs from third-party stores. They are not bundled or licensed
// by SpecX. Replace with images you have permission to use before a commercial launch.
// The configurator is a visual concept, not a manufacturer-approved fitment guide.
// Photo references may be subject to third-party copyright and availability.
// SpecX is not sponsored by the referenced manufacturers or accessory brands.
// The Light Bee cutout was made from the screenshot supplied by the SpecX owner.
const bikes = [
  { id:'surron', brand:'SURRON', model:'Light Bee X', type:'E-MOTO / OFF-ROAD', base:6500, number:'01',
    image:'/bikes/surron-lightbee-cutout.png', cutout:true,
    source:'https://sur-ron.co.nz/products/surron-light-bee-x-my26', site:'https://www.surron.com/' },
  { id:'surron-ultra', brand:'SURRON', model:'Ultra Bee', type:'E-MOTO / OFF-ROAD', base:8900, number:'02',
    image:'https://ronhack.com/cdn/shop/files/imgi_1_Homepage_Desktop_Versions_412x171px_410x729px_25_2400x2400_090ad3b2-03d2-43a6-8261-3171cb1a68e7.png?v=1778748677&width=1200',
    source:'https://ronhack.com/fr/products/2025-ultra-bee-hp',site:'https://www.surron.com/' },
  { id:'surron-storm', brand:'SURRON', model:'Storm Bee', type:'FULL-SIZE / E-MOTO', base:12500, number:'03',
    image:'https://ebikes-hawaii.com/wp-content/uploads/2025/04/Surron-Storm-Bee-6.jpg',
    source:'https://ebikes-hawaii.com/product/surron-storm-bee/',site:'https://www.surron.com/' },
  { id:'surron-hyper', brand:'SURRON', model:'Hyper Bee', type:'COMPACT / E-MOTO', base:4900, number:'04',
    image:'https://www.all4ride.co/cdn/shop/files/sur-ron-hyper-bee-bleu-profil-gauche.png?v=1744803873&width=990',
    source:'https://www.all4ride.co/products/sur-ron-hyper-bee-moto-electrique',site:'https://www.surron.com/' },
  { id:'talaria', brand:'TALARIA', model:'Sting R MX4', type:'E-MOTO / OFF-ROAD', base:7200, number:'05',
    image:'https://highvoltagepev.com/cdn/shop/products/Sting-MX4-B2-1024x1024-1_1024x_4b8d45c9-cdc4-437c-bbfa-ce5fc0e752e9.webp?v=1680653462&width=1445',
    source:'https://highvoltagepev.com/products/talaria-sting-r-mx4',site:'https://www.talariaaustralia.com.au/' },
  { id:'stark', brand:'STARK VARG', model:'EX', type:'FULL-SIZE / E-MOTO', base:19500, number:'06',
    image:'https://img.ridewill.it/public/imgprod2021/big/varg_grey-9fc660.jpg',
    source:'https://www.ridewill.com/p/de/stark-future-vargex-60-gp-elektro-motorrad-stark-varg-ex-21-18-60-ps-mit-pedalbremse-grau-zugelassen/1691084/',site:'https://starkfuture.com/' },
  { id:'eride', brand:'E RIDE PRO', model:'SS 2.0', type:'E-MOTO / OFF-ROAD', base:7990, number:'07',
    image:'https://dealer.eridepro.com/cdn/shop/files/2025-09-30_174350_451-ProSS2.0BlackSpoke.png?v=1772588551&width=1200',
    source:'https://dealer.eridepro.com/products/pro-ss-2-0',site:'https://www.eridepro.com/' },
  { id:'79bike', brand:'79 BIKE', model:'Falcon M', type:'E-MOTO / OFF-ROAD', base:6900, number:'08',
    image:'https://79bikes-ca.com/cdn/shop/files/1_97766a5d-7935-4287-a352-f863ea386873.jpg?v=1748431938',
    source:'https://79bikes-ca.com/products/79bike-falcon-m-electric-dirt-bike',site:'https://www.79bikeofficial.com/' },
  { id:'rtr', brand:'ETM RTR', model:'Sport', type:'ELECTRIC / PIT BIKE', base:5800, number:'09',
    image:'https://jerseyebikes.com/cdn/shop/files/IMG_7842-Photoroom_9bf5f4af-a2c8-4b43-84aa-dd1418054ba8.png?v=1770836987',
    source:'https://jerseyebikes.com/products/etm-rtr-sport',site:'https://www.eazybikes.com.au/collections/etm%E2%84%A2-rtr-sport',siteLabel:'Australian retailer' },
  { id:'ridstar', brand:'RIDSTAR', model:'Q20', type:'FAT-TYRE / E-BIKE', base:2200, number:'10',
    image:'https://img.gkbcdn.com/s3/p/2023-11-25/Ridstar-Q20-1000W-Motor-Electric-Bike-522946-6.jpg',
    source:'https://www.geekbuying.com/item/Ridstar-Q20-Electric-Bike-20-inch-1000W-Motor-48V-20Ah-48km-h-Speed-522946.html',site:'https://au.ridstar.net/' }
];
const brandSites = [
  {brand:'SURRON', name:'Surron',url:'https://www.surron.com/',desc:'Manufacturer website'},
  {brand:'TALARIA', name:'Talaria',url:'https://www.talariaaustralia.com.au/',desc:'Australian distributor'},
  {brand:'STARK VARG', name:'Stark Future',url:'https://starkfuture.com/',desc:'Manufacturer website'},
  {brand:'E RIDE PRO', name:'E Ride Pro',url:'https://www.eridepro.com/',desc:'Manufacturer website'},
  {brand:'79 BIKE', name:'79 Bike',url:'https://www.79bikeofficial.com/',desc:'Retailer website'},
  {brand:'ETM RTR', name:'ETM RTR',url:'https://www.eazybikes.com.au/collections/etm%E2%84%A2-rtr-sport',desc:'Australian retailer'},
  {brand:'RIDSTAR', name:'Ridstar',url:'https://au.ridstar.net/',desc:'Australian store'}
];
const partSites = [
  {name:'Prickly Motorsports',url:'https://www.pricklymotorsports.com/products/pricklypegs', desc:'Foot pegs'},
  {name:'Guts Racing',url:'https://www.gutsracing.com/',desc:'Seat covers'},
  {name:'Warp 9 Racing',url:'https://warp9racing.com/',desc:'Pegs and wheels'},
  {name:'ProTaper',url:'https://protaper.com/',desc:'Handlebars and grips'}
];
const categorySites = {
  pegs:[partSites[0],partSites[2]],
  seat:[partSites[1]],
  bars:[partSites[3]],
  wheels:[partSites[2]],
};

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
// Personal price changes are saved only in this browser. They never modify public prices.
const priceKey = (kind,id,index) => kind === 'bike' ? `bike:${id}` : `part:${id}:${index}`;
const validPrice = (v) => Number.isFinite(Number(v)) && Number(v)>=0 && Number(v)<=1000000 && v!=='' && v!==null;
function initialPrices(){
  try {
    const raw=JSON.parse(localStorage.getItem('specx-prices-v3')||'{}');
    if(!raw || typeof raw!=='object' || Array.isArray(raw)) return {};
    const allow = new Set([...bikes.map(b=>priceKey('bike',b.id)),...categories.flatMap(c=>c.options.map((_,i)=>priceKey('part',c.id,i)))]);
    return Object.fromEntries(Object.entries(raw).filter(([k,v])=>allow.has(k)&&validPrice(v)).map(([k,v])=>[k,Number(v)]));
  }catch{return {}};
}
function PriceField({value,onPriceChange,label}){
  const [draft,setDraft]=useState(String(value));
  useEffect(()=>setDraft(String(value)),[value]);
  return <input type="number" min="0" max="1000000" step="1" value={draft} onChange={e=>{setDraft(e.target.value);if(validPrice(e.target.value))onPriceChange(e.target.value)}} onBlur={()=>{if(!validPrice(draft))setDraft(String(value))}} aria-label={label}/>;
}
function SpecXLogo(){
  return <div className="logo-lockup"><img className="specx-brand-image" src="/specx-logo.webp" alt=""/><div className="logo-type"><strong>SPEC<span>X</span></strong><small>TAKING E-BIKE MODIFICATIONS TO THE MOON</small></div></div>;
}
/** Attempt a free white-background cutout in-browser. If the image host blocks
 *  canvas access, show the original image instead. Never send images to a server. */
function CutoutImage({src,className='',style,alt='',onError,loading='eager'}){
  const [cutout,setCutout]=useState(null);
  useEffect(()=>{
    setCutout(null);
    if(!src || src.startsWith('/bikes/')) return;
    let active=true;
    let resultUrl;
    const photo=new Image();
    photo.crossOrigin='anonymous';
    photo.onload=()=>{
      try {
        const width=Math.min(photo.naturalWidth,1150);
        const height=Math.round(photo.naturalHeight*(width/photo.naturalWidth));
        if(width<50 || height<50 || height>1600)return;
        const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        ctx.drawImage(photo,0,0,width,height);
        const pixels=ctx.getImageData(0,0,width,height);
        const d=pixels.data;const n=width*height;
        // Only run when the photo really has a mostly light, neutral backdrop.
        let eligible=0, samples=0;
        const sample=(idx)=>{const p=idx*4,r=d[p],g=d[p+1],b=d[p+2];samples++;if(r>207 && g>207 && b>207 && Math.max(r,g,b)-Math.min(r,g,b)<25)eligible++};
        for(let x=0;x<width;x+=Math.max(1,Math.floor(width/32))){sample(x);sample((height-1)*width+x)}
        for(let y=0;y<height;y+=Math.max(1,Math.floor(height/32))){sample(y*width);sample(y*width+width-1)}
        if(eligible / Math.max(1,samples)<.68) return;
        // Flood the bright exterior from image edges. Interior white bike details stay.
        const visited=new Uint8Array(n),queue=new Int32Array(n);
        let head=0,tail=0;
        function add(i){
          if(visited[i])return;
          visited[i]=1;
          const p=i*4,r=d[p],g=d[p+1],b=d[p+2];
          const avg=(r+g+b)/3;
          if(avg>207 && Math.max(r,g,b)-Math.min(r,g,b)<31) queue[tail++]=i;
        }
        for(let x=0;x<width;x++){add(x);add((height-1)*width+x)}
        for(let y=0;y<height;y++){add(y*width);add(y*width+width-1)}
        while(head<tail){
          const i=queue[head++],x=i%width;
          if(x>0)add(i-1);if(x<width-1)add(i+1);
          if(i>=width)add(i-width);if(i<n-width)add(i+width);
        }
        if(tail<n*.05)return;
        for(let j=0;j<tail;j++)d[queue[j]*4+3]=0;
        ctx.putImageData(pixels,0,0);
        canvas.toBlob(blob=>{
          if(!blob||!active)return;
          resultUrl=URL.createObjectURL(blob);
          setCutout(resultUrl);
        },'image/png');
      }catch{ /* Remote hosts may block cross-origin canvas reads. */ }
    };
    photo.onerror=()=>{};
    photo.src=src;
    return ()=>{active=false;if(resultUrl)URL.revokeObjectURL(resultUrl)};
  },[src]);
  return <img loading={loading} src={cutout||src} className={className} style={style} alt={alt} onError={onError}/>;
}

function App(){
  const [build,setBuild] = useState(initialBuild);
  const [step,setStep] = useState(0);
  const [prices,setPrices] = useState(initialPrices);
  const [publishedPrices,setPublishedPrices] = useState({});
  const [showPrices,setShowPrices] = useState(false);
  const [openBrand,setOpenBrand] = useState('SURRON');
  const [openCat,setOpenCat] = useState('pegs');
  const [search,setSearch] = useState('');
  const [zoom,setZoom] = useState(1);
  const [photoFailed,setPhotoFailed] = useState(false);
  const [userPhoto,setUserPhoto] = useState(null);
  const [showZoom,setShowZoom] = useState(false);
  const [featuredIndex,setFeaturedIndex] = useState(0);
  const [carouselPaused,setCarouselPaused] = useState(false);
  const [carouselHovered,setCarouselHovered] = useState(false);
  const [carouselFocused,setCarouselFocused] = useState(false);
  const [reducedMotion,setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [slideDirection,setSlideDirection] = useState('next');
  const [featuredImageFailed,setFeaturedImageFailed] = useState(false);
  const workspaceRef = useRef(null);
  const [mobileMenu,setMobileMenu] = useState(false);
  const featuredBike = bikes[featuredIndex];
  const carouselIsPaused = carouselPaused || carouselHovered || carouselFocused || reducedMotion;
  const [toast,setToast] = useState('');
  const inputRef = useRef(null);
  
  const toastRef = useRef(null);
  const bike = bikes.find(b=>b.id===build.bike) || bikes[0];
  const getBikePrice=(b)=>prices[priceKey('bike',b.id)]??publishedPrices[priceKey('bike',b.id)]??b.base;
  const getPartPrice=(cat,index)=>prices[priceKey('part',cat.id,index)]??publishedPrices[priceKey('part',cat.id,index)]??cat.options[index][1];
  const added=categories.filter(c=>(build.parts[c.id]||0)>0).map(c=>({...c,choice:[c.options[build.parts[c.id]][0],getPartPrice(c,build.parts[c.id])]}));
  const bikePrice=getBikePrice(bike);
  const upgradePrice=added.reduce((sum,c)=>sum+c.choice[1],0);
  const total=bikePrice+upgradePrice;
  const color = colors.find(c=>c.label===build.color) || colors[1];
  const chosenCoat = (build.parts.coat || 0)>0;
  const displayPhoto=userPhoto || bike.image;
  const showToast = (message) => {setToast(message);clearTimeout(toastRef.current);toastRef.current=setTimeout(()=>setToast(''),3300)};
  useEffect(()=>{try{localStorage.setItem('specx-build-v2',JSON.stringify(build));}catch{}},[build]);
  useEffect(()=>{try{localStorage.setItem('specx-prices-v3',JSON.stringify(prices));}catch{}},[prices]);
  useEffect(()=>{
    fetch('/prices.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(data=>{
      if(!data?.prices)return;
      const published={};
      for(const b of bikes){const n=data.prices.bikes?.[b.id];if(validPrice(n))published[priceKey('bike',b.id)]=Number(n);}
      for(const cat of categories){cat.options.forEach((_,index)=>{const n=data.prices.parts?.[cat.id]?.[index]?.price;if(validPrice(n))published[priceKey('part',cat.id,index)]=Number(n);});}
      setPublishedPrices(published);
    }).catch(()=>{});
  },[]);
  useEffect(()=>{
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReducedMotion(motion.matches);
    motion.addEventListener('change', update);
    return ()=>motion.removeEventListener('change', update);
  },[]);
  useEffect(()=>{
    if(carouselIsPaused)return;
    const interval=window.setInterval(()=>{
      if(document.visibilityState==='visible'){
        setSlideDirection('next');
        setFeaturedIndex(i=>(i+1)%bikes.length);
        setFeaturedImageFailed(false);
      }
    },5600);
    return ()=>window.clearInterval(interval);
  },[carouselIsPaused,featuredIndex]);
  function moveFeatured(direction){
    setSlideDirection(direction<0?'prev':'next');
    setFeaturedImageFailed(false);
    setFeaturedIndex(i=>(i+direction+bikes.length)%bikes.length);
  }
  function jumpFeatured(i){
    setSlideDirection(i<featuredIndex?'prev':'next');
    setFeaturedImageFailed(false);
    setFeaturedIndex(i);
  }
  function buildFeatured(){
    changeBike(featuredBike.id);
    setStep(1);
    window.setTimeout(()=>workspaceRef.current?.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'}),60);
  }
  useEffect(()=>()=>{clearTimeout(toastRef.current)},[]);
  useEffect(()=>()=>{if(userPhoto)URL.revokeObjectURL(userPhoto)},[userPhoto]);
  function changeBike(id){const selected=bikes.find(b=>b.id===id);if(!selected)return;setBuild(b=>({...b,bike:id}));setOpenBrand(selected.brand);setZoom(1);setPhotoFailed(false);setUserPhoto(null);}
  function selectOption(categoryId,index){setBuild(b=>({...b,parts:{...b.parts,[categoryId]:index}}));}
  function selectColor(label){setBuild(b=>({...b,color:label}));}
  function uploadPhoto(e){
    const f=e.target.files?.[0]; if(!f)return;
    if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>12*1024*1024){showToast('Choose a JPG, PNG or WebP image under 12 MB.');e.target.value='';return;}
    setUserPhoto(URL.createObjectURL(f));setPhotoFailed(false);setZoom(1);
    showToast('Your bike photo is loaded on this device only.');
    e.target.value='';
  }
  function resetPhoto(){setUserPhoto(null);setPhotoFailed(false);setZoom(1);}
  function resetBuild(){setBuild(defaults);setStep(0);setOpenBrand('SURRON');setOpenCat('pegs');setUserPhoto(null);setZoom(1);setPhotoFailed(false);showToast('New build started.');}
  function downloadBuild(){
    const lines=[
      'SPECX  /  BUILD SHEET', 'BUILD BEYOND LIMITS.', '─────────────────────────────────────────','',
      `BIKE             ${bike.brand} ${bike.model}`,`BASE ESTIMATE    ${money(bikePrice)}`,
      `FINISH IDEA      ${build.color}${chosenCoat?' (powder coat package selected)':' (visual reference only)'}`,'',
      'SELECTED UPGRADES',
      ...(added.length?added.map(c=>`${c.name.padEnd(19,' ')} ${c.choice[0]}   ${money(c.choice[1])}`):['None selected']),
      '','─────────────────────────────────────────',
      `UPGRADES         ${money(upgradePrice)}`,`TOTAL ESTIMATE   ${money(total)} AUD`,'',
      'Illustrative concept only. Locally edited prices may differ from retail. Photos and references do not visually apply parts. Confirm compatibility, installation, shipping, and legal requirements with suppliers. SpecX is independent from the brands mentioned.'
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
  function setCustomPrice(key,value){
    if(value==='') { setPrices(old=>{const next={...old};delete next[key];return next});return; }
    if(!validPrice(value)) return;
    setPrices(old=>({...old,[key]:Number(value)}));
  }
  function exportPriceSheet(){
    const sheet={version:1,createdAt:new Date().toISOString(),currency:'AUD',prices:{
      bikes:Object.fromEntries(bikes.map(b=>[b.id,getBikePrice(b)])),
      parts:Object.fromEntries(categories.map(c=>[c.id,c.options.map((o,i)=>({name:o[0],price:getPartPrice(c,i)}))]))
    }};
    const url=URL.createObjectURL(new Blob([JSON.stringify(sheet,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='prices.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast('prices.json downloaded. Replace public/prices.json on GitHub to publish for everyone.');
  }
  const filtered = bikes.filter(b=>(b.brand+' '+b.model).toLowerCase().includes(search.toLowerCase()));
  const steps=[{number:'01',label:'CHOOSE BIKE'},{number:'02',label:'CUSTOMISE'},{number:'03',label:'BUILD SHEET'}];
  return <div className="site-shell">
    <div className="starfield" aria-hidden="true"/><div className="planet-glow" aria-hidden="true"/>
    <header className="site-header">
      <div className="header-inner"><button type="button" className="brand-button" onClick={()=>setStep(0)} aria-label="SpecX home"><SpecXLogo/></button>
      <nav className={mobileMenu?'desktop-nav open':'desktop-nav'} aria-label="Primary navigation">
        <button onClick={()=>{setStep(0);setMobileMenu(false)}}>THE GARAGE</button><button onClick={()=>{setStep(1);setMobileMenu(false)}}>CUSTOMISER</button><button onClick={()=>{setShowPrices(true);setMobileMenu(false)}}>EDIT PRICES</button><a className="nav-tiktok" href="https://www.tiktok.com/@specxebikes" target="_blank" rel="noopener noreferrer">TIKTOK ↗</a>
      </nav>
      <div className="header-actions"><span className="online"><i/> SYSTEM ONLINE</span><button className="header-price" onClick={()=>setStep(2)}>{money(total)} <ArrowUpRight size={15}/></button><button className="menu-btn" aria-label="Toggle menu" onClick={()=>setMobileMenu(v=>!v)}>{mobileMenu?<X size={20}/>:<Menu size={20}/>}</button></div></div>
    </header>

    <main className="main-container">
      <div className="top-meta"><span><span className="crosshair-icon">✳</span> SPECX DESIGN LAB <span className="top-meta-muted">/ RELEASE 02.4 · SPACE EDITION</span></span><span className="meta-right">AUSTRALIA <span className="tiny-disc">●</span> PRICES IN AUD</span></div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-left"><div className="hero-tag"><span className="pulse-dot"/> YOUR MACHINE. YOUR UNIVERSE.</div><h1 id="hero-title">BUILD OUTSIDE<br/><span>THE ORDINARY<span className="hero-period">.</span></span></h1><p>Make it yours, down to the last detail. Choose a bike, explore the parts, and see your build come together.</p><span className="hero-hint">EXPLORE THE LINEUP <ArrowRight size={14}/></span></div>
        <div className="featured-carousel" role="region" aria-roledescription="carousel" aria-label="Featured electric bike models" onMouseEnter={()=>setCarouselHovered(true)} onMouseLeave={()=>setCarouselHovered(false)} onFocusCapture={()=>setCarouselFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setCarouselFocused(false)}}>
          <div className="featured-bar"><span><span className="featured-indicator"/> FEATURED MACHINES</span><button type="button" className="featured-pause" aria-label={carouselPaused?'Resume automatic bike slides':'Pause automatic bike slides'} aria-pressed={carouselPaused} onClick={()=>setCarouselPaused(v=>!v)}>{carouselPaused?'▶ PLAY':'Ⅱ PAUSE'}</button></div>
          <div className="featured-view" aria-live="off">
            <div key={featuredBike.id} className={'featured-slide slide-'+slideDirection}>
              <div className="featured-photo">
                {!featuredImageFailed?<CutoutImage src={featuredBike.image} alt={'Side-profile reference of '+featuredBike.brand+' '+featuredBike.model} onError={()=>setFeaturedImageFailed(true)}/>:<div className="featured-fallback"><Bike size={59} strokeWidth={1}/><span>PHOTO UNAVAILABLE</span></div>}
                <span className="featured-photo-label">0{featuredIndex+1} / {String(bikes.length).padStart(2,'0')}</span>
              </div>
              <div className="featured-details"><div><small>MODEL {featuredBike.number} · {featuredBike.type}</small><strong>{featuredBike.brand}</strong><span>{featuredBike.model}</span></div><button type="button" className="featured-build" onClick={buildFeatured} aria-label={'Customise '+featuredBike.brand+' '+featuredBike.model}>BUILD THIS BIKE <ArrowUpRight size={15}/></button></div>
            </div>
          </div>
          <div className="featured-controls"><div className="featured-dots" aria-label="Choose a featured bike">{bikes.map((b,i)=><button type="button" key={b.id} className={featuredIndex===i?'featured-dot active':'featured-dot'} aria-label={'Show '+b.brand+' '+b.model} aria-current={featuredIndex===i?'true':undefined} onClick={()=>jumpFeatured(i)}/>)}</div><div className="featured-arrows"><button type="button" aria-label="Previous bike" onClick={()=>moveFeatured(-1)}><ChevronLeft size={18}/></button><button type="button" aria-label="Next bike" onClick={()=>moveFeatured(1)}><ChevronRight size={18}/></button></div></div>
          <p className="featured-caption">Reference photographs · Images do not show selected custom parts</p>
        </div>
      </section>
      <div className="worktop-bar"><div><span className="worktop-square">▦</span> CONFIGURATOR <span className="worktop-muted">/ PERSONAL GARAGE</span></div><div className="worktop-counter"><span>PROJECT 001</span><span>◦</span><span>10 MACHINES AVAILABLE</span></div></div>

      <div className="workspace" ref={workspaceRef}>
        <section className="preview-column" aria-label="Bike preview">
          <div className="preview-top"><div className="preview-overline"><span className="preview-dot"/> SHOWROOM / 2D VIEW</div><div className="view-badges"><span><Camera size={13}/> BIKE REFERENCE</span><span className="badge-outline">SIDE PROFILE</span></div></div>
          <div className="photo-stage">
            <div className="photo-grid" aria-hidden="true"/><div className="photo-stage-title"><small>MACHINE / {bike.number.padStart(3,'0')}</small><strong>{bike.brand}<br/><span>{bike.model}</span></strong></div>
            <div className="photo-coordinate top-right">X / {bike.number} — 010</div>
            <div className="bike-image-wrap" key={bike.id+'-'+String(userPhoto)}>
              {!photoFailed?<CutoutImage className="bike-image" style={{transform:`scale(${zoom})`}} src={displayPhoto} alt={`Reference photo of ${bike.brand} ${bike.model}`} onError={()=>setPhotoFailed(true)}/>:<div className="no-photo"><ImageIcon size={43} strokeWidth={1}/><strong>PHOTO UNAVAILABLE</strong><p>The external image couldn't load. Upload your own photo to keep designing.</p><button onClick={()=>inputRef.current?.click()}><Upload size={15}/> UPLOAD PHOTO</button></div>}
            </div>
            <div className="photo-corner left-bottom"><span>REF / {bike.id.toUpperCase()}</span><span>STOCK / USER PHOTO</span></div>
            <div className="stage-zoom" aria-label="Photo zoom"><button onClick={()=>setZoom(z=>Math.max(1,+(z-.15).toFixed(2)))} aria-label="Zoom out"><Minus size={17}/></button><span>{Math.round(zoom*100)}%</span><button onClick={()=>setZoom(z=>Math.min(1.9,+(z+.15).toFixed(2)))} aria-label="Zoom in"><Plus size={17}/></button></div>
          </div>
          <div className="preview-footer">
            <div className="preview-note"><Info size={16}/><span>{userPhoto?'Your photo stays on this device. Nothing is uploaded to a server.':<>Reference photo, parts not visually applied. <a href={bike.source} target="_blank" rel="noopener noreferrer">Photo source ↗</a> · <a href={bike.site} target="_blank" rel="noopener noreferrer">{bike.siteLabel||'Brand website'} ↗</a></>}</span></div>
            <div className="preview-tools"><input ref={inputRef} type="file" accept="image/*" hidden onChange={uploadPhoto}/><button onClick={()=>inputRef.current?.click()} title="Use your own bike photo"><Upload size={15}/> <span>MY PHOTO</span></button>{userPhoto&&<button onClick={resetPhoto} title="Restore reference photo"><RotateCcw size={15}/></button>}<button onClick={()=>setShowZoom(true)} title="Full-screen preview" aria-label="Open large bike preview"><Maximize2 size={15}/></button></div>
          </div>
          <div className="finish-panel"><div className="finish-heading"><div><span className="micro">FINISH STUDIO <span>// 01</span></span><h3>Set the tone.</h3></div><span className="finish-sub">COLOUR INSPIRATION</span></div><div className="finish-row"><div className="finish-swatches">{colors.map(c=><button key={c.label} title={c.label} aria-label={c.label} aria-pressed={build.color===c.label} className={build.color===c.label?'swatch active':'swatch'} onClick={()=>selectColor(c.label)} style={{'--color':c.hex}}/>)}</div><span className="selected-color"><span className="colour-check" style={{background:color.hex}}/>{build.color}</span></div><div className="finish-tip">{chosenCoat?`Powder coating selected. ${build.color} is your finish reference; actual supplier colour may vary.`:'Colours are reference swatches only. Select powder coating in Customise to add its estimated cost.'}</div></div>
          <div className="quick-spec-row"><div><small>SELECTED MACHINE</small><strong>{bike.brand} <span>{bike.model}</span></strong></div><div><small>PARTS ADDED</small><strong>{String(added.length).padStart(2,'0')} <span>/ {String(categories.length).padStart(2,'0')}</span></strong></div><div><small>PROJECT TOTAL</small><strong>{money(total)}</strong></div></div>
        </section>
        <aside className="configurator" aria-label="Build configurator">
          <div className="config-top"><div className="config-heading"><span className="micro">SPECX / BUILD CONTROL</span><span className="config-status"><i/> ACTIVE SESSION</span></div><h2>Make it <span>yours.</span></h2><p>Every build starts with a choice.</p></div>
          <div className="progress-tabs">{steps.map((s,i)=><button key={i} className={step===i?'progress-tab active':'progress-tab'} onClick={()=>setStep(i)} aria-current={step===i?'step':undefined}><span>{s.number}</span><small>{s.label}</small></button>)}</div>
          <div className="config-content" key={step}>
            {step===0&&<><div className="section-title"><div><span className="micro muted-micro">STEP 01 / 03</span><h3>Choose your machine.</h3></div><span className="item-count">{String(bikes.length).padStart(2,'0')} MODELS</span></div><div className="search-wrap"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search bikes..." aria-label="Search bikes"/></div><div className="brand-list">{brandSites.map(group=>{
              const groupBikes=filtered.filter(b=>b.brand===group.brand);
              if(!groupBikes.length)return null;
              const isExpanded=search.trim()!=='' || openBrand===group.brand;
              return <div className={isExpanded?'brand-group expanded':'brand-group'} key={group.brand}>
                <div className="brand-header">
                  <button type="button" className="brand-toggle" onClick={()=>setOpenBrand(isExpanded && !search.trim()?'':group.brand)} aria-expanded={isExpanded}>
                    <span className="brand-name">{group.name}</span><span className="brand-count">{groupBikes.length} {groupBikes.length===1?'MODEL':'MODELS'}</span><ChevronDown size={16}/>
                  </button>
                  <a href={group.url} target="_blank" rel="noopener noreferrer" aria-label={'Visit '+group.name+' website'} title={group.desc}><ExternalLink size={15}/></a>
                </div>
                {isExpanded&&<div className="brand-models">{groupBikes.map(b=><button key={b.id} type="button" className={build.bike===b.id?'bike-choice chosen':'bike-choice'} onClick={()=>changeBike(b.id)}>
                  <div className="bike-thumb"><img loading="lazy" src={b.image} alt="" onError={e=>{e.currentTarget.style.display='none'}}/><Bike size={17} className="thumb-fallback"/></div>
                  <div className="bike-choice-details"><strong>{b.model}</strong><span>{b.type}</span></div>
                  <div className="bike-choice-right"><strong>{money(getBikePrice(b))}</strong>{build.bike===b.id?<span className="selected-check"><Check size={11}/></span>:<span className="choice-arrow"><ChevronRight size={16}/></span>}</div>
                </button>)}</div>}
              </div>
            })}{!filtered.length&&<p className="empty-search">No matching bikes. Try another search.</p>}</div><p className="inline-warning"><CircleHelp size={15}/> Prices are estimates. You can personalise them with Edit Prices.</p><button className="action-main" onClick={()=>setStep(1)}>CUSTOMISE THIS BIKE <ArrowUpRight size={18}/></button></>}
            {step===1&&<><div className="section-title"><div><span className="micro muted-micro">STEP 02 / 03</span><h3>The details matter.</h3></div><span className="item-count">{added.length} ADDED</span></div><p className="parts-intro">Choose one option per category. All prices update live.</p><div className="part-accordion">{categories.map((cat,i)=>{const Icon=cat.icon;const index=build.parts[cat.id]||0;return <div className={openCat===cat.id?'part-category expanded':'part-category'} key={cat.id}><button className="part-category-head" onClick={()=>setOpenCat(openCat===cat.id?'':cat.id)} aria-expanded={openCat===cat.id}><span className="part-icon"><Icon size={17}/></span><span className="part-text"><strong>{cat.name}</strong><small>{index?cat.options[index][0]:cat.subtitle}</small></span><span className="part-price">{index?`+${money(getPartPrice(cat,index))}`:'STANDARD'}</span><ChevronDown size={17} className="accordion-arrow"/></button>{openCat===cat.id&&<div className="option-list">{cat.options.map(([label,price],j)=><button key={j} className={index===j?'option-row chosen':'option-row'} onClick={()=>selectOption(cat.id,j)}><span className="option-radio"><Check size={11}/></span><span>{label}</span><strong>{getPartPrice(cat,j)?`+${money(getPartPrice(cat,j))}`:'INCLUDED'}</strong></button>)}<div className="fitment-note"><ShieldCheck size={14}/> Concept options only — check fitment with a qualified supplier.</div>{categorySites[cat.id]&&<div className="parts-site-links"><span>REFERENCE WEBSITES</span>{categorySites[cat.id].map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.name} <ExternalLink size={12}/></a>)}</div>}</div>}</div>})}</div><button className="action-main" onClick={()=>setStep(2)}>REVIEW BUILD <ArrowRight size={17}/></button></>}
            {step===2&&<><div className="section-title"><div><span className="micro muted-micro">STEP 03 / 03</span><h3>Your build sheet.</h3></div><span className="item-count">READY</span></div><div className="sheet-id">BUILD ID <strong>SX / {bike.number} / {String(added.length).padStart(2,'0')}</strong></div><div className="summary-bike"><div className="summary-thumb"><img src={bike.image} alt=""/></div><div><span>BASE MACHINE</span><strong>{bike.brand}</strong><small>{bike.model}</small></div><b>{money(bikePrice)}</b></div><div className="summary-heading">SELECTED UPGRADES <span>{added.length} TOTAL</span></div>{added.length?<div className="summary-list">{added.map(c=><div key={c.id}><span><small>{c.name}</small>{c.choice[0]}</span><b>+{money(c.choice[1])}</b></div>)}</div>:<div className="summary-empty">No upgrades selected yet. Your build includes the base bike only.</div>}<div className="summary-finish"><Paintbrush size={15}/> FINISH REFERENCE <strong>{build.color}</strong></div><div className="summary-pricing"><div><span>Bike</span><strong>{money(bikePrice)}</strong></div><div><span>Upgrades</span><strong>{money(upgradePrice)}</strong></div><div className="grand-total"><span>ESTIMATED TOTAL</span><strong>{money(total)}</strong></div></div><div className="summary-actions"><button className="action-alt" onClick={()=>setShowPrices(true)}><Pencil size={15}/> EDIT ESTIMATED PRICES</button><button className="action-main" onClick={downloadBuild}><Download size={17}/> DOWNLOAD BUILD SHEET</button><button className="action-alt" onClick={shareBuild}><Share2 size={16}/> COPY SHARE LINK</button><button className="reset-button" onClick={resetBuild}><RotateCcw size={14}/> START A NEW BUILD</button></div><p className="disclaimer">Estimate only, not a quote. Prices may include local edits in AUD. Part compatibility, installation, taxes, shipping and riding regulations must be checked independently.</p></>}
          </div>
          <div className="price-footer"><div><span>LIVE BUILD ESTIMATE <span className="aud-tag">AUD</span></span><strong>{money(total)}</strong><small>{added.length} upgrades selected · indicative pricing</small></div><div className="price-signal"><span>↗</span></div></div>
        </aside>
      </div>
      <section className="site-links" aria-labelledby="site-links-title">
        <div className="site-links-heading"><span className="micro">SPECX / RESOURCES</span><h2 id="site-links-title">Real brands. Real websites.</h2><p>Explore official manufacturer sites, Australian distributors and parts makers. External links open in a new tab. SpecX is independent and does not verify fitment or stock.</p></div>
        <div className="site-links-grid">{[...brandSites,...partSites].map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"><span>{s.name}</span><small>{s.desc}</small><ExternalLink size={17}/></a>)}</div>
      </section>
      <section className="bottom-banner"><div className="banner-icon"><img src="/specx-logo.webp" alt="SpecX moon logo" style={{width:48,height:48,objectFit:'cover',borderRadius:7}}/></div><div><span>DESIGNED TO BE DIFFERENT</span><h3>Every detail. One vision.</h3><p>SpecX is an independent concept builder. The photos are reference images; real build results and part compatibility depend on your bike and supplier.</p></div><button onClick={()=>setStep(1)}>EXPLORE UPGRADES <ArrowUpRight size={16}/></button></section>
      <footer><span className="footer-brand"><img src="/specx-logo.webp" alt="SpecX moon logo"/><span className="footer-logo">SPEC<span>X</span></span></span><span>THE ELECTRIC FRONTIER / EST. 2026</span><a className="footer-social" href="https://www.tiktok.com/@specxebikes" target="_blank" rel="noopener noreferrer">TIKTOK / @specxebikes <ArrowUpRight size={14}/></a><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>BACK TO TOP ↑</button></footer>
    </main>
    {showZoom&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Full-size bike photo" onClick={()=>setShowZoom(false)}><button className="lightbox-close" onClick={()=>setShowZoom(false)} aria-label="Close preview"><X size={23}/></button><div className="lightbox-image" onClick={e=>e.stopPropagation()}><CutoutImage src={displayPhoto} alt={`${bike.brand} ${bike.model}`}/></div><span>{bike.brand} / {bike.model} · REFERENCE PHOTO</span></div>}
    {showPrices&&<div className="price-modal-backdrop" onClick={()=>setShowPrices(false)} role="presentation"><section className="price-modal" role="dialog" aria-modal="true" aria-labelledby="prices-title" onClick={e=>e.stopPropagation()}><div className="price-modal-head"><div><span className="micro">SPECX / PRICING CONTROL</span><h2 id="prices-title">Edit your estimates.</h2><p>Change prices in AUD. Edits save in <strong>this browser</strong>. Export <strong>prices.json</strong> and replace the file on GitHub to publish them for everyone.</p></div><button className="modal-close" aria-label="Close price editor" onClick={()=>setShowPrices(false)}><X size={20}/></button></div><div className="price-modal-scroll"><h3>BASE BIKE PRICES</h3>{bikes.map(b=><label className="price-editor-row" key={b.id}><span>{b.brand}<small>{b.model}</small></span><div><span>AUD $</span><PriceField value={getBikePrice(b)} onPriceChange={value=>setCustomPrice(priceKey('bike',b.id),value)} label={`${b.brand} ${b.model} price`}/></div></label>)}<h3>UPGRADE PRICES</h3>{categories.map(c=><div className="price-edit-category" key={c.id}><h4>{c.name}</h4>{c.options.map(([label,price],i)=><label className="price-editor-row" key={i}><span>{label}</span><div><span>AUD $</span><PriceField value={getPartPrice(c,i)} onPriceChange={value=>setCustomPrice(priceKey('part',c.id,i),value)} label={`${label} price`}/></div></label>)}</div>)}</div><div className="price-modal-foot"><button className="price-reset" onClick={()=>{if(window.confirm('Reset all your custom prices to the demo defaults?'))setPrices({})}}><RotateCcw size={14}/> RESET ALL</button><button className="price-export" onClick={exportPriceSheet}><Download size={14}/> EXPORT / PUBLISH PRICES</button><button className="price-done" onClick={()=>setShowPrices(false)}>DONE <Check size={15}/></button></div></section></div>}
    {toast&&<div className="toast" role="status"><Check size={16}/>{toast}</div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
