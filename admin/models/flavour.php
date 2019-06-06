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
?>