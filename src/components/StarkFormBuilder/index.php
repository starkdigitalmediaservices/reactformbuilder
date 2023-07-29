<?php
$args = array(
    'post_type' => 'post',
    'tax_query' => array(
    'relation' => 'OR',
    array(
    'taxonomy' => 'category',
    'field' => 'slug',
    'terms' => array( 'quotes' ),
    ),
    array(
    'relation' => 'AND',
    array(
    'taxonomy' => 'post_format',
    'field' => 'slug',
    'terms' => array( 'post-format-quote' ),
    ),
    array(
    'taxonomy' => 'category',
    'field' => 'slug',
    'terms' => array( 'wisdom' ),
    ),
    ),
    ),
    );
    $query = new WP_Query( $args );
?>