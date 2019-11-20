$().ready(function() 
{
    console.log("loading data");

    $('#jamska').html("").focus();

        // $.get("http://localhost/highlight/api/corpus.php", function(data, status){
        //     parseWords(data);
        //     handleInput();
        // });

        $.get("http://localhost/highlight/api/corpusjson.php", function(jsondata, status){
            parseWordFrequence(jsondata);
            handleInput();
        });
        


});