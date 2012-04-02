(function(){
	IS.module.add({
		data:{},
		id: 'addPage',
		firstAction: 'addPage1',
		
		init:function(module){ //before dialog html loads
		},
		action:{ //actions of each button/dialog
			addPage1:{
				run:function(module, action){
					IS.modules.changePageOrder.action.step1.run('changePageOrder', 'step1');
					window.setTimeout(function(){
						IS.dialog.show(module, action, {
							width:800,
							height:230,
							title:'Step 1: Enter a Title For Your Page',
							modal:0,
							stack:1,
							position:['center', $(window).height()-350],
							buttons:{
								'next': function(){
									IS.updateData(module, action);
									IS.dialog.hide(module, action);
									IS.modules[module].action.addPage2.run(module, 'addPage2');
								},
							}
						});
					}, 1500);
				}
			},
			addPage2:{
				init:function(module, action){
					IS.dialog.get(module, action).find('input').bind('click', function(e){
						e.preventDefault();
						$(this).addClass('selected');
						IS.updateData(module, action);
						IS.dialog.hide(module, action);
						IS.modules[module].action.addPage3.run(module, 'addPage3');
						return false;
					});
				},
				run:function(module, action){
					IS.dialog.show(module, action, {
						modal:0,
						width:800,
						height:230,
						position:['center', $(window).height()-400],
						title:'Step 2: Choose the type of page you want to build.',
						buttons:{
							'previous': function(){
								IS.dialog.hide(module, action);
								IS.modules[module].action.addPage1.run(module, 'addPage1');
							}
						}
					});
				}
			},
			addPage3:{
				run:function(module, action){
					IS.modules[module].save(module, function(id){
						var title = IS.dialog.get(module, 'addPage1').find('input').val();
						IS.dialog.get(module, 'addPage1').find('input').val('');
						var $child = $('<li IS_id="' + id + '">' + title + '</li>');
						IS.dialog.get('changePageOrder', 'step1').find('.dragMenu .menu').append($child);
						IS.modules['changePageOrder'].action.step1.dragMenu('changePageOrder', 'step1', function(){
							IS.modules[module].action.addPage1.run(module, 'addPage1');
						});
					});
				}
			}
		},
		save:function(module, CB){
			if((typeof CB)!='function')CB = function(){};
			IS.submit(module, function(response){
				response = unserialize(response);
				CB(response);
			});
		}
	});
})();