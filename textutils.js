


function replaceWordInText(text, originalWord, newWord) {
    //console.log(text + ' originalWord:'+ originalWord + ' newWord:'+ newWord);

    const Å_tag = "XAAX"; // Å
    const Ä_tag = "XAEX"; // Ä
    const Ö_tag = "XOEX"; // Ö
    const Æ_tag = "XAAEX";
    const Ô_tag = "XOOX";
    const å_tag = "XaaX";
    const ä_tag = "XaeX";
    const ö_tag = "XoeX";
    const æ_tag = "XaaeX";
    const ô_tag = "XooX";

    var moddedWord = originalWord.toLowerCase()
    // .replace(/[Å]/g, Å_tag) 
    // .replace(/[Ä]/g, Ä_tag) 
    // .replace(/[Ö]/g, Ö_tag) 
    // .replace(/[Æ]/g, Æ_tag) 
    // .replace(/[Ô]/g, Ô_tag)
    .replace(/[å]/g, å_tag) 
    .replace(/[ä]/g, ä_tag) 
    .replace(/[ö]/g, ö_tag) 
    .replace(/[æ]/g, æ_tag)
    .replace(/[ô]/g, ô_tag);

    text = text
    .replace(/[Å]/g, Å_tag) 
    .replace(/[Ä]/g, Ä_tag) 
    .replace(/[Ö]/g, Ö_tag) 
    .replace(/[Æ]/g, Æ_tag)
    .replace(/[Ô]/g, Ô_tag)
    .replace(/[å]/g, å_tag) 
    .replace(/[ä]/g, ä_tag) 
    .replace(/[ö]/g, ö_tag) 
    .replace(/[æ]/g, æ_tag)
    .replace(/[ô]/g, ô_tag);

//    console.log('1 moddedWord: ' + moddedWord +'   text: ' + text);

    var regExp_replaceWord = new RegExp("\\b(" + moddedWord + ")\\b", "gi");

//    console.log('2 text: ' + text);
    var regExp_Å = new RegExp(Å_tag, "g");
    var regExp_Ä = new RegExp(Ä_tag, "g");
    var regExp_Ö = new RegExp(Ö_tag, "g");
    var regExp_Æ = new RegExp(Æ_tag, "g");
    var regExp_Ô = new RegExp(Ô_tag, "g");
    var regExp_å = new RegExp(å_tag, "g");
    var regExp_ä = new RegExp(ä_tag, "g");
    var regExp_ö = new RegExp(ö_tag, "g");
    var regExp_æ = new RegExp(æ_tag, "g");
    var regExp_ô = new RegExp(ô_tag, "g");

    return text
    .replace(regExp_replaceWord, newWord)
    .replace(regExp_Å,  'Å')
    .replace(regExp_Ä,  'Ä')
    .replace(regExp_Ö,  'Ö')
    .replace(regExp_Æ, 'Æ')
    .replace(regExp_Ô,  'Ô')
    .replace(regExp_å, 'å')
    .replace(regExp_ä, 'ä')
    .replace(regExp_ö, 'ö')
    .replace(regExp_æ, 'æ')
    .replace(regExp_ô, 'ô');
}

function isAlphanumeric(str) {
    return /^[a-zåäöæôA-ZÅÄÖÆÔ]+$/.test(str);
  }

