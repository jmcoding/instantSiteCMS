<?php

class editor{
	public $path;
	
	function __construct(){
		global $controller, $model, $config;
		$this->path = $controller->rootPath . 'editor/';
		$moduleHtml = '';
		foreach($this->extend() as $module){
			$moduleHtml .= '<script src="' . $controller->rootUrl . 'editor/module/' . basename(dirname($module)) . '/index.js" type="text/javascript"></script>' . "\n";
		}
		if(!$controller->ajax)include($this->path . 'template/editor.php');
	}
	public function __get($name){
		global $controller, $model;
		return $model->{$name};
	}
	public function __call($name, $args){
		global $controller, $model;
		return $model->{$name}($args);
	}
	function invoke($args){
		$filters = $args[0];
		$this->setFilters($filters);
		return $this;
	}
	
	function extend(){
		global $controller, $model, $config;
		$list = array();
		foreach($model->file('editor/module/')->listFolders() as $folder){
			$classPath = $folder . 'index.php';
			if(file_exists($classPath))$list[] = $classPath;
		}
		return $list;
	}
}



return new editor();

?>