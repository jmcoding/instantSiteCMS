(function(){
	IS.module.add({
		data:{},
		id: 'helloWorld',
		firstAction: 'step1',
		
		init:function(module){ //before dialog html loads
		},
		action:{ //actions of each button/dialog
			step1:{ 
				init:function(module, action){
					//do something in here before user can pop up dialog
					//IS.dialog.get(module, action).find('.something').dosomething();
				},
				run:function(module, action){
					//runs when the button is pressed in the menu
					IS.dialog.show(module, action, {
						width:400,
						height:600,
						draggable:0,
						title:'Hello World!',
						buttons:{
							'cancel': function(){
								IS.dialog.hide(module, action);
							},
							'save': function(){
								//set data if need be
								//IS.modules[module].data = {};
								IS.updateData(module, action);
								IS.modules[module].save(module);
							}
						}
					});
				}
			}
		},
		save:function(module){
			IS.submit(module, function(response){
				alert(response);
			});
		}
	});
})();