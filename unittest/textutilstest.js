function TestTextUtils() {
    var testResult = TestReplaceWordInText("Replace empty", "", "", "", "");
    
    testResult = { ...testResult, ... TestReplaceWordInText("Replace wrong word, no replace","hej", "hopp", "huvva", "hej")};
    testResult = { ...testResult, ... TestReplaceWordInText("Replace three words", "hej hopp hej hopp hejja ghej hej","hej","seg", "seg hopp seg hopp hejja ghej seg" )};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace æta","æta ætas æta", "æta", "äta", "äta ætas äta")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace kôtte","kôtte kôttet kôtte", "kôtte", "kötte", "kötte kôttet kötte")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace P","P p i", "P", "kk", "kk kk i")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Æ","Æ æ i", "Æ", "kk", "kk kk i")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Å","Å å i", "å", "kk", "kk kk i")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Ä","Ä ä i", "ä", "kk", "kk kk i")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Ö","Ö ö i", "Ö", "kk", "kk kk i")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace plåt","Å plåt i", "plåt", "panna", "Å panna i")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Öst","i Öst", "Öst", "väst", "i väst")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Æst","i Æst", "Æst", "väst", "i väst")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Åst","i Åst", "Åst", "väst", "i väst")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace Äst","i Äst", "Äst", "väst", "i väst")};
    testResult = { ...testResult, ...TestReplaceWordInText("Replace hÖst","i höst", "hÖst", "väst", "i väst")};
    return testResult;
}

function TestReplaceWordInText(tc, text, originalWord, newWord, expectedText)
{
    var resultText = replaceWordInText(text, originalWord, newWord);
    var result = {}
    result[tc] = (expectedText == resultText);
    console.log('resultText:' + resultText);
    return result;
}





