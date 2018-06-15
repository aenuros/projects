let readlineSync = require('readline-sync');
let rl = require('readline-sync');
/* https://www.npmjs.com/package/readline-sync */



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

defaultHealth = 10;

let enemy = {
  name: "Big Mama",
  health: defaultHealth
}

let yourstatus = {
  name: "yourname",
  health: defaultHealth,
  inventory: 0 //number of smoothies you have
}

let battleState = 0;
let spaces = 0;
//number of spaces needed to win.
winSpace = 10;
/* the "moving forward" situation. if battleState becomes 1, run the enemy battle state.*/

/*function greeting() {*/
  console.log(`Welcome to BIG MAMA!\n
    The goal is to move forward through ${winSpace} spaces.\n
    Every time you move forward, there is a chance you can get a smoothie!\n
    But you may also run into Big Mama. If you do, you have to fight! Use your smoothie to heal!
    \n Good luck! `)
  let userName = rl.question("What is your name?\n")
  console.log(`Welcome, ${userName}! I'm wishing you the best of luck against BIG MAMA.`)
// }

//greeting();

function smoothieRoll() {
  smoothieDice = getRandom(1,2);
  if (smoothieDice === 2) {
    console.log(">>>You got a SMOOTHIE! If your health is low, a SMOOTHIE will heal you completely!");
    yourstatus.inventory++;
    //console.log(`Smoothies: ${yourstatus.inventory}. \n`);
  }
}

function smoothieUse() {
  yourstatus.inventory--;
  yourstatus.health = defaultHealth;
  console.log(`>>>You have used a smoothie and are at ${yourstatus.health} health.`);
}

while (battleState == 0) {

  if (spaces === winSpace) {
    console.log(`Congratulations, ${userName}! You've reached safety and escaped the clutches of Big Mama.`);
    break
  }

  let movement = rl.question("Do you want to move (f)oward?")

  if (movement==="f") {

    smoothieRoll();

    let dice = getRandom(1,5);
    if (dice<5) {
      spaces++;
      console.log(`You have moved forward! You've traveled ${spaces} spaces.`);
        if (yourstatus.inventory > 0) {
          console.log(`Number of smoothies: ${yourstatus.inventory}.`);
        }
    }
    else if(dice===5) {
      enemyAppeared();
      if (yourstatus.health <= 0) {
        console.log("It's game over for you.");
        break;
      }
    }
    else {
      console.log("This is an error. Please report this to aenuros!");
    }
  }
  else {
    console.log("I don't recognize that command. Let's try again.")
  }
}



function enemyAppeared() {

  function youAttack() {
    let attack = getRandom(1,5);
    enemy.health = enemy.health - attack;
    console.log("\n>>>You've inflicted " + attack + " damage.");
    }


  enemy.health = defaultHealth;

    while (enemy.health > 0 || yourstatus.health > 0) {
      console.log(`\nYou've come across ${enemy.name}. She has ${enemy.health} health.`);

    //a turn of 0 means you can attack. a turn of 1 means Mama attacks.

      let turn = 0;

        if (turn === 0) {
          if (yourstatus.inventory > 0) {
            let attack = rl.question("Do you (a)ttack or use a (s)moothie?\n");
            if (attack === "a") {
              youAttack();
              turn++;
              }
            if (attack ==="s") {
              smoothieUse();
              turn++;
            }
          }

          else {
            let attack = rl.question("Do you (a)ttack?\n");
            youAttack();
            turn++;
            }
        }


        if (turn === 1) {
          let attack = getRandom(1,3);
          yourstatus.health = yourstatus.health - attack;
          console.log(`\n>>>>Mama has inflicted ${attack} damage on you.`);
          console.log(`You have ${yourstatus.health} health.`)
          turn--;
          }

          if (yourstatus.health <= 0) {

            break;
            }

          if (enemy.health <= 0) {
            console.log("You win!");
            break;
            battleState=0;
          }
        }

}
