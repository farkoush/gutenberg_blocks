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
 * Version:     3.1.1
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
// define( 'KADENCE_BLOCKS_PATH', realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR );
// require_once KADENCE_BLOCKS_PATH . 'dist/init.php';
// include __DIR__ . '/dist/init.php';

// include __DIR__ . '/blocks/12-dynamic/index.php';
// include __DIR__ . '/blocks/hoora-menu/index.php';
// include __DIR__ . '/blocks/hoora-googlemap/index.php';
// include __DIR__ . '/blocks/hoora-swiper2/index.php';
// include __DIR__ . '/blocks/hoora-tabs/index.php';
include __DIR__ . '/blocks/hoora-meta2/index.php';
include __DIR__ . '/blocks/tabs/index.php';
include __DIR__ . '/blocks/accordion/index.php';

