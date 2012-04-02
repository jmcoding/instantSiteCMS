<?php

class page extends content{
	public $type;
	public $options;
	
	function __construct(){
		$this->type = 'page';
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
	
	function display($options=array()){
		global $controller, $model;
		if(empty($controller->isHome)){ //is home
			echo $model->template('home')->load();
		}
		else{
			echo $model->template('home') ->load();
		}
	}
}



return new page();

?>