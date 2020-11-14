<?php // silence is golden
    // $api_key = get_option( 'getwid_google_api_key', '' );
    $api_key ='AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g';

    if ( $api_key ) {
        wp_enqueue_script( 'google_api_key_js', "https://maps.googleapis.com/maps/api/js?key={$api_key}" );
    }