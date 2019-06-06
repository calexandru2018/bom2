<?php 
    function getAllPlaces($dbConn){
        $dataHolder = [];
        $i = 0;
        $sql = "
            select 
                *
            from
                event_description
            order by 
                event_descriptionID
            limit 30    
        "; 
        $query = $dbConn->query($sql);
        while ($row = $query->fetch_assoc()) {
            $dataHolder[$i]['id'] = ['id' => $row['event_descriptionID']];
            $dataHolder[$i]['name'] = getPlaceName($row['place_nameID'], $dbConn);
            $dataHolder[$i]['duration'] = getEventDuration($row['event_durationID'], $dbConn);
            $dataHolder[$i]['gps'] = getPlaceGPS($row['place_gpsID'], $dbConn);
            $i += 1;
        }
        return $dataHolder;
    }
    function getPlaceName(int $placeNameID, $dbConn){
        $sql = "
            select 
                placePT
            from
                place_name
            where
                place_nameID = '".$placeNameID."'
        ";
        $query = $dbConn->query($sql);  
        return $query->fetch_assoc();  
    }
    function getEventDuration(int $eventDurationID, $dbConn){
        $sql = "
            select 
                startDate,
                endDate
            from
                event_duration
            where
                event_durationID = '".$eventDurationID."'
        ";
        $query = $dbConn->query($sql);  
        return $query->fetch_assoc();
    }
    function getPlaceGPS(int $placeGpsID, $dbConn){
        $sql = "
            select 
                longitude,
                latitude
            from
                place_gps
            where
                place_gpsID = '".$placeGpsID."'
        ";
        $query = $dbConn->query($sql);  
        return $query->fetch_assoc();
    }
?>