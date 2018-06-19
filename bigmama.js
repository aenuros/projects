/*TO-DO notes
- the new inventory system does not play nice with smoothieRoll.
  need to write a function to check if inventory is empty and use that for
  displaying the inventory option at all and the smoothieroll. COMPLETED  19JUN

- Add a second item: pepper. Pepper causes mama's status to change to "peppersprayed"
  so that she cannot attack for 3 turns. need to add an RNG, a use function, a 'status' variable for the enemy.COMPLETED  19JUN

- Add a constructor for "enemy" so that there are enemies other than Big Mama. Add an
  RNG to determine which enemy appears.
*/

let readlineSync = require('readline-sync');
let rl = require('readline-sync');
/* https://www.npmjs.com/package/readline-sync */


function isFull(array) {
  if (yourstatus.inventory.length === yourstatus.arrayMaxValues) {
    return true;
  }
  return false;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move(array,old_index,new_index) {
  array.splice(new_index,0,array.splice(old_index,1));
}

function lengthCheck() {
  if (inventory.length > 3)  {
  inventory.length = 3;
  }
}

defaultHealth = 10;

let enemy = {
  name: "Big Mama",
  health: defaultHealth,
  status:0
}

let yourstatus = {
  name: "yourname",
  health: defaultHealth,
  inventory: [],
  arrayMaxValues: 3
}

let battleState = 0;
let spaces = 0;
//number of spaces needed to win.
winSpace = 99;
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

function inventoryDisplay() {
  for(i=0;i<3;i++) {
    let counter = i+1;
    if(typeof(yourstatus.inventory[i])== 'undefined') {
      console.log(`${counter}. `);
    }
    else {
    console.log(`${counter}. ${yourstatus.inventory[i]}`);
    }
  }
}


function itemRoll() {
  dice = getRandom(1,4);
  //smoothie condition
  if(dice < 3) {
    console.log(">>>You got a SMOOTHIE! If your health is low, a SMOOTHIE will heal you completely!");
    yourstatus.inventory.push("smoothie");
    inventoryDisplay();
  }
  if(dice > 2) {
    console.log(">>>You got PEPPERSPRAY! Use PEPPERSPRAY to disable Mama for two turns!")
    yourstatus.inventory.push("pepperspray");
    inventoryDisplay();
  }
}

function smoothieUse() {
  yourstatus.health = defaultHealth;
  console.log(`>>>You have used a smoothie and are at ${yourstatus.health} health.`);
}

function peppersprayUse() {
  enemy.status=3;
  console.log(`>>>You used a pepper spray on Big Mama. She is currently unable to attack!`);
}


function inventoryUse(option,thearray) {
  let realIndex = option-1;
  thearray.splice(realIndex,1);
}


while (battleState == 0) {

  if (spaces === winSpace) {
    console.log(`Congratulations, ${userName}! You've reached safety and escaped the clutches of Big Mama.`);
    break
  }

  let movement = rl.question("Do you want to move (f)orward?")

  if (movement==="f") {

    if (isFull(yourstatus.inventory) === false) {
      itemRoll();
    }

    let dice = getRandom(1,15);
    if (dice!=5) {
      spaces++;
      console.log(`You have moved forward! You've traveled ${spaces} spaces.`);

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
    console.log("I don't recognize that command. Let's try again.");
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
        //if (yourstatus.inventory.length > 0) {
          let attack = rl.question("Do you (a)ttack or look at your (i)nventory?\n");
          if (attack === "a") {
              youAttack();
              turn++;
              }

            if (attack==="i") {
              inventoryDisplay();
            }

            if(!isNaN(attack)) {
              if (yourstatus.inventory[attack-1] === undefined || yourstatus.inventory[attack-1] === "" || yourstatus.inventory[attack-1] === null) {
                console.log("Not a valid input.");
              }
              else {
                switch(yourstatus.inventory[attack-1]) {
                  case "smoothie":
                    smoothieUse();
                    inventoryUse(attack,yourstatus.inventory);
                    turn++;
                    break;
                  case "pepperspray":
                    peppersprayUse();
                    inventoryUse(attack,yourstatus.inventory);
                    turn++;
                    break;
              }
            }

          }
        }


        if (turn === 1) {

          if (yourstatus.health <= 0) {
              break;
              }

            if (enemy.health <= 0) {
              console.log("You win!");
              break;
              battleState=0;
            }

          if(enemy.status==0){
            let attack = getRandom(1,3);
            yourstatus.health = yourstatus.health - attack;
            console.log(`\n>>>>Mama has inflicted ${attack} damage on you.`);
            console.log(`You have ${yourstatus.health} health.`)
            turn--;
            }

          else {
            console.log(`Big Mama can't attack for ${enemy.status} turn(s).`);
            enemy.status--;
            }

          }

        }

      }
