//work in progress pig-latin. currently has issue with 3-consonant clusters.
//in future you will be able to enter an entire sentence, have this chop it up, and spit each word out in pig latin.

let consonant = ["b","c","d",
"f","g","h","j","k","l","m",
"n","p","q","r","s","t","v",
"w","x","y","z"];

let vowel = ["a","e","i","o","u"];

var word = prompt("Enter a word.");


firstLetter = word.substring(0,word.length);

endLetter = "";

console.log(firstLetter);

for (i = 0; i < word.length; i++) {
  if (consonant.includes(firstLetter[i])) {
    word = word.substring(1);
    endLetter += firstLetter[i];
    console.log("The state of the word:" + word);
    console.log("The consonant removed:" + firstLetter[i]);
    console.log("The consonant at the end:" + endLetter);
  }

  if(vowel.includes(firstLetter[i])) {
    break;
  }

}

console.log(word + endLetter + "ay");
