<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $config['title']; ?></title>
		<!-- jquery stuff -->
		<link href="<?php echo $site->url; ?>asset/js/jquery/themes/ui-darkness/jquery.ui.all.css" type="text/css" rel="stylesheet" />
		<script src="<?php echo $site->url; ?>asset/js/jquery/jquery-1.6.2.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/ui/jquery.ui.core.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/ui/jquery.ui.position.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/ui/jquery.ui.widget.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/ui/jquery.ui.mouse.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/ui/jquery.ui.draggable.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/ui/jquery.ui.dialog.js" type="text/javascript"></script>
		<script src="<?php echo $site->url; ?>asset/js/jquery/classes/serializeJSON.js" type="text/javascript"></script>
		
		<!--other-->
		<script src="<?php echo $site->url; ?>asset/js/script.js" type="text/javascript"></script>
		<link href="<?php echo $site->url; ?>asset/css/class.css" type="text/css" rel="stylesheet" />
		<link href="<?php echo $site->url; ?>asset/css/style.css" type="text/css" rel="stylesheet" />
		<?php instantSite(); ?>
	</head>
	<body>
		
		<div id="page"><div id="pageBlock">
			<div id="header"><?php echo block('header'); ?></div>
	
	
			<div id="menu" class="fixfloat"><?php echo rootMenu(); ?></div>
			<div id="middle">
				<div id="side" class="right"><?php echo block('side', 1); ?></div>
				
				<div id="content" class=""><?php echo page($request->pageName . '/content/side', 1); ?><br style="clear:both" /></div>
			</div>
	
			<div id="footer" class=""><?php echo block('footer'); ?></div>
		</div></div>
		
	</body>
</html>