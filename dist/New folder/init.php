<?php
/**
 * Enqueue admin CSS/JS and edit width functions
 *
 * @since   1.0.0
 * @package Kadence Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function kadence_gutenberg_editor_assets() {
	// If in the frontend, bail out.
	if ( ! is_admin() ) {
		return;
	}
	wp_localize_script(
		'kadence-blocks-js',
		'kadence_blocks_params',
		array(
			'ajax_url'       => admin_url( 'admin-ajax.php' ),
			'ajax_nonce'     => wp_create_nonce( 'kadence-blocks-ajax-verification' ),
			'sidebar_size'   => $sidebar_size,
			'nosidebar_size' => $nosidebar_size,
			'default_size'   => $jssize,
			'config'         => get_option( 'kt_blocks_config_blocks' ),
			'configuration'  => get_option( 'kadence_blocks_config_blocks' ),
			'settings'       => get_option( 'kadence_blocks_settings_blocks' ),
			'userrole'       => $userrole,
			'proData'        => $pro_data,
			'pro'            => ( class_exists( 'Kadence_Blocks_Pro' ) ? 'true' : 'false' ),
			'colors'         => get_option( 'kadence_blocks_colors' ),
			'global'         => get_option( 'kadence_blocks_global' ),
			'gutenberg'      => ( function_exists( 'gutenberg_menu' ) ? 'true' : 'false' ),
			'privacy_link'   => get_privacy_policy_url(),
			'privacy_title'  => ( get_option( 'wp_page_for_privacy_policy' ) ? get_the_title( get_option( 'wp_page_for_privacy_policy' ) ) : '' ),
			'editor_width'   => apply_filters( 'kadence_blocks_editor_width', $enable_editor_width ),
			'isKadenceT'     => class_exists( 'Kadence\Theme' ),
			'headingWeights' => class_exists( 'Kadence\Theme' ) ? kadence_blocks_get_headings_weights() : null,
			'buttonWeights'  => class_exists( 'Kadence\Theme' ) ? kadence_blocks_get_button_weights() : null,
			'g_fonts'        => file_exists( $gfonts_path ) ? include $gfonts_path : array(),
			'g_font_names'   => file_exists( $gfont_names_path ) ? include $gfont_names_path : array(),
			'fluentCRM'      => defined( 'FLUENTCRM' ),
			// 'icon_names'     => file_exists( $icon_names_path ) ? include $icon_names_path : array(),
			// 'icons_ico'      => file_exists( $icon_ico_path ) ? include $icon_ico_path : array(),
			// 'icons_fa'       => file_exists( $icons_path ) ? include $icons_path : array(),
		)
	);
	// Styles.
}
add_action( 'init', 'kadence_gutenberg_editor_assets' );

