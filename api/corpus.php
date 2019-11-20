<?php 

   header("Access-Control-Allow-Origin: *");
   header("Content-Type: text/plain");

   include_once('../config/database.php');
   include_once('../models/articles.php');
   include_once('../logic/wordcounter.php');

   $database = new Database();
   $conn = $database->connect();

   $articles = new Articles($conn);
   $texts = $articles->read();

   $text = "";
   while ($row = $texts->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $text =  $text . ' ' . $body;
   }

   updateWordFrequence($text); // To Be conditional


   echo $text;
 