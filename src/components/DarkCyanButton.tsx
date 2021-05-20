import React from "react";
import { getDefaultThemeAssetPath } from "../modules/common";

interface IProps {
	clickEvent: (e: any) => void;
	label: string;
}
export default class DarkCyanButton extends React.PureComponent<IProps> {
	render() {
		const {clickEvent, label} = this.props;

		return (
			<button
				onClick={clickEvent}
				className="btn-transparent btn-dark-cyan">
				<img
					src={getDefaultThemeAssetPath + "/dark_cyan_button.svg"}
					alt="dark cyan button" />
				<span>{ label }</span>
			</button>
		);
	}
}
