<?php 
    function getAllAdmins($dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select 
                adminID,
                name,
                phone_number
            from
                admin
        ";
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i]['id'] = $row['adminID'];
            $dataHolder[$i]['name'] = $row['name'];
            $dataHolder[$i]['pn'] = $row['phone_number'];
            $i += 1;
        }
        return $dataHolder;
    }
?>