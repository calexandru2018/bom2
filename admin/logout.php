<?php
	session_start();
	if(isset($_SESSION['admin_token']) || !empty($_SESSION['admin_token'])){
		session_unset();
        session_destroy();
        header('Location: ./index.php');
	}
?>