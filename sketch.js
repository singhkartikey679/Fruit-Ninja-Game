//gamestate
var gameState = "start";
var fruit_cutting_sound, gameover_sound;

// variables in which the images will be loaded
var orange_img,banana_img,apple_img,pear_img,sword_img;
var bg1,bg2,gameover_img,play_button_img,restart_img;
var alien_img;

// main variables used in the game 
var alien1,alien2;
var sword,play_button,restart_button,score=0;
var orange,pear,banana,apple,orange2,pear2,banana2,apple2;

//creating edges
var topEdge,bottomEdge,leftEdge,rightEdge;

//loading image in the variables
function preload()
{
  orange_img = loadImage("fruit1.png");
  apple_img = loadImage("fruit2.png");
  pear_img = loadImage("fruit3.png");
  banana_img = loadImage("fruit4.png");
  bg1 = loadImage("FruitNinjaBg1.png");
  bg2 = loadImage("Fruit Ninja Bg2.png");
  sword_img = loadImage("FruitNinjaSword.png");
  play_button_img = loadImage("Play Button.png");
  alien_img = loadAnimation("alien1.png","alien2.png");
  restart_img = loadImage("Restart Button.png");
  
  fruit_cutting_sound = loadSound("Fruit Ninja Fruit Cutting Sound.mp3");
  gameover_sound = loadSound("Fruit Ninja Game Over sound.mp3");
}

//creating the main variables & adding their images
function setup()
{
  createCanvas(600,400);
  
  CreatingSprites();
  restart_button = createSprite(300,335,100,50);
  restart_button.addImage(restart_img);
  restart_button.scale = 0.4;
  restart_button.visible = false; 
  
  localStorage["HighestScore"] = 0;
  
  //creating edges which collide with sword
  topEdge = createSprite(310.5,1,621,1);
  topEdge.visible = false;
  bottomEdge = createSprite(310.5,664,621,1);
  bottomEdge.visible = false;
  leftEdge = createSprite(1,332.5,1,665);
  leftEdge.visible = false;
  rightEdge = createSprite(620,332.5,1,665);
  rightEdge.visible = false;
  
}  


function draw()
{ 
  if (gameState == "start")
  {
    //setting image as a background
    background(bg1);
    
    if(mousePressedOver(play_button))
    {
      gameState = "play";
    }
    
  } 
  
  
  if ( gameState == "play")
  {
    play_button.destroy();
    restart_button.visible = false;
    
    sword.visible = true;
    orange.visible = true;
    pear.visible = true;
    apple.visible = true;
    banana.visible = true;
    orange2.visible = true;
    pear2.visible = true;
    apple2.visible = true;
    banana2.visible = true;
    
    //setting image as a background
    background(bg2);

    //setting sword X & Y position with the position of mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;
  
    Enemy();
    Fruits_coming();
    Collide();
    
    orange2.collide(apple2);
    orange2.collide(pear2);
    orange2.collide(banana2);
    apple2.collide(pear2);
    apple2.collide(banana2);
    pear2.collide(banana2);
    
    orange.collide(apple);
    orange.collide(pear);
    orange.collide(banana);
    apple.collide(pear);
    apple.collide(banana);
    pear.collide(banana);
    
    if (enemyGroup.isTouching(sword))
    {
      gameState = "over"; 
      gameover_sound.play();
    }
    
    
  }
  
  if (gameState == "over")
  {
     
     orange.destroy();
     apple.destroy();
     pear.destroy();
     banana.destroy();
     orange2.destroy();
     apple2.destroy();
     pear2.destroy();
     banana2.destroy();
    
     enemyGroup.destroyEach();
     sword.destroy();
    
     background(bg2);
    
     Reset();
    //restart_button.debug = true;
  } 
  

  drawSprites();
  
  if (gameState == "play")
  {
    textSize(20);
    fill("LawnGreen");
    text ("Score : " + score,15,25);
  }  

  if (gameState == "over")
  {
    textSize(100);
    fill("Red");
    textFont("Algerian");
    text ("GAMEOVER",30,100)
    
    textSize(70);
    fill("DarkOrange");
    textFont("Algerian");
    text ("Your Score : " + score,20,200);
    text("High Score : " + localStorage["HighestScore"],35,280);

    
    
  }
  
}


