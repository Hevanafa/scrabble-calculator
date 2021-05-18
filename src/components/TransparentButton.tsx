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
				className="btn-transparent btn-transparent-bg">
				<img src="/assets/img/transparent_button.png" alt="transparent button" />
				<span>{ label }</span>
			</button>
		);
	}
}
