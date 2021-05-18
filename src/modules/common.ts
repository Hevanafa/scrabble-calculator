class Player {
	readonly id: number;
	private name = "";

	wordList: string[] = [];

	constructor(id: number) {
		this.id = id;
	}

	public setName(newName: string) {
		this.name = newName;
	}

	public getName() {
		return this.name;
	}

	public addWord(word: string) {
		this.wordList.push(word.toUpperCase());
	}

	public getComputedScore() {
		return this.wordList.map(word =>
			word.split("").map(c => getLetterValue(c)).reduce((a, b) => a + b)
		).reduce((a, b) => a + b, 0);
	}
}

/**
 * 
 * @param letter The letter in uppercase
 * @returns 
 */
function getLetterValue(letter: string): number {
	if ("AEIOULNSTR".includes(letter))
		return 1;
	else if ("DG".includes(letter))
		return 2;
	else if ("BCMP".includes(letter))
		return 3;
	else if ("FHVWY".includes(letter))
		return 4;
	else if (letter === "K")
		return 5;
	else if ("JX".includes(letter))
		return 8;
	else if ("QZ".includes(letter))
		return 10;
	return 0;
}

function getWordValue(word: string) {
	if (!word)
		return 0;

	return word
		.toUpperCase()
		.split("")
		.map(letter =>
			getLetterValue(letter)
		).reduce((a, b) => a + b);
}

function getLetterChainClass(word: string) {
	return (
		!word ? " empty" :
		word.length <= 5 ? " normal" :
		word.length <= 10 ? " smaller" :
		" smallest"
	)
}

export {
	Player,
	getLetterValue,
	getWordValue,
	getLetterChainClass
}