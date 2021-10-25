// if('pwabuilder-sw'in navigator){
//    window.addEventListener("load", () => {
//       navigator.pwabuilder-sw.register('/pwabuilder-sw.js').then((reg)=> {
//          console.log("service workder", reg);
//       })
//    })
// }

// import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';
//    const el = document.createElement('pwa-update');
//    document.body.appendChild(el);

import "./sw";

if ('serviceWorker' in navigator) {
   try{
    navigator.serviceWorker.register("sw.js");
    console.log("SW registered");
   }catch(err){
    console.log("pwa service workder에러:", err);
   }

  }