var IS = {
	data: {},
	modules: {},
	
	//...INIT INSTANTSITE CMS
	init: function(){
		IS.initMenu();
	},
	
	//...CREATE MENU
	initMenu: function(){
		IS.loadHtml('asset/html/bar.php', function(){
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
					var module = $(this).attr('class');
					if(IS.modules[module]){
						var action = IS.modules[module].firstAction;
						IS.modules[module].action[action].run(module, action);
					}
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
	
	//...FUNCTIONS(...you don't say...)
	loadHtml: function(file, CB){
		if(!(typeof CB).toLowerCase()=='function')CB = function(){};
		var url = editorUrl + file;
		var id = file.split('.')[0].replace(/\//g, '_');
		$.ajax({
			url: url,
			success: function(d){
				d = '<div id="IS' + id + '">' + d + '</div>';
				$('body').append($(d));
				CB(id);
			}
		});
	},
	submit: function(module, CB){
		if(!(typeof CB).toLowerCase()=='function')CB = function(){};
		$.ajax({
			url: rootUrl,
			data: {
				args:IS.modules[module].data,
				module: module,
				action: 'save',
				ajax: 1,
				edit: 1,
			},
			success: function(d){
				CB(d);
			}
		});
	},
	updateData: function(module, action){
		$.extend(IS.modules[module].data, IS.dialog.getData(module, action));
	},
	resetData: function(module, value){
		if(value==undefined){
			value = {
				module: module,
				args: {}
			};
		}
		IS.modules[module].data = value;
	},
	
	//...DIALOG FUNCTIONS
	dialog: {
		create: function(module, action, CB){
			if(!(typeof CB).toLowerCase()=='function')CB = function(){};
			IS.loadHtml('module/' + module + '/' + action + '.php', function(id){
				$('#IS' + id).dialog({
					modal:true,
					width:800,
					height:400,
					autoOpen:0,
					show: 'slide',
					hide: 'slide',
					resizable:0
				});
				CB(id, module, action);
			});
		},
		show: function(module, action, options){
			if(!options || options==undefined)options = {};
			var dialog = IS.dialog.get(module, action);
			dialog.dialog('option', options);
			if(options.buttons){
				var x = 1;
				for(var button in options.buttons){
					var classs = button.replace(/[^a-zA-Z0-9]/g, '');
					dialog.dialog('widget').find('.ui-button:nth-child(' + x + ')').addClass(classs);
					x++;
				}
			}
			dialog.dialog('open');
			$('.ui-widget-overlay').click(function(){
				dialog.dialog('close');
			});
		},
		hide: function(module, action){
			var dialog = IS.dialog.get(module, action);
			dialog.dialog('close');
		},
		get: function(module, action){
			var id = 'module_' + module + '_' + action;
			return $('#IS' + id);
		},
		getData: function(module, action){
			var dialog = IS.dialog.get(module, action);
			var o = dialog.find('form').serializeJSON();
			return o;
		}
	},
	
	//...CONFIRM
	confirm:function(html, buttons){
		$('<div>' + html + '</div>').dialog({
			width:400,
			title:'Confirm',
			modal:1,
			stack:1,
			buttons:buttons
		});
	},
	
	//...BUBBLE
	bubble:function(obj, text){
		obj.CreateBubblePopup({
			innerHtml: text,
			innerHtmlStyle: {
				color:'#333333', 
				'text-align':'center'
			},
			themeName: 	'orange',
			themePath: 	'images/jquerybubblepopup-theme'
		});
		obj.ShowBubblePopup();
	},
	
	//...MODULES FUNCTIONS
	module:{
		add: function(moduleJSON){
			IS.modules[moduleJSON.id] = moduleJSON;
			moduleJSON.init(moduleJSON);
			for(var action in moduleJSON.action){
				IS.dialog.create(moduleJSON.id, action, function(id, module, action){
					if((typeof moduleJSON.action[action].init)=='function')moduleJSON.action[action].init(module, action);
				});
			}
		},
	},
}

var ISrunonce = 1;
$(document).ready(function(){
	if(ISrunonce){
		IS.init();
		IS.bubble($(document.body), 'hello');
		ISrunonce = 0;
	}
});