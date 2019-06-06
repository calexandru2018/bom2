<?php 
    $debuggModeOn = true;
    function createPlace(Array $place, $dbConn){
        $eventDurationID = insertEventDuration($place, $dbConn);
        $placeGPSID = insertPlaceGPS($place, $dbConn);
        $placeNameID = insertPlaceName($place, $dbConn);

        if((int)$eventDurationID && (int)$placeGPSID && (int)$placeNameID){
            if(insertEventDescription($eventDurationID, $placeGPSID, $placeNameID, $dbConn))
                echo 1;
            else
                return $debuggModeOn ? mysqli_error($dbConn):0;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
        

    }
    function insertEventDuration(Array $place, $dbConn){
        $sql = "
            insert into event_duration (
                startDate, 
                endDate
            ) 
            values (
                '".$place['startDate']."',
                '".$place['endDate']."'
        )";
        $queryEventDuration = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return $dbConn->insert_id;
            $dbConn->close();
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
        
    }
    function insertPlaceGPS(Array $place, $dbConn){
        $sql = "
            insert into place_gps (
                longitude, 
                latitude
            ) 
            values (
                '".$place['longitude']."',
                '".$place['latitude']."'
            )";
        $queryPlaceGPS = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return $dbConn->insert_id;
            $dbConn->close();
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }

    function insertPlaceName(Array $place, $dbConn){
        $sql = "
            insert into place_name (
                placePT, 
                placeEN
            ) 
            values (
                '".$place['namePT']."',
                '".$place['nameEN']."'
            )";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return $dbConn->insert_id;
            $dbConn->close();
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }

    function insertEventDescription(int $eventDurationID, int $placeGPSID, int $placeNameID, $dbConn){
        $sql = "
            insert into event_description (
                place_nameID,
                event_durationID,
                place_gpsID
            )
            values (
                '".$eventDurationID."',
                '".$placeGPSID."',
                '".$placeNameID."'
            )
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return 1;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    // var_dump($_POST);
?>