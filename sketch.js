//global variables
var player = {name: "Player", statPoints: 20, att: 15, def: 13, hp: 30, speed:10};
var exclamation;
var turn;
var slashSound;
var slash;
var timer;
var gameOver = false;
var keyPress = 0;
var keyPress1 = 0;
var keyPress2 = 0;
var keyPress3 = 0;
var whatTime = 3;
var strikes = 0;
var maxPlayerHP;
var enemyNumber = 0;
var enemy =[];
var enemyHitSound = [];
var playerHealthBar;
var enemyHealthBar;
var newTurn;
var turnAnnounced = false;

// Enemy(name, att, def, hp, luck, speed, filename)
function setup(){
  createCanvas(windowWidth, windowHeight);
  enemy[0] = new Enemy("A mob of angry villagers", 7, 20, 20, 600, "pictures/angryvillagers.jpg");
  enemy[1] = new Enemy("An average badguy", 9, 30, 22, 500, "pictures/clipart.jpg");
  enemy[2] = new Enemy("Waluigi", 12, 40, 24, 300, "pictures/waluigi.png");
  enemy[3] = new Enemy("A real ninja", 15, 50, 26, 250, "pictures/weeb.jpeg");
  enemy[4] = new Enemy("Guile", 20, 50, 50, 190, "pictures/guile.png");
  for (i = 0; i < enemy.length; i++){
    enemy[i].sprite.hide();
  }
  player.name = prompt("Enter A Name", "Player");
  raiseStat("Attack", player.att, 1);
  raiseStat("Defence", player.def, 4);
  raiseStat("HP", player.hp, 2);
  maxPlayerHP = player.hp;

  playerHealthBar = createImg("pictures/red.png");
  playerHealthBar.position(108, 58);
  playerHealthBar.size(400, 50);
  enemyHealthBar = createImg("pictures/red.png");
  enemyHealthBar.position(width-492, 58);
  enemyHealthBar.size(400, 50);

  enemyNumber = 0;
  turnPrep(0);
}

 function preload(){
  //loading soundeffects
  soundFormats("mp3", "wav");
  slashSound = loadSound("sounds/slash.wav");
  enemyHitSound[0] = loadSound("sounds/villagernoise.mp3");
  enemyHitSound[1] = loadSound("sounds/Roblox Death Sound Effect.mp3");
  enemyHitSound[2] = loadSound("sounds/wah.mp3");
  enemyHitSound[3] = loadSound("sounds/Omae wa.mp3");
  enemyHitSound[4] = loadSound("sounds/Sonic Boom.mp3");
}
//obect constructor for enemies
function Enemy(name, att, def, hp, speed, spriteFile, songFile){
  this._name = name;
  this.att = att;
  this.def = def;
  this.hp = hp;
  this.maxHP = hp;
  this.speed = speed;
  this.sprite = createImg(spriteFile);
  this.sprite.size(500, 475)
  this.sprite.position(windowWidth/2-this.sprite.width/2, windowHeight/2-this.sprite.height/2+30);
  this.turnAnnounce = function(){
    if (turnAnnounced == false);
    text(this._name+" Has appeared", 100, 100, 100, 100);
    turnAnnounced = true;
  }.bind(this)

  //Period in which if you press a key it will count as a hit
  this.attackTurn = function(){
    exclamation = createImg("pictures/capture.PNG");
    exclamation.position(width/2-100, 25);
    exclamation.show();
    enemyHitSound[enemyNumber].play();
    setTimeout(function(){exclamation.hide()}, this.speed);
    whatTime = "hit";
    timer = setTimeout(this.timer, this.speed);
  }.bind(this)

  //Period in which a keypress will be considered late
  this.timer = function(){
    whatTime = "late";
    player.hp-=this.att - (this.att*player.def/100);
    console.log(player.name +"'s hp = " + player.hp);
    if (this.hp > 0 && player.hp > 0){
      restartTurn();
    }
    else if(player.hp <= 0){
      gameOverInitiate();
    }
  }.bind(this)
}