function Collide()
{
  //sword collides with edges
  sword.collide(topEdge);
  sword.collide(bottomEdge);
  sword.collide(leftEdge);
  sword.collide(rightEdge);
  
  
  if (sword.isTouching(orange))
  {  
    fruit_cutting_sound.play();
    score += 1;
    orange.x = Math.round(random(650,1000));
    orange.y = Math.round(random(50,350));
  }
  
  if (sword.isTouching(apple))
  {
    fruit_cutting_sound.play();
    score += 1;
    apple.x = Math.round(random(650,1000));
    apple.y = Math.round(random(50,350));
  }
  
   if (sword.isTouching(pear))
   {
     fruit_cutting_sound.play();
     score += 1;
     pear.x = Math.round(random(650,1000));
     pear.y = Math.round(random(50,350));
   }
  
   if (sword.isTouching(banana))
   {
     fruit_cutting_sound.play();
     score += 1;
     banana.x = Math.round(random(650,1000));
     banana.y = Math.round(random(50,350));
   }
  
    
  if (sword.isTouching(orange2))
  {  
    fruit_cutting_sound.play();
    score += 1;
    orange2.x = Math.round(random(-1000,-50));
    orange2.y = Math.round(random(50,350));
  }
  
  if (sword.isTouching(apple2))
  {
    fruit_cutting_sound.play();
    score += 1;
    apple2.x = Math.round(random(-1000,-50));
    apple2.y = Math.round(random(50,350));
  }
  
   if (sword.isTouching(pear2))
   {
     fruit_cutting_sound.play();
     score += 1;
     pear2.x = Math.round(random(-1000,-50));
     pear2.y = Math.round(random(50,350));
   }
  
   if (sword.isTouching(banana2))
   {
     fruit_cutting_sound.play();
     score += 1;
     banana2.x = Math.round(random(-1000,-50));
     banana2.y = Math.round(random(50,350));
   }
  
  
   if(localStorage["HighestScore"]<score)
   {
    
     localStorage["HighestScore"] = score;
     
   }
  
}  

function Fruits_coming()
{
  orange.velocityX = -7;
  apple.velocityX = -7;
  pear.velocityX = -7;
  banana.velocityX = -7;
  
  orange2.velocityX = 7;
  apple2.velocityX = 7;
  pear2.velocityX = 7;
  banana2.velocityX = 7;
  
  if (orange.x < -10)
  {  
    orange.x = Math.round(random(650,1000));
    orange.y = Math.round(random(50,350));
  }
  
  if (apple.x < -10)
  {
    apple.x = Math.round(random(650,1000));
    apple.y = Math.round(random(50,350));
  }
  
   if (pear.x < -10)
   {
     pear.x = Math.round(random(650,1000));
     pear.y = Math.round(random(50,350));
   }
  
   if (banana.x < -10)
   {
     banana.x = Math.round(random(650,1000));
     banana.y = Math.round(random(50,350));
   }
  
   if (orange2.x > 650 )
  {  
    orange2.x = Math.round(random(-1000,-50));
    orange2.y = Math.round(random(50,350));
  }
  
  if (apple2.x > 650)
  {
    apple2.x = Math.round(random(-1000,-50));
    apple2.y = Math.round(random(50,350));
  }
  
   if (pear2.x > 650)
   {
     pear2.x = Math.round(random(-1000,-50));
     pear2.y = Math.round(random(50,350));
   }
  
   if (banana2.x > 650)
   {
     banana2.x = Math.round(random(-1000,-50));
     banana2.y = Math.round(random(50,350));
   }
  
   if (score >= 50)
   {
     alien1.velocityX = -15;
     alien2.velocityX = 15;
   } 
  
   if (score >= 100)
   {
     alien1.velocityX = -20;
     alien2.velocityX = 20;
   }
  
   if (score >= 150)
   {
     alien1.velocityX = -25;
     alien2.velocityX = 25;
   } 

   if (score >= 200)
   {
     alien1.velocityX = -30;
     alien2.velocityX = 30;
   } 

} 

