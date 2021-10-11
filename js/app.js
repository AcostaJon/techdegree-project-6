const startGamebtn = document.querySelector(".btn__reset"); //start game button
const phrase = document.getElementById("phrase"); //phrase div
const qwerty = document.getElementById("qwerty"); //qwerty div
let missed = 0; // number of guesses the player has missed
const phrases = ["Universal Studios", "Islands of Adventure", "Six Flags", "Epcot", "Animal Kingdom"]; //phrases array

// start Game
const phraseArray = getRandomPhraseAsArray(phrases); //random phrase array
addPhraseToDisplay(phraseArray); //display phrase
let letterClass = document.querySelectorAll(".letter"); //nodelist of class letter

//==============Event listeners===============
//start button
startGamebtn.addEventListener("click", () => {
  const overlay = startGamebtn.parentNode;
  overlay.style.display = "none";
});

//keyboard buttons
qwerty.addEventListener("click", (event) => {
  const button = event.target;
  const imgs = document.querySelectorAll("img"); //node list of heart img's
  let letterFound;
  //listen only for button events from the keyboard
  if (button.tagName === "BUTTON") {
    button.className = "chosen";
    button.disabled = true;
    letterFound = checkLetter(button);
    if (letterFound === null) {
      button.style.backgroundColor = "orange";
      imgs[missed].src = "images/lostHeart.png";
      missed++;
    }
  }
  checkWin();
});

// ==================Functions================
//returns random phrase from phrases array
function getRandomPhraseAsArray(arr) {
  let newArray;
  const randomNumber = Math.floor(Math.random() * 5); //random number 0-5
  newArray = arr[randomNumber].split();
  return newArray;
}
//display random phrase to ul in your HTML
function addPhraseToDisplay(arr) {
  const ul = phrase.firstElementChild; //ul from phrase div
  for (let i = 0; i < arr[0].length; i++) {
    //loop through array
    let li = document.createElement("li"); //create list item
    li.textContent = arr[0][i]; //assign character to list item
    if (li.textContent !== " ") {
      //if li text is not a space, give li class name letter
      li.className = "letter";
    } else {
      li.className = "space"; //else give li class name space
    }
    ul.append(li); //appned letter/listitem to ul
  }
}
//checkletter
function checkLetter(button) {
  const letterClass = document.querySelectorAll(".letter"); //Node list of class letter
  let match;
  for (let i = 0; i < letterClass.length; i++) {
    //loop through letter class array
    if (letterClass[i].textContent.toLowerCase() === button.textContent) {
      letterClass[i].className = "show";
      match = button.textContent;
    }
  }
  //if there is a match return it else return null
  if (match) {
    return match;
  } else {
    return null;
  }
}
//check win
function checkWin() {
  const showClass = document.getElementsByClassName("show"); //Html Collection of class show
  let overlay = document.getElementById("overlay"); //overlay div
  let p = document.createElement("p"); //winner or loser title
  let answer = ""; //display answer;
  for (let i = 0; i < phrase.firstElementChild.children.length; i++) {
    answer += phrase.firstElementChild.children[i].textContent;
  }
  if (showClass.length === letterClass.length) {
    //win
    overlay.style.display = "flex";
    overlay.className = "win";
    p.innerHTML = `Winner!`;
    p.style.fontSize = "2rem";
    overlay.append(p);
    startGamebtn.textContent = "Play Again";
    startGamebtn.addEventListener("click", () => {
      reset(p); //reset game function
    });
  } else if (missed >= 5) {
    //lose
    overlay.style.display = "flex";
    overlay.className = "lose";
    p.innerHTML = `You Lose! <br> answer: ${answer}`;
    p.style.fontSize = "2rem";
    overlay.append(p);
    startGamebtn.textContent = "Try Again";
    startGamebtn.addEventListener("click", () => {
      reset(p); //reset game function
    });
  }
}

// reset game
function reset(p) {
  const ul = phrase.firstElementChild; //phrase div ul
  const chosenButtons = document.querySelectorAll(".chosen"); //Node list of class chosen
  const imgs = document.querySelectorAll("img"); //Node list of imgs tags
  p.remove();
  //remove current phrase
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  //get new and display phrase
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  letterClass = document.querySelectorAll(".letter");
  //remove class and disabled from buttons
  chosenButtons.forEach((element) => {
    element.classList.remove("chosen");
    element.disabled = false;
    element.style.backgroundColor = "";
  });
  //reset all tries(hearts)
  imgs.forEach((element) => {
    element.src = "images/liveHeart.png";
  });
  missed = 0; //reset missed to 0
  overlay.style.display = "none"; //remove overlay to play
}
