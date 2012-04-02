<?php

class addPage {
	function save($args){
		global $controller, $model, $config, $ajax;
		extract($args);
		$name = $model->page->title2name($title);
		$id = $model->page->create(array(
			'parent'=>0,
			'title'=>$title,
			'name'=>$name
		));
		$ajax = $id;
	}
}



return new addPage();

?>