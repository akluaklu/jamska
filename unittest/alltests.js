$().ready(function() 
{
    var result = runAllTests();
    alert(result);
    console.log("runing all test");

    $('.testResult').html(result);
});


function runAllTests() {
    var testResult = TestTextUtils();
    
    return testResult;
}