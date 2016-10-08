// list of prompts
// var promptList= [
//   "Write a sentence without the letter 'K'",
//   "Use the word 'potato' in your sentence",
//   "Write a sentence exactly 6 syllables long",
//   "Write a sentence which contains both an adjective and a verb",
//   "sentence without the letter 'K'",
//   "word 'potato' in your sentence",
//   "sentence exactly 6 syllables long",
//   "sentence which contains both an adjective and a verb"
// ]



// Returns a random integer between min (inclusive) and max (inclusive)
// Credit to Ionut G. Stan on Stack Overflow http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar(string) {
	var min = 0;
	var max = string.length;
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return string.charAt(rand);
}

function getRandomObject(object) {
	var min = 0;
	var max = object.length;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    return object[rand];
}

// Prompt resources
const promptTools= {
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	vowels: "AEIOU",
	nouns: nounList,
	adjectives: adjectiveList,
	words: wordList,
	syllableRange: [3,7]
}

function getPrompts(numberOfPrompts){
	var selectedPrompts = [];
	for (i=0;i<numberOfPrompts;i++){
		// return prompt + parameters + index
		var randomNumber = getRandomInt(0,8);
		var param;
		var prompt;
		var searchIndex;
		switch (randomNumber) {
		// create cases
			// expression - exclude certain letter
		    case 0:
		    	param = [getRandomChar(promptTools.alphabet)];
		        prompt = "Exclude the letter '" + param[0] + "' in your sentence.";
		        searchIndex = "exclLetter";
		        break; 
		    // vowels -----------------------------------------------------------------------------
		    // univocal - only one vowel letter
		    case 1:
		    	param = [getRandomChar(promptTools.vowels)];
		        prompt = "Use no other vowel than '" + param[0] + "' in your sentence.";
		        searchIndex = "exclVowel";
		        break; 
		    // include certain words  ------------------------------------------------------
		    // two words
		    case 2:
		    	param = [getRandomObject(promptTools.adjectives),getRandomObject(promptTools.nouns)];
		        prompt = "Include the words '" + param[0] + "' and '" + param[1] + "' in your sentence.";
		        searchIndex = "inclAdjectiveNoun";
		        break; 
		    // one word
		    case 3:
		    	param = [getRandomObject(promptTools.words)];
		        prompt = "Include the word '" + param[0] + "' in your sentence.";
		        searchIndex = "inclWord";
		        break; 
		    // noun
		    case 4:
		    	param = [getRandomObject(promptTools.nouns)];
		        prompt = "Include the word '" + param[0] + "' in your sentence.";
		        searchIndex = "inclNoun";
		        break; 
		    // adjective
		    case 5:
		    	param = [getRandomObject(promptTools.adjectives)];
		        prompt = "Include the word '" + param[0] + "' in your sentence.";
		        searchIndex = "inclAdjective";
		        break; 
		    // syllables ------------------------------------------------------
			//  exact number of syllables
		    case 6:
		    	param = [getRandomInt(promptTools.syllableRange[0],promptTools.syllableRange[1])]
		        prompt = "Write a sentence exactly " + param[0] + " syllables long."
		        searchIndex = "exactlySyllable";
		        break; 
		    // more than number of syllables
		    case 7:
		    	param = [promptTools.syllableRange[0]]
		        prompt = "Write a sentence more than " + param[0] + " syllables long."
		        searchIndex = "morethanSyllable";
		        break; 
		    // less than number of syllables
		    case 8:
		    	param = [getRandomInt(promptTools.syllableRange[0]+1,promptTools.syllableRange[1])]
		        prompt = "Write a sentence less than " + param[0] + " syllables long."
		        searchIndex = "lessthanSyllable";
		        break; 
		}
		var entry = {
			prompt: prompt,
			searchIndex: searchIndex,
			param: param
		}
		selectedPrompts.push(entry);
	}
	return selectedPrompts;
}


var returnedPrompts = getPrompts(initWrite.prompts);
// generate random integers



// Math.random()

// switch(expression) {
//     case n:
//         code block
//         break;
//     case n:
//         code block
//         break;
//     default:
//         default code block
// }

// nouns

// adjectives

// pick 8 prompts


