import 'normalize.css';
import '../css/dashboard.css';
import '../img/logo.png';
import '../img/favicon16.ico';
import '../img/edit.svg';
import '../img/remove.svg';
import '../img/settings.svg';
import '../img/logout.svg';
let flavourCounter = 1;
let editContentContainer = document.getElementById('edit-content');
const settingsOverlay = document.getElementById('settings-overlay');
const editAdmin = `
    <form action="#" class="edit-form">
        <h2>Editar Administrador</h2>
        <label for="email">E-mail*</label>
        <input type="email" name="email">
        <label for="password">Palavra Passe*</label>
        <input type="passwird" name="pwd">
        <label for="name">Nome*</label>
        <input type="text" name="name">
        <label for="phoneNumber">Telefone</label>
        <input type="tel" name="phoneNumber">

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="admin-edit-btn">Editar</button> 
        </div>
    </form>
`;
const editPlace = `
    <form action="#" class="edit-form">
        <h2>Editar Destino</h2>
        <label for="">Cidade</label>
        <input type="text" name="name">
        <label for="">Desde</label>
        <input type="date" name="name">
        <label for="">Ate</label>
        <input type="date" name="name">
        <label for="">Latitude</label>
        <input type="text" name="latitude">
        <label for="">Longitude</label>
        <input type="text" name="longitude">

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="place-edit-btn">Editar</button> 
        </div>
    </form>
`;
const editFlavour = `
    <form action="#" class="edit-form">
        <h2>Editar Sabor</h2>
        <label for="">Portugues</label>
        <input type="text" name="flavours_PT">
        <label for="">Ingles</label>
        <input type="text" name="flavours_EN">

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="flavour-edit-btn">Editar</button> 
        </div>
    </form>
`;
const editProduct = `
    <form action="#" class="edit-form">
        <h2>Editar Produto</h2>
        <label for="">Portugues</label>
        <input type="text" name="flavours_PT">
        <label for="">Ingles</label>
        <input type="text" name="flavours_EN">
        <label for="editFlavourList">Sabores</label>
        <select name="flavour_1" id="editFlavourList">
            <option value="1" selected>Nutella</option>
            <option value="2">Chocolate</option>
        </select>
        <a class="add-new-flavour" style="width: fit-content; background-color: transparent; border: none; outline: none; color: #6495ed">Adicionar novo ?</a>

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="product-edit-btn">Editar</button> 
        </div>
    </form>
`;

document.querySelectorAll('.show-settings').forEach((btn) => {
    btn.addEventListener('click', () => {
        settingsOverlay.classList.toggle('display-grid'); 
    });
});
document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('click', () => {
        const nextEl = btn.nextElementSibling;
        nextEl.classList.toggle('display-grid'); 
    });
});
document.querySelectorAll('.btn-secondary').forEach((btn) => {
    btn.addEventListener('click', () => {
        const nextEl = btn.nextElementSibling;
        nextEl.classList.toggle('display-grid');
    });
});
document.querySelectorAll('.edit-admin, .edit-place, .edit-flavour, .edit-product').forEach( (btn) => {
    btn.addEventListener('click', function(e) {
        console.log('click occured');
        var dataType = ((this.getAttribute('data-type')) ? this.getAttribute('data-type') : false);
        
        if(dataType){
            var contentToShow;
            switch(dataType){
                case 'admin': contentToShow = editAdmin;
                    break;
                case 'place': contentToShow = editPlace;
                    break;
                case 'flavour': contentToShow = editFlavour;
                    break;
                case 'product': contentToShow = editProduct;
                    break;
                default: contentToShow = '';
            }
            editContentContainer.innerHTML = contentToShow;
        }
       
        
        editContentContainer.classList.toggle('show');
    });
});
document.addEventListener('click',function(e){
    const eTarget = event.target.classList;
    if(eTarget.contains('close-edit')){
        editContentContainer.classList.toggle('show');
    }else if(eTarget.contains('add-new-flavour')){
        const newNode = document.createElement('select');
        newNode.innerHTML = `
            <option value="1">Nutella</option>
            <option value="2">Chocolate</option>
        `;
        newNode.classList.add('flavour_' + flavourCounter++);

        const parentEl = event.target.parentNode;
        const previousEl = event.target.previousElementSibling;
        parentEl.insertBefore(newNode, previousEl.nextSibling);        
    }
 });
/* document
    .querySelectorAll('form')
        .forEach( (btn) => {
            console.log(btn);
            
            /* btn.addEventListener('submit', function(e) { 
            console.log('this is a debugg part');
            
            editContentContainer.classList.toggle('show');
            }); 
        }); */
