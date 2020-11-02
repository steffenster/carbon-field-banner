/**
 * External dependencies.
 */
// import { get } from 'lodash';
const { get } = lodash;
/**
 * Internal dependencies.
 */
import './style.scss';
import MediaLibrary from '../../components/media-library';
import apiFetch from '../../utils/api-fetch.js';

/**
 * internal WordPress dependencies
 */
const { Fragment, Component } = wp.element;

class FileField extends Component {
	/**
	 * Local state.
	 *
	 * @type {Object}
	 */
	state = {
		data: {}
	};

	/**
	 * Lifecycle Hook.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		const { value, value_type } = this.props;
		if (value) {
			apiFetch(
				`${window.wpApiSettings.root}carbon-fields/v1/attachment/?type=${value_type}&value=${value}`,
				'get'
			).then(this.handleFileDataChange);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { value_type } = this.props;
		if (!this.state.data[value_type] && nextProps.value !== this.state.data[value_type]) {
			this.setState(() => { return { selectedTab: nextProps.selectedTab } })
			if (nextProps.value) {
				apiFetch(
					`${window.wpApiSettings.root}carbon-fields/v1/attachment/?type=${value_type}&value=${nextProps.value}`,
					'get'
				).then(this.handleFileDataChange);
			}
		}
	}

	/**
	 * Returns an URL to the attachment's thumbnail.
	 *
	 * @return {string}
	 */
	getThumb() {
		const { data } = this.state;
		console.log({ data });

		if (data.sizes) {
			const size = data.sizes.thumbnail || data.sizes.full;

			if (size) {
				return size.url;
			}
		}

		if (data.thumb_url) {
			return data.thumb_url;
		}

		return data.icon;
	}

	/**
	 * Returns the filename to the attachment thumbnail.
	 *
	 * @return {string}
	 */
	getFileName() {
		const { data } = this.state;

		return data.filename || data.file_name;
	}

	/**
	 * Handles the file meta set.
	 *
	 * @param  {Object} data
	 * @return {void}
	 */
	handleFileDataChange = (data) => {
		this.setState({ data });
	}

	/**
	 * Handles the clear action of the file field.
	 *
	 * @return {void}
	 */
	handleClear = () => {
		const { id, onChange } = this.props;

		onChange(id, '');

		this.handleFileDataChange({});
	}

	/**
	 * Handles the file selection.
	 *
	 * @param  {Object} files
	 * @return {void}
	 */
	handleSelect = (files) => {
		const {
			onChange,
			value_type
		} = this.props;

		const [file] = files;

		this.handleFileDataChange(file);
		onChange(get(file, value_type, file.id));

	}

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		const { data } = this.state;
		const {
			value,
			type_filter,
			buttonLabel,
			mediaLibraryTitle,
			displayFileName = true
		} = this.props;

		return (
			<MediaLibrary
				onSelect={this.handleSelect}
				multiple={false}
				title={mediaLibraryTitle}
				buttonLabel={'Insert Media'}
				typeFilter={type_filter}
			>
				{
					({ openMediaBrowser }) => {
						return <div className={value && !!data.id ? 'cf-file__banner-inner with-image' : 'cf-file__banner-inner'}>
							<div className="cf-file__banner-content">
								{(value && !!data.id) && (
									<Fragment>
										<div className="cf-file__banner-preview">
											<img src={this.getThumb()} className="cf-file__banner-image" />
											<button type="button" className="cf-file__banner-remove dashicons-before dashicons-no-alt" onClick={this.handleClear}></button>
											<button type="button" className="cf-file__banner-edit dashicons-before dashicons-edit" onClick={openMediaBrowser}></button>
										</div>
										{
											displayFileName &&
											<span className="cf-file__name" title={this.getFileName()}>
												{this.getFileName()}
											</span>
										}
									</Fragment>
								)}

								<button type="button" className="button cf-file__banner-browse" onClick={openMediaBrowser}>
									{buttonLabel}
								</button>
							</div>
						</div>;
					}
				}
			</MediaLibrary>
		);
	}
}

export default FileField;