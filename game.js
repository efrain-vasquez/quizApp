const question = document.getElementById("question");
// Array.from converts this from N HTMLCollection to an array
// inside of here there is a property on it called dataset and its where you add custom properties
// and its anything thats prefixed with data basically becomes a property on that node. 
// so it strips out the data-part and just takes number and whatever value you give it here
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
// this is so we can create a delay between answers choosen before we let them answer again
// we set it to false so they cant answer till we have everything ready and loaded
let acceptingAnswers = false;
let score = 0;
// what question you are on
let questionCounter = 0;
// this basically a copy of full question set. we will take questions out of the available questions array 
// as we use them so we can always find a unique question to give the user.
let availableQuesions = [];
// dumby data
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

//CONSTANTS
//points for a correct answer
const CORRECT_BONUS = 10;
// how many questions a user gets before they finish
const MAX_QUESTIONS = 3;

startGame = () => {
// we will use this as a reset
  questionCounter = 0;
  score = 0;
  // we are going to copy in all the questions from the questions array
  // the spread operator is basically saying take this array and spead out each of its items
  // and put them into a new array and thats what available questions will be
  // reason we use spread operator instead of assigning availableQuesions to questions is when we make
  // changes to either one it will affect the other. what we want is a full copy of questions so we use the 
  // spread operator to do that
  availableQuesions = [...questions];
  //console.log(availableQuesions);
  getNewQuestion();
};

getNewQuestion = () => {
  // this is so we wont get an error when no questions left or given the user all the questions we wnat too
  // we end the quiz by going to the end page
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  //after we update our questionCounter lets update our questionCounterText dynamically
  //so we can show them what number of question they are on 
  //this is an example of using string concatination
  //questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  //But we can also do it using ES6 template literals
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  // Math.random() by itself will give you a decimal between 0 and 1. 
  // if you want to get an integer out of it you multiply it by a number which gives you a number 
  // between 0 and what you multiplied by. to get only the integer no decimal you do 
  // Math.floor() which will round down to the nearest integer
  // we use avalableQuestions.length because as we go through the questions the length gets smaller
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  // we get a reference to currentQuestion by getting it out of the
  // avalableQuestions array and then use our questionIndex
  currentQuestion = availableQuesions[questionIndex];
  // this is the current question we just loaded and its question property
  question.innerText = currentQuestion.question;

  // use for each to iterate through the choices and gives us a refernce to each choice
  choices.forEach(choice => {
    // we want to get a refernce to the data-number we do it throught the dataset property
    // we do that by saying choice.dataset['and give me the number property out of it']
    const number = choice.dataset["number"];
    // so out of the current question we want to get choice and 
    // then we want to use that number to get the choice out of it
    // if you look at the array of questions there are 4 different choices with four different numbers
    // this way we can get the choice property here and get the data attribute number associated with it
    // and we can use that to get the appropriate choice out of the current question.
    choice.innerText = currentQuestion["choice" + number];
  });

  // we want to remove the question we just used from the avaliableQuestions
  // we tell splice where to splice out and how many to splice out
  availableQuesions.splice(questionIndex, 1);
  console.log(availableQuesions);
  // after we load the question we set it to true so they can answer the question 
  acceptingAnswers = true;
};

// we want to grab each choice so we iterate throught them  which gives us a reference to each choice
choices.forEach(choice => {
  // we want to add an addEventListener passing in the event as an argument
  // so we are able to click and get a reference to which choice they clicked
  // now we take this data attribute number and check to see the real answer choice
  choice.addEventListener("click", e => {
    // but first if we are not accepting answers meaning we are not ready for them to answer
    // we will just return and ignore the fact they clicked on it
    if (!acceptingAnswers) return;
    // we set accepting Answers to false to give us a delay we dont want them to click immediately
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    //console.log(selectedAnswer);
    // since one is a string and the other a number cant use === strickly equals
    //console.log(selectedAnswer === currentQuestion.answer);
    //here we see we are able to detect if the current answer is correct
    // based on that we want to figure out which class to apply we will have two different classes
    // one for correct answers one for incorrect answers
    //console.log(selectedAnswer == currentQuestion.answer);
    // we set it to incorrect by default
    // const classToApply = "incorrect";
      // we check to see if the answer is correct if it is we update the classToApply to correct
      // if(selectedAnswer == currentQuestion.answer) {
      //   classToApply = "correct";
      // }
    //we are going to do the same thing but with a turnary operator
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      //now we will call the function incrementScore if the user answered correctly
      if(classToApply == "correct") {
        //we call incrementScore and tell it to increment by the value of the variable CORRECT_BONUS
        incrementScore(CORRECT_BONUS);
      }

    // now what we want to do is actually apply this class 
    // we get our selectedChoice and get the parent element. what we are doing here is the selectedChoice
    // is the choice that is selected but the way to get that is to get the container element 
    // and the way we get that is we get the parent element, and we will say classList.add()
    // this is how we apply classes in javascript and we pass in the class to apply (classToApply)
    selectedChoice.parentElement.classList.add(classToApply);
    // we need to remove the class but only after a short delay.
    // we do this with setTimeout()
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      // since we call new question it will load a new question
      getNewQuestion();
    }, 1000);
  });
});

//here we will check to see if the user got the question correct 
//and then incrementes the score 
//and then updates the scoreText
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();