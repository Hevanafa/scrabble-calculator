import React from "react";
import "./App.scss";
import DarkCyanButton from "./components/DarkCyanButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewWord from "./components/NewWord";
import Vocabulary from "./components/Vocabulary";
import { Player } from "./modules/common";

interface IState {
	players: Player[];

	isPlayerManagerVisible: boolean;

	isVocabularyListVisible: boolean;
	selectedPlayerIdx: number;

	isAddingNewWord: boolean;
}
export default class App extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			players: [],

			isPlayerManagerVisible: false,

			isVocabularyListVisible: false,
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
		const idx = Number(e.currentTarget?.getAttribute("idx"));

		const { players } = this.state;
		const newName = prompt(`Enter the new name for Player ${idx + 1}:`, players[idx].getName());

		if (newName === null)
			return;

		players[idx].setName(newName);

		this.setState({ players });
	}

	showVocabularyList(e: any) {
		const idx = Number(e.currentTarget.getAttribute("idx"));

		console.log("sVL " + idx);

		this.setState({
			isVocabularyListVisible: true,
			selectedPlayerIdx: idx
		});
	}

	addNewWord() {
		this.setState({
			isAddingNewWord: true
		});
	}

	insertNewWord(e: any) {
		const letters = e.currentTarget.getAttribute("letters") as string,
			wordMultiplier = e.currentTarget.getAttribute("word-multiplier") as string,
			letterMultipliers = e.currentTarget.getAttribute("letter-multipliers") as string;

		if (!letters) {
			this.setState({
				isAddingNewWord: false
			});

			return;
		}

		const { players, selectedPlayerIdx } = this.state;
		const player = players[selectedPlayerIdx];

		player.addWord(
			letters.replace(/,/g, "").substr(0, 15),
			Number(wordMultiplier),
			letterMultipliers.split(",").map(n => Number(n))
		)

		console.log("iNW attributes", letters, wordMultiplier, letterMultipliers);

		this.setState({
			players,
			isAddingNewWord: false
		});
	}

	deleteWordPrompt(e: any) {
		const playerIdx = Number(e.currentTarget.getAttribute("player-idx")),
			wordIdx = Number(e.currentTarget.getAttribute("idx"));

		const { players } = this.state;
		const player = players[playerIdx];

		if (!window.confirm(`Delete ${player.wordList[wordIdx].getWord()}?`))
			return;

		player.wordList.splice(wordIdx, 1);
		this.setState({ players });
	}


	resetScores() {
		if (!window.confirm("Reset scores?"))
			return;

		const { players } = this.state;

		for (var player of players)
			player.wordList = [];

		this.setState({ players });
	}

	backToStart() {
		this.setState({
			isPlayerManagerVisible: false,
			isVocabularyListVisible: false,
		});
	}

	isStartPage() {
		return !this.state.isPlayerManagerVisible &&
			!this.state.isVocabularyListVisible &&
			!this.state.isAddingNewWord;
	}

	noop() { }

	render() {
		return (
			<div className="App">
				<Header {...this.state} />

				<div className="lighter-container">
					{
						this.isStartPage() ?
							<div className="start-player-list">
								{
									this.state.players.map((player, idx) =>
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
														onClick={this.showVocabularyList.bind(this)}>
														<img src="/assets/img/red_plus_button.png" alt="Red Plus" />
													</button>
												</div>
											</div> : null
									)
								}
							</div>
							: null
					}

					{
						this.state.isPlayerManagerVisible ?
							<div className="player-manager">
								{
									this.state.players.map((player, idx) =>
										<div className="player">
											<div className="left-group">
												{idx + 1 + ". "}
												{player.getName() || `Player ${idx + 1}`}
											</div>

											<button
												className="btn-transparent"
												{...{ idx }}
												onClick={this.changePlayerName.bind(this)}>
												<img src="/assets/img/player_manager/edit_button.png" alt="edit" />
											</button>
										</div>
									)
								}

								<DarkCyanButton
									clickEvent={this.backToStart.bind(this)}
									label="Done"
								/>
							</div>
							: null
					}

					{
						this.state.isAddingNewWord ?
							<NewWord
								player={this.state.players[this.state.selectedPlayerIdx]}
								insertWord={this.insertNewWord.bind(this)} />
							: this.state.isVocabularyListVisible ?
								<Vocabulary
									player={this.state.players[this.state.selectedPlayerIdx]}
									addNewWord={this.addNewWord.bind(this)}
									backToStart={this.backToStart.bind(this)}

									deleteWordPrompt={this.deleteWordPrompt.bind(this)}
								/> :
								null
					}

					{
						this.isStartPage() ? <>
							<DarkCyanButton
								clickEvent={this.showPlayerManager.bind(this)}
								label="Manage Players" />

							<DarkCyanButton
								clickEvent={this.resetScores.bind(this)}
								label="Reset Scores"
							/>

							<Footer />
						</> : null
					}
				</div>
			</div>
		);
	}
}
