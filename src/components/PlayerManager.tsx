import React from "react";

import DarkCyanButton from "./DarkCyanButton";

import { Player } from "../modules/common";

interface IProps {
	changePlayerName: (e: any) => void;
	backToStart: () => void;

	players: Player[];
}
export default class PlayerManager extends React.Component<IProps> {
	render() {
		const {
			changePlayerName,
			backToStart,
			players
		} = this.props;

		return (
			<div className="player-manager">
				{
					players.map((player, idx) =>
						<div className="player">
							<div className={
								"left-group" + (!player.getName() ? " empty" : "")
							}>
								{idx + 1 + ". "}
								{player.getName() || `Player ${idx + 1}`}
							</div>

							<button
								className="btn-transparent"
								{...{ idx }}
								onClick={changePlayerName}>
								<img src="/assets/img/player_manager/edit_button.png" alt="edit" />
							</button>
						</div>
					)
				}

				<p>
					Leave the player's name blank if you want to exclude the player.
				</p>

				<DarkCyanButton
					clickEvent={backToStart}
					label="Done"
				/>
			</div>
		);
	}
}