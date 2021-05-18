import React from "react";

import DarkCyanButton from "./DarkCyanButton";
import TransparentButton from "./TransparentButton";

import { getWordValue, Player } from "../modules/common";

interface IProps {
	backToStart: () => void;
	addNewWord: () => void;

	player: Player;
}
export default class Vocabulary extends React.Component<IProps> {
	render() {
		const { addNewWord: addWord, backToStart, player } = this.props;

		return (
			<div className="vocabulary-list">
				<div className="word-container">
					<img className="bg"
						src="/assets/img/vocabulary_list/bg.png"
						alt="bg" />

					<div className="scrollable-area">
						{
							!player.wordList.length ?
								<div className="empty-list">
									(Empty list)
							</div> :
								player.wordList.map(word =>
									<div className="word">
										<div>
											{word}
										</div>

										<div className="right-group">
											{getWordValue(word)}

											<button className="btn-transparent">
												{/* Todo: delete button */}
												<img src="/assets/img/vocabulary_list/delete_button.png" alt="delete" />
											</button>
										</div>
									</div>
								)
						}
					</div>
				</div>

				<DarkCyanButton
					clickEvent={addWord}
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