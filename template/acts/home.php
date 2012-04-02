<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $config['title']; ?></title>
		<!--other-->
		<link href="<?php echo $controller->templateUrl; ?>asset/css/class.css" type="text/css" rel="stylesheet" />
		<link href="<?php echo $controller->templateUrl; ?>asset/css/style.css" type="text/css" rel="stylesheet" />
		<link href="<?php echo $controller->templateUrl; ?>asset/css/<?php echo $config['style']; ?>.css" id="customStyle" type="text/css" rel="stylesheet" />
		<?php if($controller->edit)include($controller->rootPath . 'editor/index.php'); ?>
	</head>
	<body>
		
		<div id="page"><div id="pageContent">
			
			<div id="social"><div id="socialContent">
				<a href="#" id="twitter">&nbsp;</a>
				<a href="#" id="facebook">&nbsp;</a>
				<a href="#" id="rss">&nbsp;</a>
			</div></div>

			<div id="header"><div id="headerContent">
				<h1 id="title"><a href="/"><?php echo $config['title'] ?></a></h1>
				<span id="subtitle"><?php echo $config['subtitle'] ?></span>
			</div></div>
			
			<div id="menu" class="fixfloat"><div id="menuContent"><?php echo $model->menu->get(); ?></div></div>
	
			<div id="middle"><div id="middleContent">
				<div id="content" class="wide"><div id="contentContent"><?php $model->post->display(array('title'=>1)); ?><br style="clear:both" /></div></div>
			</div></div>
			
			<div id="bottom" class=""><div id="bottomContent">
				<?php $model->block(array('name'=>'bottom'))->display(); ?>
			</div></div>
	
			<div id="footer" class=""><div id="footerContent">
				<span id="copyright"><?php echo $config['copyright'] ?></span>
				<span id="poweredBy">powered by <a href="<?php echo $config['poweredByUrl'] ?>"><?php echo $config['poweredBy'] ?></a></span>
			</div></div>
		</div></div>
		
	</body>
</html>