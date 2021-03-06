<?php

namespace Carbon_Field_Banner;

use Carbon_Fields\Field\Field;

class Banner_Field extends Field {
	/**
	 * subtype to set a type templates
	 *
	 * @var string
	 */
	public $subtype = 'default';

	/**
	 * Prepare the field type for use.
	 * Called once per field type when activated.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function field_type_activated() {
		$dir    = \Carbon_Field_Banner\DIR . '/languages/';
		$locale = get_locale();
		$path   = $dir . $locale . '.mo';
		load_textdomain( 'carbon-field-banner', $path );
	}

	/**
	 * Enqueue scripts and styles in admin.
	 * Called once per field type.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function admin_enqueue_scripts() {
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_Banner\DIR );

		// Enqueue field styles.
		wp_enqueue_style(
			'carbon-field-banner',
			\Carbon_Field_Banner\URL . 'build/bundle.min.css',
			fileatime( \Carbon_Field_Banner\DIR . 'build/bundle.min.css' ),
			'all'
		);

		// Enqueue field scripts.
		wp_enqueue_script(
			'carbon-field-banner',
			\Carbon_Field_Banner\URL . 'build/bundle.min.js',
			array(
				'carbon-fields-core',
				'react',
				'react-dom',
				'wp-compose',
				'wp-element',
				'wp-i18n',
				'jquery',
				'lodash',
			),
			fileatime( \Carbon_Field_Banner\DIR . '/build/bundle.min.js' ),
			true
		);
	}

	/**
	 * Set the field width.
	 *
	 * @param  string $type
	 * @return self   $this
	 */
	public function set_type( $type ) {
		$this->subtype = $type;
		return $this;
	}

	/**
	 * Returns an array that holds the field data, suitable for JSON representation.
	 *
	 * @param bool $load  Should the value be loaded from the database or use the value from the current instance.
	 * @return array
	 */
	public function to_json( $load ) {
		$field_data = parent::to_json( $load );

		$field_data = array_merge(
			$field_data,
			array(
				'subtype' => $this->subtype,
			)
		);

		return $field_data;
	}
}
