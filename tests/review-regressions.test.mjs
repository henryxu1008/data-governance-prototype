import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('reset clears session and reloads React providers',()=>{
 const s=read('src/demo/demo-session.mjs');
 assert.match(s,/sessionStorage\.removeItem\(key\)/);
 assert.match(s,/location\.reload\(\)/);
});
test('quality failure scenario uses the same stable option value and handler branch',()=>{
 const s=read('src/demo/GovernanceWorkspace.jsx');
 assert.match(s,/<option value="failure">预演失败场景<\/option>/);
 assert.match(s,/if\(scenario==='failure'\)/);
 assert.match(s,/useState\('normal'\)/);
});
