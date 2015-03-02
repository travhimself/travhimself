$('document').ready(function() {

    // kick off skrollr for parallax effect on desktop
    enquire.register("screen and (min-width: 1025px)", function() {
        var skrl = skrollr.init();
    });


    // mask email address by writing it in on the fly
    var user = "trav";
    var domain = "travhimself.com";
    $('nav a#email').attr('href', 'mail' + 'to:' + user + '@' + domain);

});