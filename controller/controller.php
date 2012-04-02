<?php

class controller{
	public $requestUri;
	public $url;
	public $edit;
	public $ajax;
	
	function init(){
		$this->edit = 0;
		$this->ajax = 0;
		$this->getRoot();
		$this->getUri();
		$this->parseRequest();
		$this->control();
	}
	
	function getRoot(){
		global $config, $model, $controller;
		$this->rootName = $this->fixSlashes('http://' . $_SERVER['SERVER_NAME'], 0, 1);
		$this->rootDocument = $config['rootSlash'] . $this->fixSlashes($_SERVER['DOCUMENT_ROOT']);
		$this->rootPath = $this->fixSlashes($this->rootDocument . $config['installDirectory']);
		$this->rootUrl = $this->fixSlashes($this->rootName . $config['installDirectory']);
		$this->templateUrl = $this->rootUrl . 'template/' . $config['template'] . '/';
	}
	function getUri(){
		$this->requestUri = $_SERVER['REQUEST_URI'];
		$this->requestUri = $this->fixSlashes($this->requestUri);
		$this->url = $this->rootName . $this->requestUri;
	}
	function parseRequest(){
		$this->urlParse = parse_url($this->url);
		$this->host = $this->urlParse['host'];
		$this->path = $this->fixSlashes($this->urlParse['path']);
		$this->scheme = $this->urlParse['scheme'];
		$this->file = $this->rootDocument . $this->path;
		$this->folder = dirname($this->file);
		$this->fileName = basename($this->file);
		$this->dirName = basename($this->folder);
		$this->cleanUrl = $this->rootName . $this->path;
		$this->parentUrl = $this->rootName . $this->fixSlashes(dirname($this->path));
	}
	function control(){
		global $config, $model, $controller, $request;
		$this->requestPath = $this->fixSlashes(str_replace($config['installDirectory'], '', $this->path), 0, 0);
		$input = explode('/', $this->requestPath);
		if(isset($request['edit']))$this->edit = 1;
		if(isset($request['ajax']))$this->ajax = 1;
		if(empty($this->requestPath)){ //is home
			$this->isHome = 1;
		}
		else{
			$this->isHome = 0;
		}
		if(!empty($this->requestPath)){
			echo $model->page(array('name'=>$input[0]))->display();
		}
		else{
			if($this->edit)include($controller->rootPath . 'editor/index.php');
		}
	}
	
	function fixSlashes($string, $startSlash=0, $endSlash=1){
		$string = preg_replace('/^[\\\]*/', '/', $string);
		$string = preg_replace('/^[\/]*/', '', $string);
		$string = preg_replace('/^[\/]/', '', $string);
		$string = preg_replace('/[\/]$/', '', $string);
		if($startSlash)$string = '/' . $string;
		if($endSlash)$string = $string . '/';
		return $string;
	}
}



return new controller();

?>