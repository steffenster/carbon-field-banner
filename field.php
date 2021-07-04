<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Banner\Banner_Field;

define( 'Carbon_Field_Banner\\DIR', __DIR__ );
define( 'Carbon_Field_Banner\\PATH', plugin_dir_path( __FILE__ ) );
define( 'Carbon_Field_Banner\\URL', plugin_dir_url( __FILE__ ) );

Carbon_Fields::extend(
	Banner_Field::class,
	function( $container ) {
		return new Banner_Field(
			$container['arguments']['type'],
			$container['arguments']['name'],
			$container['arguments']['label']
		);
	}
);
