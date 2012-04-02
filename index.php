<?php

//........SESSION START
session_start();



//......DECLARE VARS
global $controller;
global $config;
global $page;
global $request;
global $html;
global $ajax;
//......INITIALIZE VARS
$ajax = array();



//.......USER CONFIG
$config = unserialize(file_get_contents('config.txt'));



//.......REQUEST AND SESSION VARIABLES
$request = $_REQUEST;
$session = $_SESSION;



//.......TEMP CONFIG OPERATIONS
$setConfig = 0;
if(isset($setConfig)){
	$tconfig = $config;
	$tconfig['sql']['db'] = 'instantSiteCMS';
	$tconfig = serialize($tconfig);
	file_put_contents('config.txt', $tconfig);
}



//.......CLASSES
$model = include('model/model.php');
$template = include('model/template.php');
$db = include('model/db.php');
$content = include('model/content.php');
$page = include('model/page.php');
$post = include('model/post.php');
$block = include('model/block.php');
$menu = include('model/menu.php');
$file = include('model/file.php');
$controller = include('controller/controller.php');



//.......SHIZAM!! http://i0.kym-cdn.com/photos/images/newsfeed/000/085/444/1282786204310.jpg?1318992465
// collect output
ob_start();
// run MVC system
$controller->init();
// output collected data
$html = ob_get_clean();



//........OUTPUT
if($controller->ajax)echo serialize($ajax);
else echo $html;

?>