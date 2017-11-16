//global variables
var player = {statPoints: 20, att: 10, def: 13, hp: 30, luck: 5, speed:10};
var playerName = prompt("Enter A Name", "Player");
var exclamation;
var startTurn;
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
var turnAnnounced = false;
// Enemy(name, att, def, hp, luck, speed)

function setup(){
  createCanvas(windowWidth, windowHeight);
  enemy[0] = new Enemy("enemy1", 7, 20, 40, 10, 600, "pictures/villager.png");
  enemy[1] = new Enemy("enemy2", 9, 25, 45, 12, 500, "pictures/clipart.jpg");
  enemy[2] = new Enemy("enemy3", 12, 30, 50, 14, 300, "pictures/weeb.jpeg");
  enemy[3] = new Enemy("enemy4", 15, 35, 55, 15, 250, "pictures/waluigi.png");
  enemy[4] = new Enemy("enemy4", 20, 50, 65, 17, 190, "pictures/guile.png");
  for (i = 0; i < enemy.length; i++){
    enemy[i].sprite.hide();
  }

  raiseStat("Attack", player.att, 1);
  raiseStat("Defence", player.def, 4);
  raiseStat("HP", player.hp, 2);
  // raiseAttack();
  // console.log("Attack = "+player.att);
  // raiseDefence();
  // console.log("Defence = "+player.def);
  // raiseHP();
  maxPlayerHP = player.hp;
  // console.log("HP = "+player.hp);
  // // raiseLuck();
  // // console.log("Luck = "+player.luck);
  // raiseSpeed();
  // console.log("Speed = "+player.speed);

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
//   // exclamation = loadImage("capture.PNG");
//   if (!loadImage("pictures/capture.PNG")){
//     console.log("Error");
//   }
//   else {
//     console.log("OK");
//   }
//   if (!loadImage("pictures/slash.png")){
//     console.log("Error");
//   }
//   else {
//     console.log("OK");
//   }
//   if (!loadImage("pictures/red.png")){
//     console.log("Error");
//   }
//   else {
//     console.log("OK");
//   }

  soundFormats("mp3", "wav");
  slashSound = loadSound("sounds/slash.wav");
  enemyHitSound[0] = loadSound("sounds/villagernoise.mp3");
  enemyHitSound[1] = loadSound("sounds/Roblox Death Sound Effect.mp3");
  enemyHitSound[2] = loadSound("sounds/Omae wa.mp3");
  enemyHitSound[3] = loadSound("sounds/wah.mp3");
  enemyHitSound[4] = loadSound("sounds/Sonic Boom.mp3");
}
//constructor
function Enemy(name, att, def, hp, luck, speed, spriteFile, songFile){
  this._name = name;
  this.att = att;
  this.def = def;
  this.hp = hp;
  this.maxHP = hp;
  this.luck = luck;
  this.speed = speed;
  this.sprite = createImg(spriteFile);
  this.sprite.position(686-this.sprite.width, 255-this.sprite.height);
  this.turnAnnounce = function(){
    if (turnAnnounce == false);
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
    //enemyHitSound[enemyNumber].play();
    console.log(playerName +"'s hp = " + player.hp);
    if (this.hp > 0 && player.hp > 0){
      restartTurn();
    }
    else if(player.hp <= 0){
      gameOver();
    }
    else if (this.hp <= 0){
      background(255);
      console.log(playerName +" defeated " + enemy[enemyNumber]._name);
      enemy[enemyNumber].sprite.hide();
      enemyNumber++;

      player.statpoints+=5;
      raiseAttack();
      console.log("Attack = "+player.att);
      raiseDefence();
      console.log("Defence = "+player.def);
      raiseHP();
      maxPlayerHP = player.hp;
      console.log("HP = "+player.hp);
      raiseSpeed();
      console.log("Speed = "+player.speed);

      restartTurn();
    }
  }.bind(this)
}

