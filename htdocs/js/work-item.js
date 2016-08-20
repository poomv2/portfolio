$(document).ready(function(){

  $('.work-item__content').each(function(){
    var $dropdown = $(this);

    $('.work-item__more-info', $dropdown).on('click', function(e) {
      e.preventDefault();
      var $div = $('.work-item__extra', $dropdown);
      $div.toggle(250);
      $('.work-item__extra').not($div).hide(500);

      return false
    });
  });

  $('html').click(function(){
    $(".work-item__extra").hide(250);
  });
});
