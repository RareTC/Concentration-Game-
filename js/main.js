/*----- constants -----*/
const FACE_CARDS = [
    {
        img:'images/air.png',
        matched: false,
        name: 'air'
    },
    {
        img:'images/appa.png',
        matched: false,
        name: 'appa'
    },
    {
        img:'images/earth.png',
        matched: false,
        name: 'earth'
    },
    {
        img:'images/fire.png',
        matched: false,
        name: 'fire'
    },
    {
        img:'images/group.png',
        matched: false,
        name: 'group'
    },
    {
        img:'images/water.png',
        matched: false,
        name: 'water'
    },
  
]
const BACK_CARD = 'images/background.png'
    
/*----- state variables -----*/
let points; //1 point per matched pair 
let timerId; // 2:00 timer per game
let cards; 
let winner; //All cards matched before 2 min and before 5 wrong guesses
//L out of time W is a win O is out of guesses, null is ongoing game 
let firstClick;
let secondClick;
let ignoreClick;

/*----- cached elements  -----*/
const cardImgEls = document.querySelector('section > img');
const playAgainBtn = document.querySelector('button');
const boardEl = document.getElementById('board');
const countdownEl = document.getElementById('countdown');
const gameResultEl = document.getElementById('gameresult');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init (); //initialized all state then call render

function init () {
    //this shuffles cards with 2 matches 
    cards = getShuffledCards();
    firstClick = null;
    secondClick = null;
    ignoreClick = false;
    winner = null;
    // countdown = renderCountDown;
    // points = 0;
    startCountDown();

    render();
}

function render() {
    renderBoard();
    playAgainBtn.disabled = !winner;
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
    if (winner)
    if (winner === 'L') {
        gameResultEl.innerText = 'You are out of time!';
    } else if (winner === 'W') {
        gameResultEl.innerText = "You won!";
    } else {
        gameResultEl.innerText = '____ guesses left!';
    }

}

function startCountDown() {
    let count = 120
    countdownEl.innerText = count;
    let timerId = setInterval(function() {
        count--;
        if (count) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timerId)
            countdownEl.innerText = count;
            winner = 'L';
            render();
        }
    },1000);
}

function renderBoard() {
    cards.forEach(function(imgEl, idx) {
        const cardImgEl = document.getElementById(idx)
        const src = (imgEl.matched || imgEl === firstClick || imgEl === secondClick) ? imgEl.img : BACK_CARD;
        cardImgEl.src = src;
    });
}
// if (imgEl.matched || firstClick === imgEl || secondClick == imgEl){
//     src = imgEl.img
// } else {
//     src = BACK_CARD.img
// }

    
function handleClick(evt) {
    const cardIdx = parseInt(evt.target.id)
    const card = cards[cardIdx];
    if (winner || isNaN(cardIdx) || ignoreClick || cards[cardIdx] === firstClick) return;
    if (firstClick) secondClick = card
    if (!firstClick) firstClick = card
    card.matched = true;

    if (firstClick?.img === secondClick?.img) {
        firstClick.matched =true
        secondClick.matched = true
        firstClick = null
        secondClick = null
        // render();
    } 
    if (firstClick && secondClick) {
        console.log(firstClick.name, secondClick.name);
        ignoreClick = true;
        //set time out starts here 
        setTimeout(function(){

            firstClick.matched = false;
            secondClick.matched = false;
            firstClick = null
            secondClick = null
            ignoreClick = false;
            render();
        }, 2000);
        //make a set time out before setting first and second clicks to false then call render
    }
    //Reset clicks back to null
    render()
}


function getShuffledCards() {
    const tempCards = [];
    //array to be returned
    const cards = [];
    //copy each source card twice and add to tempCards
    FACE_CARDS.forEach(function(card) {
        tempCards.push({...card}, {...card});
    });
    while (tempCards.length) {
        const rndIdx = Math.floor(Math.random() * tempCards.length);
        const rndCard = tempCards.splice(rndIdx, 1)[0];
        cards.push(rndCard);
    }
    return cards;
}

// function checkWinner() {
//     console.log("Inside Winner Function");
//     const checkWinner = cards.every(function(card) {
//         if (card.name === card.name ** timerId !== 0) {
//             console.log('You are a winner');
//         }
//         else {
//             console.log ('You lose');
//         }
//     });
// }
    
    //     return card.name === card.name;
    // });
    // console.log(checkWinner);
    // if (checkWinner === true) {
    //     console.log('You win');
    // }
    // render();