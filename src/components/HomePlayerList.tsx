import React from "react";

import { getDefaultThemeAssetPath, Player } from "../modules/common";

interface IProps {
	showVocabularyList: (e: any) => void;

	players: Player[];
}
export default class HomePlayerList extends React.Component<IProps> {
	render() {
		const { showVocabularyList, players } = this.props;

		return (
			<div className="start-player-list">
				{
					players.map((player, idx) => (
						player.getName() ?
							<div key={idx} className="player">
								<div>
									{player.getName() || `Player ${idx + 1}`}
								</div>
								<div className="right-group">
									<span>
										{player.getComputedScore()}
									</span>

									<button
										className="btn-transparent"
										{...{ idx: idx }}
										onClick={showVocabularyList}>
										<img src={getDefaultThemeAssetPath + "/red_plus_button.svg"}
											alt="Red Plus" />
									</button>
								</div>
							</div>
						: null
					))
				}
			</div>
		);
	}
}
