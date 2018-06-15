/*TO-DO notes
- the new inventory system does not play nice with smoothieRoll.
  need to write a function to check if inventory is empty and use that for
  displaying the inventory option at all and the smoothieroll.

- Add a second item: pepper. Pepper causes mama's status to change to "peppersprayed"
  so that she cannot attack for 2 turns. need to add an RNG, a use function, a 'status' variable for the enemy.

- Add a constructor for "enemy" so that there are enemies other than Big Mama. Add an
  RNG to determine which enemy appears.
*/

let readlineSync = require('readline-sync');
let rl = require('readline-sync');
/* https://www.npmjs.com/package/readline-sync */



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move(array,old_index,new_index) {
  array.splice(new_index,0,array.splice(old_index,1));
}

defaultHealth = 10;

let enemy = {
  name: "Big Mama",
  health: defaultHealth
}

let yourstatus = {
  name: "yourname",
  health: defaultHealth,
  inventory: 0, //number of smoothies you have
  arrayOfStuff: ["smoothie","smoothie",""],
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
  for (i=0;i<yourstatus.arrayMaxValues;i++) {
    if (yourstatus.arrayOfStuff[i] !== undefined) {
      console.log((i+1) + ". " + yourstatus.arrayOfStuff[i]);
    }
  }
}

function smoothieRoll() {
  smoothieDice = getRandom(1,2);
  if (smoothieDice === 2) {
    console.log(">>>You got a SMOOTHIE! If your health is low, a SMOOTHIE will heal you completely!");
    yourstatus.arrayOfStuff.push("smoothie");
    inventoryDisplay();
    //console.log(`Smoothies: ${yourstatus.inventory}. \n`);
  }
}

function smoothieUse() {
  //yourstatus.inventory--;
  //yourstatus.arrayOfStuff.pop();
  yourstatus.health = defaultHealth;
  console.log(`>>>You have used a smoothie and are at ${yourstatus.health} health.`);
}

function stuff() {
  console.log(`Items: (1) ${yourstatus.arrayOfStuff[0]},(2) ${yourstatus.arrayOfStuff[1]},(3) ${yourstatus.arrayOfStuff[2]} `);
}


function inventoryUse(array,choice,length) {
  realIndex = choice-1;
//  if(!array[realIndex]) {
//    console.log("Not an option.");
//    return;
//    }

  //console.log("You used "+ array[realIndex]);

    array[realIndex] = "";
    for(let i = realIndex;i<length;i++) {
      move(array,i+1,i);
      console.log(array[i+1]);
      }
}


while (battleState == 0) {

  if (spaces === winSpace) {
    console.log(`Congratulations, ${userName}! You've reached safety and escaped the clutches of Big Mama.`);
    break
  }

  let movement = rl.question("Do you want to move (f)oward?")

  if (movement==="f") {

    if (yourstatus.arrayOfStuff.length < yourstatus.arrayMaxValues) {
      smoothieRoll();
    }

    let dice = getRandom(1,5);
    if (dice<5) {
      spaces++;
      console.log(`You have moved forward! You've traveled ${spaces} spaces.`);
        /*if (yourstatus.inventory > 0) {
          console.log(`Number of smoothies: ${yourstatus.inventory}.`);
        }*/
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
          if (yourstatus.arrayOfStuff.length > 0) {
            let attack = rl.question("Do you (a)ttack or look at your (i)nventory?\n");
            if (attack === "a") {
              youAttack();
              turn++;
              }
            /*if (attack ==="s") {
              smoothieUse();
              turn++;
            }*/

            if (attack==="i") {
              inventoryDisplay();
            }

            if(!isNaN(attack)) {
              if (yourstatus.arrayOfStuff[attack-1] === undefined || yourstatus.arrayOfStuff[attack-1] === "" || yourstatus.arrayOfStuff[attack-1] === null) {
                console.log("Not a valid input.");
              }
              else {
                if(yourstatus.arrayOfStuff[attack-1] === "smoothie") {

                smoothieUse();
                inventoryUse(yourstatus.arrayOfStuff,attack,yourstatus.arrayMaxValues);
                turn++;
                }
              }
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
