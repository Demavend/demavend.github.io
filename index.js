			
	$(document).ready(function() { 
    
    var overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
     
     open_modal.click( function(event){ 
         event.preventDefault();
         var div = $(this).attr('href'); 
         overlay.fadeIn(100, 
             function(){ 
                 $(div).modal();
         });
     });

     
});		
$('#hide1').hide();

	$(document).ready(function() { 
    
    var overlay = $('#overlay'); 
    var show_hide = $('li.show_hide'); 
    
    show_hide.click( function(event){ 
        event.preventDefault();
        var li = $(this).attr('href'); 
        overlay.fadeIn(100, 
            function(){ 
                $(li).hide();
         });
     });

     
});		