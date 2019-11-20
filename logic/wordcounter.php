<?php 
    include_once('../config/database.php');
    include_once('../models/wordfrequence.php');
    

   function wordCounter($words)
   {
        mb_internal_encoding('UTF-8');
        $words = mb_strtolower($words);
        $regex = '/\p{L}+/u';
        preg_match_all($regex, $words, $wordsArray);

        $wordCount = array();
        
        foreach($wordsArray[0] as $word) {
            if (isset($wordCount[$word])) {
                $wordCount[$word]++;
            } else {
                $wordCount[$word] = 1;
            }
        }
        return $wordCount;
   }


   function updateWordFrequence($text)
   {
        $database = new Database();
        $conn = $database->connect();
        $wordFrequence = new WordFrequence($conn);
        $wordCount = wordCounter($text);
        $wordFrequence->clear();
        $wordFrequence->add($wordCount);


  
 
 
   }

   

   
