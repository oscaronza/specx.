/**
 * SpecX image generation — Vercel Node serverless function.
 * OPENAI_API_KEY and SPECX_PREVIEW_PASSCODE must be set in Vercel Environment Variables.
 * Never place the API key in main.jsx or commit it to GitHub.
 * Owner-only prototype. Add durable rate limiting / real authentication before public access.
 */
import { createHash, timingSafeEqual } from 'node:crypto';

export const config = { maxDuration: 60 };

const machines = {
  surron: 'Surron Light Bee X lightweight electric dirt bike',
  talaria: 'Talaria Sting R MX4 lightweight electric dirt bike',
  stark: 'Stark Varg EX full-sized electric motocross bike',
  eride: 'E Ride Pro SS 2.0 electric dirt bike',
  '79bike': '79 Bike Falcon M electric dirt bike',
  rtr: 'ETM RTR Sport electric pit bike',
  ridstar: 'Ridstar Q20 fat-tire electric bicycle'
};
const validColors = new Set(['Lunar white', 'Void black', 'Titanium', 'Ion silver', 'Mars red', 'Deep ocean', 'Desert sand']);
const ipCounter = new Map(); // Best-effort only; instances do not share memory.
const reply = (res,status,data) => res.status(status).setHeader('Cache-Control','no-store').setHeader('X-Content-Type-Options','nosniff').json(data);
function safeEqual(a,b){
  const x=createHash('sha256').update(String(a)).digest();
  const y=createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(x,y);
}
function isRateLimited(ip){
  const now=Date.now();
  for(const [k,v] of ipCounter){if(now-v.start>3600_000)ipCounter.delete(k);}
  const entry=ipCounter.get(ip);
  if(!entry){ipCounter.set(ip,{start:now,n:1});return false;}
  if(entry.n>=5)return true;
  entry.n++;
  return false;
}
export default async function handler(req,res){
  if(req.method!=='POST')return reply(res,405,{error:'Use POST to generate a preview.'});
  if(!process.env.OPENAI_API_KEY || !process.env.SPECX_PREVIEW_PASSCODE){
    return reply(res,503,{error:'AI is not configured yet. Set OPENAI_API_KEY and SPECX_PREVIEW_PASSCODE in Vercel → Settings → Environment Variables, then redeploy.'});
  }
  const origin=req.headers.origin;
  if(origin){
    try{if(new URL(origin).host!==req.headers.host)return reply(res,403,{error:'Requests must come from the SpecX website.'});}
    catch{return reply(res,403,{error:'Invalid origin.'});}
  }
  const length=Number(req.headers['content-length']||0);
  if(length>3_800_000)return reply(res,413,{error:'Photo is too large. Choose a smaller image.'});
  let body=req.body;
  if(typeof body==='string'){try{body=JSON.parse(body)}catch{return reply(res,400,{error:'Invalid request.'});}}
  if(!body || typeof body!=='object')return reply(res,400,{error:'Invalid request.'});
  if(!safeEqual(body.passcode||'',process.env.SPECX_PREVIEW_PASSCODE))return reply(res,401,{error:'Incorrect owner preview passcode.'});
  const rawIp=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
  if(isRateLimited(rawIp))return reply(res,429,{error:'Too many AI previews from this connection. Please try again later.'});
  if(!Object.hasOwn(machines,body.model))return reply(res,400,{error:'Choose a valid bike model.'});
  if(!validColors.has(body.color))return reply(res,400,{error:'Choose a valid colour.'});
  if(!Array.isArray(body.upgrades)||body.upgrades.length>15||body.upgrades.some(x=>typeof x!=='string'||x.length>110||/[^\p{L}\p{N}\s:.,+\-()/]/u.test(x))){
    return reply(res,400,{error:'Invalid upgrade selections.'});
  }
  const partPhoto=typeof body.partImage==='string' && body.partImage.length>0;
  if(partPhoto && !body.image)return reply(res,400,{error:'A bike photo is required when using a reference part photo.'});
  if(partPhoto && (body.partImage.length>1_500_000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(body.partImage)))return reply(res,400,{error:'Invalid part image.'});
  const hasPhoto=typeof body.image==='string' && body.image.length>0;
  if(hasPhoto && (body.image.length>2_900_000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(body.image))){
    return reply(res,400,{error:'Invalid uploaded image. Please upload a JPG or PNG again.'});
  }

  const additions = body.upgrades.length?body.upgrades.map(x=>`- ${x}`).join('\n'):'- Factory parts only';
  const prompt = [
    `Make one exceptionally photorealistic, high-end e-bike build concept based on a ${machines[body.model]}.`,
    hasPhoto?'Edit the first supplied photograph of the bike. Preserve the original exact bike angle, framing, silhouette, tyre count, wheels and identifiable bike proportions. Work as if this is an authentic part-installation photo.':'Create a clean full left-side profile photograph of this machine, entirely in frame, with correct proportions and clear view of the foot pegs and seat.',
    'Place the bike in a minimalist neutral off-white photography studio with soft grey shadows; avoid floating wheels, fake text, humans or rider, watermarks and fantasy sci-fi bike additions.',
    `Desired frame/powder-coat colour inspiration: ${body.color}. Only alter the painted finish if a frame powder-coating package has been selected; otherwise keep the reference stock finish.`,
    'Show the following selected modifications as plausibly fitted to this specific motorcycle. Accurately represent their location and scale where possible, especially foot pegs close to the rider foot position and any selected seat covers:',
    additions,
    partPhoto?'A second reference image shows a real aftermarket component. Use it for the visual appearance of that selected component, fitted at the correct scale and location. The first image is the bike.':'No extra component reference photo was provided.',
    'If an upgrade has not been selected, keep the factory equivalent. Do not invent other modifications. Keep the full bike unobstructed in a single side-profile shot.',
    'This is an illustrative concept: do not add captions, labels, explanatory text or logos to the image.'
  ].join('\n');
  const ctl=new AbortController();const timeout=setTimeout(()=>ctl.abort(),52000);
  try{
    const model=process.env.SPECX_IMAGE_MODEL||'gpt-image-2.5-flare';
    let endpoint,options;
    if(hasPhoto){
      const base64=body.image.split(',')[1];
      const bytes=Buffer.from(base64,'base64');
      if(bytes.length>2_200_000) return reply(res,413,{error:'Uploaded photo is too large.'});
      const form=new FormData();form.append('model',model);form.append('prompt',prompt);
      form.append('size','1536x1024');form.append('quality','medium');form.append('output_format','jpeg');
      form.append(partPhoto?'image[]':'image',new Blob([bytes],{type:'image/jpeg'}),'bike.jpg');
      if(partPhoto){
        const partBytes=Buffer.from(body.partImage.split(',')[1],'base64');
        form.append('image[]',new Blob([partBytes],{type:'image/jpeg'}),'part.jpg');
      }
      endpoint='https://api.openai.com/v1/images/edits';
      options={method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:form,signal:ctl.signal};
    }else{
      endpoint='https://api.openai.com/v1/images/generations';
      options={method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model,prompt,size:'1536x1024',quality:'medium',output_format:'jpeg',n:1}),signal:ctl.signal};
    }
    const result=await fetch(endpoint,options);
    const data=await result.json();
    if(!result.ok){
      const reason=String(data?.error?.message||'Provider rejected this request.').slice(0,250);
      return reply(res,502,{error:`Image provider: ${reason}`});
    }
    const encoded=data?.data?.[0]?.b64_json;
    if(typeof encoded!=='string'||!encoded.length)return reply(res,502,{error:'Image provider returned no image.'});
    return reply(res,200,{image:`data:image/jpeg;base64,${encoded}`});
  }catch(error){
    if(error?.name==='AbortError')return reply(res,504,{error:'Image creation took too long. Try again with a smaller reference photo.'});
    return reply(res,502,{error:'AI image service failed. Check your Vercel function logs and API access.'});
  }finally{clearTimeout(timeout);}
}
