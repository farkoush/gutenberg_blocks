<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// function hoora_faq() { // phpcs:ignore 
// 	if ( is_admin() ) {
//         return;
// 	}
// 	wp_enqueue_style( 'editor', get_template_directory_uri() . '/src/blocks/hoora-faq/editor.scss' );
// 	wp_enqueue_script( 'script', get_template_directory_uri() . '/src/blocks/hoora-faq/script.js' );
// }
// add_action( 'init', 'hoora_faq' );

function hoora_faq() { // phpcs:ignore 
    wp_register_style('hoora-faq-style', plugins_url( 'hoora-faq/editor.scss', dirname( __FILE__ ) ), false, '', 'all');	
	wp_enqueue_style('hoora-faq-style');
	wp_enqueue_script( 'script', _get_plugin_url() . '/blocks/hoora-faq/script.js' );

}
add_action( 'init', 'hoora_faq' );

function block_variation_example_enqueue() {
    wp_enqueue_script(
		'block-variation-example-script',
		_get_plugin_url() . '/blocks/hoora-faq/block-variation-example.js',
		//  get_template_directory_uri() . '/src/blocks/hoora-faq/block-variation-example.js',
        array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' )
    );
}
add_action( 'enqueue_block_editor_assets', 'block_variation_example_enqueue' );