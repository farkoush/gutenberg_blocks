<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_tab_assets1() { // phpcs:ignore
	wp_register_script('hoora_tab-js', plugins_url('hoora-tabs/script.js',dirname(__FILE__)));
    wp_enqueue_script('hoora_tab-js');
    wp_register_style('style-css', plugins_url('/hoora-tabs/style.css', dirname(__FILE__)));
    wp_enqueue_style( 'style-css');
    wp_register_style('editor-css', plugins_url('/hoora-tabs/editor.css', dirname(__FILE__)));
    wp_enqueue_style( 'editor-css');
}

// Hook: Frontend assets.
// add_action( 'enqueue_block_editor_assets', 'hoora_tab_assets' );
add_action( 'init', 'hoora_tab_assets1' );

