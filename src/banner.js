/**
 * External dependencies.
 */
import { merge } from 'lodash';
/**
 * Internal dependencies.
 */
import Banner_Default from './banner-default';
import Banner_Event from './banner-event';

/**
 * Internal WordPress dependencies
 */
import { compose, withState } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';

class Banner extends Component {
	constructor() {
		super();
		this.updateValue = this.updateValue.bind( this );
	}

	componentDidMount() {
		const {
			value,
			setState
		} = this.props;

		const options = JSON.parse( value ? value : '{}' );
		setState( {	options: options } );
	}
	
	updateValue = ( e ) => {
		const { id, onChange, options, setState } = this.props;
		const name = e.target.name;
		const input = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		const newOptions = merge( options, { id: id, [name]: input });

		setState( { [name]: input } );
		onChange( id, JSON.stringify( newOptions ) );
	}

	render() {
		const props = this.props;
		const { 
			id,
			name,
			value,
			field, 
			options
		} = this.props;
		
		return (
			<Fragment>
				{
					field && field.subtype === "default" &&
					<Banner_Default
						id={ id }
						options={ options ? options : {} }
						updateValue={ this.updateValue }
						{ ...props }
					/>
				}
				{
					field && field.subtype === "event" &&
					<Banner_Event
						id={ id }
						options={ options ? options : {} }
						updateValue={ this.updateValue }
						{ ...props }
					/>
				}
				<input
					type="hidden"
					id={ id }
					name={ name }
					value={ value }
					readOnly
				/>
			</Fragment>
		);
	}
}

const applyWithState = withState( {
	options: {},
} );

export default compose(
	applyWithState
)( Banner );

