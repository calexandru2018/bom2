<?php
    require_once('../models/db.php');
    $CONN = new Database();
    if($_POST['actionType'] === 'add'){
        if($_POST['categoryType'] === 'admin'){
            require('../models/admin.php');
            $response = createAdmin($_POST, $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'place'){
            require('../models/place.php');
            $response = createPlace($_POST, $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'flavours'){
            require('../models/flavour.php');
            $response = createFlavour($_POST, $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'product'){
            require('../models/product.php');
            $response = createProductFlavour($_POST, $CONN->db);
            echo $response!=1 ? $response:'';
        }
    }
    // var_dump($_POST);
?>