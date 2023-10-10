const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d");
let player1Score = 0;
let player2Score = 0;


let paddle1UpPressed = false;
let paddle1DownPressed = false;
let paddle2UpPressed = false;
let paddle2DownPressed = false;


        class Circle{
      constructor(x,y,r,s,e){
        this.x = x;
        this.y = y;
        this.r = r;
        this.s=s;
        this.e=e;
        this.color="red";
        this.x_speed=1;
        this.y_speed=1;
        this.speed = 5;
      }
        draw(){
          c.beginPath();
          c.fillStyle = this.color;
          c.arc(this.x, this.y,this.r,this.s,this.e);
          c.fill();
        }
         move(){
          this.x = this.x + this.x_speed*this.speed;
          this.y = this.y + this.y_speed*this.speed;
        }
         checkCollision(){
          if (this.x + this.r > canvas.width) {
            this.x_speed = -1; 
          } 
          else if (this.x-this.r < 0) {
          
            this.x_speed = 1; 
          }
      
          if (this.y-this.r < 0) {
            
            this.y_speed = 1; }

           else if (this.y+this.r>canvas.height){
              this.y_speed=-1;
            }
          
        }

        checkPaddleCollision(paddle) {
          const distX = Math.abs(this.x - (paddle.paddlex + paddle.width / 2));
          const distY = Math.abs(this.y - (paddle.paddley + paddle.height / 2));
        
          if (distX > (paddle.width / 2 + this.r) || distY > (paddle.height / 2 + this.r)) {
            return false; // No collision
          }
        
          if (distX <= paddle.width / 2 || distY <= paddle.height / 2) {
           
            this.x_speed *= -1;
          }
        }

         update(){
          this.draw();
          this.checkCollision();
          this.move();
        
        }

        checkScoring() {
          if (this.x + this.r > canvas.width) {
            player1Score++;
            this.reset();
          } else if (this.x - this.r < 0) {
            player2Score++;
            this.reset();
          }
        }

        reset() {
          this.x = canvas.width / 2;
          this.y = canvas.height / 2;
          this.x_speed = 1;
          this.y_speed = 1;
        }

         
      
    
  }
    class Paddle{
      constructor(x,y,width,height){
        this.width = width ; 
        this.height = height; 
        this.paddlex=x;
        this.paddley=y;
      }

     
  
      drawPaddle(){
        c.beginPath();
        c.rect(this.paddlex,this.paddley, this.width, this.height);
        c.fillStyle= "black";
        c.fill(); 

    }

    
     update(){
      this.drawPaddle();
    }

  }

 

function initializeGame() {

  document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
  console.log("KeyDown", event.key);
  if (event.key == "ArrowUp") {
    paddle1UpPressed = true;
  } else if (event.key == "ArrowDown") {
    paddle1DownPressed = true;
  } else if (event.key == "w") {
    paddle2UpPressed = true;
  } else if (event.key == "s") {
    paddle2DownPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key == "ArrowUp") {
    paddle1UpPressed = false;
  } else if (event.key == "ArrowDown") {
    paddle1DownPressed = false;
  } else if (event.key == "w") {
    paddle2UpPressed = false;
  } else if (event.key == "s") {
    paddle2DownPressed = false;
  }
}


//const circle = new Circle(0,80,10,0,Math.PI*2);
const circle = new Circle(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
const paddle1 = new Paddle(1190,0,10,100);
const paddle = new Paddle(0,250,10,100);


function drawScores() {
  c.font = "30px Arial";
  c.fillStyle = "black";
  c.fillText(`Player 1: ${player1Score}`, 10, 30);
  c.fillText(`Player 2: ${player2Score}`, canvas.width - 160, 30);
}

function updatePaddlePositions() {
  if (paddle1UpPressed && paddle1.paddley > 0) {
    paddle1.paddley -= 5;
  }
  if (paddle1DownPressed && paddle1.paddley + paddle1.height < canvas.height) {
    paddle1.paddley += 5;
  }
  if (paddle2UpPressed && paddle.paddley > 0) {
    paddle.paddley -= 5;
  }
  if (paddle2DownPressed && paddle.paddley + paddle.height < canvas.height) {
    paddle.paddley += 5;
  }
}


  function animate(){
    c.clearRect(0,0,canvas.width,canvas.height);
    if (player1Score >= 5 || player2Score >= 5) {
      if (player1Score >= 5) {
        c.fillText("Player 1 wins!", canvas.width / 2 - 80, canvas.height / 2);
      } else {
        c.fillText("Player 2 wins!", canvas.width / 2 - 80, canvas.height / 2);
      }
    }
    else{
    paddle1.update();
    paddle.update();
    circle.update();
    circle.checkPaddleCollision(paddle1);
  circle.checkPaddleCollision(paddle);
    circle.checkScoring();
    updatePaddlePositions(); 
    drawScores();
    requestAnimationFrame(animate);
    }
}

animate();
}
initializeGame();
