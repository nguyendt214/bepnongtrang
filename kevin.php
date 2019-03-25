<?php
function wpshout_register_routes() {
    register_rest_route( 
        'kevinblack/v1',
        '/getInfo',
        array(
            'methods' => 'GET',
            'callback' => 'getInfo',
        )
    );
    register_rest_route( 
        'kevinblack/v1',
        '/getProducts',
        array(
            'methods' => 'GET',
            'callback' => 'getProducts',
        )
    );
    register_rest_route( 
        'kevinblack/v1',
        '/getUsers',
        array(
            'methods' => 'GET',
            'callback' => 'getUsers',
        )
    );

    register_rest_route( 
        'kevinblack/v1',
        '/getThucDonHomNay',
        array(
            'methods' => 'GET',
            'callback' => 'getThucDonHomNay',
        )
    );


    register_rest_route( 
        'kevinblack/v1',
        '/taoThucDon',
        array(
			'methods' => 'POST',
			'callback' => 'taoThucDon',
        )
    );
}

function getInfo() {
    
	$getfile = file_get_contents(plugin_dir_path( __FILE__ ).'/user.json');
	$jsonfile = json_decode($getfile, true);
	
	// Write json file
    /*
	$json_data = json_encode(array(
		'name' => 'Kevin'
	));
	file_put_contents(plugin_dir_path( __FILE__ ).'myfile.json', $json_data);
	*/
	return $jsonfile;
    //return new WP_REST_Response( $data, 200 );
}

function getProducts() {    
	$getfile = file_get_contents(plugin_dir_path( __FILE__ ).'/products.json');
	return json_decode($getfile, true);
}

function getUsers() {    
	$getfile = file_get_contents(plugin_dir_path( __FILE__ ).'/users.json');
	return json_decode($getfile, true);
}


function getThucDonHomNay() {
    $fileName = date('Y-m-d').'_thuc_don.json';
    $getfile = file_get_contents(plugin_dir_path( __FILE__ ).$fileName);
	return json_decode($getfile, true);
}


	/**
	 * Add a new Thuc Don
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
function taoThucDon($request) {
    if (empty($request->get_body())) {
        return new WP_Error( 'no_thuc_don', 'Invalid Thuc Don', array( 'status' => 400 ) );
    }
    $fileName = date('Y-m-d').'_thuc_don.json';
    file_put_contents(plugin_dir_path( __FILE__ ).$fileName, $request->get_body());    
    return $request->get_body();
	//return new WP_REST_Response( array( 'kevin' => 'Black'), 200 );
}
