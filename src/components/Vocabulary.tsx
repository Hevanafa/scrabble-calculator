import React from "react";

import DarkCyanButton from "./DarkCyanButton";
import TransparentButton from "./TransparentButton";

import { Player } from "../modules/common";

interface IProps {
	backToStart: () => void;
	addNewWord: () => void;
	deleteWordPrompt: (e: any) => void;

	player: Player;
}
export default class Vocabulary extends React.Component<IProps> {
	render() {
		const { addNewWord, backToStart, deleteWordPrompt, player } = this.props;

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
									<div key={`word_${idx}`}
										className="word">
										<div>
											{word.getWord()}
										</div>

										{/* Todo: Letter multipliers have no place here */}

										<div className="right-group">
											{ player.wordList[idx].getWordValue(true) } 

											<button
												className="btn-transparent"
												{...{
													"player-idx": player.id,
													"word-idx": idx
												}}
												onClick={deleteWordPrompt}>
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