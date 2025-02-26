$(document).ready(function() {
    var scrollLink = $('.back-to-top');
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 200) {
            scrollLink.fadeIn();
        } else {
            scrollLink.fadeOut();
        }
    });
    scrollLink.click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
    });

    // Fade-in effect when scrolling
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_element) {
                $(this).addClass('visible');
            }
        });
    });
});