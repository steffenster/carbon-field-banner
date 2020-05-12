<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Banner\Banner_Field;

define( 'Carbon_Field_Banner\\DIR', __DIR__ );

Carbon_Fields::extend( Banner_Field::class, function( $container ) {
	return new Banner_Field(
		$container['arguments']['type'],
		$container['arguments']['name'],
		$container['arguments']['label']
	);
} );
