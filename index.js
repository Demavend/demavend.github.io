			
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
    var show_hide = $('a.show_hide'); 
    
    show_hide.click( function(event){ 
        event.preventDefault();
        var a = $(this).attr('name'); 
        overlay.fadeIn(100, 
            function(){ 
                $(a).hide();
         });
     });

     
});		

$(document).ready(function() { 
    
    var overlay = $('#overlay'); 
    var show = $('a.dropdown-footer'); 
    
    show.click( function(event){ 
        event.preventDefault();
        var a1 = $('div[href^="#modal"]'); 
        overlay.fadeIn(100, 
            function(){ 
                $(a1).show();
         });
     });

     
});		