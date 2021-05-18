import React from "react";
import { getLetterValue, Player } from "../modules/common";
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

	showWordPrompt() {
		const newWord = prompt("Set the new word", this.state.letters.join(""));

		this.setState({
			letters: (newWord?.toUpperCase().match(/[A-Z]/g)||[])
		});
	}

	getComputedScore() {
		const { letters, multipliers } = this.state;

		return letters.map((letter, idx) =>
			getLetterValue(letter) * multipliers[idx]
		);
	}

	render() {
		return (
			<div className="add-new-word">
				<h1>Add New Word for { this.props.player.getName() }</h1>

				<div>
					<div>Word multiplier slot</div>

					<div className="letter-chain"
						 onClick={this.showWordPrompt.bind(this)}>
						<LetterChain word={this.state.letters.join("")} />
					</div>

					<div className="multiplier-row">
						{
							this.state.multipliers.slice(0, this.state.letters.length).map((quantity, idx) =>
								<div key={idx}>
									{quantity < 2 ? "" : `${quantity}×`}
								</div>
							)
						}
					</div>
				</div>

				<button
					{...{ letters: (this.state.letters || "") + "" }}
					onClick={this.props.insertWord}>
						Done
				</button>

				<div>
					<div>Calculated score:</div>
					<div>
						{ this.getComputedScore() }
					</div>
				</div>
			</div>
		);
	}
}