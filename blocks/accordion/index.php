<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_image_carousel_cgb_block_assetsss() { // phpcs:ignore 
	// Styles.
	wp_register_style('swiper', plugins_url( 'accordion/editor.scss', dirname( __FILE__ ) ), false, '', 'all');	
	wp_enqueue_style('swiper');
    wp_register_style('swiper1', plugins_url( 'accordion/style.scss', dirname( __FILE__ ) ), false, '', 'all');	
	wp_enqueue_style('swiper1');
    // wp_register_script('hoora_image_carousel-swiper-init-js', plugins_url( 'accordion/fronted.js', dirname( __FILE__ ) ), array("swiper1"), '', true);
	// wp_enqueue_script('hoora_image_carousel-swiper-init-js');
    // print_r(plugins_url( '/accordion/fronted.js', dirname( __FILE__ ) )); die;
    wp_enqueue_script('main-styles2', plugins_url( '/accordion/fronted.js', dirname( __FILE__ ) ), 'all');

}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'hoora_image_carousel_cgb_block_assetsss' );