function Enemy()
{
  if (World.frameCount%200 === 0)
  {  
    alien1 = createSprite(700,200,100,100);
    alien1.scale = 1.2;
    alien1.addAnimation("moving",alien_img);
    alien1.y = Math.round(random(50,350));
    alien1.velocityX = -10;
    alien1.setLifetime = 150;
    enemyGroup.add(alien1);
  }  
  
  if (World.frameCount%300 === 0)
  {
    alien2 = createSprite(-100,200,100,100);
    alien2.scale = 1.2;
    alien2.addAnimation("moving",alien_img);
    alien2.y = Math.round(random(50,350));
    alien2.velocityX = 10;
    alien2.setLifetime = 150;
    enemyGroup.add(alien2);
  }
}

//Creating Fruits and Enemy Group and Sword
function CreatingSprites()
{
  enemyGroup = new Group();
  
  orange = createSprite(750,125,20,20);
  orange.scale = 0.3;
  orange.addImage(orange_img);
  orange.x = Math.round(random(650,1000));
  orange.y = Math.round(random(50,350));
  orange.visible = false;

  apple = createSprite(1000,200,20,20);
  apple.scale = 0.3;
  apple.addImage(apple_img);
  apple.x = Math.round(random(650,1000));
  apple.y = Math.round(random(50,350));
  apple.visible = false;

  pear = createSprite(900,275,20,20);
  pear.scale = 0.27;
  pear.addImage(pear_img);
  pear.x = Math.round(random(650,1000));
  pear.y = Math.round(random(50,350));
  pear.visible = false;

  banana = createSprite(850,350,20,20);
  banana.scale = 0.2;
  banana.addImage(banana_img);
  banana.setCollider("rectangle",-50,0,300,300);
  banana.x = Math.round(random(650,1000));
  banana.y = Math.round(random(50,350));
  banana.visible = false;

  
  orange2 = createSprite(-150,125,20,20);
  orange2.scale = 0.3;
  orange2.addImage(orange_img);
  orange2.x = Math.round(random(-1000,-50));
  orange2.y = Math.round(random(50,350));
  orange2.visible = false;
  
  apple2 = createSprite(-200,200,20,20);
  apple2.scale = 0.3;
  apple2.addImage(apple_img);
  apple2.x = Math.round(random(-1000,-50));
  apple2.y = Math.round(random(50,350)); 
  apple2.visible = false;

  pear2 = createSprite(-350,275,20,20);
  pear2.scale = 0.27;
  pear2.addImage(pear_img);
  pear2.x = Math.round(random(-1000,-50));
  pear2.y = Math.round(random(50,350));  
  pear2.visible = false;

  banana2 = createSprite(-300,250,20,20);
  banana2.scale = 0.18;
  banana2.addImage(banana_img);
  banana2.setCollider("rectangle",-50,0,300,300);
  banana2.x = Math.round(random(-1000,-50));
  banana2.y = Math.round(random(50,350));
  banana2.visible = false;
  
  sword = createSprite(200,200,20,20);
  sword.scale = 0.45;
  sword.addImage(sword_img);
  sword.setCollider("rectangle",-35,-65,125,170);
  sword.visible = false;
  
  play_button = createSprite(300,350,100,50);
  play_button.addImage(play_button_img);
  play_button.scale = 0.5;

}

function Reset()
{
  restart_button.visible = true;
  if (mousePressedOver(restart_button))
  {  
    gameState = "play";
    score = 0;
    CreatingSprites();
    restart_button.visible = false;
  }  
} 
