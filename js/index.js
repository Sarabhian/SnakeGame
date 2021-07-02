// Game const and variables 
let snakePosition = { x: 0, y: 0 };
const foodsound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let score=0;
let lastPaintTime = 0;
let snakeArr = [{ x: 1, y: 17 }];
let food={x:13 ,y:15};
// Game functions 
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();


}
function isCollide(snake){
   //  snake head tuching own body 
   for ( let j=1 ;j<snakeArr.length; j++){
       if( snake[j].x===snake[0].x && snake[j].y===snake[0].y){
           return true ;
       }
   }
   //  snake touching boundary 
   if (snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
       return true ;
   }

}

  function gameEngine() {
    // updating snake array and food 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        snakePosition = { x: 0, y: 0};
        alert('Game Over :( , press any key to play again :D');
        snakeArr=[{ x: 1, y: 17 }];
        musicSound.play();
        score=0;
        speed=5;
    }
    // if food is eaten then increment score and regenerate food
    if (snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play()
        score += 1;
        scoreHead.innerHTML="Score: "+ score;
        snakeArr.unshift({x:snakeArr[0].x+snakePosition.x, y:snakeArr[0].y+snakePosition.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b -a)*Math.random()),y: Math.round(a+(b -a)*Math.random())}
    }
    //Movng the snake
    for(let i= snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}; 
        
        
    }
    snakeArr[0].x +=snakePosition.x;
    snakeArr[0].y +=snakePosition.y;
      
    // changing speed of snake 
      speed= Math.round(snakeArr.length)*2;
    // Display snake 
    board.innerHTML = "";
    snakeArr.forEach((item,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridColumnStart=item.x;
        snakeElement.style.gridRowStart=item.y;
        if (index >= (snakeArr.length-3)  && index!=0){ 
            
            
            snakeElement.classList.add("snake_tail")  
        }
        if (index==0){
            snakeElement.classList.add("pacman")  
        }
        else{

            snakeElement.classList.add("snake_body")
        }
        board.appendChild(snakeElement);
    })
            




    //Display Food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}
// Main logic starting point 
 window.requestAnimationFrame(main);
 window.addEventListener('keydown',item=>{
     snakePosition={x:0,y:1} //starting game
     moveSound.play();
     switch(item.key){
         case "ArrowUp"  :
             console.log("ArrowUp");
             snakePosition.x=0;
             snakePosition.y=-1;
             break;
        case "ArrowDown":
             console.log("ArrowDown");
             snakePosition.x=0;
             snakePosition.y=1;
             break;
        case "ArrowLeft":
             console.log("ArrowLeft");
             snakePosition.x=-1;
             snakePosition.y=0;
             break;
        case "ArrowRight":
             console.log("ArrowRight");
             snakePosition.x=1;
             snakePosition.y=0;
             break;
        default:
             break;
     }
 })
