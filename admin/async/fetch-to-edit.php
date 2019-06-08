<?php
    $debuggModeOn = true;
    require_once('../models/db.php');
    $CONN = new Database();
    $editAdmin = "
        <div class='edit-form-layout'>
            <form action='#'>
                <h2>Editar Administrador</h2>
                <label for='email'>E-mail*</label>
                <input type='email' name='email' data-category='admin-edit-input'>
                <label for='password'>Palavra Passe*</label>
                <input type='passwird' name='pwd' data-category='admin-edit-input'>
                <label for='name'>Nome*</label>
                <input type='text' name='name' data-category='admin-edit-input'>
                <label for='phoneNumber'>Telefone</label>
                <input type='tel' name='phoneNumber' data-category='admin-edit-input'>
                <div class='edit-btns'>
                    <a class='close-edit self-left'>Voltar</a>
                    <button type='submit' class='btn-form-insert edit-data' id='admin-edit-input' data-admin-edit-id='1'>Editar</button> 
                </div>
            </form>
            <div class='hide status-message-two-column'></div>
        </div>
    ";

    $editPlace = "
        <div class='edit-form-layout'>
            <form action='#'>
                <h2>Editar Destino</h2>
                <label for=''>Cidade</label>
                <input type='text' name='city' data-category='place-edit-input'>
                <label for=''>Desde</label>
                <input type='date' name='start' data-category='place-edit-input'>
                <label for=''>Ate</label>
                <input type='date' name='end' data-category='place-edit-input'>
                <label for=''>Latitude</label>
                <input type='text' name='latitude' data-category='place-edit-input'>
                <label for=''>Longitude</label>
                <input type='text' name='longitude' data-category='place-edit-input'>

                <div class='edit-btns'>
                    <a class='close-edit self-left'>Voltar</a>
                    <button type='submit' class='btn-form-insert edit-data' id='place-edit-input' data-place-edit-id='1'>Editar</button> 
                </div>
            </form>
            <div class='hide status-message-two-column'></div>
        </div>
    ";
    $editFlavour = "
    <div class='edit-form-layout'>
        <form action='#'>
            <h2>Editar Sabor</h2>
            <label for=''>Portugues</label>
            <input type='text' name='flavours_PT' data-category='flavour-edit-input'>
            <label for=''>Ingles</label>
            <input type='text' name='flavours_EN' data-category='flavour-edit-input'>

            <div class='edit-btns'>
                <a class='close-edit self-left'>Voltar</a>
                <button type='submit' class='btn-form-insert edit-data' id='flavour-edit-input' data-flavour-edit-id='1'>Editar</button> 
            </div>
        </form>
        <div class='hide status-message-two-column'></div>
    </div>
    ";
    $editProduct = "
    <div class='edit-form-layout'> 
        <form action='#'>
            <h2>Editar Produto</h2>
            <label for=''>Portugues</label>
            <input type='text' name='flavours_PT' data-category='product-edit-input'>
            <label for=''>Ingles</label>
            <input type='text' name='flavours_EN' data-category='product-edit-input'>
            <label for='editFlavourList'>Sabores</label>
            <select name='flavour_1' data-category='product-edit-input_1'>
                <option value='1' selected>Nutella</option>
                <option value='2'>Chocolate</option>
            </select>
            <a class='add-new-flavour' style='width: fit-content; background-color: transparent; border: none; outline: none; color: #6495ed'>Adicionar novo ?</a>

            <div class='edit-btns'>
                <a class='close-edit self-left'>Voltar</a>

                <button type='submit' class='btn-form-insert edit-data' id='product-edit-input' data-product-edit-id='1'>Editar</button> 
            </div>
        </form>        
        <div class='hide status-message-two-column'></div>
    </div>
    ";
    switch ($_POST['contentType']) {
        case 'admin': return getAdmin((int)$_POST['contentID'], $CONN->db);
            break;
        case 'place': echo $editPlace;
            break;
        case 'flavour': return getFlavour((int)$_POST['contentID'], $CONN->db);
            break;
        case 'product': echo $editProduct;
            break;
        default: return 99;
            break;
    }

    function getAdmin(int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            select 
                name,
                email,
                phone_number
            from
                admin
            where
                adminID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result = $query->fetch_assoc();
            echo "
                <div class='edit-form-layout'>
                    <form action='#'>
                        <h2>Editar Administrador</h2>
                        <label for='email'>E-mail*</label>
                        <input type='email' name='email' data-category='admin-edit-input' value='".$result['email']."'>
                        <label for='password'>Palavra Passe*</label>
                        <input type='password' name='pwd' data-category='admin-edit-input'>
                        <label for='name'>Nome*</label>
                        <input type='text' name='name' data-category='admin-edit-input' value='".$result['name']."'>
                        <label for='phoneNumber'>Telefone</label>
                        <input type='tel' name='phoneNumber' data-category='admin-edit-input' value='".$result['phone_number']."'>
                        <div class='edit-btns'>
                            <a class='close-edit self-left'>Voltar</a>
                            <button type='submit' class='btn-form-insert edit-data' id='admin-edit-input' data-admin-edit-id='".$id."'>Editar</button> 
                        </div>
                    </form>
                    <div class='hide status-message-two-column'></div>
                </div>
            ";
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function getPlace(int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            select 
                name,
                email,
                phone_number
            from
                admin
            where
                adminID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result = $query->fetch_assoc();
            echo "
                <div class='edit-form-layout'>
                    <form action='#'>
                        <h2>Editar Administrador</h2>
                        <label for='email'>E-mail*</label>
                        <input type='email' name='email' data-category='admin-edit-input' value='".$result['email']."'>
                        <label for='password'>Palavra Passe*</label>
                        <input type='password' name='pwd' data-category='admin-edit-input'>
                        <label for='name'>Nome*</label>
                        <input type='text' name='name' data-category='admin-edit-input' value='".$result['name']."'>
                        <label for='phoneNumber'>Telefone</label>
                        <input type='tel' name='phoneNumber' data-category='admin-edit-input' value='".$result['phone_number']."'>
                        <div class='edit-btns'>
                            <a class='close-edit self-left'>Voltar</a>
                            <button type='submit' class='btn-form-insert edit-data' id='admin-edit-input' data-admin-edit-id='".$id."'>Editar</button> 
                        </div>
                    </form>
                    <div class='hide status-message-two-column'></div>
                </div>
            ";
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function getFlavour(int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            select 
                fl_namePT,
                fl_nameEN
            from
                flavour
            where
                flavourID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result = $query->fetch_assoc();
            echo "
                <div class='edit-form-layout'>
                    <form action='#'>
                        <h2>Editar Sabor</h2>
                        <label for=''>Portugues</label>
                        <input type='text' name='flavours_PT' data-category='flavour-edit-input' value='".$result['fl_namePT']."'>
                        <label for=''>Ingles</label>
                        <input type='text' name='flavours_EN' data-category='flavour-edit-input' value='".$result['fl_nameEN']."'>
            
                        <div class='edit-btns'>
                            <a class='close-edit self-left'>Voltar</a>
                            <button type='submit' class='btn-form-insert edit-data' id='flavour-edit-input' data-flavour-edit-id='".$id."'>Editar</button> 
                        </div>
                    </form>
                    <div class='hide status-message-two-column'></div>
                </div>
            ";
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function getProduct(int $id, $dbConn){
        $flavoursList = getAllProductFlavours($id, $dbConn);
    }

    function getPlaceName(int $id, $dbConn){
        
    }
    function getEventDuration(int $id, $dbConn){
        
    }
    function getEventGPS(int $id, $dbConn){

    }

    function getAllProductFlavours(int $id, $dbConn){

    }
?>