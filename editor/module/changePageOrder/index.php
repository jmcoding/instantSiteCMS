<?php

class changePageOrder {
	function get(){
		global $controller, $model, $config, $ajax;
		$pageHeir = array();
		$pages = $model->page(array('parent'=>0))->get();
		foreach($pages as $page){
			$id = $page['id'];
			$children = $model->page(array('parent'=>$id))->get();
			if(!empty($children))$page['children'] = array();
			foreach($children as $child){
				$page['children'][] = $child;
			}
			$pageHeir[] = $page;
		}
		$ajax = $pageHeir;
	}
	function save($args){
		global $controller, $model, $config, $ajax;
		$x = 0;
		foreach($args as $item){
			$model->page(array(
				'id'=>$item['id']
			))->update(array(
				'orderIndex'=>$x,
				'parent'=>0,
				'visible'=>$item['visible']
			));
			$ajax[] = $item['id'];
			if(isset($item['children']) && is_array($item['children']) && !empty($item['children'])){
				$y = 0;
				foreach($item['children'] as $child){
					$model->page(array(
						'id'=>$child['id']
					))->update(array(
						'orderIndex'=>$y,
						'parent'=>$item['id'],
						'visible'=>$child['visible']
					));
					$y++;
				}
			}
			$x++;
		}
	}
}



return new changePageOrder();

?>