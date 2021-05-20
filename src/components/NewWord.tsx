import React from "react";

import LetterChain from "./LetterChain";

import { Word, Player, getThemeAssetPath } from "../modules/common";

interface IProps {
	insertWord: (e: any) => void;
	player: Player;
	activeTheme: string;
}

interface IState {
	word: Word;
}
export default class NewWord extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);

		this.bindFunctions();

		this.state = {
			word: new Word()
		};
	}

	bindFunctions() {
		this.changeWordMultiplier = this.changeWordMultiplier.bind(this);
		this.changeLetterMultiplier = this.changeLetterMultiplier.bind(this);
		this.showWordPrompt = this.showWordPrompt.bind(this);
	}

	changeWordMultiplier() {
		const {word} = this.state;
		const actualMult = word.getWordMultiplier();

		word.setWordMultiplier(
			actualMult === 1 ? 2 :
			actualMult === 2 ? 3 : 1
		);

		this.setState({word});
	}

	changeLetterMultiplier(e: any) {
		const idx = Number(e.currentTarget.getAttribute("idx"));
		const {word} = this.state;
		const actualMult = word.getLetterMultiplier(idx);

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

	readonly imgPath = getThemeAssetPath(this.props.activeTheme) + "/add_new_word";

	render() {
		const {word} = this.state,
			{insertWord, activeTheme} = this.props,
			actualWord = word.getWord(),
			wordMultiplier = word.getWordMultiplier(),
			letterChainClass = Word.getLetterChainClass(word.getWord());

		return (
			<div className="add-new-word">
				<div className="new-word-container">
					<img className="bg"
						src={getThemeAssetPath(activeTheme) + "/vocabulary_list/bg.svg"}
						alt="bg" />
					
					<div className="word-multiplier">
						<button className="btn-transparent"
							onClick={this.changeWordMultiplier}>
						{
							!actualWord ? (
							<>
								<img src={this.imgPath + "/empty_word_multiplier.svg"} alt="word multiplier" />
								<span>N/A</span>
							</>
							) : wordMultiplier === 1 ? (
							<>
								<img src={this.imgPath + "/empty_word_multiplier.svg"} alt="word multiplier" />
								<span></span>
							</>
							) : (
							<>
								<img src={this.imgPath + `/${wordMultiplier}x_word_multiplier.svg`} alt="word multiplier" />
								<span>{ wordMultiplier }×</span>
							</>
							)
						}
						</button>
					</div>

					<LetterChain
						word={word}
						{...this.props}
						clickEvent={this.showWordPrompt}
					/>

					<div className={"multiplier-row" + letterChainClass}>
						{
							word.getAllLetterMultipliers().slice(0, actualWord.length).map((quantity, idx) =>
								<div key={idx}
									{...{idx: idx}}
									onClick={this.changeLetterMultiplier}>
									<img className="bg"
										src={
											this.imgPath +
											(
												quantity === 2 ? "/2x_letter_multiplier.svg" :
												quantity === 3 ? "/3x_letter_multiplier.svg" :
												"/empty_letter_multiplier.svg"
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
						letters: (actualWord.split("") || []) + "",
						"word-multiplier": wordMultiplier,
						"letter-multipliers": (word.getAllLetterMultipliers() || []) + ""
					}}
					onClick={insertWord}
					className="btn-transparent btn-dark-cyan">
					<img src={getThemeAssetPath(activeTheme) + "/dark_cyan_button.svg"}
						alt="button" />
					<span>Done</span>
				</button>
			</div>
		);
	}
}