//we get a refence to the input text so the username text so we make a const
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
// here we want a reference to the score of the player that is in localStorage
//we get that score using .getItem
const mostRecentScore = localStorage.getItem("mostRecentScore");

// localStorage only uses key value pairs with the value being a String. 
// so anything you store in there is going to be a String.
//if you try to set highScores to an empty array its not going to like that
//if you console log that it will return an empty string.
//we can still work with arrays we just need to convert them into a json string before we do
//If you use JSOn.stringify() on your array it returns an empty array back
//But the thing coming out of there is still a string so you need to do JSON.parse()
//so now you get an array object back instead of a string from local storage
// localStorage.setItem("highScores", JSON.stringify([]));
// console.log(JSON.parse(localStoarage.getItem("highScores")));
// finalScore.innerText = mostRecentScore;

//first thing we want to do is get a reference to our highScores so we do a const
//so what we are going to do is we are going to say were going to get whats in localStaorage
//or if that reurns null we will just return an empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//this const will help us set the limit of high scores saved onto our list which is an array to 5 
const MAX_HIGH_SCORES = 5;
//we log it to be sure to get a reference to all these things
//if first time playing the game it will be empty so you will get null back for the console.log
console.log("highScores");
//we set the finalScore using the value from mostRecentScore
finalScore.innerText = mostRecentScore;

//The .change event occurs when the value of an element has been changed 
//(only works on <input>, <textarea> and <select> elements).
//The change() method triggers the change event, or attaches a function to run when a change event occurs.
//change as an event listen for inputs does not give a change on evey character you type in 
//so we use .addEventListener instead
//now we can decide wether or not we want to disable the save score button based upon whats in username.value
// username.addEventListener("keyup", () => {
//   console.log(username.value);
// });
username.addEventListener("keyup", () => {
  // we will disable based upon the falsey value of username.value
  // meaning if nothing in there then set button to disable
  // if something is in there then enable the button
  saveScoreBtn.disabled = !username.value;
});

//we get the event by passing in e. 
//forms by default will go ahead and submit to a new page with those form properties 
//as query parameters (as seen in the url string)
// saveHighScore = e => {
//   console.log("cliked the save button");
// };

saveHighScore = e => {
  console.log("clicked the save button!");
  //so what we want to do is prevent the default action using e.preventDefault()
  //this will prevent the form from taking its default action 
  //which is to post to a differrent page when clicking the btn
  //so now you can click the button and it doesnt post to a different page
  e.preventDefault();
//we are going to create a score object which will reference the most recent score 
//and then it will also have a name which we will get from the username.name.value
//typically you save your score then get navigated back to the home page
//But we dont know if the score is high enough to get added to the list
//so what we do is push our score to the list of scores 
//then we call sort() on our list
//then we use splice to only save the top five scores
  const score = {
    //instead of just grabbing the most recent score and limiting them to just 5 scores
    //lets sort the scores in order from highest to least
    score: mostRecentScore,
    name: username.value
  };
  //we push our score to the list of highScores array in our localStorage
  highScores.push(score);
  //lets console.log(score) to see what we are pushing onto our array
  //console.log(score);
  
  //now lets sort the array of highScores with .sort()
  //we are able to sort by score using this function
  //if b.score is higher than a.score then put b.score before a.score
  //using ES6 arrow function we dont need the return becuse its implicit
  //we dont need brackets either
  // highScores.sort((a, b) => {
  //   return b.score - a.score;
  // })
  // console.log(highScores);
  highScores.sort((a, b) => b.score - a.score);
  //this is just saying at index 5 start cutting off everything after that
  highScores.splice(5);
  //we need to update localStorage with our highScores 
  //but we need to strigify this into json so it can be saved as a string into our highScores
  localStorage.setItem("highScores", JSON.stringify(highScores));
  //this takes us back to our home page
  window.location.assign("/");
  //console.log(highScores);
};