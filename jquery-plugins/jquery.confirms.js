(function($) {

    $.fn.confirms = function() {
        this.filter(this.selector).on('click', function() {
            var message = $(this).attr('confirm');
            if(message && message.length > 0) {
                return window.confirm(message);
            }
        });
        return this;
    };

})(jQuery);
