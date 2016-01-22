(function($) {

    $.fn.tooltips = function() {
        this.filter(this.selector).each(function() {
            $(this).on('mouseover', function() {
                var message = $(this).attr('message');
                if(!message || message.length === 0) {
                    return;
                }
                var position = $(this).offset();
                var div = $(document.createElement('div'));
                div.attr('class', 'tooltip-message')
                div.css({
                    'position' : 'absolute',
                    'top' : ($(this).height() + position.top + 5) + 'px',
                    'left' : position.left + 'px',
                    'z-index' : '100',
                    'box-shadow' : '0 1px 2px #777',
                    'background-color' : 'white',
                    'padding' : '1rem',
                    'border-radius' : '2px',
                });
                div.html(message);
                $('body').append(div);
            });

            $(this).on('mouseout', function() {
                $('.tooltip-message').remove();
            });
        });
        return this;
    };

})(jQuery);
