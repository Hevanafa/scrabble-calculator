import React from "react";
import { getLetterChainClass, getLetterValue, Player } from "../modules/common";
import LetterChain from "./LetterChain";

interface IProps {
	insertWord: (e: any) => void;
	readonly player: Player;
}

interface IState {
	letters: string[];
	multipliers: number[];
}
export default class NewWord extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			letters: [],
			multipliers: [...new Array(15)].map(_ => 1)
		};
	}

	// Todo: multipliers don't get passed to the parent component

	changeLetterMultiplier(e: any) {
		const idx = Number(e.currentTarget.getAttribute("idx"));
		const {multipliers} = this.state;

		multipliers[idx] = (
			multipliers[idx] === 1 ? 2 :
			multipliers[idx] === 2 ? 3 : 1
		);

		this.setState({multipliers});
	}

	showWordPrompt() {
		const newWord = prompt("Set the new word", this.state.letters.join(""));

		if (newWord === null)
			return;

		this.setState({
			letters: (newWord.toUpperCase().match(/[A-Z]/g)||[]).slice(0, 15)
		});
	}

	getComputedScore() {
		const { letters, multipliers } = this.state;

		if (!letters.length)
			return 0;

		return letters.map((letter, idx) =>
			getLetterValue(letter) * multipliers[idx]
		).reduce((a, b) => a + b);
	}


	readonly imgPath = "/assets/img/add_new_word";

	render() {
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
						word={this.state.letters.join("")}
						clickEvent={this.showWordPrompt.bind(this)}
					/>

					<div className={"multiplier-row" + getLetterChainClass(this.state.letters.join(""))}>
						{
							this.state.multipliers.slice(0, this.state.letters.length).map((quantity, idx) =>
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
						letters: (this.state.letters || []) + "",
						multipliers: (this.state.multipliers || []) + ""
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