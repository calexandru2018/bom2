<?php

    if(isset($_POST['cookie-resp']) || !empty($_POST['cookie-resp'])){
        setcookie('accept_cookie', md5(1),  time()+60*60*24*30, "/bom2", '', false); //localhost
        echo true;
    }
?>