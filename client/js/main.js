"use strict";var newMap,restaurants=void 0,neighborhoods=void 0,cuisines=void 0,markers=[];document.addEventListener("DOMContentLoaded",function(e){initMap1(),fetchNeighborhoods(),fetchCuisines()});var fetchNeighborhoods=function(){DBHelper.fetchNeighborhoods(function(e,t){e?console.error(e):(console.log(t),self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},fetchCuisines=function(){DBHelper.fetchCuisines(function(e,t){e?console.error(e):(console.log(t),self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.cuisines,n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},initMap1=function(){self.newMap=L.map("map",{center:[40.722216,-73.987501],zoom:12,scrollWheelZoom:!1}),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1IjoiZnJhbmNpc2Nvamd0eiIsImEiOiJjamlzOHRncjEwbHU4M3ByeTdpenN5M3YwIn0.y1U7z4RQa0J58bhLtiYlqg",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(newMap),setTimeout(function(){newMap.invalidateSize()},400),updateRestaurants()},updateRestaurants=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,r=e[n].value,o=t[a].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,o,function(e,t){e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers&&self.markers.forEach(function(e){return e.remove()}),self.markers=[],self.restaurants=e},fillRestaurantsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(createRestaurantHTML(e))}),addMarkersToMap()},createRestaurantHTML=function(e){var t=document.createElement("li"),n=document.createElement("img"),a=document.createElement("picture"),r=document.createElement("source"),o=document.createElement("source");n.className="restaurant-img",n.className="lazyload",n.setAttribute("data-sizes","auto"),n.alt=e.name+" restaurant, "+e.photo_description;var s=DBHelper.imageUrlForRestaurant(e).slice(0,-4),i="(max-width: 559px) calc(100vw - 4rem - 4px), (min-width: 560px) and (max-width: 1023px) calc(0.5 * 100vw - 5rem - 2px), (min-width: 1023px) calc(0.333 * 100vw - 5rem - 2px), calc(100vw - 6rem - 2px)";n.setAttribute("data-src",""+DBHelper.imageUrlForRestaurant(e)),r.setAttribute("data-srcset",s+"_300.webp 300w, "+s+"_350.webp 350w, "+s+"_400.webp 400w, "+s+"_450.webp 450w, "+s+"_500.webp 500w, "+s+"_550.webp 550w, "+s+"_600.webp 600w, "+s+"_700.webp 700w, "+s+"_800.webp 800w"),r.type="image/webp",r.sizes=i,o.setAttribute("data-srcset",s+"_300.jpg 300w, "+s+"_350.jpg 350w, "+s+"_400.jpg 400w, "+s+"_450.jpg 450w, "+s+"_500.jpg 500w, "+s+"_550.jpg 550w, "+s+"_600.jpg 600w, "+s+"_700.jpg 700w, "+s+"_800.jpg 800w"),o.type="image/jpg",o.sizes=i,a.append(r),a.append(o),a.append(n),t.append(a);var c=document.createElement("h3");c.innerHTML=e.name,t.append(c);var l=document.createElement("p");l.innerHTML=e.neighborhood,t.append(l);var d=document.createElement("p");d.innerHTML=e.address,t.append(d);var u=document.createElement("a");return u.innerHTML="Restaurant details",u.href=DBHelper.urlForRestaurant(e),t.append(u),t},addMarkersToMap=function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants).forEach(function(e){var t=DBHelper.mapMarkerForRestaurant(e,self.newMap);t.on("click",function(){window.location.href=t.options.url}),self.markers.push(t)})};function notifySWUpdates(e){console.log("There is a new Service Worker available");var t=document.createElement("button");t.classList.add("sw-button"),t.innerHTML="Update Available",document.getElementsByTagName("body")[0].appendChild(t),t.addEventListener("click",function(){e.postMessage({activate:"true"})})}function trackSWStates(e){var t=this;e.addEventListener("statechange",function(){"installed"==t.state&&notifySWUpdates(e)})}function registerServiceWorker(){navigator.serviceWorker.register("sw.js").then(function(e){if(navigator.serviceWorker.controller){e.waiting&&notifySWUpdates(e.waiting),e.installing&&trackSWStates(e.installing),e.addEventListener("updatefound",function(){trackSWStates(e.installing)});var t=void 0;navigator.serviceWorker.addEventListener("controllerchange",function(){t||(window.location.reload(),t=!0)})}}).catch(function(e){console.log("SW failed: ",e)})}registerServiceWorker();