//Global Variables
var monkey, mImage, ground, gImage, banana, bImage, jungle,jImage, stone,sImage, gameOver, goImage, restart, rImage,iGround, foodGroup, obstaclesGroup, score;

var PLAY=1;
var END=0;
var gameState= PLAY;
var turn=3
var timer =120
var distance=0

function preload()
{
  mImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gImage = loadImage("ground2.png");
  bImage= loadImage ("banana.png");
  jImage = loadAnimation("jungle2.jpg","jungle2.jpg","jungle2.jpg","jungle2.jpg","jungle2.jpg");
  sImage =loadImage ("stone.png");
  goImage = loadImage("gameOver.png");
  reImage = loadImage ("restart.png");
  rImage=loadImage("replay.png")
}
function setup()
{
  createCanvas(windowWidth-20,windowHeight-30);
  
  jungle = createSprite(0,150,windowWidth,windowHeight);
  jungle.addAnimation("jungle",jImage);
  jungle.scale=2
    
  monkey = createSprite(20,height-50,20,20);
  monkey.addAnimation("walking",mImage);
  monkey.scale=0.2;
  
  gameOver = createSprite(monkey.x,160,20,20);
  gameOver.addImage("game over",goImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart = createSprite(monkey.x,200,20,20);
  restart.addImage("restart",reImage);
  restart.scale=0.5;
  restart.visible=false;

  replay = createSprite(monkey.x,200,20,20);
  replay.addImage("press r",rImage);
 // replay.scale=0.5;
  replay.visible=false;
  
  iGround=createSprite(width/2,height-10,windowWidth,20);
  iGround.visible=false;
  
  foodGroup=createGroup();
  ObstaclesGroup=createGroup();
  
  score=0;
}

function draw(){
 background("white"); 
 drawSprites();
  //console.log(monkey.y);
  monkey.collide(iGround);
 
  if(gameState===1)
  {
    if (frameCount % round(frameRate()) === 0 && timer > -1) {
    
     timer --;
     
    }
    
    camera.x=monkey.x+800
    iGround.x=monkey.x
    jungle.x=monkey.x
    if(keyIsDown(RIGHT_ARROW))
    {
      monkey.x+=5
      distance++
    }
    if(keyIsDown(LEFT_ARROW))
    {
      monkey.x-=5
      distance--
    }
    //jungle.velocityX=-4;
  
    /*if(jungle.x<0)
    {
      jungle.x=jungle.width/2;
    }*/

      if(keyDown("space")&&monkey.y>=765)
    {
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.5;

      spawnObstacle();
    spawnFood();
    
    if(foodGroup.isTouching(monkey))
    {
      score=score+1;
      foodGroup.destroyEach();
    }

    if(ObstaclesGroup.isTouching(monkey))
    {
     monkey.scale=0.1;
      gameState=0;
      gameOver.visible=true;
      restart.visible=true;
      gameOver.x=monkey.x+200
      restart.x=monkey.x+200
      turn-=1
    }
    if(turn===0)
    {
      restart.visible=false;
      gameOver.visible=true;
      replay.visible=true;
      replay.x=monkey.x+200
      gameState=0
    }
    if( distance>=1000 && timer>0)
    {
      gameState=0;
      fill("black")
      textSize(30)
      text("You Won",monkey.x-100,200);
      //doorway.play()
    }

}
   if(gameState===0)
  {
    monkey.velocityY=0;
    ObstaclesGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0,0);
    ObstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    foodGroup.destroyEach();
    ObstaclesGroup.destroyEach();
   
  }
  if(keyDown("R")&& gameState===0)
  {
    reset()
    replay.visible=false;
    turn=3
  }
  if(mousePressedOver(restart))
  {
      reset();
  }
 
  fill("white")
  text("Banana collected: "+score, monkey.x-100,50);
  text("Timer: "+timer, monkey.x+100,50);
  text("Turn: "+turn, monkey.x+200,50);
}

function reset()
{
    gameState=1;
    ObstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    monkey.scale=0.1;
    gameOver.visible=false;
    restart.visible=false;
    score=0;
}
function spawnFood()
{
  if(frameCount%100===0)
  {
    banana = createSprite(monkey.x+100,random(monkey.y-100,monkey.y-200),20,20);
    banana.addImage("banana",bImage);
    banana.scale=0.1;
    //banana.velocityX=-6;
    banana.lifetime=50;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    foodGroup.add(banana);
  }
}
function spawnObstacle()
{
  if(frameCount%200===0)
  {
  
    stone = createSprite(monkey.x+200,height-50,20,20);
    stone.addImage("stone",sImage);
    stone.scale=0.3;
   // stone.velocityX=-6;
    stone.lifetime=50;
    ObstaclesGroup.add(stone);
  }
}