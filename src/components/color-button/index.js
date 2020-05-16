/**
 * Internal dependencies.
 */
import Picker from './picker';

/**
 * internal WordPress dependencies
 */
const { Component } = wp.element;
const { __ } = wp.i18n;

class ColorButton extends Component {
	/**
	 * Defines the initial state.
	 *
	 * @type {Object}
	 */
	state = {
		showPicker: false
	}

	/**
	 * Toggles the visibility of the color picker component
	 *
	 * @return {void}
	 */
	togglePicker = () => this.setState( { showPicker: ! this.state.showPicker } )

	/**
	 * Render a color input field.
	 *
	 * @return {React.Element}
	 */
	render() {
		const { showPicker } = this.state;
		const {
			label,
			value,
			presets,
            onChange
		} = this.props;

		return (
			<div className="cf-color__inner">
				<button type="button" className="button cf-color__toggle" onClick={ this.togglePicker }>
					<span className="cf-color__preview" style={ { backgroundColor: value } }></span>

					<span className="cf-color__toggle-text">
						{ label ? label : __( 'Select a color' ) }
					</span>
				</button>

				{ showPicker && (
					<Picker
						color={ value }
						onChange={ onChange }
						disableAlpha={ true }
						presetColors={ presets ? presets : [] }
						onClose={ () => showPicker ? this.togglePicker() : null }
					/>
				) }

				<button type="button" className="button-link cf-color__reset" onClick={ onChange }>
					<span className="dashicons dashicons-no"></span>
				</button>
			</div>
		);
	}
}

export default ColorButton;