<?php 
    $debuggModeOn = true;
    function createProductFlavour(Array $product, $dbConn) {
        global $debuggModeOn;
        $flavourList = [];
        $errorCollector =  [];

        $productID = createProductName($product, $dbConn);
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
                if(sizeof($errorCollector) >= 0)
                    return 1;
                else
                    return $debuggModeOn ? json_encode($errorCollector):0;
            }else{
                return $debuggModeOn ? $product:0;
            }
        }else{
            return $debuggModeOn ?  $productID:0;
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
?>