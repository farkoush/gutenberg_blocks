<?php

// include $dir . 'blocks/hoora-meta/source/index.php';

// $sources = get_post_meta(get_the_ID(),'hooramat-source');
// $post_types = get_post_types(); 

// register_post_meta( 'post', 'source_meta', array(
//     'show_in_rest' => true,
//     'single' => true,
//     'type' => 'string',
// ) );

$value = get_post_meta( get_the_ID(), 'myguten_meta_block_field', true );


// function sidebar_plugin_script_enqueue() {
//   wp_register_script(
//       'plugin-sidebar-js',
//       get_template_directory_uri() .'/blocks/hoora-meta/plugin-sidebar.js',
//       array(
//           'wp-plugins',
//           'wp-edit-post',
//           'wp-element',
//           'wp-components'
//       )
//   );
//   wp_enqueue_script( 'plugin-sidebar-js' );
// }
// add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );


//**** METABOX */

// register_post_meta( 'post', 'sidebar_plugin_meta_sourcee', array(
//   'show_in_rest' => true,
//   'single' => true,
//   'type' => 'string',
// ) );
// register_post_meta( 'post', 'my_meta_multiple', array(
//   'show_in_rest' => true,
//   'single' => false,
//   'type' => 'string',
// ) );

// $post_types = get_theme_mod('hooratheme_post_types', []); 

// foreach ($post_types as $key => $post_type) {
//     if (isset($post_types[$key]['fields']['source'])): 
        add_post_type_support($key, 'source');
        register_post_meta( $key, '_meta_source', [
            'type'          => 'object',
            'single'        => true,
            'auth_callback' => '__return_true',
            'show_in_rest'  => [
                'schema' => [
                    'type'       => 'object',
                    'properties' => [
                        'titleee' => [
                            'type' => 'string',
                        ],
                        'linkkk' => [
                            'type' => 'string',
                            'format' => 'uri',
                        ],
                    ],
                ],
            ],
        ]);
        register_post_meta('page', 'metas', [
          'type'         => 'array',
          'description'  => 'Model trim levels.',
          'single'       => true,
          'show_in_rest' => array(
            'schema' => array(
              'items' => array(
                'type'       => 'object',
                'properties' => [
                  'title1' => [
                      'type' => 'string',
                  ],
                  'features' => [
                      'type' => 'string',
                      'format' => 'uri',
                  ],
              ],
              ),
            ),
          ),
        ]);
        register_post_meta('page', 'trim_levels', [
            'type'         => 'array',
            'description'  => 'Model trim levels.',
            'single'       => true,
            'show_in_rest' => array(
              'schema' => array(
                'items' => array(
                  'type'       => 'object',
                  'properties' => array(
                    'title'    => array(
                      'type' => 'string',
                      'default' => 'titleee'
                    ),
                    'features' => array(
                      'type'   => 'array',
                      'default' => []
                    ),
                    'options' => array(
                      'type'   => 'object',
                      'properties' => array(
                        'engine'    => array(
                          'type' => 'string',
                          'default' => 'featuresss'
                        ),
                        'horse_power' => array(
                          'type'   => 'string',
                          'default' => 'horse_powerrr'
                        ),
                        'transmission' => array(
                          'type'   => 'string',
                          'default' => 'transmissionnn'
                        )
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ]);
    // else: 
    //     remove_post_type_support($key, 'source');
    // endif;

    //Post type Gallery
    // if (isset($post_types[$key]['fields']['gallery'])): 
        add_post_type_support($key, 'gallery');
        register_post_meta( $key, 'gallery_meta', array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        ) );
    // else: 
    //     remove_post_type_support($key, 'gallery');
    // endif;

    //Post type Attachment
    // if (isset($post_types[$key]['fields']['attachment'])): 
        add_post_type_support($key, 'attachment');
        register_post_meta( $key, 'attachment_meta', array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        ) );
    // else: 
    //     remove_post_type_support($key, 'attachment');
    // endif;

// }



// register_post_meta( 'post', '_metakey', [
//     'type'          => 'object',
//     'single'        => true,
//     'auth_callback' => '__return_true',
//     'show_in_rest'  => [
//         'schema' => [
//             'type'       => 'object',
//             'properties' => [
//                 'one' => [
//                     'type' => 'string',
//                 ],
//                 'two' => [
//                     'type' => 'string',
//                 ],
//             ],
//         ],
//     ],
// ]);


// function serialize_block( $block ) {
//     if ( ! isset( $block['blockName'] ) ) {
//         return false;
//     }
//     $name = $block['blockName'];
//     if ( 0 === strpos( $name, 'core/' ) ) {
//         $name = substr( $name, strlen( 'core/' ) );
//     }
//     if ( empty( $block['attrs'] ) ) {
//         $opening_tag_suffix = '';
//     } else {
//         $opening_tag_suffix = ' ' . json_encode( $block['attrs'] );
//     }
//     if ( empty( $block['innerHTML'] ) ) {
//         return sprintf(
//             '<!-- wp:%s%s /-->',
//             $name,
//             $opening_tag_suffix
//         );
//     } else {
//         return sprintf(
//             '<!-- wp:%1$s%2$s -->%3$s<!-- /wp:%1$s -->',
//             $name,
//             $opening_tag_suffix,
//             $block['innerHTML']
//         );
//     }
// }