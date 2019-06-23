/* eslint-disable func-names */
// Ensure js file is connected
console.log('Connected!');

// Make sure document is loaded
$(document).ready(() => {
  console.log('Document Ready');
  
  // Set the Available Questions Array
  const Questions = [
    {
      question: 'Which animated movie was first to feature a celebrity as a voice actor?',
      correctAnswer: 'Aladdin',
      answers: ['Toy Story', 'Aladdin', 'James and the Giant Peach', 'The Hunchback of Notre Dame'],
      image: 'https://media.giphy.com/media/dITPWYh4HPJ1S/giphy.gif'
    },
    {
      question: 'When was the movie &#039;Con Air&#039; released?',
      correctAnswer: '1997',
      answers: ['1997', '1985', '1999', '1990'],
      image: 'https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif'
    },
    {
      question: 'What was Dorothy&#039;s surname in &#039;The Wizard Of Oz&#039;?',
      correctAnswer: 'Gale',
      answers: ['Gale', 'Perkins', 'Day', 'Parker'],
      image: 'https://media.giphy.com/media/ubKUtThRLlly8/giphy.gif'
    },
    {
      question: 'This movie contains the quote, &quot;Houston, we have a problem.&quot;',
      correctAnswer: 'Apollo 13',
      answers: ['The Right Stuff', 'Capricorn One', 'Apollo 13', 'Marooned'],
      image: 'https://media.giphy.com/media/4Hx5nJBfi8FzFWxztb/giphy.gif'
    },
    {
      question:
        'Which movie includes a giant bunny-like spirit who has magic powers including growing trees?',
      correctAnswer: 'My Neighbor Totoro',
      answers: ['Hop', 'Rise of the Guardians', 'Alice in Wonderland', 'My Neighbor Totoro'],
      image: 'https://media.giphy.com/media/omHPYZttAVAAw/giphy.gif'
    },
    {
      question: 'What was the first monster to appear alongside Godzilla?',
      correctAnswer: 'Anguirus',
      answers: ['King Kong', 'Mothra', 'Anguirus', 'King Ghidora'],
      image: 'https://media.giphy.com/media/yGEbmgiCJYu3u/giphy.gif'
    },
    {
      question:
        'When does &quot;Rogue One: A Star Wars Story&quot; take place chronologically in the series?',
      correctAnswer: 'Between Episode 3 and 4',
      answers: [
        'Between Episode 3 and 4',
        'After Episode 6',
        'Before Episode 1',
        'Between Episode 4 and 5',
      ],
      image: 'https://media.giphy.com/media/zKg8WpfVpRZsY/giphy.gif'
    },
    {
      question: 'In the 2012 film, &quot;The Lorax&quot;, who is the antagonist?',
      correctAnswer: "Aloysius O'Hare",
      answers: ["Ted Wiggins", "Aloysius O'Hare", "The Once-Ler", "Grammy Norma"],
      image: 'https://media.giphy.com/media/pcHPUCa4GeApO/giphy.gif'
    },
    {
      question: 'The 2016 Disney animated film &#039;Moana&#039; is based on which culture?',
      correctAnswer: 'Polynesian',
      answers: ['Native American', 'Japanese', 'Nordic', 'Polynesian'],
      image: 'https://media.giphy.com/media/l3vR6miXNjMtB36QU/giphy.gif'
    },
    {
      question: 'In the 1995 film &quot;Balto&quot;, who are Steele&#039;s accomplices?',
      correctAnswer: 'Kaltag, Nikki, and Star',
      answers: [
        'Dusty, Kirby, and Ralph',
        'Kaltag, Nikki, and Star',
        'Nuk, Yak, and Sumac',
        'Jenna, Sylvie, and Dixie',
      ],
      image: 'https://media.giphy.com/media/tZGVxXFPzyVvq/giphy.gif'
    },
  ]; // End Questions array

  // Set the initial question number
  let questNum = 0;

  //  Set our number counter, seconds to count down.
  let number = 10;

  // Variable that will hold our interval ID when we execute the "run" function
  let intervalId = "";

  // Set the initial correct, incorrect, and unanswered values
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  // Get the next question function
  function nextQuest() {
    // Increment the question
    questNum++;

    //Check if gone through all the questions
    if (questNum === 10) {
      // If gone through all questions
      // Hide Question, Answers, and image
      $('#question').hide();
      $('#answers').hide();
      //Clear the image src
      $("#image").attr("src","");

      // Show you're done
      $('#message').show();
      $('#message').html("All Done, here's how you did.");
      $('#message').append(`<br>Correct Answers: ${correct}`);
      $('#message').append(`<br>Incorrect Answers: ${incorrect}`);
      $('#message').append(`<br>Unanswered: ${unanswered}<br>`);
      //Show the Start Over button
      $('#startOver').removeAttr('hidden');
    //If more questions to show, load the next question
    } else {
      //Call the loadQuestion function
      loadQuestion();
    }
  }

  //  The decrement timer function.
  function decrement() {
    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $('#timerSec').html(number);

    //  Once number hits zero, time's up
    if (number === 0) {
      console.log('Time Up!');
      
      // Run the stop function.
      stop();

      // Increment the Unanswered value
      unanswered++;

      // Get the answer to the current question
      const currAnswer = Questions[questNum].correctAnswer;

      // Hide Question and Answers
      $('#question').hide();
      $('#answers').hide();

      // Display Time's Up Message and the Correct answer
      $('#message').show();
      $('#message').html("Time's Up!");
      $('#message').append(`<br>The Correct Answer is: ${currAnswer}`);
      //Display the correct answer gif
      $("#image").attr("src",Questions[questNum].image);

      // Load the next question after 3 secs
      setTimeout(() => {
        nextQuest();
      }, 3000);
    } // End timer gets to 0
  } // End Decrement Function

  //  The stop function
  function stop() {
    //  Clears our intervalId, we just pass the name of the interval to the clearInterval function.
    clearInterval(intervalId);
    if (number === 0) {
      //Reset seconds
      number = 10;
      $('#timerSec').html(number);
    }
  } // End Stop Function

  //  The run function sets an interval that runs the decrement function once a second.
  //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
  function run() {
    //Show the timer
    $('#timer').removeAttr('hidden');
    number = 10;
    $('#timerSec').html(number);

    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  // Function to load a question
  function loadQuestion() {
    
    //  Execute the run function and start the timer.
    run();

    //Clear the image src
    $("#image").attr("src","");

    //Show the hr
    $('hr').removeAttr('hidden');

    //  Clear and then Show Question and Answers
    $('#question').empty();
    $('#answers').empty();
    $('#question').show();
    $('#answers').show();
    // Hide message
    $('#message').hide();

    // Get the current question based on questNum
    const currQuest = Questions[questNum].question;

    // Get the answers to the current question
    const currAnswers = Questions[questNum].answers;

    // Display the current question
    $('#question').html(currQuest);

    // Loop through the Answers array and display the current answers
    currAnswers.forEach((element) => {
      $('#answers').append(`<div id='a' class='answer'>${element}</div>`);
    });

    //Click event for each answer
    $('.answer').click(function () {
      console.log('Answer clicked');

      // Value of clicked answer div (innerHTML)
      const currVal = $(this).html();
      console.log(currVal);

      // Get the answer to the current question
      const currAnswer = Questions[questNum].correctAnswer;

      // Stop the timer
      stop();

      // Hide Question and Answers
      $('#question').hide();
      $('#answers').hide();

      // Check if it is the correct answer
      // Check if clicked div value matches the correct answer
      if (currAnswer === currVal) {
        console.log('Correct');

        // increment correct answer counter
        correct++;

        // Display You are Correct Message
        $('#message').show();
        $('#message').html('Correct!');

      //Picked the wrong answer
      } else {
        console.log('Wrong');

        // Increment Incorrect answer counter
        incorrect++;

        // Display Incorrect Message
        $('#message').show();
        $('#message').html('Nope!');
        $('#message').append(`<br>The Correct Answer is: ${currAnswer}`);
      } // End check if correct

      //Display the correct answer gif
      $("#image").attr("src",Questions[questNum].image);

      // Load the next question after 3 secs
      setTimeout(() => {
        nextQuest();
      }, 3000);
    }); // End click on answer
  } // End loadQuestion function

  // Start Button Click Event
  $('#start').click(() => {
    console.log('Start Clicked!');

    // Make start button hidden
    $('#start').hide();

    // Call the Load Question function
    loadQuestion();
  }); // End Start Button click

  // Start Over Button Click Event
  $('#startOver').click(() => {
    console.log('Start Over Clicked!');

    // Reset these values
    questNum = 0;
    correct = 0;
    incorrect = 0;
    unanswered  = 0;

    // Make Start Over button hidden
    $('#startOver').hide();

    // Call the Load Question function
    loadQuestion();
  }); // End Start Button click
}); // End document ready
