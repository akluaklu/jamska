
var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
// var $spelling = $('.spelling');
// var $statistics = $('.statistics');
// var $unittests = $('.unittests');
// var $unittestresult = $('.unittestresult');

// yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
var ua = window.navigator.userAgent.toLowerCase();
var isIE = !!ua.match(/msie|trident\/7|edge/);
var isWinPhone = ua.indexOf('windows phone') !== -1;
var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

// function isAlphanumeric(str) {
//   return /^[a-zåäöæôA-ZÅÄÖÆÔ]+$/.test(str);
// }

function markupText(text) {
  var result = "";
  var word = "";
  for (var i = 0; i < text.length; i += 1) {
    var c = text.charAt(i);
    if (isAlphanumeric(c)) {
      word += c;
    }
    else {
      if (word.length > 0) {
        if (!isKnownWord(word)) {
          if (isCommonMissSpelledWord(word))
          {
            word = '<commonerror>' + word + '</commonerror>';
          } else {
            word = '<unknown>' + word + '</unknown>';
          }
        }
        result += word;
        word = "";
      }
      result += c;
    }
  }
  return result.replace(/\n$/g, '\n\n');

}


function applyHighlights(text) {
  text = markupText(text);
  //   .replace(/\n$/g, '\n\n')
  //   .replace(/[A-Z].*?\b/g, '<unknown>$&</unknown>')


  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }

  return text;
}

function handleInput() {
  var text = $textarea.val();
  var highlightedText = applyHighlights(text);
  $highlights.html(highlightedText);
}

function handleScroll() {
  var scrollTop = $textarea.scrollTop();
  $backdrop.scrollTop(scrollTop);

  var scrollLeft = $textarea.scrollLeft();
  $backdrop.scrollLeft(scrollLeft);
}

function fixIOS() {
  // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
  $highlights.css({
    'padding-left': '+=3px',
    'padding-right': '+=3px'
  });
}



// function showTestresults()
// {
//   $spelling.hide();
//   $statistics.hide();

//   var allTestResults = runAllTests();
//   var t = "";
//   var okTestCases = 0;
//   for (var testResult in allTestResults) {
//     if (allTestResults[testResult] == false) {
//       t += 'FAILED: ' + testResult  + "\n";
//     }
//     else {
//       okTestCases++;
//     }
//   }
//   t = "Ok test cases: " + okTestCases + "\n" +  "----------------------------------------\n" + t;
//   unittestresult.value = t;


//   // var result = TestTextUtils();
//   $unittests.show();
// }








function bindEvents() {
  $textarea.on({
    'input': handleInput,
    'scroll': handleScroll
  });

  // $toggle.on('click', toggle);  
}

if (isIOS) {
  fixIOS();
}


bindEvents();
//      handleInput();
            //# sourceURL=pen.js
