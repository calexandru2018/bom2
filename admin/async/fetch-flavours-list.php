<?php 
    require_once('../models/db.php');
    $CONN = new Database();

    $dataHolder = [];
    $i = 0;
    $sql = "
        select 
            flavourID,
            fl_namePT
        from
            flavour
    ";
    $query = $CONN->db->query($sql);
    while ($row = $query->fetch_assoc()) {
        echo "<option value='".$row['flavourID']."'>".$row['fl_namePT']."</option>";
    }
    return $dataHolder;
?>