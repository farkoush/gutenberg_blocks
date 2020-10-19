<?php

/**
 * Get all registered menus
 * @return array List of menus with slug and description
 */
function wp_api_v2_menus_get_all_menus() {
	$menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) );
	return apply_filters('wp_api_v2_menus__menus', $menus);
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'menus/v1', '/menus', array(
		'methods'  => 'GET',
		'callback' => 'wp_api_v2_menus_get_all_menus',
		'permission_callback' => '__return_true'
	) );
} );


register_block_type(
    'jsforwpblocks/form-fields',
    array(
        'render_callback' => 'render_block_core_archivess',
    )
);


function render_block_core_archivess($attributes){
	$items = wp_get_nav_menu_items($attributes['selectControl']);
	$markup = '<ul>';

	foreach ( $items as $post ) {
		// echo $post->title;
		$post_id  = $post->guid;
		$markup  .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( $post_id ),
			esc_html($post->title  )
		);
	}
	return "{$markup}<ul>";
}