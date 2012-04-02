<?php

class content{
	public $parent;
	public $type;
	public $name;
	public $options;
	public $filters;
	public $newFilters;
	public $filtersStr;
	
	function __construct(){
		$this->parent = '';
		$this->name = '';
		$this->type = '';
		$this->options = array(
			'title'=>0
		);
		$this->filters = array(
			'parent'=>0
		);
		$this->setFilters();
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
	
	function setFilters($filters=array()){
		global $controller, $model;
		$this->filters = $filters;
		$this->filtersStr = $model->db->filterArray2string($this->filters);
	}
	function addFilters($filters=array()){
		if(!isset($this->filters))$this->filters = array(
			'parent'=>0
		);
		$filters = array_merge($this->filters, $filters);
		$this->setFilters($filters);
	}
	function getOptions($options=array()){
		$options = array_merge($this->options, $options);
		return $options;
	}
	
	function get($options=array()){
		global $controller, $model, $config;
		$options = $this->getOptions($options);
		$rows = $model->db->getRow(array(
			'table' => $config['sql']['contentTable'],
			'row' => '*',
			'orderby' => 'orderIndex',
			'where' => $this->filtersStr
		));
		$rowsArray = array();
		if(mysql_num_rows($rows)){
			while($each = mysql_fetch_assoc($rows)){
				$rowsArray[] = $each;
			}
		}
		return $rowsArray;
	}
	function display($options=array()){
		global $controller, $model;
		$options = $this->getOptions($options);
		$all = $this->get($options);
		foreach($all as $each){
			extract($each);
			include($model->template($this->type)->getPath());
		}
	}
	
	function create($value=array()){
		global $controller, $model, $config;
		$value['type'] = $this->type;
		$id = $model->db->createRow(array(
			'table' => $config['sql']['contentTable'],
			'row' => '*',
			'value' => $value
		));
		return $id;
	}
	
	function update($value=array()){
		global $controller, $model, $config;
		$model->db->updateRow(array(
			'table' => $config['sql']['contentTable'],
			'row' => '*',
			'where' => $this->filtersStr,
			'value' => $value
		));
	}
	
	function remove($value=array()){
		global $controller, $model, $config;
		$model->db->removeRow(array(
			'table' => $config['sql']['contentTable'],
			'where' => $this->filtersStr
		));
	}
	
	function title2name($title){
		global $controller, $model, $config;
		$name = preg_replace('/ /', '-', $title);
		$name = preg_replace('/[^a-zA-Z0-9-]*/', '', $name);
		return $name;
	}
}



return new content();

?>