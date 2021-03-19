<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_faq_assets() { // phpcs:ignore
	wp_register_script('hoora_accordion-js', _get_plugin_url() .'/blocks/hoora-faq/faq-
    script.js');
    wp_enqueue_script('hoora_accordion-js');
    wp_register_style('editor-css', _get_plugin_url() .'/blocks/hoora-faq/editor.css');
    wp_enqueue_style( 'editor-css');
}

// Hook: Frontend assets.
// add_action( 'enqueue_block_editor_assets', 'hoora_faq_assets' );
add_action( 'init', 'hoora_faq_assets' );
