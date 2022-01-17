$(document).ready(function() {
	$('.btn').click(function(event) {
		$('.menu').removeClass('active');
		var num = $(this).attr('data-num');
		$('#menu'+num).addClass('active');
        $('.btn').removeClass('active');
        $('.btn'+num).addClass('active');
        $('.textt').remove();
	});
});


$(document).ready(function() { 
    var button = $('#button-up');	
    $(window).scroll (function () {
      if ($(this).scrollTop () > 300) {
        button.fadeIn();
      } else {
        button.fadeOut();
      }
  });	 
  button.on('click', function(){
  $('body, html').animate({
  scrollTop: 0
  }, 800);
  return false;
  });		 
  });

  $('.textt').typeIt({});
