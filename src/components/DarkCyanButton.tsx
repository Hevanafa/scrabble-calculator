import React from "react";
import { getThemeAssetPath } from "../modules/common";

interface IProps {
	clickEvent: (e: any) => void;
	activeTheme: string;
	label: string;
}
export default class DarkCyanButton extends React.PureComponent<IProps> {
	render() {
		const {
			clickEvent,
			activeTheme,
			label
		} = this.props;

		return (
			<button
				onClick={clickEvent}
				className="btn-transparent btn-dark-cyan">
				<img
					src={getThemeAssetPath(activeTheme) + "/dark_cyan_button.svg"}
					alt="dark cyan button" />
				<span>{ label }</span>
			</button>
		);
	}
}
