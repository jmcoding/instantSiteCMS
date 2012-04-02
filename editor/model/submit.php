<?php

extract($_REQUEST);



function title2name($title){
	$title = preg_replace('/^[^a-zA-Z]*[^a-zA-Z0-9]*/', '', $title);
	return $title;
}



if(isset($addPage)){
	extract($addPage);
	$name = title2name($title);
	$path = '../../content/pages/content/' . $name . '/';
	//create dir
	mkdir($path);
	//create data file
	$dataPath = $path . '/_.php';
	$data = array(
		'index'=>'0',
		'title'=>$title,
		'tags'=>array(),
		'type'=>$type,
		'layout'=>$layout,
	);
	$data = serialize($data);
	file_put_contents($dataPath, $data);
	//create base content dir
	mkdir($path . '/content');
	//create content dir
	mkdir($path . '/content/content');
	mkdir($path . '/content/content/content');
	//create content data file
	$dataPath = $path . '/content/content/content/_.php';
	$data = array(
		'index'=>'0',
		'title'=>$title,
		'tags'=>array(),
		'type'=>$type,
	);
	$data = serialize($data);
	file_put_contents($dataPath, $data);
	//create content block1 dir
	mkdir($path . '/content/content/content');
	mkdir($path . '/content/content/content/block1');
	//create content block1 index
	$indexPath = $path . '/content/content/content/block1/index.php';
	$index = '';
	file_put_contents($indexPath, $index);
	//create content block1 data file
	$dataPath = $path . '/content/content/content/block1/_.php';
	$data = array(
		'index'=>'0',
		'title'=>$title,
		'tags'=>array(),
		'type'=>$type,
	);
	$data = serialize($data);
	file_put_contents($dataPath, $data);
	//create sidebar dir
	mkdir($path . '/content/side');
	mkdir($path . '/content/side/content');
	//create sidebar index
	$indexPath = $path . '/content/side/content/index.php';
	$index = '';
	file_put_contents($indexPath, $index);
	//create sidebar data file
	$dataPath = $path . '/content/side/content/_.php';
	$data = array(
		'index'=>'0',
		'title'=>$title,
		'tags'=>array(),
		'type'=>$type,
	);
	$data = serialize($data);
	file_put_contents($dataPath, $data);
	//create sidebar block1 dir
	mkdir($path . '/content/side/block1');
	mkdir($path . '/content/side/block1/content');
	//create sidebar block1 index
	$indexPath = $path . '/content/side/content/block1/index.php';
	$index = '';
	file_put_contents($indexPath, $index);
	//create sidebar block1 data file
	$dataPath = $path . '/content/side/content/block1/_.php';
	$data = array(
		'index'=>'0',
		'title'=>$title,
		'tags'=>array(),
		'type'=>$type,
	);
	$data = serialize($data);
	file_put_contents($dataPath, $data);
}
else if(isset($removePage)){
function recursive_remove_directory($directory, $empty=FALSE)
	{
		if(substr($directory,-1) == '/')
		{
			$directory = substr($directory,0,-1);
		}
		if(!file_exists($directory) || !is_dir($directory))
		{
			return FALSE;
		}elseif(is_readable($directory))
		{
			$handle = opendir($directory);
			while (FALSE !== ($item = readdir($handle)))
			{
				if($item != '.' && $item != '..')
				{
					$path = $directory.'/'.$item;
					if(is_dir($path)) 
					{
						recursive_remove_directory($path);
					}else{
						unlink($path);
					}
				}
			}
			closedir($handle);
			if($empty == FALSE)
			{
				if(!rmdir($directory))
				{
					return FALSE;
				}
			}
		}
		return TRUE;
	}
	foreach($removePage as $dir){
		$path = '../../content/pages/content/' . $dir . '/';
		recursive_remove_directory($path);
	}
}
else if(isset($changePageOrder)){
	function full_copy( $source, $target ) {
		if ( is_dir( $source ) ) {
			@mkdir( $target );
			$d = dir( $source );
			while ( FALSE !== ( $entry = $d->read() ) ) {
				if ( $entry == '.' || $entry == '..' ) {
					continue;
				}
				$Entry = $source . '/' . $entry; 
				if ( is_dir( $Entry ) ) {
					full_copy( $Entry, $target . '/' . $entry );
					continue;
				}
				copy( $Entry, $target . '/' . $entry );
			}
	 
			$d->close();
		}else {
			copy( $source, $target );
		}
	}
	function page_copy( $source, $target ) {
		if ( is_dir( $source ) ) {
			@mkdir( $target );
			$d = dir( $source );
			while ( FALSE !== ( $entry = $d->read() ) ) {
				if ( $entry == '.' || $entry == '..' ) {
					continue;
				}
				$Entry = $source . '/' . $entry; 
				if ( is_dir( $Entry ) ) {
					if(!is_dir($Entry))page_copy( $Entry, $target . '/' . $entry );
					continue;
				}
				copy( $Entry, $target . '/' . $entry );
			}
	 
			$d->close();
		}else {
			copy( $source, $target );
		}
	}
	// ------------ lixlpixel recursive PHP functions -------------
	// recursive_remove_directory( directory to delete, empty )
	// expects path to directory and optional TRUE / FALSE to empty
	// ------------------------------------------------------------
	function recursive_remove_directory($directory, $empty=FALSE)
	{
		if(substr($directory,-1) == '/')
		{
			$directory = substr($directory,0,-1);
		}
		if(!file_exists($directory) || !is_dir($directory))
		{
			return FALSE;
		}elseif(is_readable($directory))
		{
			$handle = opendir($directory);
			while (FALSE !== ($item = readdir($handle)))
			{
				if($item != '.' && $item != '..')
				{
					$path = $directory.'/'.$item;
					if(is_dir($path)) 
					{
						recursive_remove_directory($path);
					}else{
						unlink($path);
					}
				}
			}
			closedir($handle);
			if($empty == FALSE)
			{
				if(!rmdir($directory))
				{
					return FALSE;
				}
			}
		}
		return TRUE;
	}
	$oldpath = '../../content/pages/content/';
	$temppath = '../../content/pages/content' . rand() . '/';
	mkdir($temppath);
	foreach($changePageOrder as $dir){
		$dir1 = $dir[0];
		$name = basename($dir1);
		$from = $oldpath . $dir1 . '/';
		$to = $temppath . $name . '/';
		page_copy($from, $to);
		if(isset($dir[1])){
			foreach($dir[1] as $dir2){
				$name2 = basename($dir2);
				$from = $oldpath . $dir2 . '/';
				$to = $temppath . $name . '/' . $name2 . '/';
				page_copy($from, $to);
			}
		}
	}
	recursive_remove_directory($oldpath);
	//mkdir($oldpath);
	//chmod($oldpath, 0755);
	full_copy($temppath, $oldpath);
	recursive_remove_directory($temppath);
}
else if(isset($changeColors)){
	extract($changeColors);
	file_put_contents('../../config/customStyle.txt', $id);
}
else if(isset($addContent)){
	extract($addContent);
	$name = trim($name);
	if(empty($name))$name = rand();
	mkdir('../../content/' . $blockid . '/' . $name);
	if($type=='text'){
		//move along
	}
	file_put_contents('../../content/' . $blockid . '/' . $name . '/index.php', $content);
	file_put_contents('../../content/' . $blockid . '/' . $name . '/_.php', serialize(array('index'=>0,'title'=>$name)));
}
else if(isset($editContent)){
	extract($editContent);
	$title = trim($title);
	if(empty($title))$title = rand();
	mkdir('../../content/' . $blockid . '/' . $contentid);
	if($type=='text'){
		//move along
	}
	file_put_contents('../../content/' . $blockid . '/' . $contentid . '/index.php', $content);
	$info = file_get_contents('../../content/' . $blockid . '/' . $contentid . '/_.php');
	$info = unserialize($info);
	$info['title'] = $title;
	$info = serialize($info);
	file_put_contents('../../content/' . $blockid . '/' . $contentid . '/_.php', $info);
}
else if(isset($getContent)){
	extract($getContent);
	$content = file_get_contents('../../content/' . $blockid . '/' . $contentid . '/index.php');
	$info = file_get_contents('../../content/' . $blockid . '/' . $contentid . '/_.php');
	$info = unserialize($info);
	echo serialize(array(
		'content'=>$content,
		'info'=>$info,
	));
}
else if(isset($removeContentBlock)){
	extract($removeContentBlock);
	function removeFile($file){
		chmod($file, 755);
		unlink($file);
	}
	function removeFolder($folder){
		chmod($folder, 755);
		rmdir($folder);
	}
	removeFile('../../content/' . $parentId . '/' . $id . '/index.php');
	removeFile('../../content/' . $parentId . '/' . $id . '/_.php');
	removeFolder('../../content/' . $parentId . '/' . $id);
}
else if(isset($contentBlockOrder)){
	extract($contentBlockOrder);
	$path = '../../content/' . $parentId . '/';
	$i = 0;
	foreach($list as $file){
		$pipes = file_get_contents($path . $file . '/_.php');
		$pipes = unserialize($pipes);
		$pipes['index'] = $i;
		$pipes = serialize($pipes);
		file_put_contents($path . $file . '/_.php', $pipes);
		$i++;
	}
}
else if(isset($changePageName)){
	extract($changePageName);
	if(!empty($dirName))$dirName = $dirName . '/';
	if(!empty($pageName))$pageName = $pageName . '/';
	$path = '../../content/pages/content/' . $dirName . $pageName;
	$info = file_get_contents($path . '_.php');
	$info = unserialize($info);
	$info['title'] = $title;
	$info = serialize($info);
	file_put_contents($path . '/_.php', $info);
	$newPageName = title2name($title);
	echo $newPageName;
	$newPath = '../../content/pages/content/' . $dirName . $newPageName;
	rename($path, $newPath);
}

?>