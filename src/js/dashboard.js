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
        <input type="email" name="email" data-category="admin-edit-input">
        <label for="password">Palavra Passe*</label>
        <input type="passwird" name="pwd" data-category="admin-edit-input">
        <label for="name">Nome*</label>
        <input type="text" name="name" data-category="admin-edit-input">
        <label for="phoneNumber">Telefone</label>
        <input type="tel" name="phoneNumber" data-category="admin-edit-input">

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="admin-edit-input">Editar</button> 
        </div>
    </form>
`;
const editPlace = `
    <form action="#" class="edit-form">
        <h2>Editar Destino</h2>
        <label for="">Cidade</label>
        <input type="text" name="name" data-category="place-edit-input">
        <label for="">Desde</label>
        <input type="date" name="name" data-category="place-edit-input">
        <label for="">Ate</label>
        <input type="date" name="name" data-category="place-edit-input">
        <label for="">Latitude</label>
        <input type="text" name="latitude" data-category="place-edit-input">
        <label for="">Longitude</label>
        <input type="text" name="longitude" data-category="place-edit-input">

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="place-edit-input">Editar</button> 
        </div>
    </form>
`;
const editFlavour = `
    <form action="#" class="edit-form">
        <h2>Editar Sabor</h2>
        <label for="">Portugues</label>
        <input type="text" name="flavours_PT" data-category="flavour-edit-input">
        <label for="">Ingles</label>
        <input type="text" name="flavours_EN" data-category="flavour-edit-input">

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="flavour-edit-input">Editar</button> 
        </div>
    </form>
`;
const editProduct = `
    <form action="#" class="edit-form">
        <h2>Editar Produto</h2>
        <label for="">Portugues</label>
        <input type="text" name="flavours_PT" data-category="product-edit-input">
        <label for="">Ingles</label>
        <input type="text" name="flavours_EN" data-category="product-edit-input">
        <label for="editFlavourList">Sabores</label>
        <select name="flavour_1" data-category="product-edit-input_1">
            <option value="1" selected>Nutella</option>
            <option value="2">Chocolate</option>
        </select>
        <a class="add-new-flavour" style="width: fit-content; background-color: transparent; border: none; outline: none; color: #6495ed">Adicionar novo ?</a>

        <div class="edit-btns">
            <a class="btn-form-insert close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert" id="product-edit-input">Editar</button> 
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
        flavourCounter++;
        const newNode = document.createElement('select');   
        newNode.name = 'flavour_' + flavourCounter;   
        const parentEl = event.target.parentNode;
        const previousEl = event.target.previousElementSibling;
        const categoryType = previousEl.getAttribute('data-category').split('-');
        
        newNode.setAttribute('data-category', 'product-' + categoryType[1] + '-input_' + flavourCounter);
        newNode.innerHTML = `
            <option value="1">Nutella</option>
            <option value="2">Chocolate</option>
        `;

        parentEl.insertBefore(newNode, previousEl.nextSibling);        
    }
 });
