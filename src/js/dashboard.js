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
            <a class="close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert edit-data" id="admin-edit-input" data-edit-id="1">Editar</button> 
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
            <a class="close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert edit-data" id="place-edit-input" data-edit-id="1">Editar</button> 
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
            <a class="close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert edit-data" id="flavour-edit-input" data-edit-id="1">Editar</button> 
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
            <a class="close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert edit-data" id="product-edit-input" data-edit-id="1">Editar</button> 
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
/* Shows the edit forms */
document.querySelectorAll('.edit-admin, .edit-place, .edit-flavour, .edit-product').forEach( (btn) => {
    btn.addEventListener('click', function(e) {
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
    e.preventDefault();    
    const eTarget = event.target;
    if(eTarget.classList.contains('close-edit')){
        editContentContainer.classList.toggle('show');
    }else if(eTarget.classList.contains('edit-data')){
        //should check type of category
        const categoryType = event.target.id.split('-')[0];
        switch(categoryType){
            case 'admin':   console.log('Call edit admin function');
                            //call function;
                break;
            case 'place':   console.log('Call edit place function');
                            //call function;
                break;
            case 'flavour': console.log('Call edit flavour function');
                            //call function;
                break;
            case 'product': console.log('Call edit product function');
                            //call function;
                break;
        }
        //call the required function for the category
    }else if(eTarget.classList.contains('add-new-flavour')){
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
    }else if(eTarget.classList.contains('add-data')){
        const valueHolder = new FormData();
        console.log(eTarget.id);
        const formCollector = document.querySelectorAll('[data-category^=' + eTarget.id + ']');
        formCollector.forEach( (el) => {
            valueHolder.append(el.name, el.value);
            console.log(el.name, el.value);
        });
        // asyncAction(valueHolder, 1);
        formCollector.forEach( (el) => {
            el.value = '';
        });
    }
});
let asyncAction = (formCollection, actionType) => {
    /*
        Action type:
        1 - Insert
        2 - Edit
    */
   formCollection.append('actionType', actionType);
    fetch('path/to/async/file', {
        method: 'POST',
        body: formCollection
    })
    .then(response => response.text())
    .then(data => {
        alert('Action accomplished');
    });
}