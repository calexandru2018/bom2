!function(e){function t(t){for(var o,c,s=t[0],l=t[1],a=t[2],u=0,f=[];u<s.length;u++)c=s[u],r[c]&&f.push(r[c][0]),r[c]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(d&&d(t);f.length;)f.shift()();return i.push.apply(i,a||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(o=!1)}o&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={2:0},i=[];function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var a=0;a<s.length;a++)t(s[a]);var d=l;i.push([6,4]),n()}([,function(e,t,n){e.exports=n.p+"assets/img/logo.png"},function(e,t,n){e.exports=n.p+"assets/img/favicon16.ico"},,,,function(e,t,n){"use strict";n.r(t);n(0),n(7),n(8),n(9),n(10),n(11),n(12),n(13),n(1),n(2);var o=n(4),r=n(5),i=n.n(r),c=window.innerWidth,s=document.querySelector(".parallax-wrapper"),l=document.querySelector(".main-nav"),a=document.querySelectorAll(".btn-nav"),d=document.getElementById("scroll-to-top"),u=document.getElementById("main-toggle-button"),f=document.getElementById("show-locator"),p=document.getElementById("scroll-to-products"),g=document.getElementById("calendar");new i.a({get:"user",userId:"5673767342",accessToken:instagramToken,resolution:"standard_resolution",links:!0,template:'<a href="{{link}}" target="_blank" style="position: relative">\n                    <div>\n                        <div style="width: fit-content;">{{likes}}</div>\n                    </div>\n                    <img src="{{image}}"/>\n                </a>',filter:function(e){return e.tags.indexOf("testebom2")>=0}}).run();var m=new o.Calendar(g,{defaultView:"month",locale:calenderConfig.locale,height:"parent",firstDay:1,navLinks:!1,buttonText:{today:calenderConfig.today},events:events,eventClick:function(e){e.jsEvent.preventDefault(),e.event.url&&window.open(e.event.url,"_blank")}});function v(e,t,n){var o=e.getBoundingClientRect(),r=window.pageYOffset||s.scrollTop||document.body.scrollTop,i="homepage"==e.id?0:o.top+r;console.log(e.id),s.scroll({top:i,left:0,behavior:"smooth"}),t&&!n&&l.classList.toggle("open")}function y(e,t,n,o){setTimeout(function(){t.classList.add("hide"),n.classList.remove("hide"),setTimeout(function(){n.classList.add("hide"),o.classList.remove("hide")},e)},1e3)}document.addEventListener("DOMContentLoaded",function(){m.render()}),window.addEventListener("resize",function(){c=window.innerWidth}),document.querySelectorAll(".cookie-resp").forEach(function(e){e.addEventListener("click",function(){var t=new FormData;t.append("cookie-resp",parseInt(e.getAttribute("data-cookie-resp"))),fetch("./async/update-cookie.php",{method:"POST",body:t}).then(function(e){return e.text()}).then(function(t){1==t?(e.closest(".cookie-modal").style.opacity=0,setTimeout(function(){e.closest(".cookie-modal").remove()},1e3)):console.log("error",t)})})}),document.getElementById("send-btn").addEventListener("click",function(e){e.preventDefault();var t=document.getElementById("send-btn"),n=document.getElementById("lds-ellipsis"),o=document.getElementById("message-status"),r=document.querySelectorAll(".form-input"),i=document.getElementById("error-message"),c=new FormData,s=!1;r.forEach(function(e){"text"!==e.type&&"textarea"!=e.type||""!=e.value?"select-one"==e.type&&"0"==e.value?s=!0:"checkbox"!=e.type||e.checked?"checkbox"!=e.type&&c.append(e.name,e.value):s=!0:s=!0}),s?i.classList.remove("hide"):(t.classList.add("hide"),n.classList.remove("hide"),console.log("Message is sent"),i.classList.add("hide"),fetch("path/to/message",{method:"POST",body:c}).then(function(e){return e.text()}).then(function(e){e?(o.innerText="Occoreu um erro ao enviar a mensagem, tente novamente.",o.style="color: rgb(178, 34, 34)",y(5e3,n,o,t)):(o.innerHTML="Mensagem enviada &#10003;",o.style="color: rgb(60, 179, 113)",r.forEach(function(e){e.value=""}),y(3e3,n,o,t))}))}),document.querySelectorAll(".nav-toggle").forEach(function(e){e.addEventListener("click",function(){c>=992?(l.classList.toggle("close-navigation"),s.classList.toggle("expand-main"),u.classList.toggle("fullscreen-navigation-toggle")):l.classList.toggle("open")})}),s.addEventListener("scroll",function(){document.body.scrollTop>450||s.scrollTop>450?d.style.opacity=1:d.style.opacity=0}),d.addEventListener("click",function(){s.scroll({top:0,left:0,behavior:"smooth"})}),f.addEventListener("click",function(){document.querySelector(".roadmap").classList.toggle("show-locator-toggle")}),p.addEventListener("click",function(){v(document.getElementById("products"),!1,c>=992)}),a.forEach(function(e){e.addEventListener("click",function(){v(document.getElementById(e.getAttribute("data-link")),!0,c>=992)})}),document.getElementById("lang-selector").addEventListener("change",function(){var e=document.getElementById("lang-selector").value;window.location.href="/bom2/index.php?lang="+e})},,function(e,t,n){e.exports=n.p+"assets/fonts/Antro_Vectra_Bolder.otf"},function(e,t,n){},function(e,t,n){e.exports=n.p+"assets/img/bq.jpg"},function(e,t,n){e.exports=n.p+"assets/img/bq4.jpg"},function(e,t,n){e.exports=n.p+"assets/img/bq2.jpg"},function(e,t,n){e.exports=n.p+"assets/img/bq3.jpg"}]);