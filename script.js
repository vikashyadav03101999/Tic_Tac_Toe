// acess all class from html
let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newGameBtn=document.querySelector(".startBtn");
let winMsg=document.querySelector(".winmsg-cont");
let msg=document.querySelector(".msg");

let count=0;// initialization count
let player1=true;

const winChance=[
    [0,1,2],[0,3,6],[0,4,8],
[1,4,7],[2,5,8],[6,7,8],[3,4,5],[2,4,6]
];
// console.log(winChance);  

// starting newgame or reset the game
const newGame=()=>{
    let player1=true;
    count=0;
    enableBox();
    winMsg.classList.remove("hide");
    stopConfitte(confitteInterval);
}

// when game is tie
const gameTie=()=>{
    msg.innerText=`It's a tie! No winner.`;
    winMsg.classList.add("hide");
    disabledBoxes();
}

// playing game 
boxes.forEach((item) => {
    item.addEventListener("click",()=>{
        // console.log("boxclicked");
        if(player1){
            item.innerText="X";
            player1=false;
        }
        else{
            item.innerText="O";
            player1 =true;
        }
      item.disabled=true;
      count++;

    //   logic for game when draw
    let tie= check(); 
if(count === 9 && !tie){
gameTie();
console.log(gameTie());
};
    });  
});

// condtion check for when player wins
const check = ()=>{
    for (let winList of winChance){
        // console.log(winList);
      let firtsPos=  boxes[winList[0]].innerText;
      let secondPos=  boxes[winList[1]].innerText;
      let thirdPos=  boxes[winList[2]].innerText;
        // console.log(winList[0],winList[1],winList[2]);
        // console.log(boxes[winList[0]].innerText,
        //     boxes[winList[1]].innerText,
        //     boxes[winList[2]].innerText);
        if(firtsPos != "" && secondPos != "" && thirdPos != ""){
            if(firtsPos === secondPos && secondPos === thirdPos){
                console.log("winner",firtsPos);
            pop(firtsPos); 
            return true;
            }
           
        }
    }

    
};

// box are not clicked when player over there cahnce
const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

// when game restart all box get enable
const enableBox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

// celebration when palyer wins
const confitte=()=>{
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 460, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    confitteInterval= setInterval(function() {
      var timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(confitteInterval);
      }
      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}
const stopConfitte = (interval) => {
    if (interval) {
        clearInterval(interval);
    }
}

// when palyer win its pop the message for conguratulations
const pop=(winner)=>{
    
    msg.innerText=`Conguratulations , Winner is ${winner}`;
    winMsg.classList.add("hide");
    disabledBoxes();
    confitte();
   
}

// when button get click it's call newGame function
newGameBtn.addEventListener("click",newGame);
reset.addEventListener("click",newGame)