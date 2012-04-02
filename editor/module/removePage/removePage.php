<ul class="menu">
<?php

function getFolderList($dir){
	global $_;
	$list = array();
	if ($handle = opendir($dir)) {
		while (false !== ($entry = readdir($handle))) {
			if ($entry != "." && $entry != ".." && is_dir($dir.$entry)) {
				$list[] = $entry;
			}
		}
		closedir($handle);
		return $list;
	}
}

$list = getFolderList('../../../content/pages/');
foreach($list as $folder){
	echo '<li dir="'. $folder .'">' . $folder;
	$list2 = getFolderList('../../../content/pages/' . $folder . '/');
	$html = '';
	foreach($list2 as $folder2){
		$html .= '<li dir="'. $folder . '/' . $folder2 .'">' . $folder2 . '</li>';
	}
	if(!empty($html))echo '<ul>' . $html . '</ul>';
	else echo $html;
	echo '</li>';
}

?>
</ul>
<br /><br /><br />
<div class="center small">Drag any item on top of the can to remove it.</div>
<div class="trashWrap"><div class="trash"></div></div>