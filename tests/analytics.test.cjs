const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync(require('node:path').join(__dirname,'../assets/app.js'),'utf8');
function load({referrer='',search='',path='/best-creatine-gummies-2026',store=new Map(),blocked=false}={}) {
 const listeners={};
 const ctx={URL,URLSearchParams,Date,console,location:{pathname:path,search,href:'https://getgummygains.com'+path+search},
 sessionStorage:{getItem(k){if(blocked)throw Error('blocked');return store.get(k)||null;},setItem(k,v){if(blocked)throw Error('blocked');store.set(k,v);}},
 document:{referrer,title:'Test page',head:{appendChild(){}},createElement(){return {};},querySelector(){return null;},querySelectorAll(){return [];},getElementById(){return null;},addEventListener(n,f){listeners[n]=f;},documentElement:{scrollTop:0,scrollHeight:2000,clientHeight:800}},
 addEventListener(){},scrollY:0};
 ctx.window=ctx;vm.createContext(ctx);vm.runInContext(app,ctx);
 function click(href='https://trycreate.co/15-9KD',attrs={}) {
  const a={href,textContent:'Offer',getAttribute(k){return attrs[k]||null;},closest(sel){return sel==='a[href]'?a:null;}};
  listeners.click({target:{closest(){return a;}}});
 }
 return {ctx,click,events:()=>ctx.dataLayer.filter(x=>x[0]==='event'),outbound:()=>ctx.dataLayer.filter(x=>x[1]==='affiliate_outbound_click')};
}
test('ChatGPT source, UTM and landing page persist on internal navigation',()=>{
 const store=new Map();load({referrer:'https://chatgpt.com/',search:'?utm_source=chatgpt.com&utm_campaign=research',store});
 const b=load({referrer:'https://getgummygains.com/best-creatine-gummies-2026',path:'/create-creatine-gummies-review',store});b.click();
 const e=b.outbound()[0][2];assert.equal(e.traffic_source,'chatgpt');assert.equal(e.is_chatgpt_referral,'yes');assert.equal(e.utm_campaign,'research');assert.equal(e.landing_page,'/best-creatine-gummies-2026');
 assert.equal(b.events().filter(x=>x[1]==='chatgpt_referral_landing').length,0);
});
test('storage blocked does not break affiliate tracking',()=>{const b=load({blocked:true});b.click();assert.equal(b.outbound().length,1);});
test('dynamically created quiz link emits exactly one event with its ID',()=>{const b=load();b.click('https://trycreate.co/15-9KD',{'data-link-id':'quiz-adherence','data-cta-position':'quiz_result'});assert.equal(b.outbound().length,1);assert.equal(b.outbound()[0][2].link_id,'quiz-adherence');assert.equal(b.outbound()[0][2].cta_position,'quiz_result');});
test('official source links and lookalike hosts are not affiliate clicks',()=>{const b=load();b.click('https://trycreate.co/products/creatine-monohydrate-gummies');b.click('https://trycreate.co.example.com/15-9KD');b.click('https://example.com/?next=trycreate.co');assert.equal(b.outbound().length,0);});
test('new external source replaces previous attribution',()=>{const store=new Map();load({referrer:'https://chatgpt.com/',store});const b=load({referrer:'https://www.google.com/search',store});b.click();assert.equal(b.outbound()[0][2].traffic_source,'www.google.com');assert.equal(b.outbound()[0][2].is_chatgpt_referral,'no');});
test('stale context expires after inactivity',()=>{const store=new Map([['gg_attribution_v2',JSON.stringify({updatedAt:Date.now()-31*60*1000,context:{traffic_source:'chatgpt'}})]]);const b=load({store});b.click();assert.equal(b.outbound()[0][2].traffic_source,'direct');});
test('explicit campaign overrides prior internal context',()=>{const store=new Map();load({referrer:'https://chatgpt.com/',store});const b=load({referrer:'https://getgummygains.com/',search:'?utm_source=youtube&utm_campaign=test',store});b.click();assert.equal(b.outbound()[0][2].traffic_source,'youtube');});
test('outbound event does not copy URL query parameters',()=>{const b=load();b.click('https://trycreate.co/15-9KD?q=quiz');assert.equal(b.outbound()[0][2].link_url,'https://trycreate.co/15-9KD');});
test('Instagram bio source persists from Maya to affiliate page',()=>{
 const store=new Map();load({path:'/maya',search:'?utm_source=ig&utm_medium=social&utm_campaign=maya_labels&utm_content=link_in_bio',store});
 const b=load({path:'/create-creatine-gummies-review',referrer:'https://getgummygains.com/maya',store});b.click();const e=b.outbound()[0][2];assert.equal(e.traffic_source,'instagram');assert.equal(e.utm_campaign,'maya_labels');assert.equal(e.landing_page,'/maya');
});
test('Maya topic click is separate from merchant outbound',()=>{const b=load({path:'/maya',search:'?utm_source=youtube'});b.ctx.location.origin='https://getgummygains.com';b.click('https://getgummygains.com/creatine-dose-calculator',{'data-hub-topic':'dose-math'});assert.equal(b.outbound().length,0);const e=b.events().find(x=>x[1]==='social_hub_click');assert.equal(e[2].hub_topic,'dose-math');assert.equal(e[2].traffic_source,'youtube');});
test('legacy ChatGPT referrer is recognized',()=>{const b=load({referrer:'https://chat.openai.com/'});b.click();assert.equal(b.outbound()[0][2].traffic_source,'chatgpt');});
