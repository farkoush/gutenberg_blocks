<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 * @package     gutenberg_blocks
 * @author      farkoush (@zgordon)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: homa - Gutenberg Blocks
 * Plugin URI:  https://gutenberg.courses
 * Description: A plugin containing example blocks for developers.  From <a href="https://gutenberg.courses/development">farkoush's Gutenberg Development Course</a>.
 * Version:     3.1.1
 * Author:      farkoush
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
	$block_path = '/build/index.js';
	$style_path = '/build/index.css';

	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'jsforwp-blocks-js',
		_get_plugin_url() . $block_path,
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		filemtime( _get_plugin_directory() . $block_path )
	);

	wp_enqueue_style(
		'jsforwp-blocks-editor-css',
		_get_plugin_url() . $style_path,
		[ ],
		filemtime( _get_plugin_directory() . $style_path )
	);

}
// define( 'KADENCE_BLOCKS_PATH', realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR );
// require_once KADENCE_BLOCKS_PATH . 'dist/init.php';
// include __DIR__ . '/dist/init.php';

// include __DIR__ . '/blocks/12-dynamic/index.php';
// include __DIR__ . '/blocks/hoora-menu/index.php';
// include __DIR__ . '/blocks/hoora-googlemap/index.php';
include __DIR__ . '/blocks/hoora-swiper2/index.php';
// include __DIR__ . '/blocks/hoora-tabs/index.php';
// include __DIR__ . '/blocks/hoora-meta2/index.php';
// include __DIR__ . '/blocks/tabs/index.php';
// include __DIR__ . '/blocks/accordion/index.php';



// include __DIR__ . '/dist/form-ajax.php';
// include __DIR__ . 'dist/init.php';
include __DIR__ . '/dist/form-ajax.php';
// include __DIR__ . 'dist/helper-functions.php';
// include __DIR__ . 'dist/class-kadence-blocks-prebuilt-library.php';
// include __DIR__ . 'dist/class-kadence-blocks-css.php';
// include __DIR__ . 'dist/class-kadence-blocks-frontend.php';
// include __DIR__ . 'dist/class-kadence-blocks-table-of-contents.php';
// include __DIR__ . 'dist/settings/class-kadence-blocks-settings.php';
include __DIR__ . '/dist/class-mailerlite-form-rest-api.php';
include __DIR__ . '/dist/class-fluentcrm-form-rest-api.php';


// define( 'KADENCE_BLOCKS_PATH', realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR );

// function kadence_blocks_init() {
// 	require_once KADENCE_BLOCKS_PATH . 'dist/form-ajax.php';
// }
// add_action( 'plugins_loaded', 'kadence_blocks_init' );