<?php 
    $debuggModeOn = true;
    function createFlavour(Array $flavour, $dbConn){
        global $debuggModeOn;

        $sql = "
        insert into flavour (
            fl_namePT, 
            fl_nameEN
        ) 
        values (
            '".$flavour['flavours_PT']."',
            '".$flavour['flavours_EN']."'
        )";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }

    function updateFlavour(Array $flavour, $dbConn){
        global $debuggModeOn;

        $sql = "
            update flavour
                set
                    fl_namePT = '".$flavour['flavours_PT']."',
                    fl_nameEN = '".$flavour['flavours_EN']."'
            where
                flavourID = ".(int)$flavour['itemID']."
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }

    function deleteFlavour(int $id, $dbConn){
        global $debuggModeOn;

        $sql = "
            delete from
                flavour
            where
                flavourID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }
?>