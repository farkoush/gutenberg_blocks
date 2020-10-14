<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 * @package     Gutenberg_Courses\Example_Blocks
 * @author      Zac Gordon (@zgordon)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Gutenberg - Example Blocks
 * Plugin URI:  https://gutenberg.courses
 * Description: A plugin containing example blocks for developers.  From <a href="https://gutenberg.courses/development">Zac Gordon's Gutenberg Development Course</a>.
 * Version:     3.1.0
 * Author:      Zac Gordon
 * Author URI:  https://twitter.com/zgordon
 * Text Domain: jsforwpblocks
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

// namespace Gutenberg_Courses\Example_Blocks;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}

/**
 * Gets this plugin's URL.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

// namespace Gutenberg_Courses\Example_Blocks;

// add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );
add_action( 'enqueue_block_editor_assets', 'enqueue_block_editor_assets' );

/**
 * Enqueue block editor only JavaScript and CSS.
 */
function enqueue_block_editor_assets() {
	// Make paths variables so we don't write em twice ;)
	$block_path = '/assets/js/editor.blocks.js';
	$style_path = '/assets/css/blocks.editor.css';

	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'jsforwp-blocks-js',
		_get_plugin_url() . $block_path,
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		filemtime( _get_plugin_directory() . $block_path )
	);
}

// Dynamic Blocks
// register_block_type( 'jsforwpblocks/dynamic', [
// 	'render_callback' => __NAMESPACE__ . '\render_dynamic_block',
// ] );

// function render_dynamic_block() {
// 	$recent_posts = wp_get_recent_posts( [
// 		'numberposts' => 2,
// 		'post_status' => 'publish',
// 	] );

// 	if ( empty( $recent_posts ) ) {
// 		return '<p>No posts</p>';
// 	}

// 	$markup = '<ul>';

// 	foreach ( $recent_posts as $post ) {
// 		echo $post['post_title'];
// 		$post_id  = $post['ID'];
// 		$markup  .= sprintf(
// 			'<li><a href="%1$s">%2$s</a></li>',
// 			esc_url( get_permalink( $post_id ) ),
// 			esc_html( get_the_title( $post_id ) )
// 		);
// 	}

// 	return "{$markup}<ul>";
// }

include __DIR__ . '/blocks/12-dynamic/index.php';
include __DIR__ . '/blocks/13-navigation/index.php';

