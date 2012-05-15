(function($) {

    // take a jquery object and convert it to a string of html
    // from http://stackoverflow.com/questions/652763/jquery-object-to-string
    // $('<div>').append($('#item-of-interest').clone()).html(); 

    $.fn.jqtostring = function() {
        return $('<div>').append(this.clone()).html();
    }

})(jQuery);