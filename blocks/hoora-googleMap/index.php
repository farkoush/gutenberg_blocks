<?php

add_action( 'enqueue_block_assets', 'enqueue_block_assets' );
// // save_post
function enqueue_block_assets() {
	if ( is_admin() ) {
        return;
	}
	wp_enqueue_script( 'script', _get_plugin_url() . '/blocks/hoora-googlemap/frontend.js', '', filemtime( _get_plugin_directory() . '/blocks/hoora-googlemap/frontend.js' ) );
}