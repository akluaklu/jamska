<?php
class Articles {
    private $connection;
    private $table = 'articles';


    public function __construct($conn) {
        $this->connection = $conn;
    }

    public function read() {
        $query = 'SELECT body FROM ' . $this->table;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        $x = $stmt->rowCount();
        var_dump($x);

        return $stmt;
    }

    public function isHandled() {
        $query = 'SELECT title FROM ' . $this->table . ' WHERE handled = false';
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return ($stmt->rowCount() == 0);
    }

    public function setAsHandled() {
        $query = 'UPDATE ' . $this->table . ' SET handled = true';
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    


}