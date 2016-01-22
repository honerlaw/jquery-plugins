var picker = {
    date: (function() {

        /**
         * Constants and configurations used for the date picker
         */
        var config = {
            element: 'calendar',
            months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            days: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
            callback: function() { }
        };

        return {

            /**
             * Initialize with the given options
             */
            init: function(options) {
                if(!options) return this;
                if(options.element) config.element = options.element;
                if(options.months) config.months = options.months;
                if(options.days) config.days = options.days;
                if(options.callback) config.callback = options.callback;
                return this;
            },

            /**
             * Remove Event Listeners
             */
            clear: function() {
                if(document.getElementById('calendar-previous')) {
                    document.getElementById('calendar-previous').removeEventListener('click');
                }
                if(document.getElementById('calendar-next')) {
                    document.getElementById('calendar-next').removeEventListener('click');
                }
                var tds = document.getElementById(config.element).getElementsByTagName('td');
                if(tds.length > 0) {
                    for(var i = 0; i < tds.length; ++i) {
                        tds[i].removeEventListener('click');
                    }
                }
            },

            /**
             * Add Event Listeners
             */
            bind: function() {
                var calendar = document.getElementById(config.element);
                document.getElementById('calendar-previous').addEventListener('click', function() {
                    var month = parseInt(calendar.getAttribute('month')) - 1;
                    var year = parseInt(calendar.getAttribute('year'));
                    calendar.setAttribute('month', month < 0 ? 11 : month);
                    calendar.setAttribute('year', month < 0 ? year - 1 : year);
                    picker.date.build(true);
                });
                document.getElementById('calendar-next').addEventListener('click', function() {
                    var month = parseInt(calendar.getAttribute('month')) + 1;
                    var year = parseInt(calendar.getAttribute('year'));
                    calendar.setAttribute('month', month > 11 ? 0 : month);
                    calendar.setAttribute('year', month > 11 ? year + 1 : year);
                    picker.date.build(true);
                });
                var tds = document.getElementById(config.element).getElementsByTagName('td');
                for(var i = 0; i < tds.length; ++i) {
                    tds[i].addEventListener('click', function() {
                        var year = calendar.getAttribute('year');
                        var month = parseInt(calendar.getAttribute('month')) + parseInt(this.getAttribute('month') ? this.getAttribute('month') : 0);
                        var day = this.innerHTML;
                        config.callback(new Date(year, month, day));
                    });
                }
            },

            /**
             * Build the calendar
             */
            build: function(display) {
                var calendar = document.getElementById(config.element);
                var today = new Date();
                var current = new Date();

                if(calendar.hasAttribute('month')) {
                    current.setMonth(parseInt(calendar.getAttribute('month')));
                } else {
                    calendar.setAttribute('month', current.getMonth());
                }
                if(calendar.hasAttribute('year')) {
                    current.setYear(parseInt(calendar.getAttribute('year')));
                } else {
                    calendar.setAttribute('year', current.getFullYear());
                }

                if(calendar.hasAttribute('class')) {
                    if(calendar.getAttribute('class').indexOf('picker-calendar') < 0) {
                        calendar.setAttribute('class', calendar.getAttribute('class') + ' picker-calendar');
                    }
                } else {
                    calendar.setAttribute('class', 'picker-calendar');
                }

                //remove event listeners
                this.clear();

                //start the process to build the calendar
                var days = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
                var previous = new Date(current.getMonth() < 0 ? current.getFullYear() - 1 : current.getFullYear(), current.getMonth() < 0 ? 11 : current.getMonth(), 0);
                var first = new Date(current.getFullYear(), current.getMonth(), 1);
                var flag = false;
                var count = 0;
                var previousCount = previous.getDate() - first.getDay();
                var isActiveDay = function(count, faded) {
                    if(faded) {
                        return '<td month="1" class="calendar-faded-day">';
                    }
                    if(today.getMonth() === current.getMonth()) {
                        if(today.getFullYear() === current.getFullYear()) {
                            if(today.getDate() === count) {
                                return '<td class="calendar-active-day">';
                            }
                        }
                    }
                    return '<td>';
                };
                calendar.innerHTML = '<div class="calendar-header"><div id="calendar-previous"><div class="arrow-left"></div></div>' + config.months[current.getMonth()] + ' <div class="calendar-header-year">' + current.getFullYear() + '</div><div id="calendar-next"><div class="arrow-right"></div></div></div>';
                var week = '<table><thead><tr>';
                for(var i = 0; i < config.days.length; ++i) {
                    week += '<th>' + config.days[i] + '</th>';
                }
                week += '</tr></thead><tbody>';
                for(var i = 0; i < 6; ++i) {
                    week += '<tr>';
                    for(var j = 0; j < 7; ++j) {
                        if(i == 0) {
                            if(j >= first.getDay()) {
                                week += isActiveDay(++count) + (count) + '</td>';
                            } else {
                                week += '<td month="-1" class="calendar-faded-day">' + (++previousCount) + '</td>';
                            }
                        } else {
                            if(count >= days) {
                                count = 0;
                                flag = true;
                            }
                            if(count < days) {
                                week += isActiveDay(++count, flag) + (count) + '</td>';
                            }
                        }
                    }
                    week += '</tr>';
                }
                calendar.innerHTML += '</tbody></table>' + week;
                //end the process to build the calendar

                if(!display) this.hide();

                //bind events listeners to calendar
                this.bind();
            },
            hide: function() {
                document.getElementById(config.element).style.display = 'none';
            },
            show: function() {
                document.getElementById(config.element).style.display = 'block';
            }
        };
    })(),
    time: (function() {

        /**
         * Configuration used by the time picker
         */
        var config = {
            element: 'time',
            minuteInterval: 5,
            militaryTime: false,
            callback: function() { }
        };

        var selectedTime = {
            hour: -1,
            minute: -1,
            ampm: -1
        };

        return {

            /**
             * Initialize the time picker with the given options
             */
            init: function(options) {
                if(!options) return this;
                if(options.element) config.element = options.element;
                if(options.callback) config.callback = options.callback;
                if(options.minuteInterval) config.minuteInterval = options.minuteInterval;
                if(options.militaryTime) config.militaryTime = options.militaryTime;
                return this;
            },

            /**
             * Clear all event listeners
             */
            clear: function() {
                var tds = document.getElementById(config.element).getElementsByTagName('td');
                for(var i = 0; i < tds.length; ++i) {
                    tds[i].removeEventListener('click');
                }
                if(document.getElementById('time-select-button')) {
                    document.getElementById('time-select-button').addEventListener('click');
                }
            },

            /**
             * Bind all event listeners
             */
            bind: function() {
                var tds = document.getElementById(config.element).getElementsByTagName('td');
                for(var i = 0; i < tds.length; ++i) {
                    tds[i].addEventListener('click', function() {
                        var table = this.parentNode.parentNode.parentNode;
                        var rows = table.getElementsByTagName('td');
                        for(var j = 0; j < rows.length; ++j) {
                            rows[j].className = '';
                        }
                        this.className = 'selected';
                        if(table.getAttribute('type') === 'hour') {
                            selectedTime.hour = this.innerHTML;
                        }
                        if(table.getAttribute('type') === 'minute') {
                            selectedTime.minute = this.innerHTML;
                        }
                        if(table.getAttribute('type') === 'ampm') {
                            selectedTime.ampm = this.innerHTML;
                        }
                    });
                }
                document.getElementById('time-select-button').addEventListener('click', function() {
                    if(config.callback) config.callback(selectedTime);
                });
            },

            /**
             * Build the time element
             */
            build: function() {
                var time = document.getElementById(config.element);

                if(time.hasAttribute('class')) {
                    if(time.getAttribute('class').indexOf('picker-time') < 0) {
                        time.setAttribute('class', time.getAttribute('class') + ' picker-time');
                    }
                } else {
                    time.setAttribute('class', 'picker-time');
                }

                this.clear();

                // build hours table
                var hours = '<table class="column' + (config.militaryTime ? ' fifty' : '' ) + '" type="hour"><thead><tr><th>Hour</th></tr></thead><tbody>';
                if(config.militaryTime) {
                    for(var i = 0; i < 24; ++i) {
                        hours += '<tr><td>' + i + '</td></tr>';
                    }
                } else {
                    for(var i = 1; i <= 12; ++i) {
                        hours += '<tr><td>' + i + '</td></tr>';
                    }
                }
                hours += '</tbody></table>';
                time.innerHTML = hours;

                // build minutes table
                var minutes = '<table class="column' + (config.militaryTime ? ' fifty' : '' ) + '" type="minute"><thead><tr><th>Minute</th></tr></thead><tbody>';
                for(var i = 0; i < 60; i += config.minuteInterval) {
                    minutes += '<tr><td>' + (i < 10 ? '0' + i : i) + '</td></tr>';
                }
                minutes += '</tbody></table>'
                time.innerHTML += minutes;

                // build am / pm table
                if(!config.militaryTime) {
                    time.innerHTML += '<table class="column" type="ampm"><thead><tr><th>AM / PM</th></tr></thead><tbody><tr><td>am</td></tr><tr><td>pm</td></tr></tbody></table>';
                }

                // set the select button
                time.innerHTML += '<div style="clear: both;"></div><div id="time-select-button">select</div>';
                this.hide();
                this.bind();
            },
            hide: function() {
                document.getElementById(config.element).style.display = 'none';
            },
            show: function() {
                document.getElementById(config.element).style.display = 'block';
            }
        };
    })()
};
