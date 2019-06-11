<?php 
    $debuggModeOn = true;
    function createProductFlavour(Array $product, $dbConn, $createNew = true) {
        global $debuggModeOn;
        if($createNew !== true){
            $dropProductFlavourList = dropProductFlavourList($product['itemID'], $dbConn);
            $updateProductName = updateProductName($product, $dbConn);
            $newRows = newRows($product, (int)$product['itemID'], $dbConn);
            if($dropProductFlavourList == true || $updateProductName == true || $newRows == true)
                return 1;
            else    
                return $debuggModeOn ? 'Unable to edit-'.$dropProductFlavourList."-".$updateProductName."-".$newRows:0;
        }else{
            $productID = createProductName($product, $dbConn);
            $newRows = newRows($product, $productID, $dbConn);
            if($newRows == true)
                return 1;
            else    
                return $debuggModeOn ? 'Unable to create':0;
        }
    }

    function createProductName(Array $product, $dbConn){
        global $debuggModeOn;

        $sql = "
        insert into product (
            pr_namePT, 
            pr_nameEN
        ) 
        values (
            '".$product['product_PT']."',
            '".$product['product_EN']."'
        )";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return $dbConn->insert_id;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }
    function updateProductName(Array $product, $dbConn){
        global $debuggModeOn;

        $sql = "
            update product 
                set 
                pr_namePT = '".$product['product_PT']."',
                pr_nameEN = '".$product['product_EN']."'
            where
                productID = '".(int)$product['itemID']."'
            ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }

    function dropProductFlavourList(int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            delete from
                product_flavour
            where
                productID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows > 0)
            return 1;
        else    
            return $debuggModeOn ? mysqli_error($dbConn):0;
    }

    function newRows(Array $product, int $productID, $dbConn){
        global $debuggModeOn;
        $flavourList = [];
        $errorCollector =  [];

        if(is_int($productID)){
            foreach($product as $key => $value){
                if(substr($key, 0, 8 ) === "flavour_")
                    array_push($flavourList, (int)$value);
            }
            if(sizeof($flavourList) > 0){
                for($i = 0; $i < sizeof($flavourList); $i++){
                    $sql = "
                        insert into product_flavour (
                            productID,
                            flavourID
                        )
                        values (
                            '".(int)$productID."',
                            '".(int)$flavourList[$i]."'
                        )
                    ";
                    $query = $dbConn->query($sql);
                    if($dbConn->affected_rows !== 1){
                        array_push($errorCollector, mysqli_error($dbConn));
                    }
                }
                if(sizeof($errorCollector) === 0)
                    return 1;
                else
                    return $debuggModeOn ? json_encode($errorCollector):0;
            }else{
                return $debuggModeOn ? 'Flavour list is too short or non existent':0;
            }
        }else{
            return $debuggModeOn ?  'ProductID is not int':0;
        }
    }
?>