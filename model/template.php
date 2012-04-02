<?php

class template{
	public $dir;
	
	function invoke($args){
		$this->dir = $args[0];
		return $this;
	}
	function resetDir(){
		$this->dir = '';
	}
	function load(){
		global $config, $model, $controller;
		$name = $this->dir;
		$value = include('template/' . $config['template'] . '/' . $name . '.php');
		return $value;
	}
	function getPath(){
		global $config, $model, $controller;
		$name = $this->dir;
		$value = 'template/' . $config['template'] . '/' . $name . '.php';
		return $value;
	}
}



return new template();

?>