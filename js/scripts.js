$('document').ready(function() {

    // smooth scrolling for nav items
    $('nav a').click( function(e){
        e.preventDefault();
        $('nav a').removeClass('on');
        $(this).addClass('on');
        var navdestination = $(this).attr('href');
        var navoffset = $(navdestination).offset().top - 80;
        $('html, body').animate({
            scrollTop: navoffset
        }, 500);
    });

    var updatenav = function(e) {

        var navoffsetprojects = $('a#projects').offset().top - $(window).scrollTop();
        if (navoffsetprojects <= 80) {
            $('nav a').removeClass('on');
            $('nav a.projects').addClass('on');
        }

        var navoffsetabout = $('a#about').offset().top - $(window).scrollTop();
        if (navoffsetabout <= 80) {
            $('nav a').removeClass('on');
            $('nav a.about').addClass('on');
        }

        var navoffsetfindme = $('a#findme').offset().top - $(window).scrollTop();
        if (navoffsetfindme <= 80) {
            $('nav a').removeClass('on');
            $('nav a.findme').addClass('on');
        }
    };

    $(window).scroll( function() {
        updatenav();
    });

});