import React from "react";
import "./App.scss";
import NewWord from "./components/NewWord";
import Vocabulary from "./components/Vocabulary";
import { Player } from "./modules/common";

interface IState {
	players: Player[];

	isPlayerManagerVisible: boolean;

	isVocabularyVisible: boolean;
	selectedPlayerIdx: number;

	isAddingNewWord: boolean;
}
export default class App extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			players: [],

			isPlayerManagerVisible: false,

			isVocabularyVisible: false,
			selectedPlayerIdx: 0,

			isAddingNewWord: false,
			// Todo: add a new word screen
		};
	}

	componentDidMount() {
		const { players } = this.state;

		for (var a = 0; a < 4; a++) {
			const newPlayer = new Player(a);

			if (a < 2)
				newPlayer.setName(`Player ${a + 1}`);

			players.push(newPlayer);
		}

		this.setState({ players });
	}

	showPlayerManager() {
		this.setState({
			isPlayerManagerVisible: true
		});
	}

	changePlayerName(e: any) {
		const idx = Number(e.target?.getAttribute("idx"));
		
		const { players } = this.state;
		const newName = prompt(`Enter the new name for Player ${idx}:`, players[idx].getName());
		players[idx].setName(newName || "");

		this.setState({ players });
	}

	showVocabularyList(e: any) {
		const idx = Number(e.target?.getAttribute("idx"));

		console.log("sVL " + idx);

		this.setState({
			isVocabularyVisible: true,
			selectedPlayerIdx: idx
		});
	}

	addNewWord() {
		this.setState({
			isAddingNewWord: true
		});
	}

	insertNewWord(e: any) {
		const letters = e.target.getAttribute("letters");

		const { players, selectedPlayerIdx } = this.state;
		const player = players[selectedPlayerIdx];

		player.wordList.push(letters.replace(/,/g, ""));

		console.log("iNW");

		this.setState({
			players,
			isAddingNewWord: false
		});
	}

	resetScores() {
		if (!window.confirm("Reset scores?"))
			return;

		const { players } = this.state;

		for (var player of players)
			player.wordList = [];

		this.setState({players});
	}

	backToStart() {
		this.setState({
			isPlayerManagerVisible: false,
			isVocabularyVisible: false,
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Scrabble Calculator</h1>

				{
					!this.state.isPlayerManagerVisible &&
					!this.state.isVocabularyVisible &&
					!this.state.isAddingNewWord ?
						<div className="start-menu">
						{
							this.state.players.map((player, idx) =>
								player.getName() ?
								<div>
									<div>
										{player.getName() || `Player ${idx + 1}`} 
									</div>
									<div className="right-group">
										<span>
											{player.getComputedScore()}
										</span>
										<button
											{...{ idx: idx }}
											onClick={this.showVocabularyList.bind(this)}>
											➕
										</button>
									</div>
								</div> : null
							)
						}

							<button onClick={this.showPlayerManager.bind(this)}>
								Manage Players
							</button>

							<button onClick={this.resetScores.bind(this)}>
								Reset Scores
							</button>
						</div>
					: null
				}

				{
					this.state.isPlayerManagerVisible ?
						<div>
							<h1>Players</h1>

							<ol>
								{
									this.state.players.map((player, idx) =>
										<li>
											<div>
												{player.getName() || `Player ${idx + 1}`}
											</div>

											<button {...{idx}} onClick={this.changePlayerName.bind(this)}>
												✏
											</button>
										</li>
									)
								}
							</ol>

							<button onClick={this.backToStart.bind(this)}>
								Done
							</button>
						</div>
						: null
				}

				{
					this.state.isAddingNewWord ?
					<NewWord
						player={this.state.players[this.state.selectedPlayerIdx]}
						insertWord={this.insertNewWord.bind(this)} />
					: this.state.isVocabularyVisible ?
					<Vocabulary
						player={this.state.players[this.state.selectedPlayerIdx]}
						addNewWord={this.addNewWord.bind(this)}
						backToStart={this.backToStart.bind(this)}
						/> :
						null
				}

				<div className="footer">
					Graphics design: T3CH_Kitsu<br />
					Programming: Hevanafa<br />
					2021, T3CH_Kitsu &amp; Hevanafa<br />
				</div>
			</div>
		);
	}
}
