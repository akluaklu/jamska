
var KNOWN_WORDS = {}
var COMMON_MISSPELLED_WORDS = {}


// fetch('http://localhost/highlight/corpus.php')
//   .then ((resp) => resp.text())
//   .then(function(text) 
//   {
// //    var wordsArray = text.toLowerCase().match(/[a-zåäöæô]+/g).sort().filter((v, i, a) => a.indexOf(v) === i);
// //var wordsArray = text.toLowerCase().match(/[a-zåäöæô]+/g).sort();
// //    var wordsArray = text.toLowerCase().match(/[a-z]+/g);
//     var wordsArray = text.toLowerCase().match(/[a-zåäöæô]+/g);
//     for(var i = 0; i < wordsArray.length; i++){
//       if(KNOWN_WORDS.hasOwnProperty(wordsArray[i])){
//         KNOWN_WORDS[wordsArray[i]]++;
//       } else {
//         KNOWN_WORDS[wordsArray[i]] = 1;
//       }
//     }

//     COMMON_MISSPELLED_WORDS["och"] = "å";
//     COMMON_MISSPELLED_WORDS["cykel"] = "sykkel";
//     COMMON_MISSPELLED_WORDS["tyttje"] = "tykkje";
//     COMMON_MISSPELLED_WORDS["ahllt"] = "allht";
//     COMMON_MISSPELLED_WORDS["kahllt"] = "kallht";
//     handleInput();
//   });
   
function parseWordFrequence(wordFrequenceJson) 
{
  KNOWN_WORDS = wordFrequenceJson[0];
  console.log("loaded ");
  console.log(KNOWN_WORDS);
  
  COMMON_MISSPELLED_WORDS["och"] = "å";
  COMMON_MISSPELLED_WORDS["cykel"] = "sykkel";
  COMMON_MISSPELLED_WORDS["tyttje"] = "tykkje";
  COMMON_MISSPELLED_WORDS["ahllt"] = "allht";
  COMMON_MISSPELLED_WORDS["kahllt"] = "kallht";
}

//   function parseWords(text) 
//   {
// //    var wordsArray = text.toLowerCase().match(/[a-zåäöæô]+/g).sort().filter((v, i, a) => a.indexOf(v) === i);
// //var wordsArray = text.toLowerCase().match(/[a-zåäöæô]+/g).sort();
// //    var wordsArray = text.toLowerCase().match(/[a-z]+/g);

//     var wordsArray = text.toLowerCase().match(/[a-zåäöæô]+/g);
//     for(var i = 0; i < wordsArray.length; i++){
//       if(KNOWN_WORDS.hasOwnProperty(wordsArray[i])){
//         KNOWN_WORDS[wordsArray[i]]++;
//       } else {
//         KNOWN_WORDS[wordsArray[i]] = 1;
//       }
//     }

//     COMMON_MISSPELLED_WORDS["och"] = "å";
//     COMMON_MISSPELLED_WORDS["cykel"] = "sykkel";
//     COMMON_MISSPELLED_WORDS["tyttje"] = "tykkje";
//     COMMON_MISSPELLED_WORDS["ahllt"] = "allht";
//     COMMON_MISSPELLED_WORDS["kahllt"] = "kallht";
//   }

var alphabet = "abcdefghijklmnopqrstuvwxyzåäöæô";

