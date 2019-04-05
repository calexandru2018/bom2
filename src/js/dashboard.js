import 'normalize.css';
import '../css/dashboard.css';
import '../img/logo.png';
import '../img/favicon16.ico';
import '../img/edit.svg';
import '../img/remove.svg';
import '../img/settings.svg';
import '../img/logout.svg';
let flavourCounter = 1;
const editContentContainer = document.getElementById('edit-content');
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
            <button type="submit" class="btn-form-insert edit-data" id="admin-edit-input" data-admin-edit-id="1">Editar</button> 
        </div>
    </form>
`;
const editPlace = `
    <form action="#" class="edit-form">
        <h2>Editar Destino</h2>
        <label for="">Cidade</label>
        <input type="text" name="city" data-category="place-edit-input">
        <label for="">Desde</label>
        <input type="date" name="start" data-category="place-edit-input">
        <label for="">Ate</label>
        <input type="date" name="end" data-category="place-edit-input">
        <label for="">Latitude</label>
        <input type="text" name="latitude" data-category="place-edit-input">
        <label for="">Longitude</label>
        <input type="text" name="longitude" data-category="place-edit-input">

        <div class="edit-btns">
            <a class="close-edit self-left">Voltar</a>
            <button type="submit" class="btn-form-insert edit-data" id="place-edit-input" data-place-edit-id="1">Editar</button> 
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
            <button type="submit" class="btn-form-insert edit-data" id="flavour-edit-input" data-flavour-edit-id="1">Editar</button> 
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
            <button type="submit" class="btn-form-insert edit-data" id="product-edit-input" data-product-edit-id="1">Editar</button> 
        </div>
    </form>
`;
/* Listenes to all clicks */
document.addEventListener('click',function(e){
    e.preventDefault();    
    let nextEl = '';
    const eTarget = e.target;
    console.log("this is eTarget: ", eTarget);
    
    switch(true){
        case eTarget.classList.contains('close-edit'):
            editContentContainer.classList.toggle('show');
            break;
        case eTarget.classList.contains('add-data'):
            insertNewItem(eTarget.id);      
            break;      
        case eTarget.classList.contains('edit-data'):
            editItem(eTarget.id);            
            break;
        case (eTarget.closest('a') && eTarget.closest('a').classList.contains('delete-data')):
            deleteItem(eTarget.closest('a.delete-data'));            
            break;
        case (eTarget.closest('a') && eTarget.closest('a').classList.contains('edit-form-form')):
            showEditForm(eTarget.closest('a.edit-form-form'))          
            break;
        case eTarget.classList.contains('add-new-flavour'):
            addNewFlavourToProduct(eTarget);
            break;
        case (eTarget.closest('button') && eTarget.closest('button').classList.contains('show-settings')):
            settingsOverlay.classList.toggle('display-grid');
            break;
        case (eTarget.classList.contains('btn-primary')):
            nextEl = eTarget.nextElementSibling;
            nextEl.classList.toggle('display-grid'); 
            break;
        case (eTarget.classList.contains('btn-secondary')):
            nextEl = eTarget.nextElementSibling;
            nextEl.classList.toggle('display-grid');
            break;
        default:
            console.log('');
    }
});
/* Collects and creates a new item */
const insertNewItem = function(targetID){
    const formCollector = document.querySelectorAll(`[data-category^=${targetID}`)
    const valueHolder = new FormData();

    console.log('Insert new item');
    
    formCollector.forEach( (el) => {
        valueHolder.append(el.name, el.value);
        console.log(el.name, el.value);
    });
    valueHolder.append('categoryType', 'flavour/place/product');
    valueHolder.append('actionType', 'add');
    
    fetch('path/to/async/file', {
        method: 'POST',
        body: valueHolder
    })
    .then(response => response.text())
    .then(data => {
        alert('Inserted new item');
    })
    .catch((error) =>{
        console.log(error);
    });
    
    //Cleans the input area from content
    /* formCollector.forEach( (el) => {
        el.value = '';
    }); */

    return valueHolder;
}
/* Collects and post the updated data */
const editItem = function(targetID){
    const formCollector = document.querySelectorAll(`[data-category^=${targetID}`)
    const valueHolder = new FormData();

    console.log('Edit existing item');
    const holder = targetID.split('-');
    const modifiedTargetID = holder[0] + '-' + holder[1] + '-' + 'id';

    formCollector.forEach( (el) => {
        valueHolder.append(el.name, el.value);
        console.log(el.name, el.value);
    });
    valueHolder.append('itemID', 'itemID');
    valueHolder.append('categoryType', 'place/flavour/product');
    valueHolder.append('actionType', 'edit');

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

    //Cleans the input area from content
    /* formCollector.forEach( (el) => {
        el.value = '';
    }); */
}

const deleteItem = function(targetID){
    const valueHolder = new FormData();

    console.log("All under is delete");
    console.log(targetID, 'need to specify category');

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
};
const fetchItemToEdit = (contentType, contentID) => {
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
const showEditForm = function(targetID){
    console.log('inside show edit form: ', targetID);
    
    const dataType = ((targetID.getAttribute('data-type')) ? targetID.getAttribute('data-type') : false);
    const contentID = targetID.getAttribute(`data-${dataType}-id`);

    if(dataType){
        /* 
        ___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___

        editContentContainer.innerHTML = fetchItemToEdit(dataType, contentID);  
        
        */
        let contentToShow = '';
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
}
const addNewFlavourToProduct = function(target){
    //Adds new select box with a new flavour to "add to a product" function
    flavourCounter++;
    const newNode = document.createElement('select');   
    newNode.name = 'flavour_' + flavourCounter;   
    const parentEl = target.parentNode;
    const previousEl = target.previousElementSibling;
    const categoryType = previousEl.getAttribute('data-category').split('-');
     
    newNode.setAttribute('data-category', 'product-' + categoryType[1] + '-input_' + flavourCounter);
/*         
    ___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___

    Gets the flavours from the DB and shows them in the select

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