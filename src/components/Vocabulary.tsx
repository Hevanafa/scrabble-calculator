import React from "react";

import DarkCyanButton from "./DarkCyanButton";
import TransparentButton from "./TransparentButton";

import { getWordWithMultiplierValue, Player } from "../modules/common";

interface IProps {
	backToStart: () => void;
	addNewWord: () => void;

	player: Player;
}
export default class Vocabulary extends React.Component<IProps> {
	render() {
		const { addNewWord, backToStart, player } = this.props;

		return (
			<div className="vocabulary-list">
				<div className="word-container">
					<img className="bg"
						src="/assets/img/vocabulary_list/bg.png"
						alt="bg" />

					<div className="scrollable-area">
						{
							!player.wordList.length ? (
								<div className="empty-list">
									(Empty list)
								</div>
							) : (
								player.wordList.map((word, idx) =>
									<div className="word">
										<div>
											{word}
										</div>

										<div className="right-group">
											{getWordWithMultiplierValue(word, player.multipliers[idx])}

											<button className="btn-transparent">
												{/* Todo: delete button */}
												<img src="/assets/img/vocabulary_list/delete_button.png" alt="delete" />
											</button>
										</div>
									</div>
								)
							)
						}
					</div>
				</div>

				<DarkCyanButton
					clickEvent={addNewWord}
					label="Add Word"
				/>

				<TransparentButton
					clickEvent={backToStart}
					label="Done"
				/>
			</div>
		);
	}
}