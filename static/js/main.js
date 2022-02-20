// $(window).on('beforeunload', function () {
//     $(window).scrollTop(0)
// });

$(window).on('load', function () {
    $(window).scrollTop(0);
    var wn = window.navigator,
        ua = wn.userAgent.toLowerCase(),
        av = wn.appVersion.toLowerCase(),
        up = window.location.protocol.toLowerCase();

    var isMobile = (/iphone|ipod|kindle|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(ua)),
        isTablet = (/ipad|sch-i800|playbook|xoom|tablet|gt-p1000|gt-p7510|sgh-t849|nexus 7|shw-m180s|a100|dell streak|silk/i.test(ua)),
        isIos = ua.match(/(ipad|iphone|ipod)/i),
        isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    console.log(isIE11);

    $.easing.quart = function (x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; };
    $.easing.easeOutCubic = function (x, t, b, c, d) { t /= d; t--; return c * (t * t * t + 1) + b; };
    $.easing.easeInOutQuad = function (x, t, b, c, d) { t /= d / 2; if (t < 1) return c / 2 * t * t + b; t--; return -c / 2 * (t * (t - 2) - 1) + b; };
    $.easing.easeInQuad = function (x, t, b, c, d) { t /= d; return c * t * t + b; };
    $.easing.easeOutQuad = function (x, t, b, c, d) { t /= d; return -c * t * (t - 2) + b; };

    var $env;
    if (location.hostname === 'localhost' || location.hostname === '192.168.3.13') {
        $env = 'local';
    } else {
        $env = 'online';
    }

    var $window = $(window);
    var _page = $('body').attr('id');
    var _ww, _wh, _ws;
    var isScrollingIos = false;

    var menuop = false;

    var url;
    $('a[target="_self"]').click(function ($evt) {
        url = $(this).attr('href');
        $('#loader').css({ 'display': 'block' }).animate({ 'opacity': 1 }, 10, 'easeOutQuad', function () {
            _setUrl(url, '_self');
        });
        $evt.preventDefault();
    });

    $('#loader').delay('fast').animate({ 'opacity': 0 }, 10, 'linear', function () { $(this).css({ 'display': 'none' }); });



    $('#header-menu, #nav-menu, #aside-nav-pc-menu, #aside-nav-sp').on({ click: function (evt) { _setNav(); } }, '');

    var opn = false;
    function _setNav() {
        if (!opn) {
            $('#nav-menu-icon, #aside-nav-pc-menu-icon, #aside-nav-pc-menu-icon, #aside-nav-sp-icon').addClass('open');
            $('#aside-nav-sp-icon span').css({ 'background-color': '#000' });

            $('#nav-menu-title-open').stop(true, false).animate({ top: '-25px' }, 10, 'easeOutQuad');
            $('#nav-menu-title-close').stop(true, false).animate({ top: 0 }, 10, 'easeOutQuad');
            opn = true;

            if (!isMobile && !isTablet) {
                if (isIE11 > 0) {
                    $('#nav-center').css({ 'position': 'absolute', 'top': '50vh', 'transform': 'translateY(-50%)', 'height': 'auto' });
                }
                else {
                    if (_ww < 767) {
                        $('#nav-center').css({ 'position': 'fixed', 'top': '100px', 'transform': 'translateY(0)', 'height': '600px' });
                        $('nav').css({ 'overflow-y': 'scroll' });
                    } else {
                        if (_wh < 800) {
                            $('#nav-center').css({ 'position': 'fixed', 'top': '100px', 'transform': 'translateY(0)', 'height': '600px' });
                            $('nav').css({ 'overflow-y': 'scroll' });
                        } else {
                            $('#nav-center').css({ 'position': 'fixed', 'top': '50vh', 'transform': 'translateY(-50%)', 'height': 'auto' });
                            $('nav').css({ 'overflow': 'hidden' });
                        }
                    }
                }

            }

            $('nav').stop(true, false).animate({ height: $(window).height() + 20 }, 10, 'easeOutQuad');
        }
        else {

            $('#nav-menu-icon, #aside-nav-fix-pc-menu-icon, #aside-nav-pc-menu-icon, #aside-nav-sp-icon').removeClass('open');
            $('nav').stop(true, false).animate({ height: 0 }, 10, 'easeInOutQuad');
            $('#nav-menu-title-open').stop(true, false).animate({ top: 0 }, 10, 'easeInOutQuad');
            $('#nav-menu-title-close').stop(true, false).animate({ top: '26px' }, 10, 'easeInOutQuad');
            __setScroll();
            opn = false;
        }
    }

    if (_page === 'top') {
        $('#aside-nav-pc ul#aside-nav-pc-cat li').eq(0).find('a').addClass('selected');
        if (window.location.hash == '#top') {
            $('#top-intro').css({ 'display': 'none' });
            $('header').css({ 'top': '30px' });
            $('#top-banner-center, #top-banner-center a, #top-banner-footer').css({ 'opacity': 1 });
        } else {
            $('#loader').css({ 'display': 'none' });
            $('#top-intro').css({ 'display': 'block' }).delay(10).animate({ opacity: 0 }, 10, 'easeInOutQuad', function () { $(this).css({ 'display': 'none' }); });
        }

        var sts = 1200,
            std = 4000;

        function starttopslideshow() {

            $('#top-banner-background-1').css({ 'opacity': '1', 'z-index': 5 });
            $('#top-banner-background-2').css({ 'opacity': '1', 'z-index': 4 });
            $('#top-banner-background-3').css({ 'opacity': '1', 'z-index': 3 });
            $('#top-banner-background-4').css({ 'opacity': '1', 'z-index': 2 });
            $('#top-banner-background-5').css({ 'opacity': '1', 'z-index': 1 });

            $('#top-banner-background-1 div').addClass('active');
            $('#top-banner-background-2 div').removeClass('active');
            $('#top-banner-background-3 div').removeClass('active');
            $('#top-banner-background-4 div').removeClass('active');
            $('#top-banner-background-5 div').removeClass('active');

            $('#top-banner-background-1').delay(std).animate({ opacity: 0 }, {
                duration: sts,
                start: function () {
                    $('#top-banner-background-2 div').addClass('active');
                },
                complete: function () {
                    $('#top-banner-background-1 div').removeClass('active');
                    $('#top-banner-background-2').delay(2600).animate({ opacity: 0 }, {
                        duration: sts,
                        start: function () {
                            $('#top-banner-background-3 div').addClass('active');
                        },
                        complete: function () {
                            $('#top-banner-background-2 div').removeClass('active');
                            $('#top-banner-background-3').delay(std).animate({ opacity: 0 }, {
                                duration: sts,
                                start: function () {
                                    $('#top-banner-background-4 div').addClass('active');
                                },
                                 complete: function () {
                            $('#top-banner-background-3 div').removeClass('active');
                            $('#top-banner-background-4').delay(std).animate({ opacity: 0 }, {
                                duration: sts,
                                start: function () {
                                    $('#top-banner-background-5 div').addClass('active');
                                },
                                complete: function () {
                                    $('#top-banner-background-4 div').removeClass('active');
                                    $('#top-banner-background-5').delay(std).animate({ opacity: 0 }, {
                                        duration: sts,
                                        start: function () {
                                            $('#top-banner-background-1 div').addClass('active');
                                            $('#top-banner-background-1').css({ opacity: 1 });
                                        },
                                        complete: function () {
                                            $('#top-banner-background-5 div').removeClass('active');
                                            starttopslideshow();
                                        }
                                    });
                                }
                            });
                        }
                           });
                        }
                    });
                }
            });
        }

        starttopslideshow();  //after intro
    }

    function _setUrl($url, $target) {
        if ($target === undefined) { $target = '_blank'; }
        window.open($url, $target);
    };

});
