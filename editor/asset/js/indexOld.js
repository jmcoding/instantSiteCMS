var IS = {
	url: siteUrl + 'edit/',
	dialogs: ['addPage1','addPage2','addPage3','addPage4','removePage','changePageOrder','changeColors','addContent1','addContent2','addContentText','editContentText','changePageLayout','changePageName','addDocument','addImage','addLink'],
	data:{
		addPage:{},
		removePage:[],
		changePageOrder:{},
		addContent:{},
		editContent:{},
		removeContentBlock:{},
		moveContentBlockUp:{},
		moveContentBlockDown:{},
		contentBlockOrder:{},
		changePageName:{},
		getContent:{},
	},
	
	init: function(){
		IS.initMenu();
	},
	initMenu: function(){
		IS.loadHtml('bar', function(){
			$('#ISMenuBlock li a').each(function(){
				$(this).click(function(e){
					e.preventDefault();
					var id = $(this).attr('href').replace('#','');
					IS.loadMenu(id);
					return false;
				});
			});
			IS.loadMenu('SiteEditor');
			$('#ISSubMenu li').each(function(){
				$(this).click(function(e){
					var action = $(this).attr('class');
					IS.actions[action]();
				});
			});
		});
	},
	loadMenu: function(id){
		$('#ISMenu li').removeClass('selected');
		$('#ISSubMenu ul').removeClass('selected');
		$('#ISMenu .' + id).addClass('selected');
		$('#ISSubMenu .' + id).addClass('selected');
	},
	loadHtml: function(id, CB){
		if(!(typeof CB).toLowerCase()=='function')CB = function(){};
		var url = IS.url + 'asset/dialog/' + id + '.php';
		$.ajax({
			url: url,
			success: function(d){
				d = '<div id="IS' + id + '">' + d + '</div>';
				$('body').append($(d));
				CB();
			}
		});
	},
	submit: function(id, CB){
		if(!(typeof CB).toLowerCase()=='function')CB = function(){};
		var url = IS.url + 'asset/submit.php';
		var data = {};
		data[id] = IS.data[id];
		$.ajax({
			url: url,
			data: data,
			success: function(d){
				CB(d);
			}
		});
	},
	updateData: function(data, dialog){
		if(dialog==undefined)dialog = data;
		$.extend(IS.data[data], IS.dialog.getData(dialog));
	},
	dialog: {
		create: function(id, CB){
			if(!(typeof CB).toLowerCase()=='function')CB = function(){};
			IS.loadHtml(id, function(){
				$('#IS' + id).dialog({
					modal:true,
					width:800,
					height:400,
				});
				CB(id);
			});
		},
		show: function(id, options){
			if(!options || options==undefined)options = {};
			$('#IS' + id).dialog('option', options);
			$('#IS' + id).dialog('open');
			$('.ui-widget-overlay').click(function(){
				$('#IS' + id).dialog('close');
			});
		},
		hide: function(id){
			$('#IS' + id).dialog('close');
		},
		get: function(id){
			return $('#IS' + id);
		},
		getData: function(id){
			var o = $('#IS' + id).find('form').serializeJSON();
			return o;
		}
	},
	initDialogs: function(){
		for(var x in IS.dialogs){
			var id = IS.dialogs[x];
			IS.dialog.create(id, function(id2){
				IS.dialog.hide(id2);
				if(id2==IS.dialogs[IS.dialogs.length-1]){
					for(var x in IS.initDialog)IS.initDialog[x]();
				}
			});
		}
	},
	initDialog: {
		removePage: function(){
			IS.dialog.get('removePage').find('.menu li').draggable({revert:'invalid'});
			IS.dialog.get('removePage').find('.trash').droppable({
				drop: function(event, ui){
					if(confirm('You sure about that?')){
						IS.data.removePage.push(ui.draggable.attr('dir'));
						ui.draggable.remove();
					}
					else return false;
				}
			});
		},
		changePageOrder: function(){
			IS.dialog.get('changePageOrder').find('.menu').sortable({
				connectWith: "#ISchangePageOrder .menu ul",
				start:function(event, ui){
					ui.item.before($('<li class="placeholder"></li>'));
				},
				update:function(event, ui){
					if(ui.item.parent().hasClass('subLevel')){
						var submenuFirstLi = ui.item.find('ul >li:nth-child(1)').clone();
						var submenu = ui.item.find('ul').remove().clone();
						submenu.find('li:nth-child(1)').remove();
						submenuFirstLi.append(submenu);
						IS.dialog.get('changePageOrder').find('.menu').find('.placeholder').after(submenuFirstLi);
					}
				},
				stop:function(event, ui){
					IS.dialog.get('changePageOrder').find('.menu').find('.placeholder').remove();
					IS.initDialog.changePageOrder();
				}
			}).disableSelection();
			IS.dialog.get('changePageOrder').find('.menu ul').sortable({
				connectWith: "#ISchangePageOrder .menu, #ISchangePageOrder .menu ul",
				stop:function(event, ui){
					IS.initDialog.changePageOrder();
				}
			}).disableSelection();
		},
		changeColors: function(){
			IS.dialog.get('changeColors').find('input').bind('click', function(e){
				e.preventDefault();
				IS.dialog.get('changeColors').find('input').removeClass('selected');
				$(this).addClass('selected');
				IS.data.changeColors = IS.dialog.getData('changeColors');
				var link = document.createElement('link');
				link.href = 'asset/css/' + IS.data.changeColors.id + '.css';
				link.type = 'text/css';
				link.rel = 'stylesheet';
				document.getElementsByTagName('head')[0].appendChild(link);
				$('<div>Save Changes?</div>').dialog({
					modal: false,
					position:['right', 'bottom'],
					buttons:{
						'Yes, save changes' : function(){
							var t = this;
							IS.submit('changeColors', function(){
								$(t).dialog('destroy');
							});
						},
						'No, cancel' : function(){
							$(link).remove();
							$(this).dialog('destroy');
						},
					},
					close: function(){
						$(this).dialog('destroy');
					}
				});
				IS.dialog.hide('changeColors');
				return false;
			});
		},
		addContent: function(){
			$('.block').append($('<div class="block-add">Add Content</div>'));
			$('.block .block-add').click(function(){
				var blockname = $(this).parent().attr('id').replace('Block','');
				IS.data.addContent.blockid = blockname;
				IS.actions.addContent1();
			});
		},
		controlsContentBlock: function(){
			$('.block-content-controls').remove();
			$('.block-content-overlay').remove();
			$('.block-content').append($('<div class="block-content-overlay">[Click to Edit]</div>'));
			$('.block-content').append($('<div class="block-content-controls"></div>'));
			$('.block-content-controls').append($('<div class="block-content-remove">x</div>'));
			// $('.block-content-controls').append($('<div class="block-content-move-up">^</div>'));
			// $('.block-content-controls').append($('<div class="block-content-move-down">v</div>'));
			$('.block-content-overlay').click(function(){
				var $content = $(this).parent();
				var $block = $content.parent();
				var blockName = $block.attr('id').replace('Block','');
				var contentName = $content.attr('id').replace(blockName + 'Block','').replace('BlockContent','');
				IS.data.editContent.blockid = blockName;
				IS.data.editContent.contentid = contentName;
				IS.actions.editContent();
			});
			$('.block-content-remove').click(function(){
				$blockContent = $(this);
				var blockName = $(this).parent().parent().parent().attr('id').replace('Block','');
				var blockContentName = $(this).parent().parent().attr('id').replace(blockName + 'Block','').replace('BlockContent','');
				IS.data.removeContentBlock.parentId = blockName;
				IS.data.removeContentBlock.id = blockContentName;
				$('<div>Are you sure you want to remove this block?</div>').dialog({
					modal:true,
					buttons:{
						'yes, i\'m sure':function(){
							$(this).dialog('close');
							IS.submit('removeContentBlock', function(){
								$blockContent.parent().parent().remove();
							});
						},
						'no, i\m not sure': function(){
							$(this).dialog('close');
						}
					},
					close:function(){
						$(this).dialog('destroy');
					}
				});
			});
			// $('.block-content-move-up').click(function(){
				// $blockContent = $(this).parent().parent();
				// var blockName = $blockContent.parent().attr('id').replace('Block','');
				// var blockContentName = $blockContent.attr('id').replace(blockName + 'Block','').replace('BlockContent','');
				// IS.data.moveContentBlockUp.parentId = blockName;
				// IS.data.moveContentBlockUp.id = blockContentName;
				// IS.submit('moveContentBlockUp', function(){
					// if($blockContent.prev()[0]){
						// $prev = $blockContent.prev();
						// $clone = $blockContent.remove().clone();
						// $prev.before($clone);
						// IS.initDialog.controlsContentBlock();
						// IS.data.contentBlockOrder.parentId = blockName;
						// IS.actions.contentBlockOrder();
					// }
				// });
			// });
			// $('.block-content-move-down').click(function(){
				// $blockContent = $(this).parent().parent();
				// var blockName = $blockContent.parent().attr('id').replace('Block','');
				// var blockContentName = $blockContent.attr('id').replace(blockName + 'Block','').replace('BlockContent','');
				// IS.data.moveContentBlockDown.parentId = blockName;
				// IS.data.moveContentBlockDown.id = blockContentName;
				// IS.submit('moveContentBlockDown', function(){
					// if($blockContent.next()[0]){
						// $next = $blockContent.next();
						// $clone = $blockContent.remove().clone();
						// $next.after($clone);
						// IS.initDialog.controlsContentBlock();
						// IS.data.contentBlockOrder.parentId = blockName;
						// IS.actions.contentBlockOrder();
					// }
				// });
			// });
			$('.block').sortable({
				items:'.block-content',
				update:function(e, ui){
					$blockContent = ui.item;
					var blockName = $blockContent.parent().attr('id').replace('Block','');
					IS.data.contentBlockOrder.parentId = blockName;
					IS.actions.contentBlockOrder();
				}
			});
		},
	},
	actions: {
		removePage: function(){
			IS.dialog.show('removePage', {
				buttons:{
					'cancel': function(){
						IS.data.removePage = [];
						IS.dialog.hide('removePage');
					},
					'save changes': function(){
						IS.submit('removePage', function(d){
							IS.data.removePage = [];
							IS.dialog.hide('removePage');
						});
					}
				}
			});
		},
		changePageOrder: function(){
			IS.dialog.show('changePageOrder', {
				buttons:{
					'cancel': function(){
						IS.dialog.hide('changePageOrder');
					},
					'save changes': function(){
						IS.data.changePageOrder = [];
						IS.dialog.get('changePageOrder').find('.menu >li').each(function(){
							var children = [];
							$(this).find('ul >li').each(function(){
								children.push($(this).attr('dir'));
							});
							IS.data.changePageOrder.push([$(this).attr('dir'), children]);
						});
						IS.submit('changePageOrder', function(d){
							alert(d);
							IS.data.changePageOrder = [];
							IS.dialog.hide('changePageOrder');
						});
					}
				}
			});
		},
		changeColors: function(){
			IS.dialog.show('changeColors', {
				buttons:{
					'cancel': function(){
						IS.dialog.hide('changeColors');
					}
				}
			});
		},
		addContent1: function(){
			IS.dialog.show('addContent1', {
				width:400,
				height:230,
				title:'Step 1: Enter a Title For The Block(optional)',
				buttons:{
					'cancel': function(){
						IS.dialog.hide('addContent1');
					},
					'next >': function(){
						$.extend(IS.data.addContent, IS.dialog.getData('addContent1'));
						IS.dialog.hide('addContent1');
						IS.actions.addContent2();
					},
				}
			});
		},
		addContent2: function(){
			IS.dialog.get('addContent2').find('input').bind('click', function(e){
				e.preventDefault();
				$(this).addClass('selected');
				$.extend(IS.data.addContent, IS.dialog.getData('addContent2'));
				IS.dialog.hide('addContent2');
				IS.actions.addContentType();
				return false;
			});
			IS.dialog.show('addContent2', {
				width:400,
				modal:true,
				height:230,
				buttons:{
					'< back': function(){
						IS.dialog.hide('addContent2');
						IS.actions.addContent1();
					},
					'cancel': function(){
						IS.dialog.hide('addContent2');
					}
				}
			});
		},
		addContentType: function(){
			var transformedtextwithalongvariablename = IS.data.addContent.type.substring(0,1).toUpperCase() + IS.data.addContent.type.substring(1, IS.data.addContent.type.length);
			IS.actions['addContent' + transformedtextwithalongvariablename]();
		},
		addContentText: function(){
			IS.dialog.show('addContentText', {
				width:780,
				height:460,
				modal:true,
				buttons:{
					cancel:function(){
						$(this).dialog('close');
					},
					save:function(){
						IS.data.addContent.content = $("#ISaddContentText textarea").htmlarea('toHtmlString');
						IS.actions.addContentSubmit();
					}
				}
			});
			$("#ISaddContentText textarea").val('');
			$("#ISaddContentText textarea").htmlarea();
		},
		addContentSubmit: function(){
			IS.submit('addContent', function(d){
				alert(d);
				IS.data.addContent = {};
			});
		},
		editContent: function(){
			IS.data.getContent.blockid = IS.data.editContent.blockid;
			IS.data.getContent.contentid = IS.data.editContent.contentid;
			IS.submit('getContent', function(d){
				d = unserialize(d);
				IS.data.editContent.content = d.content;
				IS.data.editContent.info = d.info;
				IS.actions.editContentText();
			});
		},
		editContentText: function(){
			IS.dialog.show('editContentText', {
				width:780,
				modal:true,
				height:460,
				modal:true,
				buttons:{
					cancel:function(){
						$(this).dialog('close');
					},
					save:function(){
						IS.data.editContent.title = $("#ISeditContentText input[name=title]").val();
						IS.data.editContent.content = $("#ISeditContentText textarea").htmlarea('toHtmlString');
						IS.actions.editContentSubmit();
					}
				}
			});
			$("#ISeditContentText input[name=title]").val(IS.data.editContent.info.title);
			$("#ISeditContentText textarea").htmlarea('dispose');
			$("#ISeditContentText textarea").val(IS.data.editContent.content);
			$("#ISeditContentText textarea").htmlarea();
		},
		editContentSubmit: function(){
			IS.submit('editContent', function(d){
				IS.data.editContent = {};
			});
		},
		contentBlockOrder: function(){
			var list = [];
			var parentId = IS.data.contentBlockOrder.parentId;
			$('#' + parentId + 'Block').find('.block-content').each(function(i){
				var id = $(this).attr('id').replace(parentId + 'Block','').replace('BlockContent','');
				list.push(id);
			});
			IS.data.contentBlockOrder.list = list;
			IS.submit('contentBlockOrder', function(d){
				IS.data.contentBlockOrder = {};
			});
		},
		changePageName: function(){
			IS.dialog.show('changePageName', {
				width:400,
				height:230,
				modal:true,
				title:'Enter a Title For Your Page',
				buttons:{
					'cancel': function(){
						IS.dialog.hide('changePageName');
					},
					'save': function(){
						$.extend(IS.data.changePageName, IS.dialog.getData('changePageName'));
						IS.dialog.hide('changePageName');
						IS.data.changePageName.dirName = dirName;
						IS.data.changePageName.pageName = pageName;
						IS.submit('changePageName', function(newPageName){
							window.location.replace(siteUrl + dirName + newPageName);
						});
					},
				}
			});
		},
		changePageLayout: function(){
		},
		passwordProtect: function(){
		},
		addDocument: function(){
		},
		addImage: function(){
		},
		addLink: function(){
		}
	},
}

var ISrunonce = 1;
$(document).ready(function(){
	if(ISrunonce){
		IS.init();
		ISrunonce = 0;
	}
});