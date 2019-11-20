


$(function () {
    $.contextMenu({
        selector: '.jamska',
        build: function ($trigger, e) {
            // this callback is executed every time the menu is to be shown
            // its results are destroyed every time the menu is hidden
            // e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
            return {
                callback: function (key, options) {
                   // var m = "clicked: " + key;
                   // window.console && console.log(m);
                    var textarea = document.getElementById("jamska");
                    var selectedWord = getSelectedWord(textarea);
                    if (key === "a123")
                    {
                        ignoreWord(selectedWord);
                    }else if (key === "jekanstava") {
                        
                    } else{
                        textarea.value = replaceWordInText(textarea.value, selectedWord, key);
                    }
                    handleInput();

                },
                items: createContextMenuItems()
            };
        }
    });
});



// function isAlphanumeric(str) {
//     return /^[a-zåäöæôA-ZÅÄÖÆÔ]+$/.test(str);
// }

function getSelectedWord(textarea) {
    var startPosition = textarea.selectionStart;
    var endPosition = startPosition;
    while (isAlphanumeric(textarea.value.charAt(startPosition)) && startPosition >= 0) { startPosition--; }
    while (isAlphanumeric(textarea.value.charAt(endPosition)) && endPosition < textarea.value.length) { endPosition++; }
    textarea.selectionStart = startPosition + 1;
    textarea.selectionEnd = endPosition;
    var selectedWord = (textarea.value).substring(textarea.selectionStart, textarea.selectionEnd);
    return selectedWord;
}

function createContextMenuItems() {
    var textarea = document.getElementById("jamska");
    var selectedWord = getSelectedWord(textarea);
    var contextMenuItems = {}
    if (selectedWord.length > 0 && (!isKnownWord(selectedWord) || isCommonMissSpelledWord(selectedWord)))
    {
        var suggestions = suggestedSpelling(selectedWord);

        for (var i = 0; i < suggestions.length; i += 1) {
            contextMenuItems[suggestions[i]] = { name: suggestions[i], icon: "copy" }
        };
        if (suggestions.length > 0) {
           contextMenuItems["sep1"] = "---------";
        }
        contextMenuItems["jekanstava"] = { name: "Je veit hårre man ske stava '" + selectedWord +"' ", icon: "edit" }
        contextMenuItems["a123"] = { name: "Ålves int", icon: "quit" }
    }
    return contextMenuItems
}

