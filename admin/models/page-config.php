<?php 
    $debuggModeOn = true;

    function updateInstagramToken(Array $config, $dbConn){
        global $debuggModeOn;
        $sql = "
            select 
                *
            from
                config
        ";
        $query = $dbConn->query($sql);
        $token = mysqli_real_escape_string($dbConn, $config['access_token']);
        if($query->num_rows === 0){
            $sqlInsert = "
                insert into
                    config(
                        ig_access_token
                    )
                    values(
                        '".$token."'
                    )
            ";
            $queryInsert = $dbConn->query($sqlInsert);
            if($dbConn->affected_rows === 1)
                return 1;
            else    
                return $debuggModeOn ? 'unable to insert new token':0;
        }else{
            $result = $query->fetch_assoc();
            $sqlUpdate = "
                update config
                    set
                        ig_access_token = '".$token."'
            ";
            $queryUpdate = $dbConn->query($sqlUpdate);
            if($dbConn->affected_rows === 1)
                return 1;
            else    
                return $debuggModeOn ? 'unable to update new token':0;
        }
    }
?>