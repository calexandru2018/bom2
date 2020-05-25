<?php 
    $debuggModeOn = true;
    function createAdmin(Array $admin, $dbConn){
        global $debuggModeOn;
        
        $pwd = password_hash(mysqli_real_escape_string($dbConn, $admin['pwd']), PASSWORD_BCRYPT);
        $sql = "
            insert into admin (
                name, 
                email, 
                password
                ".(($admin['phoneNumber']) ? ', phone_number':'')."
            ) 
            values (
                '".$admin['name']."',
                '".$admin['email']."',
                '".$pwd."'
                ".(($admin['phoneNumber']) ? ",'".$admin['phoneNumber']."'":'')."
        )";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }

    function updateAdmin(Array $admin, $dbConn){
        global $debuggModeOn;
        
        $sql = "
            update admin 
                set
                    email = '".$admin['email']."', 
                    ".(($admin['pwd']) ? "password = '".password_hash(mysqli_real_escape_string($dbConn, $admin['pwd']), PASSWORD_BCRYPT)."', ":"")." 
                    name = '".$admin['name']."'
                    ".(($admin['phoneNumber']) ? ", phone_number = '".$admin['phoneNumber']."'":"")."
            where
                adminID = ".(int)$admin['itemID']."
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }

    function updatePassword(Array $admin, $dbConn){
        global $debuggModeOn;

        $sqlCheckAdminExistence = "
            select 
                adminID,
                password
            from 
                admin
            where
                adminID = '".$admin['itemID']."'
        ";
        $queryCheck = $dbConn->query($sqlCheckAdminExistence);
        $result = $queryCheck->fetch_assoc();

        if($admin['itemID'] === $result['adminID'] && password_verify($admin['actualPassword'], $result['password'])){
            if($admin['newPassword'] === $admin['rePassword']){
                $pwd = password_hash(mysqli_real_escape_string($dbConn, $admin['newPassword']), PASSWORD_BCRYPT);
                $sql = "
                    update admin
                        set
                            password = '".$pwd."'
                    where
                        adminID = '".$admin['itemID']."'
                ";
                $query = $dbConn->query($sql);
                if($dbConn->affected_rows === 1)
                    return 1;
                else    
                    return $debuggModeOn ? mysqli_error($dbConn):0;
            }else{
                return $debuggModeOn ? 'Passwords not match':0;
            }
        }else{
            return $debuggModeOn ? 'Wrong admin/non existent':0;
        }
    }

    function deleteAdmin(int $id, $dbConn){
        global $debuggModeOn;

        $sql = "
            delete from
                admin
            where
                adminID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }
?>