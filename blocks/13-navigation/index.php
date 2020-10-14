<?php

// namespace Gutenberg_Courses\Example_Block\Blocks\navigation;

// add_action( 'plugins_loaded', __NAMESPACE__ . '\register_navigation_block' );
add_action( 'plugins_loaded', 'register_navigation_block' );

/**
 * Register the navigation block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_navigation_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'jsforwpblocks/navigation', [
		// 'render_callback' => __NAMESPACE__ . '\render_navigation_block',
		'render_callback' => 'render_navigation_block',
	] );

}

/**
 * Server rendering for /blocks/examples/12-navigation
 */
function render_navigation_block() {
	$recent_posts = wp_get_recent_posts( [
		'numberposts' => 3,
		'post_status' => 'publish',
	] );

	if ( empty( $recent_posts ) ) {
		return '<p>No posts</p>';
	}

	$markup = '<ul>';

	foreach ( $recent_posts as $post ) {
		$post_id  = $post['ID'];
		$markup  .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( get_the_title( $post_id ) )
		);
	}
	// print_r($markup);
	return "{$markup}<ul>";
}
