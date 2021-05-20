import React from "react";

import DarkCyanButton from "./components/DarkCyanButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewWord from "./components/NewWord";
import Vocabulary from "./components/Vocabulary";
import PlayerManager from "./components/PlayerManager";
import HomePlayerList from "./components/HomePlayerList";

import { playClickSound, Player } from "./modules/common";

import "./styles/App.scss";

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

		this.bindFunctions();

		this.state = {
			players: [],

			isPlayerManagerVisible: false,

			isVocabularyListVisible: false,
			selectedPlayerIdx: 0,

			isAddingNewWord: false,
		};
	}

	bindFunctions() {
		this.showVocabularyList = this.showVocabularyList.bind(this);
		this.changePlayerName = this.changePlayerName.bind(this);
		this.backToStart = this.backToStart.bind(this)
		this.insertNewWord = this.insertNewWord.bind(this)
		this.addNewWord = this.addNewWord.bind(this)
		this.deleteWordPrompt = this.deleteWordPrompt.bind(this)
		this.showPlayerManager = this.showPlayerManager.bind(this)
		this.resetScores = this.resetScores.bind(this)
	}

	componentDidMount() {
		this.initPlayers();
	}

	initPlayers () {
		const { players } = this.state;

		for (var a = 0; a < 4; a++) {
			const newPlayer = new Player(a);

			if (a < 2)
				newPlayer.setName(`Player ${a + 1}`);

			players.push(newPlayer);
		}

		this.setState({ players }, () => {
			this.loadPlayerData();
		});
	}

	readonly localStorageKey = "ScrabblePlayers";
	isPlayerDataLoaded = false;
	loadPlayerData() {
		const playerData = localStorage.getItem(this.localStorageKey);

		if (!playerData) return;

		const parsedArray = JSON.parse(playerData);
		let players: Player[] = [];

		for (const player of parsedArray) {
			const newPlayer = new Player(player.id);
			newPlayer.setName(player.name)

			for (const word of player.wordList)
				newPlayer.addWord(word.word, word.wordMultiplier, word.letterMultiplierArray);

			players.push(newPlayer);
		}

		this.isPlayerDataLoaded = true;

		// console.log("Saved player data:", players);

		this.setState({
			players: players
		});
	}

	savePlayerData() {
		const playerData = JSON.stringify(this.state.players);
		localStorage.setItem(this.localStorageKey, playerData);
	}

	showPlayerManager() {
		playClickSound();

		this.setState({
			isPlayerManagerVisible: true
		});
	}

	changePlayerName(e: any) {
		playClickSound();

		const idx = Number(e.currentTarget.getAttribute("idx"));

		const { players } = this.state;
		const newName = prompt(`Enter the new name for Player ${idx + 1}:`, players[idx].getName());

		if (newName === null)
			return;

		players[idx].setName(newName);

		this.setState({ players }, () => {
			this.savePlayerData();
		});
	}

	showVocabularyList(e: any) {
		playClickSound();

		const idx = Number(e.currentTarget.getAttribute("idx"));

		// console.log("sVL " + idx);

		this.setState({
			isVocabularyListVisible: true,
			selectedPlayerIdx: idx
		});
	}

	addNewWord() {
		playClickSound();

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

		// console.log("iNW attributes", letters, wordMultiplier, letterMultipliers);

		this.setState({
			players,
			isAddingNewWord: false
		}, () => {
			this.savePlayerData();
		});
	}

	deleteWordPrompt(e: any) {
		playClickSound();

		const playerIdx = Number(e.currentTarget.getAttribute("player-idx")),
			wordIdx = Number(e.currentTarget.getAttribute("word-idx"));

		const { players } = this.state;
		const player = players[playerIdx];

		if (!window.confirm(`Delete ${player.wordList[wordIdx].getWord()}?`))
			return;

		player.wordList.splice(wordIdx, 1);
		this.setState({ players }, () => {
			this.savePlayerData();
		});
	}


	resetScores() {
		playClickSound();

		if (!window.confirm("Reset scores?"))
			return;

		const { players } = this.state;

		for (var player of players)
			player.wordList = [];

		this.setState({ players }, () => {
			this.savePlayerData();
		});
	}

	backToStart() {
		playClickSound();

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
		const {
			players,
			isPlayerManagerVisible,
			isAddingNewWord,
			selectedPlayerIdx,
			isVocabularyListVisible
		} = this.state;

		return (
			<div className="App">
				<Header {...this.state} />

				<div className="lighter-container">
					{
						this.isStartPage() ?
							<HomePlayerList
								showVocabularyList={this.showVocabularyList}
								{...this.state}
							/>
							: null
					}

					{
						isPlayerManagerVisible ?
							<PlayerManager
								changePlayerName={this.changePlayerName}
								backToStart={this.backToStart}
								{...this.state}
								/>
							: null
					}

					{
						isAddingNewWord ?
							<NewWord
								insertWord={this.insertNewWord}

								player={players[selectedPlayerIdx]}
								/>
							: isVocabularyListVisible ?
								<Vocabulary
									addNewWord={this.addNewWord}
									backToStart={this.backToStart}
									deleteWordPrompt={this.deleteWordPrompt}

									player={players[selectedPlayerIdx]}
								/> :
								null
					}

					{
						this.isStartPage() ? <>
							<DarkCyanButton
								clickEvent={this.showPlayerManager}
								label="Manage Players"
							/>

							<DarkCyanButton
								clickEvent={this.resetScores}
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
