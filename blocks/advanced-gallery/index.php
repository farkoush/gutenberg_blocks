<?php
//   include $dir . 'blocks/hoora-collaps/schema.php';
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_swiper_assets() {
        if ( is_admin() ) {
            return;
        }
        // wp_enqueue_style('swiper-style', get_template_directory_uri() . '/blocks/hoora-swiper/style.css', false);
        wp_enqueue_script('swiper-fronted-script', get_template_directory_uri() . '/blocks/advanced-gallery/shared.js', false);
        // if ( has_block( 'hoora/swiper' ) ) {}
      }
    
add_action( 'enqueue_block_assets', 'hoora_swiper_assets' );
// function hoora_collaps_editor_assets() {
//   // wp_enqueue_style('collaps-editor-style', get_template_directory_uri() . '/blocks/hoora-collaps/editor.css', array('wp-editor'), false);
// }

// add_action( 'enqueue_block_editor_assets', 'hoora_collaps_editor_assets' );

