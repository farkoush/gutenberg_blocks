<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_tab_assets() { // phpcs:ignore
	wp_register_script('hoora_tab-js', get_template_directory_uri() .'/blocks/hoora-tab/script.js');
    wp_enqueue_script('hoora_tab-js');
    wp_register_style('style-css', get_template_directory_uri() .'/blocks/hoora-tab/style.css');
    wp_enqueue_style( 'style-css');
}

// Hook: Frontend assets.
// add_action( 'enqueue_block_editor_assets', 'hoora_tab_assets' );
add_action( 'init', 'hoora_tab_assets' );