//will call the attackTurn method within a partially random amount of time
function turnPrep(i){
  if (gameOver == false) {
    enemy[i].sprite.show();
    enemy[i].turnAnnounce();
    whatTime = "Miss";
    if (enemy[enemyNumber].hp > 0 && player.hp > 0){
      turn = setTimeout(enemy[enemyNumber].attackTurn, floor(random(5000))+1700);
    }
  }
}

//is called if you press a key
function keyPressed(){
  slash = createImg("pictures/slash.png");
  slash.size(215, 175);
  slash.position(width/2-100, 173);
  slash.show();
  setTimeout(function(){slash.hide()}, 100);
  if (whatTime == "Miss"){
    miss();
  }
  else if (whatTime == "hit"){
    hit();
  }
}

//is called if you hit a key early
function miss(){
  clearTimeout(turn);
  clearTimeout(timer);
  console.log("strikes = "+strikes);
  strikes++;
  if(strikes == 3){
    gameOverInitiate();
  }
  else{
    restartTurn();
  }
}

//is called if you hit a key at the correct time
function hit(){
  clearTimeout(timer);
  slashSound.play();
  exclamation.hide();
  enemy[enemyNumber].hp -= player.att - (player.att*enemy[enemyNumber].def/100);
  console.log(enemy[enemyNumber]._name+"'s hp = " + enemy[enemyNumber].hp);

  if (enemy[enemyNumber].hp > 0 && player.hp > 0){
    restartTurn();
  }

  else if (enemy[enemyNumber].hp <= 0){
    background(255);
    console.log(player.name +" defeated " + enemy[enemyNumber]._name);
    enemy[enemyNumber].sprite.hide();
    enemyNumber++;
    strikes = 0;
    var expectedInput = false;
    while (expectedInput == false){
      player.statPoints = 5;
      buffChoice = prompt("Do you want to raise attack(a) or health(h)?", "a")
      if (buffChoice == "h"){
        player.hp+=6;
        expectedInput = true;
      }
      else if (buffChoice == "a"){
        player.att+=4;
        expectedInput = true;
      }
    }
    if (player.hp>maxPlayerHP){
      maxPlayerHP = player.hp;
    }
    turnAnnounced = false;
    restartTurn();
  }
  whatTime = "Miss";
}

function buffStats(){

}
//will wait one second then call the turnPrep function
function restartTurn(){
  newTurn = setTimeout(turnPrep, 1000, enemyNumber);
}

//Stat Distribution

function raiseStat(name, stat, multiplier){
  able = false;
  while(able === false) {
    var add= Number(prompt("How Many Points Do You Want To Add To "+ name +"  Current "+ name  +" = "+stat, "points left = "player.statPoints));
    if (add<=player.statPoints){
      able = true;
    }
  }
  player.statPoints -= add;
  player.def += add*multiplier;
}

//TODO write console game intro

function draw(){
  if (!gameOver){
    healthBar();
    strikeDraw();
  }
}

function gameOverInitiate(){
  gameOver = true;
  clearTimeout(newTurn);
  clearTimeout(turn);
  clearTimeout(timer);
  playerHealthBar.hide();
  enemyHealthBar.hide();
  enemy[enemyNumber].sprite.hide();
  slash.hide();
  background(0);
  text("Game Over", windowWidth/2, windowHeight/2);
  if (gameOver == true){
    throw new Error();
  }
}

function strikeDraw(){
  if (strikes>=1){
    fill(255, 0, 0)
    ellipse(50, 50, 40)
  }
  if (strikes>=2){
    fill(255, 0, 0)
    ellipse(50, 100, 40)
  }
  if (strikes>=3){
    fill(255, 0, 0)
    ellipse(50, 150, 40)
  }
}
function healthBar(){
    fill(255);
    rect(99, 49, 401, 51);
    rect(width-501, 49, 401, 51);
    playerHealthBar.size(player.hp/maxPlayerHP*400, 50);
    enemyHealthBar.size(enemy[enemyNumber].hp/enemy[enemyNumber].maxHP*400, 50);
}
