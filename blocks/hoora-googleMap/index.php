<?php

add_action( 'plugins_loaded', 'register_map_google' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_map_google() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
    }
    
	register_block_type( 'hoora/google-map', [
		'render_callback' => 'render_map_google',
	] );

}

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function render_map_google($attributes) {
    print_r($attributes);
}
