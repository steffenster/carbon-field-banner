/**
 * External dependencies.
 */
import SketchPicker from 'react-color/lib/Sketch';
// import onClickOutside from 'react-onclickoutside';

/**
 * internal WordPress dependencies
 */
const { Component } = wp.element;

class Picker extends Component {
	/**
	 * Handles the click outside the main element.
	 *
	 * @return {void}
	 */
	handleClickOutside = () => this.props.onClose()

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			color,
			onChange,
			disableAlpha,
			presetColors
		} = this.props;

		return (
			<div id="carbon-color-picker-wrapper" className="cf-color__picker">
				<SketchPicker
					color={ color }
					onChange={ onChange }
					disableAlpha={ disableAlpha }
					presetColors={ presetColors }
				/>
			</div>
		);
	}
}

export default Picker;