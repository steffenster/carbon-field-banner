/**
 * External dependencies.
 */
import { Fragment, Component } from '@wordpress/element';
// import RichTextEditor from 'react-rte/lib/RichTextEditor';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

/**
 * Internal dependencies.
 */
import ColorButton from './components/color-button';
import File from './components/file';

export const StyleBlock = ( { options } ) => {
	return (
		<style>
			{ options && options.color && `.cf-banner-preview .ql-container .ql-editor p {color: ${options.color}}` }
			{ options && options.linkColor && `.cf-banner-preview .ql-container .ql-editor a {color: ${options.linkColor}}` }
			{ options && options.linkHoverColor && `.cf-banner-preview .ql-container .ql-editor a:hover {color: ${options.linkHoverColor}}` }
			{ options && options.linkHoverLineColor && `.cf-banner-preview .ql-container .ql-editor p a:hover {border-bottom-color: ${options.linkHoverLineColor}}` }

		</style>
	);
}

export const Preview = ( {
	options,
	onChangeCol1,
	onChangeCol2,
	updateImage
} ) => {
	const modules = {
		toolbar: [
			['bold', 'italic', 'underline','strike'],
			['link'],
			['clean']
		],
	};

	const buttonIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z"/></svg>;

	const style = {
		backgroundColor: options.backgroundColor ? options.backgroundColor : null,
		// color: options.color ? options.color : null
	}

	return(
		<div class="cf-banner-preview cf-banner-wrapper" style={ style }>
			<div className="cf-banner-outer-col">
				<div className="cf-banner-image">
					<File
						value={ options.imageUrl ? options.imageUrl : '' }
						onChange={ updateImage }
						title={ 'Images' }
						buttonLabel={ buttonIcon }
						type_filter={ 'image' }
						value_type="url"
						displayFileName={ false }
					/>
				</div>
				<div className="cf-banner-inner-col">
					<div className="cf-banner-slogan">
						<ReactQuill
							theme="bubble" 
							value={ options.col1 ? options.col1 : '' } 
							onChange={ onChangeCol1 }
							modules={ modules }
							placeholder={ 'Column one …'}
							/>
					</div>
					{
						( ! options.columns || options.columns === 2 ) &&
						<div className="cf-banner-cta">
							<ReactQuill
								theme="bubble" 
								value={ options.col2 ? options.col2 : '' } 
								onChange={ onChangeCol2 }
								placeholder={ 'Column two …'}
								modules={ modules }
							/>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default class Banner_Default extends Component {

	constructor() {
        super();
		// this.updateBackgroundColor = this.updateBackgroundColor.bind( this );
		this.updateColor = this.updateColor.bind( this );
		this.updateImage = this.updateImage.bind( this );
		this.onChangeCol1 = this.onChangeCol1.bind( this );
		this.onChangeCol2 = this.onChangeCol2.bind( this );
		this.setColumns = this.setColumns.bind( this );
	}

	updateColor = ( name, color ) => {
		const { updateValue } = this.props;
		updateValue( {
			target: {
				type: 'color',
				name: name,
				value: color && color.hex ? color.hex : ''
			}
		} );
	}

	updateImage = ( url ) => {
		const { updateValue } = this.props;
		updateValue( {
			target: {
				type: 'imageUrl',
				name: 'imageUrl',
				value: url ? url : ''
			}
		} );
	}

	onChangeCol1 = (value) => {
		const { updateValue } = this.props;
		updateValue( {
			target: {
				type: 'editor',
				name: 'col1',
				value: value ? value : ''
			}
		} );
	};

	onChangeCol2 = (value) => {
		const { updateValue } = this.props;
		updateValue( {
			target: {
				type: 'editor',
				name: 'col2',
				value: value ? value : ''
			}
		} );
	};

	setColumns = (value) => {
		const { updateValue } = this.props;
		updateValue( {
			target: {
				type: 'text',
				name: 'columns',
				value: value ? parseInt( value ) : null
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

		
		return (
			<Fragment>
				<div className="cf-banner-fieldset cf-banner-default">
					<label>
						<input
							type="checkbox"
							name="isActive"
							checked={ options.isActive }
							value={ options.isActive }
							onChange={ updateValue }
						/>
						<span>Banner is active</span>
					</label>
				</div>
				<div className="cf-banner-fieldset">
					<h3>Preview:</h3>
					<StyleBlock
						options={ options }
					/>
					<Preview
						options={ options }
						onChangeCol1={ this.onChangeCol1 }
						onChangeCol2={ this.onChangeCol2 }
						updateImage={ this.updateImage }
					/>
				</div>
				<div className="cf-banner-fieldset">
					<h3>Colors:</h3>
					<ColorButton
						label="Background color"
						value={ options.backgroundColor ? options.backgroundColor : '#dcf4fc'  }
						onChange={ ( color ) =>  this.updateColor( 'backgroundColor', color ) }
					/>
					<ColorButton
						label="Font color"
						value={ options.color ? options.color : '#193440'  }
						onChange={ ( color ) =>  this.updateColor( 'color', color ) }
					/>
					<ColorButton
						label="Link color"
						value={ options.linkColor ? options.linkColor : '#193440'  }
						onChange={ ( color ) =>  this.updateColor( 'linkColor', color ) }
					/>
					<ColorButton
						label="hoverd link color"
						value={ options.linkHoverColor ? options.linkHoverColor : ( options.linkColor ? options.linkColor : '#193440' ) }
						onChange={ ( color ) =>  this.updateColor( 'linkHoverColor', color ) }
					/>
					<ColorButton
						label="hovered link line color"
						value={ options.linkHoverLineColor ? options.linkHoverLineColor : '#86C274'  }
						onChange={ ( color ) =>  this.updateColor( 'linkHoverLineColor', color ) }
					/>
				</div>
				<div className="cf-banner-fieldset">
					<h3>Columns</h3>
					<div className="button-group">
						<div
							className={ options.columns && options.columns === 1 ? 'button' : 'button inactive' }
							onClick={ () => this.setColumns( 1 ) }
							>
							1 Column
						</div>
						<div
							className={ ! options.columns || options.columns === 2 ? 'button' : 'button inactive' }
							onClick={ ( e ) => ( e.preventDefault, this.setColumns( 2 ) ) }
						>
							2 Columns
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}