class Player {
	public readonly id: number;
	private name = "";

	public wordList: Word[];

	constructor(id: number) {
		this.id = id;
		this.wordList = [];
	}

	public setName(newName: string) {
		this.name = newName;
	}

	public getName = () => this.name;

	public addWord(word: string, wordMultiplier: number, letterMultiplierAry: number[]) {
		this.wordList.push(new Word(
			word.toUpperCase(),
			wordMultiplier,
			letterMultiplierAry));
	}

	public getComputedScore = () => this.wordList.map(word =>
		word.getWordValue(true)
	).reduce((a, b) => a + b, 0);
}

class Word {
	private word: string;
	private wordMultiplier: number;
	private letterMultiplierArray: number[]; // an array with 15 elements

	constructor(word?: string, wordMultiplier?: number, letterMultiplierArray?: number[]) {
		this.word = word || "";
		this.wordMultiplier = wordMultiplier || 1;
		this.letterMultiplierArray = letterMultiplierArray || [...new Array(15)].map(_ => 1);
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

	public getWordValue = (withMultipliers: boolean) =>
		!this.word ? 0 :

		withMultipliers ? (
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

	static getLetterChainClass = (word: string) => (
		!word ? " empty" :
		word.length <= 5 ? " normal" :
		word.length <= 10 ? " smaller" :
		" smallest"
	)
}

const clickSFX = new Audio(window.location.origin + "/assets/sounds/click.wav");
function playClickSound() {
	clickSFX.play();
}

const getAssetImgPath = window.location.origin + "/assets/img";

export {
	Player,
	Word,

	playClickSound,
	getAssetImgPath
}