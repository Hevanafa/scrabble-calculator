import React from "react";
import { Word } from "../modules/common";

interface IProps {
	clickEvent: (e: any) => void;

	word: Word;
}
export default class LetterChain extends React.Component<IProps> {
	render() {
		const { clickEvent, word } = this.props;

		return (
			this.props.word ? (
				<div className={"letter-chain" + Word.getLetterChainClass(word.getWord())}
					onClick={clickEvent}>
					{
						word.getWord().split("").map((letter, idx) =>
						<div key={idx}
							className="letter-block">
							<img className="bg"
								src="/assets/img/letter_block.png"
								alt="letter block" />

							<div className="big-letter">
								{letter}
							</div>
							<div className="value">
								{Word.getLetterValue(letter)}
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="letter-chain empty"
					onClick={clickEvent}>
					(Touch here to set the word)
				</div>
			)
		);
	}
}