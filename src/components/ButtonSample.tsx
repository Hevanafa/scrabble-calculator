import React from "react";

export default class ButtonSample extends React.Component {
	render() {
		return (
			<button className="btn">
				<div className="highlight-short"></div>
				<div className="highlight-long"></div>

				<div className="shadow-long"></div>
				<div className="shadow-short"></div>

				<div className="label">
					Button
				</div>
			</button>
		);
	}
}