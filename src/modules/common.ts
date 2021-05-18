class Player {
	readonly id: number;
	private name = "";

	wordList: Word[];

	// Todo: consolidate words into a class
	// wordList: string[] = [];
	// multipliers: number[][] = [];

	constructor(id: number) {
		this.id = id;
		this.wordList = [];
	}

	public setName(newName: string) {
		this.name = newName;
	}

	public getName() {
		return this.name;
	}

	public addWord(word: string, multiplierAry: number[]) {
		this.wordList.push(new Word(word.toUpperCase()));
		this.multipliers.push(multiplierAry);
	}

	public getComputedScore() {
		return this.wordList.map((word, wordIdx) =>
			word.split("").map((c, idx) =>
				getLetterValue(c) * this.multipliers[wordIdx][idx]
			).reduce((a, b) => a + b)
		).reduce((a, b) => a + b, 0);
	}
}

class Word {
	private word: string;
	private wordMultiplier: number;
	private letterMultiplierArray: number[];

	constructor(word: string, wordMultiplier?: number, letterMultiplierArray?: number[]) {
		this.word = word;
		this.wordMultiplier = wordMultiplier || 1;
		this.letterMultiplierArray = letterMultiplierArray || [...new Array(word.length)].map(_ => 1);
	}

	/**
	 * 
	 * @param letter The letter in uppercase
	 * @returns 
	 */
	static getLetterValue(letter: string): number {
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

	getWordValue(withMultipliers: boolean) {
		if (!this.word)
			return 0;

		return withMultipliers ? (
			this.word
				.toUpperCase()
				.split("")
				.map((letter, idx) =>
					Word.getLetterValue(letter) * this.letterMultiplierArray[idx]
				).reduce((a, b) => a + b)
				* this.wordMultiplier
		) : (
			this.word
				.toUpperCase()
				.split("")
				.map(letter =>
					Word.getLetterValue(letter)
				).reduce((a, b) => a + b)
		);
	}
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
	Word,
	getLetterChainClass
}