(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Bootstrap Tabs init
    $('#game-type a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // mobile nav
    $('.mobile-nav__toggle').click(function () {
        $('.mobile-nav__toggle').toggleClass('mobile-nav__toggle--on');
        $('.mobile-nav__content').fadeToggle(100, "linear");
        $('.mobile__content').removeClass('mobile-nav--hide');
    });

    // generating alert
    function generateTemporaryAlert(message, optionalClass) {
        $('.alerts-fixed').html('<div class="alert ' + optionalClass + '" id="temporary-alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span>' + message + '</span></div>');
    }


    // click to copy
    $('.copy-ip').click(function (event) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($('#server-ip').text()).select();
        document.execCommand("copy");
        $temp.remove();

        generateTemporaryAlert('<b>Adres IP został skopiowany!</b>', 'alert--color1');

        // temporary alert
        $("#temporary-alert").fadeTo(3000, 500).fadeIn('fast', function () {
            $("#temporary-alert").fadeOut('fast');
        });
    });

    $('#searchPlayer').click(function (event) {
        event.preventDefault();
        var user = $("#searchInput").val();
        if (!user)
            return;

        window.location = "http://cubegame.pl/profil/" + user;
    });

    $('#searchInput').submit(function () {
        event.preventDefault();
        var user = $("#searchInput").val();
        if (!user)
            return;

        window.location = "http://cubegame.pl/profil/" + user;
    });

    // scroll efects
    var $homepage = $('.masthead--homepage');

    function scrollEfects() {
        //Global var
        var width = $(window).width();
        var height = $(window).height();
        var wScroll = $(this).scrollTop();

        // homepage only
        if ($homepage.length) {
            if (wScroll > 10) {
                $('.masthead .brand, .masthead .global-navigation').css({
                    'opacity': '0'
                });
            } else {
                $('.masthead .brand, .masthead .global-navigation').css({
                    'opacity': '1'
                });
            }

            $('.masthead__tagline').css({
                'transform': 'translate(0px, ' + wScroll / 40 + '%)'
            });
        }
    }

    //event listeners
    $(window).resize(scrollEfects);
    $(window).scroll(scrollEfects);

    $(".activeSMS").click(function (e) {
        var nick = $(this).parent().find('input[name=nick]').val();
        var code = $(this).parent().find('input[name=smsCode]').val();
        var service = $(this).parent().find('input[name=service]').val();
        if (nick.length < 3 || nick.length > 32) {
            generateTemporaryAlert('<b>Podaj prawidłowy nick!</b>', 'modal--red');
            e.preventDefault();
            return false
        }

        e.preventDefault();

        $.ajax({
            type: "POST",
            data: {
                'nick': nick,
                'smsCode': code,
                'serviceId': service,
                'type': "sms"
            },
            url: "/shop/create/",
            success: function (cnt) {
                if (!cnt.success) {
                    $("#paymentModal2").modal('show');
                    if (cnt.msg)
                        generateTemporaryAlert(cnt.msg, 'modal--red');
                    return;
                }

                generateTemporaryAlert(cnt.msg, 'alert--color1');
            }
        });
    });

    $(".activePSC").click(function (e) {
        var nick = $(this).parent().find('input[name=nick]').val();
        var service = $(this).parent().find('input[name=service]').val();
        if (nick.length < 3 || nick.length > 32) {
            generateTemporaryAlert('<b>Podaj prawidłowy nick!</b>', 'modal--red');
            e.preventDefault();
            return false
        }

        e.preventDefault();

        $.ajax({
            type: "POST",
            data: {
                'nick': nick,
                'serviceId': service,
                'type': "psc",
            },
            url: "/shop/create/",
            success: function (cnt) {
                if (!cnt.success) {
                    $("#paymentModal2").modal('show');
                    if (cnt.msg)
                        generateTemporaryAlert(cnt.msg, 'modal--red');
                    return;
                }

                window.location = cnt.msg;
            }
        });
    });

    $(".activeCashbill").click(function (e) {
        var nick = $(this).parent().find('input[name=nick]').val();
        var service = $(this).parent().find('input[name=service]').val();
        if (nick.length < 3 || nick.length > 32) {
            generateTemporaryAlert('<b>Podaj prawidłowy nick!</b>', 'modal--red');
            e.preventDefault();
            return false
        }

        e.preventDefault();

        $.ajax({
            type: "POST",
            data: {
                'nick': nick,
                'serviceId': service,
                'type': "cashbill"
            },
            url: "/shop/create/",
            success: function (cnt) {
                try {
                    JSON.parse(cnt);
                } catch (ex) {
                    $("#paymentCreated").html(cnt);
                    $("#paymentModal").modal('show');
                    return;
                }

                $("#paymentModal2").modal('show');
                if (cnt.msg)
                    generateTemporaryAlert(cnt.msg, 'modal--red');

            }
        });
    });

    $(".activeJustpay").click(function (e) {
        var nick = $(this).parent().find('input[name=nick]').val();
        var service = $(this).parent().find('input[name=service]').val();
        if (nick.length < 3 || nick.length > 32) {
            generateTemporaryAlert('<b>Podaj prawidłowy nick!</b>', 'modal--red');
            e.preventDefault();
            return false
        }

        e.preventDefault();

        $.ajax({
            type: "POST",
            data: {
                'nick': nick,
                'serviceId': service,
                'type': "justpay"
            },
            url: "/shop/create/",
            success: function (cnt) {
                if (!cnt.success) {
                    $("#paymentModal2").modal('show');
                    if (cnt.msg)
                        generateTemporaryAlert(cnt.msg, 'modal--red');
                    return;
                }

                window.location = cnt.msg;
            }
        });
    });
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG5cclxuICAgIC8vIEJvb3RzdHJhcCBUYWJzIGluaXRcclxuICAgICQoJyNnYW1lLXR5cGUgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQodGhpcykudGFiKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb2JpbGUgbmF2XHJcbiAgICAkKCcubW9iaWxlLW5hdl9fdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5tb2JpbGUtbmF2X190b2dnbGUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW5hdl9fdG9nZ2xlLS1vbicpO1xyXG4gICAgICAgICQoJy5tb2JpbGUtbmF2X19jb250ZW50JykuZmFkZVRvZ2dsZSgxMDAsIFwibGluZWFyXCIpO1xyXG4gICAgICAgICQoJy5tb2JpbGVfX2NvbnRlbnQnKS5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0taGlkZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZ2VuZXJhdGluZyBhbGVydFxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVUZW1wb3JhcnlBbGVydChtZXNzYWdlLCBvcHRpb25hbENsYXNzKSB7XHJcbiAgICAgICAgJCgnLmFsZXJ0cy1maXhlZCcpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCAnICsgb3B0aW9uYWxDbGFzcyArICdcIiBpZD1cInRlbXBvcmFyeS1hbGVydFwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+PHNwYW4+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPjwvZGl2PicpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBjbGljayB0byBjb3B5XHJcbiAgICAkKCcuY29weS1pcCcpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciAkdGVtcCA9ICQoXCI8aW5wdXQ+XCIpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmFwcGVuZCgkdGVtcCk7XHJcbiAgICAgICAgJHRlbXAudmFsKCQoJyNzZXJ2ZXItaXAnKS50ZXh0KCkpLnNlbGVjdCgpO1xyXG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcclxuICAgICAgICAkdGVtcC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgZ2VuZXJhdGVUZW1wb3JhcnlBbGVydCgnPGI+QWRyZXMgSVAgem9zdGHFgiBza29waW93YW55ITwvYj4nLCAnYWxlcnQtLWNvbG9yMScpO1xyXG5cclxuICAgICAgICAvLyB0ZW1wb3JhcnkgYWxlcnRcclxuICAgICAgICAkKFwiI3RlbXBvcmFyeS1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5mYWRlSW4oJ2Zhc3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIjdGVtcG9yYXJ5LWFsZXJ0XCIpLmZhZGVPdXQoJ2Zhc3QnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNzZWFyY2hQbGF5ZXInKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciB1c2VyID0gJChcIiNzZWFyY2hJbnB1dFwiKS52YWwoKTtcclxuICAgICAgICBpZiAoIXVzZXIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCJodHRwOi8vY3ViZWdhbWUucGwvcHJvZmlsL1wiICsgdXNlcjtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNzZWFyY2hJbnB1dCcpLnN1Ym1pdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgdXNlciA9ICQoXCIjc2VhcmNoSW5wdXRcIikudmFsKCk7XHJcbiAgICAgICAgaWYgKCF1c2VyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cDovL2N1YmVnYW1lLnBsL3Byb2ZpbC9cIiArIHVzZXI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzY3JvbGwgZWZlY3RzXHJcbiAgICB2YXIgJGhvbWVwYWdlID0gJCgnLm1hc3RoZWFkLS1ob21lcGFnZScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbEVmZWN0cygpIHtcclxuICAgICAgICAvL0dsb2JhbCB2YXJcclxuICAgICAgICB2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIHZhciB3U2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgLy8gaG9tZXBhZ2Ugb25seVxyXG4gICAgICAgIGlmICgkaG9tZXBhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh3U2Nyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgICQoJy5tYXN0aGVhZCAuYnJhbmQsIC5tYXN0aGVhZCAuZ2xvYmFsLW5hdmlnYXRpb24nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzAnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5tYXN0aGVhZCAuYnJhbmQsIC5tYXN0aGVhZCAuZ2xvYmFsLW5hdmlnYXRpb24nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzEnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCgnLm1hc3RoZWFkX190YWdsaW5lJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlKDBweCwgJyArIHdTY3JvbGwgLyA0MCArICclKSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAkKHdpbmRvdykucmVzaXplKHNjcm9sbEVmZWN0cyk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKHNjcm9sbEVmZWN0cyk7XHJcblxyXG4gICAgJChcIi5hY3RpdmVTTVNcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgbmljayA9ICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1uaWNrXScpLnZhbCgpO1xyXG4gICAgICAgIHZhciBjb2RlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPXNtc0NvZGVdJykudmFsKCk7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9c2VydmljZV0nKS52YWwoKTtcclxuICAgICAgICBpZiAobmljay5sZW5ndGggPCAzIHx8IG5pY2subGVuZ3RoID4gMzIpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVUZW1wb3JhcnlBbGVydCgnPGI+UG9kYWogcHJhd2lkxYJvd3kgbmljayE8L2I+JywgJ21vZGFsLS1yZWQnKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICduaWNrJzogbmljayxcclxuICAgICAgICAgICAgICAgICdzbXNDb2RlJzogY29kZSxcclxuICAgICAgICAgICAgICAgICdzZXJ2aWNlSWQnOiBzZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiBcInNtc1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVybDogXCIvc2hvcC9jcmVhdGUvXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChjbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY250LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3BheW1lbnRNb2RhbDJcIikubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY250Lm1zZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVUZW1wb3JhcnlBbGVydChjbnQubXNnLCAnbW9kYWwtLXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVRlbXBvcmFyeUFsZXJ0KGNudC5tc2csICdhbGVydC0tY29sb3IxJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuYWN0aXZlUFNDXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIG5pY2sgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9bmlja10nKS52YWwoKTtcclxuICAgICAgICB2YXIgc2VydmljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1zZXJ2aWNlXScpLnZhbCgpO1xyXG4gICAgICAgIGlmIChuaWNrLmxlbmd0aCA8IDMgfHwgbmljay5sZW5ndGggPiAzMikge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVRlbXBvcmFyeUFsZXJ0KCc8Yj5Qb2RhaiBwcmF3aWTFgm93eSBuaWNrITwvYj4nLCAnbW9kYWwtLXJlZCcpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgJ25pY2snOiBuaWNrLFxyXG4gICAgICAgICAgICAgICAgJ3NlcnZpY2VJZCc6IHNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAndHlwZSc6IFwicHNjXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVybDogXCIvc2hvcC9jcmVhdGUvXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChjbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY250LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3BheW1lbnRNb2RhbDJcIikubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY250Lm1zZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVUZW1wb3JhcnlBbGVydChjbnQubXNnLCAnbW9kYWwtLXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBjbnQubXNnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmFjdGl2ZUNhc2hiaWxsXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIG5pY2sgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9bmlja10nKS52YWwoKTtcclxuICAgICAgICB2YXIgc2VydmljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1zZXJ2aWNlXScpLnZhbCgpO1xyXG4gICAgICAgIGlmIChuaWNrLmxlbmd0aCA8IDMgfHwgbmljay5sZW5ndGggPiAzMikge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVRlbXBvcmFyeUFsZXJ0KCc8Yj5Qb2RhaiBwcmF3aWTFgm93eSBuaWNrITwvYj4nLCAnbW9kYWwtLXJlZCcpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgJ25pY2snOiBuaWNrLFxyXG4gICAgICAgICAgICAgICAgJ3NlcnZpY2VJZCc6IHNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAndHlwZSc6IFwiY2FzaGJpbGxcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cmw6IFwiL3Nob3AvY3JlYXRlL1wiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoY250KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIEpTT04ucGFyc2UoY250KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwYXltZW50Q3JlYXRlZFwiKS5odG1sKGNudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwYXltZW50TW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNwYXltZW50TW9kYWwyXCIpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY250Lm1zZylcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVRlbXBvcmFyeUFsZXJ0KGNudC5tc2csICdtb2RhbC0tcmVkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmFjdGl2ZUp1c3RwYXlcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgbmljayA9ICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1uaWNrXScpLnZhbCgpO1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPXNlcnZpY2VdJykudmFsKCk7XHJcbiAgICAgICAgaWYgKG5pY2subGVuZ3RoIDwgMyB8fCBuaWNrLmxlbmd0aCA+IDMyKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlVGVtcG9yYXJ5QWxlcnQoJzxiPlBvZGFqIHByYXdpZMWCb3d5IG5pY2shPC9iPicsICdtb2RhbC0tcmVkJyk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAnbmljayc6IG5pY2ssXHJcbiAgICAgICAgICAgICAgICAnc2VydmljZUlkJzogc2VydmljZSxcclxuICAgICAgICAgICAgICAgICd0eXBlJzogXCJqdXN0cGF5XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXJsOiBcIi9zaG9wL2NyZWF0ZS9cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGNudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjbnQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjcGF5bWVudE1vZGFsMlwiKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbnQubXNnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVRlbXBvcmFyeUFsZXJ0KGNudC5tc2csICdtb2RhbC0tcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGNudC5tc2c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.min.js.map
