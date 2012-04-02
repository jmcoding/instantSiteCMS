<?php

class model{
	public function __get($name){
		global ${$name};
		return ${$name};
	}
	public function __call($name, $args){
		global ${$name};
		return ${$name}->invoke($args);
	}
}



return new model();

?>