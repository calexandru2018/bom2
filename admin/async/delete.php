<?php
    require_once('../models/db.php');
    $CONN = new Database();
    if($_POST['actionType'] === 'delete'){
        if($_POST['categoryType'] === 'admin'){
            require('../models/admin.php');
            $response = deleteAdmin($_POST['itemID'], $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'place'){
            require('../models/place.php');
            $response = deleteEventDescription($_POST['itemID'], $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'flavour'){
            require('../models/flavour.php');
            $response = deleteFlavour($_POST['itemID'], $CONN->db);
            echo $response!=1 ? $response:'';
        }
        if($_POST['categoryType'] === 'product'){
            require('../models/product.php');
            $response = deleteProduct($_POST['itemID'], $CONN->db);
            echo $response!=1 ? $response:'';
        }
    }
    // var_dump($_POST);
?>