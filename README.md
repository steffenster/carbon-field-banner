Adds a `banner` field type to Carbon Fields.

## Installation

Install using composer:

```php
compose require steffenster/carbon-field-banner
```
## Usage

```php
use Carbon_Fields\Field\Field;

...

Field::make( 'banner', 'crb_banner', 'My Banner' )
```
## Accessing field values

The data is stored in a JSON format.

```php
$encoded = carbon_get_theme_option( 'crb_banner' );

if ( ! empty( $encoded ) ) {
    $banner = json_decode( $encoded ),
}

// Properties only exist if the properties have been set in the field.

if ( 
    property_exists( $banner, 'imageUrl' ) && 
    ! empty( $banner->imageUrl ) ) {

    echo "<img src=\"{$banner->imageUrl}\" />";

} 

```

## TODO

Implement a callable function for the rendered banner.