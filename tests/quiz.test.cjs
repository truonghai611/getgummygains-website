const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const app=fs.readFileSync(require('node:path').join(__dirname,'../assets/app.js'),'utf8');
function quiz(answers){
 const buttons=[];const result={innerHTML:'',classList:{add(){}},scrollIntoView(){}};
 for(const [q,choices] of Object.entries({'1':['home','onthego'],'2':['rarely','often'],'3':['yes','no'],'4':['yes','no']}))for(const v of choices){
  buttons.push({q,v,attrs:{},setAttribute(k,v){this.attrs[k]=v;},classList:{add(){},remove(){}},getAttribute(k){return k==='data-q'?q:v;},addEventListener(_,fn){this.click=fn;}});
 }
 const quiz={querySelectorAll(selector){const m=selector.match(/data-q="(\d)"/);return m?buttons.filter(b=>b.q===m[1]):buttons;}};
 const ctx={URL,URLSearchParams,Date,location:{pathname:'/',search:'',href:'https://getgummygains.com/'},sessionStorage:{getItem(){return null;},setItem(){}},addEventListener(){},document:{title:'Quiz test',referrer:'',head:{appendChild(){}},createElement(){return {};},querySelector(){return null;},querySelectorAll(){return [];},getElementById(id){return id==='quiz'?quiz:id==='quiz-result'?result:null;},addEventListener(){},documentElement:{scrollTop:0,scrollHeight:2000,clientHeight:800}}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(app,ctx);
 const choose=(q,v)=>buttons.find(b=>b.q===q&&b.v===v).click();
 answers.forEach((v,i)=>choose(String(i+1),v));return {result,choose,buttons,events:ctx.dataLayer};
}
for(const place of ['home','onthego'])for(const frequency of ['rarely','often'])for(const sugar of ['yes','no'])for(const electrolyte of ['yes','no']){
 test(`quiz respects preferences: ${place}/${frequency}/avoid-sugar:${sugar}/electrolytes:${electrolyte}`,()=>{
  const q=quiz([place,frequency,sugar,electrolyte]);
  const expected=sugar==='yes'?'/sugar-free-creatine-gummies':place==='onthego'?'/creatine-gummies-vs-stick-packs#travel':frequency==='often'?'/best-time-to-take-creatine-gummies#routine-example':'/creatine-gummies-vs-powder';
  assert.ok(q.result.innerHTML.includes('href="'+expected+'"'));assert.ok(!q.result.innerHTML.includes('trycreate.co'));
  assert.equal(q.events.filter(e=>e[1]==='quiz_complete').length,1);
 });
}
test('changing an earlier answer replaces the result and CTA',()=>{
 const q=quiz(['onthego','often','no','no']);assert.ok(q.result.innerHTML.includes('/creatine-gummies-vs-stick-packs#travel'));
 q.choose('3','yes');assert.ok(q.result.innerHTML.includes('/sugar-free-creatine-gummies'));assert.ok(!q.result.innerHTML.includes('href="/creatine-gummies-vs-stick-packs#travel"'));
});

test('quiz exposes one pressed option per answered question',()=>{const q=quiz(['home','rarely','no','no']);q.choose('1','onthego');for(const n of ['1','2','3','4'])assert.equal(q.buttons.filter(b=>b.q===n&&b.attrs['aria-pressed']==='true').length,1);});
