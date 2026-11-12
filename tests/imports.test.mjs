import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
const root='src/demo';
test('all local demo imports resolve',()=>{
 for(const file of readdirSync(root).filter(n=>/\.(jsx|mjs|js)$/.test(n))){
  const text=readFileSync(path.join(root,file),'utf8');
  for(const match of text.matchAll(/from\s+['"]([^'"]+)['"]/g)){
   const spec=match[1];if(!spec.startsWith('.'))continue;
   const target=path.resolve(root,path.dirname(file),spec);
   const fs=requireExists(target);
   assert.ok(fs, file+' missing '+spec);
  }
 }
});
function requireExists(file){
 const {existsSync}=requireFs();
 return [file,file+'.jsx',file+'.js',file+'.mjs',file+'.css'].some(existsSync);
}
function requireFs(){return fs;}
import * as fs from 'node:fs';
test('prototype host uses isolated demo state',()=>{
 const host=readFileSync('src/main.jsx','utf8');
 assert.match(host,/settingsInteractionDemo=\{true\}/);
 const app=readFileSync('src/demo/App.jsx','utf8');
 assert.match(app,/governanceRoutes/);
 assert.match(app,/location\.hash=key/);
});
