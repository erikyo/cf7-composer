<?php
/**
 * Plugin Name:       Example Dynamic
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       example-dynamic
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_example_dynamic_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_example_dynamic_block_init' );

/**
 * Adds additional props to wpcf7_contact_form post type
 */
add_filter( 'register_post_type_args', 'wpcf7_contact_form_add_props', 10, 2 );
function wpcf7_contact_form_add_props( $args, $post_type ) {
   if ( 'wpcf7_contact_form' === $post_type ) :
      $args['show_in_rest'] = true;
   endif;
   return $args;
}
