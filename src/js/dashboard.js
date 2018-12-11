import 'normalize.css';
import '../css/dashboard.css';
import '../img/logo.png';
import '../img/favicon16.ico';
import '../img/edit.svg';
import '../img/remove.svg';
import '../img/settings.svg';
import '../img/logout.svg';
const settingsOverlay = document.getElementById('settings-overlay');
const editAdmin = `
    <form class="edit-form">
        <h2>Editar Administrador</h2>
        <label for="email">E-mail*</label>
        <input type="email" name="email">
        <label for="password">Palavra Passe*</label>
        <input type="passwird" name="pwd">
        <label for="name">Nome*</label>
        <input type="text" name="name">
        <label for="phoneNumber">Telefone</label>
        <input type="tel" name="phoneNumber">

        <div class="edit-admin-buttons">
            <button class="btn-form-insert edit-admin self-left">Voltar</button>
            <button class="btn-form-insert" id="admin-edit-btn self-right">Editar</button> 
        </div>
    </form>
`;
const editPlace = `
    <form class="edit-form">
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
            <button class="btn-form-insert edit-place self-left">Voltar</button>
            <button class="btn-form-insert" id="admin-edit-btn self-right">Editar</button> 
        </div>
    </form>
`;
const editFlavour = `
    <form class="edit-form">
        <h2>Editar Sabor</h2>
        <label for="">Portugues</label>
        <input type="text" name="flavours_PT">
        <label for="">Ingles</label>
        <input type="text" name="flavours_EN">

        <div class="edit-btns">
            <button class="btn-form-insert edit-flavour self-left">Voltar</button>
            <button class="btn-form-insert" id="admin-edit-btn self-right">Editar</button> 
        </div>
    </form>
`;
const editProduct = `
    <form class="edit-form">
        <h2>Editar Produto</h2>
        <label for="">Portugues</label>
        <input type="text" name="flavours_PT">
        <label for="">Ingles</label>
        <input type="text" name="flavours_EN">
        <label for="editFlavourList">Sabores</label>
        <select name="flavour" id="editFlavourList">
            <option value="1" selected>Nutella</option>
            <option value="2">Chocolate</option>
        </select>
        <button>Adicionar novo ?</button>

        <div class="edit-btns">
            <button class="btn-form-insert edit-product self-left">Voltar</button>
            <button class="btn-form-insert" id="admin-edit-btn self-right">Editar</button> 
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
    btn.addEventListener('click', function() {
        var dataType = this.getAttribute('data-type');
        console.log(dataType);
        var editContentContainer = document.getElementById('edit-content');
        
        if(!dataType){
            editContentContainer.classList.toggle('show');
        }else{
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
            console.log(contentToShow);
            
            editContentContainer.innerHTML = contentToShow;
            editContentContainer.classList.toggle('show');
        }
    });
});
