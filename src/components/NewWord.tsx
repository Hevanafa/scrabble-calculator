import React from "react";
import { Word, Player } from "../modules/common";
import LetterChain from "./LetterChain";

interface IProps {
	insertWord: (e: any) => void;
	readonly player: Player;
}

interface IState {
	word: Word;
}
export default class NewWord extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			word: new Word()
		};
	}

	// Todo: multipliers don't get passed to the parent component

	changeLetterMultiplier(e: any) {
		const idx = Number(e.currentTarget.getAttribute("idx"));
		const {word} = this.state;
		const actualMult = word.getLetterMultiplier(idx);

		// const {multipliers} = this.state;

		word.setLetterMultiplier(idx, 
			actualMult === 1 ? 2 :
			actualMult === 2 ? 3 : 1
		);

		this.setState({word});
	}

	showWordPrompt() {
		const newWord = prompt("Set the new word", this.state.word.getWord());

		if (newWord === null)
			return;

		const {word} = this.state;

		word.setWord((newWord.toUpperCase().match(/[A-Z]/g)||[]).slice(0, 15).join(""));

		this.setState({word});
	}

	getComputedScore = () => this.state.word.getWordValue(true);

	// getComputedScore() {
	// 	const { letters, multipliers } = this.state;

	// 	if (!letters.length)
	// 		return 0;

	// 	return letters.map((letter, idx) =>
	// 		Word.getLetterValue(letter) * multipliers[idx]
	// 	).reduce((a, b) => a + b);
	// }


	readonly imgPath = "/assets/img/add_new_word";

	render() {
		const {word} = this.state;
		const letterChainClass = Word.getLetterChainClass(word.getWord());

		return (
			<div className="add-new-word">
				<div className="new-word-container">
					<img className="bg"
						src="/assets/img/vocabulary_list/bg.png"
						alt="bg" />
					
					<div className="word-multiplier">
						<button className="btn-transparent">
							<img src={this.imgPath + "/empty_word_multiplier.png"} alt="word multiplier" />
							<span>N/A</span>
						</button>
					</div>

					<LetterChain
						word={word}
						clickEvent={this.showWordPrompt.bind(this)}
					/>

					<div className={"multiplier-row" + letterChainClass}>
						{
							word.getAllLetterMultipliers().slice(0, word.getWord().length).map((quantity, idx) =>
								<div key={idx}
									{...{idx: idx}}
									onClick={this.changeLetterMultiplier.bind(this)}>
									<img className="bg"
										src={
											this.imgPath +
											(
												quantity === 2 ? "/2x_letter_multiplier.png" :
												quantity === 3 ? "/3x_letter_multiplier.png" :
												"/empty_letter_multiplier.png"
											)
										}
										alt="letter multiplier" />
									<span>
										{quantity < 2 ? "" : `${quantity}×`}
									</span>
								</div>
							)
						}
					</div>
				</div>

				<div className="calculated-score">
					<div>Calculated score:</div>
					<div className="big-score">
						{ this.getComputedScore() }
					</div>
				</div>

				<button
					{...{
						letters: (word.getWord().split("") || []) + "",
						"word-multiplier": word.getWordMultiplier(),
						"letter-multipliers": (word.getAllLetterMultipliers() || []) + ""
					}}
					onClick={this.props.insertWord}
					className="btn-transparent btn-dark-cyan">
					<img src="/assets/img/dark_cyan_button.png" alt="button" />
					<span>Done</span>
				</button>
			</div>
		);
	}
}