<?php

class db{
	public $sql;
	
	function __construct(){
		global $controller, $method, $config;
		include('class/sql.php');
		$this->sql = new sql();
		$this->sql->connect(array(
			'host'=>$config['sql']['connect']['host'],
			'user'=>$config['sql']['connect']['user'],
			'pass'=>$config['sql']['connect']['pass']
		));
		$this->sql->db($config['sql']['db']);
	}
	
	public function __get($name){
		return $this->sql;
	}
	public function __call($method, $args){
		return $this->sql->{$method}($args[0]);
	}
	
	public function filterArray2string($array){
		$filterJoin = array();
		foreach($array as $name=>$value)$filterJoin[] = $name . '="' . $value . '"';
		$filterStr = implode(' AND ', $filterJoin);
		return $filterStr;
	}
}



return new db();

?>
