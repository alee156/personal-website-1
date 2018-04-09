jQuery(document).ready(function($) {

    if (is_touch_device()) {
        $('.full-screen-scroll article').css('opacity', '1', '!important');
    }

    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1) || is_touch_device()) {

        $("html").css('overflow', 'auto');

        $(".scroll-top").click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 2000);
            return false;
        });

    } else {
        $("html, .menu-left-part, #cbp-bislideshow.scroll").niceScroll({
            cursorcolor: "#5B5B5B",
            scrollspeed: 100,
            mousescrollstep: 80,
            cursorwidth: "12px",
            cursorborder: "none",
            cursorborderradius: "0px"
        });

        //Scroll Top animation
        $(".scroll-top").click(function() {
            $("html").getNiceScroll(0).doScrollTop(0);
        });

        $(".sidebar").mouseover(function() {
            $(".menu-left-part").getNiceScroll().resize();
        });
    }


    //Placeholder show/hide
    $('input, textarea').focus(function() {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input, textarea').blur(function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });


    // preload the images
    $('#cbp-bislideshow.scroll').imagesLoaded(function() {
        var count = 0;
        var scrollItemWidth = $('.cbp-bislideshow.scroll li').outerWidth();
        $('#cbp-bislideshow.scroll').children('li').each(function() {
            var $item = $(this);
            $item.css({
                'left': count * scrollItemWidth
            });
            count++;
        });
    });

    //Fix for default menu
    $('.default-menu ul').addClass('main-menu sm sm-clean');




    $(window).load(function() {

        // $(".blog-item-holder").hover(function() {
        //         $(".blog-item-holder").not(this).addClass('blur');
        //     },
        //     function() {
        //         $(".blog-item-holder").removeClass('blur');
        //     });


        //Set menu
        $('.main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8,
            markCurrentItem: true
        });


        //Set each image slider
        $(".image-slider").each(function() {
            var id = $(this).attr('id');
            if (window[id + '_pagination'] == 'true') {
                var pagination_value = '.' + id + '_pagination';
            } else {
                var pagination_value = false;
            }

            var auto_value = window[id + '_auto'];
            if (auto_value == 'false') {
                auto_value = false;
            } else {
                auto_value = true;
            }

            var hover_pause = window[id + '_hover'];
            if (hover_pause == 'true') {
                hover_pause = 'resume';
            } else {
                hover_pause = false;
            }

            var speed_value = window[id + '_speed'];

            $('#' + id).carouFredSel({
                responsive: true,
                width: 'variable',
                auto: {
                    play: auto_value,
                    pauseOnHover: hover_pause
                },
                pagination: pagination_value,
                scroll: {
                    fx: 'crossfade',
                    duration: parseFloat(speed_value)
                },
                swipe: {
                    onMouse: true,
                    onTouch: true
                },
                items: {
                    height: 'variable'
                }
            });
        });

        $('.carousel_pagination').each(function() {
            var pagination_width = $(this).width();
            var windw_width = $('.image-slider-wrapper').width();
            $(this).css("margin-left", (windw_width - pagination_width) / 2);
        });


        //Show-Hide header sidebar
        $('#toggle').on("click", multiClickFunctionStop);

        //Fix for sidebar height
        $("#sidebar").css('minHeight', $("#content").outerHeight());

        $('.doc-loader').fadeOut('fast');
    });


    $(window).resize(function() {

        //Fix for sidebar height
        $("#sidebar").css('minHeight', $("#content").outerHeight());

        $('.menu-left-part.open').width($('.sidebar.open').width() - $('.menu-right-part.open').width());

        var count = 0;
        var scrollItemWidth = $('.cbp-bislideshow.scroll li').outerWidth();
        $('#cbp-bislideshow.scroll').children('li').each(function() {
            var $item = $(this);
            $item.css({
                'left': count * scrollItemWidth
            });
            count++;
        });

        $('.carousel_pagination').each(function() {
            var pagination_width = $(this).width();
            var windw_width = $('.image-slider-wrapper').width();
            $(this).css("margin-left", (windw_width - pagination_width) / 2);
        });

    });

    //------------------------------------------------------------------------
    //Helper Methods -->
    //------------------------------------------------------------------------


    var multiClickFunctionStop = function(e) {
        e.preventDefault();
        $('#toggle').off("click");
        $('#toggle').toggleClass("on");
        $('html, body, .sidebar, .menu-left-part, .menu-right-part').toggleClass("open");
        $('.menu-left-part').width('320px');
        $('.menu-left-part.open').width($('.sidebar.open').width() - $('.menu-right-part.open').width());
        $('#toggle').on("click", multiClickFunctionStop);
    };

    function is_touch_device() {
        return !!('ontouchstart' in window);
    }

    $(window).bind("scroll", function() {
        if ($(this).scrollTop() > 700) {
            $('.scroll-top').fadeIn(500);
        } else {
            $('.scroll-top').fadeOut(500);
        }
    });

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }


    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
            filter: $(this).data('filter')
        });
    });


});
