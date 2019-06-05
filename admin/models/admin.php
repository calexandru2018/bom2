<?php 
    function createAdmin(Array $admin, $dbConn){
        $sql = "
        insert into admin (
            name, 
            email, 
            password,
            ".(($admin['phoneNumber']) ? 'phone_number':'').") 
        values (
            '".$admin['name']."',
            '".$admin['email']."',
            '".$admin['pwd']."',
            '".(($admin['phoneNumber']) ? $admin['phoneNumber']:'')."')
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $sql;
    }
?>