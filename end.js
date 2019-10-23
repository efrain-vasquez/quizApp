//we get a refence to the input text so the username text so we make a const
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

//The .change event occurs when the value of an element has been changed 
//(only works on <input>, <textarea> and <select> elements).
//The change() method triggers the change event, or attaches a function to run when a change event occurs.
//change as an event listen for inputs does not give a change on evey character you type in 
//so we use .addEventListener instead
username.addEventListener("keyup", () => {
  console.log(username.value);
});

// username.addEventListener("keyup", () => {
//   saveScoreBtn.disabled = !username.value;
// });

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
};