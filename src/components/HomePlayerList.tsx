import React from "react";

import { getAssetImgPath, Player } from "../modules/common";

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
										<img src={getAssetImgPath + "/red_plus_button.png"}
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
