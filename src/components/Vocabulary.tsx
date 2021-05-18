import React from "react";
import { Player } from "../modules/common";
import LetterChain from "./LetterChain";

interface IProps {
	backToStart: () => void;
	addNewWord: () => void;

	player: Player;
}
export default class Vocabulary extends React.Component<IProps> {
	render() {
		const { addNewWord: addWord, backToStart, player } = this.props;

		return (
			<div>
				<h1>
					{player.getName() || `Player ${player.id + 1}`}'s Vocabulary
				</h1>

				<div className="scrollable-area">
					{
						// ["DOLOREM", "IPSUM", "DOLOR", "SIT"]
						player.wordList.map((word, idx) =>
							<LetterChain key={idx} word={word} />
						)
					}
				</div>

				<button onClick={addWord}>
					Add Word
				</button>

				<button onClick={backToStart}>
					Done
				</button>
			</div>
		);
	}
}