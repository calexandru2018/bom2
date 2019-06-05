<?php
    session_start();
    if(!isset($_SESSION['csrf_token']) || empty($_SESSION['csrf_token'])){
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        header('Refresh: 0');
    }
    if(isset($_SESSION['admin_token']) && !empty($_SESSION['admin_token'])){
        header('Location: ./dashboard.php');
    }
    if(isset($_POST) && !empty($_POST['adminUsername']) && !empty($_POST['adminPassword']) && $_SESSION['csrf_token']){
        require('./models/db.php');

        $CONN = new Database();

        $user = mysqli_real_escape_string($CONN->db, $_POST['adminUsername']);
        $pass = mysqli_real_escape_string($CONN->db, $_POST['adminPassword']);

        $query = $CONN->db->query("select adminID, password from admin where email = '$user'");
        if ($query->num_rows === 0) {
            echo "here";
        }else{
            $fetchObject = $query->fetch_object();
            if(password_verify($pass, $fetchObject->password)){
                $_SESSION['admin_token'] = $fetchObject->adminID;
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
                header('Location: ./dashboard.php');
            }else{
                echo "password missmatch";
            }
        }
        $query->close();
    }else{
        echo 0;
    }
    // echo password_hash('test', PASSWORD_BCRYPT);
    /*
        password_hash(mysqli_real_escape_string($this->db, $value), PASSWORD_BCRYPT);
        if(password_verify($pwd, $fetchAdminData->password)){    
    */
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - Bom&sup2;</title>
<link href="assets/css/vendors~index.css?818e20abaae123fdbd40" rel="stylesheet"><link href="assets/css/login.css?818e20abaae123fdbd40" rel="stylesheet"></head>
<body>
    <div class="page-wrapper">
        <img class="self-center" src="assets/img/logo.png" alt="Imagem do administractor" srcset="">
        <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?> method="POST" class="login-form">
            <label for="username">Utilizador</label>
            <input type="text" name="adminUsername" id="adminUsername">
            <label for="adminPassword">Password</label>
            <input type="password" name="adminPassword" id="adminPassword">
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token'] ?>">
            <button type="submit" class="btn btn-primary">Entrar</button>
        </form>
    </div>
<script type="text/javascript" src="assets/js/vendors~index.js?818e20abaae123fdbd40"></script><script type="text/javascript" src="assets/js/login.js?818e20abaae123fdbd40"></script></body>
</html>