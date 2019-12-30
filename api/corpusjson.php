<?php 

   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json");
   

   include_once('../config/database.php');
   include_once('../models/wordfrequence.php');
   include_once('../models/articles.php');
   include_once('../logic/wordcounter.php');

   $database = new Database();
   $conn = $database->connect();
   $text = "";

   $articles = new Articles($conn);
   if (!$articles->isHandled()) {
      $texts = $articles->read();
      while ($row = $texts->fetch(PDO::FETCH_ASSOC)) {
         extract($row);
         $text =  $text . ' ' . $body;
      }

      // $response[0] = array();
     // $response[0]["article"] = $text;
 
 //     echo json_encode($response);
   
      updateWordFrequence($text); 
      $articles->setAsHandled();
   }

   $wordFrequence = new WordFrequence($conn);
   $frequence = $wordFrequence->read();  
   $response = array();
   $response[0] = array();

   while ($row = $frequence->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $response[0][$word] = $count;
   }

   echo json_encode($response); 
 