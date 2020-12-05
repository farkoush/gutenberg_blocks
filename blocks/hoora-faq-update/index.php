<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_faq_update() { // phpcs:ignore 
	// wp_register_script('hoora_faq-js', plugins_url( 'hoora-faq/script.js', dirname( __FILE__ ) ), array(""), '', true);
	// wp_enqueue_script('hoora_faq-js');
    wp_register_style('hoora-faq-style', plugins_url( 'hoora-faq/faq-header/editor.scss', dirname( __FILE__ ) ), false, '', 'all');	
	wp_enqueue_style('hoora-faq-style');
	wp_enqueue_script( 'script', _get_plugin_url() . '/blocks/hoora-faq/faq-header/script.js' );

}


// Hook: Frontend assets.
add_action( 'init', 'hoora_faq_update' );
// add_action( 'enqueue_block_assets', 'hoora_faq' );


// add_action( 'enqueue_block_assets', 'enqueue_block_assets' );
// // // save_post
// function enqueue_block_assets() {
// 	if ( is_admin() ) {
//         return;
// 	}
// 	wp_enqueue_script( 'script', _get_plugin_url() . '/blocks/hoora-googlemap/frontend.js', '', filemtime( _get_plugin_directory() . '/blocks/hoora-googlemap/frontend.js' ) );
// }