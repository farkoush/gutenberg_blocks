<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function hoora_map_google_block_assets() { // phpcs:ignore
    $api_key ='AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g';
    wp_enqueue_script( 'google_api_key_js', "https://maps.googleapis.com/maps/api/js?key={$api_key}&callback=initMap" );

	wp_register_script('mapsJavaScriptAPI', plugins_url( 'hoora-googleMap/mapsAPI.js', dirname( __FILE__ ) ), array(""), '', true);
	wp_enqueue_script('mapsJavaScriptAPI');
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'hoora_map_google_block_assets' );