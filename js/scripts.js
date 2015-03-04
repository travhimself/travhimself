$('document').ready(function() {

    // set up skroll rules depending on device size, then kick it off
    enquire.register("screen and (max-width: 640px)", {
        match: function() {
            $('#background').attr('data-top', 'top: -100px').attr('data-bottom', 'top: -300px');
        }
    });

    enquire.register("screen and (min-width: 641px)", {
        match: function() {
            $('#background').attr('data-top', 'top: -350px').attr('data-bottom', 'top: -550px');
        }
    });

    enquire.register("screen and (min-width: 900px)", {
        match: function() {
            $('#background').attr('data-top', 'top: -400px').attr('data-bottom', 'top: -600px');
        }
    });

    enquire.register("screen and (min-width: 1600px)", {
        match: function() {
            $('#background').attr('data-top', 'top: -700px').attr('data-bottom', 'top: -900px');
        }
    });

    var skrl = skrollr.init({
        skrollrBody: 'content',
        forceHeight: 'true',
        mobileCheck: function () {  return false  }
    });


    // mask email address by writing it in on the fly
    var user = "trav";
    var domain = "travhimself.com";
    $('nav a#email').attr('href', 'mail' + 'to:' + user + '@' + domain);

});