<?php
/**
 * Plugin Name: QuestionScout
 * Plugin URI: https://www.questionscout.com/
 * Description: Using the QuestionScout Plugin, you import your online QuestionScout forms and surveys into your WordPress website with just a single click.
 * Author: QuestionScout
 * Version: 1.0.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
