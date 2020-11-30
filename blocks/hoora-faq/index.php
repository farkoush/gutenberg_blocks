<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_faq() { // phpcs:ignore 
	wp_register_script('hoora_faq-js', plugins_url( 'hoora-faq/script.js', dirname( __FILE__ ) ), array(""), '', true);
	wp_enqueue_script('hoora_faq-js');
    wp_register_style('hoora-faq-style', plugins_url( 'hoora-faq/editor.scss', dirname( __FILE__ ) ), false, '', 'all');	
    wp_enqueue_style('hoora-faq-style');
}


// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'hoora_faq' );