/*
  Returns the set of all strings 1 edit distance away from the input word.
  This consists of all strings that can be created by:
    - Adding any one character (from the alphabet) anywhere in the word.
    - Removing any one character from the word.
    - Transposing (switching) the order of any two adjacent characters in a word.
    - Substituting any character in the word with another character.
*/
function editDistance1(word) {
  word = word.replace(/ck/g, "kk");
  word = word.toLowerCase().split('');
  var results = [];

  //Adding any one character (from the alphabet) anywhere in the word.
  for(var i = 0; i <= word.length; i++){
    for(var j = 0; j < alphabet.length; j++){
      var newWord = word.slice();
      newWord.splice(i, 0, alphabet[j]);
      results.push(newWord.join(''));
    }
  }

  //Removing any one character from the word.
  if(word.length > 1){
    for(var i = 0; i < word.length; i++){
      var newWord = word.slice();
      newWord.splice(i,1);
      results.push(newWord.join(''));
    }
  }

  //Transposing (switching) the order of any two adjacent characters in a word.
  if(word.length > 1){
    for(var i = 0; i < word.length - 1; i++){
      var newWord = word.slice();
      var r = newWord.splice(i,1);
      newWord.splice(i + 1, 0, r[0]);
      results.push(newWord.join(''));
    }
  }

  //Substituting any character in the word with another character.
  for(var i = 0; i < word.length; i++){
    for(var j = 0; j < alphabet.length; j++){
      var newWord = word.slice();
      newWord[i] = alphabet[j];
      results.push(newWord.join(''));
    }
  }


  return results;
}


function isCommonMissSpelledWord(word)
{
   word = String(word).toLowerCase();
   return (word in COMMON_MISSPELLED_WORDS);
}


function isKnownWord(word)
{
  // console.log("isKnownWord() ");
  // console.log(KNOWN_WORDS);
  word = String(word).toLowerCase();
//  console.log(`KNOWN_WORDS[${word}]= ${KNOWN_WORDS[word]}`);
   return (word in KNOWN_WORDS);
}

function ignoreWord(word)
{
  word = String(word).toLowerCase();
  if(!KNOWN_WORDS.hasOwnProperty(word)){
    KNOWN_WORDS[word] = 1;
  }
}
 


function suggestedSpelling(word) {
    if(word in KNOWN_WORDS){
      return [];
    }

    if(word in COMMON_MISSPELLED_WORDS){
      return [COMMON_MISSPELLED_WORDS[word]];
    }
  
    var maxCount = 0;
    var correctWord = word;
    var editDistance1Words = editDistance1(word);
    var editDistance2Words = [];
  
    for(var i = 0; i < editDistance1Words.length; i++){
      editDistance2Words = editDistance2Words.concat(editDistance1(editDistance1Words[i]));
    }


    var  suggestions1 = [];
  
    for(var i = 0; i < editDistance1Words.length; i++){
      var w = editDistance1Words[i];

      if(w in KNOWN_WORDS){
    //    console.log('w =' + w);

        var cnt = KNOWN_WORDS[w];
        if(cnt > 0){
          suggestions1[w] =  cnt;
      //    console.log('w =' + w + ' count = ' + cnt);
        }
      }
    }

    Object.keys(suggestions1).sort(function(a,b){return suggestions1[b]-suggestions1[a]});

    var result = [];
    Object.keys(suggestions1).forEach(function(key, index) {
//        console.log(key + " === " + this[key]);
        result.push(key);
      }, suggestions1);    

    return result.slice(0,8);
    //------------------------------------------------------------
//    return suggestions1.slice(0,2);
    

    var suggestions2 = [];
    var maxCount2 = 0;
    var correctWord2 = correctWord;
  
    for(var i = 0; i < editDistance2Words.length; i++){
      if(editDistance2Words[i] in KNOWN_WORDS){
        if(KNOWN_WORDS[editDistance2Words[i]] > maxCount2){
          maxCount2 = KNOWN_WORDS[editDistance2Words[i]];
          correctWord2 = editDistance2Words[i];
        }
      }
    }
  
    if (word.length < 6) {
      if(maxCount2 > 100*maxCount){
        return correctWord2
      }
      return correctWord;  
    }
    else {
      if(maxCount2 > 4*maxCount){
        return correctWord2
      }
      return correctWord;  
    };
  }
  


/*
  This script runs your spellchecker on every input you provide.
*/
// var inputWords =  ["tets", "teest"];
// var output = inputWords.map(function(word) {
//   var correction = correct(word);
//   if (correction === word) {
//     return " - " + word + " is spelled correctly.";
//   } else if (typeof correction === "undefined") {
//     return " - " + word + " didn't get any output from the spellchecker.";
//   } else {
//     return " - " + word + " should be spelled as " + correction + ".";
//   }
// });



//console.log(output.join("\n\n"));
//console.log("\nFinished!");