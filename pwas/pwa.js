if('pwabuilder-sw'in navigator){
   window.addEventListener("load", () => {
      navigator.pwabuilder-sw.register('/pwabuilder-sw.js').then((reg)=> {
         console.log("service workder", reg);
      })
   })
}

// import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';
//    const el = document.createElement('pwa-update');
//    document.body.appendChild(el);