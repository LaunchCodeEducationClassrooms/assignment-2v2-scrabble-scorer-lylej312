// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let initialPromptAnswer;

function initialPrompt() {
  console.log('Let\'s play some Scrabble!\n');
  initialPromptAnswer = input.question("Enter a word to score: ");
  if (!isNaN(initialPromptAnswer)) {
    initialPromptAnswer = input.question('You must enter a word: ');
  }
  return initialPromptAnswer;
};

let simpleScore = 0;

function simpleScorer(word) {
  for (let i = 0; i < word.length; i++) {
    simpleScore += 1;
  }
  return simpleScore;
}

let isVowel = function(char) {
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  if (vowels.indexOf(char) !== -1) {
    return true;
  } else {
    return false;
  }
}

let vowelBonusScore = 0;

function vowelBonusScorer(word) {
  let letterArr = word.toLowerCase().split('');
  for (let i = 0; i < letterArr.length; i++) { 
    if (isVowel(letterArr[i])) {
      vowelBonusScore += 3; 
    } else {
      vowelBonusScore += 1;
    }
  } return vowelBonusScore;
}

let scrabbleScore = function(word) {
  let letterArr = word.toLowerCase().split('');
  let score = 0;
  for (let value in newPointStructure) {
    for (let i = 0; i < letterArr.length; i++) {
      if (value.indexOf(letterArr[i]) !== -1) {
        score += Number(newPointStructure[value]);
      } 
    }
  }  
  return score;
}

const scoringAlgorithms = [
   {
     name: 'Simple Score',
     description: 'Each letter is worth 1 point',
     scorerFunction: simpleScorer
   },
   {
     name: 'Bonus Vowels',
     description: 'Vowels are 3 pts, consonants are 1 pt.',
     scorerFunction: vowelBonusScorer
   },
   {
     name: 'Scrabble',
     description: 'The traditional scoring algorithm.',
     scorerFunction: scrabbleScore
   }
];

function scorerPrompt(initialPromptAnswer) {
  console.log('Choose a scoring function: \n');
  console.log('0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2:');
  let scorerPromptInput = Number(input.question('Enter number: '));

  if (!Number.isInteger(scorerPromptInput) || scorerPromptInput < 0 || scorerPromptInput > 2) {
    scorerPromptInput = input.question('You must enter a number 0-2: ');
  }
  let score;
  if (scorerPromptInput == 0) {
    score = scoringAlgorithms[0].scorerFunction(initialPromptAnswer);
  } else if (scorerPromptInput == 1) {
    score = scoringAlgorithms[1].scorerFunction(initialPromptAnswer);
  } else if (scorerPromptInput == 2) {
    score = scoringAlgorithms[2].scorerFunction(initialPromptAnswer);
  } console.log(`Score for '${initialPromptAnswer}': ${score}`);
} 


function transform(oldPointStructure) {
  let newStructure = {};
  for (let value in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[value].length; i++) {
      newStructure[(oldPointStructure[value][i]).toLowerCase()] = value;
    } 
  } newStructure[' '] = '0';
  return newStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt(initialPromptAnswer);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

