 $(document).on("contextmenu", function(event) {
   event.preventDefault();
   $(".menu")
     .show()
     .css({
       top: event.pageY,
       left: event.pageX
     });
 });
 $(document).click(function() {
   if ($(".menu").is(":hover") == false) {
     $(".menu").fadeOut("fast");
   };
 });