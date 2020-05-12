<?php

namespace Carbon_Field_Banner;

use Carbon_Fields\Field\Field;

class Banner_Field extends Field {
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
		$dir      = \Carbon_Field_Banner\DIR . '/languages/';
		// Enqueue field styles.
		wp_enqueue_style(
			'carbon-field-banner',
			$root_uri . '/build/bundle.css',
			fileatime( $dir . '/build/bundle.css' ),
			'all'
		);

		// Enqueue field scripts.
		wp_enqueue_script(
			'carbon-field-banner',
			$root_uri . '/build/bundle.js',
			array( 'carbon-fields-core' ),
			fileatime( $dir, '/build/bundle.js' ),
			'all'
		);
	}
}
