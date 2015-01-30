$(document).ready(function(){
	/*$( "#lista2" ).sortable({
      revert: true
    });
	$("div").draggable({
      connectToSortable: "#lista2"    
    });*/
	$("#lista1,#lista2").sortable({
	  items:"li:last-child",
      connectWith:"ul",
	 tolerance: "intersect",
	 receive: function( event, ui ){$("").append(this);}
    }).disableSelection();
	
}); 
