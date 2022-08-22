'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "9b325b859d0f2d3ca780a716c8dcedd0",
"assets/assets/image/1.png": "f618bfa2aaf323a636e815c279ff37f2",
"assets/assets/image/1_1.png": "7a0d9a7c3feab6693710b076f1b23db3",
"assets/assets/image/1_2.png": "8fe1e0e63cc2c546f4899f3583c29287",
"assets/assets/image/1_3.png": "3540c9cfeb4646c98e728acb5c3e5d33",
"assets/assets/image/1_5.png": "5f3698ac5b4ac574d52e9f4e432b251f",
"assets/assets/image/1_6.png": "bc29517c69b046372574786691b81d7a",
"assets/assets/image/1_7.png": "f6fb494089e63fd5e5b3131c8287d058",
"assets/assets/image/1_8.png": "5e9bf467a764057c767d734d9f28d763",
"assets/assets/image/1_9.png": "9378e1c8b1db6371807461184109295d",
"assets/assets/image/2.png": "8a7f64ec50843e51e519795a9b84043d",
"assets/assets/image/adelina.png": "811edf52a581bc12225a4a8cc7323587",
"assets/assets/image/halim.png": "b0c47e7268866f4064c03b8d1a3f0820",
"assets/assets/image/hasan.png": "4fbfb43667985d8f0c6b3bb4a5184c30",
"assets/assets/image/login.png": "678929074a5f65656d013674d82991ff",
"assets/assets/image/murat.png": "9fb89294a1559d8cd51ce05ae05cee7e",
"assets/assets/image/of.png": "ed0352f8edc74a5b0ab50bfecac925ff",
"assets/assets/image/on.png": "d8914f727f8f911f1e3e97dc66f4eecc",
"assets/assets/image/page3.png": "e70954a8b1f405f124d9b1b18727cba5",
"assets/assets/image/page4.png": "77fe0d44a80ec832b173e33ea89f17f0",
"assets/assets/image/page5.png": "6f5dfac5b445c00d7b708b5a493c04c1",
"assets/assets/image/page6.png": "d5a8dcd43887f6d75afe7a870d94dce2",
"assets/assets/image/pw1_1.png": "8cb9e07a2479bcf40d8a267f8c581112",
"assets/assets/image/pw2.png": "dc1408b3e99f8804c6b72e687d65883c",
"assets/assets/image/pw2_1.png": "8a7f64ec50843e51e519795a9b84043d",
"assets/assets/image/sag.png": "7d3824ab632182e215ad9d3b6f4b92ec",
"assets/assets/image/sc3.png": "885c7e33c2204975dc13e5921fff2fa9",
"assets/assets/image/schome2.png": "cab27cc3763d086a29f24ff45fc21cf9",
"assets/assets/image/singup.png": "951b9d15f73fe164a6e8cddd2796a0aa",
"assets/assets/image/sol.png": "a2cb3380b0db2e351d64714ebf97a52d",
"assets/assets/image/uygar.png": "ccf8b50b81ba2ac8e10128ccb0084ebc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "a8bff065396fe1f459f1b52186c4f80c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "62b9906717d7215a6ff4cc24efbd1b5c",
"canvaskit/canvaskit.wasm": "b179ba02b7a9f61ebc108f82c5a1ecdb",
"canvaskit/profiling/canvaskit.js": "3783918f48ef691e230156c251169480",
"canvaskit/profiling/canvaskit.wasm": "6d1b0fc1ec88c3110db88caa3393c580",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "900f63d3430ee54d0309d7bf8ab3a672",
"/": "900f63d3430ee54d0309d7bf8ab3a672",
"main.dart.js": "5c318394fcf99dff9c82e4fdd98d112b",
"manifest.json": "21c8650a6539c1d56caca2ab3acd0e25",
"version.json": "36f59baa23955b6a74e1fa33e0185940"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
