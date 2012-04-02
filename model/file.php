<?php

class file{
	public $dir;
	
	function invoke($var){
		$this->dir = $var[0];
		return $this;
	}
	function listAll(){
		$dir = $this->dir;
		$list = array();
		if ($handle = opendir($dir)) {
			while (false !== ($entry = readdir($handle))) {
				if ($entry != "." && $entry != "..") {
					$list[] = $dir . $entry . '/';
				}
			}
			closedir($handle);
			return $list;
		}
	}
	function listFiles(){
		$dir = $this->dir;
		$list = $this->listAll();
		$newList = array();
		foreach($list as $value){
			if(is_file($value))$newList[] = $value;
		}
		return $newList;
	}
	function listFolders(){
		$dir = $this->dir;
		$list = $this->listAll();
		$newList = array();
		foreach($list as $value){
			if(is_dir($value))$newList[] = $value;
		}
		return $newList;
	}
}



return new file();

?>