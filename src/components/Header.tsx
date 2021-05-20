import React from "react";
import { getDefaultThemeAssetPath, Player } from "../modules/common";

interface IProps {
	players: Player[];
	isPlayerManagerVisible: boolean;
	isVocabularyListVisible: boolean;
	selectedPlayerIdx: number;

	isAddingNewWord: boolean;
}
export default class Header extends React.Component<IProps> {
	getPlayerName = () => this.props.players[this.props.selectedPlayerIdx].getName();

	render() {
		const {
			isPlayerManagerVisible,
			isVocabularyListVisible,
			isAddingNewWord
		} = this.props;

		if (isPlayerManagerVisible)
			return (
				<div className="header-area">
					<h1>Manage Players</h1>
				</div>
			);


		if (isAddingNewWord)
			return (
				<div className="header-area">
					<h1>Add a New Word for { this.getPlayerName() }</h1>
				</div>
			);
		if (isVocabularyListVisible)
			return (
				<div className="header-area">
					<h1>{ this.getPlayerName() }'s Vocabulary List</h1>
				</div>
			);

		return (
			<div className="header-area">
				<h1>Scrabble Calculator</h1>

				<div className="right-group">
					<button className="btn-transparent">
						<img src={getDefaultThemeAssetPath + "/change_theme_button.svg"}
							alt="change theme" />
					</button>

					<button className="btn-transparent">
						<img src={getDefaultThemeAssetPath + "/help_button.svg"}
							alt="help button" />
					</button>
				</div>
			</div>
		);
	}
}