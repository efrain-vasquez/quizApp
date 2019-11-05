//remember localStorage is not secure you can change the high score 
//to make it secure you would add scores to a database
//we want to get a reference to our highScoresList  
const highScoresList = document.getElementById("highScoresList");
//we want to get highScores out of localStorage 
//if nothing is there we dont want to break our code so we do: or []
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//console.log(highScores) to see what we get back
//we want to iterate through each score 
//and for each score we want to add an <li> to our <ul>
//we use map to do this
//now we can do something with each one of these scores
//highscores.map(score => { console.log(score); });
//we want to create an li that has both the name and the score inside of it 

//we console.log this whole thing to see what we get back
//we dont want them to be strings we want them to be <li>
//with map we can return each one of these items
//what map does is it takes an incoming array which is highScores and allows you to convert
//each of those items into something new in the new array.
//so we are taking in the score object and we are returning back a string version
//of an <li> that has the stuff in it that we need
// console.log(
//   highScoresList.innerHTML = highScores
//   .map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`;
//   })
// );
//we can also take a .join('') and join all those elementsin the array and join them with an empty string
//so now we get a string with all of our <li> content in here
//highScoresList is an unordered list
//The innerHTML property sets or returns the HTML content (inner HTML) of an element.
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
