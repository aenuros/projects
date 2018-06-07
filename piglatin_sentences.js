//it chops up sentences now :)
/* bugs: a word consisting of a consonant and 'y' is interpreted as
having only consonants and is ignored. e.g. 'my'  also affects words like 'cs50'
can't handle punctuation
 forcibly turns everything to lowercase, doens't preserve case.
 goals: preserve case.
 goals: preserve punctuation (make it ignore punctuation?).
 goals: treat words with 'y' as the vowel as a vowel. this situation
  only applies to words that only have 'y' and a consonant, such as by,try,my.
  a check needs to be added to ensure that if a word is 'all consonants',
  that y be treated like a vowel to get 'ybay'.
*/

//NOTE: commented out console.logs are for debugging purposes only.

let consonant = ["b","c","d",
"f","g","h","j","k","l","m",
"n","p","q","r","s","t","v",
"w","x","y","z"];

let vowel = ["a","e","i","o","u"];

let sentence = prompt("Enter a sentence").toLowerCase();
console.log("You entered:\n \'" + sentence + "\'");
let wordArray = sentence.split(" ");

finalSentence = [];

for (i = 0; i < wordArray.length; i++) { 
  newWord = wordArray[i];
  endLetter ="";
  firstLetter = newWord.substring(0,newWord.length);
  /*console.log("You entered: \' " + firstLetter "\'");*/
  finalWord = newWord;
  

    for (j = 0; j <= newWord.length; j++) {
      /*console.log("\nLength:" + newWord.length);*/
      

      if (consonant.includes(firstLetter[j])) {
        
        endLetter += firstLetter[j];
        finalWord = finalWord.slice(1);
/*        console.log("\nj:" + j + "\ni:" + i);
      console.log("\nendLetter:" + endLetter + "\nfirstLetter:" + firstLetter + "\n" + "finalWord:" + finalWord); */
        }

      if(vowel.includes(firstLetter[j])) {
        finalSentence[i] = finalWord + endLetter + "ay";
              /* console.log("\nVowel condition. \nj:" + j + "\ni:" + i);
        console.log(i);
        console.log(finalWord + endLetter + "ay");
        console.log(finalSentence[i]); */
        break;
        }
      
    }
 } 

 console.log("Pig latin result:\n \'" + finalSentence.join(" ") + "\'");
