<?php
    class Database{
        function __construct(){
            $this->db = mysqli_connect('localhost', 'root', '', 'bom2');
            if ($this->db->connect_error) {
                $code  = $mysqli->connect_errno;
                die("Error: ($code)".$this->db->connect_error);
            }
        }
        public function error(){
            return mysqli_error($this->db);
        }
    }
?>