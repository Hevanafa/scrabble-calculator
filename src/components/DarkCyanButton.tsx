import React from "react";

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
				<img src="/assets/img/dark_cyan_button.png" alt="dark cyan button" />
				<span>{ label }</span>
			</button>
		);
	}
}