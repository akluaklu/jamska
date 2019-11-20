<?php
class WordFrequence {
    private $connection;
    private $table = 'wordfrequence';
    
    public function __construct($conn) {
        $this->connection = $conn;
    }

    public function read() {
        $query = 'SELECT word, count FROM ' . $this->table;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function clear() {
        $query = 'DELETE FROM ' . $this->table;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function add($records) {
        $DataArr = array();
        foreach($records as $word => $count){
            $DataArr[] = "('$word', '$count')";
        }
        
        $query = 'INSERT INTO ' . $this->table . '(word, count) VALUES ';
        $query .= implode(',', $DataArr);
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }


}