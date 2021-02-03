<?php 
function tabs_assets() { // phpcs:ignore
    // echo "tabs"; die;
    wp_register_style('style-css', plugins_url('/tabs/style.scss', dirname(__FILE__)));
    wp_enqueue_style( 'style-css');
    wp_register_style('editor-css', plugins_url('/tabs/editor.scss', dirname(__FILE__)));
    wp_enqueue_style( 'editor-css');
    // print_r(plugins_url('/tabs/editor.scss', dirname(__FILE__)));die;
}

// Hook: Frontend assets.
// add_action( 'enqueue_block_editor_assets', 'hoora_tab_assets' );
add_action( 'init', 'tabs_assets' );