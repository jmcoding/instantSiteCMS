<?php

class helloWorld {
	function create(){
		global $controller, $model, $config;
		$model->page(array(
			'name'=>'page1'
		))->update(array(
			'parent'=>0
		));
	}
}



return new addPage();

?>