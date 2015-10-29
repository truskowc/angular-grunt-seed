//close the rwd menu
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

//default menu dropdown to open when going to route
/*
$(document).on('click','.navbar-toggle',function(e) {         
    if (window.matchMedia("(max-width: 768px)").matches) {
        // on mobile, dropdown default opened:
        setTimeout(function() {
            $(".dropdown-toggle").click();
        }, 100);

    }
});*/

function log(log){
	console.log(log);
}