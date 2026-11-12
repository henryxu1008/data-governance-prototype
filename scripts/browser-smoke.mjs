import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const port=4179;
const base='http://127.0.0.1:'+port+'/data-governance-prototype/';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe',env:{...process.env,GITHUB_PAGES:'true'}});
const errors=[];const diagnostics=[];
const wait=async()=>{for(let i=0;i<60;i++){try{const r=await fetch(base);if(r.ok)return}catch{}await new Promise(r=>setTimeout(r,500))}throw Error('preview did not start')};
let browser;
try{
 await wait();browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')diagnostics.push('console: '+m.text())});
 page.on('requestfailed',req=>diagnostics.push('requestfailed: '+req.url()+' '+req.failure()?.errorText));
 page.on('response',res=>{if(res.status()>=400)diagnostics.push('HTTP '+res.status()+' '+res.url())});
 const requests=[];page.on('request',req=>{const url=new URL(req.url());if(url.origin!==new URL(base).origin||url.pathname.includes('/api/'))requests.push(req.url())});
 await page.goto(base,{waitUntil:'networkidle'});
 console.log('initial diagnostics',JSON.stringify({url:page.url(),errors,body:(await page.locator('body').innerText()).slice(0,900),html:(await page.locator('body').innerHTML()).slice(0,1100),diagnostics}));
 const settings=page.getByRole('button',{name:'系统设置'}).first();
 if(await settings.count()===0){throw new Error('Settings button missing; diagnostics='+JSON.stringify(diagnostics)+'; browser errors='+JSON.stringify(errors)+'; body='+JSON.stringify((await page.locator('body').innerText()).slice(0,1200))+'; url='+page.url())}
 await settings.click({timeout:5000});
 assert.match(await page.locator('main').innerText(),/系统设置|平台管理|成员|组织/);
 for(const hash of ['home','develop','manage','assets','quality-list','settings','agent-workbench','agent-task']){
  await page.goto(base+'#'+hash,{waitUntil:'networkidle'});
  assert.ok((await page.locator('main').innerText()).trim().length>40,'empty page '+hash);
  assert.equal(new URL(page.url()).pathname,'/data-governance-prototype/');
 }
 await page.reload({waitUntil:'networkidle'});
 assert.ok((await page.locator('main').innerText()).length>40);
 assert.deepEqual(errors,[],'browser exceptions');
 assert.deepEqual(requests,[],'unexpected network or API requests');
 console.log('PASS: routes, refresh, no page errors, no external/API requests');
}finally{await browser?.close();server.kill('SIGTERM')}
