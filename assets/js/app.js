/* eslint-disable func-names */
// Ensure js file is connected
console.log('Connected!');

// Make sure document is loaded
$(document).ready(() => {
  console.log('Document Ready');

  $('#startOver').hide();

  // Set the Availavble Questions
  const Questions = [
    {
      question: 'Which animated movie was first to feature a celebrity as a voice actor?',
      correctAnswer: 'Aladdin',
      answers: ['Toy Story', 'Aladdin', 'James and the Giant Peach', 'The Hunchback of Notre Dame'],
    },
    {
      question: 'When was the movie &#039;Con Air&#039; released?',
      correctAnswer: '1997',
      answers: ['1997', '1985', '1999', '1990'],
    },
    {
      question: 'What was Dorothy&#039;s surname in &#039;The Wizard Of Oz&#039;?',
      correctAnswer: 'Gale',
      answers: ['Gale', 'Perkins', 'Day', 'Parker'],
    },
    {
      question: 'This movie contains the quote, &quot;Houston, we have a problem.&quot;',
      correctAnswer: 'Apollo 13',
      answers: ['The Right Stuff', 'Capricorn One', 'Apollo 13', 'Marooned'],
    },
    {
      question:
        'Which movie includes a giant bunny-like spirit who has magic powers including growing trees?',
      correctAnswer: 'My Neighbor Totoro',
      answers: ['Hop', 'Rise of the Guardians', 'Alice in Wonderland', 'My Neighbor Totoro'],
    },
    {
      question: 'What was the first monster to appear alongside Godzilla?',
      correctAnswer: 'Anguirus',
      answers: ['King Kong', 'Mothra', 'Anguirus', 'King Ghidora'],
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
    },
    {
      question: 'In the 2012 film, &quot;The Lorax&quot;, who is the antagonist?',
      correctAnswer: 'Aloysius O&#039;Hare',
      answers: ['Ted Wiggins', 'Aloysius O&#039;Hare', 'The Once-Ler', 'Grammy Norma'],
    },
    {
      question: 'The 2016 Disney animated film &#039;Moana&#039; is based on which culture?',
      correctAnswer: 'Polynesian',
      answers: ['Native American', 'Japanese', 'Nordic', 'Polynesian'],
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
    },
  ]; // End Questions array

  // Set the initial question number
  let questNum = 0;

  //  Set our number counter, seconds to count down.
  let number = 1;

  //  Variable that will hold our interval ID when we execute the "run" function
  let intervalId;

  // Set the initial correct and incorrect values
  let correct = 0;
  let incorrect = 0;

  // Get the next question function
  function nextQuest() {
    // Increment the question
    questNum++;

    if (questNum === 10) {
      // Reset the question to the first
      // questNum = 0;

      // Hide Question and Answers
      $('#question').hide();
      $('#answers').hide();

      // Show you're done
      $('#message').show();
      $('#message').html("All Done, here's how you did.");
      $('#message').append(`<br>Correct Answer: ${correct}`);
      $('#message').append(`<br>Incorrect Answer: ${incorrect}<br>`);
      $('#startOver').show();
      // const newBtn = $("<button id='startOver' class='start'>Start Over</button>");
      // $('#message').append(newBtn);
    } else {
      loadQuestion();
    }
  }

  //  The decrement function.
  function decrement() {
    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $('#timerSec').html(number);

    //  Once number hits zero...
    if (number === 0) {
      console.log('Time Up!');
      // Run the stop function.
      stop();

      // Get the answer to the current question, the letter
      const currAnswer = Questions[questNum].correctAnswer;

      // Hide Question and Answers
      $('#question').hide();
      $('#answers').hide();

      // Display Time Up Message
      $('#message').show();
      $('#message').html("Time's Up!");
      $('#message').append(`<br>The Correct Answer is: ${currAnswer}`);

      // Load the next question after 3 secs
      setTimeout(() => {
        nextQuest();
      }, 500);

      // Call the next question after 3 secs
      // const delayFunc = setTimeout(nextQuest(), 3000);
    } // End timer gets to 0
  } // End Decrement Function

  //  The stop function
  function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
    if (number === 0) {
      number = 1;
    }
  } // End Stop Function

  // Function to load a question
  function loadQuestion() {
    //  The run function sets an interval
    //  that runs the decrement function once a second.
    //  *****BUG FIX********
    //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }
    //  Execute the run function and start the timer.
    run();

    //  Clear and Show Question and Answers
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
    console.log(currAnswers);

    // Display the current question
    $('#question').html(currQuest);

    // Display the current answers
    currAnswers.forEach((element) => {
      $('#answers').append(`<div id='a' class='answer'>${element}</div>`);
    });

    $('.answer').click(function () {
      console.log('Answer clicked');

      // Value of clicked div
      const currVal = $(this).html();
      console.log(currVal);

      // Get the answer to the current question, the letter
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

        // increment correct
        correct++;

        // Display Correct Message
        $('#message').show();
        $('#message').html('Correct!');
      } else {
        console.log('Wrong');

        // increment INcorrect
        incorrect++;

        // Display Incorrect Message
        $('#message').show();
        $('#message').html('Nope!');
        $('#message').append(`<br>The Correct Answer is: ${currAnswer}`);
      } // End check if correct

      // Load the next question after 3 secs
      setTimeout(() => {
        nextQuest();
      }, 500);
    }); // End click on answer
  } // End loadQuestion function

  // Start Button Click Event
  $('#start').click(() => {
    console.log('Start Clicked!');

    // Make start button hidden
    $('#start').hide();

    // Make question div visible
    $('#questions').show();

    // Call the Load Question function
    loadQuestion();
  }); // End Start Button click

  // Start Over Button Click Event
  $('#startOver').click(() => {
    console.log('Start Over Clicked!');

    // Reset
    questNum = 0;
    correct = 0;
    incorrect = 0;

    // Make start button hidden
    $('#startOver').hide();

    // Make question div visible
    $('#questions').show();

    // Call the Load Question function
    loadQuestion();
  }); // End Start Button click
}); // End document ready
