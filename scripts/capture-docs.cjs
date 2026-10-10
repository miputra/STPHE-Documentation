// Capture real STPHE UI with temporary sample data. Save, delete, import, upload, rename, and generation requests are blocked.
// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('node:path');
const fs = require('node:fs');
fs.mkdirSync(path.join(__dirname, '../tests/evidence'), {recursive:true});
const base = process.env.ST_URL || 'http://localhost:8000';
const extension = '/scripts/extensions/third-party/prompt-folders/src/';
(async () => {
 const browser = await chromium.launch({headless:true, channel:'msedge'});
 const page = await browser.newPage({viewport:{width:1440,height:1500}, deviceScaleFactor:1});
 await page.route('**/api/**', route => {
  const p = new URL(route.request().url()).pathname;
  if (/save|delete|import|upload|rename|generate/.test(p)) return route.fulfill({json:{result:'Capture session: write blocked'}});
  return route.continue();
 });
 await page.goto(base);
 // SillyTavern's headless root can collapse to zero height, clipping fixed dialogs.
 await page.addStyleTag({content:'html { height: 100%; }'}); await page.locator('#pf-tree .pf-prompt-row').first().waitFor({timeout:15000}).catch(()=>{});
 await page.waitForTimeout(2000);
 await page.evaluate(async prefix => {
  const state=await import(prefix+'state.js'), native=await import(prefix+'native.js');
  const mod=await native.getOaiModule();
  const sample=[['main','Main instructions','Write a vivid, coherent story.'],['rain','Rain ambience','Describe rain tapping on the windows. <weather type="rain" intensity="gentle"/>'],['tavern','Tavern dialogue','Describe the tavern and its visitors. <location name="tavern"/>'],['thunder','Thunder','Describe distant thunder. <weather type="storm" intensity="strong"/>']];
  mod.oai_settings.prompts=sample.map(([identifier,name,content])=>({identifier,name,content,role:'system',system_prompt:false,marker:false,injection_position:0,injection_depth:4,injection_order:100,forbid_overrides:false}));
  for(const entry of mod.oai_settings.prompt_order) entry.order=sample.map(([identifier])=>({identifier,enabled:identifier!=='thunder'}));
  const s=state.settings();
  Object.assign(s,{folders:['Story','Story/Weather'],assignments:{rain:'Story/Weather',thunder:'Story/Weather',tavern:'Story'},order:{},collapsed:{},folderDisabled:{},folderSnapshot:{},promptDesired:{},excludedPrompts:{},excludedFolders:{},excludedAutoPrompts:{},excludedAutoFolders:{},promptTags:{rain:['Weather','Atmosphere'],tavern:['Location'],thunder:['Weather']},autoFilters:[],matchPresets:[],chatMatchPresets:[],filterGroups:{}});
  s.matchPresets=[{id:'weather',name:'Weather prompts',locked:false,scopePath:null,params:{type:'tag',text:'Weather'},target:'prompt',group:'Scenes/Weather'},{id:'tavern',name:'Tavern prompts',locked:true,scopePath:null,params:{type:'word',text:'tavern'},target:'prompt',group:'Scenes'}];
  s.filterGroups.matchPresets={folders:['Scenes','Scenes/Weather'],collapsed:{},disabled:{}};
  await native.forceNativeRerender();
  (await import(prefix+'render.js')).renderTree();
  Object.assign(document.querySelector('#pf-dock').style,{width:'720px',height:'470px',top:'30px'});
 },extension);
 await page.waitForTimeout(500);
 const shots=[];
 page.setDefaultTimeout(10000);
 async function shot(name,selector,end){if(end){const a=await page.locator(selector).first().boundingBox(),b=await page.locator(end).first().boundingBox();await page.screenshot({path:path.join(__dirname,'../docs/assets',name+'.png'),clip:{x:a.x,y:a.y,width:a.width,height:b.y+b.height-a.y+10}});shots.push(name);console.log('Captured '+name);return;} const loc=page.locator(selector).first();await loc.scrollIntoViewIfNeeded();await page.waitForTimeout(120);await loc.screenshot({path:path.join(__dirname,'../docs/assets',name+'.png')});shots.push(name);console.log('Captured '+name);}
 async function close(){await page.locator('body').click({position:{x:10,y:1490}});await page.evaluate(async p=>{(await import(p+'native.js')).closeOwnOverlays();(await import(p+'context-menu.js')).closeContextMenu()},extension)}
 async function openFilter(scope=null){await close();await page.evaluate(async ({p,scope})=>(await import(p+'bulk-match.js')).openBulkMatchModal(scope),{p:extension,scope});}
 await shot('screen-panel','#pf-dock');
 await shot('screen-toolbar','.pf-toolbar');
 await shot('screen-hierarchy','#pf-tree');
 await shot('screen-prompt-controls','.pf-prompt-row[data-identifier="rain"]');
 await page.locator('.pf-prompt-row[data-identifier="rain"]').click({modifiers:['Control']});
 await page.locator('.pf-prompt-row[data-identifier="thunder"]').click({modifiers:['Control']});
 await shot('screen-selection','#pf-tree');await page.evaluate(async p=>{const r=await import(p+'render.js');r.clearSelection();r.renderTree()},extension);
 await page.evaluate(async p=>{await (await import(p+'render.js')).setFolderMaster('Story/Weather',true)},extension); await shot('screen-muted','#pf-tree');
 await page.evaluate(async p=>{await (await import(p+'render.js')).setFolderMaster('Story/Weather',false)},extension);

 await page.locator('#pf-search').fill('Rain'); await shot('screen-search','.pf-body'); await page.locator('#pf-search').fill('');
 await page.locator('#pf-tree .pf-prompt-row [title="More actions"]').first().click(); await shot('screen-prompt-menu','.pf-context-menu');
 await page.locator('.pf-context-item').filter({hasText:/Delete/}).click();await shot('screen-delete','.pf-context-menu:last-child');await close();
 await page.locator('#pf-tree .pf-folder-row [title="More actions"]').last().click(); await shot('screen-folder-menu','.pf-context-menu'); await close();
 await page.locator('#pf-import-export').click(); await shot('screen-transfer-menu','.pf-context-menu'); await close();
 await page.locator('#pf-remove-all').click(); await shot('screen-remove-all','.pf-context-menu'); await close();
 await page.setViewportSize({width:800,height:500});await page.waitForTimeout(300);await page.evaluate(async p=>(await import(p+'native.js')).viewPrompt('rain','Rain ambience'),extension);await shot('screen-prompt-view','.pf-prompt-view-modal');await page.setViewportSize({width:1440,height:1500}); await close();
 await page.locator('#pf-preview').click(); await page.waitForTimeout(300); await shot('screen-preview','.pf-full-modal'); await close();
 await openFilter();
 for (const [type,value] of [['word','rain'],['regex','rain|thunder'],['regexValues','type="([^"]+)"'],['tag','Weather']]){
  await page.locator('#pf-bm-type').selectOption(type); await page.locator('#pf-bm-text').fill(value); await page.locator('#pf-bm-apply').click(); await page.waitForTimeout(250); await shot('screen-filter-'+type,'.pf-bm-modal','#pf-bm-hint');
 }
 await page.locator('#pf-bm-type').selectOption('xml'); await page.locator('#pf-bm-xml-block .pf-xp-tag').fill('weather');await page.locator('#pf-bm-xml-block .pf-xp-scan').click();
 await page.locator('#pf-bm-apply').click();await shot('screen-filter-xml','.pf-bm-modal','#pf-bm-hint');
 await shot('screen-presets','#pf-bm-preset-block');
 await openFilter('Story/Weather'); await shot('screen-filter-scope','.pf-bm-modal','#pf-bm-hint');
 await page.locator('#pf-bm-source').selectOption('chat'); await page.locator('#pf-bm-chat-type').selectOption('word');await page.locator('#pf-bm-chat-text').fill('tavern');await page.locator('#pf-bm-apply').click();await shot('screen-chat-filter','.pf-bm-modal','#pf-bm-chat-result');await shot('screen-chat-effect','#pf-bm-select-block');await shot('screen-chat-presets','#pf-bm-chat-preset-block');
 await page.locator('#pf-bm-chat-type').selectOption('xml');await page.locator('#pf-bm-chat-xml-block .pf-xp-tag').fill('location');await shot('screen-chat-xml','.pf-bm-modal','#pf-bm-chat-result');
 await close(); await page.locator('#pf-auto-filter').click();
 await page.locator('#pf-af-cond-type').selectOption('word');await page.locator('#pf-af-cond-text').fill('tavern');await page.locator('#pf-af-cond-depth').fill('4');await page.locator('#pf-af-name').fill('Tavern atmosphere');
 await page.locator('#pf-af-eff-type').selectOption('tag');await page.locator('#pf-af-eff-text').fill('Atmosphere');
 await shot('screen-auto-rule','#pf-af-overlay .pf-view-modal','#pf-af-hint');
 await page.evaluate(async p=>{(await import(p+'state.js')).settings().autoFilterDisabled=true},extension);await page.locator('#pf-af-submit').click();await shot('screen-auto-list','#pf-af-list');
 await close();await page.locator('#pf-auto-filter').click();
 await page.locator('#pf-af-eff-mode').selectOption('manual');await shot('screen-auto-manual','#pf-af-eff-manual-block');
 await page.locator('#pf-af-cond-type').selectOption('xml');await page.locator('#pf-af-cond-xml-block .pf-xp-tag').fill('location');await shot('screen-auto-xml','#pf-af-overlay .pf-view-modal','#pf-af-cond-depth');
 await close();
 await page.evaluate(async p=>(await import(p+'native.js')).openNativeEditor('rain'),extension);await page.waitForTimeout(500);
 await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(300);
 await shot('screen-editor','#completion_prompt_manager_popup');
 await page.locator('#completion_prompt_manager_popup_entry_form_close').click();
 await page.evaluate(async p=>(await import(p+'import-export.js')).restorePromptsFromImport({prompts:[{identifier:'rain-imported',name:'Rain ambience',content:'Describe heavy rain outside the tavern.',role:'system'}],prompt_order:[]}),extension);
 await shot('screen-conflicts','#pf-ic-overlay .pf-view-modal');await page.locator('#pf-ic-close').click();
 await page.locator('#extensions-settings-button .drawer-icon').click();await page.locator('#third_party_extension_button').click();
 await shot('screen-install','dialog[open]');
 fs.writeFileSync(path.join(__dirname,'../tests/evidence/capture-manifest.json'),JSON.stringify(shots,null,2));
 const guidePath=path.join(__dirname,'../docs/guide-content.json');
 const guides=JSON.parse(fs.readFileSync(guidePath,'utf8'));
 for(const guide of guides)for(const section of guide.sections){const shot=section.screenshot;if(!shot)continue;const bytes=fs.readFileSync(path.join(__dirname,'../docs/assets',shot[0]));shot[2]=bytes.readUInt32BE(16);shot[3]=bytes.readUInt32BE(20);}
 fs.writeFileSync(guidePath,JSON.stringify(guides,null,2)+'\n');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
