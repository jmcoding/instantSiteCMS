(function( $ ){
$.fn.serializeJSON=function() {
var json = {};
jQuery.map($(this).serializeArray(), function(n, i){
json[n['name']] = n['value'];
});
$(this).find('input.selected:submit').each(function(){
	json[$(this).attr('name')] = $(this).val();
});
return json;
};
})( jQuery );