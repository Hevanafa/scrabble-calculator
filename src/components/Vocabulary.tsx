import React from "react";
import { Player } from "../modules/common";
import DarkCyanButton from "./DarkCyanButton";
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
				<div className="scrollable-area">
					{
						// ["DOLOREM", "IPSUM", "DOLOR", "SIT"]
						player.wordList.map((word, idx) =>
							<LetterChain key={idx} word={word} />
						)
					}
				</div>

				<DarkCyanButton
					clickEvent={addWord}
					label="Add Word"
				/>

				<DarkCyanButton
					clickEvent={backToStart}
					label="Done"
				/>
			</div>
		);
	}
}