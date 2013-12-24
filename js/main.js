var canvas, exportRoot;
$(function () {

    window.exportRoot = exportRoot;

    var click_event = "click";
    var pagerColor = ['#7ac7f8', '#f9f5c5', '#c9e7bc']

    var sectionAry = ['sherry-profile', 'launched-video', 'project'];

    var sectionTotal = sectionAry.length;

    for (var j = 0; j < sectionTotal; j++) {
        var total = $("#custom-wrap section#" + sectionAry[j] + " ul.content li").length;
        if (total == 1 || sectionAry[j] == 'index' || sectionAry[j] == 'accessory')
            continue;

        $("#custom-wrap section#" + sectionAry[j]).append('<nav class="pager ' + sectionAry[j] + ' ' + pagerColor[j] + '"></nav>');
        var i = 0;
        for (i = 0; i < total; i++) {
            var status = '';
            if (i == 0)
                status = 'active first';
            $("#custom-wrap section#" + sectionAry[j] + " nav.pager").append('<a href="javascript:;" class="' + status + '" slide="' + i + '"></a>');
        }
        $("#custom-wrap section#" + sectionAry[j]).append('<nav class="arrow ' + sectionAry[j] + '"></nav>');
        var i = 0;
        var total = 2;
        for (i = 0; i < total; i++) {
            var dx = 'next';
            if (i == 0) {
                dx = 'prev'
            }
            $("#custom-wrap section#" + sectionAry[j] + " nav.arrow").append('<a href="javascript:;" class="' + dx + '"></a>');
        }
    }

    //nav arrow
    $("nav.arrow a").on(click_event, function () {
        var current = $(this).parents(".page").find("ul.content li.active");
        var target = null;

        if ($(this).hasClass('next')) {
            target = current.next().length > 0 ? current.next() : current.siblings().first();
        }
        else {
            target = current.prev().length > 0 ? current.prev() : current.siblings().last();
        }
        var clickItem = $(this).parents(".page").find("nav.pager").find("a").eq(target.index());
        clickItem.trigger(click_event);
    })

    //nav pager
    $("nav.pager a").on(click_event, function () {
        var current = $(this).parents(".page").find("ul.content li.active");
        var target = $(this).parents(".page").find("ul.content li").eq($(this).index());
        var current_bg = $(this).parents(".page").find("ul.bg li").eq(current.index());
        var target_bg = $(this).parents(".page").find("ul.bg li").eq($(this).index());

        if (current.index() === target.index())
            return;
        target.addClass("prepare");
        if (target.index() > current.index()) {
            setTimeout(function () {
                target.removeClass("prev").addClass("next");
                target_bg.removeClass("prev").addClass("next");
                setTimeout(function () {
                    target.removeClass("prepare");
                    current.addClass("prev").removeClass("active");
                    target.addClass("active").removeClass("prev").removeClass("next");
                }, 50);
            }, 1);
        }
        else {
            setTimeout(function () {
                target.removeClass("next").addClass("prev");
                target_bg.removeClass("next").addClass("prev");
                setTimeout(function () {
                    target.removeClass("prepare");
                    current.removeClass("active").addClass("next");
                    target.removeClass("prev").removeClass("next").addClass("active");
                }, 50);
            }, 1);
        }

        //TweenMax.set(target_bg, { zIndex: 2000 });
        //TweenMax.set(current_bg, { zIndex: 1000 });
        //TweenMax.to(target_bg, 0.3, { opacity: 1, delay: .4 });
        //TweenMax.to(current_bg, 0.3, { opacity: 0, delay: 1 });
        $(this).siblings().removeClass('active')
        $(this).addClass('active');
        target.find("img").trigger("click");
    })

    // sidebar for #custom-wrap
    $("nav.shortcut ul li.m1").on('click', function () {
        TweenMax.to(window, 1, { scrollTo: { y: $("#custom-wrap").offset().top, ease: Quad.easeOut } });
    })
    // sidebar for section#
    $("nav.shortcut ul li.m2").on('click', function () {
        TweenMax.to(window, .5, { scrollTo: { y: $("section#sherry-profile").offset().top, ease: Quad.easeOut } });
    })
    $("nav.shortcut ul li.m3").on('click', function () {
        TweenMax.to(window, .5, { scrollTo: { y: $("section#launched-video").offset().top, ease: Quad.easeOut } });
    })
    $("nav.shortcut ul li.m4").on('click', function () {
        TweenMax.to(window, .5, { scrollTo: { y: $("section#project").offset().top, ease: Quad.easeOut } });
    })
    $("nav.shortcut ul li").on('mouseover', function () {
        $("nav.shortcut").css('width', 51);
    })
    $("nav.shortcut ul li").on('mouseout', function () {
        $("nav.shortcut").css('width', 51);
    })


    //Camera Smile Animation
    //function state3Timeline_Animation() {
    //    var smile_pic = $("section.state3 img.pic");
    //    var smile_ctn = $("section.state3 .inner-content");
    //    var state3Timeline = new TimelineMax();
    //    state3Timeline.append(TweenMax.set(smile_pic, { top: 780 }));
    //    state3Timeline.insert(TweenMax.set(smile_ctn, { opacity: 0, paddingTop: 145 }));
    //    state3Timeline.insert(TweenMax.to(smile_pic, 0.7, { delay: 0.4, top: 205, ease: 'Expo.easeOut' }));
    //    state3Timeline.insert(TweenMax.to(smile_ctn, 0.8, { delay: 0.3, paddingTop: 175, opacity: 1, ease: 'Power5.easeOut' }));
    //    $("nav a").click(function () {
    //        if ($(this).parents(".page").find("ul.content li section").hasClass('state3')) {
    //            state3Timeline.restart();
    //        }
    //    })
    //}
    //state3Timeline_Animation();


    //Bg Parallax Effect
    //$('section#performance ul.bg li.kv').parallax("50%", 0.4);
    //$('section#design ul.bg li.kv').parallax("70%", 0.09);
    //$('section#app ul.bg li.kv').parallax("50%", 0.1);

    //colorbox
    if ($(window).width() > 1920 * 0.8) {
        $(".videos a").colorbox({ iframe: true, innerWidth: 1920 * 0.8, innerHeight: 1080 * 0.8 });
    } else {
        $(".videos a").colorbox({ iframe: true, innerWidth: $(window).width() * 0.8, innerHeight: $(window).height() * 0.8 });
    }
    $(".videos a").each(function () {
        $(this).attr('href', $(this).attr('data-href'));
    })

    //resize window.width
    $(window).resize(function () {
        $("#custom-wrap").width($(window).width());
        $("#special-sectionOverview nav.arrow").width($(window).width());
        if ($(window).width() > 960) {
            $("#custom-wrap nav.pager").css('left', ($(window).width() - 960) / 2 + 126);
            $("#custom-wrap .inner").css('left', 0);
            $("#custom-wrap nav.arrow a.prev").css('left', 70);
            $("#custom-wrap nav.arrow a.next").css('right', 20);
            $("#custom-wrap nav.shortcut").show();
        }
        else {
            $("#custom-wrap .inner").css('left', -126 / 2);
            $("#custom-wrap nav.pager").css('left', 126 / 2);
            $("#custom-wrap nav.arrow a.prev").css('left', 70);
            $("#custom-wrap nav.arrow a.next").css('right', 20);
            $("#custom-wrap nav.shortcut").hide();
        }

        $("#custom-wrap nav.arrow").show();
        $("#custom-wrap").css('left', -$("#special-sectionOverview").offset().left);
    });

    $(window).trigger('resize');

});