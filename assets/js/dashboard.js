!function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=24)}([function(t,e,a){},function(t,e,a){t.exports=a.p+"assets/img/logo.png"},function(t,e,a){t.exports=a.p+"assets/img/favicon16.ico"},,,,,,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";a.r(e);a(0),a(25),a(1),a(2),a(26),a(27),a(28),a(29);var n=1,i=document.getElementById("edit-content"),o=document.getElementById("settings-overlay");document.addEventListener("click",function(t){t.preventDefault();var e=t.target;switch(!0){case e.classList.contains("close-edit"):i.classList.toggle("show");break;case e.classList.contains("add-data"):s(e);break;case e.classList.contains("edit-data"):r(e);break;case e.closest("a")&&e.closest("a").classList.contains("delete-data"):l(e.closest("a.delete-data"));break;case e.closest("a")&&e.closest("a").classList.contains("edit-form"):c(e.closest("a.edit-form"));break;case e.classList.contains("add-new-flavour"):d(e);break;case e.closest("button")&&e.closest("button").classList.contains("show-settings"):o.classList.toggle("display-grid");break;case e.classList.contains("btn-primary"):case e.classList.contains("btn-secondary"):e.nextElementSibling.classList.toggle("display-grid");break;default:console.log("error")}});var s=function(t){var e=t.closest("div"),a=document.createElement("div");e.after(a),a.classList.add("hide","status-message");var n=document.querySelectorAll("[data-category^=".concat(t.id)),i=t.id.split("-"),o=new FormData;n.forEach(function(t){o.append(t.name,t.value)}),o.append("categoryType",i[0]),o.append("actionType",i[1]);var s=document.createElement("div");s.classList.add("sk-folding-cube","btn-col-right"),s.innerHTML='\n            <div class="sk-cube1 sk-cube"></div>\n            <div class="sk-cube2 sk-cube"></div>\n            <div class="sk-cube4 sk-cube"></div>\n            <div class="sk-cube3 sk-cube"></div>\n        ',t.classList.add("hide"),e.appendChild(s),fetch("path/to/async/file",{method:"POST",body:o}).then(function(t){return t.text()}).then(function(e){setTimeout(function(){e?(a.innerHTML="Informacao inserida!",a.style.color="green"):(a.innerHTML="Houve um erro ao inserir!",a.style.color="red"),a.classList.remove("hide"),t.classList.remove("hide"),s.remove(),setTimeout(function(){a.classList.add("hide"),a.innerHTML=""},5e3)},3e3)}).catch(function(t){console.log(t)})},r=function(t){var e=t.closest("div"),a=document.createElement("div");e.after(a),a.classList.add("hide","status-message");var n=document.querySelectorAll("[data-category^=".concat(t.id)),i=t.id.split("-"),o="".concat(i[0],"-").concat(i[1],"-id"),s=t.getAttribute("data-".concat(o)),r=new FormData;n.forEach(function(t){r.append(t.name,t.value)}),r.append("itemID",s),r.append("categoryType",i[0]),r.append("actionType",i[1]);var l=document.createElement("div");l.classList.add("sk-folding-cube","btn-col-right"),l.innerHTML='\n            <div class="sk-cube1 sk-cube"></div>\n            <div class="sk-cube2 sk-cube"></div>\n            <div class="sk-cube4 sk-cube"></div>\n            <div class="sk-cube3 sk-cube"></div>\n        ',t.classList.add("hide"),e.appendChild(l),fetch("path/to/async/file",{method:"POST",body:r}).then(function(t){return t.text()}).then(function(e){setTimeout(function(){e?(a.innerHTML="Informacao actualizada!",a.style.color="green"):(a.innerHTML="Houve um erro ao actualizar!",a.style.color="red"),a.innerHTML="Houve um erro ao actualizar!",a.style.color="red",a.classList.remove("hide"),t.classList.remove("hide"),l.remove(),setTimeout(function(){a.classList.add("hide"),a.innerHTML=""},3e3)},1500)}).catch(function(e){a.innerHTML="Houve um erro ao actualizar!",a.style.color="red",a.classList.remove("hide"),t.classList.remove("hide"),l.remove(),setTimeout(function(){a.classList.add("hide"),a.innerHTML=""},1500),console.log(e)})},l=function(t){var e=new FormData,a=t.getAttribute("data-category"),n=t.getAttribute("data-".concat(a,"-id"));e.append(n,"id"),e.append(a,"category");var i=!0,o=!1,s=void 0;try{for(var r,l=e.entries()[Symbol.iterator]();!(i=(r=l.next()).done);i=!0){var c=r.value;console.log(c[0]+", "+c[1])}}catch(t){o=!0,s=t}finally{try{i||null==l.return||l.return()}finally{if(o)throw s}}fetch("path/to/async/file",{method:"POST",body:e}).then(function(t){return t.text()}).then(function(e){var n,i,o=t.closest("span");"place"==a?n=5:"flavour"==a||"product"==a?n=2:"admin"==a&&(n=3);for(var s=0;s<n;s++)i=o.previousElementSibling,o.remove(),o=i}).catch(function(t){console.log(t)})},c=function(t){var e=!!t.getAttribute("data-category")&&t.getAttribute("data-category");t.getAttribute("data-".concat(e,"-id"));if(e){var a="";switch(e){case"admin":a='\n    <div class="edit-form-layout">\n        <form action="#">\n            <h2>Editar Administrador</h2>\n            <label for="email">E-mail*</label>\n            <input type="email" name="email" data-category="admin-edit-input">\n            <label for="password">Palavra Passe*</label>\n            <input type="passwird" name="pwd" data-category="admin-edit-input">\n            <label for="name">Nome*</label>\n            <input type="text" name="name" data-category="admin-edit-input">\n            <label for="phoneNumber">Telefone</label>\n            <input type="tel" name="phoneNumber" data-category="admin-edit-input">\n            <div class="edit-btns">\n                <a class="close-edit self-left">Voltar</a>\n                <button type="submit" class="btn-form-insert edit-data" id="admin-edit-input" data-admin-edit-id="1">Editar</button> \n            </div>\n        </form>\n        <div class="hide status-message"></div>\n    </div>\n';break;case"place":a='\n    <div class="edit-form-layout">\n        <form action="#">\n            <h2>Editar Destino</h2>\n            <label for="">Cidade</label>\n            <input type="text" name="city" data-category="place-edit-input">\n            <label for="">Desde</label>\n            <input type="date" name="start" data-category="place-edit-input">\n            <label for="">Ate</label>\n            <input type="date" name="end" data-category="place-edit-input">\n            <label for="">Latitude</label>\n            <input type="text" name="latitude" data-category="place-edit-input">\n            <label for="">Longitude</label>\n            <input type="text" name="longitude" data-category="place-edit-input">\n\n            <div class="edit-btns">\n                <a class="close-edit self-left">Voltar</a>\n                <button type="submit" class="btn-form-insert edit-data" id="place-edit-input" data-place-edit-id="1">Editar</button> \n            </div>\n        </form>\n        <div class="hide status-message"></div>\n    </div>\n    \n';break;case"flavour":a='\n    <div class="edit-form-layout">\n        <form action="#">\n            <h2>Editar Sabor</h2>\n            <label for="">Portugues</label>\n            <input type="text" name="flavours_PT" data-category="flavour-edit-input">\n            <label for="">Ingles</label>\n            <input type="text" name="flavours_EN" data-category="flavour-edit-input">\n\n            <div class="edit-btns">\n                <a class="close-edit self-left">Voltar</a>\n                <button type="submit" class="btn-form-insert edit-data" id="flavour-edit-input" data-flavour-edit-id="1">Editar</button> \n            </div>\n        </form>\n        <div class="hide status-message"></div>\n    </div>\n';break;case"product":a='\n    <div class="edit-form-layout"> \n        <form action="#">\n            <h2>Editar Produto</h2>\n            <label for="">Portugues</label>\n            <input type="text" name="flavours_PT" data-category="product-edit-input">\n            <label for="">Ingles</label>\n            <input type="text" name="flavours_EN" data-category="product-edit-input">\n            <label for="editFlavourList">Sabores</label>\n            <select name="flavour_1" data-category="product-edit-input_1">\n                <option value="1" selected>Nutella</option>\n                <option value="2">Chocolate</option>\n            </select>\n            <a class="add-new-flavour" style="width: fit-content; background-color: transparent; border: none; outline: none; color: #6495ed">Adicionar novo ?</a>\n\n            <div class="edit-btns">\n                <a class="close-edit self-left">Voltar</a>\n\n                <button type="submit" class="btn-form-insert edit-data" id="product-edit-input" data-product-edit-id="1">Editar</button> \n            </div>\n        </form>        \n        <div class="hide status-message"></div>\n    </div>\n';break;default:a=""}i.innerHTML=a}i.classList.toggle("show")},d=function(t){n++;var e=document.createElement("select");e.name="flavour_"+n;var a=t.parentNode,i=t.previousElementSibling,o=i.getAttribute("data-category").split("-");e.setAttribute("data-category","product-"+o[1]+"-input_"+n),e.innerHTML='\n        <option value="1">Nutella</option>\n        <option value="2">Chocolate</option>\n    ',a.insertBefore(e,i.nextSibling)}},function(t,e,a){},function(t,e,a){t.exports=a.p+"assets/img/edit.svg"},function(t,e,a){t.exports=a.p+"assets/img/remove.svg"},function(t,e,a){t.exports=a.p+"assets/img/settings.svg"},function(t,e,a){t.exports=a.p+"assets/img/logout.svg"}]);