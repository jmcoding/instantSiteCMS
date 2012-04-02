<?php

class menu{
	function get($options=array()){
		global $config, $model, $controller;
		$initOptions = array(
			'home'=>1,
			'root'=>1
		);
		$options = array_merge($initOptions, $options);
		$html = '<ul>';
		if($options['home'])$html .= '<li><a href="' . $controller->url . '">Home</a></li>';
		$menu = $model->page->get();
		foreach($menu as $row){
			$html .= '<li><a href="' . $controller->url . $row['name'] . '">' . $row['title'] . '</a></li>';
		}
		$html .= '</ul>';
		return $html;
	}
}



return new menu();

?>