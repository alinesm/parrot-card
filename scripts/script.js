let movesCount;

initialize();

function initialize() { 
  let firstCardValue;
  let secondCardValue;
  let cards;
  let firstCard = null;
  let secondCard = null;
  let matchedCount = 0;
  movesCount = 0;

  let items = [
    {name: "bobross", gif: "/assets/bobrossparrot.gif" },
    {name: "explody", gif: "/assets/explodyparrot.gif" },
    {name: "fiesta", gif: "/assets/fiestaparrot.gif" },
    {name: "metal", gif: "/assets/metalparrot.gif" },
    {name: "revertit", gif: "/assets/revertitparrot.gif" },
    {name: "triplets", gif: "/assets/tripletsparrot.gif" },
    {name: "unicorn", gif: "/assets/unicornparrot.gif" }
  ];

  let size = window.prompt('Enter with the number of card. it should be an even number between 4 and 14');

  while( Number(size) % 2 !== 0  ||  Number(size) < 4 || Number(size) > 14 ) {
    size = window.prompt('Enter with the number of card. it should be an even number between 4 and 14')
  }

  function suffle() { 
    return Math.random() - 0.5; 
  }

  items.sort(suffle);

  let gameBoard = document.querySelector(".gameBoard");
  gameBoard.innerHTML = "";

  let  uniqueGifs = [];
  for (let i = 0; i < size/2; i++) {
    uniqueGifs.push(items[i]);
  }

  let duplicatedGifs = uniqueGifs.flatMap(i => [i,i])
  let duplicatedSuffledGifs = duplicatedGifs.sort(suffle);

 for (let i = 0; i < size; i++) {
    gameBoard.innerHTML += `
    <div class="card-container" data-card-value="${duplicatedSuffledGifs[i].name}">
        <div class="card-front">
          <img src="${"/assets/back.png"}" />
        </div>
        <div class="card-back">
          <img src="${duplicatedSuffledGifs[i].gif}" class="image" />
        </div>
    </div>
    `;
  }

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          movesCount += 1;
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCount += 1;
          secondCard = card; 
          gameBoard.classList.add("block");       
          secondCardValue = card.getAttribute("data-card-value");          
          if (firstCardValue === secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard= null;
            gameBoard.classList.remove("block"); 
            matchedCount += 1;
            if (matchedCount === uniqueGifs.length) {
              setTimeout(() => gameOver (), 300); 
            }
          } else {
              setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard = null;
                secondCard = null;       
                gameBoard.classList.remove("block");
            }, 1000);
          }
        }
      }
    });
  });
}


let restart;
function gameOver () {
  alert(`Você ganhou em ${movesCount} jogadas!"`);

  restart = prompt("gostaria de jogar novamente? Digite sim ou não"); 
  
  while(restart !== "sim" || restart !== "não") {    
    if(restart === "sim") {
      return initialize();     
    } else if (restart === "não") {
      return;
    } else {
      restart = prompt("gostaria de jogar novamente? Digite sim ou não");
    }
  }
}

