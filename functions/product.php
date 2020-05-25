<?php 
    function getAllProducts($dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select 
                productID,
                pr_namePT,
                pr_nameEN
            from
                product
        ";
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i]['namePT'] = $row['pr_namePT'];
            $dataHolder[$i]['nameEN'] = $row['pr_nameEN'];
            $dataHolder[$i]['flavours'] = getAllFlavours($row['productID'], $dbConn);
            $i += 1;
        }
        return $dataHolder;
    }
    function getAllFlavours(int $productID, $dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select
                fl_namePT,
                fl_nameEN
            from
                flavour
            left join 
                product_flavour
            on
                flavour.flavourID = product_flavour.flavourID
            where
                product_flavour.productID = ".$productID." 
        ";
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i]['namePT'] = $row['fl_namePT'];
            $dataHolder[$i]['nameEN'] = $row['fl_nameEN'];
            $i += 1;
        }
        return $dataHolder;
    }
?>