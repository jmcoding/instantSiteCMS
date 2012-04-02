<?php

//...INITIALIZE EDITOR
global $editor, $request;
$editor = include('model/editor.php');

//...LOAD MODULES
foreach($editor->extend() as $file){
	$name = basename(dirname($file));
	global ${$name};
	${$name} = include($file);
}

//...DO ACTIONS
extract($request);
if(!isset($args))$args = array();
if(isset($module) && isset($action)){
	$editor->{$module}->{$action}($args);
}

?>