<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Banner\Banner;

define( 'Carbon_Field_Banner\\DIR', __DIR__ );

Carbon_Fields::extend( Banner::class, function( $container ) {
	return new Banner(
		$container['arguments']['type'],
		$container['arguments']['name'],
		$container['arguments']['label']
	);
} );
