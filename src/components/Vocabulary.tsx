import React from "react";

import DarkCyanButton from "./DarkCyanButton";
import TransparentButton from "./TransparentButton";

import { getThemeAssetPath, Player } from "../modules/common";

interface IProps {
	backToStart: () => void;
	addNewWord: () => void;
	deleteWordPrompt: (e: any) => void;

	activeTheme: string;
	player: Player;
}
export default class Vocabulary extends React.Component<IProps> {
	render() {
		const {
			addNewWord,
			backToStart,
			deleteWordPrompt,
			activeTheme,
			player
		} = this.props;

		return (
			<div className="vocabulary-list">
				<div className="word-container">
					<img className="bg"
						src={getThemeAssetPath(activeTheme) + "/vocabulary_list/bg.svg"}
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
												<img src={getThemeAssetPath(activeTheme) + "/vocabulary_list/delete_button.svg"}
													alt="delete" />
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
					{...this.props}
					label="Add Word"
				/>

				<TransparentButton
					clickEvent={backToStart}
					{...this.props}
					label="Done"
				/>
			</div>
		);
	}
}