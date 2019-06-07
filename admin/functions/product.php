<?php 
    function getAllProducts($dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select 
                productID,
                pr_namePT
            from
                product
        ";
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i]['id'] = $row['productID'];
            $dataHolder[$i]['name'] = $row['pr_namePT'];
            $i += 1;
        }
        return $dataHolder;
    }
?>