$(document).ready(function() {
  var slider = $('#slider');
  var images = $('.slider-image');
  var lightbox = $('#lightbox');
  var isPaused = false;
  
  images.clone().appendTo(slider);

  function slide() {
      if (!isPaused) {
          slider.animate({marginLeft: '-=1%'}, 50, 'linear', function() {
              if (slider.offset().left + slider.outerWidth(true) < 0) {
                  slider.css('margin-left', 0);
              }
              slide();
          });
      }
  }


  slide();

  slider.on('click', function() {
      isPaused = true;
      var clickedImage = $(this).clone();
      lightbox.html(clickedImage).fadeIn();
  });

  lightbox.on('click', function() {
      isPaused = false;
      lightbox.fadeOut();
      slide();
  });
});