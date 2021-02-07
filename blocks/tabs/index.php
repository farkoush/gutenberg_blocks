<?php 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_block_assets2() { // phpcs:ignore
    wp_register_script('jquery', "https://code.jquery.com/jquery-3.5.1.min.js", '', '', true);
	wp_enqueue_script('jquery');
    wp_enqueue_style('main-styles', get_template_directory_uri() . '/blocks/tabs/editor.css', array('wp-editor'), filemtime(get_template_directory() . '/blocks/tabs/editor.css'), false);
    wp_enqueue_style('main-styles1', get_template_directory_uri() . '/blocks/tabs/style.css', array('wp-editor'), filemtime(get_template_directory() . '/blocks/tabs/style.css'), false);
    // wp_enqueue_style('main-styles2', plugins_url( '/blocks/tabs/editor.css', dirname( __FILE__ ) ), array('wp-editor'), filemtime(get_template_directory() . '/blocks/tabs/style.css'), false);
    // wp_enqueue_script('main-style3', get_template_directory_uri() . '/blocks/tabs/script.js', array('wp-editor'), filemtime(get_template_directory() . '/blocks/tabs/script.js'), false);
    wp_enqueue_script('main-style3', get_template_directory_uri() . '/blocks/tabs/fronted.js', array('wp-editor'), filemtime(get_template_directory() . '/blocks/tabs/fronted.js'), false);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'hoora_block_assets2' );