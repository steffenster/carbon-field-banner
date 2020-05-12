<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc060148d9b67e0578d11b4e74b8c48c8
{
    public static $files = array (
        '8468e7c255e5f24b1d11030fe51ff7c1' => __DIR__ . '/../..' . '/field.php',
    );

    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'Carbon_Field_Banner\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Carbon_Field_Banner\\' => 
        array (
            0 => __DIR__ . '/../..' . '/core',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc060148d9b67e0578d11b4e74b8c48c8::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc060148d9b67e0578d11b4e74b8c48c8::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