function turnPrep(i){
  enemy[i].sprite.show();
  enemy[i].turnAnnounce();
  whatTime = "Miss";
  if (enemy[enemyNumber].hp > 0 && player.hp > 0){
    turn = setTimeout(enemy[enemyNumber].attackTurn, floor(random(4500))+2400);
  }
  //Game Over
  // else if(player.hp <= 0 || strikes == 3){
  //   background(0);
  //   playerHealthBar.hide();
  //   enemyHealthBar.hide();
  //   enemy[enemyNumber].sprite.hide();
  //   slash.hide();
  //   text("Game Over", windowWidth/2, windowHeight/2);
  //   gameOver = true;
  // }
  // //
  // else if (enemy[enemyNumber].hp <= 0){
  //   background(255);
  //   console.log(playerName +" defeated " + enemy[enemyNumber]._name);
  //   enemy[enemyNumber].sprite.hide();
  //   enemyNumber++;
  //   strikes = 0;
  //
  //   player.statpoints+=5;
  //   raiseAttack();
  //   console.log("Attack = "+player.att);
  //   raiseDefence();
  //   console.log("Defence = "+player.def);
  //   raiseHP();
  //   maxPlayerHP = player.hp;
  //   console.log("HP = "+player.hp);
  //   raiseSpeed();
  //   console.log("Speed = "+player.speed);
  //
  //   setTimeout(turnPrep, 1000, enemyNumber);
  // }
  else{
    console.log("something happened");
  }
}

function keyPressed(){
  slash = createImg("pictures/slash.png");
  slash.size(215, 175);
  slash.position(width/2-100, 173);
  slash.show();
  setTimeout(function(){slash.hide()}, 100);
  if (whatTime == "Miss"){
    setTimeout(function(){slash.hide()}, 100);
    clearTimeout(turn);
    console.log("strikes = "+strikes);
    strikes++;
    if(strikes == 3){
      gameOver();
    }
    else{
      restartTurn();
    }
  }
  else if (whatTime == "hit"){
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
      console.log(playerName +" defeated " + enemy[enemyNumber]._name);
      enemy[enemyNumber].sprite.hide();
      enemyNumber++;
      strikes = 0;

      player.statpoints+=5;
      raiseStat("Attack", player.att, 1);
      raiseStat("Defence", player.def, 4);
      raiseStat("HP", player.hp, 2);
      // console.log("Attack = "+player.att);
      // raiseDefence();
      // console.log("Defence = "+player.def);
      // raiseHP();
      if (player.hp>maxPlayerHP){
        maxPlayerHP = player.hp;
      }
      // console.log("HP = "+player.hp);
      // raiseSpeed();
      // console.log("Speed = "+player.speed);
      turnAnnounced = false;
      restartTurn();
    }
    whatTime = "Miss";
  }
}

function restartTurn(){
  setTimeout(turnPrep, 1000, enemyNumber);
}

function gameOver(){
  gameOver = true;
  playerHealthBar.hide();
  enemyHealthBar.hide();
  enemy[enemyNumber].sprite.hide();
  slash.hide();
  background(0);
  text("Game Over", windowWidth/2, windowHeight/2);
  end();
}

//Stat Distribution

// function raiseAttack(){
//   able = false;
//   while(able === false) {
//     var add= Number(prompt("How Many Points Do You Want To Add To Attack?  Current Attack = "+player.att, player.statPoints));
//     if (add<=player.statPoints){
//       able = true;
//     }
//   }
//   player.statPoints -= add;
//   player.att += add;
// }
function raiseStat(name, stat, multiplier){
  able = false;
  while(able === false) {
    var add= Number(prompt("How Many Points Do You Want To Add To "+ name +"  Current Defence = "+stat, player.statPoints));
    if (add<=player.statPoints){
      able = true;
    }
  }
  player.statPoints -= add;
  player.def += add*multiplier;
}
// function raiseHP(){
//   able = false;
//   while(able === false) {
//     var add= Number(prompt("How Many Points Do You Want To Add To Max HP?  Current HP = "+player.hp, player.statPoints));
//     if (add<=player.statPoints){
//       able =   true;
//     }
//   }
//   player.statPoints -= add;
//   player.att += add*2;
// }
// function raiseLuck(){
//   able = false;
//   while(able === false) {
//     var add= Number(prompt("How Many Points Do You Want To Add To Luck?  Current Attack = "+player.luck, player.statPoints));
//     if (add<=player.statPoints){
//       able = true;
//     }
//   }
//   player.statPoints -= add;
//   player.luck += add;
// }
// function raiseSpeed(){
//   able = false;
//   while(able === false) {
//     var add= Number(prompt("How Many Points Do You Want To Add To Speed?  Current Attack = "+player.speed, player.statPoints));
//     if (add<=player.statPoints){
//       able = true;
//     }
//   }
//   player.statPoints -= add;
//   player.speed += add;
// }

//TODO write console game intro

function draw(){
  healthBar();
}
function healthBar(){
  if (!gameOver){
    fill(255);
    rect(99, 49, 401, 51);
    rect(width-501, 49, 401, 51);
  }
  playerHealthBar.size(player.hp/maxPlayerHP*400, 50);
  enemyHealthBar.size(enemy[enemyNumber].hp/enemy[enemyNumber].maxHP*400, 50);
}
