this.L=this.L||{},this.L.Control=this.L.Control||{},this.L.Control.Geocoder=function(t){"use strict";function e(t){return T[t]}function o(t){return null==t?"":t?(t=""+t,S.test(t)?t.replace(x,e):t):t+""}function n(e,o,n,i,r){var a="_l_geocoder_"+C++;o[r||"callback"]=a,window[a]=t.Util.bind(n,i);var l=document.createElement("script");l.type="text/javascript",l.src=e+s(o),l.id=a,document.getElementsByTagName("head")[0].appendChild(l)}function i(t,e,o){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState){var t;if(200!==n.status&&304!==n.status)t="";else if("string"==typeof n.response)try{t=JSON.parse(n.response)}catch(e){t=n.response}else t=n.response;o(t)}},n.open("GET",t+s(e),!0),n.responseType="json",n.setRequestHeader("Accept","application/json"),n.send(null)}function r(t,e){return t.replace(/\{ *([\w_]+) *\}/g,function(t,n){var i=e[n];return void 0===i?i="":"function"==typeof i&&(i=i(e)),o(i)})}function s(e,o,n){var i=[];for(var r in e){var s=encodeURIComponent(n?r.toUpperCase():r),a=e[r];if(t.Util.isArray(a))for(var l=0;l<a.length;l++)i.push(s+"="+encodeURIComponent(a[l]));else i.push(s+"="+encodeURIComponent(a))}return(o&&-1!==o.indexOf("?")?"&":"?")+i.join("&")}function a(t,e){return new $(t,e)}function l(t){return new L(t)}function c(t,e){return new E(t,e)}function d(t){return new A(t)}function u(t){return new I(t)}function p(t,e){return new N(t,e)}function h(t,e){return new P(t,e)}function f(t){return new H(t)}function m(t){return new R(t)}function g(t){return new D(t)}function v(t,e){return new M(t,e)}function b(t,e){return new U(t,e)}function y(t){return new _(t)}function w(t){return new j(t)}function k(t){return new q(t)}t=t&&t.hasOwnProperty("default")?t["default"]:t;var C=0,x=/[&<>"'`]/g,S=/[&<>"'`]/,T={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},$=t.Class.extend({options:{service_url:"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"},initialize:function(e,o){t.setOptions(this,o),this._accessToken=e},geocode:function(e,o,n){var r={SingleLine:e,outFields:"Addr_Type",forStorage:!1,maxLocations:10,f:"json"};this._key&&this._key.length&&(r.token=this._key),i(this.options.service_url+"/findAddressCandidates",t.extend(r,this.options.geocodingQueryParams),function(e){var i,r,s,a=[];if(e.candidates&&e.candidates.length)for(var l=0;l<=e.candidates.length-1;l++)i=e.candidates[l],r=t.latLng(i.location.y,i.location.x),s=t.latLngBounds(t.latLng(i.extent.ymax,i.extent.xmax),t.latLng(i.extent.ymin,i.extent.xmin)),a[l]={name:i.address,bbox:s,center:r};o.call(n,a)})},suggest:function(t,e,o){return this.geocode(t,e,o)},reverse:function(e,o,n,r){var s={location:encodeURIComponent(e.lng)+","+encodeURIComponent(e.lat),distance:100,f:"json"};i(this.options.service_url+"/reverseGeocode",s,function(e){var o,i=[];e&&!e.error&&(o=t.latLng(e.location.y,e.location.x),i.push({name:e.address.Match_addr,center:o,bounds:t.latLngBounds(o,o)})),n.call(r,i)})}}),L=t.Class.extend({initialize:function(t){this.key=t},geocode:function(e,o,i){n("https://dev.virtualearth.net/REST/v1/Locations",{query:e,key:this.key},function(e){var n=[];if(e.resourceSets.length>0)for(var r=e.resourceSets[0].resources.length-1;r>=0;r--){var s=e.resourceSets[0].resources[r],a=s.bbox;n[r]={name:s.name,bbox:t.latLngBounds([a[0],a[1]],[a[2],a[3]]),center:t.latLng(s.point.coordinates)}}o.call(i,n)},this,"jsonp")},reverse:function(e,o,i,r){n("//dev.virtualearth.net/REST/v1/Locations/"+e.lat+","+e.lng,{key:this.key},function(e){for(var o=[],n=e.resourceSets[0].resources.length-1;n>=0;n--){var s=e.resourceSets[0].resources[n],a=s.bbox;o[n]={name:s.name,bbox:t.latLngBounds([a[0],a[1]],[a[2],a[3]]),center:t.latLng(s.point.coordinates)}}i.call(r,o)},this,"jsonp")}}),E=t.Class.extend({options:{serviceUrl:"https://maps.googleapis.com/maps/api/geocode/json",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,o){this._key=e,t.setOptions(this,o),this.options.serviceUrl=this.options.service_url||this.options.serviceUrl},geocode:function(e,o,n){var r={address:e};this._key&&this._key.length&&(r.key=this._key),r=t.Util.extend(r,this.options.geocodingQueryParams),i(this.options.serviceUrl,r,function(e){var i,r,s,a=[];if(e.results&&e.results.length)for(var l=0;l<=e.results.length-1;l++)i=e.results[l],r=t.latLng(i.geometry.location),s=t.latLngBounds(t.latLng(i.geometry.viewport.northeast),t.latLng(i.geometry.viewport.southwest)),a[l]={name:i.formatted_address,bbox:s,center:r,properties:i.address_components};o.call(n,a)})},reverse:function(e,o,n,r){var s={latlng:encodeURIComponent(e.lat)+","+encodeURIComponent(e.lng)};s=t.Util.extend(s,this.options.reverseQueryParams),this._key&&this._key.length&&(s.key=this._key),i(this.options.serviceUrl,s,function(e){var o,i,s,a=[];if(e.results&&e.results.length)for(var l=0;l<=e.results.length-1;l++)o=e.results[l],i=t.latLng(o.geometry.location),s=t.latLngBounds(t.latLng(o.geometry.viewport.northeast),t.latLng(o.geometry.viewport.southwest)),a[l]={name:o.formatted_address,bbox:s,center:i,properties:o.address_components};n.call(r,a)})}}),A=t.Class.extend({options:{geocodeUrl:"http://geocoder.api.here.com/6.2/geocode.json",reverseGeocodeUrl:"http://reverse.geocoder.api.here.com/6.2/reversegeocode.json",app_id:"<insert your app_id here>",app_code:"<insert your app_code here>",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e){t.setOptions(this,e)},geocode:function(e,o,n){var i={searchtext:e,gen:9,app_id:this.options.app_id,app_code:this.options.app_code,jsonattributes:1};i=t.Util.extend(i,this.options.geocodingQueryParams),this.getJSON(this.options.geocodeUrl,i,o,n)},reverse:function(e,o,n,i){var r={prox:encodeURIComponent(e.lat)+","+encodeURIComponent(e.lng),mode:"retrieveAddresses",app_id:this.options.app_id,app_code:this.options.app_code,gen:9,jsonattributes:1};r=t.Util.extend(r,this.options.reverseQueryParams),this.getJSON(this.options.reverseGeocodeUrl,r,n,i)},getJSON:function(e,o,n,r){i(e,o,function(e){var o,i,s,a=[];if(e.response.view&&e.response.view.length)for(var l=0;l<=e.response.view[0].result.length-1;l++)o=e.response.view[0].result[l].location,i=t.latLng(o.displayPosition.latitude,o.displayPosition.longitude),s=t.latLngBounds(t.latLng(o.mapView.topLeft.latitude,o.mapView.topLeft.longitude),t.latLng(o.mapView.bottomRight.latitude,o.mapView.bottomRight.longitude)),a[l]={name:o.address.label,bbox:s,center:i};n.call(r,a)})}}),I=t.Class.extend({options:{next:void 0,sizeInMeters:1e4},initialize:function(e){t.Util.setOptions(this,e)},geocode:function(e,o,n){var i,r;if((i=e.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))?r=t.latLng((/N/i.test(i[1])?1:-1)*parseFloat(i[2]),(/E/i.test(i[3])?1:-1)*parseFloat(i[4])):(i=e.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))?r=t.latLng((/N/i.test(i[2])?1:-1)*parseFloat(i[1]),(/E/i.test(i[4])?1:-1)*parseFloat(i[3])):(i=e.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/))?r=t.latLng((/N/i.test(i[1])?1:-1)*(parseFloat(i[2])+parseFloat(i[3]/60)),(/E/i.test(i[4])?1:-1)*(parseFloat(i[5])+parseFloat(i[6]/60))):(i=e.match(/^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/))?r=t.latLng((/N/i.test(i[3])?1:-1)*(parseFloat(i[1])+parseFloat(i[2]/60)),(/E/i.test(i[6])?1:-1)*(parseFloat(i[4])+parseFloat(i[5]/60))):(i=e.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/))?r=t.latLng((/N/i.test(i[1])?1:-1)*(parseFloat(i[2])+parseFloat(i[3]/60+parseFloat(i[4]/3600))),(/E/i.test(i[5])?1:-1)*(parseFloat(i[6])+parseFloat(i[7]/60)+parseFloat(i[8]/3600))):(i=e.match(/^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/))?r=t.latLng((/N/i.test(i[4])?1:-1)*(parseFloat(i[1])+parseFloat(i[2]/60+parseFloat(i[3]/3600))),(/E/i.test(i[8])?1:-1)*(parseFloat(i[5])+parseFloat(i[6]/60)+parseFloat(i[7]/3600))):(i=e.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))&&(r=t.latLng(parseFloat(i[1]),parseFloat(i[2]))),r){var s=[{name:e,center:r,bbox:r.toBounds(this.options.sizeInMeters)}];o.call(n,s)}else this.options.next&&this.options.next.geocode(e,o,n)}}),N=t.Class.extend({options:{serviceUrl:"https://api.mapbox.com/geocoding/v5/mapbox.places/",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,o){t.setOptions(this,o),this.options.geocodingQueryParams.access_token=e,this.options.reverseQueryParams.access_token=e},geocode:function(e,o,n){var r=this.options.geocodingQueryParams;void 0!==r.proximity&&void 0!==r.proximity.lat&&void 0!==r.proximity.lng&&(r.proximity=r.proximity.lng+","+r.proximity.lat),i(this.options.serviceUrl+encodeURIComponent(e)+".json",r,function(e){var i,r,s,a=[];if(e.features&&e.features.length)for(var l=0;l<=e.features.length-1;l++){i=e.features[l],r=t.latLng(i.center.reverse()),s=i.bbox?t.latLngBounds(t.latLng(i.bbox.slice(0,2).reverse()),t.latLng(i.bbox.slice(2,4).reverse())):t.latLngBounds(r,r);for(var c={text:i.text,address:i.address},d=0;d<(i.context||[]).length;d++){var u=i.context[d].id.split(".")[0];c[u]=i.context[d].text}a[l]={name:i.place_name,bbox:s,center:r,properties:c}}o.call(n,a)})},suggest:function(t,e,o){return this.geocode(t,e,o)},reverse:function(e,o,n,r){i(this.options.serviceUrl+encodeURIComponent(e.lng)+","+encodeURIComponent(e.lat)+".json",this.options.reverseQueryParams,function(e){var o,i,s,a=[];if(e.features&&e.features.length)for(var l=0;l<=e.features.length-1;l++)o=e.features[l],i=t.latLng(o.center.reverse()),s=o.bbox?t.latLngBounds(t.latLng(o.bbox.slice(0,2).reverse()),t.latLng(o.bbox.slice(2,4).reverse())):t.latLngBounds(i,i),a[l]={name:o.place_name,bbox:s,center:i};n.call(r,a)})}}),P=t.Class.extend({options:{serviceUrl:"https://www.mapquestapi.com/geocoding/v1"},initialize:function(e,o){this._key=decodeURIComponent(e),t.Util.setOptions(this,o)},_formatName:function(){var t,e=[];for(t=0;t<arguments.length;t++)arguments[t]&&e.push(arguments[t]);return e.join(", ")},geocode:function(e,o,n){i(this.options.serviceUrl+"/address",{key:this._key,location:e,limit:5,outFormat:"json"},t.bind(function(e){var i,r,s=[];if(e.results&&e.results[0].locations)for(var a=e.results[0].locations.length-1;a>=0;a--)i=e.results[0].locations[a],r=t.latLng(i.latLng),s[a]={name:this._formatName(i.street,i.adminArea4,i.adminArea3,i.adminArea1),bbox:t.latLngBounds(r,r),center:r};o.call(n,s)},this))},reverse:function(e,o,n,r){i(this.options.serviceUrl+"/reverse",{key:this._key,location:e.lat+","+e.lng,outputFormat:"json"},t.bind(function(e){var o,i,s=[];if(e.results&&e.results[0].locations)for(var a=e.results[0].locations.length-1;a>=0;a--)o=e.results[0].locations[a],i=t.latLng(o.latLng),s[a]={name:this._formatName(o.street,o.adminArea4,o.adminArea3,o.adminArea1),bbox:t.latLngBounds(i,i),center:i};n.call(r,s)},this))}}),H=t.Class.extend({options:{userId:"<insert your userId here>",apiKey:"<insert your apiKey here>",serviceUrl:"https://neutrinoapi.com/"},initialize:function(e){t.Util.setOptions(this,e)},geocode:function(e,o,n){i(this.options.serviceUrl+"geocode-address",{apiKey:this.options.apiKey,userId:this.options.userId,address:e.split(/\s+/).join(".")},function(e){var i,r,s=[];e.locations&&(e.geometry=e.locations[0],i=t.latLng(e.geometry.latitude,e.geometry.longitude),r=t.latLngBounds(i,i),s[0]={name:e.geometry.address,bbox:r,center:i}),o.call(n,s)})},suggest:function(t,e,o){return this.geocode(t,e,o)},reverse:function(e,o,n,r){i(this.options.serviceUrl+"geocode-reverse",{apiKey:this.options.apiKey,userId:this.options.userId,latitude:e.lat,longitude:e.lng},function(o){var i,s,a=[];200==o.status.status&&o.found&&(i=t.latLng(e.lat,e.lng),s=t.latLngBounds(i,i),a[0]={name:o.address,bbox:s,center:i}),n.call(r,a)})}}),R=t.Class.extend({options:{serviceUrl:"https://nominatim.openstreetmap.org/",geocodingQueryParams:{},reverseQueryParams:{},htmlTemplate:function(t){var e=t.address,o=[];return(e.road||e.building)&&o.push("{building} {road} {house_number}"),(e.city||e.town||e.village||e.hamlet)&&o.push('<span class="'+(o.length>0?"leaflet-control-geocoder-address-detail":"")+'">{postcode} {city} {town} {village} {hamlet}</span>'),(e.state||e.country)&&o.push('<span class="'+(o.length>0?"leaflet-control-geocoder-address-context":"")+'">{state} {country}</span>'),r(o.join("<br/>"),e,!0)}},initialize:function(e){t.Util.setOptions(this,e)},geocode:function(e,o,n){i(this.options.serviceUrl+"search",t.extend({q:e,limit:5,format:"json",addressdetails:1},this.options.geocodingQueryParams),t.bind(function(e){for(var i=[],r=e.length-1;r>=0;r--){for(var s=e[r].boundingbox,a=0;4>a;a++)s[a]=parseFloat(s[a]);i[r]={icon:e[r].icon,name:e[r].display_name,html:this.options.htmlTemplate?this.options.htmlTemplate(e[r]):void 0,bbox:t.latLngBounds([s[0],s[2]],[s[1],s[3]]),center:t.latLng(e[r].lat,e[r].lon),properties:e[r]}}o.call(n,i)},this))},reverse:function(e,o,n,r){i(this.options.serviceUrl+"reverse",t.extend({lat:e.lat,lon:e.lng,zoom:Math.round(Math.log(o/256)/Math.log(2)),addressdetails:1,format:"json"},this.options.reverseQueryParams),t.bind(function(e){var o,i=[];e&&e.lat&&e.lon&&(o=t.latLng(e.lat,e.lon),i.push({name:e.display_name,html:this.options.htmlTemplate?this.options.htmlTemplate(e):void 0,center:o,bounds:t.latLngBounds(o,o),properties:e})),n.call(r,i)},this))}}),D=t.Class.extend({options:{OpenLocationCode:void 0,codeLength:void 0},initialize:function(e){t.setOptions(this,e)},geocode:function(e,o,n){try{var i=this.options.OpenLocationCode.decode(e),r={name:e,center:t.latLng(i.latitudeCenter,i.longitudeCenter),bbox:t.latLngBounds(t.latLng(i.latitudeLo,i.longitudeLo),t.latLng(i.latitudeHi,i.longitudeHi))};o.call(n,[r])}catch(s){console.warn(s),o.call(n,[])}},reverse:function(e,o,n,i){try{var r=this.options.OpenLocationCode.encode(e.lat,e.lng,this.options.codeLength),s={name:r,center:t.latLng(e.lat,e.lng),bbox:t.latLngBounds(t.latLng(e.lat,e.lng),t.latLng(e.lat,e.lng))};n.call(i,[s])}catch(a){console.warn(a),n.call(i,[])}}}),M=t.Class.extend({options:{serviceUrl:"https://api.geocode.earth/v1",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,o){t.Util.setOptions(this,o),this._apiKey=e,this._lastSuggest=0},geocode:function(e,o,n){var r=this;i(this.options.serviceUrl+"/search",t.extend({api_key:this._apiKey,text:e},this.options.geocodingQueryParams),function(t){o.call(n,r._parseResults(t,"bbox"))})},suggest:function(e,o,n){var r=this;i(this.options.serviceUrl+"/autocomplete",t.extend({api_key:this._apiKey,text:e},this.options.geocodingQueryParams),t.bind(function(t){t.geocoding.timestamp>this._lastSuggest&&(this._lastSuggest=t.geocoding.timestamp,o.call(n,r._parseResults(t,"bbox")))},this))},reverse:function(e,o,n,r){var s=this;i(this.options.serviceUrl+"/reverse",t.extend({api_key:this._apiKey,"point.lat":e.lat,"point.lon":e.lng},this.options.reverseQueryParams),function(t){n.call(r,s._parseResults(t,"bounds"))})},_parseResults:function(e,o){var n=[];return t.geoJson(e,{pointToLayer:function(e,o){return t.circleMarker(o)},onEachFeature:function(e,i){var r,s,a={};i.getBounds?(r=i.getBounds(),s=r.getCenter()):i.feature.bbox?(s=i.getLatLng(),r=t.latLngBounds(t.GeoJSON.coordsToLatLng(i.feature.bbox.slice(0,2)),t.GeoJSON.coordsToLatLng(i.feature.bbox.slice(2,4)))):(s=i.getLatLng(),r=t.latLngBounds(s,s)),a.name=i.feature.properties.label,a.center=s,a[o]=r,a.properties=i.feature.properties,n.push(a)}}),n}}),F=M,O=v,z=M,B=v,U=z.extend({options:{serviceUrl:"https://api.openrouteservice.org/geocode"}}),_=t.Class.extend({options:{serviceUrl:"https://photon.komoot.de/api/",reverseUrl:"https://photon.komoot.de/reverse/",nameProperties:["name","street","suburb","hamlet","town","city","state","country"]},initialize:function(e){t.setOptions(this,e)},geocode:function(e,o,n){var r=t.extend({q:e},this.options.geocodingQueryParams);i(this.options.serviceUrl,r,t.bind(function(t){o.call(n,this._decodeFeatures(t))},this))},suggest:function(t,e,o){return this.geocode(t,e,o)},reverse:function(e,o,n,r){var s=t.extend({lat:e.lat,lon:e.lng},this.options.reverseQueryParams);i(this.options.reverseUrl,s,t.bind(function(t){n.call(r,this._decodeFeatures(t))},this))},_decodeFeatures:function(e){var o,n,i,r,s,a,l=[];if(e&&e.features)for(o=0;o<e.features.length;o++)n=e.features[o],i=n.geometry.coordinates,r=t.latLng(i[1],i[0]),s=n.properties.extent,a=s?t.latLngBounds([s[1],s[0]],[s[3],s[2]]):t.latLngBounds(r,r),l.push({name:this._decodeFeatureName(n),html:this.options.htmlTemplate?this.options.htmlTemplate(n):void 0,center:r,bbox:a,properties:n.properties});return l},_decodeFeatureName:function(t){return(this.options.nameProperties||[]).map(function(e){return t.properties[e]}).filter(function(t){return!!t}).join(", ")}}),j=t.Class.extend({options:{serviceUrl:"https://api.what3words.com/v2/"},initialize:function(t){this._accessToken=t},geocode:function(e,o,n){i(this.options.serviceUrl+"forward",{key:this._accessToken,addr:e.split(/\s+/).join(".")},function(e){var i,r,s=[];e.geometry&&(i=t.latLng(e.geometry.lat,e.geometry.lng),r=t.latLngBounds(i,i),s[0]={name:e.words,bbox:r,center:i}),o.call(n,s)})},suggest:function(t,e,o){return this.geocode(t,e,o)},reverse:function(e,o,n,r){i(this.options.serviceUrl+"reverse",{key:this._accessToken,coords:[e.lat,e.lng].join(",")},function(e){var o,i,s=[];200==e.status.status&&(o=t.latLng(e.geometry.lat,e.geometry.lng),i=t.latLngBounds(o,o),s[0]={name:e.words,bbox:i,center:o}),n.call(r,s)})}}),W=Object.freeze({ArcGis:$,arcgis:a,Bing:L,bing:l,Google:E,google:c,HERE:A,here:d,LatLng:I,latLng:u,Mapbox:N,mapbox:p,MapQuest:P,mapQuest:h,Neutrino:H,neutrino:f,Nominatim:R,nominatim:m,OpenLocationCode:D,openLocationCode:g,Pelias:M,pelias:v,GeocodeEarth:F,geocodeEarth:O,Mapzen:z,mapzen:B,Openrouteservice:U,openrouteservice:b,Photon:_,photon:y,What3Words:j,what3words:w}),q=t.Control.extend({options:{showUniqueResult:!0,showResultIcons:!1,collapsed:!0,expand:"touch",position:"topright",placeholder:"Search...",errorMessage:"Nothing found.",queryMinLength:1,suggestMinLength:3,suggestTimeout:250,defaultMarkGeocode:!0},includes:t.Evented.prototype||t.Mixin.Events,initialize:function(e){t.Util.setOptions(this,e),this.options.geocoder||(this.options.geocoder=new R),this._requestCount=0},addThrobberClass:function(){t.DomUtil.addClass(this._container,"leaflet-control-geocoder-throbber")},removeThrobberClass:function(){t.DomUtil.removeClass(this._container,"leaflet-control-geocoder-throbber")},onAdd:function(e){var o,n="leaflet-control-geocoder",i=t.DomUtil.create("div",n+" leaflet-bar"),r=t.DomUtil.create("button",n+"-icon",i),s=this._form=t.DomUtil.create("div",n+"-form",i);return this._map=e,this._container=i,r.innerHTML="&nbsp;",r.type="button",o=this._input=t.DomUtil.create("input","",s),o.type="text",o.placeholder=this.options.placeholder,t.DomEvent.disableClickPropagation(o),this._errorElement=t.DomUtil.create("div",n+"-form-no-error",i),this._errorElement.innerHTML=this.options.errorMessage,this._alts=t.DomUtil.create("ul",n+"-alternatives leaflet-control-geocoder-alternatives-minimized",i),t.DomEvent.disableClickPropagation(this._alts),t.DomEvent.addListener(o,"keydown",this._keydown,this),this.options.geocoder.suggest&&t.DomEvent.addListener(o,"input",this._change,this),t.DomEvent.addListener(o,"blur",function(){this.options.collapsed&&!this._preventBlurCollapse&&this._collapse(),this._preventBlurCollapse=!1},this),this.options.collapsed?"click"===this.options.expand?t.DomEvent.addListener(i,"click",function(t){0===t.button&&2!==t.detail&&this._toggle()},this):t.Browser.touch&&"touch"===this.options.expand?t.DomEvent.addListener(i,"touchstart mousedown",function(t){this._toggle(),t.preventDefault(),t.stopPropagation()},this):(t.DomEvent.addListener(i,"mouseover",this._expand,this),t.DomEvent.addListener(i,"mouseout",this._collapse,this),this._map.on("movestart",this._collapse,this)):(this._expand(),t.Browser.touch?t.DomEvent.addListener(i,"touchstart",function(){this._geocode()},this):t.DomEvent.addListener(i,"click",function(){this._geocode()},this)),this.options.defaultMarkGeocode&&this.on("markgeocode",this.markGeocode,this),this.on("startgeocode",this.addThrobberClass,this),this.on("finishgeocode",this.removeThrobberClass,this),this.on("startsuggest",this.addThrobberClass,this),this.on("finishsuggest",this.removeThrobberClass,this),t.DomEvent.disableClickPropagation(i),i},_geocodeResult:function(e,o){if(!o&&this.options.showUniqueResult&&1===e.length)this._geocodeResultSelected(e[0]);else if(e.length>0){this._alts.innerHTML="",this._results=e,t.DomUtil.removeClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),t.DomUtil.addClass(this._container,"leaflet-control-geocoder-options-open");for(var n=0;n<e.length;n++)this._alts.appendChild(this._createAlt(e[n],n))}else t.DomUtil.addClass(this._container,"leaflet-control-geocoder-options-error"),t.DomUtil.addClass(this._errorElement,"leaflet-control-geocoder-error")},markGeocode:function(e){return e=e.geocode||e,this._map.fitBounds(e.bbox),this._geocodeMarker&&this._map.removeLayer(this._geocodeMarker),this._geocodeMarker=new t.Marker(e.center).bindPopup(e.html||e.name).addTo(this._map).openPopup(),this},_geocode:function(t){var e=this._input.value;if(t||!(e.length<this.options.queryMinLength)){var o=++this._requestCount,n=t?"suggest":"geocode",i={input:e};this._lastGeocode=e,t||this._clearResults(),this.fire("start"+n,i),this.options.geocoder[n](e,function(e){o===this._requestCount&&(i.results=e,this.fire("finish"+n,i),this._geocodeResult(e,t))},this)}},_geocodeResultSelected:function(t){this.fire("markgeocode",{geocode:t})},_toggle:function(){t.DomUtil.hasClass(this._container,"leaflet-control-geocoder-expanded")?this._collapse():this._expand()},_expand:function(){t.DomUtil.addClass(this._container,"leaflet-control-geocoder-expanded"),this._input.select(),this.fire("expand")},_collapse:function(){t.DomUtil.removeClass(this._container,"leaflet-control-geocoder-expanded"),t.DomUtil.addClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),t.DomUtil.removeClass(this._errorElement,"leaflet-control-geocoder-error"),t.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-open"),t.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-error"),this._input.blur(),this.fire("collapse")},_clearResults:function(){t.DomUtil.addClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),this._selection=null,t.DomUtil.removeClass(this._errorElement,"leaflet-control-geocoder-error"),t.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-open"),t.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-error")},_createAlt:function(e,o){var n=t.DomUtil.create("li",""),i=t.DomUtil.create("a","",n),r=this.options.showResultIcons&&e.icon?t.DomUtil.create("img","",i):null,s=e.html?void 0:document.createTextNode(e.name),a=function(o){this._preventBlurCollapse=!0,t.DomEvent.stop(o),this._geocodeResultSelected(e),t.DomEvent.on(n,"click",function(){this.options.collapsed?this._collapse():this._clearResults()},this)};return r&&(r.src=e.icon),n.setAttribute("data-result-index",o),e.html?i.innerHTML=i.innerHTML+e.html:i.appendChild(s),t.DomEvent.addListener(n,"mousedown touchstart",a,this),n},_keydown:function(e){var o=this,n=function(e){o._selection&&(t.DomUtil.removeClass(o._selection,"leaflet-control-geocoder-selected"),o._selection=o._selection[e>0?"nextSibling":"previousSibling"]),o._selection||(o._selection=o._alts[e>0?"firstChild":"lastChild"]),o._selection&&t.DomUtil.addClass(o._selection,"leaflet-control-geocoder-selected")};switch(e.keyCode){case 27:this.options.collapsed?this._collapse():this._clearResults();break;case 38:n(-1);break;case 40:n(1);break;case 13:if(this._selection){var i=parseInt(this._selection.getAttribute("data-result-index"),10);this._geocodeResultSelected(this._results[i]),this._clearResults()}else this._geocode();break;default:return}t.DomEvent.preventDefault(e)},_change:function(){var e=this._input.value;e!==this._lastGeocode&&(clearTimeout(this._suggestTimeout),e.length>=this.options.suggestMinLength?this._suggestTimeout=setTimeout(t.bind(function(){this._geocode(!0)},this),this.options.suggestTimeout):this._clearResults())}});return t.Util.extend(q,W),t.Util.extend(t.Control,{Geocoder:q,geocoder:k}),q}(L);