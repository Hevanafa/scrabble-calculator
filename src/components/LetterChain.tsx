import React from "react";
import { getLetterValue } from "../modules/common";

interface IProps {
	word: string;
}
export default class LetterChain extends React.Component<IProps> {
	render() {
		return (
			<div className="letter-chain">
				{this.props.word.split("").map((letter, idx) =>
					<div key={idx}>
						<div className="big-letter">
							{ letter }
						</div>
						<div className="value">
							{ getLetterValue(letter) }
						</div>
					</div>
				)}
			</div>
		);
	}
}