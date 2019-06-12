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
    <div class="edit-form-layout">
        <form action="#">
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
        <div class="hide status-message-two-column"></div>
    </div>
`;
const editPlace = `
    <div class="edit-form-layout">
        <form action="#">
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
        <div class="hide status-message-two-column"></div>
    </div>
    
`;
const editFlavour = `
    <div class="edit-form-layout">
        <form action="#">
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
        <div class="hide status-message-two-column"></div>
    </div>
`;
const editProduct = `
    <div class="edit-form-layout"> 
        <form action="#">
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
        <div class="hide status-message-two-column"></div>
    </div>
`;
/* Listenes to all clicks */
document.addEventListener('click',function(e){
    e.preventDefault();    
    let nextEl = '';
    const eTarget = e.target;
    
    switch(true){
        case eTarget.classList.contains('close-edit'):
            editContentContainer.classList.toggle('show');
            break;
        case eTarget.classList.contains('add-data'):
            insertNewItem(eTarget);      
            break;      
        case eTarget.classList.contains('edit-data'):
            editItem(eTarget);            
            break;
        case (eTarget.closest('a') && eTarget.closest('a').classList.contains('delete-data')):
            deleteItem(eTarget.closest('a.delete-data'));            
            break;
        case (eTarget.closest('a') && eTarget.closest('a').classList.contains('edit-form')):
            showEditForm(eTarget.closest('a.edit-form'))          
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
            console.log('error');
    }
});
/* Collects and creates a new item */
const insertNewItem = function(targetID){
    let x = 'status-message';
    const targetIDParent = targetID.closest('div');
    let statusMessageEl = document.createElement('div')
    targetIDParent.after(statusMessageEl);
    const formCollector = document.querySelectorAll(`[data-category^=${targetID.id}`)
    const categoryType = targetID.id.split('-');
    categoryType[0] === 'admin' ? x = 'status-message-two-column':'';
    statusMessageEl.classList.add('hide',  x);
    const valueHolder = new FormData();

    formCollector.forEach((el) => {
        valueHolder.append(el.name, el.value);
        // console.log(el.name, el.value);
    });
    
    valueHolder.append('categoryType', categoryType[0]);
    valueHolder.append('actionType', categoryType[1]);
    
/*     for (var pair of valueHolder.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    } */

    let spinner = document.createElement("div"); 
        spinner.classList.add('sk-folding-cube', 'btn-col-right');
        spinner.innerHTML = `
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
        `;

    targetID.classList.add('hide');
    targetIDParent.appendChild(spinner);

    fetch('./async/create.php', {
        method: 'POST',
        body: valueHolder
    })
    .then(response => response.text())
    .then(data => {
        setTimeout(function(){ 
            if(!data){
                statusMessageEl.innerHTML = 'Informacao inserida!';
                statusMessageEl.style.color = 'green';
            }else{
                statusMessageEl.innerHTML = 'Houve um erro ao inserir!';
                statusMessageEl.style.color = 'red';
            }
            statusMessageEl.classList.remove('hide');
            targetID.classList.remove('hide');
            spinner.remove();
            setTimeout(function(){
                statusMessageEl.classList.add('hide');
                statusMessageEl.innerHTML = '';
            }, 5000)
            
        }, 3000);
        console.log(data);
    })
    .catch((error) =>{
        console.log(error);
    });
    
    //Cleans the input area from content
    /* formCollector.forEach( (el) => {
        el.value = '';
    }); */
}
/* Collects and post the updated data */
const editItem = function(targetID){
    const targetIDParent = targetID.closest('div');
    let statusMessageEl = document.createElement('div');
    targetIDParent.after(statusMessageEl);
    statusMessageEl.classList.add('hide', 'status-message-two-column');  
    const formCollector = document.querySelectorAll(`[data-category^=${targetID.id}`)
    const holder = targetID.id.split('-');
    const modifiedTargetID = `${holder[0]}-${holder[1]}-id`;
    const itemID = targetID.getAttribute(`data-${modifiedTargetID}`)
    const valueHolder = new FormData();

    formCollector.forEach( (el) => {
        valueHolder.append(el.name, el.value);
        // console.log(el.name, el.value);
    });
    valueHolder.append('itemID', itemID);
    valueHolder.append('categoryType', holder[0]);
    valueHolder.append('actionType', holder[1]);

/*     for (var pair of valueHolder.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    } */

    let spinner = document.createElement("div"); 
        spinner.classList.add('sk-folding-cube', 'btn-col-right');
        spinner.innerHTML = `
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
        `;

    targetID.classList.add('hide');
    targetIDParent.appendChild(spinner);

    fetch('./async/edit.php', {
        method: 'POST',
        body: valueHolder
    })
    .then(response => response.text())
    .then(data => {
        setTimeout(function(){ 
            if(!data){
                statusMessageEl.innerHTML = 'Informacao actualizada!';
                statusMessageEl.style.color = 'green';
            }else{
                statusMessageEl.innerHTML = 'Houve um erro ao actualizar!';
                statusMessageEl.style.color = 'red';
            }
            statusMessageEl.classList.remove('hide');
            targetID.classList.remove('hide');
            spinner.remove();
            setTimeout(function(){
                statusMessageEl.classList.add('hide');
                statusMessageEl.innerHTML = '';
            }, 3000)
            
        }, 1500);
        console.log(data);
    })
    .catch((error) =>{
        statusMessageEl.innerHTML = 'Houve um erro ao actualizar!';
        statusMessageEl.style.color = 'red';
        statusMessageEl.classList.remove('hide');
        targetID.classList.remove('hide');
        spinner.remove();
        setTimeout(function(){
            statusMessageEl.classList.add('hide');
            statusMessageEl.innerHTML = '';
        }, 1500)
        
        console.log(error);
    });

    //Cleans the input area from content
    /* formCollector.forEach( (el) => {
        el.value = '';
    }); */
}

const deleteItem = function(targetID){
    const valueHolder = new FormData();
    const categoryType = targetID.getAttribute('data-category');
    const id = targetID.getAttribute(`data-${categoryType}-id`);
    valueHolder.append('itemID', id);
    valueHolder.append('categoryType', categoryType);
    valueHolder.append('actionType', 'delete');

    // for (var pair of valueHolder.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    fetch('./async/delete.php', {
        method: 'POST',
        body: valueHolder
    })
    .then(response => response.text())
    .then(data => {
        var i;
        var parentSpan = targetID.closest('span');
        var previousParent;

        if(categoryType == 'place')
            i = 5;
        else if(categoryType == 'flavour' || categoryType == 'product')
            i = 2;
        else if(categoryType == 'admin')
            i = 3;        
        if(!data){
            for(var c = 0; c < i; c++){
                previousParent = parentSpan.previousElementSibling;
                parentSpan.remove();
                parentSpan = previousParent;
            }     
        }else{
            console.log(data);
        }   
    })
    .catch((error) =>{
        console.log(error);
    });    
};
const fetchItemToEdit = (contentType, contentID) => {
    const valueHolder = new FormData();
    valueHolder.append('contentType', contentType);
    valueHolder.append('contentID', contentID);
    fetch('./async/fetch-to-edit.php', {
        method: 'POST',
        body: valueHolder
    })
    .then((response) => response.text())
    .then((data) => {
        if(data != 99){
            console.log(data);
            editContentContainer.innerHTML = data;
            // return data;
        }else{    
            console.log(data);
        }
    })
    .catch((error) => {console.log(error)});
};
const showEditForm = function(targetID){
    const dataType = ((targetID.getAttribute('data-category')) ? targetID.getAttribute('data-category') : false);
    const contentID = targetID.getAttribute(`data-${dataType}-id`);

    if(dataType){
        /* 
        ___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___*/

        fetchItemToEdit(dataType, contentID);  
        
        
        // let contentToShow = '';
        // switch(dataType){
        //     case 'admin': contentToShow = editAdmin;
        //         break;
        //     case 'place': contentToShow = editPlace;
        //         break;
        //     case 'flavour': contentToShow = editFlavour;
        //         break;
        //     case 'product': contentToShow = editProduct;
        //         break;
        //     default: contentToShow = '';
        // }
        // editContentContainer.innerHTML = contentToShow;
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
         
    /*___THIS SHOULD BE UNCOMMENTED WHEN SERVER IMPLEMENTATION IS DONE___

    Gets the flavours from the DB and shows them in the select*/

    fetch('./async/fetch-flavours-list.php', {
        method: 'GET'
    })
    .then((response) => response.text())
    .then((data) => {
        newNode.innerHTML = data;
        parentEl.insertBefore(newNode, previousEl.nextSibling);
        console.log('worked');
    })
    .catch((error) =>{
        console.log(error);
    }); 

    // newNode.innerHTML = `
    //     <option value="1">Nutella</option>
    //     <option value="2">Chocolate</option>
    // `;
}