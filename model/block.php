<?php

class block extends content{
	public $type;
	public $options;
	
	function __construct(){
		$this->type = 'block';
		$this->options = array(
			'title'=>0
		);
	}
	
	function get($options=array()){
		$this->addFilters(array(
			'type'=>$this->type
		));
		return parent::get($options);
	}
}



return new block();

?>