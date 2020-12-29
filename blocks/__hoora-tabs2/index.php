<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_image_carousel_cgb_block_assets() { // phpcs:ignore 
	// Styles.
	// wp_register_script('hoora_image_carousel-swiper-init-js', plugins_url( 'blocks/hoora-swiper/swiper-init.js', dirname( __FILE__ ) ), array("swiper"), '', true);
	wp_register_script('hoora_image_carousel-swiper-init-js', plugins_url( 'hoora-swiper2/swiper-init.js', dirname( __FILE__ ) ), array("swiper"), '', true);
	// print_r(plugins_url( 'hoora-swiper/swiper-init.js', dirname( __FILE__ ) ));
	wp_enqueue_script('hoora_image_carousel-swiper-init-js');
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'hoora_image_carousel_cgb_block_assets' );

