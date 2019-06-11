<?php
    $debuggModeOn = true;
    require_once('../models/db.php');
    $CONN = new Database();

    switch ($_POST['contentType']) {
        case 'admin': return getAdmin((int)$_POST['contentID'], $CONN->db);
            break;
        case 'place': return getPlace((int)$_POST['contentID'], $CONN->db);
            break;
        case 'flavour': return getFlavour((int)$_POST['contentID'], $CONN->db);
            break;
        case 'product': return getProduct((int)$_POST['contentID'], $CONN->db);
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
                place_nameID,
                event_durationID,
                place_gpsID
            from
                event_description
            where
                event_descriptionID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result = $query->fetch_assoc();

            $placeName = getPlaceName($result['place_nameID'], $dbConn);
            $eventDuration = getEventDuration($result['event_durationID'], $dbConn);
            $eventLocation = getPlaceGPS($result['place_gpsID'], $dbConn);

            echo "
                <div class='edit-form-layout'>
                    <form action='#'>
                        <h2>Editar Destino</h2>
                        <label for=''>Cidade PT</label>
                        <input type='text' name='namePT' data-category='place-edit-input' value='".$placeName['placePT']."'>
                        <label for=''>Cidade EN</label>
                        <input type='text' name='nameEN' data-category='place-edit-input' value='".$placeName['placeEN']."'>
                        <label for=''>Desde</label>
                        <input type='date' name='startDate' data-category='place-edit-input' value='".$eventDuration['startDate']."'>
                        <label for=''>Ate</label>
                        <input type='date' name='endDate' data-category='place-edit-input' value='".$eventDuration['endDate']."'>
                        <label for=''>Latitude</label>
                        <input type='text' name='latitude' data-category='place-edit-input' value='".$eventLocation['latitude']."'>
                        <label for=''>Longitude</label>
                        <input type='text' name='longitude' data-category='place-edit-input' value='".$eventLocation['longitude']."'>

                        <div class='edit-btns'>
                            <a class='close-edit self-left'>Voltar</a>
                            <button type='submit' class='btn-form-insert edit-data' id='place-edit-input' data-place-edit-id='".$id."'>Editar</button> 
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
        require('../functions/flavour.php');
        global $debuggModeOn;
        $checkedFlavours = [];
        $selectCounter = 1;

        $sql = "
            select 
                pr_namePT,
                pr_nameEN
            from
                product
            where
                productID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result = $query->fetch_assoc();
            $productFlavoursList = getAllProductFlavours($id, $dbConn);
            $flavoursList = getAllFlavours($dbConn);

            echo "
                <div class='edit-form-layout'> 
                    <form action='#'>
                        <h2>Editar Produto</h2>
                        <label for=''>Portugues</label>
                        <input type='text' name='product_PT' data-category='product-edit-input' value='".$result['pr_namePT']."'>
                        <label for=''>Ingles</label>
                        <input type='text' name='product_EN' data-category='product-edit-input' value='".$result['pr_nameEN']."'>
                        <label for='editFlavourList'>Sabores</label>";
                        for($pfl = 0; $pfl < sizeof($productFlavoursList); $pfl++){
                            echo "<select name='flavour_".$selectCounter."_loaded' data-category='product-edit-input_".$selectCounter."'>";
                                for($fl = 0; $fl < sizeof($flavoursList); $fl++){
                                    if(($productFlavoursList[$pfl] === $flavoursList[$fl]['id'])){
                                        echo "<option value='".$flavoursList[$fl]['id']."' selected>".$flavoursList[$fl]['name']."</option>";
                                        array_push($checkedFlavours, $flavoursList[$fl]['id']);
                                    }else{
                                        echo "<option value='".$flavoursList[$fl]['id']."'>".$flavoursList[$fl]['name']."</option>";
                                    }
                                }
                            echo "</select>";
                            $selectCounter += 1;
                        }                          
                        echo "<a class='add-new-flavour' style='width: fit-content; background-color: transparent; border: none; outline: none; color: #6495ed'>Adicionar novo ?</a>
                        <div class='edit-btns'>
                            <a class='close-edit self-left'>Voltar</a>
                            <button type='submit' class='btn-form-insert edit-data' id='product-edit-input' data-product-edit-id='".$id."'>Editar</button> 
                        </div>
                    </form>        
                    <div class='hide status-message-two-column'></div>
                </div>
            ";
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }

    function getPlaceName(int $id, $dbConn){
        global $debuggModeOn;
        $dataHolder = [];
        $sql = "
            select 
                placePT,
                placeEN
            from
                place_name
            where
                place_nameID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result =  $query->fetch_assoc();
            $dataHolder['placePT'] = $result['placePT'];
            $dataHolder['placeEN'] = $result['placeEN'];

            return $dataHolder;
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function getEventDuration(int $id, $dbConn){
        global $debuggModeOn;
        $dataHolder = [];
        $sql = "
            select 
                startDate,
                endDate
            from
                event_duration
            where
                event_durationID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result =  $query->fetch_assoc();
            $dataHolder['startDate'] = $result['startDate'];
            $dataHolder['endDate'] = $result['endDate'];

            return $dataHolder;
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function getPlaceGPS(int $id, $dbConn){
        global $debuggModeOn;
        $dataHolder = [];
        $sql = "
            select 
                longitude,
                latitude
            from
                place_gps
            where
                place_gpsID = ".$id."
        ";
        if($query = $dbConn->query($sql)){
            $result =  $query->fetch_assoc();
            $dataHolder['longitude'] = $result['longitude'];
            $dataHolder['latitude'] = $result['latitude'];

            return $dataHolder;
        }else{
            echo $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }

    function getAllProductFlavours(int $id, $dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select
                flavour.flavourID,
                fl_namePT
            from
                flavour
            left join 
                product_flavour
            on
                flavour.flavourID = product_flavour.flavourID
            where
                product_flavour.productID = ".$id." 
        ";
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i] = $row['flavourID'];
            $i += 1;
        }
        return $dataHolder;
    }
?>