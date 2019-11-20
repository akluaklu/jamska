<?php
class Database {
    private $hostname = 'localhost';
    private $db_name = 'jamskanu_jamska';
    private $username = 'jamskanu_web';
    private $password = 'xg9rhT6pXqm!';
    private $connection;

    public function connect()      {
        $this->connection = null;
        try {
            $this->connection = new PDO('mysql:host=' . $this->hostname . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->connection;
        } catch (PDOException $e) {
            echo 'Connection error: ' + $e->getMessage();
        }
    }
}