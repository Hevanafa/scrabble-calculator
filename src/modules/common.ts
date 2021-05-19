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

	public getName = () => this.name;

	public addWord(word: string, wordMultiplier: number, letterMultiplierAry: number[]) {
		if (!wordMultiplier)
			wordMultiplier = 1;

		if (!letterMultiplierAry)

		this.wordList.push(new Word(word.toUpperCase(), wordMultiplier, letterMultiplierAry));
	}

	// public getComputedScore() {
	// 	return this.wordList.map((word, wordIdx) =>
	// 		word.split("").map((c, idx) =>
	// 			getLetterValue(c) * this.multipliers[wordIdx][idx]
	// 		).reduce((a, b) => a + b)
	// 	).reduce((a, b) => a + b, 0);
	// }

	public getComputedScore = () => this.wordList.map(word =>
		word.getWordValue(true)
	).reduce((a, b) => a + b, 0);
}

class Word {
	private word: string;
	private wordMultiplier: number;
	private letterMultiplierArray: number[];

	constructor(word?: string, wordMultiplier?: number, letterMultiplierArray?: number[]) {
		this.word = word || "";
		this.wordMultiplier = wordMultiplier || 1;
		this.letterMultiplierArray = !word ? [] : letterMultiplierArray || [...new Array(word.length)].map(_ => 1);
	}

	public getWord = () => this.word;
	public setWord(word: string) {
		this.word = word;
	}

	public getWordMultiplier = () => this.wordMultiplier;
	public setWordMultiplier(amount: number) {
		this.wordMultiplier = amount;
	}

	public getAllLetterMultipliers = () => this.letterMultiplierArray;

	public getLetterMultiplier = (idx: number) => this.letterMultiplierArray[idx];

	public setLetterMultiplier(idx: number, amount: number) {
		this.letterMultiplierArray[idx] = amount;
	}

	/**
	 * 
	 * @param letter The letter in uppercase
	 * @returns the value of the letter
	 */
	static getLetterValue = (letter: string): number =>
		"AEIOULNSTR".includes(letter) ? 1 :
		"DG".includes(letter) ? 2 :
		"BCMP".includes(letter) ? 3 :
		"FHVWY".includes(letter) ? 4 :
		letter === "K" ? 5 :
		"JX".includes(letter) ? 8 :
		"QZ".includes(letter) ? 10 : 0;

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

	static getLetterChainClass = (word: string) => (
		!word ? " empty" :
		word.length <= 5 ? " normal" :
		word.length <= 10 ? " smaller" :
		" smallest"
	)
}

export {
	Player,
	Word
}