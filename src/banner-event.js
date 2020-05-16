/**
 * Internal dependencies.
 */
import ColorButton from './components/color-button';

/**
 * Internal WordPress depedencies
 */
const { Fragment, Component } = wp.element;

export default class Banner_Event extends Component {

	constructor() {
        super();
		this.updateBackgroundColor = this.updateBackgroundColor.bind( this );
	}
	
	updateBackgroundColor = ( color ) => {
		const { updateValue } = this.props;
		updateValue( {
			target: {
				type: 'color',
				name: 'backgroundColor',
				value: color && color.hex ? color.hex : ''
			}
		} );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			options,
			updateValue
        } = this.props;

		const style = {
			backgroundColor: options.backgroundColor ? options.backgroundColor : null
		}

		return (
			<Fragment>
				<div className="cf-banner-fieldset cf-banner-default">
					<label>
						<input
							type="checkbox"
							name="isVisible"
							checked={ options.isVisible }
							value={ options.isVisible }
							onChange={ updateValue }
						/>
						<span>Banner is visible</span>
					</label>
				</div>
				<div class="cf-banner-wrapper" style={ style }>
					{
						options.text1
					}
				</div>
				<div className="cf-banner-fieldset">
					<ColorButton
						label="Select a background color"
						value={ options.backgroundColor ? options.backgroundColor : '#50c6f1'  }
						onChange={ this.updateBackgroundColor }
					/>
				</div>
			</Fragment>
		);
	}
}