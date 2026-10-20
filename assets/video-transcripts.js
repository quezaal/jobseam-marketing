(() => {
  'use strict';
  const notice = 'Machine-generated transcript. It may contain errors or omit context. Watch the original government video to confirm the message. This transcript is not an official record.';
  const allowed = value => {try {const url=new URL(value);return url.protocol==='https:'?url:null;}catch{return null;}};
  const create = (tag,text) => {const e=document.createElement(tag);if(text)e.textContent=text;return e;};
  const original = (url, text='Watch original government video ↗') => {const a=create('a',text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
  const stamp = seconds => {const s=Math.max(0,Math.floor(Number(seconds)||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
  // Combine short caption cues into readable paragraphs, retaining the first timestamp.
  const paragraphs = segments => {
    const result=[];let group=null;
    for(const segment of segments){
      if(typeof segment.text!=='string'||!Number.isFinite(segment.start))continue;
      if(!group)group={start:segment.start,text:''};
      group.text+=(group.text?' ':'')+segment.text.trim();
      const words=group.text.split(/\s+/).length;
      if(words>=70||(words>=25&&/[.!?]["’”']?$/.test(group.text))){result.push(group);group=null;}
    }
    if(group)result.push(group);
    return result;
  };
  let catalog;
  window.renderVideoTranscript = (item) => {
    const url=allowed(item.url);if(!url)return null;
    if(!item.video && !url.pathname.includes('/videos/'))return null;
    const box=create('details');box.className='video-transcript';
    const summary=create('summary','Read video transcript');box.append(summary);
    const warning=create('p',notice);warning.className='transcript-notice';box.append(warning,original(url.href));
    let loaded=false;
    box.addEventListener('toggle',async()=>{
      summary.textContent=box.open?'Collapse video transcript':'Read video transcript';
      if(box.open){
        document.querySelectorAll?.('.video-transcript[open]').forEach(other=>{if(other!==box)other.open=false;});
      }
      if(!box.open||loaded)return;loaded=true;
      const status=create('p','Loading transcript…');status.setAttribute('role','status');box.append(status);
      try{
        catalog ||= fetch('/assets/transcripts/index.json').then(r=>{if(!r.ok)throw Error();return r.json()}).catch(e=>{catalog=null;throw e});
        const entry=(await catalog).videos?.[url.href];
        if(!entry||entry.status!=='available'){status.textContent='Transcript unavailable. Please watch the original government video.';return;}
        if(!/^\/assets\/transcripts\/[a-f0-9]{20}\.json$/.test(entry.path))throw Error();
        const response=await fetch(entry.path);if(!response.ok)throw Error();const data=await response.json();
        if(data.source_url!==url.href||!Array.isArray(data.segments)||!data.segments.length)throw Error();
        if(data.method==='publisher-captions')warning.textContent='Transcript reproduced from publisher-provided captions. Captions may contain errors or omit context. Watch the original government video to confirm the message.';
        status.textContent='Transcript source: '+({'publisher-captions':'Publisher-provided captions','machine-captions':'Automatic video captions','machine-transcription':'Automatic audio transcription'}[data.method]||'Unverified transcript')+'.';
        const search=create('input');search.type='search';search.placeholder='Search this transcript';search.setAttribute('aria-label','Search this transcript');box.append(search);
        const content=create('div');content.className='transcript-segments';box.append(content);
        const video=allowed(data.video_url);
        const readable=paragraphs(data.segments);
        const render=()=>{
          content.replaceChildren();
          for(const segment of readable){
            if(typeof segment.text!=='string'||!Number.isFinite(segment.start))continue;
            if(!segment.text.toLowerCase().includes(search.value.toLowerCase()))continue;
            const p=create('p');
            if(video && ['www.youtube.com','youtube.com','youtu.be'].includes(video.hostname)){
              const at=new URL(video);at.searchParams.set('t',String(Math.floor(segment.start)));p.append(original(at.href,stamp(segment.start)+' ↗'));
            }else p.append(create('strong',stamp(segment.start)));
            p.append(create('span',' '+segment.text));content.append(p);
          }
          if(!content.children.length)content.append(create('p','No matching transcript text.'));
        };search.addEventListener('input',render);render();
      }catch{status.textContent='Transcript could not be loaded. Please watch the original government video.';loaded=false;}
    });
    return box;
  };
})();
