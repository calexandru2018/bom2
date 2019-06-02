<?php

    if(isset($_POST['cookie-resp']) || !empty($_POST['cookie-resp'])){
        setcookie('acceptCookie', '1',  time()+60*60*24*30, '/', '', true);
        echo true;
    }
?>