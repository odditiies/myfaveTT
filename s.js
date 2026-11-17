const t=new BroadcastChannel("myfaveTT"),e=new BroadcastChannel("params-guard");let n,i;const r=new WeakMap,o=new WeakMap,a=new WeakMap,s=new WeakMap,c=new WeakMap;let u={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return o.get(t);if("objectStoreNames"===e)return t.objectStoreNames||a.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return d(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function l(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(h(this),e),d(r.get(this))}:function(...e){return d(t.apply(h(this),e))}:function(e,...n){const i=t.call(h(this),e,...n);return a.set(i,e.sort?e.sort():[e],d(i)}}function f(t){return"function"==typeof t?l(t):(t instanceof IDBTransaction&&function(t){if(o.has(t))return;const e=new Promise(((e,n)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{e(),i()},o=()=>{n(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)}));o.set(t,e)}(t),e=t,(n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,u):t);var e}function d(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,n)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{e(d(t.result)),i()},o=()=>{n(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)}));return e.then((e=>{e instanceof IDBCursor&&r.set(e,t)})).catch((()=>{})),c.set(e,t),e}(t);if(s.has(t))return s.get(t);const e=f(t);return e!==t&&(s.set(t,e),c.set(e,t)),e}const h=t=>c.get(t);const w=["get","getKey","getAll","getAllKeys","count"],y=["put","add","delete","clear"],p=new Map;function m(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(p.get(e))return p.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=y.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!r&&!w.includes(n))return;const o=async function(t,...e){const o=this.transaction(t,r?"readwrite":"readonly");let a=o.store;return i&&(a=a.index(e.shift())),(await Promise.all([a[n](...e),r&&o.done]))[0]};return p.set(e,o),o}u=(t=>({...t,get:(e,n,i)=>m(e,n)||t.get(e,n,i),has:(e,n)=>!!m(e,n)||t.has(e,n)}))(u);const v={t:function(t,e,{blocked:n,upgrade:i,blocking:r,terminated:o}={}){const a=indexedDB.open(t,e),s=d(a);return i&&a.addEventListener("upgradeneeded",(t=>{i(d(a.result),t.oldVersion,t.newVersion,d(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),s.then((t=>{o&&t.addEventListener("close",(()=>o())),r&&t.addEventListener("versionchange",(()=>r()))})).catch((()=>{})),s}("myfaveTT",2,{upgrade(t,e,n,i){switch(e){case 0:t.createObjectStore("likesCache"),t.createObjectStore("followingCache");case 1:t.createObjectStore("misc")}}})},g={i:async t=>(await v.t).get("misc",t),o:async(t,e)=>(await v.t).put("misc",e,t)},k="chrome-extension://gmajiifkcmjkehmngbopoobeplhoegad";function b(t,e){}const _=b;function T(t,e){}function S(t,e,n){}async function $(t,e){try{const n=e.split("/"),i=n.pop();let r=t;for(const t of n)r=await r.getDirectoryHandle(t,{create:!0});return await r.getFileHandle(i,{create:!0})}catch(t){throw t}}async function E(t,e){const n=await t.createWritable();await n.write(e),await n.close()}const C={schemaVersion:1,user:{uid:"",id:"",uniqueId:"",nickname:""},authors:{},videos:{},likes:{downloadStatus:"unset",officialList:[],downloaded:new Set,lastRun:{collect:0,download:0}},following:{officialAuthorList:new Set,started:new Set,notInterested:new Set,downloadLog:{},lastRun:{}}};function D(t){return e=function(t){return JSON.stringify(t,(function(t,e){return e instanceof Set?[...e]:"string"==typeof e?e.replaceAll("`","背𓄹剃").replaceAll("${","⑀⦃"):e}))}(t),"db=String.raw`{}`;".slice(0,"db=String.raw`{}`;".indexOf("{"))+e+"db=String.raw`{}`;".slice("db=String.raw`{}`;".lastIndexOf("}")+1);var e}function x(t){return""===t?C:function(t){const e=JSON.parse(t,(function(t,e){switch(t){case"downloaded":case"notInterested":case"started":case"officialAuthorList":if(Array.isArray(e))return new Set(e)}return"string"==typeof e?e.replaceAll("⑀⦃","${").replaceAll("背𓄹剃","`"):e}));for(const[t,n]of Object.entries(e.following.downloadLog))e.following.downloadLog[t]=new Set(n);return e}(function(t){const e=t.indexOf("{"),n=t.lastIndexOf("}")-t.length+1;return t.slice(e,n)}(t))}

function cleanVideoTitle(desc) {
    if (!desc) return "TikTok Audio";
    return desc.replace(/#\S+/g, "").trim() || "TikTok Audio";
}

function getAudioFileName(item) {
    const videoTitle = cleanVideoTitle(item.desc);
    const audioTitle = (item.music && item.music.title) ? item.music.title : "Original Sound";
    return `${videoTitle} - ${audioTitle}`.replace(/[<>:"/\\|?*]/g, "");
}

const I=new class{constructor(){this.u=null,this.l=C}async h(t,e){this.u=t,this.l=e||C;g.o("archiveFolderHandle",t)}async p(){try{E(await $(this.u,"data/.appdata/db.js"),D(this.l))}catch(t){}}async m(t){try{const{archiveHtml:e,appJs:n}=t;E(await $(this.u,"Archive.html"),e),E(await $(this.u,"data/.appdata/app.js"),n)}catch(t){}}v(t){}async g(t){}},j={k(t,e){}};let O=0;function A(){return 1000}const B={};async function M(){const t=[];Object.entries(B).forEach((async([e,n])=>{const{createTime:i,cover:r,video:o}=n;if(Boolean(r&&o))t.push(async function(t){const{startWritingToDiskTime:n,key:i,likedOrFollowing:r,itemData:item,cover:s,video:c}=t;if(0!==n){return Date.now()-n<1e4?void 0:delete B[i]}t.startWritingToDiskTime=Date.now();try{const folderPath="liked"===r?"data/Likes":`data/Following/${item.author.id}`,coverPath=`${folderPath}/covers/${item.id}.jpg`,audioPath=`${folderPath}/audios/${getAudioFileName(item)}.mp3`,f=$(I.u,coverPath).then((t=>E(t,s))),d=$(I.u,audioPath).then((t=>E(t,c)));if(await Promise.all([f,d]),"following"===r){const t=I.l.following.downloadLog;t[e=item.author.id]||(t[e]=new Set),t[item.author.id].add(item.id)}else{I.l.likes.downloaded.add(item.id)}try{chrome.runtime.sendMessage({type:"progress_update",found:Object.keys(I.l.videos).length,downloaded:I.l.likes.downloaded.size,status:"Downloading..."});}catch(err){}}catch(t){}finally{delete B[i]}}(n));else{Date.now()-i>1e5&&delete B[e]}})),t.length&&(await Promise.allSettled(t),await I.p())}const L=new class{addNew(t){B[t.key]=t,O=Object.keys(B).length}_(t,e){B[t]&&(B[t].cover=e,M())}T(t,e){B[t]&&(B[t].size=e)}S(t,e){B[t]&&(B[t].video=e,M())}$(t){B[t]&&delete B[t]}};function ct(t){if(!t)return {};const e={id:t.id,desc:t.desc||"",createTime:t.createTime,music:t.music||{}};const videoObj=t.video||t.videoData||{};e.video={id:videoObj.id||t.id,cover:videoObj.cover||(videoObj.originCover&&videoObj.originCover.url_list?videoObj.originCover.url_list[0]:""),playAddr:videoObj.playAddr||(videoObj.bitrateInfo&&videoObj.bitrateInfo[0]&&videoObj.bitrateInfo[0].play_addr?videoObj.bitrateInfo[0].play_addr.url_list[0]:"")};e.author=t.author||{id:"unknown",uniqueId:"unknown"};return e}

class Ut{constructor(t,e){this.X=t,this.Y=e,this.Z=this.X.id+this.Y}get tt(){return false}get et(){return false}nt(){return false}async it(){L.addNew({createTime:Date.now(),startWritingToDiskTime:0,key:this.Z,likedOrFollowing:this.Y,itemData:this.X}),await this.Nt(),await this.Ft()}rt(){try{I.l.videos[this.X.id]={authorId:this.X.author.id,desc:this.X.desc};}catch(t){}}async Nt(){try{const t=await fetch(this.X.video.cover),n=await t.arrayBuffer();L._(this.Z,n)}catch(t){L.$(this.Z)}}async Ft(){try{const audioUrl=(this.X.music&&(this.X.music.playUrl||(this.X.music.play_url&&this.X.music.play_url.url_list[0])))||null;if(!audioUrl)throw new Error("audio URL not found");const t=await fetch(audioUrl),n=await t.arrayBuffer();L.S(this.Z,n)}catch(t){L.$(this.Z)}}}

async function handleCapturedItems(itemList) {
    if (!itemList || !Array.isArray(itemList)) return;
    for (const rawItem of itemList) {
        const item = ct(rawItem);
        if (item && item.id) {
            I.l.videos[item.id] = item;
            const utObj = new Ut(item, bt.W || "liked");
            utObj.rt();
            await utObj.it();
        }
    }
    try {
        chrome.runtime.zIndex || chrome.runtime.sendMessage({
            type: "progress_update",
            found: Object.keys(I.l.videos).length,
            downloaded: I.l.likes.downloaded.size,
            status: "Downloading captured audios..."
        });
    } catch(err) {}
}

// Listen for network payload captures from TikTok page script
window.addEventListener("message", async (event) => {
    if (event.source !== window) return;
    if (event.data && event.data.type === "tiktok_intercepted_data") {
        await handleCapturedItems(event.data.itemList);
    }
});

const Ce=new class{async St(){const t=await g.i("archiveFolderHandle");let folder=t;if(!folder){folder=await showDirectoryPicker();}await I.h(folder,I.l);try{chrome.runtime.sendMessage({type:"progress_update",found:Object.keys(I.l.videos).length,downloaded:I.l.likes.downloaded.size,status:"Ready. Scroll your TikTok Likes/Page!"});}catch(err){}}async $t(){const folder=await showDirectoryPicker();await I.h(folder,I.l);}};

// Local message listener for popup buttons & folder picker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "start_likes" || request.type === "start_following") {
        bt.W = request.type === "start_likes" ? "liked" : "following";
        if (I.u) {
            try{chrome.runtime.sendMessage({type:"progress_update",found:Object.keys(I.l.videos).length,downloaded:I.l.likes.downloaded.size,status:"Ready. Scroll your TikTok page!"});}catch(e){}
        } else {
            Ce.St().catch(() => Ce.$t());
        }
        sendResponse({ status: "started" });
    }
    return true;
});