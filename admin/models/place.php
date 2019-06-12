<?php 
    $debuggModeOn = true;
    function createPlace(Array $place, $dbConn, $createNew = true){
        global $debuggModeOn;
        if($createNew !== true){
            $sql = "
                select
                    place_nameID,
                    event_durationID,
                    place_gpsID
                from
                    event_description
                where
                    event_descriptionID = '".(int)$place['itemID']."'
            ";
            if($query = $dbConn->query($sql)){
                $result = $query->fetch_assoc();
                $updatedEventDuration = updateEventDuration($place, $result['event_durationID'], $dbConn);
                $updatedPlaceGPS = updatePlaceGPS($place, $result['place_gpsID'], $dbConn);
                $updatedPlaceName = updatePlaceName($place, $result['place_nameID'], $dbConn);

                if($updatedEventDuration == true || $updatedPlaceGPS == true || $updatedPlaceName == true)
                    return 1;
                else
                    return $debuggModeOn ? 'Unable to update place'."-".$updatedEventDuration."-".$updatedPlaceGPS."-".$updatedPlaceName:0;
            }else{
                return $debuggModeOn ? 'No such ID was found':0;
            }
        }else{
            $placeNameID = createPlaceName($place, $dbConn);
            $eventDurationID = createEventDuration($place, $dbConn);
            $placeGPSID = createPlaceGPS($place, $dbConn);

            if((int)$eventDurationID && (int)$placeGPSID && (int)$placeNameID){
                if(createEventDescription($eventDurationID, $placeGPSID, $placeNameID, $dbConn))
                    return 1;
                else
                    return $debuggModeOn ? 'Unable to create event description':0;
            }else{
                return $debuggModeOn ? 'Values returned are not all ints, an issue have ocurred':0;
            }
        }
        
    }


    function createEventDuration(Array $place, $dbConn){
        global $debuggModeOn;

        $sql = "
            insert into event_duration (
                startDate, 
                endDate
            ) 
            values (
                '".$place['startDate']."',
                '".$place['endDate']."'
        )";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return $dbConn->insert_id;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
        
    }
    function updateEventDuration(Array $place, int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            update event_duration
                set
                    startDate = '".$place['startDate']."',
                    endDate = '".$place['endDate']."'
            where
                event_durationID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return 1;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function createPlaceGPS(Array $place, $dbConn){
        global $debuggModeOn;

        $sql = "
            insert into place_gps (
                longitude, 
                latitude
            ) 
            values (
                '".$place['longitude']."',
                '".$place['latitude']."'
            )";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return $dbConn->insert_id;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function updatePlaceGPS(Array $place, int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            update place_gps
                set
                    longitude = '".$place['longitude']."',
                    latitude = '".$place['latitude']."'
            where
                place_gpsID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return 1;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }

    function createPlaceName(Array $place, $dbConn){
        global $debuggModeOn;

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
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function updatePlaceName(Array $place, int $id, $dbConn){
        global $debuggModeOn;
        $sql = "
            update place_name
                set
                    placePT = '".$place['namePT']."',
                    placeEN = '".$place['nameEN']."'
            where
                place_nameID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return 1;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }

    function createEventDescription(int $eventDurationID, int $placeGPSID, int $placeNameID, $dbConn){
        global $debuggModeOn;

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

    function deleteEventDescription(int $id, $dbConn){
        global $debuggModeOn;

        $sql = "
        select 
            * 
        from
            event_description
        where
            event_descriptionID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        $result = $query->fetch_assoc(); 
        $deleteEventDuration = deleteEventDuration($result['event_durationID'], $dbConn);
        $deletePlaceGPS = deletePlaceGPS($result['place_gpsID'], $dbConn);
        $deletePlaceName = deletePlaceName($result['place_nameID'], $dbConn);

        if($deleteEventDuration == true && $deletePlaceGPS == true && $deletePlaceName == true){
            $queryCheck = $dbConn->query($sql);
            if($queryCheck->num_rows === 0)
                return 1;
            else    
                return $debuggModeOn ? 'Rows still exist':0;
        }else{
            return $debuggModeOn ? 'Issues while deleting from a table':0;
        }

    }

    function deleteEventDuration(int $id, $dbConn){
        global $debuggModeOn;

        $sql = "
            delete from
                event_duration
            where
                event_durationID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return 1;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function deletePlaceGPS(int $id, $dbConn){
        global $debuggModeOn;

        $sql = "
            delete from
                place_gps
            where
                place_gpsID = '".$id."'
        ";
        $query = $dbConn->query($sql);
        if($dbConn->affected_rows === 1){
            return 1;
        }else{
            return $debuggModeOn ? mysqli_error($dbConn):0;
        }
    }
    function deletePlaceName(int $id, $dbConn){
        global $debuggModeOn;

        $sql = "
            delete from
                place_name
            where
                place_nameID = '".$id."'
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