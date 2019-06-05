<?php
    require_once('../models/db.php');
    $CONN = new Database();
    if($_POST['actionType'] === 'add'){
        if($_POST['categoryType'] === 'admin'){
            require('../models/admin.php');
            echo createAdmin($_POST, $CONN->db);
        }
        else 
            echo 'no admin';
    }
    // var_dump($_POST);
?>