// list of prompts
var promptList= [
  "Write a sentence without the letter 'K'",
  "Use the word 'potato' in your sentence",
  "Write a sentence exactly 6 syllables long",
  "Write a sentence which contains both an adjective and a verb",
  "sentence without the letter 'K'",
  "word 'potato' in your sentence",
  "sentence exactly 6 syllables long",
  "sentence which contains both an adjective and a verb"
]

function getPrompts(numberOfPrompts){
	var selectedPrompts = new Array();
	for (i=0;i<numberOfPrompts;i++){
		selectedPrompts.push(promptList[i]);
	}
	return selectedPrompts;
}

var returnedPrompts = getPrompts(initWrite.prompts);



// nouns

// adjectives

// pick 8 prompts


