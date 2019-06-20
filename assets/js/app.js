//Ensure js file is connected
console.log("Connected!");

//Make sure document is loaded
$( document ).ready(function() {
  console.log("Document Ready");
  

  const Questions = [
    {
      question: "What is 10/2?",
      answers: {
        a: '3',
        b: '5',
        c: '115'
      },
      correctAnswer: 'b'
    },
    {
      question: "What is 30/3?",
      answers: {
        a: '3',
        b: '5',
        c: '10'
      },
      correctAnswer: 'c'
    }
  ];//End of the Questions object

  //Set the initial question number
  questNum = 0;


  //Start Button Click Event
  $("#start").click(function(){
    console.log("Start Clicked!");

    //Make start button hidden
    $("#start").hide();

    //Make question div visible
    $("#questions").show();

    loadQuestion();
    
  });//End Start Button click

  //Function to load a question
  function loadQuestion(){

    //  Set our number counter.
    var number = 10;

    //  Variable that will hold our interval ID when we execute
    //  the "run" function
    var intervalId;

    //  The run function sets an interval
      //  that runs the decrement function once a second.
      //  *****BUG FIX********
      //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
      function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
      }

    //  The decrement function.
    function decrement() {
      //  Decrease number by one.
      number--;

      //  Show the number in the #show-number tag.
      $("#timerSec").html(number);

      //  Once number hits zero...
      if (number === 0) {
        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        alert("Time Up!");
      }
    }

    //  The stop function
    function stop() {
      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
      if (number === 0) {
        number = 10;
      }
    }

//  Execute the run function.
run();
    
    //Get the current question based on questNum
    let currQuest = Questions[questNum].question;

    //Get the answers to the current question
    let currAnswers = Questions[questNum].answers;
    
    //Display the current question
    $("#question").html(currQuest);

    //Display the current answers
    let answerA = currAnswers.a;
    let answerB = currAnswers.b;
    let answerC = currAnswers.c;

    $("#answers").append("<div id='a' class='answer'>"+answerA+"</div>");
    $("#answers").append("<div id='b' class='answer'>"+answerB+"</div>");
    $("#answers").append("<div id='c' class='answer'>"+answerC+"</div>");

    $(".answer").click(function(){
      console.log("answer clicked");
      console.log($(this).html());
      
      //ID of clicked div
      let currID = $(this).attr('id');
      console.log(currID);
      
      //Get the answer to the current question
      let currAnswer = Questions[questNum].correctAnswer;
      console.log(currAnswer);
    
      //Check if it is the correct answer
      if (currAnswer === currID ){
        console.log("Correct");
        
      }else{
        console.log("Wrong");
        
      }//End check if correcgt
    });//End click on answer




  }//End loadQuestion function


  
  

});//End document ready
