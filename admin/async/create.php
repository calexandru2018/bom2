<?php
    require_once('../models/db.php');
    $CONN = new Database();
    if($_POST['actionType'] === 'add'){
        if($_POST['categoryType'] === 'admin'){
            require('../models/admin.php');
            echo createAdmin($_POST, $CONN->db);
        }
        if($_POST['categoryType'] === 'place'){
            require('../models/place.php');
            echo createPlace($_POST, $CONN->db);
        }
        if($_POST['categoryType'] === 'flavours'){
            require('../models/flavour.php');
            echo createFlavour($_POST, $CONN->db);
        }
        if($_POST['categoryType'] === 'product'){
            require('../models/product.php');
            echo createProductFlavour($_POST, $CONN->db);
        }
    }
    // var_dump($_POST);
?>