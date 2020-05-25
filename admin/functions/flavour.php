<?php 
    function getAllFlavours($dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select 
                flavourID,
                fl_namePT
            from
                flavour
        ";
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i]['id'] = $row['flavourID'];
            $dataHolder[$i]['name'] = $row['fl_namePT'];
            $i += 1;
        }
        return $dataHolder;
    }
?>