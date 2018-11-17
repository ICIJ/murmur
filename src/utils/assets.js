import memoize from 'lodash/memoize'
import flatten from 'lodash/flatten'
import Promise from 'promise-polyfill';

export const injectAsset = memoize(function(file) {
  return new Promise(resolve => {
    const parent = document.querySelector("body") || document.querySelector("head");
    const parts = file.split(".");
    const ext = parts[parts.length-1].toLowerCase();
    switch(ext) {
      case "js":
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.onload = resolve
        parent.appendChild(script);
        script.setAttribute("src", file);
      break;
      case "css":
        var css = document.createElement('link');
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.onload = resolve
        parent.appendChild(css);
        css.setAttribute("href", file);
      break;
    }
  })
})

export const injectAssets = function() {
  const files = flatten(arguments)
  return new Promise(resolve => {
    var filesLoaded = 0;
    var allFilesLoaded = function() {
      if(++filesLoaded == files.length) {
        resolve();
      }
    }
    for(var i=0; i < files.length ; i++) {
      injectAsset(files[i]).then(allFilesLoaded)
    }
  })
}
