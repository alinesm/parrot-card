let firstCardValue
let secondCardValue
let cards;
let interval;
let cardValues
let firstCard = false
let secondCard = false
let movesCount = 0
let winCount = 0

const items = [
  {name: "bobross", gif: "/assets/bobrossparrot.gif" },
  {name: "explody", gif: "/assets/explodyparrot.gif" },
  {name: "fiesta", gif: "/assets/fiestaparrot.gif" },
  {name: "metal", gif: "/assets/metalparrot.gif" },
  {name: "revertit", gif: "/assets/revertitparrot.gif" },
  {name: "triplets", gif: "/assets/tripletsparrot.gif" },
  {name: "unicorn", gif: "/assets/unicornparrot.gif" }
]

let size = window.prompt('Enter with the number of card. it should be an even number between 4 and 14')

while( Number(size) % 2 !== 0  ||  Number(size) < 4 || Number(size) > 14 ){
  size = window.prompt('Enter with the number of card. it should be an even number between 4 and 14')
}

function suffle() { 
	return Math.random() - 0.5; 
}

items.sort(suffle)

const gameBoard = document.querySelector(".gameBoard")
gameBoard.innerHTML = ""

let arr = []
for (let i = 0; i < size /2; i++) {
  arr.push(items[i])
  gameBoard.innerHTML += `
   <div class="card-container" data-card-value="${items[i].name}">
      <div class="card-front"><img src="${"/assets/back.png"}" /></div>
      <div class="card-back">
      <img src="${items[i].gif}" class="image" /></div>
   </div>
   `;
}

arr.sort(suffle)
for (let i = 0; i < size /2; i++) {
  gameBoard.innerHTML += `
   <div class="card-container" data-card-value="${arr[i].name}">
      <div class="card-front"><img src="${"/assets/back.png"}" /></div>
      <div class="card-back">
      <img src="${arr[i].gif}" class="image" /></div>
   </div>
   `;
}

cards = document.querySelectorAll(".card-container");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("matched")) {
      card.classList.add("flipped");
      if (!firstCard) {
        movesCount += 1
        firstCard = card;
        firstCardValue = card.getAttribute("data-card-value");
      } else {
        movesCount += 1;
        secondCard = card;
        let secondCardValue = card.getAttribute("data-card-value");
        if (firstCardValue === secondCardValue) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          firstCard = false;
          secondCard= false //tentar
          winCount += 1;
          if (winCount == Math.floor(arr.length)) {
            setTimeout(() => gameOver (), 200) 
          }
        } else {
          let delay = setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = false;
            secondCard = false;
          }, 1000);
        }
      }
    }
  });
});


function gameOver () {
  alert(`Você ganhou em ${movesCount} jogadas!"`)
}