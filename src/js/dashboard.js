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
            <button type="submit" class="btn-form-insert edit-data" id="place-edit-input" data-place-edit-input="1">Editar</button> 
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
            <button type="submit" class="btn-form-insert edit-data" id="flavour-edit-input" data-flavour-edit-input="1">Editar</button> 
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
            <button type="submit" class="btn-form-insert edit-data" id="product-edit-input" data-product-edit-input="1">Editar</button> 
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
            /* 
            ___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___

            editContentContainer.innerHTML = showEditForm(dataType);  
            
            */
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
    console.log(eTarget);
    
    if(eTarget.classList.contains('close-edit')){
        //Closes the edit panel
        editContentContainer.classList.toggle('show');
    }else if(eTarget.classList.contains('add-data')){
        //Calls function to insert new object based on the target id
        asyncCollectAndSubmit(eTarget.id);
    }else if(eTarget.classList.contains('edit-data')){
        //Calls function to edit existing object based on the target id
        asyncCollectAndSubmit(event.target.id);
    }else if(eTarget.classList.contains('test-data')){
        //Calls function to delete object based on the target id
        console.log('in edit');
        // asyncCollectAndSubmit(eTarget.id);
    }else if(eTarget.classList.contains('add-new-flavour')){
        //Adds new select box with a new flavour to add to a product
        flavourCounter++;
        const newNode = document.createElement('select');   
        newNode.name = 'flavour_' + flavourCounter;   
        const parentEl = event.target.parentNode;
        const previousEl = event.target.previousElementSibling;
        const categoryType = previousEl.getAttribute('data-category').split('-');
        
        newNode.setAttribute('data-category', 'product-' + categoryType[1] + '-input_' + flavourCounter);
/*         
        ___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___

        fetch('path/to/file/to/get/flavours', {
            method: 'GET'
        })
        .then((response) => response.text())
        .then((data) => {
            // newNode.innerHTML = data;
            console.log('worked');
        })
        .catch((error) =>{
            console.log(error);
        }); 
*/
        newNode.innerHTML = `
            <option value="1">Nutella</option>
            <option value="2">Chocolate</option>
        `;
        parentEl.insertBefore(newNode, previousEl.nextSibling);        
    }
});
const asyncCollectAndSubmit = (targetID) => {   
    /*
        Action type:
        1 - Insert/Add
        2 - Edit
        3 - Delete
    */ 
    const formCollector = document.querySelectorAll(`[data-category^=${targetID}`);
    const valueHolder = new FormData();
    const categoryType = targetID.split('-')[0];
    const actionType = targetID.split('-')[1];
    const itemID = (actionType != 'add') ? document.getElementById(targetID).getAttribute('data-' + targetID) : false;
    console.log(categoryType, actionType, itemID);

    formCollector.forEach( (el) => {
        valueHolder.append(el.name, el.value);
        console.log(el.name, el.value);
    });
    //Cleans the input area from content
    formCollector.forEach( (el) => {
        el.value = '';
    });
    valueHolder.append('categoryType', categoryType);
    valueHolder.append('actionType', actionType);
    //Append itemID if positive, meaning that the clients wants to edit the value
    if(itemID)
        valueHolder.append('itemID', itemID);
/*     
    ___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___

    fetch('path/to/async/file', {
        method: 'POST',
        body: valueHolder
    })
    .then(response => response.text())
    .then(data => {
        alert('Action accomplished');
    })
    .catch((error) =>{
        console.log(error);
    }); 
*/
}
const showEditForm = (contentType, contentID) => {
    const valueHolder = new FormData();
    valueHolder.append('contentType', contentType);
    valueHolder.append('contentID', contentID);
    fetch('path/to/file', {
        method: 'POST',
        body: valueHolder
    })
    .then((response) => response.text())
    .then((data) => {
        return data;
    })
    .catch((error) => {console.log(error)});
};