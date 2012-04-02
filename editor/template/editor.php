<!-- instantSite CMS editor -->
<script type="text/javascript">
var rootUrl = '<?php echo $controller->rootUrl; ?>';
var file = '<?php echo $controller->file; ?>';
var folder = '<?php echo $controller->folder; ?>';
var editorUrl = '<?php echo $controller->rootUrl; ?>editor/';
</script>

<link href="<?php echo $controller->rootUrl; ?>editor/asset/jquery/themes/cupertino/jquery-ui-1.8.17.custom.css" type="text/css" rel="stylesheet" />
<script src="<?php echo $controller->rootUrl; ?>editor/asset/jquery/jquery-1.6.2.js" type="text/javascript"></script>
<script src="<?php echo $controller->rootUrl; ?>editor/asset/jquery/class/serializeJSON.js" type="text/javascript"></script>
<script src="<?php echo $controller->rootUrl; ?>editor/asset/jquery/ui/jquery-ui-1.8.16.custom.js" type="text/javascript"></script>
<script src="<?php echo $controller->rootUrl; ?>editor/asset/js/serialize.js" type="text/javascript"></script>
<script src="<?php echo $controller->rootUrl; ?>editor/asset/js/unserialize.js" type="text/javascript"></script>
<link href="<?php echo $controller->rootUrl; ?>editor/asset/css/index.css" type="text/css" rel="stylesheet" />
<script src="<?php echo $controller->rootUrl; ?>editor/asset/js/index.js" type="text/javascript"></script>
<!--bubble-->
<script src="<?php echo $controller->rootUrl; ?>editor/asset/js/bubble/jquery.bubblepopup.v2.3.1.min.js" type="text/javascript"></script>
<link href="<?php echo $controller->rootUrl; ?>editor/asset/js/bubble/jquery.bubblepopup.v2.3.1.css" rel="stylesheet" type="text/css" />


<?php echo $moduleHtml; ?>

<script type="text/javascript" src="<?php echo $controller->rootUrl; ?>editor/asset/jHtmlArea/scripts/jHtmlArea-0.7.0.js"></script>
<link rel="Stylesheet" type="text/css" href="<?php echo $controller->rootUrl; ?>editor/asset/jHtmlArea/style/jHtmlArea.css" />
<!-- /instantSite CMS editor -->