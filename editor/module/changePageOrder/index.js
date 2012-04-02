(function(){
	IS.module.add({
		data:{},
		id: 'changePageOrder',
		firstAction: 'step1',
		
		init:function(module){ //before dialog html loads
		},
		action:{ //actions of each button/dialog
			step1:{ 
				init:function(module, action){
				},
				script:function(module, action){
					var id = '#' + IS.dialog.get(module, action).attr('id');
					IS.dialog.get(module, action).find('.inSiteMenu .menu').sortable({
						connectWith: id + " .inSiteMenu .menu ul, " + id + " .notInSiteMenu .menu",
						start:function(event, ui){
							ui.item.before($('<li class="placeholder"></li>'));
							IS.dialog.get(module, action).addClass('dragging');
							$(this).addClass('sorting');
						},
						update:function(event, ui){
							if(ui.item.parent().hasClass('subLevel')){
								var submenuFirstLi = ui.item.find('ul >li:nth-child(1)').clone();
								var submenu = ui.item.find('ul').remove().clone();
								submenu.find('li:nth-child(1)').remove();
								submenuFirstLi.append(submenu);
								IS.dialog.get(module, action).find('.inSiteMenu .menu').find('.placeholder').after(submenuFirstLi);
							}
							else{
								if(!ui.item.find('ul').length){
									ui.item.append($('<ul class="subLevel"></ul>'));
								}
							}
						},
						stop:function(event, ui){
							IS.dialog.get(module, action).find('.inSiteMenu .menu').find('.placeholder').remove();
							IS.modules[module].action[action].script(module, action);
							IS.dialog.get(module, action).removeClass('dragging');
						},
						over:function(event, ui){
							IS.dialog.get(module, action).find('.menu').removeClass('sorting');
							$(this).addClass('sorting');
						},
						out:function(event, ui){
							$(this).removeClass('sorting');
						}
					}).disableSelection();
					IS.dialog.get(module, action).find('.inSiteMenu .menu ul').bind('hover', function(e){
						e.stopPropagation();
					});
					IS.dialog.get(module, action).find('.inSiteMenu .menu ul').sortable({
						connectWith: id + " .inSiteMenu .menu, " + id + " .inSiteMenu .menu ul, " + id + " .notInSiteMenu .menu",
						start: function(event, ui){
							IS.dialog.get(module, action).addClass('dragging');
							$(this).addClass('sorting');
						},
						stop:function(event, ui){
							IS.modules[module].action[action].script(module, action);
							IS.dialog.get(module, action).removeClass('dragging');
						},
						over:function(event, ui){
							IS.dialog.get(module, action).find('.menu').removeClass('sorting');
							$(this).addClass('sorting');
						},
						out:function(event, ui){
							$(this).removeClass('sorting');
						}
					}).disableSelection();
					//notInSiteMenu
					IS.dialog.get(module, action).find('.notInSiteMenu .menu').sortable({
						connectWith: id + " .inSiteMenu .menu, " + id + " .inSiteMenu .menu ul",
						start: function(event, ui){
							IS.dialog.get(module, action).addClass('dragging');
							$(this).addClass('sorting');
						},
						update:function(event, ui){
							var submenuFirstLi = ui.item.find('ul >li:nth-child(1)').clone();
							var submenu = ui.item.find('ul').remove().clone();
							submenu.find('li:nth-child(1)').remove();
							submenuFirstLi.append(submenu);
							IS.dialog.get(module, action).find('.inSiteMenu .menu').find('.placeholder').after(submenuFirstLi);
						},
						stop:function(event, ui){
							IS.dialog.get(module, action).removeClass('dragging');
							IS.modules[module].action[action].script(module, action);
						},
						over:function(event, ui){
							IS.dialog.get(module, action).find('.menu').removeClass('sorting');
							$(this).addClass('sorting');
						},
						out:function(event, ui){
							$(this).removeClass('sorting');
						}
					}).disableSelection();
				},
				dragMenu:function(module, action, CB){
					var id = '#' + IS.dialog.get(module, action).attr('id');
					IS.dialog.get(module, action).find('.dragMenu .menu li').draggable({
						connectToSortable: id + " .inSiteMenu .menu, " + id + " .inSiteMenu .menu ul, " + id + " .notInSiteMenu .menu",
						helper: 'clone',
						start: function(event, ui){
							IS.dialog.get(module, action).addClass('dragging');
						},
						stop:function(event, ui){
							$(this).remove();
							IS.dialog.get(module, action).find('.dragMenu .menu').hide();
							IS.dialog.get(module, action).removeClass('dragging');
							CB();
						},
						over:function(event, ui){
							$(this).addClass('sorting');
						},
						out:function(event, ui){
							$(this).removeClass('sorting');
						}
					});
					IS.dialog.get(module, action).find('.dragMenu .menu').show();
				},
				run:function(module, action){
					$.ajax({
						url: rootUrl,
						data: {
							ajax: 1,
							edit: 1,
							module: module,
							action: 'get',
							args: {}
						},
						success:function(data){
							data = unserialize(data);
							//inSiteMenu
							var menu = '';
							var notInSiteMenu = '';
							for(var x in data){
								var item = data[x];
								var id = item.id;
								var visible = item.visible;
								if(!parseInt(visible)){
									notInSiteMenu += '<li title="' + item.name + '" IS_id="' + id + '">' + item.title + '</li>';
								}
								else{
									menu += '<li title="' + item.name + '" IS_id="' + id + '">';
									menu += item.title;
									menu += '<ul class="subLevel">';
									if(item.children){
										for(var y in item.children){
											var item2 = item.children[y];
											var id2 = item2.id;
											menu += '<li title="' + item2.name + '" IS_id="' + id2 + '">';
											menu += item2.title;
											menu += '</li>';
										}
									}
									menu += '</ul>';
									menu += '</li>';
								}
							}
							IS.dialog.get(module, action).find('.inSiteMenu .menu').html(menu);
							IS.dialog.get(module, action).find('.notInSiteMenu .menu').html(notInSiteMenu);
							IS.modules[module].action[action].script(module, action);
							//dialog
							$(document.body).css('overflow', 'hidden');
							IS.dialog.show(module, action, {
								width:'100%',
								height:$(window).height(),
								draggable:0,
								title:'Change the order of pages that appear on the menu',
								close:function(){
									$(document.body).css('overflow', '');
									IS.dialog.hide('addPage', 'addPage1');
								},
								modal:0,
								stack:0,
								show: 'fade',
								hide: 'fade',
								buttons:{
									'cancel': function(){
										IS.confirm('Changes will be lost.', {
											'continue, lose changes': function(){
												$(this).dialog('destroy');
												IS.dialog.hide(module, action);
											},
											'cancel': function(){
												$(this).dialog('destroy');
											}
										});
									},
									'save': function(){
										IS.resetData(module, []);
										IS.dialog.get(module, action).find('.notInSiteMenu li').each(function(){
											var item = {};
											item['id'] = $(this).attr('IS_id');
											item['visible'] = 0;
											IS.modules[module].data.push(item);
										});
										IS.dialog.get(module, action).find('.inSiteMenu .menu >li').each(function(){
											var item = {};
											var parent = $(this).attr('IS_id');
											var children = [];
											$(this).find('ul >li').each(function(){
												var child = {};
												var id = $(this).attr('IS_id');
												if(id!=undefined){
													child['id'] = id;
													child['visible'] = 1;
												}
												children.push(child);
											});
											item['visible'] = 1;
											item['id'] = parent;
											item['children'] = children;
											IS.modules[module].data.push(item);
										});
										IS.modules[module].save(module, function(){
											IS.dialog.hide(module, action);
											IS.dialog.hide('addPage', 'addPage1');
										});
									}
								}
							});
						}
					});
				}
			}
		},
		save:function(module, CB){
			if((typeof CB)!='function')CB = function(){};
			IS.submit(module, function(response){
				CB();
			});
		}
	});
})();