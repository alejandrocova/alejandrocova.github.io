$(function() {
    "use strict";
    var WINDOWS = $(window);
    var DOCUMENT = $(document);
    var BODYELEMENT = $("html, body");
    var BODY = $("body");
    var NOXHERO = $("#wrap-heroraww");
    var WORD = $(".word");
    var LOADDERIMG = $(".loadder img");
    var MENULIST = $(".raww-main-nav");
    var MENUMOBILE = $('.raww-main-nav-mobile')
    var PIECHART = $('.pies');
    var ID;
    var IMAGEZOOM = $('.img-popup-btn');
    var POPUPIMAGE = $(".popup-image");
    var VIDEOPOPUP = $(".video-popup");
    var MENUHEIGHT = MENULIST.outerHeight() + 3;
    var FORMS = $('#contactform');
    var MENUITEM = MENULIST.find("li > a");
    var MENUITEMMOBILE = MENUMOBILE.find("li > a");
    var SIZE = $(".porto-wrap .item-porto").size();
    var x = 3;
    Number.prototype.pad = function(size) {
        var sign = Math.abs(this) === -1 ? '-' : '';
        return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
    }
    // OwlCarousel hero init
    const slider = function() {
        NOXHERO.on("initialized.owl changed.owl", function(e) {
            if (!e.namespace) {
                return;
            }
        }).owlCarousel({
            items: 1,
            nav: true,
            navContainer: '.navislide',
            lazyLoad: true,
            touchDrag: false,
            slideSpeed: 1500,
            dots: false,
            mouseDrag: false,
            autoplay: true,
            stagePadding: 0,
            loop: true,
            navText: [$('.prev'), $('.next')],
            margin: 0,
            autoplayTimeout: 12000,
            autoplayHoverPause: true
        });
        NOXHERO.on("changed.owl.carousel", function(e) {
            var carousels = e.relatedTarget;
            $('.counts-wrap').html('<b>' + (carousels.relative(carousels.current()) + 1).pad(2) + '</b>/' + carousels.items().length);
        });
        NOXHERO.trigger("refresh.owl.carousel");
    };
    // CircularProgressBar init ----------------------
    PIECHART.each(function() {
        var $this = $(this);
        var no = $this.attr('data-no');
        new CircularProgressBar('pie-chart-' + no);
    })
    // scroll spy init ------------------------
    const ScrollSpy = function(event) {
        // Anchors menu items
        var scrollItems = MENUITEM.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });
        var fromTop = WINDOWS.scrollTop() + MENUHEIGHT;
        // id of current item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // id of the element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (ID !== id) {
            ID = id;
            // Set/remove active class
            MENUITEM
                .parent().removeClass("aktif")
                .end().filter("[href=#" + id + "]").parent().addClass("aktif");
            MENUITEMMOBILE
                .parent().removeClass("aktif")
                .end().filter("[href=#" + id + "]").parent().addClass("aktif");
        }
    }
    // zoom magnificpopup init ------------------------
    function magnific() {
        IMAGEZOOM.magnificPopup({
            type: 'image',
            gallery: {
                enabled: false
            }
        });
        if (POPUPIMAGE.length > 0) {
            POPUPIMAGE.magnificPopup({
                type: 'image',
                fixedContentPos: true,
                gallery: { enabled: false },
                removalDelay: 300,
                mainClass: 'mfp-fade'
            });
        }
        //Video Popup init
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: true
        });
        //Video Popup
        if (VIDEOPOPUP.length > 0) {
            VIDEOPOPUP.magnificPopup({
                type: "iframe",
                removalDelay: 300,
                mainClass: "mfp-fade",
                overflowY: "hidden",
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                        '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: 'v=',
                            src: '//www.youtube.com/embed/%id%?autoplay=1'
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: '/',
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                        },
                        gmaps: {
                            index: '//maps.google.',
                            src: '%id%&output=embed'
                        }
                    },
                    srcAction: 'iframe_src'
                }
            });
        }
    }
    //animated headline init ------------------------
    WORD.animatedHeadline({
        animationType: "slide",
        animationDelay: 2500,
        barAnimationDelay: 3800,
        barWaiting: 800,
        lettersDelay: 50,
        typeLettersDelay: 150,
        selectionDuration: 500,
        typeAnimationDelay: 1300,
        revealDuration: 600,
        revealAnimationDelay: 1500
    });
    // onclick button and link init -------
    BODY.on("click", ".raww-main-nav li a", function(event) {
        event.preventDefault();
        var url = $(this);
        BODYELEMENT.stop().animate({
            scrollTop: $(url.attr('href')).offset().top
        }, 1000, "easeInOutExpo");
        $(this).parent().addClass("active").siblings().removeClass("active");
    });
    //-------------contact form init
    FORMS.submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true,
                minlength: 5
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Check your email input'
            },
            name: {
                required: 'Please check your first name input'
            },
            message: {
                required: 'Please write something for us'
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "https://public.herotofu.com/v1/dbf7e690-352a-11ef-b65d-f35c9518deb4",
                crossDomain: true,
                data: $(form).serialize(),
                beforeSend: function() {
                    $('#submit').html('PLEASE WAIT...')
                    $('.tombol-submit').attr('disabled', 'true');
                    $('input, textarea').attr('readonly', "readonly");
                },
                complete: function(msg) {
                    $('.loader').hide();
                    $('.alert').show();
                    FORMS.trigger("reset");
                    $('#submit').html('<span> DROP ME A TEXT</span><i class="fa fa-long-arrow-right"></i>')
                    $('.tombol-submit').removeAttr('disabled');
                    $('input, textarea').removeAttr('readonly');
 
                }
            });
            return false;
        }
    });
    $(document).on("click", ".close", function() {
        $('.alert').hide();
    });
    // documennt ready
    DOCUMENT.ready(function() {
        slider();
        $('.info-porto').fewlines();
        magnific();
        $('.embed-youtube').embedVideo();
    })

    // Page onload -------
    WINDOWS.load(function() {
        BODYELEMENT.addClass("active");
        LOADDERIMG.show(300);
        setTimeout(function() {
            BODYELEMENT.removeClass("active");
            LOADDERIMG.hide();
        }, 1500);
    })

    WINDOWS.scroll(function(event) {
        ScrollSpy()
    });
    $(".raww-langsel li.eng").click(function() {
        $('.tlang > li.eng').addClass("on");
        $('.tlang > li.ind').removeClass("on");
    });
    $(".raww-langsel li.ind").click(function() {
        $('.tlang > li.ind').addClass("on");
        $('.tlang > li.eng').removeClass("on");
    });
    // onclick button and link init -------
    $('body').on('click', '.menu-bar', function(e) {
        e.preventDefault();
        $('.navmobile').show();
        $('.overlay-page').show();
    })
    $('body').on('click', '.mobile', function(e) {
        e.preventDefault();
        $('.navmobile').hide();
        $('.overlay-page').hide();
        var at = $(this);
        BODYELEMENT.stop().animate({
            scrollTop: $(at.attr('href')).offset().top
        }, 1000, "easeInOutExpo");
    })

    $('.porto-wrap .item-porto:lt(' + x + ')').show();
    $('.porto-wrap .item-porto:nth-child(' + x + ')').addClass('taggeed');
    $('a.more').on('click', function(e) {
        e.preventDefault();
        $('.porto-wrap .item-porto:lt(' + SIZE + ')').css({ 'display': 'inline-block' });
        $(this).hide();
        $('a.less').css({ 'display': 'inline-block' });
        BODYELEMENT.stop().animate({
            scrollTop: $('#raww-portfoliosection').offset().top
        }, 1000, "easeInOutExpo");
    });

    $('a.less').on('click', function(e) {
        e.preventDefault();
        $('.porto-wrap .item-porto').css({ 'display': 'block' });
        $('.porto-wrap .item-porto').not(':lt(' + x + ')').hide();
        $(this).hide();
        $('a.more').css({ 'display': 'inline-block' });
        BODYELEMENT.stop().animate({
            scrollTop: $('#raww-portfoliosection').offset().top
        }, 1000, "easeInOutExpo");
    });

});