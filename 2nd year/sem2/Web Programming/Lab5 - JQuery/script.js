$(document).ready(function() {
    var slider = $('#slider');
    var images = $('.slider-image');
    var lightbox = $('#lightbox');
    var isPaused = false;

    function slide() {
      if (!isPaused) {
        slider.animate({marginLeft: '-=5%'}, 50, 'linear', function() {
          var firstImage = images.first();
          if (firstImage.offset().left + firstImage.outerWidth(true) < 0) {
            firstImage.appendTo(slider);
            slider.css('margin-left', 0);
          }
          slide();
        });
      }
    }

    // Start sliding
    slide();

    // Pause sliding when an image is clicked
    images.on('click', function() {
      isPaused = true;
      var clickedImage = $(this).clone();
      lightbox.html(clickedImage).fadeIn();
    });

    // Resume sliding when the lightbox is clicked
    lightbox.on('click', function() {
      isPaused = false;
      lightbox.fadeOut();
    });
  });