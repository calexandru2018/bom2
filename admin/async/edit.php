<?php
    require_once('../models/db.php');
    $CONN = new Database();
    if($_POST['actionType'] === 'edit'){
        if($_POST['categoryType'] === 'admin'){
            require('../models/admin.php');
            $response = updateAdmin($_POST, $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'place'){
            require('../models/place.php');
            $response = createPlace($_POST, $CONN->db, false); //false means that we are specifying that the function is not insterting new place, its "updating" it instead
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'flavour'){
            require('../models/flavour.php');
            $response = updateFlavour($_POST, $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'product'){
            require('../models/product.php');
            $response = createProductFlavour($_POST, $CONN->db, false); //false means that we are specifying that the function is not insterting new product, its "updating" it instead
            echo $response!=1 ? $response:'';
        }
    }
    // var_dump($_POST);
?>