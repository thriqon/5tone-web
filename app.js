$(function() {
                if (!init()) {
                    return;
                }
                $('body').removeClass('nojs');
                


                var ddigitsSpans = $('.ddigit');
                var alarmButton = $('.alarm');
                var digitsButtons = $('.digit');
                var loeschenButton = $('.loeschen');

                var digits = [-1, - 1, - 1, - 1, - 1];

                function refreshDigits() {
                    ddigitsSpans.each(function(index) {

                        if (digits[index] == -1) {
                            $(this).text('-').addClass('bg');
                        }
                        else {
                            $(this).text(digits[index]).removeClass('bg');
                        }
                    });

                    // alle Digits gesetzt
                    if (digits.indexOf(-1) == -1) {
                        alarmButton.removeAttr('disabled');
                        digitsButtons.attr('disabled', 'disabled');
                        loeschenButton.removeAttr('disabled');

                        // kein Digit gesetzt
                    }
                    else if (digits.indexOf(-1) == 0) {
                        alarmButton.attr('disabled', 'disabled');
                        digitsButtons.removeAttr('disabled');
                        loeschenButton.attr('disabled', 'disabled');
                    }
                    else {
                        // irgendwo zwischendrin, es gibt ungesetzte Digits, aber auch gesetzte
                        alarmButton.attr('disabled', 'disabled');
                        digitsButtons.removeAttr('disabled');
                        loeschenButton.removeAttr('disabled');
                    }
                }

                digitsButtons.click(function() {
                    var index = digits.indexOf(-1);
                    if (index == -1) {
                        console.log('ouch');
                        return;
                    }

                    digits[index] = parseInt($(this).text());

                    refreshDigits();
                });

                alarmButton.click(function() {
                    $('.alarmgeber').addClass('active');
                    loeschenButton.attr('disabled', 'disabled');
                    zveigen.alarm(digits, function() {
                        $('.alarmgeber').removeClass('active');

                        for (var i = 0; i < digits.length; i++) {
                            digits[i] = -1;
                        }
                        refreshDigits();
                    });
                });

                loeschenButton.click(function() {
                    var indexP = digits.indexOf(-1);
                    if (indexP == 0) {
                        return;
                    }
                    if (indexP == -1) {
                        indexP = digits.length;
                    }

                    var index = indexP - 1;

                    digits[index] = -1;

                    refreshDigits();
                });

                refreshDigits();
            });